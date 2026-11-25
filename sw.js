const CACHE_NAME = 'quiz-jardim-v3';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/quiz.js',
  '/logo.svg',
  '/icon.svg',
  '/favicon.svg',
  '/manifest.json'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first para scripts e html, cache fallback para imagens
self.addEventListener('fetch', (e) => {
  if (e.request.destination === 'document' || e.request.destination === 'script' || e.request.destination === 'style') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
