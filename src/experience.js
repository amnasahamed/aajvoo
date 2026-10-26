// Local, bounded invitation motion. Every observer/listener belongs to this mount.
let motionPaused = false; // Current tab only; no storage or tracking.
export function mountExperience(root, id) {
  const abort = new AbortController(), signal = abort.signal;
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  let raf = 0, disposed = false;
  const observers = [], cover = root.querySelector('.crafted-cover');
  const canvas = root.querySelector('.date-scratch'), button = root.querySelector('.date-foil');
  const section = button?.closest('.date-keepsake');
  let revealed = false, activePointer = null, previous = null, distance = 0;
  const revealDate = () => {
    if (revealed) return;
    const hadFocus = document.activeElement === button;
    revealed = true;
    if (canvas) { canvas.hidden = true; canvas.style.touchAction = 'pan-y'; }
    if (button) { button.setAttribute('aria-expanded','true'); button.textContent = 'Date revealed'; button.disabled = true; button.tabIndex = -1; button.hidden = true; }
    section?.classList.add('date-revealed');
    if (section) { const message=section.querySelector('.date-message'); message.textContent = 'We cannot wait to celebrate with you.'; message.tabIndex=-1; if(hadFocus)message.focus({preventScroll:true}); }
  };
  if (button) button.addEventListener('click', revealDate, {signal});
  let ctx, size = 220;
  const paint = () => {
    if (!canvas || revealed || media.matches) return;
    size = canvas.clientWidth;
    const h = canvas.clientHeight, ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(size*ratio); canvas.height = Math.round(h*ratio);
    ctx = canvas.getContext('2d', {willReadFrequently:true});
    ctx.scale(ratio,ratio); const gradient = ctx.createLinearGradient(0,0,size,h);
    const palette = ({courtyard:['#d7dcb6','#95a279','#edf0d6','#40513c'],letters:['#d4e0dc','#8da7a3','#e8eeeb','#34545a'],herbarium:['#f0d2d4','#c58e9c','#f6e4dc','#723b51'],moon:['#d9c995','#a58f50','#f2e5b7','#213c32'],tapestry:['#f5cd79','#d79648','#f9e0a3','#712442'],silk:['#e7b7c9','#ad547e','#f1d7db','#6f2149']})[id] || ['#e3c48a','#b38b53','#eddbb6','#543e31'];
    gradient.addColorStop(0,palette[0]); gradient.addColorStop(.48,palette[1]); gradient.addColorStop(1,palette[2]);
    ctx.fillStyle=gradient;ctx.fillRect(0,0,size,h);
    ctx.strokeStyle='#fff8e666';ctx.lineWidth=1;
    if(['tapestry','silk'].includes(id))ctx.setLineDash([3,4]);
    for(let y=12;y<h;y+=16){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(size,y-size*.25);ctx.stroke();}
    ctx.setLineDash([]);ctx.fillStyle=palette[3];ctx.textAlign='center';ctx.font='italic 48px Georgia';ctx.fillText(canvas.dataset.initials,size/2,h*.48);
    ctx.font='11px sans-serif';ctx.fillText('SCRATCH OR TAP',size/2,h*.67);
  };
  if (canvas) {
    paint();
    const point = e => {const r=canvas.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top}};
    const erase = (a,b) => {if(!ctx)return;ctx.globalCompositeOperation='destination-out';ctx.lineWidth=38;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();ctx.globalCompositeOperation='source-over'};
    canvas.addEventListener('pointerdown',e=>{if(revealed||media.matches||activePointer!==null||e.button!==0)return;activePointer=e.pointerId;previous=point(e);distance=0;canvas.setPointerCapture(e.pointerId);erase(previous,previous);},{signal});
    canvas.addEventListener('pointermove',e=>{if(e.pointerId!==activePointer)return;const next=point(e);distance+=Math.hypot(next.x-previous.x,next.y-previous.y);erase(previous,next);previous=next;},{signal});
    const finish = (e,cancelled=false) => {if(e.pointerId!==activePointer)return;activePointer=null;if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);if(cancelled)return;
      if(distance<8){revealDate();return;}
      const data=ctx.getImageData(0,0,canvas.width,canvas.height).data;let clear=0,total=0;for(let i=3;i<data.length;i+=64){total++;if(data[i]<100)clear++;}if(clear/total>.32)revealDate();
    };
    canvas.addEventListener('pointerup',e=>finish(e),{signal});canvas.addEventListener('pointercancel',e=>finish(e,true),{signal});canvas.addEventListener('lostpointercapture',()=>{activePointer=null},{signal});
  }
  const controls=document.createElement('div');controls.className='motion-controls';
  const toggle=document.createElement('button');toggle.type='button';toggle.className='motion-toggle';controls.append(toggle);if(cover)cover.after(controls);else root.prepend(controls);
  const sections=[...root.querySelectorAll('.page-content > section,.page-content > aside')];
  if (cover) {
    const kind = ['courtyard','letters','herbarium'].includes(id)?'petal':['dawn','lake','moon','temple'].includes(id)?'glint':['tapestry','silk'].includes(id)?'thread':null;
    if(kind){const layer=document.createElement('div');layer.className='ambient ambient-'+kind;layer.setAttribute('aria-hidden','true');layer.innerHTML=Array.from({length:5},(_,i)=>`<i style="--left:${i%2?91-i:4+i}%;--top:${14+i*16}%;--delay:${-i*2.7}s;--duration:${10+i*2}s"></i>`).join('');cover.append(layer);}
    const io=new IntersectionObserver(([e])=>{cover.classList.toggle('motion-active',e.isIntersecting&&!document.hidden&&!media.matches&&!motionPaused);},{threshold:0});io.observe(cover);observers.push(io);
  }
  const updateDepth=()=>{raf=0;if(disposed||media.matches||motionPaused||document.hidden||!cover)return;const rect=cover.getBoundingClientRect();if(rect.bottom<0||rect.top>innerHeight)return;cover.style.setProperty('--scene-depth',`${Math.max(-9,Math.min(9,-rect.top*.025))}px`);};
  const schedule=()=>{if(!raf&&!media.matches&&!motionPaused&&!document.hidden)raf=requestAnimationFrame(updateDepth)};
  window.addEventListener('scroll',schedule,{passive:true,signal});window.addEventListener('resize',schedule,{passive:true,signal});
  const scrollObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('section-seen');scrollObserver.unobserve(e.target)}}),{threshold:.08});observers.push(scrollObserver);
  if(!media.matches)sections.forEach(e=>{if(e.getBoundingClientRect().top>innerHeight){e.classList.add('section-arriving');scrollObserver.observe(e)}});
  const preferences=()=>{
    const stopped=media.matches||motionPaused;
    root.classList.toggle('motion-reduced',media.matches);root.classList.toggle('motion-user-paused',motionPaused);
    toggle.disabled=media.matches;toggle.textContent=media.matches?'Motion reduced':motionPaused?'Resume motion':'Pause motion';toggle.setAttribute('aria-pressed',String(stopped));
    toggle.title=media.matches?'Your device reduced-motion preference is respected':'Pause or resume decorative motion';
    if(media.matches)revealDate();
    if(stopped){cancelAnimationFrame(raf);raf=0;sections.forEach(e=>e.classList.add('section-seen'));cover?.style.removeProperty('--scene-depth');cover?.classList.remove('motion-active');}
    else {if(cover){const r=cover.getBoundingClientRect();cover.classList.toggle('motion-active',r.bottom>0&&r.top<innerHeight&&!document.hidden);}schedule();}
  };
  toggle.addEventListener('click',()=>{if(media.matches)return;motionPaused=!motionPaused;preferences();},{signal});
  media.addEventListener('change',preferences,{signal});preferences();schedule();
  document.addEventListener('visibilitychange',()=>{root.classList.toggle('motion-paused',document.hidden);if(document.hidden&&raf){cancelAnimationFrame(raf);raf=0;}else schedule();},{signal});
  return ()=>{disposed=true;abort.abort();observers.forEach(o=>o.disconnect());cancelAnimationFrame(raf);root.querySelectorAll('.ambient').forEach(e=>e.remove());controls.remove();};
}
