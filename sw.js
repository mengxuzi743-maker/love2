const CACHE_NAME = 'love-memo-v10';
const STATIC_CACHE = [
  '/love2/manifest.json',
  '/love2/icon-192.png',
  '/love2/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

function isDynamicRequest(request) {
  const url = new URL(request.url);
  if (request.mode === 'navigate') return true;
  if (url.pathname.endsWith('.html')) return true;
  if (url.pathname.endsWith('/') && url.pathname.includes('/love2')) return true;
  if (url.hostname.includes('open-meteo.com')) return true;
  return false;
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  if (isDynamicRequest(event.request)) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.ok && event.request.url.includes('/love2/')) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
