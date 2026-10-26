// Decorative, non-interactive planes. The existing full scene remains the distant plane.
const raster={courtyard:'lotus-foreground',letters:'meadow-foreground',lake:'lotus-foreground'};
const image=(file,cls='')=>`<img class="${cls}" src="/images/layers/${file}" alt="" aria-hidden="true" loading="lazy" decoding="async" draggable="false">`;
export function renderSceneLayers(id){
 const foreground=raster[id]?image(raster[id]+'.webp','plane-botanical'):image(id+'-near.svg','plane-ornament');
 return `<div class="scene-plane scene-plane-mid" aria-hidden="true">${image(id+'-mid.svg')}</div><div class="scene-plane scene-plane-near" aria-hidden="true">${foreground}</div>`;
}
export function renderInteriorLayer(id){
 const file=['dawn','temple'].includes(id)?'jasmine-corners.webp':(raster[id]||id==='velvet')?id+'-mid.svg':id+'-near.svg';
 return `<div class="interior-relief relief-${id}" aria-hidden="true">${image(file)}</div>`;
}
