import {renderSceneLayers,renderInteriorLayer} from "./scene-layers.js";
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
  `<section class="invite-story ${cls}" data-section="story"><div>${kicker("The story so far")}<h2>${esc(t.storyTitle)}</h2></div><div class="story-prose"><p>${esc(d.story)}</p>${t.id === "letters" ? signed(d) : ""}</div></section>`;
const quote = (t, cls = "") =>
  `<aside class="invite-quote ${cls}" data-section="quote"><span aria-hidden="true">“</span><blockquote>${esc(t.quote)}</blockquote></aside>`;
const countdown = (d) =>
  `<div class="countdown" data-section="countdown"><strong>${Math.max(0, Math.ceil((new Date(d.date + "T00:00:00") - new Date()) / 86400000))}</strong><span>days until we celebrate</span></div>`;
// Keep source indices for calendar actions, even when the programme has day dividers.
const mainEventIndex = d => d.events.findIndex(e => /wedding|nikah|anand karaj|garden vows|promises at|vows in|muhurtham/i.test(e.title) && !/feast|dinner|brunch|lunch|breakfast|reception|after.party|welcome/i.test(e.title));
const event = (e, i, o, main) =>
  `<article class="event ${main ? 'event-main' : 'event-supporting'} ${i%2?'event-alternate':''}"><div class="event-time"><time datetime="${esc(e.date)}T${esc(e.time)}">${esc(e.time)}</time>${main?'<span class="ceremony-label">The ceremony</span>':''}</div><div class="event-content"><span class="event-number" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><h3>${esc(e.title)}</h3><p class="event-venue">${esc(e.venue)}</p><p>${esc(e.note)}</p>${!o.mini && !o.exported ? `<button class="invite-button" data-calendar="${i}">Save this date <span aria-hidden="true">↓</span></button>` : ""}</div></article>`;
function programme(t, d, o, cls = "") {
  const main=mainEventIndex(d);
  let previous='';
  const entries=d.events.map((e,i)=>{const heading=e.date!==previous?`<h3 class="event-day"><span>${day(e.date)}</span>${dateText(e.date)}</h3>`:'';previous=e.date;return heading+event(e,i,o,i===main)}).join('');
  return `<section class="invite-programme ${cls}" data-section="programme">${kicker("You are invited")}<h2>${esc(t.programmeTitle)}</h2><div class="event-list">${entries}</div><p class="time-note">All times are local to ${esc(d.location)}.</p></section>`;
}
const guestGuidance={
 courtyard:['For the garden','Please ask your hosts about courtyard surfaces, step-free routes and a comfortable place to rest.'],
 letters:['A note for your pocket','Let your hosts know about access or dietary needs before the day, so the gathering can feel easy for everyone.'],
 dawn:['Before the morning','Please check the early arrival time above and ask your hosts about steps and seating before travelling.'],
 herbarium:['Among the flowers','Please ask your hosts about firm paths and sheltered seating if you need an alternative to the lawn.'],
 velvet:['For the evening','Let your hosts know about seating, step-free access or dietary needs before the celebrations.'],
 lake:['For your weekend bag','Please confirm your arrival plans with your hosts, including access around the water and any travel assistance you need.'],
 temple:['Before entering','Please ask your hosts about footwear arrangements, steps and seating if standing or sitting on the floor is difficult.'],
 earthen:['Come comfortably','Please tell your hosts about access, seating and dietary needs. We want you to feel at ease around the table.'],
 moon:['Before we gather','Please speak with your hosts about prayer-space access, seating or dietary needs before arriving.'],
 tapestry:['A little preparation','For the ceremony, ask your hosts about head-covering arrangements and seating or access needs before arrival.'],
 silk:['For the morning','Please confirm footwear customs, seating and step-free access with your hosts before the ceremony.']
};
const notes = (t, d) =>
  `<section class="guest-notes" data-section="notes"><div>${kicker("For our guests")}<h2>${esc(guestGuidance[t.id][0])}</h2></div><div class="guest-note-list"><div><h3>What to wear</h3><p>${esc(t.dress)}</p></div><div><h3>Feeling at home</h3><p>${esc(guestGuidance[t.id][1])}</p></div><p class="fiction-note">Sample guidance for an imagined celebration. Confirm arrangements with your hosts.</p></div></section>`;
function rsvp(t, d, o, cls = "") {
  if (o.mini || o.exported) return "";
  return `<section class="invite-rsvp ${cls}" data-section="rsvp"><div>${kicker("Save a place in the story")}<h2>${({letters:"A little reply.",velvet:"Your place in the evening.",tapestry:"Be part of the celebration.",moon:"Join our gathering.",earthen:"A place at our table.",silk:"With you, in celebration.",temple:"With your blessings.",herbarium:"Room for you to bloom.",lake:"Meet us by the water.",dawn:"Share our new beginning.",courtyard:"Join us in the garden."})[t.id]}</h2><p>Try the RSVP preview below.<br>No response is sent or stored.</p></div><form id="rsvp-form"><label>Your name<input name="guest" required maxlength="80" autocomplete="off" placeholder="Example: Luma Vey"></label><label>Your reply<select name="response"><option>Joyfully accepts</option><option>Regretfully declines</option></select></label><button class="invite-button" type="submit">Preview my reply <span class="invite-arrow" aria-hidden="true"></span></button><p id="rsvp-status" role="status"></p></form></section>`;
}
// Small original linework endings, composed for the material of each invitation.
const endingMark = id => {
 const paths={
 courtyard:'M12 52Q40 28 68 52M40 47Q20 30 24 18Q39 22 40 47Q41 22 56 18Q60 30 40 47M40 47Q28 22 40 8Q52 22 40 47M21 58H59',
 letters:'M12 23H68V59H12ZM12 23L40 43L68 23M12 59L32 38M68 59L48 38M24 12Q40 3 56 12',
 dawn:'M12 58H68M17 51H63M24 51V29Q40 3 56 29V51M29 51V31Q40 12 51 31V51M36 39Q40 29 44 39Q40 46 36 39',
 herbarium:'M40 62Q28 37 43 12M38 42Q10 43 19 25Q35 25 38 42M38 30Q66 31 58 14Q42 12 38 30M31 61H49',
 velvet:'M15 61V30L24 30Q24 15 33 19Q40 5 47 19Q56 15 56 30H65V61ZM23 55H57M40 48Q28 37 40 28Q52 37 40 48',
 lake:'M12 41L40 54L68 41ZM40 16L40 41H19ZM44 22L60 39H44ZM10 61Q20 56 30 61T50 61T70 61',
 temple:'M15 60H65M20 55H60M25 50H55M30 45H50M35 41H45M40 39V24M25 24Q40 38 55 24ZM40 21Q29 12 40 4Q51 12 40 21',
 earthen:'M11 45Q40 76 69 45ZM17 45H63M27 33Q20 25 27 17M40 33Q33 25 40 17M53 33Q46 25 53 17',
 moon:'M50 10Q20 18 33 44Q45 64 64 45Q48 70 25 49Q5 22 32 8M52 20L55 27L62 30L55 33L52 40L49 33L42 30L49 27Z',
 tapestry:'M40 6L51 27L72 38L51 49L40 70L29 49L8 38L29 27ZM40 20L58 38L40 56L22 38ZM40 29L49 38L40 47L31 38Z',
 silk:'M40 6Q55 6 55 21Q55 36 70 36Q70 51 55 51Q55 66 40 66Q25 66 25 51Q10 51 10 36Q25 36 25 21Q25 6 40 6ZM40 16L60 36L40 56L20 36ZM36 36H44M40 32V40'
 };
 return `<svg class="ending-mark" viewBox="0 0 80 76" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[id]}"/></svg>`;
};
const end = (t,d) =>
  `<footer class="invite-end" data-section="end">${endingMark(t.id)}<p class="closing-line">${esc(d.note)}</p>${signed(d)}<small>A fictional celebration, designed with Vow &amp; Verse.</small></footer>`;
// A scene is composed for each invitation medium, rather than using a venue photo.
export const painted = new Set(["courtyard", "letters", "dawn", "lake", "temple"]);
export const scenePath = (t, state="open") => `/images/craft/${t.id}-${state}.webp`;
const scene = (t,state="open",lazy=false) => painted.has(t.id)
 ? `<img class="crafted-scene" src="${scenePath(t,state)}" alt="Original illustrated ${t.name} ${state === "closed" ? "invitation cover" : "wedding world"}" loading="${lazy?'lazy':'eager'}" decoding="async">`
 : drawing(t.id,state);
const typeSize=(t,d)=>{const base={temple:8.8,moon:11,tapestry:11,silk:11,earthen:12}[t.id]||13;const longest=Math.max(d.name1.length,d.name2.length);return `clamp(18px,${base*Math.min(1,10/longest)}cqw,78px)`};
const framedTitle = (t,d) => `<div class="invite-title scene-title">${kicker(d.hostline)}<h1 style="font-size:${typeSize(t,d)}">${names(d)}</h1><span class="scene-union">${t.id==='moon'?'TOGETHER IN GRATITUDE':t.id==='tapestry'?'WITH OUR FAMILIES': 'ARE GETTING MARRIED'}</span><div class="scene-date">${dateText(d.date)}<span>${esc(d.location)}</span></div></div>`;
const extendedCover=d=>Math.max(d.name1.length,d.name2.length)>22 || d.hostline.length>110 || d.location.length>85;
export const sceneCover=(t,d,o={})=>{const extended=extendedCover(d);return `<section class="invite-cover crafted-cover cover-${t.id} ${extended?'extended-cover':''}" data-section="cover">${scene(t,"open",o.lazy)}${o.layers?renderSceneLayers(t.id):''}${extended?`<div class="cover-monogram" aria-hidden="true">${initials(d)}</div>`:''}${framedTitle(t,d)}${t.id==='earthen'&&!extended?'<span class="seven-promises">SEVEN PROMISES · ONE BEGINNING</span>':''}</section>`};
function dateKeepsake(t,d,o){return `<section class="date-keepsake" data-section="date"><span class="invite-kicker">Keep this day for us</span><div class="date-amulet"><div class="date-inside"><span>${day(d.date)}</span><strong>${new Date(d.date+'T12:00:00').getDate()}</strong><span>${new Date(d.date+'T12:00:00').toLocaleDateString('en-GB',{month:'long',year:'numeric'})}</span></div>${!o.mini&&!o.exported?`<canvas class="date-scratch" data-initials="${initials(d)}" aria-hidden="true"></canvas>`:''}</div>${!o.mini&&!o.exported?'<button class="date-foil" aria-label="Reveal our wedding date" aria-expanded="false">Reveal date</button><p class="scratch-hint">Brush across the foil, tap it, or use the button.</p>':''}${countdown(d)}<p class="date-message" aria-live="polite"></p></section>`}
const family=(t,d)=>`<section class="family-niches" data-section="family">${kicker('Together with our families')}<p class="family-dedication">${esc(d.hostline)}</p><div class="family-pair" aria-hidden="true"><div><span class="family-initial">${esc(firstLetter(d.name1))}</span></div><span class="family-and">&amp;</span><div><span class="family-initial">${esc(firstLetter(d.name2))}</span></div></div></section>`;
const interiorArt=(t)=>({courtyard:'/images/craft/courtyard-interior.webp',letters:'/images/craft/letters-interior.webp',dawn:scenePath(t),lake:scenePath(t)})[t.id];
const frame=(t,body)=>{const paper=interiorArt(t);return `<div class="invitation-pages pages-${t.id} ${paper?'painted-paper':''}" ${paper?`style="--interior-art:url('${paper}')"`:''}><div class="page-perimeter" aria-hidden="true">${paper?`<img src="${paper}" alt="" hidden>`:borderDrawing(t.id)}</div>${renderInteriorLayer(t.id)}<div class="page-content">${body}</div></div>`};

const layouts={
 courtyard:(t,d,o)=>sceneCover(t,d,{...o,layers:!o.mini})+frame(t,family(t,d)+dateKeepsake(t,d,o)+programme(t,d,o,'garden-events')+story(t,d,'garden-story')+notes(t,d)+rsvp(t,d,o)+end(t,d)),
 letters:(t,d,o)=>sceneCover(t,d,{...o,layers:!o.mini})+frame(t,story(t,d,'personal-letter')+dateKeepsake(t,d,o)+programme(t,d,o,'diary-events')+notes(t,d)+rsvp(t,d,o,'reply-card')+end(t,d)),
 dawn:(t,d,o)=>sceneCover(t,d,{...o,layers:!o.mini})+frame(t,family(t,d)+dateKeepsake(t,d,o)+programme(t,d,o,'daylight-timeline')+story(t,d)+notes(t,d)+rsvp(t,d,o)+end(t,d)),
 herbarium:(t,d,o)=>sceneCover(t,d,{...o,layers:!o.mini})+frame(t,story(t,d,'botanical-story')+dateKeepsake(t,d,o)+programme(t,d,o,'garden-party')+notes(t,d)+rsvp(t,d,o)+end(t,d)),
 velvet:(t,d,o)=>sceneCover(t,d,{...o,layers:!o.mini})+frame(t,family(t,d)+dateKeepsake(t,d,o)+programme(t,d,o,'salon-programme')+story(t,d,'velvet-story')+notes(t,d)+rsvp(t,d,o,'salon-reply')+end(t,d)),
 lake:(t,d,o)=>sceneCover(t,d,{...o,layers:!o.mini})+frame(t,dateKeepsake(t,d,o)+programme(t,d,o,'travel-itinerary')+story(t,d)+notes(t,d)+rsvp(t,d,o)+end(t,d)),
 temple:(t,d,o)=>sceneCover(t,d,{...o,layers:!o.mini})+frame(t,family(t,d)+dateKeepsake(t,d,o)+programme(t,d,o,'ritual-programme')+story(t,d,'family-blessing')+notes(t,d)+rsvp(t,d,o)+end(t,d)),
 earthen:(t,d,o)=>sceneCover(t,d,{...o,layers:!o.mini})+`<div class="promise-ribbon">WITH OUR PEOPLE · AROUND THE FIRE · INTO OUR FUTURE</div>`+frame(t,story(t,d,'editorial-story')+dateKeepsake(t,d,o)+programme(t,d,o,'editorial-schedule')+notes(t,d)+rsvp(t,d,o)+end(t,d)),
 moon:(t,d,o)=>sceneCover(t,d,{...o,layers:!o.mini})+frame(t,family(t,d)+dateKeepsake(t,d,o)+programme(t,d,o,'moon-gatherings')+story(t,d,'moon-story')+notes(t,d)+rsvp(t,d,o)+end(t,d)),
 tapestry:(t,d,o)=>sceneCover(t,d,{...o,layers:!o.mini})+frame(t,family(t,d)+dateKeepsake(t,d,o)+programme(t,d,o,'celebration-days')+story(t,d,'album-story')+notes(t,d)+rsvp(t,d,o,'family-reply')+end(t,d)),
 silk:(t,d,o)=>sceneCover(t,d,{...o,layers:!o.mini})+frame(t,family(t,d)+dateKeepsake(t,d,o)+programme(t,d,o,'almanac-events')+story(t,d,'silk-story')+notes(t,d)+rsvp(t,d,o)+end(t,d)),
};
export function renderInvitation(t,d,options={}){
 return `<article class="invitation v2 crafted-invitation ${t.layout} ${Math.max(d.name1.length,d.name2.length)>22?'long-names':''} ${options.mini?'mini':''}" style="--ink:${t.color};--paper:${t.paper}" data-template="${t.id}">${layouts[t.id](t,d,options)}</article>`;
}
export function renderReveal(t,d){
 const material={courtyard:'gate',letters:'letter',dawn:'door',herbarium:'fold',velvet:'palace',lake:'palace',temple:'door',earthen:'circle',moon:'screen',tapestry:'cloth',silk:'kolam'}[t.id];
 const labels={courtyard:'A garden, a gathering, a beginning.',letters:'A letter, with all our love.',dawn:'A new day. A lifelong promise.',herbarium:'Something beautiful is unfolding.',velvet:'An evening written in gold.',lake:'Meet us where the water meets the sky.',temple:'With blessings, we begin.',earthen:'Seven promises. One beginning.',moon:'In gratitude, under one moon.',tapestry:'Every thread has led us here.',silk:'A beautiful beginning, drawn together.'};
 return `<div class="reveal craft-reveal material-${material} entry-${t.id}" style="--ink:${t.color};--paper:${t.paper}">${t.id==='herbarium'?`<div class="entry-backdrop" aria-hidden="true">${drawing(t.id)}</div>`:''}<div class="entry-behind" aria-hidden="true"><div class="invitation crafted-invitation" data-template="${t.id}">${sceneCover(t,d)}</div></div><div class="entry-object">${scene(t,'closed')}</div>${material==='letter'?`<div class="letter-pocket">${scene(t,'closed')}</div><div class="letter-flap">${scene(t,'closed')}</div>`:''}${['gate','door','palace','screen','cloth'].includes(material)?`<div class="entry-panel entry-left">${scene(t,'closed')}</div><div class="entry-panel entry-right">${scene(t,'closed')}</div>`:''}<div class="entry-dedication"><p>${esc(labels[t.id])}</p><h1>${esc(d.name1)} <i>&amp;</i> ${esc(d.name2)}</h1></div><button id="open-invite" class="craft-seal" aria-label="${esc(t.opening)}"><span>${initials(d)}</span><small>${material==='kolam'?'TAP TO BEGIN':material==='letter'||material==='fold'?'BREAK THE SEAL':'OPEN'}</small></button><p class="entry-instruction">${esc(t.opening)}<span>Tap the seal or press Enter</span></p></div>`;
}
