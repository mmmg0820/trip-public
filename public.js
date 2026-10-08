import {escapeHTML as esc, searchRecommendations, publicRoute} from './core.js?v=12';
import {setupMap} from './map.js?v=12';
const data=window.TRIP_DATA;
const search=document.querySelector('#trip-search');
let filter='all';
function render(){
 const rows=searchRecommendations(data.recommendations,search.value,filter);
 document.querySelector('#recommendation-list').innerHTML=rows.map(r=>`<article class="taste-card"><p class="eyebrow">${esc(r.city)} · ${r.type==='wine'?'와인':'식당·카페'}</p><h3>${esc(r.name)}</h3><p>${esc(r.description)}</p><p>${esc(r.address)}<br>${esc(r.budget)}</p><small>${esc(r.check)}</small><a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">공식 사이트 ↗</a></article>`).join('')||'<p>검색 결과가 없어요. 다른 도시나 장소를 입력해 주세요.</p>';
 document.querySelector('#search-results').textContent=`공개 추천 ${rows.length}곳`;
}
search.addEventListener('input',render);
document.querySelectorAll('[data-query]').forEach(b=>b.addEventListener('click',()=>{search.value=b.dataset.query;render();search.focus();}));
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});render();}));
document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{location.hash=b.dataset.tab;document.getElementById(b.dataset.tab)?.scrollIntoView();if(b.dataset.tab==='quick')search.focus({preventScroll:true});}));
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();search.focus();search.scrollIntoView({block:'center'});}});
document.querySelector('#source-links').innerHTML=data.sources.map(s=>`<p><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a></p>`).join('');
const install=document.querySelector('#install-dialog');
document.querySelector('#show-install').addEventListener('click',()=>{if(!install.open)install.showModal();});
document.querySelector('#close-install').addEventListener('click',()=>install.close());
function route(){
 if(publicRoute(location.hash)!==location.hash){history.replaceState(null,'',location.pathname+location.search+'#quick');document.querySelector('#quick').scrollIntoView();}
 const selected=location.hash==='#taste'?'taste':'quick';
 document.querySelectorAll('.tabs [data-tab]').forEach(b=>{
  const active=b.dataset.tab===selected;b.classList.toggle('active',active);
  if(active)b.setAttribute('aria-current','location');else b.removeAttribute('aria-current');
 });
}
window.addEventListener('hashchange',route);route();render();
setupMap(data).catch(()=>{document.querySelector('#map-caption').textContent='지도를 불러오지 못했어요. 잠시 후 새로고침해 주세요.';});
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{document.querySelector('#offline-status').textContent='오프라인 저장을 사용할 수 없어요. 온라인에서 가이드를 확인해 주세요.';});
