const CACHE = "oficina-institucional-v3";

const urls = [
"/",
"/index.html",
"/agenda.html",
"/pages/casos.html",
"/pages/expediente.html"
];

self.addEventListener("install", (event) => {

event.waitUntil(
caches.open(CACHE).then(cache => {
return cache.addAll(urls);
})
);

self.skipWaiting();

});

self.addEventListener("activate", (event) => {

event.waitUntil(
caches.keys().then(keys => {
return Promise.all(
keys.map(key => {
if (key !== CACHE) {
return caches.delete(key);
}
})
);
})
);

self.clients.claim();

});

self.addEventListener("fetch", (event) => {

event.respondWith(
caches.match(event.request).then(cacheRes => {
return cacheRes || fetch(event.request);
})
);

});