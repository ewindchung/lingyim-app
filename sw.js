const CACHE='lingyim-v4-1-fixed-20260802';
const FILES=['./','./index.html','./manifest.json','./page_times.json','./icon-192.png','./icon-512.png','./lingyim.mp3'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',e=>e.respondWith(fetch(e.request).then(r=>{const clone=r.clone();caches.open(CACHE).then(c=>c.put(e.request,clone));return r;}).catch(()=>caches.match(e.request))));
