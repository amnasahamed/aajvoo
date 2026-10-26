export function validDate(s){if(typeof s!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s))return false;const [y,m,d]=s.split('-').map(Number),date=new Date(s+'T12:00:00');return date.getFullYear()===y&&date.getMonth()===m-1&&date.getDate()===d;}
export const validTime=s=>typeof s==='string'&&/^([01]\d|2[0-3]):[0-5]\d$/.test(s);
const escape=s=>String(s).replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
// RFC 5545 folding counts UTF-8 octets, without splitting a code point.
const fold=line=>{const encoder=new TextEncoder();let out='',length=0;for(const char of line){const bytes=encoder.encode(char).length;if(length+bytes>75){out+='\r\n ';length=1;}out+=char;length+=bytes;}return out;};
export function calendarText(event,location,isSample=false){
 if(!validDate(event.date)||!validTime(event.time))throw new Error('Enter a valid event date and time.');
 const uid=crypto.randomUUID?.()||Array.from(crypto.getRandomValues(new Uint32Array(4))).map(n=>n.toString(16)).join('-');
 return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Vow & Verse//Wedding Collection//EN','BEGIN:VEVENT',`UID:${uid}@vow-and-verse.local`,`DTSTAMP:${new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'')}`,`DTSTART:${event.date.replaceAll('-','')}T${event.time.replace(':','')}00`,`SUMMARY:${escape((isSample?'Sample celebration — ':'')+event.title)}`,`LOCATION:${escape(event.venue+', '+location)}`,`DESCRIPTION:${escape((isSample?'Fictional demonstration; not a real event or booking. ':'')+event.note+'. Venue local time; confirm timezone with hosts.')}`,'END:VEVENT','END:VCALENDAR'].map(fold).join('\r\n')+'\r\n';
}
