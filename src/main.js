import {calendarText,validDate,validTime} from "./calendar.js";
import "./languages.css";
import devanagariURL from "@fontsource/noto-sans-devanagari/files/noto-sans-devanagari-devanagari-400-normal.woff2?url";
import malayalamURL from "@fontsource/noto-sans-malayalam/files/noto-sans-malayalam-malayalam-400-normal.woff2?url";
import tamilURL from "@fontsource/noto-sans-tamil/files/noto-sans-tamil-tamil-400-normal.woff2?url";
import {chooseDesign} from "./sales.js";
import "./assisted.css";
import "./readiness.css";
import {mountExperience} from "./experience.js";
let disposeExperience = () => {};
let openingTimer;
let catalogScroll=0;
let lastWasPreview=false;
const weddingPayload=JSON.parse(document.querySelector("#wedding-data")?.textContent||"null");
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
import "./home.css";
import "./craft.css";
import "./studio-home.css";
import craftCSS from "./craft.css?raw";
import "@fontsource/parisienne/latin-400.css";
import "@fontsource/cinzel/latin-400.css";
import "@fontsource/fraunces/latin-600.css";
import scriptURL from "@fontsource/parisienne/files/parisienne-latin-400-normal.woff2?url";
import classicURL from "@fontsource/cinzel/files/cinzel-latin-400-normal.woff2?url";
import folkURL from "@fontsource/fraunces/files/fraunces-latin-600-normal.woff2?url";
import inviteCSS from "./invitation.css?raw";
import { templates, sampleFor } from "./data.js";
import {
  renderInvitation,
  sceneCover,
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
  return `<header class="site-nav"><a class="wordmark" href="#/" aria-label="Vow & Verse home">${wordmark}</a><nav aria-label="Main navigation"><a href="#collection">The collection</a><a href="#process">How it works</a><a href="#about">Our approach</a></nav><a class="button small" href="#collection">Choose your design ${arrow}</a><button class="mobile-menu" aria-label="Open navigation" aria-expanded="false">☰</button></header>`;
}
function footer() {
  return `<footer><div><a class="wordmark" href="#/" aria-label="Vow &amp; Verse home">${wordmark}</a><p>For the moments that become your story.</p></div><div><a href="#collection">Explore the collection ${arrow}</a><a href="#/privacy">Privacy & local drafts</a><span>Designed with intention. Shared with love.</span></div><p class="footer-bottom">© ${new Date().getFullYear()} Vow & Verse <span>An independent design studio · Frontend edition</span></p></footer>`;
}
function miniature(t, lazy=false){return `<div class="invitation crafted-invitation ${t.layout}" data-template="${t.id}" aria-hidden="true">${sceneCover(t,t.sample,{lazy}).replaceAll('<h1','<h3').replaceAll('</h1>','</h3>')}</div>`}
function card(t,i){return `<article class="design-card"><a class="design-preview craft-preview" href="#/invitation/${t.id}" aria-label="Preview ${t.name}">${miniature(t,true)}<span class="preview-call">Open invitation ${arrow}</span></a><div class="card-info"><div><span class="eyebrow">${t.edition} / ${t.category}</span><h3>${t.name}</h3><p>${t.mood}</p></div><a href="#/invitation/${t.id}" class="circle-link" aria-label="Preview ${t.name}">${arrow}</a></div></article>`}
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
  app.innerHTML = `<div class="studio-home">` + nav() + `<main id="main"><section class="hero-v2 atelier-hero"><div class="atelier-intro"><span class="eyebrow">VOW &amp; VERSE · WEDDING INVITATIONS</span><h1>A little ceremony<br><em>before the ceremony.</em></h1><p>Break a seal. Open a garden gate.<br>Invite your people into your story.</p><a class="button" href="#collection">Find your invitation ${arrow}</a><span class="atelier-note">Eleven original worlds, waiting to be made yours.</span></div><div class="invitation-fan"><a class="fan-card fan-left" href="#/invitation/tapestry" aria-label="Preview Threads of Promise">${miniature(templates[9])}</a><a class="fan-card fan-right" href="#/invitation/moon" aria-label="Preview The Moonlit Promise">${miniature(templates[8])}</a><a class="fan-card fan-center" href="#/invitation/courtyard" aria-label="Preview Garden Verse">${miniature(templates[0])}<span class="fan-seal">Open<br>our world</span></a></div></section><div class="collection-preface"><span>Painted gardens</span><i>✧</i><span>Letters &amp; heirlooms</span><i>✧</i><span>Rituals &amp; new beginnings</span></div><section id="collection" class="collection section"><div class="section-heading"><div><span class="eyebrow">THE INVITATION COLLECTION</span><h2>Which one feels<br><em>like your celebration?</em></h2></div><p>Every design has its own opening,<br>its own details, its own heart.<br>Tap one. See where it takes you.</p></div><div class="collection-tools"><div class="filters" role="group" aria-label="Filter by style">${["All designs","Palace","Romantic","Heritage","Contemporary","Nikah","Anand Karaj"].map(x=>`<button data-filter="${x}" aria-pressed="${filter===x}">${x}</button>`).join('')}</div><label class="search"><span class="sr-only">Search designs</span><input type="search" placeholder="Find your style" value="${escapeHTML(search)}"><span aria-hidden="true">⌕</span></label></div><div class="collection-meta"><span id="result-count" aria-live="polite"></span><span>Open a preview · Choose your design</span></div><div class="design-grid" id="design-grid"></div></section><section class="craft-note" id="about"><div class="note-object"><div class="invitation crafted-invitation" data-template="letters">${sceneCover(templates[1],templates[1].sample,{lazy:true}).replaceAll('<h1','<h3').replaceAll('</h1>','</h3>')}</div></div><div><span class="eyebrow">MORE THAN A PRETTY COVER</span><h2>Something to open.<br><em>Something to remember.</em></h2><p>A doorway that parts. A letter that unfolds. A date revealed with a touch.</p><p>The details continue inside: your families, your story, the days you’ll celebrate together. All composed as one invitation.</p><a class="text-link" href="#/invitation/letters">Open A Letter to You ${arrow}</a></div></section><section class="make-it-personal section" id="process"><span class="eyebrow">FROM OUR STUDIO TO YOUR STORY</span><h2>Your story.<br><em>Our studio.</em></h2><div class="personal-steps"><article><span>01</span><h3>Fall for a design</h3><p>Explore all eleven complete sample celebrations. Choose the one that feels like you.</p></article><article><span>02</span><h3>Talk to the studio</h3><p>Choose a design to begin a WhatsApp conversation when our contact is configured. We help gather the details.</p></article><article><span>03</span><h3>We compose your invitation</h3><p>Our team prepares the invitation for your review. Pricing, delivery and payment arrangements are agreed directly with the studio.</p></article></div><a class="button" href="#collection">Choose a design ${arrow}</a></section><section class="faq section"><div><span class="eyebrow">BEFORE YOU BEGIN</span><h2>A few<br><em>little details.</em></h2></div><div>${[
["Can I preview every design?","Yes. Open any of the eleven fictional sample celebrations and experience the complete invitation."],
["Who adds our details?","The studio handles personalization. Choose a design, then discuss your celebration directly with us when our WhatsApp contact is available."],
["Can I order or pay here?","There is no online checkout or payment collection. Prices and delivery arrangements are agreed with the studio; no order is placed by viewing or choosing a design."],
["Are the sample people and venues real?","No. Every sample celebration is imaginary. The artwork is original generated illustration, not a photograph of a customer wedding."],
["Does the preview collect RSVPs?","No. The sample RSVP is a demonstration and sends or stores nothing."]
].map(([q,a])=>`<details><summary>${q}<span>+</span></summary><p>${a}</p></details>`).join('')}</div></section><section class="studio-closing"><span class="eyebrow">YOUR PEOPLE. YOUR CELEBRATION. YOUR INVITATION.</span><h2>Let the first moment<br><em>be a beautiful one.</em></h2><a class="button" href="#collection">Explore the collection ${arrow}</a></section></main>`+footer()+`</div>`;
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
  document.querySelectorAll(".site-nav nav a").forEach((link) => link.addEventListener("click", () => {
    document.querySelector(".site-nav").classList.remove("menu-open");
    document.querySelector(".mobile-menu").setAttribute("aria-expanded", "false");
  }));
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
  document.body.classList.add("immersive-preview");
  app.innerHTML = `<main id="main"><div class="preview-toolbar"><button id="close-preview" aria-label="Close invitation preview">← <span>Collection</span></button><button id="choose-design">Choose this design</button></div>${renderReveal(t, draft)}<div id="opened-invite" hidden>${renderInvitation(t, draft)}</div></main>`;
  document.querySelector('#close-preview').onclick=()=>{if(history.state?.fromCatalog)history.back();else location.hash='#collection'};
  document.querySelector('#choose-design').onclick=()=>chooseDesign(t);
  const open = document.querySelector("#open-invite");
  open.onclick = () => {
    open.disabled = true;
    const reveal = document.querySelector(".reveal");
    reveal.classList.add("opening");
    openingTimer = setTimeout(
      () => {
        document.querySelector("#opened-invite").hidden = false;
        reveal.remove();
        disposeExperience = mountExperience(document.querySelector("#opened-invite"), t.id);
        const h = document.querySelector(".invite-title h1");
        h.tabIndex = -1;
        h.focus({ preventScroll: true });
        window.scrollTo(0, 0);
      },
      matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1450,
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
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}
function calendar(index) {
  const e = draft.events[index];
  const isSample = !!document.querySelector(".preview-toolbar");
  const ics = calendarText(e,draft.location,isSample);
  download(exportName(current) + ".ics", ics, "text/calendar");
}
function privacy() {
  document.title = "Privacy & local drafts | Vow & Verse";
  app.innerHTML =
    nav() +
    `<main id="main" class="privacy-page section"><div class="eyebrow">YOUR STORY STAYS YOURS</div><h1>A little privacy.<br><em>By design.</em></h1><p>No analytics, advertising pixels, session recordings, tracking cookies or third-party embeds. All imagery and fonts are served locally.</p><h2>Your privacy</h2><p>The gallery does not collect customer details. Choosing a design opens WhatsApp only when the studio has configured its contact number; WhatsApp then operates under its own privacy terms. No data is sent until you choose to send a message there.</p><h2>Older local drafts</h2><p>Drafts saved by earlier versions remain untouched in your browser. The public editor has been retired. Clear site data in your browser settings if you wish to remove those drafts.</p><h2>The sample collection</h2><p>All sample couples, stories, venues and celebrations are fictional. Original generated scenes are not photographs of real customers. Sample RSVPs send and store nothing.</p><a class="button" href="#collection">Back to the collection ${arrow}</a></main>` +
    footer();
}
function renderWedding(){
 const original=templates.find(t=>t.id===weddingPayload.template);
 if(!original){app.textContent='Invitation unavailable';return;}
 const t={...original,quote:weddingPayload.data.note,dress:'Please confirm celebration details with your hosts.'};
 current=t;draft=weddingPayload.data;
 document.title=`${draft.name1} & ${draft.name2} | Vow & Verse`;
 document.body.classList.add('immersive-preview','published-wedding');
 app.innerHTML=`<main id="main">${weddingPayload.staff?'<p class="staff-banner">Private saved draft · Staff preview</p>':''}${renderReveal(t,draft)}<div id="opened-invite" hidden>${renderInvitation(t,draft)}</div></main>`;
 app.querySelectorAll('.fiction-note,.invite-rsvp').forEach(x=>x.remove());
 const credit=app.querySelector('.invite-end small');if(credit)credit.textContent='Designed with Vow & Verse';
 if(draft.media?.length){const gallery=document.createElement('section');gallery.className='personal-gallery';gallery.setAttribute('aria-label','Wedding photographs');for(const id of draft.media){const img=document.createElement('img');img.src=weddingPayload.staff?`/api/weddings/${location.pathname.split('/')[2]}/media/${id}`:`/media/${id}`;img.alt='Wedding photograph';img.loading='lazy';gallery.append(img)}app.querySelector('.invite-end').before(gallery)}
 document.querySelector('#open-invite').onclick=e=>{e.currentTarget.disabled=true;const reveal=app.querySelector('.reveal');reveal.classList.add('opening');openingTimer=setTimeout(()=>{reveal.remove();const root=document.querySelector('#opened-invite');root.hidden=false;disposeExperience=mountExperience(root,t.id);bindInvite();window.scrollTo(0,0)},matchMedia('(prefers-reduced-motion: reduce)').matches?0:1450)};
}
function route() {
  clearTimeout(openingTimer);
  disposeExperience();
  disposeExperience = () => {};
  if(weddingPayload){renderWedding();return;}
  const hash = location.hash || "#/";
  const nextPreview=hash.startsWith('#/invitation/');
  if(nextPreview&&!lastWasPreview){catalogScroll=window.scrollY;history.replaceState({...history.state,fromCatalog:!!document.querySelector('#design-grid')},'');}
  const restore=lastWasPreview&&!nextPreview;
  lastWasPreview=nextPreview;
  document.body.classList.toggle('immersive-preview',nextPreview);
  if (["#collection", "#process", "#about"].includes(hash)) {
    if (!document.querySelector(".hero-v2")) home();
    if(restore){requestAnimationFrame(()=>window.scrollTo(0,catalogScroll));return;}
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
  else if (page === "invitation") {
    const t = templates.find((x) => x.id === id);
    if (t) preview(t);
    else
      app.innerHTML = `<main id="main" class="privacy-page section"><h1>This story is<br><em>still unwritten.</em></h1><p>We couldn’t find that design.</p><a class="button" href="#collection">Explore the collection ${arrow}</a></main>`;
  } else home();
  window.scrollTo(0, restore?catalogScroll:0);
}
window.addEventListener("hashchange", route);
route();
