# Accurate homepage invitation previews

The homepage uses local JPEG captures of the actual invitation renderer. It does not reconstruct invitation typography, seals or layers inside the homepage CSS environment.

For each of the eleven designs, `public/images/previews/manifest.json` records three states:

- `closed`: complete actual entry surface, including dedication, material panels, seal and opening instruction.
- `open`: the first844px of actual invitation content after opening, starting at the cover. Depending on the design this includes the beginning of the following section and the real reduced-motion control. The gallery handset uses this state.
- `cover`: the complete opened cover element at its natural aspect ratio. The hero uses this state without cropping the artwork under its separate link caption.

The chosen reference viewport is390×844 CSS pixels, device scale1, locale en-GB, timezone UTC, reduced motion. Images are static representations; the full preview remains interactive. Thumbnails do not promise to reproduce every responsive viewport or every animation frame. No demo markup, animation observers or invitation listeners are mounted inside gallery cards.

## Regenerate

Install project dependencies, then build and serve the local production preview:

```sh
npm ci
npm run build
npm run preview -- --port 4181
```

In another terminal:

```sh
node scripts/generate-previews.mjs
npm run build
node scripts/generate-previews.mjs --check
```

The script uses Playwright and `/usr/bin/chromium` by default. Set `CHROMIUM_PATH` to another installed Chromium executable and `TEST_URL` if using a different local preview URL. Do not point it at a site containing real customer data. It uses the built-in fictional samples in a fresh browser context.

The capture waits for fonts and image decode, opens the actual seal button, honours reduced motion and clips screenshots from the rendered page. Full-page clipping avoids an element-screenshot scroll race that could otherwise truncate the opening instruction. There is no image retouching, typography recreation or screenshot compositing in the saved product assets.

`--check` regenerates all33 states in memory and compares their SHA256 values with the committed files. Run it after changing sample data, invitation rendering, fonts or styles. Regenerate with the same installed Chromium version for byte-for-byte reproducibility; different browser versions can rasterise text differently. The manifest includes dimensions, byte sizes and hashes. The website never captures images at runtime or requests a remote screenshot service.

## Changes from the earlier thumbnails

Earlier closed thumbnails displayed only raw art plus a generic circular initial badge. They omitted the real dedication, material-specific seal, labels and instructions. Earlier open thumbnails called `sceneCover` without foreground layers, substituted heading elements, inherited homepage typography and missed `#opened-invite` rules. Their forced aspect ratio also differed from the real cover. The current captures retain those actual details for all eleven designs and preserve image proportions.
