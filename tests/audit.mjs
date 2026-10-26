import fs from "node:fs/promises";
import path from "node:path";
const files = ["index.html"];
async function walk(dir) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (/\.(?:js|css|html|svg)$/.test(p)) files.push(p);
  }
}
await walk("src");
await walk("public");
const forbidden =
  /(google-analytics|googletagmanager|facebook\.net|hotjar|clarity\.ms|segment\.com|mixpanel|posthog|sentry|sendBeacon|document\.cookie|new WebSocket|<iframe|https?:\/\/)/gi;
const hits = [];
for (const f of files) {
  let text = (await fs.readFile(f, "utf8")).replaceAll(
    "http://www.w3.org/2000/svg",
    "",
  );
  if(f === "src/sales.js") text=text.replace("https://wa.me/", "");
  if(f === "public/admin.js") text=text.replace("https://${esc(current.slug)}.${esc(session.domain)}/", "");
  for (const m of text.matchAll(forbidden)) hits.push({ file: f, match: m[0] });
}
const report = {
  date: new Date().toISOString(),
  filesScanned: files.length,
  externalUrlsOrTrackingMarkers: hits,
  allowedNetworkOperation:
    "Same-origin fonts/art; configured WhatsApp only on explicit choice. Staff API requests are same-origin.",
  storage:
    "Public gallery writes no drafts or RSVP data. Existing local drafts untouched. Server admin uses Access and persistent D1/R2.",
};
await fs.mkdir("evidence/v2", { recursive: true });
await fs.writeFile(
  "evidence/v2/source-audit.json",
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
if (hits.length) process.exitCode = 1;
