# InviteStory — Atelier II

An original, tracker-free wedding invitation studio. Eleven fictional celebrations have eleven independently composed pages, original generated imagery, personalised stories, multi-day programmes and distinct opening sequences.

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

Hash routes work without server-side routing. Asset URLs assume the website is served from a domain root. No hosting or external service is configured.

## Collection

| Design | Fictional couple | Composition |
| --- | --- | --- |
| The Secret Courtyard | Ira & Neel | Photographic garden, architectural title, three-day gathering |
| Letters to You | Leela & Samar | Deckle-edge stationery, personal letter, diary and reply card |
| First Light | Vedika & Om | Sunrise scene, time-led itinerary, hillside story panel |
| The Wildflower Edit | Aditi & Joel | Botanical specimen book, conservatory and garden-party programme |
| Afterglow | Saira & Rishabh | Evening poster, candlelit salon programme and musical interlude |
| Stillwater | Esha & Ronit | Travel journal, four-part weekend itinerary and postcard |
| Sanctuary | Revathi & Madhav | Carved-stone architecture, ceremony-first callout, family blessing |
| Earth & Ember | Avni & Kian | Numbered modern folio, sculptural still life and editorial grid |
| Under One Moon | Safiya & Hamza | Moonlit architecture, Nikah gathering, pearl-toned story |
| Woven Together | Harleen & Angad | Embroidered banner, family album, Anand Karaj programme |
| Silk & Symphony | Janani & Vishal | Silk borders, wedding almanac and material diptych |

All couples, stories, venues and arrangements are fictional. The scenes are original AI-generated artwork, not photographs of actual customers or venues. See [asset provenance](docs/ASSETS.md).

## Implemented features

- Searchable, filterable responsive collection and complete invitation previews.
- Eleven independent section trees and opening directions, with keyboard access and reduced-motion support.
- Per-design sample content and isolated drafts. Switching designs restores that design’s sample, saved draft, or current unsaved edits; it does not copy another couple into the new design.
- Live editing of names, hosting line, date, city, story, closing note and one to six individually dated events.
- Chronological event display, add/remove event controls and venue-local calendar downloads.
- Explicit save/delete in browser localStorage. Unsaved edits stay only in the current tab.
- Standalone HTML download with embedded images and fonts. It renders without network access and contains no JavaScript.
- Honest RSVP demonstration: no response is transmitted or stored.

Changing the main wedding date does not automatically shift individual event dates. Edit each event date explicitly. Calendar times are floating venue-local times; guests should confirm the venue timezone.

## Deliberate boundaries

There is no backend, authentication, payment processing, messaging, public hosting, real RSVP collection, guest database, music playback, photo upload or map embed. The downloaded invitation is an offline keepsake, not a hosted share link. Gallery details are art-directed crops of each design’s generated scene, not documentary wedding photographs. The day countdown is calculated when the page renders.

Drafts can contain personal details. Anyone using the same browser profile may access them. Saving is explicit, and drafts can be deleted from the editor or by clearing browser site data. No cookies or tracking identifiers are used.

## Architecture

- `src/data.js`: eleven fictional sample weddings and design metadata.
- `src/invitations.js`: reusable content components and eleven distinct composition functions.
- `src/main.js`: gallery, routing, isolated editor drafts, event management, calendars and offline export.
- `src/invitation.css`: responsive invitation compositions, also included in the export.
- `src/style.css`, `src/v2.css`: studio shell, gallery, photographic homepage and opening sequences.
- `public/images/`: eleven locally served WebP artworks.
- `licenses/`: SIL Open Font License notices for locally bundled fonts.

## Tests

Start the production preview on port 4173, then:

```sh
npm test
npm run audit:source
```

Tests use Playwright with an installed Chromium binary. Set `CHROMIUM_PATH` if it is not at `/usr/bin/chromium`, and `TEST_URL` for a different local server. The suite covers three viewport widths, all designs, reduced and normal motion, distinct content, chronological events, draft isolation, editor controls, offline export and external request detection. Screenshots produced by tests are local review artifacts and are ignored by Git.

Static audit scans application text assets for external URLs and common tracking markers; image files are excluded from the text scan. Runtime network capture complements that check. CSP restricts application resources to the same origin; exports permit only embedded images/fonts and inline styles.

Browser verification is Chromium-based. Safari, Firefox, physical devices, all possible multilingual/long inputs and formal accessibility conformance have not been exhaustively verified.
