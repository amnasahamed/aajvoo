# Vow & Verse

An original, tracker-free wedding invitation collection with an assisted WhatsApp-first business workflow. Customers browse eleven full invitation experiences; staff handle personalization in a protected Cloudflare-ready portal.

## Run the gallery

Node.js 22.12+ runs Vite; the SQLite backend test adapter requires Node.js 24.

```sh
npm ci
npm run dev
npm run build
npm run preview -- --port 4175
```

The owner's Netlify preview at https://avyuab.netlify.app remains a static gallery. Cloudflare deployment is not required to browse it. No Cloudflare account, domain, database, bucket or Access configuration is supplied or activated.

## Customer journey

Browse and filter the collection, open an immersive full-viewport preview, and choose a design. `VITE_WHATSAPP_NUMBER` is intentionally unset. Until the business owner supplies it, choosing a design displays an honest non-sending notice. When configured, the link opens WhatsApp with only the selected design name/ID; the customer decides whether to send.

There are no public personalization forms, customer editor routes, brief builder, checkout or HTML exports. Earlier browser drafts remain untouched. Stable invitation links still work. Sample RSVP controls remain explicitly demonstration-only; no guest response is sent or saved. No prices or delivery promises are invented.

## Invitation craft

Twelve original local painted assets and six vector illustration systems form garden gates, paper seals, carved doors, shutters, star screens, embroidered cloth and kolam. The names remain editable text composed within the artwork. True pointer scratching has tap and keyboard alternatives. Scroll reveals, bounded parallax, restrained ambient elements, motion pause and OS reduced-motion handling remain. Generated people are fictional illustrations, not personalised portraits.

## Collection

| Design | Fictional couple | Composition |
| --- | --- | --- |
| Garden Verse | Ishavi & Nivaan | Painted lotus garden, openwork gates, framed family niches and three-day gathering |
| A Letter to You | Eluvi & Sairen | Deckle-edge stationery, personal letter, diary and reply card |
| The First Light | Aarivi & Omesh | Carved sandalwood portal, dawn temple painting and scalloped ceremony programme |
| Wildflower Waltz | Tavira & Jolen | Blush folding stationery, botanical arch, circular initials and garden-party programme |
| An Evening in Verse | Sahira & Riven | Burgundy/gold manuscript doors, jharokha, mandala and arch programme |
| A Stillwater Story | Eshani & Ronav | Painted floral shutters, lake-palace manuscript and four-part weekend programme |
| A Sacred Beginning | Reyathi & Madhiran | Carved-stone architecture, ceremony-first callout, family blessing |
| Written in Earth | Avira & Kivaan | Seven-ring ceremonial print, terracotta flame and ruled editorial programme |
| The Moonlit Promise | Zayira & Hamiran | Emerald star screen, pointed arch, lanterns and Nikah gathering |
| Threads of Promise | Harvani & Angir | Magenta/saffron embroidered cloth, tilted folk lettering and stitched Anand Karaj programme |
| A Silk Serenade | Janira & Vishen | Drawn kolam, magenta silk border, jasmine and temple illustration, wedding almanac |

All couples, stories, venues and arrangements are fictional. The scenes are original AI-generated artwork, not photographs of actual customers or venues. See [asset provenance](docs/ASSETS.md).

## Protected staff MVP — implemented, not deployed

- Server-verified Cloudflare Access JWTs and approved staff allowlist. Missing configuration fails closed; no localStorage authentication or public bypass.
- D1 wedding/order records, draft revisions, chronological events (up to twenty), template selection and status.
- Private saved-draft preview; immutable published snapshots; atomic publish pointer; unpublish and rollback.
- One wildcard host-routing Worker. Unique reserved slugs resolve only their own current published snapshot, without a separate deployment per wedding.
- Private R2 uploads with streaming size limits, image-type checks and per-wedding ownership. Only snapshot-referenced media is publicly readable.
- Manual offline payment bookkeeping, idempotent receipts, append-only full reversals, server-calculated totals and operation history. No actual money movement.
- Staff-authenticated admin UI to operate these features. On Netlify it explicitly reports that the backend is unavailable.

The eleven artistic templates are maintained in source; staff choose a template rather than edit its underlying illustration/layout. Uploaded images add a gallery, not a generated portrait replacement. All approved staff share administrative permissions in this single-business MVP. There is no customer login, RSVP backend, card collection, gateway, staff invitation service, automatic DNS creation or destructive media deletion UI.

See [Cloudflare architecture and deployment runbook](docs/CLOUDFLARE.md) for configuration templates, security boundaries, quotas and operational limitations. The user can supply an account/domain/contact later; no account access is needed to review or locally test this code.

## Verify locally

With the built gallery served on port 4175:

```sh
npm test
node tests/admin-ui.mjs
npm run test:motion
npm run audit:source
```

Backend tests verify real RSA JWT cryptography with ephemeral in-memory test keys and mocked JWKS, SQLite behind a D1-shaped adapter and memory R2. Browser tests use Chromium; these are not claims of real iPhone, Safari, WhatsApp webview or deployed Cloudflare testing. The old editor/export tests remain historical fixtures for the retired DIY workflow and are not the current acceptance suite.

## Source map

`src/main.js` and `src/sales.js`: public gallery, immersive previews and configured WhatsApp action. `src/invitations.js`, `src/craft-art.js`, `src/experience.js`: original invitation rendering and motion. `worker/`: authenticated API and wildcard routing. `public/admin.*`: staff interface. `migrations/`: D1 schema. `wrangler.example.jsonc`: unconfigured deployment template. No private customer data or production credentials belong in this repository.

No analytics, pixels, replay scripts, remote fonts or third-party embeds. Authentication's server-side JWKS request and a customer-initiated configured WhatsApp link have specific functional purposes. All artwork/fonts are local; provenance and licenses are in [ASSETS.md](docs/ASSETS.md) and `licenses/`. The Vow & Verse name is a creative choice, not a trademark/domain availability claim.
