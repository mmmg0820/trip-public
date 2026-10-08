import './assets/vendor/leaflet.js';
import {escapeHTML as esc,routeVehicleTransform} from './core.js?v=16';
import {vehicleArt} from './vehicle-art.js?v=16';
import {setupMap as setupDiagram,disposeDiagram,setDiagramPaused,isDiagramPaused} from './map-fallback.js?v=16';
const points={대전:[36.332,127.435],광명:[37.416,126.884],인천:[37.46,126.45],헬싱키:[60.32,24.97],부다페스트:[47.50,19.08],빈:[48.19,16.38],린츠:[48.29,14.29],프라하:[50.08,14.44],드레스덴:[51.04,13.73],할슈타트:[47.562,13.649]};
const label=s=>s.replace(/\s*공항.*$/,'').trim();
let dispose=()=>{},sharedPaused=false,sharedIndex=0;
export async function setupMap(data,diagram=false){
 dispose();disposeDiagram();
 const host=document.querySelector('#travel-map');if(!host)return;
 const mode=document.querySelector('#map-basemap');
 if(diagram||!globalThis.L){
  mode.textContent='상세 지도';mode.onclick=()=>{sharedPaused=isDiagramPaused();sharedIndex=Number(document.querySelector("#map-segment").value);setupMap(data);};setDiagramPaused(sharedPaused);
  await setupDiagram(data);const diagramSelect=document.querySelector("#map-segment");diagramSelect.value=String(Math.min(sharedIndex,diagramSelect.options.length-1));diagramSelect.dispatchEvent(new Event("change"));dispose=()=>{};return;
 }
 host.replaceChildren();mode.textContent='개략도';mode.onclick=()=>setupMap(data,true);
 const controller=new AbortController(),signal=controller.signal,L=globalThis.L;
 const map=L.map(host,{scrollWheelZoom:true,zoomControl:true,minZoom:2,maxZoom:18,zoomAnimation:false,attributionControl:true});
 L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'}).addTo(map).on('tileerror',()=>{document.querySelector('#map-network-note').textContent='배경 지도 연결을 확인해 주세요. 개략도는 오프라인에서도 볼 수 있어요.';});
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.classList.add('map-svg-overlay');svg.setAttribute('aria-hidden','true');host.append(svg);
 const select=document.querySelector('#map-segment'),pause=document.querySelector('#map-pause'),overview=document.querySelector('#map-overview');
 const segments=data.transport.map(t=>({...t,from:label(t.name.split('→')[0]),to:label(t.name.split('→')[1]||'')})).filter(s=>points[s.from]&&points[s.to]);
 select.innerHTML=segments.map((s,i)=>`<option value="${i}">${esc(s.name)} · ${s.code.startsWith('KTX')?'KTX':s.code.startsWith('공항버스')?'공항버스':s.kind==='flight'?'비행기':s.kind==='bus'?'버스':'기차'}</option>`).join('');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 select.value=String(Math.min(sharedIndex,segments.length-1));
 let elapsed=0,last=0,raf=0,paused=sharedPaused,markers=[],s=segments[0],wide=false,path,vehicle,direction;
 function place(){if(!path)return;const total=path.getTotalLength(),distance=(elapsed%(s.kind==='flight'?10000:8500))/(s.kind==='flight'?10000:8500)*total;const p=path.getPointAtLength(distance),a=path.getPointAtLength(Math.max(0,distance-1)),b=path.getPointAtLength(Math.min(total,distance+1));vehicle.setAttribute('transform',`translate(${p.x} ${p.y})`);direction.setAttribute('transform',routeVehicleTransform(s.kind,b.x-a.x,b.y-a.y));}
 function draw(){
  const size=map.getSize();svg.setAttribute('viewBox',`0 0 ${size.x} ${size.y}`);
  const a=map.latLngToContainerPoint(points[s.from]),b=map.latLngToContainerPoint(points[s.to]),dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy)||1,bend=Math.min(s.kind==='flight'?100:65,len*.18),x=(a.x+b.x)/2+dy/len*bend,y=(a.y+b.y)/2-dx/len*bend;
  const d=`M${a.x},${a.y} Q${x},${y} ${b.x},${b.y}`;
  svg.innerHTML=`<path d="${d}" class="map-route-shadow"/><path id="active-route" d="${d}" class="map-route ${s.kind==='flight'?'air':'rail'}"/><g class="map-vehicle"><g class="vehicle-direction"><g class="vehicle-size">${vehicleArt(s.kind)}</g></g></g>`;
  path=svg.querySelector('#active-route');vehicle=svg.querySelector('.map-vehicle');direction=svg.querySelector('.vehicle-direction');place();
 }
 function tick(now){if(last&&!paused&&!document.hidden)elapsed+=Math.min(now-last,80);last=now;place();raf=requestAnimationFrame(tick);}
 function resume(){cancelAnimationFrame(raf);last=0;place();pause.disabled=reduced.matches;pause.textContent=reduced.matches?'동작 줄임':paused?'재생':'일시정지';if(!paused&&!reduced.matches&&!document.hidden)raf=requestAnimationFrame(tick);}
 function fit(){map.fitBounds(L.latLngBounds(points[s.from],points[s.to]).pad(wide?.8:.25),{padding:[48,64],maxZoom:wide?8:11,animate:false});}
 function selectRoute(){sharedIndex=Number(select.value)||0;s=segments[Number(select.value)||0];elapsed=0;wide=false;markers.forEach(m=>m.remove());markers=[s.from,s.to].map((name,i)=>L.circleMarker(points[name],{radius:7,color:'#fffbf7',weight:3,fillColor:'#1675e8',fillOpacity:1}).addTo(map).bindTooltip(s.name.split('→')[i].trim(),{permanent:true,direction:i?'left':'right',className:'city-tooltip'}));
  document.querySelector('#map-mode').textContent=['대전','광명'].includes(s.from)?'KOREA · 공항으로':s.from==='인천'?'KOREA → EUROPE':s.to==='인천'?'EUROPE → KOREA':'EUROPE · 도시 이동';
  document.querySelector('#map-caption').innerHTML=`<strong>${esc(s.name)}</strong><span>${esc(s.code)}</span>`;overview.textContent='주변 지역 보기';overview.setAttribute('aria-pressed','false');fit();draw();resume();
 }
 map.on('move zoom resize',draw);
 select.addEventListener('change',selectRoute,{signal});
 overview.addEventListener('click',()=>{wide=!wide;overview.textContent=wide?'구간 확대 보기':'주변 지역 보기';overview.setAttribute('aria-pressed',String(wide));fit();},{signal});
 pause.addEventListener('click',()=>{paused=!paused;sharedPaused=paused;resume();},{signal});
 document.addEventListener('visibilitychange',resume,{signal});reduced.addEventListener('change',resume,{signal});
 document.addEventListener('trip-city-selected',e=>{if(points[e.detail]){map.setView(points[e.detail],13,{animate:false});document.querySelector('#map-caption').innerHTML=`<strong>${esc(e.detail)} · 도시 산책 지도</strong><span>+/− 또는 두 손가락으로 확대·축소해요.</span>`;}},{signal});
 document.addEventListener('trip-day-selected',e=>{const i=segments.findIndex(t=>t.date&&t.date===e.detail);if(i>=0){select.value=String(i);selectRoute();}},{signal});
 const observer=new ResizeObserver(()=>map.invalidateSize({pan:false}));observer.observe(host);
 dispose=()=>{controller.abort();observer.disconnect();cancelAnimationFrame(raf);map.off();map.remove();};selectRoute();
}
