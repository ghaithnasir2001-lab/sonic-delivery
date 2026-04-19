const CACHE_NAME = 'sonic-delivery-v3';
const urlsToCache = [
    '/sonic-delivery/',
    '/sonic-delivery/index.html',
    '/sonic-delivery/order.html',
    '/sonic-delivery/style.css',
    '/sonic-delivery/script.js',
    '/sonic-delivery/order.js',
    '/sonic-delivery/manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return Promise.all(
                    urlsToCache.map(url => {
                        return cache.add(url).catch(err => console.log('Failed cache:', url, err));
                    })
                );
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
