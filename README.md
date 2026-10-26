# Vow & Verse

An original, tracker-free wedding invitation studio with an understated ink, warm-ivory and muted-brass identity. Eleven fictional celebrations have eleven independently composed pages, original generated imagery, personalised stories, multi-day programmes and distinct opening sequences.

## Run locally

Requires Node.js 22.12 or later.

```sh
npm ci
npm run dev
```

Production build and local preview:

```sh
npm run build
npm run preview -- --port 4173
```

Hash routes work without server-side routing. Asset URLs assume the website is served from a domain root. The repository is connected to the owner’s Netlify preview at https://avyuab.netlify.app. No backend or third-party application service is configured.

The name is a creative identity; no trademark or domain availability is claimed. Existing invitation URLs and saved browser drafts remain compatible.

## Illustrated invitation direction

The homepage presents the composed invitation collection as a fan of stationery rather than a venue-photo hero. Each preview opens through a material-specific object: garden gates, paper seals, carved doors, painted shutters, a star screen, stitched cloth or a drawn kolam. Twelve original local painted assets and six vector illustration systems carry through the covers, families, date keepsakes and programmes. Names remain live text within the compositions.

Preview dates can be uncovered with a click or keyboard activation. Reduced motion skips opening choreography and decorative particles. Exports intentionally open directly to the invitation and show the date; they contain no scripts or RSVP form. The generated people are fictional artwork, not personalised portraits.

## Collection

| Design | Fictional couple | Composition |
| --- | --- | --- |
| Garden Verse | Ira & Neel | Painted lotus garden, openwork gates, framed family niches and three-day gathering |
| A Letter to You | Leela & Samar | Deckle-edge stationery, personal letter, diary and reply card |
| The First Light | Vedika & Om | Carved sandalwood portal, dawn temple painting and scalloped ceremony programme |
| Wildflower Waltz | Aditi & Joel | Blush folding stationery, botanical arch, circular initials and garden-party programme |
| An Evening in Verse | Saira & Rishabh | Burgundy/gold manuscript doors, jharokha, mandala and arch programme |
| A Stillwater Story | Esha & Ronit | Painted floral shutters, lake-palace manuscript and four-part weekend programme |
| A Sacred Beginning | Revathi & Madhav | Carved-stone architecture, ceremony-first callout, family blessing |
| Written in Earth | Avni & Kian | Seven-ring ceremonial print, terracotta flame and ruled editorial programme |
| The Moonlit Promise | Safiya & Hamza | Emerald star screen, pointed arch, lanterns and Nikah gathering |
| Threads of Promise | Harleen & Angad | Magenta/saffron embroidered cloth, tilted folk lettering and stitched Anand Karaj programme |
| A Silk Serenade | Janani & Vishal | Drawn kolam, magenta silk border, jasmine and temple illustration, wedding almanac |

All couples, stories, venues and arrangements are fictional. The scenes are original AI-generated artwork, not photographs of actual customers or venues. See [asset provenance](docs/ASSETS.md).

## Implemented features

- Searchable, filterable responsive collection and complete invitation previews.
- Eleven art-directed invitation compositions and opening directions, with keyboard access and reduced-motion support.
- Per-design sample content and isolated drafts. Switching designs restores that design’s sample, saved draft, or current unsaved edits; it does not copy another couple into the new design.
- Live editing of names, hosting line, date, city, story, closing note and one to six individually dated events.
- Chronological event display, add/remove event controls and venue-local calendar downloads.
- Explicit save/delete in browser localStorage. Unsaved edits stay only in the current tab.
- Standalone HTML download with embedded images and fonts. It renders without network access and contains no JavaScript.
- Honest RSVP demonstration: no response is transmitted or stored.

Changing the main wedding date does not automatically shift individual event dates. Edit each event date explicitly. Calendar times are floating venue-local times; guests should confirm the venue timezone.

## Deliberate boundaries

There is no backend, authentication, payment processing, messaging, built-in publishing, real RSVP collection, guest database, music playback, photo upload or map embed. The downloaded invitation is an offline keepsake, not a hosted share link. Generated character illustrations are fictional examples and are not personalised portraits. The day countdown is calculated when the page renders.

Drafts can contain personal details. Anyone using the same browser profile may access them. Saving is explicit, and drafts can be deleted from the editor or by clearing browser site data. No cookies or tracking identifiers are used.

## Architecture

- `src/data.js`: eleven fictional sample weddings and design metadata.
- `src/invitations.js`: reusable content components and eleven distinct composition functions.
- `src/main.js`: gallery, routing, isolated editor drafts, event management, calendars and offline export.
- `src/invitation.css`: responsive invitation compositions, also included in the export.
- `src/craft-art.js`, `src/craft.css`: original vector illustration, invitation framing and material opening choreography.
- `src/studio-home.css`: stationery-led collection homepage.
- `src/style.css`, `src/v2.css`: shared editor shell and legacy style foundations.
- `public/images/craft/`: twelve locally served illustrated opening, cover and interior artworks. Earlier unused first-edition artwork remains in `public/images/` for provenance.
- `licenses/`: SIL Open Font License notices for locally bundled fonts.

## Tests

Start the production preview on port 4173, then:

```sh
npm test
npm run test:branding
node tests/home.mjs
node tests/craft.mjs
npm run audit:source
```

Tests use Playwright with an installed Chromium binary. Set `CHROMIUM_PATH` if it is not at `/usr/bin/chromium`, and `TEST_URL` for a different local server. The suite covers three viewport widths, all designs, reduced and normal motion, distinct content, chronological events, draft isolation, editor controls, offline export and external request detection. Screenshots produced by tests are local review artifacts and are ignored by Git.

Static audit scans application text assets for external URLs and common tracking markers; image files are excluded from the text scan. Runtime network capture complements that check. CSP restricts application resources to the same origin; exports permit only embedded images/fonts and inline styles.

Browser verification is Chromium-based. Safari, Firefox, physical devices, all possible multilingual/long inputs and formal accessibility conformance have not been exhaustively verified.
