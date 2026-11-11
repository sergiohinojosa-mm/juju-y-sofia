// Permite jugar sin internet una vez que el juego se abrió: primero intenta la red (para recibir
// siempre la versión nueva) y, si no hay conexión, usa la copia guardada.
// V es la misma versión de los ?v= de index.html; al activarse, se borran las copias anteriores.
const V = 32;
const CACHE = 'juju-y-sofia-v' + V;
// Todo lo que el juego necesita para arrancar se guarda desde la instalación (las voces se guardan al oírse).
const CORE = ['./', './index.html', './manifest.json', './icons/apple-touch-icon.png', 'css/style.css',
  'audio/tts.js', 'audio/frases.js', 'js/audio.js', 'js/art.js', 'js/art2.js', 'js/art-personajes.js',
  'js/art-animales.js', 'js/art-animales2.js', 'js/art-mundo.js', 'js/levels2.js', 'js/game.js']
  .map(u => /\.(js|css)$/.test(u) ? `./${u}?v=${V}` : u);

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
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
    }).catch(() => caches.match(req, { ignoreSearch: req.mode === 'navigate' }).then(r => r || Response.error()))
  );
});
