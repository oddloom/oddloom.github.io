// Gerado por tools/build-site.js - nao editar a mao. Lost Relics offline.
const CACHE = 'lostrelics-a340ce408e';
const FILES = ["./","ads.js?v=95c7c69b","art-data.js?v=3c12fa20","art.js?v=53d93a16","assets/diaria/bau-dia7.webp","assets/diaria/moldura.webp","assets/diaria/selo-resgatado.webp","assets/diaria/slot-ativo.webp","assets/diaria/slot-dia7.webp","assets/diaria/slot-normal.webp","assets/fonts/anton-400.woff2","assets/fonts/comico-400.woff2","assets/fonts/switzer-400.woff2","assets/fonts/switzer-600.woff2","assets/fonts/switzer-700.woff2","assets/fonts/uncial-latin-ext.woff2","assets/fonts/uncial-latin.woff2","assets/icon-192.png","assets/icon-512.png","assets/icon-maskable-512.png","assets/logo.png","assets/mapa/botoes-v2/atual.png","assets/mapa/botoes-v2/bloqueada.png","assets/mapa/botoes-v2/dificil.png","assets/mapa/botoes-v2/normal.png","assets/moedas/diamante-azul.webp","assets/palavras/en/p1.webp","assets/palavras/en/p2.webp","assets/palavras/en/p3.webp","assets/palavras/en/rush.webp","assets/skins-lr/floresta-casa.webp","assets/skins-lr/floresta-moldura.webp","assets/skins-lr/mini-floresta.webp","assets/skins-lr/mini-padrao.webp","assets/skins-lr/solar/amethyst.webp","assets/skins-lr/solar/diamond.webp","assets/skins-lr/solar/emerald.webp","assets/skins-lr/solar/ruby.webp","assets/skins-lr/solar/sapphire.webp","assets/skins-lr/solar/topaz.webp","assets/tutorial/p01.webp","assets/tutorial/p02.webp","assets/tutorial/p03.webp","assets/tutorial/p04.webp","assets/tutorial/p05.webp","assets/tutorial/p06.webp","assets/tutorial/p07.webp","assets/tutorial/p08.webp","assets/tutorial/p09.webp","assets/tutorial/p10.webp","assets/tutorial/p11.webp","assets/tutorial/p12.webp","assets/tutorial/p13.webp","assets/tutorial/p14.webp","assets/tutorial/p15.webp","assets/tutorial/p16.webp","assets/ui/shop-merchant-v1.webp","assets/ui-lr/aro.webp","assets/ui-lr/cadeado.webp","assets/ui-lr/diamante.webp","assets/ui-lr/medalha-bronze.webp","assets/ui-lr/medalha-ouro.webp","assets/ui-lr/medalha-pedra.webp","assets/ui-lr/medalha-prata.webp","assets/ui-lr/moeda.webp","assets/ui-lr/placa-bronze.webp","assets/ui-lr/placa-ouro.webp","assets/ui-lr/placa-pedra.webp","assets/ui-lr/placa-prata.webp","engine.js?v=77ae035f","fonts.css?v=a99eca64","game.js?v=a53b6adf","gems3d.js?v=0505a951","i18n.js?v=618c12f6","index.html","levels.js?v=265ef53a","manifest.json","portable-save.js?v=e1fc8666","records.js?v=dd04ac93","share-card.js?v=d8d98497","sound.js?v=56559168","storage.js?v=797e343a","style.css?v=b28f1d22","telemetry.js?v=f337f69a","textures.js?v=b46ed567","ui-art.js?v=f6e2bcd0"];
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
