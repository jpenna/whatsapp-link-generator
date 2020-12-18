const cacheName = 'zap';

// Offline files
const cacheFiles = [
  'offline.html',
  'style.css',
  'images/favicon.png',
]

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (!response && !navigator.onLine) {
        return caches.match('offline.html');
      }

      if (response && navigator.onLine) {
        return caches.open(cacheName).then((cache) =>
          fetch(event.request).then((updated) => {
            cache.put(event.request, updated.clone())
            return updated
          })
        )
      }

      return fetch(event.request)
    }).catch(console.err)
  );
});
