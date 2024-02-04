// public/service-worker.js

(function () {
  const cacheName = 'my-app-cache';

  // Push Notification (Messaging) Event Listener
  this.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(cacheName).then((cache) => {
        return cache.addAll([
          // List of files to cache
          '/',
          '/index.html',
          '/static/css/main.chunk.css',
          '/static/js/bundle.js',
          // Add more files as needed
        ]);
      })
    );
  });
  
  this.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  
  this.addEventListener('push', (event) => {
    const options = {
      body: event.data.text(),
    };
  
    event.waitUntil(
      this.registration.showNotification('Push Notification', options)
    );
  });
})();