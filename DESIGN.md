# Vow & Verse — invitation-first homepage

## Scope and current direction

The `.foundation-home` root scopes this system to the public landing page. The class name is retained for compatibility; the previous Claude-inspired editorial layout is superseded by the user's newer request for [Aavjoo homepage](https://aavjoo.in/) inspiration. Do not change invitation designs, motion, staff UI or backend contracts to match the homepage.

Reference reviewed on 28 October 2026: centered bold sans-serif headline with small stationery accents, paired phone scenes in a two-column gallery, illustrated three-step explanation, soft FAQ panels and a dark closing invitation. No reference assets, code, offers, contact details or claims were copied.

Our adaptation uses Vow & Verse's existing original invitation artwork, local licensed Manrope and Cormorant Garamond, warm-white canvas and ink/plum identity. The earlier [Claude design analysis](https://getdesign.md/claude/design-md) informed a prior iteration only; its split-hero and three-column rules are no longer current. Neither reference implies affiliation.

## Composition

Center the short, confident headline above two clear pill actions: collection and a complete live demo. A small original botanical wax-seal drawing is a typographic accent. Three readable invitation specimens show the breadth of the collection; Garden is central, Lake and Letter flank it without covering its lettering. On phone, subordinate side specimens intentionally extend beyond the hero crop while the complete central specimen and its action remain visible. Reserve image geometry before loading.

The collection is a two-column scene gallery above700px and one column below. Each scene shows two dark phone frames: the opening artwork and the interior names composition. Focus/hover gently dissolves the front cover into the invitation. This is an honest visual sample; tapping opens the real full-screen invitation. No idle animations, autoplay or full invitation interaction modules inside thumbnails. Each card has a44px full-preview strip and descriptive accessible links. Search and category filters retain all eleven designs. Garden, Lake and Letter lead without invented popularity claims.

Three illustrated process panels explain discovery, conversation and studio personalisation. Illustrations are clearly schematic, not fabricated customer messages. Follow with native FAQ disclosures and one plum closing panel; no additional feature filler.

## Tokens and hierarchy

- Canvas `#fffefa`; ink `#292429`; muted text `#686167`; hairline `#e5ded8`.
- Plum `#684450`; dark closing `#392b34`; supporting surfaces derived quietly from existing artwork palettes.
- Hero: local Manrope600,33–80px, compact letter spacing; section headings31–48px. Cormorant is reserved for invitation names, selected italic accents and card titles.
- Body14–16px; metadata11–12px. At the narrowest320px viewport the short hero subtitle is13px. Keep text contrast and44px controls rather than shrinking interactive labels excessively.
- Navigation and controls use pill shapes; scene cards14px corners, process16px, closing24px. Avoid borders/shadows inside artwork beyond the deliberate phone framing.
- Wide content1160px plus side padding. Gallery gaps28px wide/32px vertical phone. Clear section transitions without oversized introductory blocks.

## Behaviour and boundaries

Keep category `aria-pressed`, labelled search, empty recovery, visible keyboard outlines, preview/back/filter/scroll restoration and native disclosure controls. Reduced motion removes transition/lift; cover state changes immediately on focus/hover. No continuous decorative motion or new pause requirement on the homepage. All assets are local; lower artwork is lazy-loaded. Existing full invitation controls and their pause behaviour are unchanged.

State that the studio handles editing. WhatsApp remains honestly unconfigured until a real recipient is supplied. Do not invent price, timing, hosting/revision commitments, customer proof, phone, domain or payment flow. No trackers, remote fonts or embeds. No customer DIY form.
