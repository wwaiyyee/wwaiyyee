# The Reading — portfolio implementation

An ivory and dusty burgundy portfolio inspired by the pacing of [Manish Kumar’s portfolio](https://www.manishkr.xyz/) and the approved hand/card and perspective-gallery concepts. The implementation uses Wai Yee’s own content, project screenshots, and tarot imagery.

## Page flow

1. **Home:** quiet two-line introduction over a detailed ASCII hand, floating cards, and crescent.
2. **Introduction:** the hand disperses into a blinking eye above a word-by-word reveal. Particles remain alive while the visitor pauses.
3. **Work:** a particle tarot fan sits behind five real project screenshots moving through a perspective wave. The screenshot frames float independently. Scrolling, arrow controls, and named project controls select the foreground project. Project details open in a native dialog.
4. **Perspectives:** large AI/software/curiosity statements reveal in depth as orbiting code brackets transform into a three-dimensional camera outline.
5. **About:** the camera gives way to a quiet symbol that changes with The Builder (code), The Reader (eye), or The Wanderer (compass). Photos reveal and move in parallax alongside the professional bio and experience.
6. **Connect:** particles regroup as a floating paper plane between AI and Software, followed by contact links and availability.

The navigation retains Home, About, Work, and Connect. About appears after Work in the scroll story; its navigation link jumps directly there. Legacy About/Work/Case Studies routes redirect into this page, and supported old project IDs open the corresponding project dialog.

## Visual and motion system

- Paper `#faf7f2`, ink `#2d2729`, burgundy `#925266`.
- Locally bundled Manrope and IBM Plex Mono; no runtime font-service request.
- GSAP ScrollTrigger coordinates text, image planes, parallax, and particle phases. Lenis adds smooth wheel scrolling on desktop with a fine pointer.
- One Three.js canvas remains fixed across the whole page. **Full motion renders only a point cloud; there is no textured hand mesh or flat image plane.** Around 19,300 independently animated glyph tiles reconstruct the supplied hero on desktop. The hand, three cards, crescent, and stray dust have separate idle motion. The input image supplies glyph shapes and anatomy; it is not a rigged human hand.
- Cursor movement repels nearby vertices, which settle back into their moving forms. Tapping the background or pressing **stir the particles** sends an expanding ripple through the cloud. Source glyphs become a local ASCII atlas during scroll morphs.
- Scroll transitions include zoom, vortex dispersion, regrouping, staggered text depth/blur reveals, perspective entrances/exits, floating frames, photo reveals, and parallax. Particle displacement also responds to scroll velocity.
- Mobile uses a lower particle density, capped pixel ratio and frame rate, native scrolling, and a readable project list. Resizing updates the composition.
- OS reduced-motion preferences and the on-page motion control remove the scroll choreography. The full static artwork and semantic content remain available when animation or WebGL is unavailable.
- Sound starts off. The optional ambient chord is generated locally with Web Audio.
- Project dialogs support Escape, browser Back, direct URLs, keyboard focus restoration, screenshot controls, and real outbound links.

## Editing

| File | Purpose |
| --- | --- |
| `data/portfolio.ts` | Profile, projects, chapters, screenshots, links, and old project aliases |
| `components/reading/Portfolio.tsx` | Semantic page, dialogs, controls, scroll choreography |
| `components/reading/ReadingScene.tsx` | Live particle shaders, cursor and tap response, shape choreography, WebGL lifecycle |
| `components/reading/particleGeometry.ts` | Source sampling, six independently generated 3D morph targets, local glyph atlas |
| `components/reading/HeroArtwork.tsx` | Static SVG-filtered fallback for reduced motion and unavailable WebGL |
| `app/portfolio.css` | Layout, typography, palette, responsive and reduced-motion styles |
| `assets/reading/ARTWORK.md` | Artwork provenance and generation prompt |
| `scripts/prepare-reading-art.mjs` | Losslessly compresses the exact supplied composition into the public sampling texture |

The active source is `assets/reading/hero-reference.png`, copied from the latest user-supplied 1536 × 1024 concept. Run `npm run assets:reading` to regenerate its lossless WebP. Source UI and typography are excluded by the sampler. A composition change requires reviewing the region masks and semantic group bounds in `particleGeometry.ts`.

Run `npm run dev` for the local preview, `npx tsc --noEmit` for type checking, and `npm run build` before deployment. The canvas exposes its particle count, group counts, and current form as DOM data attributes for verification.

## Content and release notes

The profile presents a 2026 First Class AI graduate from Taylor’s University, CGPA 3.78/4.00, Dean’s List each semester, and a completed TNG Digital internship (April–October 2026). Availability is November 2026; location is Kuala Lumpur/Petaling Jaya, with remote/hybrid opportunities welcomed.

Real project names are the primary labels. Actual tarot names appear only as small secondary references inside project details, preserving clarity for recruiters.

The existing `public/Resume.pdf` is linked as supplied; it has not been rewritten. Older inactive components remain in the repository but are not imported by the new page. No deployment or hosting migration is part of this local implementation.

## Verification of the living-particle revision

- Production build and TypeScript passed.
- Lossless sampling texture compared equal to the supplied source's decoded pixels.
- All ten vertex attributes have matching counts and finite values; all six semantic parts and six morph targets are populated.
- Desktop: 19,299 particles. Phone: 8,157 particles.
- Browser checks at 1280 × 720 and a 390 × 780 phone viewport: no horizontal overflow, live hero, gallery controls, project dialog and focus return, and settled paper-plane contact form.
- Reduced motion removes the canvas and floating-frame animation, restores the project grid, and shows the static artwork. Full motion can be restored without reloading.
- A 40-frame, approximately three-second capture of the actual browser interaction is saved in `docs/redesign/living-particles/live-particles.webp` (the design archive is ignored by Git). The capture shows real rendering; it is not a generated animation mockup.
