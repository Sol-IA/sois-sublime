/**
 * Service Worker — Sois Sublime
 * Cache simple : precache des assets critiques + stratégie network-first pour HTML,
 * cache-first pour assets statiques. Pas de magie, facile à maintenir.
 *
 * Bump CACHE_VERSION à chaque déploiement pour invalider.
 */

const CACHE_VERSION = 'v1-2026-04-14';
const CACHE_STATIC = `ss-static-${CACHE_VERSION}`;
const CACHE_PAGES = `ss-pages-${CACHE_VERSION}`;

// Ressources pré-mises en cache au install
const PRECACHE = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/config.js',
  '/assets-sandra/logo-sandra-prune.svg',
  '/assets-sandra/favicon.png',
  '/assets-sandra/favicon-32.png',
  '/assets-sandra/icon-192.png',
  '/assets-sandra/icon-512.png',
  '/assets-sandra/apple-touch-icon.png',
  '/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIC).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_STATIC && k !== CACHE_PAGES)
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Never cache admin, espace client (données sensibles) et PHP
  if (
    url.pathname.startsWith('/admin') ||
    url.pathname.startsWith('/espace') ||
    url.pathname.endsWith('.php')
  ) {
    return;
  }

  // HTML : network-first (pour avoir la dernière version), fallback cache
  if (req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_PAGES).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('/index.html')))
    );
    return;
  }

  // Assets statiques (css, js, images, fonts) : cache-first
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (!res || res.status !== 200 || res.type === 'opaque') return res;
        const copy = res.clone();
        caches.open(CACHE_STATIC).then((c) => c.put(req, copy));
        return res;
      });
    })
  );
});
