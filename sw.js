const cacheName = 'zap5';

const cacheFiles = [
  'offline.html',
  'style.css',
  'images/favicon.png',
  'index.html',
];

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  self.skipWaiting();
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('activate', (event) => {
  // console.log('[Service Worker] Forced Claim');
  // clients.claim();

  console.log('[Service Worker] Cleaning Cache');
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== cacheName) {
          return caches.delete(key)
        }
      })
    ))
  );
});

self.addEventListener('fetch', (event) => {
  // Not sure if this is needed...
  if (event.request.method !== 'GET') {
    return fetch(event.request);
  }

  event.respondWith(
    caches.match(event.request)
    .then((found) =>
      found ||
      caches.open(cacheName).then((cache) =>
        fetch(event.request).then((response) => {
          cache.put(event.request, response.clone())
          return response
          })
        )
    ).catch(console.err)
  );
});
