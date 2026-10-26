import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {templates} from '../src/data.js';
const base=process.env.TEST_URL||'http://127.0.0.1:4175';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,reducedMotion:'no-preference'});
const errors=[],external=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.url().startsWith('http')&&!r.url().startsWith(base))external.push(r.url())});
let checks=0;const ok=(v,m)=>{assert(v,m);checks++};await fs.mkdir('evidence/experience',{recursive:true});
const open=async id=>{await page.goto(base+'/#/invitation/'+id);await page.locator('#open-invite').click();await page.locator('.reveal').waitFor({state:'detached'});await page.evaluate(async()=>{document.activeElement.blur();await document.fonts.ready})};
try{
 for(const t of templates){
  await page.goto(base+'/#/invitation/'+t.id);await page.screenshot({path:`evidence/experience/${t.id}-closed.png`});await page.locator('#open-invite').click();await page.waitForTimeout(350);await page.screenshot({path:`evidence/experience/${t.id}-transition.png`});await page.locator('.reveal').waitFor({state:'detached'});await page.evaluate(async()=>{document.activeElement.blur();await document.fonts.ready});
  ok(await page.locator('.ambient i').count()<=5,'Bounded particles');
  await page.screenshot({path:`evidence/experience/${t.id}-open.png`});
  await page.evaluate(()=>scrollTo(0,240));await page.waitForTimeout(50);ok((await page.locator('.crafted-cover').evaluate(e=>e.style.getPropertyValue('--scene-depth')))!=='0px','Scroll changes scene depth');
  for(const selector of ['.family-niches','.invite-story','.date-keepsake','.invite-programme','.invite-rsvp','.invite-end']){if(await page.locator(selector).count()){await page.locator(selector).scrollIntoViewIfNeeded();await page.waitForFunction(s=>getComputedStyle(document.querySelector(s)).opacity==='1',selector,{timeout:5000});ok(await page.locator(selector).evaluate(e=>getComputedStyle(e).opacity==='1'),'Scrolled content revealed '+t.id+' '+selector);await page.screenshot({path:`evidence/experience/${t.id}-${selector.slice(1)}.png`})}}
  await page.locator('.date-scratch').scrollIntoViewIfNeeded();await page.waitForTimeout(750);const c=page.locator('.date-scratch'),r=await c.boundingBox();ok(r.width>100&&r.height>100,'Scratch surface has size');
  await page.mouse.move(r.x+r.width/2,r.y+r.height/2);await page.mouse.down();for(let y=20;y<r.height-10;y+=22){await page.mouse.move(r.x+r.width-18,r.y+y,{steps:7});await page.mouse.move(r.x+18,r.y+y+10,{steps:7})}await page.mouse.up();
  ok(await c.isHidden(),'Actual scratching reveals date');ok(await page.locator('.date-foil').isDisabled(),'Revealed control not focusable');
  await page.setViewportSize({width:1440,height:1000});await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`evidence/experience/${t.id}-desktop.png`});ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Desktop no overflow');await page.setViewportSize({width:390,height:844});
 }
 // Interrupt an opening, then return through browser history.
 await page.goto(base+'/#/invitation/dawn');await page.locator('#open-invite').click();await page.goto(base+'/#/invitation/moon');await page.waitForTimeout(1500);ok(await page.locator('#open-invite').isEnabled(),'Interrupted timer cannot open next invitation');await page.goBack();ok(await page.locator('#open-invite').isVisible(),'History restores usable cover');
 await open('courtyard');await page.locator('.date-foil').scrollIntoViewIfNeeded();await page.waitForTimeout(750);await page.locator('.date-foil').focus();await page.keyboard.press('Enter');ok(await page.locator('.date-scratch').isHidden(),'Keyboard alternative');ok(await page.locator('.date-message').evaluate(e=>e===document.activeElement),'Keyboard focus moves to status');
 await open('letters');await page.locator('.date-scratch').scrollIntoViewIfNeeded();await page.waitForTimeout(750);await page.locator('.date-scratch').tap();ok(await page.locator('.date-scratch').isHidden(),'Trusted touch tap alternative');
 await open('moon');const canvas=page.locator('.date-scratch');await canvas.scrollIntoViewIfNeeded();await page.waitForTimeout(750);const cr=await canvas.boundingBox();await page.mouse.move(cr.x+cr.width/2,cr.y+cr.height/2);await page.mouse.down();await canvas.dispatchEvent('pointercancel',{pointerId:1});await page.mouse.up();await page.locator('.date-foil').click();ok(await canvas.isHidden(),'Cancellation leaves button usable');
 await page.emulateMedia({reducedMotion:'reduce'});await open('silk');ok(await page.locator('.date-scratch').isHidden(),'Reduced motion date exposed');ok(await page.locator('.section-arriving:not(.section-seen)').count()===0,'Reduced motion all sections exposed');ok(await page.locator('.crafted-cover').evaluate(e=>!e.style.getPropertyValue('--scene-depth')),'Reduced motion no parallax');
 ok(errors.length===0,errors.join('\n'));ok(external.length===0,'No external requests');console.log(JSON.stringify({checks,errors,external}));
}finally{await browser.close()}
