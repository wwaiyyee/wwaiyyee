/** Static fallback only. Full motion replaces this with individual WebGL glyph particles. */
export default function HeroArtwork() {
  return <svg viewBox="0 0 1536 1024" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <filter id="reading-ink" colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 .596 0 0 0 0 .263 0 0 0 0 .365 3.8 -3.8 0 0 -.087" /></filter>
      <clipPath id="reading-art-area"><path d="M0 200H1000V95H1536V994H0Z" /></clipPath>
    </defs>
    <image href="/reading/hero-reference.webp" width="1536" height="1024" filter="url(#reading-ink)" clipPath="url(#reading-art-area)" />
  </svg>;
}
