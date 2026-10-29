# Vow & Verse homepage

## Direction and scope

A white, confident invitation shop with a clear sans-serif hierarchy, colourful invitation scenes and a joyful cobalt/coral/yellow studio identity. [Aavjoo](https://aavjoo.in/) is the visual reference for the strong type, restrained interface and paired invitation previews. This is an independent interpretation using Vow & Verse's own artwork, wording and brand. No reference assets, offers, testimonials or proprietary code are used.

`src/foundation-home.css` is the complete current homepage system. Its selectors are scoped to `.foundation-home.editorial-home`; the existing root name is retained for compatibility. It replaces earlier editorial rules rather than adding successive redesign overrides. Invitation canvases, motion, staff interfaces and backend contracts have independent systems and must not inherit homepage changes.

## Typography

Locally hosted **Geist** is the homepage interface voice: weight600 for display,500–600 for actions,400 for body. Desktop hero76px/1.02 with -.04em tracking; section headings50px/1.05 with -.035em tracking; body19px/1.5 in the hero and14–15px elsewhere. Phone hero34–39px, body14px; controls remain at least44px high. Avoid faux-bold fonts, extreme tracking and decorative italic words in every heading.

The original Cormorant wordmark remains. Collection names borrow from their actual invitation typography: correspondence/floral script, architectural classical lettering, embroidered folk lettering and literary serif. Those distinctions belong to the products; Geist keeps navigation, explanations and actions coherent.

Geist is distributed under SIL Open Font License1.1. The unmodified Latin variable font and license are in `public/fonts/geist/`. Source: [Geist Project](https://github.com/vercel/geist-font), distributed through [Fontsource Geist](https://fontsource.org/fonts/geist), package `@fontsource-variable/geist`5.3.0. All font requests are same-origin. The distinct family alias `VV Geist` avoids changing invitation font resolution.

## Palette and composition

The current brief calls for a joyful creative studio, not muted plum or luxury positioning. Colour blocks should feel deliberate and confident, with real invitation artwork as their focal point. No Figma branding or graphics are used.

- White canvas, `#141414` primary type, neutral grey supporting text.
- Black primary actions and quiet grey secondary actions.
- A coral seal on yellow, cobalt footer and white footer lettering.
- Collection surfaces use a deliberate three-colour shop palette: yellow `#f5e76c`, cobalt `#2855d9` and coral `#ff9478`. Black or white captions keep contrast strong. The invitation artwork inside each phone retains its original palette.

A concise centered headline leads to collection and full-demo actions. Garden, Lake and Letter form the initial visual selection. On narrow phones the subordinate side specimens intentionally crop; the main Garden specimen stays complete. The gallery uses two columns above700px and one below. Paired phone frames show actual-renderer screenshots of opening and interior states; a full-preview action and clear collection name sit within the same material surface.

Keep the three-step studio process, a compact native-disclosure FAQ and one coral closing action. Do not add feature filler, repeated promotional banners, ornamental particles or extra typography styles. Maintain comfortable white space and readable supporting copy.

## Interaction and content boundaries

All eleven designs remain available through filters and search. Retain focus outlines, selected-filter states, empty recovery, full-preview/back/scroll restoration and reserved image geometry. Hover or keyboard focus dissolves a card cover; touch opens the complete invitation directly. No idle animation. Reduced motion makes the state change immediate and disables the slight lift.

The studio handles personalisation. WhatsApp remains unconfigured until a real recipient is supplied. No invented pricing, timing, hosting/revision promises, customer proof or payment flow. No customer editor, external fonts, trackers or embeds.

Homepage preview imagery must come from the actual-renderer snapshots described in [PREVIEW-ASSETS.md](docs/PREVIEW-ASSETS.md), not a separately styled miniature or generic seal. Preserve source image proportions and keep link captions outside the hero artwork.
