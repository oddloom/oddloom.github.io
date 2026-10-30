// Gerado por tools/build-site.js - nao editar a mao. Lost Relics offline.
const CACHE = 'lostrelics-eaf9697f36';
const FILES = ["./","ads.js?v=f4977b6f","art-data.js?v=808c2354","art.js?v=950fe021","assets/fonts/anton-400.woff2","assets/fonts/comico-400.woff2","assets/fonts/switzer-400.woff2","assets/fonts/switzer-600.woff2","assets/fonts/switzer-700.woff2","assets/fonts/uncial-latin-ext.woff2","assets/fonts/uncial-latin.woff2","assets/icon-192.png","assets/icon-512.png","assets/icon-maskable-512.png","assets/logo.png","assets/mapa/botoes-v2/atual.png","assets/mapa/botoes-v2/bloqueada.png","assets/mapa/botoes-v2/dificil.png","assets/mapa/botoes-v2/normal.png","engine.js?v=beb5ad02","fonts.css?v=a99eca64","game.js?v=65a57292","gems3d.js?v=0505a951","i18n.js?v=fd5b7dc5","index.html","levels.js?v=f5a3def0","manifest.json","portable-save.js?v=a4861674","records.js?v=415d67e5","share-card.js?v=74892a90","sound.js?v=d40e4fc9","style.css?v=34ba5ec3","telemetry.js?v=2fbfaf32","textures.js?v=b46ed567","ui-art.js?v=f6e2bcd0"];
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
