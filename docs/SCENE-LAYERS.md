# Composited invitation artwork

The opened invitations combine an existing distant scene with two independently composited transparent image planes. These are decorative assets, not new content sections. The homepage specimens and closed opening objects retain their prior composition.

| Design | Middle plane | Near plane / interior detail |
| --- | --- | --- |
| Garden Verse | Light at the existing lanterns; sparse outer foliage | Generated lotus corners; restrained perimeter relief |
| A Letter to You | Faint pressed stems and paper-edge lines | Generated cornflower/cosmos meadow foreground |
| The First Light | Warm light at the existing lamps and bells | Individual jasmine threads; generated jasmine corners on the interior |
| Wildflower Waltz | Pale botanical silhouettes | Shaded peonies and veined leaves, continued at the stationery margins |
| An Evening in Verse | Fine gold lattice in the side bays | Folded plum fabric, gold cord and edge tassels; lattice on the interior |
| A Stillwater Story | Fine water reflections and outer fronds | Lotus foreground at a lower placement, preserving the couple and palace |
| A Sacred Beginning | Small pools of light at the brass lamps | Fine brass highlights and small flames; generated mango/jasmine interior corners |
| Written in Earth | Pale dried-palm silhouettes and ground lines | Separate terracotta vessel, dried palm and leaves at the bottom edges |
| The Moonlit Promise | Side-bay jaali and warm light behind the existing lanterns | Two small pierced-metal lanterns at the outer edges; central lettering stays clear |
| Threads of Promise | Fine stitched edge bands | Folded embroidered corners, appliqué rosettes and small tassels |
| A Silk Serenade | Fine zari weave along the side borders | Jasmine strings and gold-edged paisley details |

## Original assets and transfer budget

`public/images/layers/` contains 19 hand-authored SVG planes and three original generated transparent botanical images. The SVG source is reproducible with `node tools/build-depth-art.mjs`; it authors vector geometry and does not trace or edit raster images. See ASSETS.md for generation provenance.

The complete added asset set is 1,190,520 bytes. The largest individual asset is under 600 kB. The three generated PNGs were format-encoded to alpha-preserving WebP without cropping, raster compositing, resizing or creative pixel edits. The botanical planes are reused only where their subject fits: lotus for the two painted garden/lake designs, and jasmine for the two temple-inspired interiors. Each design retains its own composition and vector details.

All added artwork uses local image requests. Assets are lazy-loaded when their invitation becomes visible; no added layer assets are fetched on the homepage. SVGs contain no scripts, embedded third-party resources or interactive controls.

## Motion, access and layout

The existing scene-depth value drives the middle plane at 0.35× and the near plane at −0.65×, producing restrained relative movement without adding a continuous animation loop. The existing controller bounds the input to ±9px, stops updates offscreen/background, and cleans up on navigation. Pause motion and OS reduced motion disable the added transforms. Extended-name layouts constrain the planes to the artwork area rather than stretching them through the text panel.

Layers are aria-hidden, have empty image alternatives and ignore pointer events. Names, date and other functional content remain above the decoration. Interior detail is restricted to the outer margins. The scratch surface, tap/keyboard alternative, fullscreen controls, calendar and assisted-order action retain their existing behavior.

## Verification limits

Local Chromium tests cover all eleven designs at phone and desktop widths, decoded image assets, distinct plane transforms, pause/reduced motion, no overflow, scratch/reveal interactions and the published rendering path with long Indic text and twenty events. Screenshots are reviewed at cover and interior positions. These checks are not physical iPhone, Safari, WhatsApp webview, GPU profiling or deployed Cloudflare tests. No backend, authorization, payment or host-routing behavior changed in this artwork pass.
