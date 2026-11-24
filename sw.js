const CACHE_NAME = 'quiz-jardim-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/quiz.js',
  '/logo.svg',
  '/icon.svg',
  '/favicon.svg',
  '/manifest.json',
  '/images/cenarios/janela.webp',
  '/images/cenarios/varanda.webp',
  '/images/cenarios/quintal.webp',
  '/images/plantas/folhagem.webp',
  '/images/plantas/flor.webp',
  '/images/plantas/tempero.webp',
  '/images/carrinho/muda.webp',
  '/images/carrinho/substrato.webp',
  '/images/carrinho/vaso-com-furos.webp',
  '/images/carrinho/adubo.webp',
  '/images/carrinho/pa-de-mao.webp',
  '/images/carrinho/tesoura-de-poda.webp',
  '/images/carrinho/cobertura-vegetal.webp'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
