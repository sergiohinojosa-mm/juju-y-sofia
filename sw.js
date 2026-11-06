// Permite jugar sin internet una vez que el juego se abrió: primero intenta la red (para recibir
// siempre la versión nueva) y, si no hay conexión, usa la copia guardada.
// El nombre cambia con cada versión; al activarse, se borran las copias de versiones anteriores.
const CACHE = 'juju-y-sofia-v27';

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./', './index.html', './manifest.json', './icons/apple-touch-icon.png'])).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('juju-y-sofia') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim())
));

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req).then(res => {
      // Las respuestas parciales (206, típicas del audio) no se pueden guardar.
      if (res.status === 200) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: req.mode === 'navigate' }))
  );
});
