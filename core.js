export function escapeHTML(value) {return String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
export function searchRecommendations(rows,query='',filter='all'){const term=query.trim().toLocaleLowerCase();return rows.filter(r=>(filter==='all'||r.type===filter)&&`${r.city} ${r.name} ${r.address} ${r.description} ${r.type==='wine'?'와인':'식당 카페'}`.toLocaleLowerCase().includes(term));}
export function publicRoute(hash){return ['#vault','#bookings','#journey'].includes(hash.split('?')[0])?'#quick':hash;}

// Follow the tangent, reflecting leftbound land vehicles without turning them upside down.
export function routeVehicleTransform(kind,dx,dy){
 const angle=Math.atan2(dy,dx)*180/Math.PI;
 if(kind==='flight')return `rotate(${angle})`;
 const left=dx<0,tilt=left?angle+(angle>0?-180:180):angle;
 return `rotate(${tilt}) scale(${left?-1:1} 1)`;
}
export function routeBounds(from,to,width=1000,height=650){
 const lon=(from[0]+to[0])/2,lat=(from[1]+to[1])/2;
 const ratio=width/height/Math.cos(lat*Math.PI/180);
 let latSpan=Math.max(Math.abs(from[1]-to[1])*1.7,.4);
 let lonSpan=Math.max(Math.abs(from[0]-to[0])*1.7,.5);
 latSpan=Math.max(latSpan,lonSpan/ratio);lonSpan=latSpan*ratio;
 return [lon-lonSpan/2,lon+lonSpan/2,lat-latSpan/2,lat+latSpan/2];
}
