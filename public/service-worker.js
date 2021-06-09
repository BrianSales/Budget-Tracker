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
    event.waitUntil(
        caches.keys().then(keylist => {
            return Promise.all(
                keylist.map(key =>{
                    console.log('Old key removed', key);
                    return caches.delete(key)
                })
            )
        })
    )
    self.clients.claim
})