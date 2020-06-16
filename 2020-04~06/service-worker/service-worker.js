
const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [

];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});


self.addEventListener('fetch', event => {

  console.log(event)
  if (/abc/.test(event.request.url)) {
    var res = new Response('console.log("hello world")', {
      headers: {'Content-Type': 'application/javascript'}
    });

    event.respondWith(res);
    return;
  }

  // if (event.request.url.startsWith(self.location.origin)) {
  //   event.respondWith(
  //     caches.match(event.request).then(cachedResponse => {
  //       if (cachedResponse) {
  //         return cachedResponse;
  //       }

  //       return caches.open(RUNTIME).then(cache => {
  //         return fetch(event.request).then(response => {
  //           // Put a copy of the response in the runtime cache.
  //           return cache.put(event.request, response.clone()).then(() => {
  //             return response;
  //           });
  //         });
  //       });
  //     })
  //   );
  // }
});