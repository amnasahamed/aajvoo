import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {templates,sampleFor} from '../src/data.js';
import {renderInvitation} from '../src/invitations.js';
const base=process.env.TEST_URL||'http://127.0.0.1:4181';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,reducedMotion:'reduce'});
let checks=0;const errors=[],external=[];const ok=(v,m)=>{assert(v,m);checks++};
page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.url().startsWith('http')&&!r.url().startsWith(base))external.push(r.url())});
try{
 for(const t of templates){
  const sample=sampleFor(t);const html=renderInvitation(t,sample,{exported:true});
  ok(!html.includes('date-scratch')&&!html.includes('date-foil')&&!html.includes('id="rsvp-form"'),'Static renderer has no hidden date or form obstacle '+t.id);
  ok(sample.events.every((e,i)=>!i||e.date+'T'+e.time>=sample.events[i-1].date+'T'+sample.events[i-1].time),'Sample chronological '+t.id);
  await page.goto(base+'/#/invitation/'+t.id);await page.locator('#open-invite').focus();await page.keyboard.press('Enter');await page.locator('.reveal').waitFor({state:'detached'});
  const order=await page.locator('.page-content>[data-section]').evaluateAll(es=>es.map(e=>e.dataset.section));
  ok(order.indexOf('date')<order.indexOf('programme'),'No late reveal '+t.id);
  ok(await page.locator('.guest-notes').count()===1,'Guest guidance present '+t.id);
  ok((await page.locator('.guest-notes').textContent()).includes(t.dress),'Authored attire preserved '+t.id);
  ok(await page.locator('.date-foil').isHidden(),'No inert revealed button '+t.id);
  ok(await page.locator('.event-main').count()===1,'One main ceremony '+t.id);
  ok(await page.locator('.event-day').count()===new Set(sample.events.map(e=>e.date)).size,'Day hierarchy '+t.id);
  ok(JSON.stringify(await page.locator('[data-calendar]').evaluateAll(es=>es.map(e=>Number(e.dataset.calendar))))===JSON.stringify(sample.events.map((_,i)=>i)),'Calendar source indices preserved '+t.id);
  ok(await page.locator('.event-venue,.event-content>p').evaluateAll(es=>es.every(e=>parseFloat(getComputedStyle(e).fontSize)>=15)),'Venue and note typography '+t.id);
  ok(await page.locator('.invite-rsvp input,.invite-rsvp select').evaluateAll(es=>es.every(e=>parseFloat(getComputedStyle(e).fontSize)>=16)),'Phone form font avoids undersized controls '+t.id);
  const [download]=await Promise.all([page.waitForEvent('download'),page.locator('.event-main [data-calendar]').click()]);const ics=(await fs.readFile(await download.path(),'utf8')).replace(/\r\n /g,'');const event=sample.events[Number(await page.locator('.event-main [data-calendar]').getAttribute('data-calendar'))];ok(ics.includes('DTSTART:'+event.date.replaceAll('-','')+'T'+event.time.replace(':','')+'00')&&ics.includes(event.title)&&ics.includes('Fictional demonstration'),'Ceremony calendar still matches source event '+t.id);
  await page.locator('.invite-rsvp').scrollIntoViewIfNeeded();await page.locator('[name=guest]').fill('An imagined guest');await page.locator('#rsvp-form button').click();ok((await page.locator('#rsvp-status').textContent()).includes('No RSVP was sent or saved'),'Demo reply honest '+t.id);
  ok(await page.locator('.ending-mark').count()===1,'Distinct ending mark '+t.id);
  ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Phone containment '+t.id);
  await page.setViewportSize({width:1440,height:1000});ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Desktop containment '+t.id);await page.setViewportSize({width:390,height:844});
 }
 const custom=sampleFor(templates[0]);custom.events=[{...custom.events[0],title:'Post-wedding brunch'}];ok(!renderInvitation(templates[0],custom).includes('class="event event-main'),'Do not label wedding-related meal as ceremony');
 await page.goto(base);await page.goto(base+'/#/invitation/silk');ok(!(await page.locator('.entry-instruction').textContent()).includes('Draw'),'Opening cue promises tap only');
 ok(errors.length===0,JSON.stringify(errors));ok(external.length===0,JSON.stringify(external));console.log({checks,errors,external,scope:'All 11 hierarchy, guidance, date placement, static rendering, calendar indices, practical typography, demo replies and containment'});
}finally{await browser.close()}
