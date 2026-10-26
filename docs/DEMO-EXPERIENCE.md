# Fictional samples and invitation motion

All built-in couples, family names, stories, event venues and locations are invented examples. The eleven locations belong to the explicitly imagined land of Auralis; they are not map destinations. Sample event dates are in 2028 and are not actual invitations or bookings. First names may coincidentally match real names; no person or customer is represented. Cultural ceremony terms retain their ordinary meaning. Illustrations are fictional artwork and do not represent the entered names or a booked venue.

No prices, operational contacts, street addresses, coordinates, map links, payment offers or purchase services are supplied. None were invented for this update. The RSVP example guest is Luma Vey; replies remain a non-persistent local demonstration. Calendar downloads from sample previews carry an explicit fictional-event description. Personal editor entries and the existing per-design local-storage namespace are preserved; this change only replaces built-in defaults. The editor's explicit reset-to-sample action is the only way to replace current edits with these samples.

## Implemented effects

Every live invitation has a bounded 9px scroll-driven artwork translation behind stationary editable text, a 12px/opacity section arrival, and a genuine canvas foil reveal. Scratch with a pointer to erase foil; clearing about one third reveals the date completely. A short tap or the separate keyboard-accessible button reveals it immediately. Only the foil region uses `touch-action:none`. Outside it, the page scrolls normally. Cancellation releases the active gesture; the button remains available. Once revealed, the button is hidden, disabled and leaves the tab order. Keyboard activation transfers focus to the live status.

| Collection | Opening | Ambient detail |
| --- | --- | --- |
| Garden Verse | Hinged garden gates within the painted arch | Five small edge petals |
| A Letter to You | Envelope flap and pocket unfold | Five small edge petals |
| The First Light | Temple doors part inside the carved frame | Five quiet warm glints |
| Wildflower Waltz | Folded stationery lifts | Five small edge petals |
| An Evening in Verse | Gold-studded burgundy doors part | None; stationery remains still |
| A Stillwater Story | Painted palace shutters part | Five quiet warm glints |
| A Sacred Beginning | Timber doors part inside the stone threshold | Five quiet warm glints |
| Written in Earth | Circular reveal | None; editorial rings remain still |
| The Moonlit Promise | Star-lattice screen parts | Five quiet warm glints |
| Threads of Promise | Embroidered cloth separates | Five tiny textile diamonds |
| A Silk Serenade | Kolam line animation, then reveal | Five tiny textile diamonds |

The kolam control says “Tap to begin”; drawing is decorative animation, not a required input gesture. Effects are intentionally restrained rather than applied to every element. Ambient movement pauses offscreen and while the document is hidden. Scroll depth uses a single scheduled animation frame per scroll update, not a perpetual render loop. Route teardown cancels the opening timer, aborts interaction listeners and disconnects observers. There are no added animation libraries or remote requests.

## Reduced motion and keepsakes

Reduced motion removes parallax, ambient movement and scroll transitions; the date is already revealed and sections remain visible. The opening completes immediately after activation. Changing the preference during a preview reveals the date without requiring another gesture. The editor miniature and standalone HTML contain no scratch surface or hidden scroll sections. Offline exports remain script-free, fully readable and self-contained; interactive animation and scratch gestures exist only in the live preview.

## Verification scope

Automated browser coverage includes all eleven normal-motion journeys, actual canvas erasure, keyboard/touch alternatives, cancellation, route interruption, history restoration, local-only network activity, responsive layouts and reduced motion. Screenshots are internal QA artifacts. Testing is Chromium-based; physical-device performance, Safari/Firefox behavior and every possible assistive-technology combination are not exhaustively verified.

The opened invitation includes a keyboard-accessible Pause motion / Resume motion control in a reserved, normal-flow row immediately after the cover. It is not fixed or sticky: it scrolls away rather than covering guest information. Return to that row to change the preference. This placement is shared by previews and published invitations. It pauses ambient CSS movement and scroll-driven parallax, and makes pending scroll sections visible without motion. Scratch, tap and keyboard date reveals continue working. The choice persists in module memory across previews in the current tab only; no browser storage is written. OS reduced motion overrides the toggle (shown disabled as “Motion reduced”). Navigation removes the control and its listener with the invitation mount.

## Guest information and interior hierarchy

All eleven samples include their authored attire guidance plus theme-specific access questions to confirm with hosts; these are not guarantees of venue facilities. The date keepsake now precedes every programme. A continuous day divider groups events without changing their source order or calendar index. A recognized ceremony title receives the main visual emphasis; other gatherings are shorter entries. Custom events without a recognized ceremony title remain ordinary entries rather than being labelled as a ceremony by default.

Repeated quotations, the extra temple date dedication and several duplicated family/name preambles have been removed. Story signatures remain only in the personal-letter design. Replies and closing marks follow each invitation material. Demo RSVP remains local and non-persistent; published rendering still removes it. Public customer editing/standalone export routes remain retired; static render options are retained for renderer compatibility, not advertised as a public flow.
