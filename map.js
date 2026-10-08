import{escapeHTML as esc}from'./core.js';
const points={대전:[127.435,36.332],광명:[126.884,37.416],인천:[126.45,37.46],헬싱키:[24.97,60.32],부다페스트:[19.08,47.50],빈:[16.38,48.19],린츠:[14.29,48.29],프라하:[14.44,50.08],드레스덴:[13.73,51.04]};
const label=s=>s.replace(/\s*공항.*$/,'').trim();
const vehicleArt=kind=>kind==='flight'?`<g class="vehicle-art plane"><path d="M40 0Q35 -5 16 -4L-2 -5L-20 -29L-28 -29L-18 -4L-32 -3L-40 -13L-45 -13L-41 0L-45 13L-40 13L-32 3L-18 4L-28 29L-20 29L-2 5L16 4Q35 5 40 0Z" fill="#fff" stroke="#274e65" stroke-width="1.8"/><path d="M22 -3L28 -2L28 2L22 3" fill="#315c77"/><path d="M-31 0H20" stroke="#749ab4" stroke-width="2"/><path d="M-8 -14H2M-8 14H2" stroke="#274e65" stroke-width="4" stroke-linecap="round"/></g>`:kind==='bus'?`<g class="vehicle-art bus"><path d="M-34 -14H24Q33 -14 35 -5V12H-34Z" fill="#fffaf0" stroke="#40544c" stroke-width="2"/><path d="M-32 4H33V10H-32Z" fill="#9877b0"/><path d="M-27 -10H16V0H-27Z M21 -10H27L31 -2H21Z" fill="#375563"/><path d="M-14 -10V0M0 -10V0M20 1V10" stroke="#fffaf0" stroke-width="2"/><circle cx="-22" cy="13" r="5" fill="#263d3b"/><circle cx="23" cy="13" r="5" fill="#263d3b"/><circle cx="-22" cy="13" r="2" fill="#afbbb5"/><circle cx="23" cy="13" r="2" fill="#afbbb5"/></g>`:`<g class="vehicle-art train"><path d="M-62 -12H22Q39 -12 54 -1Q62 4 58 9H-62Z" fill="#f8fafb" stroke="#2b4d63" stroke-width="2"/><path d="M-61 3H52L59 7H-61Z" fill="#246897"/><path d="M23 -9Q35 -8 45 -1H22Z" fill="#244555"/><path d="M-54 -7H-44V-1H-54Z M-37 -7H-27V-1H-37Z M-20 -7H-10V-1H-20Z M-3 -7H7V-1H-3Z" fill="#34596e"/><path d="M-24 -12V9M13 -12V9" stroke="#8aa3b3" stroke-width="1"/><path d="M-55 12H-40M-12 12H3M30 12H43" stroke="#263e4a" stroke-width="4" stroke-linecap="round"/></g>`;
let geography,paused=false,frame=0,lastTime=0,elapsed=0;
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
// Only the outer SVG group moves. Artwork stays upright on land routes.
function animateVehicle(host,kind){
  const path=host.querySelector('#active-route'),marker=host.querySelector('.map-vehicle');
  const art=marker.querySelector('.vehicle-direction'),length=path.getTotalLength();
  const duration=kind==='flight'?10000:8500;
  const place=()=>{
    const progress=(elapsed%duration)/duration;
    const p=path.getPointAtLength(progress*length);
    const q=path.getPointAtLength(Math.min(length,progress*length+1));
    const previous=path.getPointAtLength(Math.max(0,progress*length-1));
    const dx=q.x-previous.x,dy=q.y-previous.y;
    marker.setAttribute('transform',`translate(${p.x} ${p.y})`);
    art.setAttribute('transform',kind==='flight'?`rotate(${Math.atan2(dy,dx)*180/Math.PI})`:`scale(${dx<0?-1:1} 1)`);
  };
  const tick=time=>{
    if(lastTime && !paused && !document.hidden)elapsed+=Math.min(time-lastTime,80);
    lastTime=time;place();
    if(!paused&&!reducedMotion.matches&&!document.hidden)frame=requestAnimationFrame(tick);
  };
  const resume=()=>{cancelAnimationFrame(frame);lastTime=0;place();if(!paused&&!reducedMotion.matches&&!document.hidden)frame=requestAnimationFrame(tick);};
  place();resume();return resume;
}
let resumeMotion=()=>{};
export async function setupMap(data){const host=document.querySelector('#travel-map');if(!host)return;const segments=data.transport.map(t=>({...t,from:label(t.name.split('→')[0]),to:label(t.name.split('→')[1]||'')})).filter(t=>points[t.from]&&points[t.to]);
const select=document.querySelector('#map-segment');select.innerHTML=segments.map((s,i)=>`<option value="${i}">${s.date?s.date.slice(5).replace('-','/')+' · ':''}${esc(s.from)} → ${esc(s.to)} · ${s.kind==='flight'?'비행기':s.kind==='bus'?'버스':'기차'}</option>`).join('');
try{geography=await(await fetch('./assets/world.json')).json();}catch{geography={features:[]};}
function render(){cancelAnimationFrame(frame);elapsed=0;lastTime=0;const s=segments[Number(select.value)||0],world=s.kind==='flight',domestic=['대전','광명'].includes(s.from),vehicle=world?'비행기':s.kind==='bus'?'버스':'기차',b=world?[-15,143,20,73]:domestic?[125.8,128.2,35.9,38.0]:[7,24,43.5,54],w=1000,h=world?400:460;const xy=([lon,lat])=>[(lon-b[0])/(b[1]-b[0])*w,(b[3]-lat)/(b[3]-b[2])*h];const land=geography.features.map(f=>{const polys=f.geometry.type==='MultiPolygon'?f.geometry.coordinates:[f.geometry.coordinates];return polys.map(poly=>poly.map(ring=>{let path='';ring.forEach((p,i)=>{const [x,y]=xy(p);path+=(i===0||Math.abs(p[0]-ring[i-1][0])>180?'M':'L')+x.toFixed(1)+','+y.toFixed(1);});return path+'Z';}).join('')).join('');}).join('');const a=xy(points[s.from]),z=xy(points[s.to]);const mx=(a[0]+z[0])/2,my=(a[1]+z[1])/2-(world?90:20);const route=`M${a.join(',')} Q${mx},${my} ${z.join(',')}`;const stations=Object.entries(points).filter(([name])=>world?['인천','헬싱키','부다페스트','프라하'].includes(name):domestic?['대전','광명','인천'].includes(name):!['인천','헬싱키','대전','광명'].includes(name));const labels=stations.map(([name,p])=>{const [x,y]=xy(p),active=name===s.from||name===s.to;return`<g class="map-station ${active?'selected':''}"><circle cx="${x}" cy="${y}" r="${active?6:3}"/><text x="${x+(name==='인천'?-12:12)}" y="${y+(name==='빈'?20:-12)}" text-anchor="${name==='인천'?'end':'start'}">${name}</text></g>`;}).join('');
host.innerHTML=`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(s.from)}에서 ${esc(s.to)}까지 ${vehicle} 이동 경로"><defs><pattern id="map-grid" width="70" height="70" patternUnits="userSpaceOnUse"><path d="M70 0H0V70" fill="none" stroke="#cddfeb" stroke-width=".5"/></pattern></defs><rect width="${w}" height="${h}" fill="#eaf4fc"/><rect width="${w}" height="${h}" fill="url(#map-grid)"/><path d="${land}" fill="#fffaf5" stroke="#c9d7e2" stroke-width=".8"/><path id="active-route" d="${route}" class="map-route-shadow"/><path d="${route}" class="map-route ${world?'air':'rail'}"/>${labels}<g class="map-vehicle" aria-hidden="true"><g class="vehicle-direction"><g class="vehicle-size">${vehicleArt(s.kind)}</g></g></g></svg>`;
document.querySelector('#map-mode').textContent=world?'KOREA → EUROPE':domestic?'KOREA · 공항으로':'CENTRAL EUROPE';document.querySelector('#map-caption').innerHTML=`<strong>${esc(s.from)} <span>→</span> ${esc(s.to)}</strong><span>${esc(s.code)}${s.depart?' · '+esc(s.depart)+' 출발 / '+esc(s.arrive)+' 도착':''}</span>`;resumeMotion=animateVehicle(host,s.kind);document.querySelector('#map-pause').textContent=reducedMotion.matches?'동작 줄임':paused?'재생':'일시정지';}
select.addEventListener('change',render);document.addEventListener('visibilitychange',()=>resumeMotion());reducedMotion.addEventListener('change',()=>{resumeMotion();document.querySelector('#map-pause').disabled=reducedMotion.matches;document.querySelector('#map-pause').textContent=reducedMotion.matches?'동작 줄임':paused?'재생':'일시정지';});document.querySelector('#map-pause').disabled=reducedMotion.matches;document.querySelector('#map-pause').addEventListener('click',()=>{if(reducedMotion.matches)return;paused=!paused;resumeMotion();document.querySelector('#map-pause').textContent=paused?'재생':'일시정지';});document.addEventListener('trip-day-selected',e=>{const i=segments.findIndex(t=>t.date===e.detail);if(i>=0){select.value=String(i);render();}});render();}
