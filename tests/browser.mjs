import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { templates } from "../src/data.js";
const base = process.env.TEST_URL || "http://127.0.0.1:4173";
const evidence = "evidence/v2";
await fs.mkdir(evidence, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const requests = [],
  errors = [],
  checks = [],
  structures = {};
context.on("request", (r) => requests.push(r.url()));
page.on("pageerror", (e) => errors.push(e.message));
const ok = (condition, message) => {
  assert(condition, message);
  checks.push(message);
};
const fits = () =>
  page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
async function snap(name, fullPage = true) {
  await page.evaluate(async () => {
    document.querySelectorAll("img").forEach((i) => (i.loading = "eager"));
    await Promise.all(
      [...document.images].map((i) => i.decode().catch(() => {})),
    );
    await document.fonts.ready;
    window.scrollTo(0, 0);
    document.activeElement?.blur();
  });
  await page.screenshot({ path: `${evidence}/${name}.png`, fullPage });
}
try {
  ok(
    new Set(templates.map((t) => t.sample.name1 + "&" + t.sample.name2))
      .size === 11,
    "Eleven different fictional couples",
  );
  ok(
    new Set(templates.map((t) => t.sample.story)).size === 11,
    "Eleven original stories",
  );
  ok(
    new Set(templates.map((t) => t.reveal)).size === 11,
    "Eleven distinct opening directions",
  );
  for (const t of templates) {
    const keys = t.sample.events.map((e) => e.date + e.time);
    ok(
      JSON.stringify(keys) === JSON.stringify([...keys].sort()),
      `${t.name} sample events are chronological`,
    );
    ok(
      t.sample.events.length >= 2 && t.sample.events.length <= 4,
      `${t.name} has a meaningful event programme`,
    );
  }
  await page.goto(base);
  ok(
    (await page.locator(".design-card").count()) === 11,
    "Gallery includes eleven designs",
  );
  await page.getByRole("button", { name: "Palace", exact: true }).click();
  ok((await page.locator(".design-card").count()) === 3, "Palace filter works");
  await page.getByRole("button", { name: "All designs", exact: true }).click();
  await page.getByRole("searchbox").fill("moon");
  ok((await page.locator(".design-card").count()) === 1, "Text search works");
  await page.getByRole("searchbox").fill("notfound");
  ok(await page.locator(".empty").isVisible(), "Empty search state works");
  await page.getByRole("searchbox").fill("");
  await page.locator("summary").first().click();
  ok((await page.locator("details[open]").count()) === 1, "FAQ opens");
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    await page.goto(base + "/#/");
    ok(await fits(), `Home fits ${width}px`);
    if (width !== 768) {
      await snap("home-" + width);
      await snap("home-viewport-" + width, false);
    }
    if (width === 390) {
      const top = await page
        .locator(".fan-center .crafted-scene")
        .evaluate((el) => el.getBoundingClientRect().top);
      ok(top < 450, "Homepage artwork begins within first phone viewport");
      await page.getByRole("button", { name: "Open navigation" }).click();
      ok(
        await page.locator(".site-nav nav").isVisible(),
        "Mobile navigation opens",
      );
      await page.locator(".site-nav nav").getByText("How it works").click();
      ok(
        await page.evaluate(() => location.hash === "#process"),
        "Mobile navigation reaches process",
      );
    }
    for (const t of templates) {
      await page.goto(base + "/#/invitation/" + t.id);
      await page.locator("#open-invite").waitFor();
      ok(await fits(), `${t.name} opening fits ${width}px`);
      await page.locator("#open-invite").focus();
      await page.keyboard.press("Enter");
      await page.locator(".reveal").waitFor({ state: "detached" });
      ok(
        (await page.locator(".invite-title h1").textContent()).includes(
          t.sample.name1,
        ),
        `${t.name} opens its own couple at ${width}px`,
      );
      ok(
        (await page.locator(".event").count()) === t.sample.events.length,
        `${t.name} renders all events at ${width}px`,
      );
      ok(await fits(), `${t.name} content fits ${width}px`);
      if (width === 1440) {
        structures[t.id] = await page
          .locator(".invitation")
          .evaluate((el) => [...el.children].map((n) => n.className).join("|"));
      }
      if (width !== 768) await snap(t.id + "-" + width);
    }
  }
  ok(
    new Set(Object.values(structures)).size === 11,
    "All eleven top-level page structures differ",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  for (const t of templates) {
    await page.goto(base + "/#/invitation/" + t.id);
    await page.locator("#open-invite").click();
    await page.locator(".reveal").waitFor({ state: "detached" });
    ok(
      await page.locator(".invite-cover").isVisible(),
      `${t.name} normal-motion opening completes`,
    );
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(base + "/#/invitation/courtyard");
  await page.locator("#open-invite").click();
  await page.locator(".reveal").waitFor({ state: "detached" });
  await page.locator("[name=guest]").fill("Fictional Guest");
  await page.getByRole("button", { name: "Preview my reply" }).click();
  ok(
    (await page.locator("#rsvp-status").textContent()).includes(
      "No RSVP was sent",
    ),
    "RSVP demonstration is explicit",
  );
  const cp = page.waitForEvent("download");
  await page.locator('[data-calendar="0"]').click();
  const cal = await cp;
  await cal.saveAs(`${evidence}/calendar.ics`);
  ok(
    (await fs.readFile(`${evidence}/calendar.ics`, "utf8")).includes(
      "DTSTART:20271119T183000",
    ),
    "Calendar uses individual event date and time",
  );
  await page.goto(base + "/#/studio/courtyard");
  await page.locator("[name=name1]").fill("Mira");
  await page
    .locator("[name=story]")
    .fill("An original story. <script>alert(1)</script>");
  ok(
    (await page.locator("#live-preview h1").textContent()).includes("Mira"),
    "Live editing works",
  );
  ok(
    (await page.locator("#live-preview script").count()) === 0,
    "User story is escaped",
  );
  await page.getByRole("button", { name: "Save draft on this device" }).click();
  await page.reload();
  ok(
    (await page.locator("[name=name1]").inputValue()) === "Mira",
    "Saved draft survives reload",
  );
  await page.locator("[name=design]").selectOption("moon");
  ok(
    (await page.locator("[name=name1]").inputValue()) === "Safiya",
    "Switching design loads its distinct sample",
  );
  await page.locator("[name=name1]").fill("Amal");
  await page.locator("[name=design]").selectOption("courtyard");
  ok(
    (await page.locator("[name=name1]").inputValue()) === "Mira",
    "Switching back preserves prior design draft",
  );
  await page.locator("[name=design]").selectOption("moon");
  ok(
    (await page.locator("[name=name1]").inputValue()) === "Amal",
    "Unsaved edits retained per design in this tab",
  );
  await page
    .getByRole("button", { name: "Reset current edits to sample" })
    .click();
  ok(
    (await page.locator("[name=name1]").inputValue()) === "Safiya",
    "Sample reset restores correct identity",
  );
  await page.locator("[name=design]").selectOption("courtyard");
  await page.getByRole("button", { name: "+ Add a celebration" }).click();
  ok(
    (await page.locator(".event-editor").count()) === 4,
    "Add dated celebration works",
  );
  await page.locator("[name=event-3-date]").fill("2027-11-18");
  await page.locator("[name=event-3-title]").fill("A quiet arrival");
  ok(
    (await page.locator("#live-preview .event").first().textContent()).includes(
      "A quiet arrival",
    ),
    "Editor sorts event dates chronologically",
  );
  await page.getByRole("button", { name: "Remove celebration 4" }).click();
  ok(
    (await page.locator(".event-editor").count()) === 3,
    "Remove celebration works",
  );
  await page
    .locator("[name=story]")
    .fill(
      "A weekend with our favourite people, surrounded by jasmine and warm light.",
    );
  await snap("studio-desktop");
  await page.getByRole("button", { name: "Phone view", exact: true }).click();
  ok(
    await page.locator("#live-preview.phone").isVisible(),
    "Phone preview toggle works",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  ok(await fits(), "Editor fits phone");
  await snap("studio-mobile");
  const dp = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download invitation" }).click();
  const down = await dp;
  await down.saveAs(`${evidence}/invitation.html`);
  const html = await fs.readFile(`${evidence}/invitation.html`, "utf8");
  ok(
    html.includes("data:image/webp;base64,"),
    "Export embeds generated artwork",
  );
  ok(
    html.includes("@font-face") && html.includes("base64,"),
    "Export embeds local fonts",
  );
  ok(!html.includes("<script"), "Export has no executable scripts");
  const offline = await context.newPage();
  await context.setOffline(true);
  await offline.setContent(html);
  await offline.evaluate(async () => {
    document.querySelectorAll("img").forEach((i) => (i.loading = "eager"));
    await Promise.all([...document.images].map((i) => i.decode()));
    await document.fonts.ready;
  });
  ok(
    (await offline.locator("h1").textContent()).includes("Mira"),
    "Offline export renders custom details",
  );
  ok(
    await offline
      .locator("img")
      .evaluateAll((imgs) =>
        imgs.every((i) => i.complete && i.naturalWidth > 0),
      ),
    "Every export image renders offline",
  );
  await offline.close();
  await context.setOffline(false);
  await page.goto(base + "/#/studio/courtyard");
  await page.getByRole("button", { name: "Delete saved draft" }).click();
  await page.reload();
  ok(
    (await page.locator("[name=name1]").inputValue()) === "Ira",
    "Saved draft deletion works",
  );
  for (const t of templates) {
    await page.goto(base + "/#/studio/" + t.id);
    ok(
      (await page.locator("[name=name1]").inputValue()) === t.sample.name1,
      `${t.name} editor loads its own initial wedding`,
    );
  }
  await page.goto(base + "/#/invitation/missing");
  ok(
    await page.getByText("We couldn’t find that design.").isVisible(),
    "Unknown design recovers gracefully",
  );
  ok(errors.length === 0, "No uncaught runtime errors");
  const external = requests.filter(
    (u) => u.startsWith("http") && !u.startsWith(base),
  );
  ok(
    external.length === 0,
    "No external HTTP(S) requests throughout all tested flows",
  );
  await fs.writeFile(
    `${evidence}/verification.json`,
    JSON.stringify(
      {
        date: new Date().toISOString(),
        checks,
        structures,
        errors,
        externalRequests: external,
        uniqueRequests: [...new Set(requests)],
      },
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify(
      { passed: checks.length, errors, externalRequests: external },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
