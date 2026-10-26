import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {templates} from '../src/data.js';
const base=process.env.TEST_URL||'http://127.0.0.1:4175';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
const external=[],errors=[],results=[];page.on('request',r=>{if(r.url().startsWith('http')&&!r.url().startsWith(base))external.push(r.url())});page.on('pageerror',e=>errors.push(e.message));
await fs.mkdir('evidence/craft',{recursive:true});
const ready=()=>page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()))});
try{
 for(const t of templates){
  await page.goto(base+'/#/invitation/'+t.id);await page.locator('#open-invite').waitFor();await ready();await page.screenshot({path:`evidence/craft/${t.id}-closed.png`});
  await page.locator('#open-invite').focus();await page.keyboard.press('Enter');await page.locator('.reveal').waitFor({state:'detached'});await ready();
  assert(await page.locator('.invite-title h1').evaluate(e=>e===document.activeElement),'Opening transfers focus to invitation title');
  assert(await page.locator('.event').count()===t.sample.events.length,'Programme retained');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No horizontal overflow');
  await page.screenshot({path:`evidence/craft/${t.id}-open.png`});await page.screenshot({path:`evidence/craft/${t.id}-journey.png`,fullPage:true});
  await page.locator('.invite-programme').scrollIntoViewIfNeeded();await page.screenshot({path:`evidence/craft/${t.id}-programme.png`});
  await page.locator('.date-foil').click();assert(await page.locator('.date-foil').getAttribute('aria-expanded')==='true','Date revealed');assert((await page.locator('.date-message').textContent()).includes('celebrate'),'Date message');assert(await page.locator('.petal-burst').count()===0,'Reduced motion avoids decorative particles');
  await page.locator('.invite-end').scrollIntoViewIfNeeded();await page.screenshot({path:`evidence/craft/${t.id}-closing.png`});
  await page.goto(base+'/#/studio/'+t.id);await page.locator('[name=name1]').fill('Annalise-Dharshini');await page.locator('[name=name2]').fill('Venkataraman-Sebastian');await ready();
  const title=await page.locator('#live-preview .invite-title').evaluate(e=>{const r=e.getBoundingClientRect(),c=e.closest('.invite-cover').getBoundingClientRect();return {fits:e.scrollWidth<=e.clientWidth+1,bottom:r.bottom<=c.bottom}});assert(title.fits&&title.bottom,'Long names fit cover');
  results.push({id:t.id,keyboard:true,dateReveal:true,longNames:true});
 }
 await page.emulateMedia({reducedMotion:'no-preference'});
 for(const id of ['dawn','letters','herbarium','moon','tapestry','silk']){await page.goto(base+'/#/invitation/'+id);await ready();await page.locator('#open-invite').click();await page.waitForTimeout(450);await page.screenshot({path:`evidence/craft/${id}-opening-motion.png`});await page.locator('.reveal').waitFor({state:'detached'});assert(await page.locator('.invite-title').isVisible(),'Motion ends in usable invitation')}
 assert(external.length===0);assert(errors.length===0);await fs.writeFile('evidence/craft/results.json',JSON.stringify({results,external,errors},null,2));console.log(JSON.stringify({templates:results.length,external,errors}));
}finally{await browser.close()}
