// Each section has its own distant drawing and independently moving foreground.
// The artwork lives in reserved space; essential guest text never moves with it.
const kinds={programme:'programme',story:'story',notes:'notes',rsvp:'reply',end:'end'};
const paintedBotanicals={courtyard:'lotus-foreground.webp',lake:'lotus-foreground.webp',letters:'meadow-foreground.webp',dawn:'jasmine-corners.webp',temple:'jasmine-corners.webp'};
export function sectionScene(id,kind){
 if((id==='letters'&&kind==='story'))return '';
 const raster=paintedBotanicals[id];
 const vista=['courtyard','lake','dawn','temple'].includes(id)&&['programme','end'].includes(kind);
 const nearRaster=['courtyard','lake'].includes(id)&&['programme','end'].includes(kind);
 return `<div class="section-scene scene-${kind}" data-composition="${kind}" aria-hidden="true"><img class="section-plane section-plane-far ${vista?'painted-vista':''}" src="/images/interiors/${vista?id+'-painted-vista.webp':id+'-'+kind+'-far.svg'}" alt="" width="480" height="180" loading="lazy" decoding="async" draggable="false"><img class="section-plane section-plane-near ${nearRaster?'painted-near':''}" src="${nearRaster?'/images/layers/lotus-foreground.webp':'/images/interiors/'+id+'-'+kind+'-near.svg'}" alt="" width="480" height="180" loading="lazy" decoding="async" draggable="false">${raster&&!nearRaster&&['programme','end'].includes(kind)?`<img class="section-plane section-plane-botanical botanical-${id}" src="/images/layers/${raster}" alt="" loading="lazy" decoding="async" draggable="false">`:''}</div>`;
}
export function composeInteriors(id,body){
 return body.replace(/<(section|footer)\b([^>]*data-section="(programme|story|notes|end)"[^>]*)>/g,(_match,tag,attrs,kind)=>`<${tag}${attrs}>${sectionScene(id,kinds[kind])}`).replace('<form id="rsvp-form">',()=>'<form id="rsvp-form">'+sectionScene(id,'reply'));
}
