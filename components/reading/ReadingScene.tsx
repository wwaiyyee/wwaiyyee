"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { buildReadingParticles, createGlyphAtlas } from "./particleGeometry";

export type ReadingSceneState = { phase: number; work: number; chapter: number; burst: number; velocity: number; paused: boolean };

const vertexShader = `
  attribute vec2 aUv;
  attribute vec4 aData;
  attribute vec3 aRandom, aEye, aCards, aCode, aCamera, aCompass, aFlight;
  uniform float uPhase, uTime, uPointSize, uDpr, uHover, uBurstAge, uVelocity, uWork, uChapter, uEnter;
  uniform vec2 uArtwork, uOffset, uView, uPointer, uBurstOrigin;
  varying vec2 vUv;
  varying float vAlpha, vGlyph, vMorph;
  mat2 rotate(float angle){float s=sin(angle),c=cos(angle);return mat2(c,-s,s,c);}
  vec3 turn(vec3 p,float angle){p.xz=rotate(angle)*p.xz;return p;}
  vec3 travel(vec3 a,vec3 b,float t){
    float blend=smoothstep(0.,1.,t);
    vec3 swirl=vec3(aRandom.xy*2.4,aRandom.z*3.5);
    swirl.xy=rotate(blend*3.14159+aData.z*2.)*swirl.xy;
    return mix(a,b,blend)+swirl*sin(blend*3.14159);
  }
  void main(){
    float p=uPhase, t=uTime, group=aData.x, seed=aData.z*6.283185;
    vUv=aUv;vGlyph=aData.y;
    vec3 home=vec3(position.xy*uArtwork+uOffset,position.z);
    float isCard=step(.5,group)*(1.-step(3.5,group));
    vec2 pivot=vec2(0.,0.);
    if(group<.5)pivot=vec2(.05,-.25)*uArtwork+uOffset;
    else if(group<3.5)pivot=vec2(-.075+(group-1.)*.082,-.025-(group-1.)*.065)*uArtwork+uOffset;
    else pivot=vec2(.14,.18)*uArtwork+uOffset;
    float floatSpeed=.48+isCard*.34;
    float angle=sin(t*floatSpeed+group*1.9)*mix(.008,.045,isCard);
    if(group>3.5)angle=sin(t*.3)*.025;
    home.xy=pivot+rotate(angle)*(home.xy-pivot);
    home.y+=sin(t*floatSpeed+group*1.9)*mix(.025,.13,isCard);
    home.x+=cos(t*.37+group*1.2)*.025;
    home.z+=sin(t*.7+seed)*.1+isCard*sin(t*.5+group)*.3;
    home.xy+=vec2(sin(t*.9+seed+position.y*12.),cos(t*.7+seed+position.x*9.))*.009;
    if(group>4.5)home.xy+=vec2(sin(t*.4+seed),cos(t*.3+seed))*.16;
    home.xy+=aRandom.xy*(1.-uEnter)*1.4;

    float mobile=step(12.,uView.y);
    vec3 eye=turn(aEye,sin(t*.22)*.13);
    float blink=1.-.91*pow(max(0.,cos(t*.48)),40.);
    eye.y*=blink;
    eye.xy+=vec2(sin(t*.17)*.09,uView.y*.245);
    vec3 fan=aCards;
    fan.xz=rotate(sin(t*.2)*.17+uWork*.4)*fan.xz;
    fan.y+=sin(t*.65+floor(aData.z*3.)*2.)*.08;
    fan.xy=rotate(-.3+sin(t*.2)*.025)*fan.xy;
    fan=fan*mix(1.75,1.15,mobile)+vec3(uView.x*.28,uView.y*.04,-.2);
    vec3 code=turn(aCode,t*.08);
    code=code*1.2+vec3(uView.x*.22,uView.y*.02,0.);
    vec3 camera=turn(aCamera,sin(t*.32)*.3);
    camera.xy=rotate(sin(t*.22)*.05)*camera.xy;
    camera=camera*1.2+vec3(uView.x*.24,uView.y*.08,0.);
    vec3 chapter=mix(turn(aCode,sin(t*.3)*.25),turn(aEye,sin(t*.3)*.2),clamp(uChapter,0.,1.));
    chapter=mix(chapter,turn(aCompass,t*.06),clamp(uChapter-1.,0.,1.));
    chapter=chapter*.85+vec3(uView.x*.35,uView.y*.30,0.);
    vec3 flight=turn(aFlight,sin(t*.4)*.18);
    flight.xy=rotate(sin(t*.35)*.035-.12)*flight.xy;
    flight.y+=sin(t*.7)*.09;
    flight=flight*mix(.9,.68,mobile)+vec3(.45,uView.y*.055,0.);

    vec3 pos=home;
    float alpha=1.;
    if(p<1.){
      float m=clamp((p-.08)/.92,0.,1.);
      vec3 zoom=home*(1.+smoothstep(0.,.55,p)*1.4);
      pos=travel(zoom,eye,m);
      vMorph=smoothstep(.25,.75,p);
      alpha=mix(1.,.65,smoothstep(.35,.9,p));
    }else if(p<2.){
      pos=travel(eye,fan,p-1.);vMorph=1.;alpha=mix(.65,.22,smoothstep(1.1,1.9,p));
    }else if(p<3.){
      pos=travel(fan,code,clamp((p-2.18)/.82,0.,1.));vMorph=1.;alpha=mix(.22,.5,smoothstep(2.2,2.9,p));
    }else if(p<3.85){
      float m=smoothstep(3.2,3.65,p);
      pos=mix(code,camera,m)+aRandom*sin(m*3.14159)*.6;vMorph=1.;alpha=.65;
    }else if(p<4.4){
      pos=travel(camera,chapter,clamp((p-3.85)/.15,0.,1.));vMorph=1.;alpha=mix(.65,.12,smoothstep(3.85,4.,p));
    }else{
      pos=travel(chapter,flight,(p-4.4)/.6);vMorph=1.;alpha=mix(.12,.8,smoothstep(4.4,5.,p));
    }
    vec2 fromPointer=pos.xy-uPointer;
    float distance=length(fromPointer);
    float push=exp(-distance*distance/1.3)*uHover;
    pos.xy+=normalize(fromPointer+vec2(.001))*push*.75;
    pos.z+=push*.7;
    vec2 fromBurst=pos.xy-uBurstOrigin;
    float radius=length(fromBurst),age=max(0.,uBurstAge);
    float wave=exp(-pow((radius-age*4.4)*1.5,2.))*exp(-age*.9)*step(0.,uBurstAge);
    pos.xy+=normalize(fromBurst+vec2(.001))*wave*.85;
    pos.z+=wave*sin(seed+age*5.)*.8;
    pos.xy+=vec2(sin(t*.6+seed),cos(t*.5+seed))*.025*vMorph;
    pos.z+=sin(t*.55+seed)*.1*vMorph;
    pos.xy+=aRandom.xy*clamp(abs(uVelocity),0.,1.)*.12*vMorph;
    float sparse=mix(1.,step(aData.w,.19),vMorph);
    vAlpha=alpha*sparse*uEnter*(.94+.06*sin(t*1.1+seed));
    gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.);
    gl_PointSize=mix(uPointSize,7.,vMorph)*uDpr*(1.+push*.28+wave*.2);
  }
`;

const fragmentShader = `
  uniform sampler2D uMap,uGlyphs;
  uniform vec2 uCell,uTileAspect;
  uniform vec3 uInk;
  varying vec2 vUv;
  varying float vAlpha,vGlyph,vMorph;
  void main(){
    vec2 local=vec2(gl_PointCoord.x,1.-gl_PointCoord.y)-.5;
    vec2 tile=local/uTileAspect;
    vec3 source=texture2D(uMap,vUv+tile*uCell).rgb;
    float chroma=max(0.,source.r-source.g-.023);
    float sourceAlpha=clamp(chroma*3.8,0.,1.);
    sourceAlpha*=step(abs(tile.x),.5)*step(abs(tile.y),.5);
    vec2 glyphUv=vec2((vGlyph+gl_PointCoord.x)/16.,1.-gl_PointCoord.y);
    float glyph=texture2D(uGlyphs,glyphUv).a;
    float alpha=mix(sourceAlpha,glyph,vMorph)*vAlpha;
    if(alpha<.006)discard;
    gl_FragColor=vec4(uInk,alpha);
    #include <colorspace_fragment>
  }
`;

const formForPhase = (phase: number) => phase < .7 ? "hand-and-cards" : phase < 1.5 ? "eye" : phase < 2.5 ? "tarot-fan" : phase < 3.35 ? "code-orbits" : phase < 3.9 ? "camera" : phase < 4.6 ? "personal-symbol" : "paper-plane";

/** The source is sampled into glyph particles. The animated scene has no textured image mesh. */
export default function ReadingScene({ state, motion }: { state: RefObject<ReadingSceneState>; motion: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element || !motion) return;
    let cancelled = false, cleanup = () => {};
    const portfolio = element.closest(".portfolio");
    async function start() {
      if (!element) return;
      let renderer: THREE.WebGLRenderer | undefined, source: THREE.Texture | undefined;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
        renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.setClearColor(0, 0);
        source = await new THREE.TextureLoader().loadAsync("/reading/hero-reference.webp");
        await document.fonts.ready;
        if (cancelled) { source.dispose(); renderer.dispose(); return; }
        source.minFilter = THREE.LinearFilter; source.magFilter = THREE.LinearFilter;
        let small = innerWidth < 760;
        const sampled = buildReadingParticles(source.image as HTMLImageElement, small);
        const glyphs = createGlyphAtlas();
        const scene = new THREE.Scene(), camera = new THREE.OrthographicCamera(-8, 8, 5, -5, .1, 100);
        camera.position.z = 20;
        const uniforms = {
          uMap: { value: source }, uGlyphs: { value: glyphs }, uInk: { value: new THREE.Color("#98435d") },
          uCell: { value: new THREE.Vector2(sampled.step / sampled.width, sampled.step / sampled.height) }, uTileAspect: { value: new THREE.Vector2(1, 1) },
          uPhase: { value: 0 }, uTime: { value: 0 }, uPointSize: { value: 5 }, uDpr: { value: 1 },
          uArtwork: { value: new THREE.Vector2(16, 10.667) }, uOffset: { value: new THREE.Vector2() }, uView: { value: new THREE.Vector2(16, 10) },
          uPointer: { value: new THREE.Vector2(-100, -100) }, uHover: { value: 0 }, uBurstOrigin: { value: new THREE.Vector2() }, uBurstAge: { value: 100 },
          uVelocity: { value: 0 }, uWork: { value: 0 }, uChapter: { value: 0 }, uEnter: { value: 0 },
        };
        const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, transparent: true, depthWrite: false, depthTest: false, uniforms });
        const particles = new THREE.Points(sampled.geometry, material); particles.frustumCulled = false; scene.add(particles);
        const pointer = new THREE.Vector2(-100, -100), easedPointer = pointer.clone();
        let viewHeight = 10, lastFrame = -1, lastMove = -10, burstTime = -100, burstValue = state.current.burst, lost = false, ready = false;
        let elapsed = 0, lastTick = -1, form = "", chapter = state.current.chapter;
        const resize = () => {
          if (!element || !renderer) return;
          const { width, height } = element.getBoundingClientRect(); if (!width || !height) return;
          small = width < 760;
          const dpr = Math.min(devicePixelRatio, small ? 1.25 : 1.5);
          renderer.setPixelRatio(dpr); renderer.setSize(width, height, false);
          viewHeight = 16 * height / width;
          camera.top = viewHeight / 2; camera.bottom = -viewHeight / 2; camera.updateProjectionMatrix();
          const artWidth = small ? 19.3 : 16, artHeight = small ? artWidth / 1.5 : viewHeight;
          uniforms.uArtwork.value.set(artWidth, artHeight);
          uniforms.uOffset.value.set(small ? -1 : 0, small ? -viewHeight * .11 : 0);
          uniforms.uView.value.set(16, viewHeight);
          const xScale = artWidth / 16 * width / sampled.width, yScale = artHeight / viewHeight * height / sampled.height;
          const largest = Math.max(xScale, yScale);
          uniforms.uPointSize.value = sampled.step * largest * 1.02;
          uniforms.uTileAspect.value.set(xScale / largest, yScale / largest);
          uniforms.uDpr.value = dpr;
        };
        const locate = (event: PointerEvent) => pointer.set((event.clientX / innerWidth - .5) * 16, (.5 - event.clientY / innerHeight) * viewHeight);
        const onPointer = (event: PointerEvent) => { if (event.pointerType === "mouse") { const first = pointer.x < -50; locate(event); if (first) easedPointer.copy(pointer); lastMove = elapsed; } };
        const onLeave = () => { lastMove = -10; };
        const onDown = (event: PointerEvent) => {
          if ((event.target as HTMLElement).closest("a,button,dialog,input")) return;
          locate(event); uniforms.uBurstOrigin.value.copy(pointer); burstTime = elapsed;
        };
        const onLost = (event: Event) => { event.preventDefault(); lost = true; portfolio?.removeAttribute("data-scene"); };
        renderer.domElement.setAttribute("aria-hidden", "true"); element.appendChild(renderer.domElement);
        element.dataset.particleCount = String(sampled.count); element.dataset.particleGroups = sampled.groups.join(",");
        renderer.domElement.addEventListener("webglcontextlost", onLost);
        window.addEventListener("pointermove", onPointer, { passive: true }); window.addEventListener("pointerdown", onDown, { passive: true });
        document.documentElement.addEventListener("pointerleave", onLeave);
        const observer = new ResizeObserver(resize); observer.observe(element); resize();
        const render = (time: number) => {
          const delta = lastTick < 0 ? 0 : Math.min(time - lastTick, .05); lastTick = time;
          if (cancelled || lost || document.hidden || state.current.paused || !renderer) return;
          elapsed += delta;
          if (small && lastFrame >= 0 && time - lastFrame < 1 / 30) return;
          lastFrame = time;
          const phase = state.current.phase;
          easedPointer.lerp(pointer, .16); uniforms.uPointer.value.copy(easedPointer);
          uniforms.uHover.value = THREE.MathUtils.lerp(uniforms.uHover.value, elapsed - lastMove < .25 ? 1 : 0, .065);
          if (burstValue !== state.current.burst) { burstValue = state.current.burst; burstTime = elapsed; uniforms.uBurstOrigin.value.set(0, -viewHeight * .1); }
          chapter = THREE.MathUtils.lerp(chapter, state.current.chapter, .06); uniforms.uChapter.value = chapter;
          uniforms.uBurstAge.value = elapsed - burstTime;
          uniforms.uPhase.value = phase; uniforms.uTime.value = elapsed;
          uniforms.uWork.value = state.current.work; uniforms.uVelocity.value = state.current.velocity;
          state.current.velocity *= .94;
          uniforms.uEnter.value = THREE.MathUtils.smoothstep(elapsed, 0, 1.25);
          renderer.render(scene, camera);
          if (!ready && elapsed > .06) { portfolio?.setAttribute("data-scene", "ready"); ready = true; }
          const nextForm = formForPhase(phase);
          if (nextForm !== form) { form = nextForm; element.dataset.form = form; }
          const phaseLabel = phase.toFixed(2);
          if (element.dataset.phase !== phaseLabel) element.dataset.phase = phaseLabel;
        };
        render(0); gsap.ticker.add(render);
        cleanup = () => {
          gsap.ticker.remove(render); observer.disconnect();
          window.removeEventListener("pointermove", onPointer); window.removeEventListener("pointerdown", onDown); document.documentElement.removeEventListener("pointerleave", onLeave);
          renderer?.domElement.removeEventListener("webglcontextlost", onLost); renderer?.domElement.remove();
          sampled.geometry.dispose(); material.dispose(); glyphs.dispose(); source?.dispose(); renderer?.dispose();
          portfolio?.removeAttribute("data-scene"); delete element.dataset.particleCount; delete element.dataset.particleGroups; delete element.dataset.form; delete element.dataset.phase;
        };
      } catch { source?.dispose(); renderer?.dispose(); portfolio?.removeAttribute("data-scene"); }
    }
    void start();
    return () => { cancelled = true; cleanup(); };
  }, [motion, state]);
  return <div className="continuity-canvas" ref={host} style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }} aria-hidden="true" />;
}
