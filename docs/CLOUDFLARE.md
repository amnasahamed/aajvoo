# Assisted studio architecture

This repository contains a static public gallery and an undeployed Cloudflare backend. The owner’s existing Netlify preview continues to serve the gallery. It does not provide the staff API, persistence or wedding subdomains.

## Public journey

Browse eleven fictional invitations, open a complete viewport preview, then choose a design. Set `VITE_WHATSAPP_NUMBER` at build time only after the owner approves the recipient: international digits, no plus or punctuation. An empty value opens an honest contact-not-configured dialog. The WhatsApp message includes only collection name and design ID; it does not send automatically. No customer forms, public editor, checkout or offline-download journey remain. Legacy browser drafts are neither read nor deleted. Old studio/brief hashes return to the gallery.

## One Worker, many wedding hosts

`worker/index.js` runs before static assets for every request. The exact gallery host serves the gallery. The exact admin host verifies Cloudflare Access JWTs before serving staff HTML, assets, API or private previews. A single-label wedding subdomain resolves a unique D1 slug and its published version. Unknown hosts, workers.dev entries and unpublished slugs return 404. No per-wedding deployment or DNS record is created. Platform, database, storage, hostname/TLS and account quotas still apply.

Use scoped wildcard **Routes**, not wildcard Custom Domains: Cloudflare Worker Custom Domains do not support wildcard hosts. The approved domain needs appropriate proxied DNS and certificate coverage; none has been configured by this project.

D1 stores drafts, order status, immutable versions, offline payment records and operation history. Saving requires the last revision, preventing stale edits. Publishing atomically inserts a snapshot and updates the public pointer only if the revision still matches. Rollback repoints to an existing version owned by the same wedding. Unpublish removes the pointer. Public HTML and customer media use `no-store`, avoiding stale CDN responses after unpublish. Already downloaded material or an already open tab cannot be remotely erased.

R2 must remain private, with neither r2.dev nor public custom-domain access enabled. Media keys are random and wedding-scoped. Public media reads require the exact current published snapshot to reference that image. Staff preview reads require authentication. Draft media cannot be fetched on public hosts. Uploads accept JPEG/PNG/WebP signatures, stream at most 5 MiB, limit dimensions to 12,000 pixels per side / 40 megapixels and reject SVG/HTML. There is no image deletion endpoint, preventing deletion of version-referenced media. A failed D1 metadata write attempts to remove its newly stored object. Cross-service R2/D1 operations cannot be one atomic transaction; operators should reconcile orphan objects after exceptional outages. Images are not re-encoded or EXIF-stripped: staff must remove sensitive metadata and confirm rights before upload. Uploaded photographs form an optional gallery; they do not replace illustrated people.

All configured approved staff currently have the same administrative scope. This is not a multi-business customer login system. Media ownership is enforced between wedding records. No staff-management endpoint or public registration exists.

## Authentication and request protection

Configure Access in front of the exact admin host and supply `ACCESS_TEAM_DOMAIN`, application `ACCESS_AUD`, and comma-separated approved `ADMIN_EMAILS`. The Worker independently verifies the JWT signature through the team’s HTTPS JWKS, RS256, issuer, audience, expiry, subject and approved email. It never trusts an email header or client storage as authentication. Missing authentication configuration denies access. Access policy changes and staff approval are separate owner-authorized operations.

Mutations require exact same-origin Origin and `X-Vow-Request: 1`. No cross-origin credential grants are returned. All SQL uses bound values. Customer text is escaped in the invitation renderer and embedded JSON escapes `<`. Staff and public snapshot responses are no-store and nosniff. Avoid any upstream caching rule overriding these headers. No analytics, replay, marketing pixels or customer-data logging is included.

## Staff functions

At the configured admin host: create wedding/order; choose any of eleven designs; edit names, families, dates, venue, story, closing note and up to twenty chronological events; select uploaded images; save; preview saved draft; publish, unpublish or roll back; record order status; review audit history. Slugs are permanent, lowercase single-label values (4–50 characters), unique and reserved even when unpublished. The portal warns that unsaved edits are not published, confirms before discarding edits, and serializes staff actions to prevent overlapping UI requests. Failed record loads retain the previously displayed editing context.

Payments are **manual bookkeeping**, not settlement. Record integer minor units, ISO currency code, date, method and note. Retry keys are idempotent; a changed payload with the same key fails. A full reversal is a separate unique record that exactly offsets a positive receipt. No silent edits, card fields, gateway, automatic refund, currency conversion, pricing promises or invoices are implemented. Totals are calculated server-side per currency. No RSVP service is implemented; live wedding output omits the sample RSVP form.

## Deployment is pending approval

1. Obtain owner-approved target account, domain, WhatsApp recipient and staff identities. No account/resource listing is required for local work.
2. Review `wrangler.example.jsonc`; copy to a private deployment configuration and replace all placeholders. Do not deploy it unchanged. Use a current supported Wrangler version, installed through an approved local workflow. No deploy command is included in package scripts.
3. With explicit authorization, create/bind D1 and private R2, apply `migrations/0001_initial.sql`, configure the Access application/policy and environment variables, then scoped DNS/TLS/Routes. Keep secrets and actual customer data out of Git.
4. Build with `npm ci && npm run build`. Attach `dist` as the ASSETS binding and ensure `run_worker_first: true`. Keep `html_handling: auto-trailing-slash`: the Worker fetches canonical `/` and `/admin` assets, avoiding `.html` redirect bodies. Never expose the admin/API via an assets-first bypass.
5. Verify a staging wedding and approved staff login on the real platform: unauthorized/admin denial, draft privacy, save conflicts, uploaded-image ownership, publish/rollback/unpublish and offline ledger. Check TLS on a wildcard child. Only then enable production traffic.
6. Establish D1 backup/restore, R2 retention/orphan reconciliation, access revocation and customer-data deletion procedures. The MVP deliberately has no destructive wedding/media deletion UI.

Official references: [Access JWT validation](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/), [worker-first assets](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/), [D1 batches](https://developers.cloudflare.com/d1/worker-api/d1-database/), [wildcard Routes](https://developers.cloudflare.com/workers/configuration/routing/routes/), [Custom Domains limits](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), [private R2/public access](https://developers.cloudflare.com/r2/buckets/public-buckets/).

## Verification boundaries

Local backend tests exercise real RSA JWT verification with an ephemeral test-only key and intercepted JWKS; real SQLite through a D1-shaped adapter; and memory R2. They are not a claim of deployed D1/R2/Access integration. Browser tests use installed Chromium with phone-sized viewports; no physical iPhone/Safari or WhatsApp in-app browser was tested. Firefox and WebKit were not tested. The gallery requires JavaScript for invitation interactions; its loading/no-script message remains. Real-phone acceptance: open from WhatsApp, back to gallery, tap gate, scroll, scratch and tap fallback, pause motion, OS reduced motion, rotate, slow-network reload and choose-design behavior.
