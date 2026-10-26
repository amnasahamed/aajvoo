import {authorize} from './auth.js';
import {check,slug,details,template,imageBytes} from './validation.js';
import {validDate} from '../src/calendar.js';
import {templates,sampleFor} from '../src/data.js';
const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','X-Frame-Options':'DENY','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'"};
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{...headers,'Content-Type':'application/json'}});
const currencies=new Set(Intl.supportedValuesOf('currency'));
const uid=()=>crypto.randomUUID();
const now=()=>new Date().toISOString();
const safeJSON=x=>JSON.stringify(x).replaceAll('<','\\u003c');
async function body(req){check(Number(req.headers.get('content-length')||0)<=100000);const reader=req.body?.getReader();check(reader);let size=0;const parts=[];while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>100000){await reader.cancel();check(false,'Request too large')}parts.push(value)}const bytes=new Uint8Array(size);let at=0;for(const part of parts){bytes.set(part,at);at+=part.length}return JSON.parse(new TextDecoder().decode(bytes))}
function config(e){return /^[a-z0-9.-]+$/.test(e.WEDDING_DOMAIN||'')&&e.ADMIN_HOST===`admin.${e.WEDDING_DOMAIN}`&&e.GALLERY_HOST===e.WEDDING_DOMAIN}
async function shell(req,env,data){const asset=await env.ASSETS.fetch(new Request(new URL('/',req.url)));if(!asset.ok)return json({error:'Invitation assets unavailable'},503);let html=await asset.text();const escape=x=>String(x).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));html=html.replace(/<title>.*?<\/title>/s,()=>`<title>${escape(data.data.name1)} &amp; ${escape(data.data.name2)} | Vow &amp; Verse</title>`);html=html.replace('</head>',()=>`<meta name="robots" content="noindex"><link rel="canonical" href="${new URL(req.url).origin}/"></head>`).replace('</body>',()=>`<script id="wedding-data" type="application/json">${safeJSON(data)}</script></body>`);return new Response(html,{headers:{...headers,'Content-Type':'text/html;charset=utf-8'}})}
async function handler(req,env){
 const u=new URL(req.url);if(!config(env))return json({error:'Service not configured'},503);
 if(u.protocol!=='https:')return json({error:'HTTPS required'},400);
 const admin=u.hostname===env.ADMIN_HOST;
 if(admin){
  let actor;try{actor=await authorize(req,env)}catch{return json({error:'Staff access required or not configured'},403)}
  if(!['GET','HEAD'].includes(req.method)&& (req.headers.get('Origin')!==u.origin||req.headers.get('X-Vow-Request')!=='1'))return json({error:'Same-origin request required'},403);
  if(u.pathname==='/api/session'&&req.method==='GET')return json({actor,domain:env.WEDDING_DOMAIN,templates:templates.map(t=>({id:t.id,name:t.name,sample:sampleFor(t)}))});
  if(u.pathname.startsWith('/api/'))return api(req,env,actor,u);
  if(u.pathname.startsWith('/preview/')){const w=await env.DB.prepare('SELECT * FROM weddings WHERE id=?').bind(u.pathname.split('/')[2]).first();if(!w)return json({error:'Not found'},404);return shell(req,env,{template:w.template,data:JSON.parse(w.draft),staff:true})}
  if(u.pathname==='/'||u.pathname==='/admin'||u.pathname==='/admin.html'){const r=await env.ASSETS.fetch(new Request(new URL('/admin',u)));if(!r.ok)return json({error:'Staff assets unavailable'},503);return new Response(r.body,{headers:{...headers,'Content-Type':'text/html;charset=utf-8'}})}
  if(/^\/(assets|images)\//.test(u.pathname)||['/admin.css','/admin.js'].includes(u.pathname))return env.ASSETS.fetch(req);
  return json({error:'Not found'},404);
 }
 if(!['GET','HEAD'].includes(req.method))return json({error:'Method not allowed'},405);
 if(u.hostname===env.GALLERY_HOST){if(/^\/(api|admin|preview|media)(\/|\.|$)/.test(u.pathname))return json({error:'Not found'},404);return env.ASSETS.fetch(req)}
 const suffix='.'+env.WEDDING_DOMAIN;const hostSlug=u.hostname.endsWith(suffix)?u.hostname.slice(0,-suffix.length):'';
 try{slug(hostSlug)}catch{return json({error:'Not found'},404)}
 const w=await env.DB.prepare('SELECT w.id,v.snapshot FROM weddings w JOIN versions v ON v.id=w.published AND v.wedding=w.id WHERE w.slug=?').bind(hostSlug).first();
 if(!w)return json({error:'Invitation not published'},404);
 const snapshot=JSON.parse(w.snapshot);
 if(u.pathname.startsWith('/media/'))return media(req,env,u.pathname.split('/')[2],w.id,snapshot.data.media);
 if(u.pathname==='/')return shell(req,env,snapshot);
 if(/^\/(assets|images)\//.test(u.pathname))return env.ASSETS.fetch(req);
 return json({error:'Not found'},404);
}
async function media(req,e,id,wedding,allowed){if(!allowed?.includes(id))return json({error:'Not found'},404);const m=await e.DB.prepare('SELECT * FROM media WHERE id=? AND wedding=?').bind(id,wedding).first();if(!m)return json({error:'Not found'},404);const object=await e.MEDIA.get(`${wedding}/${id}`);if(!object)return json({error:'Not found'},404);return new Response(object.body,{headers:{...headers,'Content-Type':m.mime,'Content-Security-Policy':"default-src 'none'; sandbox"}})}
async function api(req,e,actor,u){
 const sql=(s,...args)=>e.DB.prepare(s).bind(...args);
 const audit=(id,action)=>sql('INSERT INTO audit VALUES(?,?,?,?,?)',uid(),id,action,actor,now());
 if(u.pathname==='/api/weddings'){
  if(req.method==='GET')return json((await sql('SELECT id,slug,template,revision,published,status,created FROM weddings ORDER BY created DESC').all()).results);
  check(req.method==='POST');const b=await body(req);const id=uid();const t=template(b.template);const d=details(b.data||sampleFor(templates.find(x=>x.id===t)));check(d.media.length===0,'Upload images after creating the wedding');
  await e.DB.batch([sql('INSERT INTO weddings(id,slug,template,draft,created) VALUES(?,?,?,?,?)',id,slug(b.slug),t,JSON.stringify(d),now()),audit(id,'created')]);return json({id},201);
 }
 const match=u.pathname.match(/^\/api\/weddings\/([a-f0-9-]{36})(?:\/(publish|unpublish|rollback|payments|media|history))?(?:\/([a-f0-9-]{36}))?$/);if(!match)return json({error:'Not found'},404);
 const [,id,action,item]=match;const w=await sql('SELECT * FROM weddings WHERE id=?',id).first();if(!w)return json({error:'Not found'},404);
 if(req.method==='GET'){
  if(action==='media'&&item)return media(req,e,item,id,(await sql('SELECT id FROM media WHERE wedding=?',id).all()).results.map(x=>x.id));
  if(action==='history')return json({versions:(await sql('SELECT id,created,actor FROM versions WHERE wedding=? ORDER BY created DESC',id).all()).results,audit:(await sql('SELECT * FROM audit WHERE wedding=? ORDER BY created DESC',id).all()).results});
  if(action==='payments')return json({entries:(await sql('SELECT * FROM payments WHERE wedding=? ORDER BY created',id).all()).results,totals:(await sql('SELECT currency,SUM(amount) AS minor_units FROM payments WHERE wedding=? GROUP BY currency',id).all()).results});
  if(!action)return json({...w,draft:JSON.parse(w.draft),media:(await sql('SELECT * FROM media WHERE wedding=?',id).all()).results});
 }
 if(req.method==='POST'&&action==='media'){
  const {bytes,type}=await imageBytes(req);const mid=uid();const key=`${id}/${mid}`;
  await e.MEDIA.put(key,bytes,{httpMetadata:{contentType:type}});
  try{await e.DB.batch([sql('INSERT INTO media VALUES(?,?,?,?,?)',mid,id,type,bytes.length,now()),audit(id,`image uploaded ${mid}`)])}catch(err){await e.MEDIA.delete(key);throw err}return json({id:mid},201);
 }
 check(['PUT','POST'].includes(req.method));const b=await body(req);
 if(!action&&req.method==='PUT'){
  check(Number.isSafeInteger(b.revision)&&b.revision>=1,'Revision must be a positive integer');
  const d=details(b.data);template(b.template);check(['inquiry','confirmed','designing','ready','completed','cancelled'].includes(b.status));
  for(const mid of d.media)check(await sql('SELECT id FROM media WHERE id=? AND wedding=?',mid,id).first(),'Image belongs to another wedding');
  const r=await e.DB.batch([sql('UPDATE weddings SET draft=?,template=?,status=?,revision=revision+1 WHERE id=? AND revision=?',JSON.stringify(d),b.template,b.status,id,b.revision),sql("INSERT INTO audit SELECT ?,?,'draft saved',?,? WHERE changes()=1",uid(),id,actor,now())]);if(!r[0].meta.changes)return json({error:'Draft changed. Reload before saving.'},409);return json({revision:b.revision+1});
 }
 if(action&&req.method!=='POST')return json({error:'Method not allowed'},405);
 if(action==='publish'){
  check(Number.isSafeInteger(b.revision)&&b.revision>=1,'Revision must be a positive integer');
  check(b.revision===w.revision,'Reload the current draft before publishing');const version=uid();const snap=JSON.stringify({template:w.template,data:JSON.parse(w.draft)});
  const r=await e.DB.batch([sql('INSERT INTO versions SELECT ?,id,?,?,? FROM weddings WHERE id=? AND revision=?',version,snap,now(),actor,id,b.revision),sql('UPDATE weddings SET published=? WHERE id=? AND EXISTS(SELECT 1 FROM versions WHERE id=?)',version,id,version),sql("INSERT INTO audit SELECT ?,?,'published '||?, ?,? WHERE EXISTS(SELECT 1 FROM versions WHERE id=?)",uid(),id,version,actor,now(),version)]);if(!r[0].meta.changes)return json({error:'Draft changed'},409);return json({version,url:`https://${w.slug}.${e.WEDDING_DOMAIN}/`});
 }
 if(action==='unpublish'){await e.DB.batch([sql('UPDATE weddings SET published=NULL WHERE id=?',id),audit(id,'unpublished')]);return json({ok:true})}
 if(action==='rollback'){check(await sql('SELECT id FROM versions WHERE id=? AND wedding=?',b.version,id).first(),'Unknown wedding version');await e.DB.batch([sql('UPDATE weddings SET published=? WHERE id=?',b.version,id),audit(id,'rollback '+b.version)]);return json({ok:true})}
 if(action==='payments'){
  check(typeof b.key==='string'&&/^[a-f0-9-]{36}$/.test(b.key),'An idempotency UUID is required');
  const existing=await sql('SELECT * FROM payments WHERE id=?',b.key).first();
  if(existing){check(existing.wedding===id&&existing.amount===b.amount&&existing.currency===b.currency&&existing.method===b.method&&existing.paid_on===b.date&&existing.note===b.note&&(existing.reverses||null)===(b.reverses||null),'Idempotency key already used differently');return json({id:existing.id,replayed:true})}
  check(Number.isSafeInteger(b.amount)&&b.amount!==0&&Math.abs(b.amount)<=1000000000&&currencies.has(b.currency),'Amount must be integer minor units; currency ISO code');
  check(['cash','bank-transfer','other'].includes(b.method)&&validDate(b.date)&&typeof b.note==='string'&&b.note.length<=1000);
  if(b.reverses){const p=await sql('SELECT * FROM payments WHERE id=? AND wedding=?',b.reverses,id).first();check(p&&!p.reverses&&p.amount>0&&b.amount===-p.amount&&b.currency===p.currency,'Reversal must exactly offset original payment')}else check(b.amount>0,'Negative amount requires reversal');
  await e.DB.batch([sql('INSERT INTO payments VALUES(?,?,?,?,?,?,?,?,?,?)',b.key,id,b.amount,b.currency,b.method,b.date,b.note,b.reverses||null,actor,now()),audit(id,'manual payment '+b.key)]);return json({id:b.key},201);
 }
 return json({error:'Unsupported operation'},405);
}
export default {async fetch(req,env){try{return await handler(req,env)}catch(err){return json({error:err.status?err.message:'Request could not be completed; check input or conflicting records'},err.status||409)}}};
