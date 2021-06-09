const Cache_Files =[
    "/",
    "/index.html", 
    "/index.js",      
    "/styles.css", 

];

const Cache_run = 'runtime-cache'
const Static = 'static-cache-v2'

self.addEventListener('install', function (event){
    event.waitUntil(
        caches
        .open(Static)
        .then(cache =>{
            console.log("Pre-cached successfully");
            return cache.addAll(Cache_Files)
        })
    );

    self.skipWaiting();
});

seld-addEventListener('activate', function (event){
    const Caches = [Static, Cache_run]
    event.waitUntil(
        caches.keys()
        .then(cacheValue=>
            cacheValue.filter(cacheValue => !currentCaches.includes(CacheValue))
            )
            .then(cachesToDelete.map(cacheToDelete => caches.delete(cacheToDelete)))

    )

    .then(() => self.clients.claim())
    
})