import sharp from "sharp";

const source = "assets/reading/hero-reference.png";
const metadata = await sharp(source).metadata();
if (metadata.width !== 1536 || metadata.height !== 1024) throw new Error("The particle masks expect the approved 1536 × 1024 composition.");
await sharp(source).webp({ lossless: true, effort: 6 }).toFile("public/reading/hero-reference.webp");
console.log("Prepared the lossless particle source. Artwork sampling removes the concept UI at runtime.");
