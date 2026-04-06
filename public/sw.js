const CACHE_NAME = "komorebi-v1";
const OFFLINE_URL = "/offline";

// キャッシュするリソース
const PRECACHE_URLS = [
  "/offline",
  "/icon-192x192.png",
  "/icon-512x512.png",
];

// インストール: 基本リソースをキャッシュ
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// アクティベート: 古いキャッシュを削除
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// フェッチ: ネットワーク優先、失敗時はキャッシュ
self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate") return;

  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(OFFLINE_URL).then((response) => response || new Response("オフラインです", { status: 503 }))
    )
  );
});
