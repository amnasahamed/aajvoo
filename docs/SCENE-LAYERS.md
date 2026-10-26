# Composited invitation artwork

The opened invitations combine an existing distant scene with two independently composited transparent image planes. These are decorative assets, not new content sections. The homepage specimens and closed opening objects retain their prior composition.

| Design | Middle plane | Near plane / interior detail |
| --- | --- | --- |
| Garden Verse | Light at the existing lanterns; sparse outer foliage | Generated lotus corners; restrained perimeter relief |
| A Letter to You | Faint pressed stems and paper-edge lines | Generated cornflower/cosmos meadow foreground |
| The First Light | Warm light at the existing lamps and bells | Individual jasmine threads; generated jasmine corners on the interior |
| Wildflower Waltz | Pale botanical silhouettes | Flat inked flowers and veined leaves, continued at the stationery margins |
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

## Lower-section compositions (October 2026)

`src/interior-scenes.js` now composes separate far and near images for programme, story, guest notes, reply paper and closing. Letter retains its direct personal letter instead of adding a story frame. Programme/closing scenes have reserved dimensions; story and notes use quiet material sheets and masked outer-edge details. Reply art sits inside the form at its edges, behind controls. Text itself does not parallax. Painted introductory perimeter art no longer repeats indefinitely down the page.

`public/images/interiors/` contains 96 original code-native SVG assets and four original generated transparent painted vistas. `tools/build-interior-art.mjs` reproduces the SVG artwork and prunes unused generated SVGs. The painted vistas are not reproduced by that script. Garden has pavilions and lotus water; Dawn sandstone verandas; Lake a fictional ivory lake palace; Temple granite architecture with banana/jasmine details. Other themes retain botanical stationery, salon metalwork, terracotta, jaali, embroidery or woven linework. These are decorative imaginary settings, not real venues. Scenes intentionally reuse a theme's distant vista at programme and closing, with different foreground framing; they do not claim every section has a unique painting.

Each visible scene receives a bounded ±10px scroll-depth input. Far and near planes use different multipliers (−0.32 and +0.70); optional botanical foreground uses +1.05. Only visible scenes update in the existing passive-scroll/requestAnimationFrame controller. Offscreen scenes stop updating, hidden documents stop decoration, and navigation disposes observers/listeners/timers. OS reduced motion and the in-flow Pause motion control disable all new movement. Static rendering keeps content visible.

Date completion creates one finite burst of twelve theme-appropriate marks: petals for botanical/lake designs, stitched diamonds for Threads/Silk, leaves for Earth and gold flecks for the architectural/night designs. It does not replay on scrolling or repeated activation. Calendar feedback says only that a file was requested; it does not claim that an operating-system calendar saved it. Reply acknowledgement remains a local demonstration, never a sent RSVP. Paused/reduced-motion paths retain immediate readable status without bursts. No new sections, tracker, network service or backend behavior is introduced.
