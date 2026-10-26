export const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export const imagePath = (t) => `/images/${t.id}.webp`;
export const dateText = (d) =>
  new Date(d + "T12:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
const day = (d) =>
  new Date(d + "T12:00:00").toLocaleDateString("en-GB", { weekday: "long" });
const shortDate = (d) =>
  new Date(d + "T12:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
const initials = (d) => esc(d.name1.slice(0, 1) + d.name2.slice(0, 1));
const names = (d) => `${esc(d.name1)} <i>&</i> ${esc(d.name2)}`;
const pic = (t, cls = "", alt = "", pos = "") =>
  `<img class="${cls}" src="${imagePath(t)}" alt="${esc(alt || t.detail)}" ${pos ? `style="object-position:${pos}"` : ""} loading="lazy">`;
const kicker = (text) => `<span class="invite-kicker">${esc(text)}</span>`;
const title = (t, d) =>
  `<div class="invite-title">${kicker(d.hostline)}<h1>${names(d)}</h1><p class="cover-description">${esc(t.mood)}</p><div class="invite-date"><span>${day(d.date)}</span><strong>${dateText(d.date)}</strong><span>${esc(d.location)}</span></div></div>`;
const signed = (d) => `<p class="signature">${names(d)}</p>`;
const story = (t, d, cls = "") =>
  `<section class="invite-story ${cls}" data-section="story"><div>${kicker("The story so far")}<h2>${esc(t.storyTitle)}</h2></div><div class="story-prose"><p>${esc(d.story)}</p>${signed(d)}</div></section>`;
const quote = (t, cls = "") =>
  `<aside class="invite-quote ${cls}" data-section="quote"><span aria-hidden="true">“</span><blockquote>${esc(t.quote)}</blockquote></aside>`;
const countdown = (d) =>
  `<div class="countdown" data-section="countdown"><strong>${Math.max(0, Math.ceil((new Date(d.date + "T00:00:00") - new Date()) / 86400000))}</strong><span>days until<br>we celebrate</span></div>`;
const event = (e, i, o) =>
  `<article class="event"><div class="event-time"><span>${shortDate(e.date)}</span><strong>${esc(e.time)}</strong></div><div class="event-content"><span class="event-number">${String(i + 1).padStart(2, "0")}</span><h3>${esc(e.title)}</h3><p class="event-venue">${esc(e.venue)}</p><p>${esc(e.note)}</p>${!o.mini && !o.exported ? `<button class="invite-button" data-calendar="${i}">Save this date <span aria-hidden="true">↓</span></button>` : ""}</div></article>`;
function programme(t, d, o, cls = "") {
  return `<section class="invite-programme ${cls}" data-section="programme">${kicker("You are invited")}<h2>${esc(t.programmeTitle)}</h2><div class="event-list">${d.events.map((e, i) => event(e, i, o)).join("")}</div><p class="time-note">All times are local to ${esc(d.location)}.</p></section>`;
}
const gallery = (t, cls = "") =>
  `<section class="invite-gallery ${cls}" data-section="gallery"><div class="gallery-heading">${kicker("A sense of place")}<h2>${esc(t.galleryTitle)}</h2><p>Original imagined scenes for this invitation.</p></div><figure>${pic(t, "gallery-wide", t.gallery[0], "35% center")}<figcaption>01 — ${esc(t.gallery[0])}</figcaption></figure><figure>${pic(t, "gallery-detail", t.gallery[1], "85% center")}<figcaption>02 — ${esc(t.gallery[1])}</figcaption></figure></section>`;
const notes = (t, d) =>
  `<section class="guest-notes" data-section="notes"><div>${kicker("A little before you arrive")}<h2>Good to know.</h2></div><div><h3>A note on attire</h3><p>${esc(t.dress)}</p><h3>Your company is our gift</h3><p>We are simply grateful to have you with us. Please confirm travel and access needs with your hosts.</p><p class="fiction-note">Fictional sample celebration. Venue names and travel arrangements are illustrative.</p></div></section>`;
function rsvp(t, d, o, cls = "") {
  if (o.mini || o.exported) return "";
  return `<section class="invite-rsvp ${cls}" data-section="rsvp"><div>${kicker("Save a place in the story")}<h2>${t.id === "letters" ? "A little reply." : t.id === "velvet" ? "Will we see you there?" : "We hope you’ll join us."}</h2><p>Try the RSVP preview below.<br>No response is sent or stored.</p></div><form id="rsvp-form"><label>Your name<input name="guest" required maxlength="80" autocomplete="off" placeholder="Your full name"></label><label>Your reply<select name="response"><option>Joyfully accepts</option><option>Regretfully declines</option></select></label><button class="invite-button" type="submit">Preview my reply <span class="invite-arrow" aria-hidden="true"></span></button><p id="rsvp-status" role="status"></p></form></section>`;
}
const end = (d) =>
  `<footer class="invite-end" data-section="end"><span class="monogram">${initials(d)}</span><p>${esc(d.note)}</p>${signed(d)}<small>A fictional celebration, designed with Vow &amp; Verse.</small></footer>`;
const hero = (t, d, cls = "") =>
  `<section class="invite-cover ${cls}" data-section="cover">${pic(t, "invite-art")}${title(t, d)}</section>`;
// Independent compositions: structure, section order and content hierarchy differ.
const layouts = {
  courtyard: (t, d, o) =>
    hero(t, d, "courtyard-cover") +
    `<div class="garden-welcome">${story(t, d)}${countdown(d)}</div>` +
    gallery(t, "garden-gallery") +
    programme(t, d, o, "garden-events") +
    notes(t, d) +
    rsvp(t, d, o) +
    end(d),
  letters: (t, d, o) =>
    `<section class="invite-cover letter-cover" data-section="cover"><div class="letter-photo">${pic(t)}</div><div class="letter-stationery">${title(t, d)}<span class="postmark">DELIVERED WITH LOVE</span></div></section>` +
    `<div class="letter-body">${story(t, d, "personal-letter")}${quote(t)}${programme(t, d, o, "diary-events")}</div>` +
    gallery(t, "letter-keepsakes") +
    rsvp(t, d, o, "reply-card") +
    end(d),
  dawn: (t, d, o) =>
    hero(t, d, "sunrise-cover") +
    `<div class="dawn-heading">${kicker("A morning among the hills")}${countdown(d)}</div>` +
    programme(t, d, o, "daylight-timeline") +
    `<div class="dawn-story-panel">${pic(t, "dawn-detail", t.gallery[1], "90% center")}${story(t, d)}</div>` +
    quote(t) +
    notes(t, d) +
    rsvp(t, d, o) +
    end(d),
  herbarium: (t, d, o) =>
    `<section class="invite-cover botanical-cover" data-section="cover">${title(t, d)}<div class="botanical-picture">${pic(t)}<span>GROW WILD, TOGETHER</span></div></section>` +
    gallery(t, "botanical-specimens") +
    story(t, d, "botanical-story") +
    programme(t, d, o, "garden-party") +
    `<div class="botanical-note">${quote(t)}${countdown(d)}</div>` +
    notes(t, d) +
    rsvp(t, d, o) +
    end(d),
  velvet: (t, d, o) =>
    `<section class="invite-cover velvet-cover" data-section="cover"><span class="salon-label">AN EVENING WITH</span>${title(t, d)}${pic(t, "velvet-scene")}<div class="salon-foot">BLACK TIE SPIRIT / FULL HEARTS</div></section>` +
    programme(t, d, o, "salon-programme") +
    `<div class="velvet-interlude">${quote(t)}${pic(t, "velvet-detail", t.gallery[1], "70% center")}</div>` +
    story(t, d, "velvet-story") +
    notes(t, d) +
    rsvp(t, d, o, "salon-reply") +
    end(d),
  lake: (t, d, o) =>
    `<section class="invite-cover travel-cover" data-section="cover"><div class="travel-masthead"><span>THE WEEKEND JOURNAL</span><span>${esc(d.location)}</span></div>${title(t, d)}${pic(t, "travel-photo")}<div class="travel-caption"><span>A few days by the water.</span><span>Bring your favourite people.</span></div></section>` +
    programme(t, d, o, "travel-itinerary") +
    notes(t, d) +
    `<section class="travel-postcard" data-section="postcard">${pic(t)}<div>${quote(t)}${story(t, d)}</div></section>` +
    rsvp(t, d, o) +
    end(d),
  temple: (t, d, o) =>
    `<section class="invite-cover sanctuary-cover" data-section="cover"><div class="sanctuary-image">${pic(t)}</div>${title(t, d)}</section>` +
    `<section class="ceremony-focus" data-section="ceremony"><span class="line-ornament" aria-hidden="true">✧</span>${kicker("The auspicious morning")}<h2>${esc(d.events[1]?.title || d.events[0].title)}</h2><p>${dateText(d.events[1]?.date || d.date)} · ${esc(d.events[1]?.time || d.events[0].time)}</p><p>${esc(d.events[1]?.venue || d.events[0].venue)}</p></section>` +
    programme(t, d, o, "ritual-programme") +
    story(t, d, "family-blessing") +
    gallery(t, "sanctuary-gallery") +
    notes(t, d) +
    rsvp(t, d, o) +
    end(d),
  earthen: (t, d, o) =>
    `<section class="invite-cover editorial-cover" data-section="cover"><span class="edition-mark">A / NEW / CHAPTER</span>${title(t, d)}${pic(t, "editorial-photo")}<span class="edition-mark bottom">MADE WITH LOVE. NOT A TEMPLATE FOR LIFE.</span></section>` +
    `<div class="editorial-grid"><section class="editorial-intro" data-section="intro">${kicker("01 / The essentials")}<h2>Small gathering.<br>Big feelings.</h2>${countdown(d)}</section>${programme(t, d, o, "editorial-schedule")}</div>` +
    `<div class="editorial-story">${kicker("02 / The making of us")}${story(t, d)}${quote(t)}</div>` +
    gallery(t, "editorial-objects") +
    rsvp(t, d, o) +
    end(d),
  moon: (t, d, o) =>
    `<section class="invite-cover moon-cover" data-section="cover"><div class="moon-photo">${pic(t)}</div>${title(t, d)}<span class="moon-orbit" aria-hidden="true"></span></section>` +
    `<section class="moon-promise" data-section="promise">${kicker("With gratitude, we begin")}${quote(t)}${countdown(d)}</section>` +
    programme(t, d, o, "moon-gatherings") +
    `<div class="moon-arch-story">${story(t, d)}${pic(t, "moon-detail", t.gallery[1], "85% center")}</div>` +
    notes(t, d) +
    rsvp(t, d, o) +
    end(d),
  tapestry: (t, d, o) =>
    `<section class="invite-cover tapestry-cover" data-section="cover"><div class="tapestry-strip">${pic(t)}</div>${title(t, d)}<div class="woven-stitch" aria-hidden="true"></div></section>` +
    `<div class="family-album">${story(t, d, "album-story")}${pic(t, "album-photo", t.gallery[0])}${quote(t)}</div>` +
    programme(t, d, o, "celebration-days") +
    notes(t, d) +
    `<div class="woven-count">${kicker("One very happy countdown")}${countdown(d)}</div>` +
    rsvp(t, d, o, "family-reply") +
    end(d),
  silk: (t, d, o) =>
    `<section class="invite-cover silk-cover" data-section="cover"><div class="silk-border" aria-hidden="true"></div>${title(t, d)}<div class="silk-still-life">${pic(t)}</div><div class="silk-border" aria-hidden="true"></div></section>` +
    `<div class="silk-almanac">${programme(t, d, o, "almanac-events")}<aside>${kicker("The day we have been waiting for")}${countdown(d)}${quote(t)}</aside></div>` +
    gallery(t, "silk-details") +
    story(t, d, "silk-story") +
    notes(t, d) +
    rsvp(t, d, o) +
    end(d),
};
export function renderInvitation(t, d, options = {}) {
  return `<article class="invitation v2 ${t.layout} ${options.mini ? "mini" : ""}" style="--ink:${t.color};--paper:${t.paper}" data-template="${t.id}">${layouts[t.id](t, d, options)}</article>`;
}
export function renderReveal(t, d) {
  return `<div class="reveal v2-reveal reveal-${t.reveal}" style="--ink:${t.color};--paper:${t.paper}"><div class="reveal-scene">${pic(t)}</div><div class="opening-leaf left" aria-hidden="true"></div><div class="opening-leaf right" aria-hidden="true"></div><div class="reveal-copy">${kicker(t.id === "moon" ? "An invitation to our Nikah" : t.id === "tapestry" ? "An invitation to our Anand Karaj" : "A little world, waiting for you")}<h1>${names(d)}</h1><p>${dateText(d.date)} · ${esc(d.location)}</p><button id="open-invite" class="opening-button">${esc(t.opening)} <span aria-hidden="true">→</span></button><small>Tap or press Enter to open</small></div></div>`;
}
