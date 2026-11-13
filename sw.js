/* Offline support: the app and its data are cached on first visit, so a kiosk keeps working if the network drops.
   Data files are network-first (fresh edits win when online); everything else is cache-first.
   Street-map tiles are cached only as they are viewed, up to a small limit (OpenStreetMap tile policy). */
const VERSION = 'bfm-2026-11-13b';
const CORE = ['./','index.html','red-fort.html','purana-qila.html','pois.json','pois-purana-qila.json','manifest.webmanifest','icon.svg',
  'vendor/three/three.module.min.js','vendor/three/addons/controls/OrbitControls.js','vendor/three/addons/renderers/CSS2DRenderer.js','vendor/three/addons/utils/BufferGeometryUtils.js','vendor/leaflet/leaflet.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION && k !== 'bfm-tiles').map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if(req.method !== 'GET') return;
  const url = new URL(req.url);
  if(url.hostname === 'tile.openstreetmap.org'){
    e.respondWith(caches.open('bfm-tiles').then(async c => { const hit = await c.match(req); if(hit) return hit;
      const res = await fetch(req); if(res.ok){ c.put(req, res.clone()); c.keys().then(ks => { if(ks.length > 400) c.delete(ks[0]); }); } return res; }));
    return;
  }
  if(url.origin === location.origin && /\.json$/.test(url.pathname)){
    e.respondWith(fetch(req).then(res => { if(res.ok){ const cp = res.clone(); caches.open(VERSION).then(c => c.put(req, cp)); } return res; }).catch(() => caches.match(req, {ignoreSearch:true})));
    return;
  }
  e.respondWith(caches.match(req, {ignoreSearch:true}).then(hit => hit || fetch(req).then(res => {
    if(res.ok && (url.origin === location.origin || url.hostname.endsWith('gstatic.com') || url.hostname.endsWith('googleapis.com'))){ const cp = res.clone(); caches.open(VERSION).then(c => c.put(req, cp)); }
    return res;
  })));
});
