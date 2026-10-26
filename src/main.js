import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-400-italic.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import serifURL from "@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2?url";
import italicURL from "@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-italic.woff2?url";
import sansURL from "@fontsource/manrope/files/manrope-latin-400-normal.woff2?url";
import "./style.css";
import "./v2.css";
import "./invitation.css";
import inviteCSS from "./invitation.css?raw";
import { templates, sampleFor } from "./data.js";
import {
  renderInvitation,
  renderReveal,
  esc as escapeHTML,
  imagePath as art,
  dateText,
} from "./invitations.js";
const app = document.querySelector("#app");
let filter = "All designs",
  search = "",
  draft = sampleFor(templates[0]),
  current;
const sessionDrafts = new Map();
const arrow = '<span class="arrow" aria-hidden="true"></span>';
function toast(message) {
  document.querySelector("#toast").textContent = message;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(
    () => (document.querySelector("#toast").textContent = ""),
    5500,
  );
}
const wordmark = 'Vow <i class="wordmark-amp">&amp;</i> Verse';
const exportName = (t) => "vow-and-verse-" + t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
function nav() {
  return `<header class="site-nav"><a class="wordmark" href="#/" aria-label="Vow & Verse home">${wordmark}</a><nav aria-label="Main navigation"><a href="#collection">The collection</a><a href="#process">How it works</a><a href="#about">Our approach</a></nav><a class="button small" href="#/studio/courtyard">Create your invitation ${arrow}</a><button class="mobile-menu" aria-label="Open navigation" aria-expanded="false">☰</button></header>`;
}
function footer() {
  return `<footer><div><a class="wordmark" href="#/" aria-label="Vow &amp; Verse home">${wordmark}</a><p>For the moments that become your story.</p></div><div><a href="#collection">Explore the collection ${arrow}</a><a href="#/privacy">Privacy & local drafts</a><span>Designed with intention. Shared with love.</span></div><p class="footer-bottom">© ${new Date().getFullYear()} Vow & Verse <span>An independent design studio · Frontend edition</span></p></footer>`;
}
function card(t, i) {
  const d = t.sample;
  return `<article class="design-card collection-card"><a class="design-preview ${t.layout}" style="--ink:${t.color};--paper:${t.paper}" href="#/invitation/${t.id}" aria-label="Preview ${t.name}"><img src="${art(t)}" alt="${escapeHTML(t.detail)}" loading="lazy"><span class="design-number">${t.edition} / VOW &amp; VERSE</span><div class="design-names"><span>${escapeHTML(d.location)}</span><strong>${escapeHTML(d.name1)} <i>&</i> ${escapeHTML(d.name2)}</strong><small>${dateText(d.date)}</small></div><span class="preview-call">Step inside ${arrow}</span></a><div class="card-info"><div><span class="eyebrow">${t.category} / ${t.reveal}</span><h3>${t.name}</h3><p>${t.mood}</p></div><a href="#/studio/${t.id}" class="circle-link" aria-label="Personalise ${t.name}">${arrow}</a></div></article>`;
}
function renderCards() {
  const items = templates.filter(
    (t) =>
      (filter === "All designs" || t.category === filter) &&
      `${t.name} ${t.category} ${t.mood}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  document.querySelector("#design-grid").innerHTML = items.length
    ? items.map((t) => card(t, templates.indexOf(t))).join("")
    : '<p class="empty">No designs found. Try another word or choose All designs.</p>';
  document.querySelector("#result-count").textContent =
    `${items.length} considered designs`;
}
function home() {
  document.title = "Vow & Verse — A beautiful beginning";
  app.innerHTML =
    nav() +
    `<main id="main"><section class="hero-v2"><div class="hero-v2-copy"><div class="eyebrow">VOW &amp; VERSE / THE WEDDING COLLECTION</div><h1>A world of<br> <em>your own.</em></h1><p class="hero-v2-intro">An invitation to everything<br> that makes you, <em>you.</em></p><p class="hero-v2-description">Eleven beautifully different wedding worlds.<br>Original imagery. Thoughtful details. Your story.</p><a class="button" href="#collection">Find your world <span class="arrow" aria-hidden="true"></span></a><span class="hero-v2-foot">CONSIDERED, PERSONAL, A LITTLE EXTRAORDINARY.</span></div><div class="hero-v2-visual"><img class="hero-photograph" src="/images/courtyard.webp" alt="Imagined rose-stone haveli courtyard with jasmine, carved arches and jade water"><div class="hero-image-note">GARDEN VERSE<br><span>A weekend with Ira &amp; Neel</span></div><a href="#/invitation/courtyard" class="hero-sample" aria-label="Explore Ira and Neel’s invitation"><span>YOU ARE INVITED</span><h2>Ira <i>&</i> Neel</h2><p>20 November 2027<br>Jaipur, India</p><b>OPEN THEIR WORLD <span class="arrow" aria-hidden="true"></span></b></a></div></section><div class="values-strip"><span>Made personal, down to the last detail</span><b>✧</b><span>Beautiful on every screen</span><b>✧</b><span>A keepsake, not just a link</span></div><section id="collection" class="collection section"><div class="section-heading"><div><div class="eyebrow">01 / THE COLLECTION</div><h2>Different worlds.<br><em>Your kind of beautiful.</em></h2></div><p>From quiet gardens to candlelit salons.<br>Eleven original designs, each with a world<br>of its own. Which one feels like yours?</p></div><div class="collection-tools"><div class="filters" role="group" aria-label="Filter by style">${["All designs", "Palace", "Romantic", "Heritage", "Contemporary", "Nikah", "Anand Karaj"].map((x) => `<button data-filter="${x}" aria-pressed="${filter === x}">${x}</button>`).join("")}</div><label class="search"><span class="sr-only">Search designs</span><input type="search" placeholder="Find your style" value="${escapeHTML(search)}"><span aria-hidden="true">⌕</span></label></div><div class="collection-meta"><span id="result-count"></span><span>Every detail, ready to make your own</span></div><div class="design-grid" id="design-grid"></div></section><section class="approach" id="about"><div class="approach-art"><img src="/images/letters.webp" alt="Original generated stationery still life with cotton paper, plum ribbon and wax seal" loading="lazy"><span>Something to treasure.</span></div><div class="approach-copy"><div class="eyebrow">A NOTE FROM THE STUDIO</div><h2>Not just an invite.<br><em>A feeling.</em></h2><p>The anticipation. The warmth. The feeling of being invited into something special. We believe a digital invitation can hold all of it.</p><p>So we start with original artwork, considered typography and a little space to breathe. Then we leave the most important part to you: your story.</p><a href="#/studio/letters" class="text-link">Make a little magic <span class="arrow" aria-hidden="true"></span></a></div></section><section class="section" id="process"><div class="section-heading"><div><div class="eyebrow">02 / MAKE IT YOURS</div><h2>From a spark<br><em>to your story.</em></h2></div><p>No account. No complicated tools.<br>Just a few thoughtful details.</p></div><div class="steps"><article><span>01</span><h3>Find your world</h3><p>Explore the collection and open a full invitation. Take your time. You’ll know when it feels right.</p></article><article><span>02</span><h3>Add your chapter</h3><p>Bring in your names, your date and your celebrations. See the invitation take shape as you type.</p></article><article><span>03</span><h3>Keep it close</h3><p>Save a draft on this device, or download a standalone invitation to keep. Hosting is yours to arrange.</p></article></div></section><section class="faq section"><div><div class="eyebrow">A FEW LITTLE DETAILS</div><h2>Wondering<br><em>about something?</em></h2></div><div>${[
      [
        "Can I try a design before choosing?",
        "Of course. Every design has a full preview, and the studio lets you personalise it locally. No account or payment is needed.",
      ],
      [
        "What can I personalise?",
        "Your names, date, city, hosting line, story and closing note — plus up to six celebrations, each with its own date, time, venue and description. Each design begins with a different fictional wedding.",
      ],
      [
        "Will this send invitations or collect RSVPs?",
        "This edition is a private frontend studio. It does not publish, send messages or collect guest responses. The RSVP in previews is clearly marked as a demonstration.",
      ],
      [
        "Where are my details saved?",
        "Only on your device when you choose Save draft. You can delete that draft in the studio. Nothing is sent to a server.",
      ],
      [
        "Can I download my invitation?",
        "Yes. Download a standalone HTML keepsake with its artwork and fonts embedded. It opens offline and includes your story and schedule. It does not include hosting, music or an RSVP service.",
      ],
    ]
      .map(
        ([q, a]) =>
          `<details><summary>${q}<span>+</span></summary><p>${a}</p></details>`,
      )
      .join(
        "",
      )}</div></section><section class="closing"><div class="eyebrow">EVERY GREAT STORY STARTS SOMEWHERE</div><h2>Let’s begin <em>yours.</em></h2><a class="button" href="#collection">Explore the collection <span class="arrow" aria-hidden="true"></span></a></section></main>` +
    footer();
  renderCards();
  document.querySelectorAll("[data-filter]").forEach(
    (b) =>
      (b.onclick = () => {
        filter = b.dataset.filter;
        document
          .querySelectorAll("[data-filter]")
          .forEach((x) => x.setAttribute("aria-pressed", x === b));
        renderCards();
      }),
  );
  document.querySelector(".search input").oninput = (e) => {
    search = e.target.value;
    renderCards();
  };
  document.querySelector(".mobile-menu").onclick = (e) => {
    const on = e.currentTarget.getAttribute("aria-expanded") !== "true";
    e.currentTarget.setAttribute("aria-expanded", on);
    document.querySelector(".site-nav").classList.toggle("menu-open", on);
  };
}
function preview(t) {
  current = t;
  draft = sampleFor(t);
  document.title = `${draft.name1} & ${draft.name2} — ${t.name} | Vow & Verse`;
  app.innerHTML = `<main id="main"><div class="preview-toolbar"><a href="#collection">← Collection</a><span>${t.name}<small> FICTIONAL SAMPLE WEDDING</small></span><a class="button small" href="#/studio/${t.id}">Make it yours ${arrow}</a></div>${renderReveal(t, draft)}<div id="opened-invite" hidden>${renderInvitation(t, draft)}</div><div class="preview-info"><p>${t.detail}</p><p>Original generated imagery · Fictional wedding & venues · No guest data collected</p></div></main>`;
  const open = document.querySelector("#open-invite");
  open.onclick = () => {
    open.disabled = true;
    const reveal = document.querySelector(".reveal");
    reveal.classList.add("opening");
    document.querySelector("#opened-invite").hidden = false;
    setTimeout(
      () => {
        reveal.remove();
        const h = document.querySelector(".invite-title h1");
        h.tabIndex = -1;
        h.focus({ preventScroll: true });
        window.scrollTo(0, 0);
      },
      matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 950,
    );
    bindInvite();
  };
}
function bindInvite() {
  document
    .querySelectorAll("[data-calendar]")
    .forEach((b) => (b.onclick = () => calendar(Number(b.dataset.calendar))));
  const form = document.querySelector("#rsvp-form");
  if (form)
    form.onsubmit = (e) => {
      e.preventDefault();
      document.querySelector("#rsvp-status").textContent =
        "Preview complete. No RSVP was sent or saved. Please contact your hosts directly.";
      form.reset();
    };
}
function download(name, content, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
function calendar(index) {
  const e = draft.events[index];
  const esc = (s) =>
    s
      .replace(/[\r\n]+/g, " ")
      .replace(/\\/g, "\\\\")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Vow & Verse//Wedding Collection//EN",
    "BEGIN:VEVENT",
    `UID:${crypto.randomUUID()}@vow-and-verse.local`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${e.date.replaceAll("-", "")}T${e.time.replace(":", "")}00`,
    `SUMMARY:${esc(e.title)}`,
    `LOCATION:${esc(e.venue + ", " + draft.location)}`,
    `DESCRIPTION:${esc(e.note)}. Venue local time; confirm timezone with hosts.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  download(exportName(current) + ".ics", ics, "text/calendar");
}
const fields = [
  "name1",
  "name2",
  "date",
  "location",
  "hostline",
  "story",
  "note",
];
// Stable storage namespace preserves drafts saved before the visual rebrand.
const keyFor = (id) => "invitestory-v2-draft-" + id;
function validDate(s) {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(s) &&
    !Number.isNaN(new Date(s + "T12:00:00").getTime())
  );
}
function readSaved(t) {
  try {
    const raw = JSON.parse(localStorage.getItem(keyFor(t.id)));
    if (!raw) return null;
    const out = sampleFor(t);
    for (const key of fields)
      if (typeof raw[key] === "string" && raw[key].length <= 3000)
        out[key] = raw[key];
    if (!validDate(out.date)) out.date = t.sample.date;
    if (
      Array.isArray(raw.events) &&
      raw.events.length >= 1 &&
      raw.events.length <= 6 &&
      raw.events.every(
        (e) =>
          ["title", "date", "time", "venue", "note"].every(
            (k) => typeof e[k] === "string" && e[k].length <= 1000,
          ) &&
          validDate(e.date) &&
          /^\d{2}:\d{2}$/.test(e.time),
      )
    )
      out.events = raw.events;
    return out;
  } catch {
    return null;
  }
}
function field(key, label, type = "text", max = 120) {
  return `<label>${label}<input name="${key}" type="${type}" maxlength="${max}" required value="${escapeHTML(draft[key])}"></label>`;
}
function eventEditor(e, i) {
  return `<div class="event-editor"><div class="event-editor-heading"><span>CELEBRATION ${i + 1}</span>${draft.events.length > 1 ? `<button type="button" data-remove-event="${i}" aria-label="Remove celebration ${i + 1}">Remove</button>` : ""}</div><label>Event name<input name="event-${i}-title" maxlength="100" required value="${escapeHTML(e.title)}"></label><div class="form-pair"><label>Date<input name="event-${i}-date" type="date" required value="${e.date}"></label><label>Local time<input name="event-${i}-time" type="time" required value="${e.time}"></label></div><label>Venue<input name="event-${i}-venue" maxlength="150" required value="${escapeHTML(e.venue)}"></label><label>A little about it<textarea name="event-${i}-note" rows="2" maxlength="500">${escapeHTML(e.note)}</textarea></label></div>`;
}
function studio(t) {
  current = t;
  draft = structuredClone(
    sessionDrafts.get(t.id) || readSaved(t) || sampleFor(t),
  );
  document.title = `Personalise ${t.name} — Vow & Verse`;
  app.innerHTML = `<header class="studio-header"><a class="wordmark" href="#/" aria-label="Vow &amp; Verse home">${wordmark}</a><a href="#collection">← Collection</a><span>YOUR PRIVATE DESIGN STUDIO</span></header><main id="main" class="studio"><section class="editor"><div class="eyebrow">A WORLD THAT BEGINS WITH YOU</div><h1>Make it <em>yours.</em></h1><p>Each design has its own sample wedding and its own draft. Switching designs keeps your current edits in this tab.</p><form id="editor-form"><label>Your design<select name="design">${templates.map((x) => `<option value="${x.id}" ${x.id === t.id ? "selected" : ""}>${x.name}</option>`).join("")}</select></label><fieldset><legend>01 / The two of you</legend><div class="form-pair">${field("name1", "First name")}${field("name2", "Second name")}</div>${field("hostline", "Hosting line", "text", 200)}${field("date", "Wedding date", "date")}${field("location", "City & country")}<label>Your story<textarea name="story" rows="5" maxlength="2000" required>${escapeHTML(draft.story)}</textarea></label></fieldset><fieldset><legend>02 / Every celebration</legend><div id="event-editors">${draft.events.map(eventEditor).join("")}</div><button class="text-link" type="button" id="add-event" ${draft.events.length >= 6 ? "disabled" : ""}>+ Add a celebration</button><p class="form-note">Each event has its own date. Your programme is displayed in chronological order.</p></fieldset><fieldset><legend>03 / A final note</legend>${field("note", "Your closing note", "text", 200)}</fieldset><div class="editor-actions"><button class="button" type="submit">Save draft on this device</button><button class="button outline" type="button" id="export">Download invitation ↓</button><button class="text-link" type="button" id="clear-draft">Delete saved draft</button><button class="text-link" type="button" id="reset-sample">Reset current edits to sample</button></div><p class="privacy-note">Drafts are saved only when you choose. Download includes local artwork and fonts. No publishing, messaging, payments or live RSVP collection.</p><p id="save-status" role="status"></p></form></section><section class="studio-preview" aria-label="Live invitation preview"><div class="preview-label"><span>LIVE PREVIEW · ${t.name.toUpperCase()}</span><button id="preview-size" aria-pressed="false">Phone view</button></div><div id="live-preview">${renderInvitation(t, ordered(draft), { mini: true })}</div></section></main>`;
  const form = document.querySelector("#editor-form");
  function capture() {
    const fd = new FormData(form);
    for (const k of fields) {
      const value = fd.get(k);
      if (k === "date" && !validDate(value)) continue;
      draft[k] = value;
    }
    draft.events = draft.events.map((old, i) =>
      Object.fromEntries(
        ["title", "date", "time", "venue", "note"].map((k) => {
          const v = fd.get(`event-${i}-${k}`);
          return [
            k,
            k === "date" && !validDate(v)
              ? old[k]
              : k === "time" && !v
                ? old[k]
                : v,
          ];
        }),
      ),
    );
    sessionDrafts.set(current.id, structuredClone(draft));
    document.querySelector("#live-preview").innerHTML = renderInvitation(
      current,
      ordered(draft),
      { mini: true },
    );
    document.querySelector("#save-status").textContent =
      "Unsaved edits · kept in this tab until you close or reload.";
  }
  form.oninput = (e) => {
    if (e.target.name !== "design") capture();
  };
  form.elements.design.onchange = (e) => {
    sessionDrafts.set(current.id, structuredClone(draft));
    const next = templates.find((x) => x.id === e.target.value);
    history.replaceState(null, "", `#/studio/${next.id}`);
    studio(next);
  };
  function bindEventButtons() {
    document.querySelectorAll("[data-remove-event]").forEach(
      (b) =>
        (b.onclick = () => {
          capture();
          draft.events.splice(Number(b.dataset.removeEvent), 1);
          sessionDrafts.set(current.id, structuredClone(draft));
          studio(current);
        }),
    );
  }
  bindEventButtons();
  document.querySelector("#add-event").onclick = () => {
    if (draft.events.length >= 6) return;
    capture();
    draft.events.push({
      title: "A new celebration",
      date: draft.date,
      time: "12:00",
      venue: "Your venue",
      note: "A few details for your guests.",
    });
    sessionDrafts.set(current.id, structuredClone(draft));
    studio(current);
  };
  form.onsubmit = (e) => {
    e.preventDefault();
    capture();
    try {
      localStorage.setItem(keyFor(current.id), JSON.stringify(draft));
      document.querySelector("#save-status").textContent =
        "Saved on this device for this design.";
      toast("Your invitation draft is saved on this device.");
    } catch {
      toast("Storage is unavailable. Download your invitation to keep it.");
    }
  };
  document.querySelector("#clear-draft").onclick = () => {
    try {
      localStorage.removeItem(keyFor(current.id));
      document.querySelector("#save-status").textContent =
        "Saved draft deleted. Current edits remain in this tab.";
    } catch {
      toast("Storage is unavailable.");
    }
  };
  document.querySelector("#reset-sample").onclick = () => {
    sessionDrafts.set(current.id, sampleFor(current));
    studio(current);
    document.querySelector("#save-status").textContent =
      "Sample restored in this tab. Your saved draft was not changed.";
  };
  document.querySelector("#export").onclick = () => {
    if (form.reportValidity()) {
      capture();
      exportInvite(current, ordered(draft));
    }
  };
  document.querySelector("#preview-size").onclick = (e) => {
    const on = e.target.getAttribute("aria-pressed") !== "true";
    e.target.setAttribute("aria-pressed", on);
    document.querySelector("#live-preview").classList.toggle("phone", on);
    e.target.textContent = on ? "Wide view" : "Phone view";
  };
}
function ordered(d) {
  return {
    ...d,
    events: [...d.events].sort((a, b) =>
      (a.date + a.time).localeCompare(b.date + b.time),
    ),
  };
}
async function dataURL(url) {
  const r = await fetch(url);
  if (!r.ok) throw Error("Asset unavailable");
  const blob = await r.blob();
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
async function exportInvite(t, d) {
  const button = document.querySelector("#export");
  button.disabled = true;
  button.textContent = "Preparing your keepsake…";
  try {
    const [image, serif, italic, sans] = await Promise.all(
      [art(t), serifURL, italicURL, sansURL].map(dataURL),
    );
    const fonts = `@font-face{font-family:'Cormorant Garamond';src:url('${serif}')}@font-face{font-family:'Cormorant Garamond';font-style:italic;src:url('${italic}')}@font-face{font-family:Manrope;src:url('${sans}')}`;
    const body = renderInvitation(t, d, { exported: true }).replaceAll(
      art(t),
      image,
    );
    download(
      exportName(t) + ".html",
      `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data:; font-src data:; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'"><title>${escapeHTML(t.name)} — ${escapeHTML(d.name1)} &amp; ${escapeHTML(d.name2)} | Vow &amp; Verse</title><meta name="generator" content="Vow &amp; Verse"><meta name="description" content="${escapeHTML(t.name)} — a personal wedding invitation by Vow &amp; Verse"><style>${fonts}body{margin:0}*{box-sizing:border-box}${inviteCSS}</style></head><body>${body}</body></html>`,
      "text/html",
    );
    toast("Your complete offline invitation is ready. Nothing was uploaded.");
  } catch {
    toast("An asset could not be loaded. Please try again.");
  } finally {
    button.disabled = false;
    button.textContent = "Download invitation ↓";
  }
}
function privacy() {
  document.title = "Privacy & local drafts | Vow & Verse";
  app.innerHTML =
    nav() +
    `<main id="main" class="privacy-page section"><div class="eyebrow">YOUR STORY STAYS YOURS</div><h1>A little privacy.<br><em>By design.</em></h1><p>No analytics, advertising pixels, session recordings, tracking cookies or third-party embeds. All imagery and fonts are served locally.</p><h2>Your local drafts</h2><p>Save draft stores your invitation details in this browser, separately for each design. Other people using this browser profile may be able to see them. Delete a saved draft in the studio or clear site data. Unsaved edits remain only in this tab and disappear when you reload or close it.</p><h2>Your keepsake</h2><p>The downloaded HTML includes your personal details, original artwork and fonts. It works without network services. Treat the file as personal information. It contains no RSVP service or scripts.</p><h2>The sample collection</h2><p>All sample couples, stories, venues and celebrations are fictional. Scenes are original AI-generated artwork, not photographs of real wedding venues or customers. No booking, payments, guest messaging or hosting services are connected.</p><a class="button" href="#collection">Back to the collection ${arrow}</a></main>` +
    footer();
}
function route() {
  const hash = location.hash || "#/";
  if (["#collection", "#process", "#about"].includes(hash)) {
    if (!document.querySelector(".hero-v2")) home();
    requestAnimationFrame(() =>
      document
        .querySelector(hash)
        ?.scrollIntoView({
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        }),
    );
    return;
  }
  document.title = "Vow & Verse — A beautiful beginning";
  const [, page, id] = hash.split("/");
  if (page === "privacy") privacy();
  else if (page === "invitation" || page === "studio") {
    const t = templates.find((x) => x.id === id);
    if (t) page === "studio" ? studio(t) : preview(t);
    else
      app.innerHTML = `<main id="main" class="privacy-page section"><h1>This story is<br><em>still unwritten.</em></h1><p>We couldn’t find that design.</p><a class="button" href="#collection">Explore the collection ${arrow}</a></main>`;
  } else home();
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);
route();
