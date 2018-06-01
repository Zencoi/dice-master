var filesToCache = [
    '.',
    'index.html',
    'main.js',
    'components/default-board.js',
    'components/dice.js'
  ];
  
  var staticCacheName = 'pages-cache-v1';
  
  self.addEventListener('install', function(event) {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
      caches.open(staticCacheName)
      .then(function(cache) {
        return cache.addAll(filesToCache);
      })
    );
  });
  