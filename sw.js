/* Service worker mínimo: cachea la app para poder entrenar sin conexión. */
const CACHE = 'dojo-v1';
const SHELL = [
  './', 'index.html', 'css/styles.css',
  'js/engine.js', 'js/data-boxeo.js', 'js/data-muaythai.js',
  'js/data-bjj.js', 'js/data-judo.js', 'js/data-sambo.js', 'js/app.js',
  'img/icon.svg', 'manifest.webmanifest'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copia = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copia)).catch(() => {});
      return r;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('index.html')))
  );
});
