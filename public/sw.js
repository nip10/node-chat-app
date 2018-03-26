/* eslint-disable no-undef, no-restricted-globals */

'use strict';

const cacheName = 'chat-app';
const filesToCache = ['/', '/index.html', '/chat.html', '/css/styles.css', '/js/chat.js', '/js/libs/deparam.js'];
self.addEventListener('install', e => {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(response => response || fetch(event.request))
  );
});
