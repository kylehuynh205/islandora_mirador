self.addEventListener('activate', function (event) {
  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  if (event.request.destination === "image" && new URL(event.request.url).pathname.startsWith('/iiif/') && new URL(location).searchParams.has('token')) {
    var token = new URL(location).searchParams.get('token');
    event.respondWith(
      fetch(event.request, {
        headers: {
          'Authorization': 'Bearer ' + token,
          'token': token
        },
        mode: "cors",
        credentials: "omit"
        //credentials: "include"
      })
    );
  }
});
