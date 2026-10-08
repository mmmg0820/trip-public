export function escapeHTML(value) {return String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
export function searchRecommendations(rows,query='',filter='all'){const term=query.trim().toLocaleLowerCase();return rows.filter(r=>(filter==='all'||r.type===filter)&&`${r.city} ${r.name} ${r.address} ${r.description} ${r.type==='wine'?'와인':'식당 카페'}`.toLocaleLowerCase().includes(term));}
export function publicRoute(hash){return ['#vault','#bookings','#journey'].includes(hash.split('?')[0])?'#quick':hash;}
