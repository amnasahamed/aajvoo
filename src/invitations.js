import {drawing, ornament, borderDrawing} from "./craft-art.js";
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
const firstLetter=s=>typeof Intl.Segmenter==='function'?[...new Intl.Segmenter(undefined,{granularity:'grapheme'}).segment(s.trim())][0]?.segment||'':Array.from(s.trim())[0]||'';
const initials = (d) => esc(firstLetter(d.name1) + firstLetter(d.name2));
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
const notes = (t, d) =>
  `<section class="guest-notes" data-section="notes"><div>${kicker("A little before you arrive")}<h2>Good to know.</h2></div><div><h3>A note on attire</h3><p>${esc(t.dress)}</p><h3>Your company is our gift</h3><p>We are simply grateful to have you with us. Please confirm travel and access needs with your hosts.</p><p class="fiction-note">Fictional sample celebration. Venue names and travel arrangements are illustrative.</p></div></section>`;
function rsvp(t, d, o, cls = "") {
  if (o.mini || o.exported) return "";
  return `<section class="invite-rsvp ${cls}" data-section="rsvp"><div>${kicker("Save a place in the story")}<h2>${t.id === "letters" ? "A little reply." : t.id === "velvet" ? "Will we see you there?" : "We hope you’ll join us."}</h2><p>Try the RSVP preview below.<br>No response is sent or stored.</p></div><form id="rsvp-form"><label>Your name<input name="guest" required maxlength="80" autocomplete="off" placeholder="Example: Luma Vey"></label><label>Your reply<select name="response"><option>Joyfully accepts</option><option>Regretfully declines</option></select></label><button class="invite-button" type="submit">Preview my reply <span class="invite-arrow" aria-hidden="true"></span></button><p id="rsvp-status" role="status"></p></form></section>`;
}
const end = (d) =>
  `<footer class="invite-end" data-section="end"><span class="monogram">${initials(d)}</span><p>${esc(d.note)}</p>${signed(d)}<small>A fictional celebration, designed with Vow &amp; Verse.</small></footer>`;
// A scene is composed for each invitation medium, rather than using a venue photo.
export const painted = new Set(["courtyard", "letters", "dawn", "lake", "temple"]);
export const scenePath = (t, state="open") => `/images/craft/${t.id}-${state}.webp`;
const scene = (t,state="open",lazy=false) => painted.has(t.id)
 ? `<img class="crafted-scene" src="${scenePath(t,state)}" alt="Original illustrated ${t.name} ${state === "closed" ? "invitation cover" : "wedding world"}" loading="${lazy?'lazy':'eager'}" decoding="async">`
 : drawing(t.id,state);
const typeSize=(t,d)=>{const base={temple:8.8,moon:11,tapestry:11,silk:11,earthen:12}[t.id]||13;const longest=Math.max(d.name1.length,d.name2.length);return `clamp(18px,${base*Math.min(1,10/longest)}cqw,78px)`};
const framedTitle = (t,d) => `<div class="invite-title scene-title">${kicker(d.hostline)}<h1 style="font-size:${typeSize(t,d)}">${names(d)}</h1><span class="scene-union">${t.id==='moon'?'TOGETHER IN GRATITUDE':t.id==='tapestry'?'WITH OUR FAMILIES': 'ARE GETTING MARRIED'}</span><div class="scene-date">${dateText(d.date)}<span>${esc(d.location)}</span></div></div>`;
const extendedCover=d=>Math.max(d.name1.length,d.name2.length)>22 || d.hostline.length>110 || d.location.length>85;
export const sceneCover=(t,d,o={})=>{const extended=extendedCover(d);return `<section class="invite-cover crafted-cover cover-${t.id} ${extended?'extended-cover':''}" data-section="cover">${scene(t,"open",o.lazy)}${extended?`<div class="cover-monogram" aria-hidden="true">${initials(d)}</div>`:''}${framedTitle(t,d)}${t.id==='earthen'&&!extended?'<span class="seven-promises">SEVEN PROMISES · ONE BEGINNING</span>':''}</section>`};
function dateKeepsake(t,d,o){return `<section class="date-keepsake" data-section="date"><span class="invite-kicker">A date to hold close</span><div class="date-amulet"><div class="date-inside"><span>${day(d.date)}</span><strong>${new Date(d.date+'T12:00:00').getDate()}</strong><span>${new Date(d.date+'T12:00:00').toLocaleDateString('en-GB',{month:'long',year:'numeric'})}</span></div>${!o.mini&&!o.exported?`<canvas class="date-scratch" data-initials="${initials(d)}" aria-hidden="true"></canvas>`:''}</div>${!o.mini&&!o.exported?'<button class="date-foil" aria-label="Reveal our wedding date" aria-expanded="false">Reveal date</button><p class="scratch-hint">Brush across the foil, tap it, or use the button.</p>':''}${countdown(d)}<p class="date-message" aria-live="polite"></p></section>`}
const family=(t,d)=>`<section class="family-niches" data-section="family">${kicker('Two stories, one beginning')}<div class="family-pair"><div><span class="family-initial">${esc(firstLetter(d.name1))}</span><h2>${esc(d.name1)}</h2></div><span class="family-and">&amp;</span><div><span class="family-initial">${esc(firstLetter(d.name2))}</span><h2>${esc(d.name2)}</h2></div></div><p>${esc(d.hostline)}</p></section>`;
const interiorArt=(t)=>({courtyard:'/images/craft/courtyard-interior.webp',letters:'/images/craft/letters-interior.webp',dawn:scenePath(t),lake:scenePath(t)})[t.id];
const frame=(t,body)=>{const paper=interiorArt(t);return `<div class="invitation-pages pages-${t.id} ${paper?'painted-paper':''}" ${paper?`style="--interior-art:url('${paper}')"`:''}><div class="page-perimeter" aria-hidden="true">${paper?`<img src="${paper}" alt="" hidden>`:borderDrawing(t.id)}</div><div class="page-content">${body}</div></div>`};

const layouts={
 courtyard:(t,d,o)=>sceneCover(t,d)+frame(t,family(t,d)+dateKeepsake(t,d,o)+programme(t,d,o,'garden-events')+story(t,d,'garden-story')+notes(t,d)+rsvp(t,d,o)+end(d)),
 letters:(t,d,o)=>sceneCover(t,d)+frame(t,story(t,d,'personal-letter')+dateKeepsake(t,d,o)+programme(t,d,o,'diary-events')+quote(t)+rsvp(t,d,o,'reply-card')+end(d)),
 dawn:(t,d,o)=>sceneCover(t,d)+frame(t,family(t,d)+dateKeepsake(t,d,o)+programme(t,d,o,'daylight-timeline')+story(t,d)+notes(t,d)+rsvp(t,d,o)+end(d)),
 herbarium:(t,d,o)=>sceneCover(t,d)+frame(t,family(t,d)+story(t,d,'botanical-story')+programme(t,d,o,'garden-party')+dateKeepsake(t,d,o)+rsvp(t,d,o)+end(d)),
 velvet:(t,d,o)=>sceneCover(t,d)+frame(t,family(t,d)+dateKeepsake(t,d,o)+programme(t,d,o,'salon-programme')+story(t,d,'velvet-story')+quote(t)+rsvp(t,d,o,'salon-reply')+end(d)),
 lake:(t,d,o)=>sceneCover(t,d)+frame(t,quote(t)+family(t,d)+programme(t,d,o,'travel-itinerary')+dateKeepsake(t,d,o)+story(t,d)+notes(t,d)+rsvp(t,d,o)+end(d)),
 temple:(t,d,o)=>sceneCover(t,d)+frame(t,`<section class="ceremony-focus">${kicker('With the blessings of our families')}<h2>The auspicious morning</h2><p>${dateText(d.date)}</p></section>`+family(t,d)+programme(t,d,o,'ritual-programme')+dateKeepsake(t,d,o)+story(t,d,'family-blessing')+rsvp(t,d,o)+end(d)),
 earthen:(t,d,o)=>sceneCover(t,d)+`<div class="promise-ribbon">WITH OUR PEOPLE · AROUND THE FIRE · INTO OUR FUTURE</div>`+frame(t,story(t,d,'editorial-story')+programme(t,d,o,'editorial-schedule')+dateKeepsake(t,d,o)+rsvp(t,d,o)+end(d)),
 moon:(t,d,o)=>sceneCover(t,d)+frame(t,quote(t)+family(t,d)+programme(t,d,o,'moon-gatherings')+dateKeepsake(t,d,o)+story(t,d,'moon-story')+notes(t,d)+rsvp(t,d,o)+end(d)),
 tapestry:(t,d,o)=>sceneCover(t,d)+frame(t,family(t,d)+programme(t,d,o,'celebration-days')+story(t,d,'album-story')+dateKeepsake(t,d,o)+rsvp(t,d,o,'family-reply')+end(d)),
 silk:(t,d,o)=>sceneCover(t,d)+frame(t,family(t,d)+programme(t,d,o,'almanac-events')+dateKeepsake(t,d,o)+story(t,d,'silk-story')+quote(t)+rsvp(t,d,o)+end(d)),
};
export function renderInvitation(t,d,options={}){
 return `<article class="invitation v2 crafted-invitation ${t.layout} ${Math.max(d.name1.length,d.name2.length)>22?'long-names':''} ${options.mini?'mini':''}" style="--ink:${t.color};--paper:${t.paper}" data-template="${t.id}">${layouts[t.id](t,d,options)}</article>`;
}
export function renderReveal(t,d){
 const material={courtyard:'gate',letters:'letter',dawn:'door',herbarium:'fold',velvet:'palace',lake:'palace',temple:'door',earthen:'circle',moon:'screen',tapestry:'cloth',silk:'kolam'}[t.id];
 const labels={courtyard:'A garden, a gathering, a beginning.',letters:'A letter, with all our love.',dawn:'A new day. A lifelong promise.',herbarium:'Something beautiful is unfolding.',velvet:'An evening written in gold.',lake:'Meet us where the water meets the sky.',temple:'With blessings, we begin.',earthen:'Seven promises. One beginning.',moon:'In gratitude, under one moon.',tapestry:'Every thread has led us here.',silk:'A beautiful beginning, drawn together.'};
 return `<div class="reveal craft-reveal material-${material} entry-${t.id}" style="--ink:${t.color};--paper:${t.paper}">${t.id==='herbarium'?`<div class="entry-backdrop" aria-hidden="true">${drawing(t.id)}</div>`:''}<div class="entry-behind" aria-hidden="true"><div class="invitation crafted-invitation" data-template="${t.id}">${sceneCover(t,d)}</div></div><div class="entry-object">${scene(t,'closed')}</div>${material==='letter'?`<div class="letter-pocket">${scene(t,'closed')}</div><div class="letter-flap">${scene(t,'closed')}</div>`:''}${['gate','door','palace','screen','cloth'].includes(material)?`<div class="entry-panel entry-left">${scene(t,'closed')}</div><div class="entry-panel entry-right">${scene(t,'closed')}</div>`:''}<div class="entry-dedication"><p>${esc(labels[t.id])}</p><h1>${esc(d.name1)} <i>&amp;</i> ${esc(d.name2)}</h1></div><button id="open-invite" class="craft-seal" aria-label="${esc(t.opening)}"><span>${initials(d)}</span><small>${material==='kolam'?'TAP TO BEGIN':material==='letter'||material==='fold'?'BREAK THE SEAL':'OPEN'}</small></button><p class="entry-instruction">${esc(t.opening)}<span>Tap the seal or press Enter</span></p></div>`;
}
