const CACHE='trip-public-guide-v9';
const FILES=['./','./index.html','./style.css','./public.js','./map.js','./core.js','./data.js','./assets/world.json','./assets/budapest.jpg','./assets/favicon.svg','./manifest.webmanifest','./assets/icon-180.png','./assets/icon-192.png','./assets/icon-512.png'];
const allowed=new Set(FILES.map(f=>new URL(f,self.registration.scope).href));
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE&&(k.startsWith('honeymoon-')||k.startsWith('trip-public-')||k.startsWith('public-trip-'))).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET'||!allowed.has(e.request.url))return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok&&r.type!=='opaque'){const copy=r.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(e.request,copy)));}return r;}).catch(async()=>await caches.match(e.request)||new Response('Offline',{status:503})));
});
