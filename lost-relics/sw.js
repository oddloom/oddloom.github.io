// Gerado por tools/build-site.js - nao editar a mao. Lost Relics offline.
const CACHE = 'lostrelics-a9d84f2d87';
const FILES = ["./","ads.js?v=f4bc1aa4","art-data.js?v=808c2354","art-extra.js?v=8ab81ea4","art.js?v=77f5aa81","assets/fonts/anton-400.woff2","assets/fonts/comico-400.woff2","assets/fonts/switzer-400.woff2","assets/fonts/switzer-600.woff2","assets/fonts/switzer-700.woff2","assets/fonts/uncial-latin-ext.woff2","assets/fonts/uncial-latin.woff2","assets/icon-192.png","assets/icon-512.png","assets/icon-maskable-512.png","assets/logo.png","assets/mapa/botoes-v2/atual.png","assets/mapa/botoes-v2/bloqueada.png","assets/mapa/botoes-v2/dificil.png","assets/mapa/botoes-v2/normal.png","assets/mapa/numeros-v2/n0.png","assets/mapa/numeros-v2/n1.png","assets/mapa/numeros-v2/n2.png","assets/mapa/numeros-v2/n3.png","assets/mapa/numeros-v2/n4.png","assets/mapa/numeros-v2/n5.png","assets/mapa/numeros-v2/n6.png","assets/mapa/numeros-v2/n7.png","assets/mapa/numeros-v2/n8.png","assets/mapa/numeros-v2/n9.png","engine.js?v=beb5ad02","fonts.css?v=a99eca64","game.js?v=dd241651","gems3d.js?v=0505a951","i18n.js?v=22174ba7","index.html","levels.js?v=f5a3def0","manifest.json","records.js?v=2de5f9bb","sound.js?v=d40e4fc9","style.css?v=77e17ed4","textures.js?v=b46ed567","ui-art.js?v=f6e2bcd0"];
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
