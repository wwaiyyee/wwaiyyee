# Reading artwork

The active source is `hero-reference.png`: the exact 1536 × 1024 concept supplied by the user on 2 November 2026 (`codex-clipboard-545e4f0e-bf92-41ee-8703-e09549e72d85.png`). `npm run assets:reading` creates `public/reading/hero-reference.webp` with lossless compression. The source is illustration, not a photograph or a scan of the owner.

The full-motion hero renders a `THREE.Points` cloud: every sampled tile has its own position, depth, semantic part, seed, and six morph targets. No textured image mesh is drawn. The source supplies each tile's glyph texture; the shader removes the paper and drives each tile independently. The hand, individual cards, crescent, and dust float separately, react to cursor repulsion and tap ripples, and regroup into an eye, tarot fan, orbiting code, camera, compass, and paper plane. Page text and navigation remain separate HTML, and source UI regions are excluded from sampling.

The static reduced-motion / WebGL fallback is an SVG-filtered rendering of this same source. Mobile uses fewer samples and a capped render rate. Owner portraits and project screenshots are the existing real portfolio content.

The previous low-poly test and its license are retained in the ignored design archive. The earlier transparent artwork (`hero-art-source.png` and `hero-art.webp`) is archived in `docs/redesign/living-particles/earlier-artwork/` and is not loaded by the current page. Its original editing prompt is retained below for provenance.

## Earlier artwork iteration — editing prompt

```text
Use case: background-extraction / precise-object-edit.
Input image is the edit target: the approved warm-ivory portfolio mockup with burgundy ASCII hand, floating crescent and three cards.
Create a production artwork layer from it. Keep ONLY the hand/forearm, crescent moon, the three floating tarot cards, and their sparse nearby typographic particles. Remove ALL website UI and text: remove the top crescent logo, all navigation, the two-line headline, all footer labels, and the background itself. Output on a genuinely transparent background, preserving the original wide 3:2 canvas and the exact positions and scale of the central artwork so the website can put real HTML text back above it.
Preserve the detailed burgundy alphanumeric character rendering, the hand's shading and natural palm-up pose, individual fingers and distinct thumb, fine palm and wrist contours, and the delicate crescent/card art. Do not redraw this as a low-poly mesh or as large repeated 8s. Keep subtle variation in character sizes, character orientation, density and translucency that makes the form feel organic and three-dimensional. The hand must keep four fingers and one thumb with a natural continuous wrist. Refine rough edges only, no extra digits or shapes.
The forearm enters from the left lower edge, the palm and fingers fill the lower-right, the moon floats above the palm to upper-right and three thin cards hover nearer the center. Keep the large empty space above for the webpage headline, but make it transparent. Preserve the burgundy #925266 character color rather than gray. No solid painted hand, no skin pixels, no panel, no border, no new text, no watermark. This is an isolated transparent artwork asset, NOT another webpage screenshot.
```
