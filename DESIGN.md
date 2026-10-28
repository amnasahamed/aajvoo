# Vow & Verse — landing-page design system

Scope: the `.foundation-home` landing page only. Invitation artwork, previews, motion, staff screens and backend contracts have their own established systems. Do not propagate these tokens into them.

## Reference and interpretation

The user-selected [VoltAgent awesome-claude-design collection](https://github.com/VoltAgent/awesome-claude-design) led to the [Claude design analysis](https://getdesign.md/claude/design-md) and its [actual DESIGN.md](https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/claude/DESIGN.md), reviewed on 28 October 2026. Its useful foundations are warm editorial surfaces, a serif/sans hierarchy, restrained depth, clear controls and consistent spacing. This is an independent adaptation, not an Anthropic affiliation or a Claude-generated implementation. No proprietary fonts, logos, marks or product copy are used.

The [Clay document](https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/clay/DESIGN.md) was also inspected. It describes Clay.com's colourful GTM product rather than the agency suggested by the catalog blurb. Its saturated feature-card language was not adopted. No external repository command was executed.

## Our visual decisions

The invitations are the product. Show a large, legible Garden specimen with a quiet paper surround; never cover its names with tilted overlapping cards. Desktop places the artifact before the editorial copy. Phone places a short headline/action before the artwork. The gallery starts Garden, Lake, Letter and retains all eleven searchable/filterable designs. Three columns at wide widths, two at intermediate widths, one on phones. Equal baseline alignment makes comparison easier; do not stagger cards or turn them into SaaS feature tiles.

Use these landing-scoped tokens:

| Role | Value |
|---|---|
| Canvas | `#f8f5ef` |
| Paper surround | `#eee7dc` |
| Ink | `#342b31` |
| Supporting text | `#695e61` |
| Hairline | `#d8cfc5` |
| Primary accent | `#684450` |
| Active accent | `#4d303a` |
| Control radius | `6px` |
| Main content | `1240px` including40px side padding |

Cormorant Garamond500 is the display voice; Manrope400/500 is body and interface. Both are existing locally served licensed fonts. Hero46–86px, section44–64px, card30–32px, body14–16px, labels11–13px. Italic display appears selectively, never as repeated decorative script. Keep body line-height around1.7. All active controls have at least44px height and explicit keyboard focus.

Use an8px spacing rhythm, with4px refinements. Wide section gaps64–80px; phone40–48px. The hero is the single strongest artifact surface. Gallery surrounds share one quiet paper colour so individual invitations carry the colour. Shadows are faint and limited to physical specimens; structural separation uses borders and surface changes.

## Components and states

Primary actions are plum-filled rectangles. Secondary preview links are underlined and descriptive. Category buttons have text labels, an `aria-pressed` selected state and a filled ink surface; keyboard focus must remain distinct from selection. Search keeps a visible boundary and semantic label. Empty search results explain how to recover. Gallery previews have a44px invitation-entry strip and a separate labelled arrow target. Hover lifts only the specimen by4px; reduced motion removes that transition.

Process content remains an illustrated studio letter with three real steps, not feature boxes. FAQ uses native disclosure controls. The footer is the one dark closing surface. Keep artwork dimensions reserved and lazy-load lower images; never interpret an unscrolled full-page capture's unloaded images as missing design.

## Content boundaries

Explain that the studio handles personalisation. Preserve the honest unconfigured WhatsApp state. Do not add prices, delivery guarantees, hosting/revision terms, testimonials, purchases or client names without supplied facts. No trackers, remote fonts, new embeds or external runtime requests. Design-reference links belong in this document, not the customer interface.
