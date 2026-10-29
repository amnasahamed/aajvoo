// Capture actual invitation entry/cover elements. No replica markup or image manipulation.
import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {templates} from '../src/data.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const base=process.env.TEST_URL||'http://127.0.0.1:4181';
const check=process.argv.includes('--check');
const out=path.join(root,'public/images/previews');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,reducedMotion:'reduce',locale:'en-GB',timezoneId:'UTC'});
const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
const manifest={browser:await browser.version(),viewport:{width:390,height:844},deviceScaleFactor:1,reducedMotion:true,format:'jpeg',quality:90,templates:{}};
await fs.mkdir(out,{recursive:true});
try{
 for(const t of templates){
  await page.goto(`${base}/#/invitation/${t.id}`);await page.waitForLoadState('networkidle');await page.evaluate(()=>document.fonts.ready);
  const shots={};
  for(const state of ['closed','open','cover']){
   if(state==='open'){await page.locator('#open-invite').click();await page.locator('.reveal').waitFor({state:'detached'});await page.evaluate(()=>scrollTo(0,0));}
   const element=page.locator(state==='closed'?'.craft-reveal':'#opened-invite .invite-cover').first();
   await element.locator('img').evaluateAll(es=>Promise.all(es.map(e=>e.decode())));
   await page.evaluate(()=>scrollTo({top:0,left:0,behavior:'instant'}));
   const box=await element.boundingBox();
   // Full-page clipping avoids Chromium's element-screenshot scroll/crop race.
   const buffer=await page.screenshot({type:'jpeg',quality:90,animations:'disabled',fullPage:true,clip:{x:box.x,y:box.y,width:390,height:state==='open'?844:Math.ceil(box.height)}});
   const name=`${t.id}-${state}.jpg`,target=path.join(out,name);
   if(check){const existing=await fs.readFile(target);if(sha(existing)!==sha(buffer))throw Error(`Stale preview: ${name}. Regenerate from current renderer.`);}else await fs.writeFile(target,buffer);
   shots[state]={src:`/images/previews/${name}`,width:Math.ceil(box.width),height:state==='open'?844:Math.ceil(box.height),bytes:buffer.length,sha256:sha(buffer)};
  }
  manifest.templates[t.id]=shots;console.log(t.id,shots.closed.width,shots.closed.height,shots.open.width,shots.open.height);
 }
 if(errors.length)throw Error(errors.join('\n'));
 if(!check)await fs.writeFile(path.join(out,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
 console.log(`${check?'Verified':'Captured'} 33 actual-renderer snapshots; errors=0`);
}finally{await browser.close()}
