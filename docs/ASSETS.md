# Original asset provenance — Vow & Verse

The eleven images in `public/images/` were generated specifically for Vow & Verse using OpenAI image generation on 2026-10-25. Each came from a separate original prompt. No competitor image, stock photograph, customer portrait, external logo or reference image was supplied. The results depict imaginary settings and still lifes; no scene should be represented as a booked or real venue.

| File | Art direction |
| --- | --- |
| courtyard.webp | Fictional rose-stone Rajasthani haveli, carved arches, jade reflecting pool, jasmine and natural afternoon light |
| letters.webp | Blank cotton-paper stationery, plum ribbon, wax seal and a walnut writing desk |
| dawn.webp | Imagined Western Ghats hilltop ceremony terrace, dawn mist, jasmine and saffron marigold |
| herbarium.webp | Wild floral arrangement, amber glass, linen and a green conservatory |
| velvet.webp | Imagined candlelit Indian palace salon, plum velvet, brass and deep red flowers |
| lake.webp | Fictional Kumaon lakeside pavilion, willow branches, misty hills and a rowboat |
| temple.webp | Imagined South Indian granite ceremonial courtyard, jasmine, banana leaves and a brass lamp; no deity sculptures |
| earthen.webp | Sculptural terracotta and chalk ceramics, travertine, olive branch and geometric sunlight |
| moon.webp | Fictional moonlit Indian family courtyard, geometric jaali screens, tuberose and quiet lanterns; no religious text |
| tapestry.webp | Original Punjabi phulkari-inspired embroidery, silk stitches, marigolds and aged wood |
| silk.webp | Kanjeevaram-inspired cream and teal silk, jasmine strings, brass lamps and warm morning light |

Generated PNG results were encoded locally to WebP at quality 85, without creative pixel editing. All runtime images are local. These first-edition assets remain in the source for provenance, but the current invitation experience does not use repeated scene crops as a gallery. No third-party image network is contacted.

The Vow & Verse wordmark uses local typography with a brass italic ampersand. The favicon is original paired-V SVG geometry in ink and brass. Its SVG namespace is an identifier, not a network request.

Fonts: Cormorant Garamond and Manrope, self-hosted from `@fontsource` packages, under the SIL Open Font License. License notices are included in `licenses/`. No Google Fonts or other font CDN is used. Offline invitation exports embed the local regular serif, italic serif and regular sans fonts.

All sample identities, stories, event names and venues are original fictional examples. Cultural references are used as illustrative design context, not a claim that every family follows the same customs. Hosts should adapt wording, programmes and guidance to their own celebration.

## Illustrated invitation collection — 2026-10-26

Twelve new original image-generation outputs are stored locally under `public/images/craft/`. They were created with OpenAI image generation from newly written art directions; no competitor asset was supplied. Matching open-state edits used only our own newly generated closed-state image as a reference. The PNG outputs were encoded to WebP at quality 88 without cropping or creative pixel editing.

| Files | Original composition |
| --- | --- |
| courtyard-closed/open.webp | Peach carved garden arch, lotus-metal gates, pond, flowering perimeter and a small fictional couple |
| courtyard-interior.webp | Coordinating carved garden and jasmine/rose stationery, generated from our own garden artwork |
| letters-interior.webp | Asymmetric cornflower, cosmos and daisy cotton-paper stationery, generated from our own letter artwork |
| letters-closed/open.webp | Deckle-edged envelope and botanical wax seal within a watercolor wildflower meadow; airy letter clearing and small fictional couple |
| dawn-closed/open.webp | Carved pale sandalwood temple doors, jasmine, bells, lamps and a dawn-garden opening with fictional couple |
| lake-closed/open.webp | Floral-fresco plum shutters and ivory lake-palace manuscript with painted peacocks and fictional couple |
| temple-closed/open.webp | Southern stone/teak threshold, brass studs, mango-leaf/jasmine toran, silk perimeter, kolam and distant temple/couple |

`src/craft-art.js` contains original authored SVG geometry: botanical paper, marigold garlands, mandala/jharokha stationery, seven-ring fire print, lantern/star jaali, embroidered satin-stitch-inspired cloth, a continuous-loop kolam, jasmine strings, brass lamps and a temple silhouette. These drawings are not copied/traced source artwork. The motifs are decorative cultural interpretations, not instructions for religious ceremony.

Additional local fonts: Parisienne, Cinzel and Fraunces from pinned Fontsource packages, SIL Open Font License; notices in `licenses/`. All six used font faces are embedded in offline keepsakes. No remote font or image request is required.

Characters in generated illustrations are fictional sample art and are not portraits of the entered names. Personalisation changes text and event details; it does not regenerate character likenesses or illustrative venue geography.

Text compatibility adds pinned Fontsource Noto Sans Devanagari, Noto Sans Malayalam and Noto Sans Tamil 5.3.0, using the 400-weight script subsets locally. The original font files are unchanged; SIL OFL notices are in `licenses/`. These fonts are embedded in standalone keepsakes alongside the existing faces. No new artwork or photo-upload capability is introduced by the readiness pass.

## Independent transparent scene planes — 2026-10-26

Three new original assets were generated with OpenAI image generation, with transparent backgrounds and no supplied reference images: `layers/lotus-foreground.webp` (dusty pink lotus, sage leaves and jasmine at the lower corners), `layers/meadow-foreground.webp` (cosmos, cornflowers and fine meadow grasses), and `layers/jasmine-corners.webp` (upper-corner jasmine, mango leaves and antique brass bell). These are generated watercolor-style illustrations, not photographed or physically hand-painted objects. They were requested as independent overlays with clear central negative space, not complete posters. No competitor artwork, branding, customer portrait or real venue was supplied.

The original PNG outputs remain preserved outside the runnable source archive. Runtime WebP files preserve transparency and full image dimensions; only format encoding/compression was performed. Lotus and jasmine use quality 84; meadow uses quality 72 with WebP method 6. No scripted raster cropping, background removal, compositing or painting was used.

Nineteen additional original SVG image planes were authored as code-native geometry in `tools/build-depth-art.mjs`. Their botanical, jaali, lantern, textile, clay and zari forms are original constructions rather than traced assets. All 22 runtime layer files are local in `public/images/layers/`. The per-design composition and motion boundaries are documented in [SCENE-LAYERS.md](SCENE-LAYERS.md).

## Invitation interior refinement

The eleven small closing marks in `src/invitations.js` are original code-native SVG linework (garden petals, correspondence, threshold, botanical stem, salon arch, paper boat, brass lamp, shared bowl, crescent, embroidery and kolam-inspired geometry). They are not generated raster imagery or traced reference assets. Fine silk warp/weft is a local CSS pattern. Existing painted scenes and transparent image assets are unchanged.

### Lower-interior art, October 2026

Four new original images were generated with OpenAI image generation from original descriptions, without supplied reference images or competitor assets. They depict imaginary garden pavilions/lotus pool, a lake palace shoreline, a granite temple courtyard and a sandstone dawn veranda. They are stored locally as `images/interiors/{courtyard,lake,temple,dawn}-painted-vista.webp`, each 2172×724 with transparency. Generation produced PNGs; delivery uses alpha-preserving WebP format encoding (quality 82), without cropping, resizing, raster compositing or creative pixel editing. They are AI-generated illustrations, not photographs of actual venues or commissioned hand-painted works.

The 96 SVG images in the same directory are original code-native vector geometry authored in `tools/build-interior-art.mjs`. Their material details and framing are not traced from competitor art. All assets are decorative, local and noninteractive. Existing botanical foreground assets are reused where their subject fits. No remote image/font service is required.
