import * as THREE from "three";

type Point = [number, number, number];
type Random = () => number;

function along(path: Point[], random: Random): Point {
  const lengths = path.slice(1).map((point, index) => Math.hypot(...point.map((value, axis) => value - path[index][axis])));
  let distance = random() * lengths.reduce((sum, length) => sum + length, 0);
  let index = 0;
  while (index < lengths.length - 1 && distance > lengths[index]) distance -= lengths[index++];
  const t = distance / (lengths[index] || 1);
  return path[index].map((value, axis) => value + (path[index + 1][axis] - value) * t) as Point;
}

function eye(random: Random): Point {
  const angle = random() * Math.PI * 2, kind = random();
  if (kind < .42) {
    const t = random(), sign = random() > .5 ? 1 : -1;
    return [(t * 2 - 1) * 2.7, Math.sin(t * Math.PI) * sign * .98, .12 * Math.sin(t * Math.PI)];
  }
  const radius = kind < .82 ? .84 : .28 + random() * .37;
  return [Math.cos(angle) * radius, Math.sin(angle) * radius, .20 + Math.sqrt(Math.max(0, 1 - radius * radius)) * .35];
}

function cards(random: Random, card = Math.floor(random() * 3)): Point {
  const angle = (card - 1) * -.36;
  let x = 0, y = 0;
  if (random() < .65) {
    const p = along([[-.85, -1.4, 0], [.85, -1.4, 0], [.85, 1.4, 0], [-.85, 1.4, 0], [-.85, -1.4, 0]], random);
    x = p[0]; y = p[1];
  } else {
    const a = random() * Math.PI * 2, radius = random() < .6 ? .43 : .68;
    x = Math.cos(a) * radius; y = Math.sin(a) * radius;
  }
  y += 1.5;
  return [x * Math.cos(angle) - y * Math.sin(angle) + (card - 1) * .5, x * Math.sin(angle) + y * Math.cos(angle) - 1.3, (card - 1) * .38];
}

function code(random: Random): Point {
  if (random() < .67) {
    const paths: Point[][] = [
      [[-1.1, 1, 0], [-2.2, 0, .2], [-1.1, -1, 0]],
      [[1.1, 1, 0], [2.2, 0, .2], [1.1, -1, 0]],
      [[.5, 1.4, .1], [-.5, -1.4, .1]],
    ];
    return along(paths[Math.floor(random() * paths.length)], random);
  }
  const angle = random() * Math.PI * 2, tilt = random() < .5 ? .7 : -.7;
  return [Math.cos(angle) * 3.05, Math.sin(angle) * 1.5 * Math.cos(tilt), Math.sin(angle) * 1.5 * Math.sin(tilt)];
}

function camera(random: Random): Point {
  const kind = random();
  if (kind < .48) {
    const angle = random() * Math.PI * 2, radius = random() < .5 ? 1.02 : .78;
    return [.35 + Math.cos(angle) * radius, -.15 + Math.sin(angle) * radius, .45 + random() * .22];
  }
  const outline: Point[] = [[-2.4, -1.25, 0], [2.4, -1.25, 0], [2.4, .85, 0], [.95, .85, 0], [.6, 1.4, 0], [-.9, 1.4, 0], [-1.25, .85, 0], [-2.4, .85, 0], [-2.4, -1.25, 0]];
  if (kind < .85) { const p = along(outline, random); p[2] = random() < .5 ? 0 : -.6; return p; }
  if (kind < .94) return [-1.8 + random() * .55, .25 + random() * .3, .06];
  return [(random() - .5) * 4.8, (random() - .5) * 2.1 - .18, -.4];
}

function compass(random: Random): Point {
  const angle = random() * Math.PI * 2;
  if (random() < .48) {
    const radius = random() < .7 ? 2.4 : 2.15;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius, .1];
  }
  const spoke = Math.floor(random() * 8), a = spoke * Math.PI / 4;
  const radius = random() * (spoke % 2 === 0 ? 1.95 : 1.15);
  return [Math.sin(a) * radius, Math.cos(a) * radius, Math.sin(radius * 2) * .3];
}

function flight(random: Random): Point {
  if (random() < .7) {
    const paths: Point[][] = [
      [[-2, .7, -.25], [2.25, 1.3, 0], [.3, -1.35, .1], [-.35, -.3, .65], [-2, .7, -.25]],
      [[-.35, -.3, .65], [2.25, 1.3, 0], [-.75, -.75, -.1], [-.35, -.3, .65]],
    ];
    return along(paths[random() < .7 ? 0 : 1], random);
  }
  const t = random(), turn = random() < .5 ? 1 : -1;
  return [-2 - t * 2.2, -.3 + Math.sin(t * Math.PI * 1.7) * .5 + turn * .25, -t];
}

/** Sample the approved composition into independently movable glyph tiles. No image plane is rendered. */
export function buildReadingParticles(image: HTMLImageElement, small: boolean) {
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth; canvas.height = image.naturalHeight;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Particle source sampling unavailable");
  context.drawImage(image, 0, 0);
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
  const step = small ? 8 : 5;
  const values: Record<string, number[]> = { position: [], aUv: [], aData: [], aRandom: [], aEye: [], aCards: [], aCode: [], aCamera: [], aCompass: [], aFlight: [] };
  const counts = [0, 0, 0, 0, 0, 0];
  let seed = 7136;
  const random = () => { seed = (1664525 * seed + 1013904223) >>> 0; return seed / 4294967296; };
  const targets = { aEye: eye, aCards: cards, aCode: code, aCamera: camera, aCompass: compass, aFlight: flight };
  for (let y = step / 2; y < canvas.height - 30; y += step) for (let x = step / 2; x < canvas.width; x += step) {
    // The source is the user's full concept. Exclude its typography and UI; retain only burgundy artwork.
    if ((y < 200 && x < 1000) || y < 95) continue;
    let strongest = 0;
    for (let dy = -step / 2; dy < step / 2; dy += 2) for (let dx = -step / 2; dx < step / 2; dx += 2) {
      const i = (Math.floor(y + dy) * canvas.width + Math.floor(x + dx)) * 4;
      strongest = Math.max(strongest, pixels[i] - pixels[i + 1]);
    }
    if (strongest < 17) continue;
    let group = 0;
    if ((x > 790 && y < 390) || (x > 850 && y < 455)) group = 4;
    else if (y < 620 && y > 280 && x > 570 && x < 742) group = 1;
    else if (y < 650 && y > 390 && x >= 742 && x < 842) group = 2;
    else if (y < 685 && y > 450 && x >= 842 && x < 965) group = 3;
    else if (strongest < 27 && random() < .5) group = 5;
    const depth = group === 0 ? Math.sin(x / canvas.width * Math.PI) * .55 : random() * .35;
    values.position.push(x / canvas.width - .5, .5 - y / canvas.height, depth);
    values.aUv.push(x / canvas.width, 1 - y / canvas.height);
    const identity = random();
    values.aData.push(group, Math.floor(random() * 16), identity, random());
    values.aRandom.push(random() * 2 - 1, random() * 2 - 1, random() * 2 - 1);
    for (const [name, shape] of Object.entries(targets)) {
      const p = name === "aCards" ? cards(random, Math.floor(identity * 3)) : shape(random);
      values[name].push(p[0] + (random() - .5) * .035, p[1] + (random() - .5) * .035, p[2]);
    }
    counts[group]++;
  }
  const geometry = new THREE.BufferGeometry();
  for (const [name, data] of Object.entries(values)) geometry.setAttribute(name, new THREE.Float32BufferAttribute(data, name === "aUv" ? 2 : name === "aData" ? 4 : 3));
  return { geometry, step, width: canvas.width, height: canvas.height, count: counts.reduce((a, b) => a + b, 0), groups: counts };
}

export function createGlyphAtlas() {
  const canvas = document.createElement("canvas"); canvas.width = 512; canvas.height = 48;
  const context = canvas.getContext("2d")!;
  context.font = '34px "IBM Plex Mono", monospace'; context.textAlign = "center"; context.textBaseline = "middle"; context.fillStyle = "white";
  "01.:*+<>/{}-=✦×·".split("").forEach((glyph, index) => context.fillText(glyph, index * 32 + 16, 24));
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter; texture.magFilter = THREE.LinearFilter;
  return texture;
}
