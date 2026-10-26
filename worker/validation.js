import {templates} from '../src/data.js';
import {validDate,validTime} from '../src/calendar.js';
export function check(ok,message='Invalid input'){if(!ok)throw Object.assign(Error(message),{status:400})}
export function slug(value){check(typeof value==='string'&&/^[a-z][a-z0-9-]{2,48}[a-z0-9]$/.test(value)&&!value.includes('--')&&!['admin','api','www','assets','media','preview','mail','support','static','dashboard'].includes(value),'Use an available lowercase slug, 4–50 characters');return value}
const text=(v,n=3000)=>{check(typeof v==='string'&&v.length<=n);return v.trim()};
export function details(input){
 check(input&&typeof input==='object');const d={};
 for(const k of ['name1','name2','date','location','hostline','story','note'])d[k]=text(input[k],k.startsWith('name')?150:3000);
 check(d.name1&&d.name2&&validDate(d.date),'Names and a valid date required');
 check(Array.isArray(input.events)&&input.events.length>=1&&input.events.length<=20,'Use 1–20 events');
 d.events=input.events.map(e=>{check(e&&typeof e==='object');check(validDate(e.date)&&validTime(e.time),'Invalid event date/time');return {title:text(e.title,160),date:e.date,time:e.time,venue:text(e.venue,500),note:text(e.note||'',3000)}}).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
 d.media=Array.isArray(input.media)?input.media.map(x=>{check(typeof x==='string'&&/^[a-f0-9-]{36}$/.test(x));return x}):[];check(d.media.length<=12);return d;
}
export function template(id){check(templates.some(t=>t.id===id),'Unknown design');return id}
export async function imageBytes(request){
 const type=request.headers.get('content-type');check(['image/jpeg','image/png','image/webp'].includes(type),'JPEG, PNG or WebP only');
 const reader=request.body?.getReader();check(reader,'Empty upload');const chunks=[];let size=0;
 try{while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;check(size<=5*1024*1024,'Image exceeds 5 MiB');chunks.push(value)}}catch(e){await reader.cancel();throw e}
 const bytes=new Uint8Array(size);let offset=0;for(const c of chunks){bytes.set(c,offset);offset+=c.length}check(size>=12,'Invalid image');
 const hex=Array.from(bytes.slice(0,8)).map(n=>n.toString(16).padStart(2,'0')).join('');
 check(type==='image/png'?hex==='89504e470d0a1a0a':type==='image/jpeg'?hex.startsWith('ffd8ff'):new TextDecoder().decode(bytes.slice(0,4))==='RIFF'&&new TextDecoder().decode(bytes.slice(8,12))==='WEBP','Image signature mismatch');
 dimensions(bytes,type);return {bytes,type};
}
export function dimensions(bytes,type){
 const v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);let width=0,height=0;
 if(type==='image/png'&&bytes.length>=24){width=v.getUint32(16);height=v.getUint32(20)}
 if(type==='image/jpeg'){let at=2;while(at+8<bytes.length){if(bytes[at]!==255)break;const marker=bytes[at+1];if(marker===0xda||marker===0xd9)break;const length=v.getUint16(at+2);if(length<2||at+2+length>bytes.length)break;if([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)){height=v.getUint16(at+5);width=v.getUint16(at+7);break}at+=2+length}}
 if(type==='image/webp'&&bytes.length>=30){const kind=new TextDecoder().decode(bytes.slice(12,16));if(kind==='VP8X'){width=1+bytes[24]+(bytes[25]<<8)+(bytes[26]<<16);height=1+bytes[27]+(bytes[28]<<8)+(bytes[29]<<16)}else if(kind==='VP8 '&&bytes[23]===157&&bytes[24]===1&&bytes[25]===42){width=v.getUint16(26,true)&16383;height=v.getUint16(28,true)&16383}else if(kind==='VP8L'&&bytes[20]===47){const bits=v.getUint32(21,true);width=1+(bits&16383);height=1+((bits>>>14)&16383)}}
 check(width>0&&height>0&&width<=12000&&height<=12000&&width*height<=40000000,'Invalid image dimensions or image exceeds 40 megapixels');return {width,height};
}
