# Practical readiness and assisted inquiries

## What is available now

The site is a frontend invitation studio with eleven fictional previews, text personalisation, up to six events, explicit local draft saving, static HTML keepsakes and sample-preview calendar downloads. A separate **unsent inquiry brief** lets someone choose a design, enter details, review/edit, copy or download a plain-text document. The editor can seed that brief only through the explicit “Prepare brief from these details” action. The brief lives in tab memory, never overwrites invitation drafts, and is cleared by reload/closing the tab. Copy failure leaves selectable text and a download alternative.

No recipient, price, delivery promise, revision allowance or refund policy is configured. There is no checkout, payment, messaging, order submission, photo upload, hosting automation or RSVP backend. Photo/artwork editing is not supported; illustrations stay fixed. Nothing in the brief flow is an order or booking.

## Before activating an assisted service

The owner must provide and approve the real recipient/contact, currency and prices, included work, delivery expectations, revision allowance, cancellation/refund terms, and who handles publishing. Obtain consent for sharing personal information with that recipient. Only then add an explicit, reviewable sending/contact step. Do not relabel the current copy/download buttons as sending, or silently transfer a brief. No third-party service is necessary for the current draft-only workflow.

## Personalisation hardening

- Dense cover copy switches to a matching flowing stationery panel beneath a monogram scene. Full names remain at least 28px in the tested narrow layout instead of being squeezed to 18px. Short sample names retain their existing compositions. Long family names also stack into full-width panels; names wrap automatically rather than requiring manual line-break controls.
- The 320px editor no longer overflows its event fieldsets. Inputs use readable mobile text sizing.
- Local Noto Sans script subsets support entered Malayalam, Devanagari/Hindi and Tamil text, including exported files. Original Latin typography is retained. This is glyph coverage, not interface translation or language proofreading. Other scripts, RTL layouts and every linguistic combination are not comprehensively supported/tested.
- Calendar text escapes and folds long Unicode lines at 75 UTF-8 octets without splitting code points. Dates reject impossible calendar days and times reject invalid hours/minutes. Calendar times are floating venue-local times; no timezone or map coordinates are invented. Personalised event-calendar download is not a separate editor feature; the calendar generator was stress-tested directly, while sample calendars were downloaded through the UI.
- A loading message and no-JavaScript explanation replace a blank initial page when scripts are slow/unavailable. Artwork remains local. Browser download links are attached to the document and their Blob URLs remain available for 60 seconds for compatibility.

## Measured asset budget

In a fresh Chromium context at 390 × 844, after the initial load reached network-idle and before scrolling, below-fold artwork changed from eager to native lazy loading. Initial encoded subresource bytes fell from approximately **2.09 MB to 0.594 MB**. Initially fetched painted images fell from five (1,883,700 bytes) to the featured garden image (390,140 bytes). Figures exclude HTML/headers, later scrolling and hosting differences; they are not real-phone speed or Core Web Vitals claims. No artwork was downsampled or recompressed for this optimisation. The three local script font subsets total about 89 KB in WOFF2 and load when their glyphs are used; standalone keepsakes embed them for portability.

## Verification and limits

Passed in installed Chromium: eleven designs at 320/430/1440 widths with long names, lengthy story/location text and six events; Unicode names across all eleven; static export content/fonts for all eleven; actual custom Malayalam/Tamil font usage inspected through browser font reporting; Unicode calendar folding and strict date/time checks; independent brief seed/edit/review/copy-or-fallback/download/clear; saved-draft isolation. Existing preview, keyboard, reduced-motion, scratch, touch, motion-control, navigation, export and tracker regressions remain applicable. Screenshots stay internal. The mixed-script keepsake was also rendered in memory with networking disabled and all nine embedded font faces available. Actual opening from a device’s Files app remains unverified.

**Firefox/WebKit tests were not run. Real iPhone Safari, WhatsApp’s in-app browser, physical touch/keyboard behaviour and device performance were not tested.** Chromium viewport/touch emulation is not a substitute for those checks. The site does not require WhatsApp login or use a WhatsApp API; in-app clipboard/download behaviour remains browser-dependent.

## Minimal real-phone acceptance checklist

1. On an actual iPhone, open the public site in Safari and from a WhatsApp link; note device, iOS and browser versions. Do not send test inquiries or personal data to anyone.
2. With a slow connection, confirm the loading message/closed cover remains coherent, then open garden, letter and moon designs. Scroll, pause/resume motion and turn on iOS Reduce Motion.
3. Scratch the date, tap it, use the reveal button and cancel a gesture. Swipe beside the foil to confirm normal scrolling.
4. Enter a long full name and one Malayalam/Hindi/Tamil sample. Check the entire cover and all six events; rotate the phone and increase text size.
5. Save a disposable local draft, change designs, return and reload. Check that saving/deleting affects only that design.
6. Download a keepsake and calendar, open them from Files/Calendar, and inspect text/artwork offline. If the in-app browser blocks downloads, use its **Open in Safari/browser** action and retry; do not assume the download succeeded.
7. Prepare an inquiry brief, review/edit, copy and download. Confirm “nothing sent” and verify that the invitation draft is unchanged.
8. Repeat with VoiceOver/keyboard if available, checking focus after opening and date reveal. Record any failure before treating the assisted service as ready for customers.
