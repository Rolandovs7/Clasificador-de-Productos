/**
 * Caché de Clasificador.
 * La carcasa se guarda al instalar y los CDN se reutilizan si ya se visitaron.
 * model.json y los dos .bin ya están entrenados y entran en la carcasa.
 */
const SHELL_CACHE = "clasificador-shell-v16";
const EXTERNAL_CACHE = "clasificador-external-v1";
const APP_FILES = [
  "./",
  "./index.html",
  "./styles.css",
  "./assets/logo.png",
  "./assets/logo-hero.png",
  "./assets/icono.png",
  "./assets/icon-192.png",
  "./assets/icon-maskable-512.png",
  "./assets/favicon.png",
  "./js/mapa.js",
  "./js/categorias.js",
  "./manifest.webmanifest",
  "./modelo_botellas/model.json",
  "./modelo_botellas/group1-shard1of2.bin",
  "./modelo_botellas/group1-shard2of2.bin"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((cache) => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => (key.startsWith("clasificador-") || key.startsWith("botellas-")) && key !== SHELL_CACHE && key !== EXTERNAL_CACHE)
        .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== self.location.origin) {
    event.respondWith((async () => {
      const cache = await caches.open(EXTERNAL_CACHE);
      const cached = await cache.match(request);
      const fresh = fetch(request).then((response) => {
        if (response.ok || response.type === "opaque") {
          cache.put(request, response.clone()).catch((error) => {
            console.warn("No se pudo guardar un recurso externo para uso sin conexión:", error);
          });
        }
        return response;
      });
      if (cached) {
        fresh.catch(() => {});
        return cached;
      }
      return fresh;
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request);
    try {
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open(SHELL_CACHE);
        cache.put(request, response.clone()).catch((error) => {
          console.warn("No se pudo actualizar el archivo guardado:", error);
        });
      }
      return response;
    } catch (error) {
      if (cached) return cached;
      if (request.mode === "navigate") {
        const offlinePage = await caches.match("./index.html");
        if (offlinePage) return offlinePage;
      }
      throw error;
    }
  })());
});
