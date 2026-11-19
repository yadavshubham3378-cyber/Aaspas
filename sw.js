self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (e.request.url.includes('overpass')) return;
  e.respondWith(
    caches.open('aaspaas-v1').then(c =>
      fetch(e.request).then(r => { c.put(e.request, r.clone()); return r; })
        .catch(() => c.match(e.request))
    )
  );
});
