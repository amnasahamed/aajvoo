import {calendarText,validDate,validTime} from "./calendar.js";
import "./languages.css";
import devanagariURL from "@fontsource/noto-sans-devanagari/files/noto-sans-devanagari-devanagari-400-normal.woff2?url";
import malayalamURL from "@fontsource/noto-sans-malayalam/files/noto-sans-malayalam-malayalam-400-normal.woff2?url";
import tamilURL from "@fontsource/noto-sans-tamil/files/noto-sans-tamil-tamil-400-normal.woff2?url";
import {chooseDesign} from "./sales.js";
import "./assisted.css";
import "./readiness.css";
import {mountExperience,isMotionPaused} from "./experience.js";
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
import "./scene-layers.css";
import "./interior-scenes.css";
import "./studio-home.css";
import "./editorial-home.css";
import "./quality.css";
import "./foundation-home.css";
import {drawing as homeDrawing} from "./craft-art.js";
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
function card(t,i){const paintedHome=["courtyard","letters","dawn","lake","temple"].includes(t.id);const closed=paintedHome?`<img src="/images/craft/${t.id}-closed.webp" alt="" loading="lazy" decoding="async" width="1024" height="1536">`:homeDrawing(t.id,"closed");return `<article class="design-card editorial-design" data-design="${t.id}" style="--design-ink:${t.color};--design-paper:${t.paper}"><a class="design-preview craft-preview" href="#/invitation/${t.id}" aria-label="Preview ${t.name}"><span class="design-mat"><span class="catalog-phone phone-behind">${miniature(t,true)}</span><span class="catalog-phone phone-front"><span class="phone-closed" aria-hidden="true">${closed}<span class="phone-seal">${escapeHTML(t.sample.name1[0])} &amp; ${escapeHTML(t.sample.name2[0])}</span></span>${miniature(t,true)}</span></span><span class="preview-call">Open the full invitation ${arrow}</span></a><div class="card-info"><span class="design-index">${t.edition}</span><div><span class="eyebrow">${t.category}</span><h3><a href="#/invitation/${t.id}">${t.name}</a></h3><p>${t.detail}</p></div><a href="#/invitation/${t.id}" class="collection-arrow" aria-label="Preview ${t.name}">${arrow}</a></div></article>`}
function renderCards() {
  const collectionOrder = ["courtyard", "lake", "letters"];
  const items = [...templates].sort((a,b)=>(collectionOrder.includes(a.id)?collectionOrder.indexOf(a.id):3+templates.indexOf(a))-(collectionOrder.includes(b.id)?collectionOrder.indexOf(b.id):3+templates.indexOf(b))).filter(
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
    `${items.length} considered ${items.length === 1 ? "design" : "designs"}`;
}
function home() {
  document.title = "Vow & Verse — A beautiful beginning";
  app.innerHTML = `<div class="studio-home editorial-home foundation-home">` + nav() + `<main id="main">
<section class="hero-v2 editorial-hero" aria-labelledby="hero-heading"><div class="hero-copy"><span class="eyebrow">A SMALL LINK. A BEAUTIFUL BEGINNING.</span><h1 id="hero-heading">Not just an invite.<br>A little <span class="headline-seal" aria-hidden="true"><svg viewBox="0 0 64 64"><path d="M32 7 38 11 46 10 50 17 57 21 56 29 59 36 53 42 51 50 43 52 37 58 30 55 22 57 17 50 10 47 11 39 6 33 10 26 9 18 17 15 22 8 29 10Z"/><path d="M20 36c0-10 12-10 12-20 0 10 12 10 12 20-1 9-23 9-24 0Zm12-6v19m-9-13 9 8 9-8"/></svg></span> world of yours.</h1><p>Wedding invitation websites with a world inside.<br> We personalise the invitation for you.</p><div class="hero-actions"><a class="editorial-link" href="#collection">Explore the designs ${arrow}</a><a class="foundation-preview-link" href="#/invitation/courtyard">Open a live demo ${arrow}</a></div></div><div class="hero-art"><a class="hero-companion companion-lake" href="#/invitation/lake" aria-label="Preview ${templates.find(t=>t.id==='lake').name}">${miniature(templates.find(t=>t.id==='lake'))}<span>${templates.find(t=>t.id==='lake').name}</span></a><a class="hero-invitation" href="#/invitation/courtyard" aria-label="Open Garden Verse invitation">${miniature(templates[0])}<span class="art-open">Open Garden Verse ${arrow}</span></a><a class="hero-companion companion-letter" href="#/invitation/letters" aria-label="Preview A Letter to You">${miniature(templates.find(t=>t.id==='letters'))}<span>A Letter to You</span></a></div><div class="hero-baseline"><span>Different traditions. Distinct little worlds.</span><a href="#collection">Find yours below ${arrow}</a></div></section>
<section id="collection" class="collection section editorial-collection"><div class="section-heading"><div><span class="eyebrow">01 / THE COLLECTION</span><h2>Find the one that<br>feels like <em>you.</em></h2></div><p>Open a design. Step into the celebration.<br> All eleven are ready to explore.</p></div><div class="collection-tools"><div class="filters" role="group" aria-label="Filter by style">${["All designs","Palace","Romantic","Heritage","Contemporary","Nikah","Anand Karaj"].map(x=>`<button data-filter="${x}" aria-pressed="${filter===x}">${x}</button>`).join('')}</div><label class="search"><span class="sr-only">Search designs</span><input type="search" placeholder="Find a design" value="${escapeHTML(search)}"><span aria-hidden="true">⌕</span></label></div><div class="collection-meta"><span id="result-count" aria-live="polite"></span><span>Start with Garden, Lake or Letter</span></div><div class="design-grid" id="design-grid"></div></section>
<section class="editorial-studio" id="about"><div class="studio-story" id="process"><span class="eyebrow">YOUR INVITATION, MADE PERSONAL</span><h2>You choose.<br>We make it <em>yours.</em></h2><p class="studio-lede">From a design you love to a celebration that feels like you.<br> Our studio handles the personalisation.</p><ol class="studio-steps"><li><div class="step-art step-designs" aria-hidden="true"><img src="/images/craft/lake-closed.webp" alt="" loading="lazy" width="1024" height="1536"><img src="/images/craft/courtyard-open.webp" alt="" loading="lazy" width="1024" height="1536"><img src="/images/craft/letters-closed.webp" alt="" loading="lazy" width="1024" height="1536"></div><span>01 / DISCOVER</span><div><h3>Find your world</h3><p>Open the complete previews. Choose the design you can imagine sharing.</p></div></li><li><div class="step-art step-conversation" aria-hidden="true"><span>Your chosen design</span><span>Your story. Your people.</span><i>A conversation with the studio</i></div><span>02 / CONNECT</span><div><h3>Tell us your story</h3><p>When our WhatsApp contact is configured, your chosen design starts the conversation. Share your details with the studio; we do the editing.</p></div></li><li><div class="step-art step-letter" aria-hidden="true"><span>Made for<br><i>your beginning.</i><svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="17"/><path d="m11 20 6 6 13-14"/></svg></span></div><span>03 / PERSONALISE</span><div><h3>Let us compose it</h3><p>Our studio adds your details for review. Pricing and delivery are agreed with you directly.</p></div></li></ol></div></section>
<section class="editorial-details section"><span class="eyebrow">A FEW THINGS TO KNOW</span><div>${[
["Can I see the whole invitation?","Yes. Every design opens into a complete, full-screen fictional celebration, including its opening, story, families and programme."],
["Who personalises our invitation?","The studio does. Choose your design, then discuss your details directly with us when our WhatsApp contact is available. There is no customer editor or online checkout."],
["Are these real weddings?","The sample couples, venues and stories are imaginary. The artwork is original generated illustration. Preview RSVPs send and store nothing."]
].map(([q,a])=>`<details><summary>${q}<span aria-hidden="true">+</span></summary><p>${a}</p></details>`).join('')}</div></section>
<section class="home-closing"><span class="eyebrow">BEGIN WITH A DESIGN</span><h2>Your celebration.<br>Your own little world.</h2><a class="button" href="#collection">Find your invitation ${arrow}</a><a class="closing-demo" href="#/invitation/courtyard">Experience Garden Verse ${arrow}</a></section></main><footer class="editorial-footer"><div class="footer-top"><a class="wordmark" href="#/" aria-label="Vow & Verse home">${wordmark}</a><p>A beautiful beginning.</p><a href="#collection">The collection ${arrow}</a></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Vow & Verse</span><a href="#/privacy">Privacy & local drafts</a><span>Eleven original invitation worlds</span></div></footer></div>`;
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
  app.innerHTML = `<main id="main"><div class="preview-toolbar"><button id="close-preview" aria-label="Close invitation preview">← <span>Collection</span></button><button id="choose-design">Choose this design</button></div>${renderReveal(t, draft)}<div id="opened-invite" hidden>${renderInvitation(t, draft)}</div><aside class="preview-decision" hidden aria-label="Choose your invitation"><span class="eyebrow">${escapeHTML(t.name)}</span><h2>Could this be your beginning?</h2><p>Choose the design to discuss personalisation with our studio. No details to enter here.</p><div><button data-preview-choice>Choose this design</button><button data-preview-return>Back to the collection</button></div></aside></main>`;
  document.querySelector('#close-preview').onclick=()=>{if(history.state?.fromCatalog)history.back();else location.hash='#collection'};
  document.querySelector('#choose-design').onclick=()=>chooseDesign(t);
  document.querySelector('[data-preview-choice]').onclick=()=>chooseDesign(t);
  document.querySelector('[data-preview-return]').onclick=()=>document.querySelector('#close-preview').click();
  const open = document.querySelector("#open-invite");
  open.onclick = () => {
    open.disabled = true;
    const reveal = document.querySelector(".reveal");
    reveal.classList.add("opening");
    openingTimer = setTimeout(
      () => {
        document.querySelector("#opened-invite").hidden = false;
        document.querySelector(".preview-decision")?.removeAttribute("hidden");
        reveal.remove();
        disposeExperience = mountExperience(document.querySelector("#opened-invite"), t.id);
        const h = document.querySelector(".invite-title h1");
        h.tabIndex = -1;
        h.focus({ preventScroll: true });
        window.scrollTo(0, 0);
      },
      (isMotionPaused() || matchMedia("(prefers-reduced-motion: reduce)").matches) ? 0 : 1450,
    );
    bindInvite();
  };
}
function bindInvite() {
  document
    .querySelectorAll("[data-calendar]")
    .forEach((b) => (b.onclick = () => {
      calendar(Number(b.dataset.calendar));
      let status=b.nextElementSibling;
      if(!status?.classList.contains('action-feedback')){status=document.createElement('p');status.className='action-feedback';status.setAttribute('role','status');b.after(status)}
      status.textContent='Calendar file requested. Open it to review and add the event.';
      b.dispatchEvent(new CustomEvent('invitation-action',{bubbles:true,detail:{kind:'calendar'}}));
    }));
  const form = document.querySelector("#rsvp-form");
  if (form)
    form.onsubmit = (e) => {
      e.preventDefault();
      document.querySelector("#rsvp-status").textContent =
        "Preview complete. No RSVP was sent or saved. Please contact your hosts directly.";
      form.dispatchEvent(new CustomEvent('invitation-action',{bubbles:true,detail:{kind:'reply'}}));
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
 document.querySelector('#open-invite').onclick=e=>{e.currentTarget.disabled=true;const reveal=app.querySelector('.reveal');reveal.classList.add('opening');openingTimer=setTimeout(()=>{reveal.remove();const root=document.querySelector('#opened-invite');root.hidden=false;disposeExperience=mountExperience(root,t.id);bindInvite();window.scrollTo(0,0)},(isMotionPaused()||matchMedia('(prefers-reduced-motion: reduce)').matches)?0:1450)};
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
