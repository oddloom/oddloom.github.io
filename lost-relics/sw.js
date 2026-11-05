// Gerado por tools/build-site.js - nao editar a mao. Lost Relics offline.
const CACHE = 'lostrelics-71afe723e7';
const FILES = ["./","ads.js?v=17e989ec","art-data.js?v=3c12fa20","art.js?v=317d309f","assets/fonts/anton-400.woff2","assets/fonts/comico-400.woff2","assets/fonts/switzer-400.woff2","assets/fonts/switzer-600.woff2","assets/fonts/switzer-700.woff2","assets/fonts/uncial-latin-ext.woff2","assets/fonts/uncial-latin.woff2","assets/icon-192.png","assets/icon-512.png","assets/icon-maskable-512.png","assets/logo.png","assets/mapa/botoes-v2/atual.png","assets/mapa/botoes-v2/bloqueada.png","assets/mapa/botoes-v2/dificil.png","assets/mapa/botoes-v2/normal.png","assets/ui/shop-merchant-v1.webp","engine.js?v=31af490c","fonts.css?v=a99eca64","game.js?v=efd8a687","gems3d.js?v=0505a951","i18n.js?v=9e68b3e3","index.html","levels.js?v=265ef53a","manifest.json","portable-save.js?v=21c17b3b","records.js?v=e9e39ff9","share-card.js?v=74892a90","sound.js?v=56559168","storage.js?v=797e343a","style.css?v=975bf727","telemetry.js?v=53bf80dc","textures.js?v=b46ed567","ui-art.js?v=f6e2bcd0"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(FILES.map((u) => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('lostrelics-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin !== location.origin) return; // anúncios e o resto passam direto
  if (r.mode === 'navigate') { // abre na hora com a cópia guardada e atualiza em segundo plano
    const net = fetch(r).then((resp) => { if (resp.ok) { const cp = resp.clone(); caches.open(CACHE).then((c) => c.put('index.html', cp)); } return resp; }).catch(() => null);
    e.waitUntil(net);
    e.respondWith(caches.match('index.html').then((hit) => hit || net.then((x) => x || Response.error())));
    return;
  }
  e.respondWith(caches.match(r).then((hit) => hit || fetch(r).then((resp) => { if (resp.ok) { const cp = resp.clone(); caches.open(CACHE).then((c) => c.put(r, cp)); } return resp; })));
});
