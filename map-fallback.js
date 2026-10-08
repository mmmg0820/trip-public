import{escapeHTML as esc,routeVehicleTransform,routeBounds}from'./core.js?v=15';
const points={대전:[127.435,36.332],광명:[126.884,37.416],인천:[126.45,37.46],헬싱키:[24.97,60.32],부다페스트:[19.08,47.50],빈:[16.38,48.19],린츠:[14.29,48.29],프라하:[14.44,50.08],드레스덴:[13.73,51.04]};
const label=s=>s.replace(/\s*공항.*$/,'').trim();
const vehicleArt=kind=>kind==='flight'?`<g class="vehicle-art plane"><path d="M40 0Q35 -5 16 -4L-2 -5L-20 -29L-28 -29L-18 -4L-32 -3L-40 -13L-45 -13L-41 0L-45 13L-40 13L-32 3L-18 4L-28 29L-20 29L-2 5L16 4Q35 5 40 0Z" fill="#fff" stroke="#274e65" stroke-width="1.8"/><path d="M22 -3L28 -2L28 2L22 3" fill="#315c77"/><path d="M-31 0H20" stroke="#749ab4" stroke-width="2"/><path d="M-8 -14H2M-8 14H2" stroke="#274e65" stroke-width="4" stroke-linecap="round"/></g>`:kind==='bus'?`<g class="vehicle-art bus"><path d="M-34 -14H24Q33 -14 35 -5V12H-34Z" fill="#fffaf0" stroke="#40544c" stroke-width="2"/><path d="M-32 4H33V10H-32Z" fill="#9877b0"/><path d="M-27 -10H16V0H-27Z M21 -10H27L31 -2H21Z" fill="#375563"/><path d="M-14 -10V0M0 -10V0M20 1V10" stroke="#fffaf0" stroke-width="2"/><circle cx="-22" cy="13" r="5" fill="#263d3b"/><circle cx="23" cy="13" r="5" fill="#263d3b"/><circle cx="-22" cy="13" r="2" fill="#afbbb5"/><circle cx="23" cy="13" r="2" fill="#afbbb5"/></g>`:`<g class="vehicle-art train"><path d="M-62 -12H22Q39 -12 54 -1Q62 4 58 9H-62Z" fill="#f8fafb" stroke="#2b4d63" stroke-width="2"/><path d="M-61 3H52L59 7H-61Z" fill="#246897"/><path d="M23 -9Q35 -8 45 -1H22Z" fill="#244555"/><path d="M-54 -7H-44V-1H-54Z M-37 -7H-27V-1H-37Z M-20 -7H-10V-1H-20Z M-3 -7H7V-1H-3Z" fill="#34596e"/><path d="M-24 -12V9M13 -12V9" stroke="#8aa3b3" stroke-width="1"/><path d="M-55 12H-40M-12 12H3M30 12H43" stroke="#263e4a" stroke-width="4" stroke-linecap="round"/></g>`;
let geography,paused=false,frame=0,lastTime=0,elapsed=0;
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
function animateVehicle(host,kind){
 const path=host.querySelector('#active-route'),marker=host.querySelector('.map-vehicle');
 const art=marker.querySelector('.vehicle-direction'),length=path.getTotalLength(),duration=kind==='flight'?10000:8500;
 const place=()=>{
  const distance=(elapsed%duration)/duration*length;
  const p=path.getPointAtLength(distance),q=path.getPointAtLength(Math.min(length,distance+1)),before=path.getPointAtLength(Math.max(0,distance-1));
  marker.setAttribute('transform',`translate(${p.x} ${p.y})`);
  art.setAttribute('transform',routeVehicleTransform(kind,q.x-before.x,q.y-before.y));
 };
 const tick=time=>{
  if(lastTime&&!paused&&!document.hidden)elapsed+=Math.min(time-lastTime,80);
  lastTime=time;place();
  if(!paused&&!reducedMotion.matches&&!document.hidden)frame=requestAnimationFrame(tick);
 };
 const resume=()=>{cancelAnimationFrame(frame);lastTime=0;place();if(!paused&&!reducedMotion.matches&&!document.hidden)frame=requestAnimationFrame(tick);};
 resume();return resume;
}
let resumeMotion=()=>{},diagramController; export function disposeDiagram(){diagramController?.abort();cancelAnimationFrame(frame);resumeMotion=()=>{};}
export async function setupMap(data){ disposeDiagram();diagramController=new AbortController();const signal=diagramController.signal;
 const host=document.querySelector('#travel-map');if(!host)return;
 const segments=data.transport.map(t=>({...t,from:label(t.name.split('→')[0]),to:label(t.name.split('→')[1]||''),fromLabel:t.name.split('→')[0].trim(),toLabel:(t.name.split('→')[1]||'').trim()})).filter(t=>points[t.from]&&points[t.to]);
 const select=document.querySelector('#map-segment'),pause=document.querySelector('#map-pause'),overview=document.querySelector('#map-overview');
 let wide=false;
 select.innerHTML=segments.map((s,i)=>`<option value="${i}">${esc(s.fromLabel)} → ${esc(s.toLabel)} · ${s.code.startsWith('KTX')?'KTX':s.code.startsWith('공항버스')?'공항버스':s.kind==='flight'?'비행기':s.kind==='bus'?'버스':'기차'}</option>`).join('');
 try{geography=await(await fetch('./assets/world.json')).json();}catch{geography={features:[]};}
 function render(reset=true){
  cancelAnimationFrame(frame);if(reset)elapsed=0;lastTime=0;
  const s=segments[Number(select.value)||0],world=s.kind==='flight',domestic=['대전','광명'].includes(s.from);
  const vehicle=world?'비행기':s.kind==='bus'?'버스':'기차',w=1000,h=650;
  const b=wide?(world?[-15,143,20,73]:domestic?[125.5,129,35.4,38.4]:[10,28,44,62]):routeBounds(points[s.from],points[s.to],w,h);
  const xy=([lon,lat])=>[(lon-b[0])/(b[1]-b[0])*w,(b[3]-lat)/(b[3]-b[2])*h];
  const land=geography.features.map(f=>{
   const polys=f.geometry.type==='MultiPolygon'?f.geometry.coordinates:[f.geometry.coordinates];
   return polys.map(poly=>poly.map(ring=>{let path='';ring.forEach((p,i)=>{const [x,y]=xy(p);path+=(i===0||Math.abs(p[0]-ring[i-1][0])>180?'M':'L')+x.toFixed(1)+','+y.toFixed(1);});return path+'Z';}).join('')).join('');
  }).join('');
  const a=xy(points[s.from]),z=xy(points[s.to]),dx=z[0]-a[0],dy=z[1]-a[1],length=Math.hypot(dx,dy);
  const bend=Math.min(world?90:60,length*.18),mx=(a[0]+z[0])/2+dy/length*bend,my=(a[1]+z[1])/2-dx/length*bend;
  const route=`M${a.join(',')} Q${mx},${my} ${z.join(',')}`;
  const stations=Object.entries(points).filter(([name,p])=>{
   if(!wide)return name===s.from||name===s.to;
   return p[0]>b[0]&&p[0]<b[1]&&p[1]>b[2]&&p[1]<b[3];
  });
  const labels=stations.map(([name,p])=>{
   const [x,y]=xy(p),active=name===s.from||name===s.to,right=x<w/2;
   return `<g class="map-station ${active?'selected':''}"><circle cx="${x}" cy="${y}" r="${active?9:4}"/><text x="${x+(right?18:-18)}" y="${y+48}" text-anchor="${right?'start':'end'}">${esc(name===s.from?s.fromLabel:name===s.to?s.toLabel:name)}</text></g>`;
  }).join('');
  host.innerHTML=`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(s.fromLabel)}에서 ${esc(s.toLabel)}까지 ${vehicle} ${wide?'주변 지역':'확대'} 이동 경로"><defs><pattern id="map-grid" width="70" height="70" patternUnits="userSpaceOnUse"><path d="M70 0H0V70" fill="none" stroke="#cddfeb" stroke-width=".5"/></pattern></defs><rect width="${w}" height="${h}" fill="#eaf4fc"/><rect width="${w}" height="${h}" fill="url(#map-grid)"/><path d="${land}" fill="#fffaf5" stroke="#c9d7e2" stroke-width="1.4"/><path id="active-route" d="${route}" class="map-route-shadow"/><path d="${route}" class="map-route ${world?'air':'rail'}"/>${labels}<g class="map-vehicle" aria-hidden="true"><g class="vehicle-direction"><g class="vehicle-size">${vehicleArt(s.kind)}</g></g></g></svg>`;
  document.querySelector('#map-mode').textContent=domestic?'KOREA · 공항으로':world&&Math.abs(points[s.from][0]-points[s.to][0])>40?(s.from==='인천'?'KOREA → EUROPE':'EUROPE → KOREA'):'EUROPE · 도시 이동';
  document.querySelector('#map-caption').innerHTML=`<strong>${esc(s.fromLabel)} <span>→</span> ${esc(s.toLabel)}</strong><span>${esc(s.code)} · ${wide?'주변 지역':'구간 확대'}</span>`;
  if(overview){overview.textContent=wide?'구간 확대 보기':'주변 지역 보기';overview.setAttribute('aria-pressed',String(wide));}
  resumeMotion=animateVehicle(host,s.kind);pause.textContent=reducedMotion.matches?'동작 줄임':paused?'재생':'일시정지';
 }
 select.addEventListener('change',()=>{wide=false;render();},{signal});
 overview?.addEventListener('click',()=>{wide=!wide;render(false);},{signal});
 document.addEventListener('visibilitychange',()=>resumeMotion(),{signal});
 reducedMotion.addEventListener('change',()=>{resumeMotion();pause.disabled=reducedMotion.matches;pause.textContent=reducedMotion.matches?'동작 줄임':paused?'재생':'일시정지';},{signal});
 pause.disabled=reducedMotion.matches;
 pause.addEventListener('click',()=>{if(reducedMotion.matches)return;paused=!paused;resumeMotion();pause.textContent=paused?'재생':'일시정지';},{signal});
 render();
}export function setDiagramPaused(value){paused=value;} export function isDiagramPaused(){return paused;}
