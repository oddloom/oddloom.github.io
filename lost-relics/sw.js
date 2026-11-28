// Gerado por tools/build-site.js - nao editar a mao. Lost Relics offline.
const CACHE = 'lostrelics-96a79cc564';
const FILES = ["./","ads.js?v=95c7c69b","art-data.js?v=3c12fa20","art.js?v=53d93a16","assets/diaria/bau-dia7.webp","assets/diaria/moldura.webp","assets/diaria/selo-resgatado.webp","assets/diaria/slot-ativo.webp","assets/diaria/slot-dia7.webp","assets/diaria/slot-normal.webp","assets/fonts/anton-400.woff2","assets/fonts/comico-400.woff2","assets/fonts/switzer-400.woff2","assets/fonts/switzer-600.woff2","assets/fonts/switzer-700.woff2","assets/fonts/uncial-latin-ext.woff2","assets/fonts/uncial-latin.woff2","assets/icon-192.png","assets/icon-512.png","assets/icon-maskable-512.png","assets/logo.png","assets/mapa/botoes-v2/atual.png","assets/mapa/botoes-v2/bloqueada.png","assets/mapa/botoes-v2/dificil.png","assets/mapa/botoes-v2/normal.png","assets/moedas/diamante-azul.webp","assets/palavras/en/p1.webp","assets/palavras/en/p2.webp","assets/palavras/en/p3.webp","assets/palavras/en/rush.webp","assets/skins-lr/floresta-casa.webp","assets/skins-lr/floresta-moldura.webp","assets/skins-lr/mini-floresta.webp","assets/skins-lr/mini-padrao.webp","assets/skins-lr/solar/amethyst.webp","assets/skins-lr/solar/diamond.webp","assets/skins-lr/solar/emerald.webp","assets/skins-lr/solar/ruby.webp","assets/skins-lr/solar/sapphire.webp","assets/skins-lr/solar/topaz.webp","assets/tutorial/p01.webp","assets/tutorial/p02.webp","assets/tutorial/p03.webp","assets/tutorial/p04.webp","assets/tutorial/p05.webp","assets/tutorial/p06.webp","assets/tutorial/p07.webp","assets/tutorial/p08.webp","assets/tutorial/p09.webp","assets/tutorial/p10.webp","assets/tutorial/p11.webp","assets/tutorial/p12.webp","assets/tutorial/p13.webp","assets/tutorial/p14.webp","assets/tutorial/p15.webp","assets/tutorial/p16.webp","assets/ui/shop-merchant-v1.webp","assets/ui-lr/aro.webp","assets/ui-lr/cadeado.webp","assets/ui-lr/diamante.webp","assets/ui-lr/medalha-bronze.webp","assets/ui-lr/medalha-ouro.webp","assets/ui-lr/medalha-pedra.webp","assets/ui-lr/medalha-prata.webp","assets/ui-lr/moeda.webp","assets/ui-lr/placa-bronze.webp","assets/ui-lr/placa-ouro.webp","assets/ui-lr/placa-pedra.webp","assets/ui-lr/placa-prata.webp","engine.js?v=77ae035f","fonts.css?v=a99eca64","game.js?v=9eb382bf","gems3d.js?v=0505a951","i18n.js?v=22290b45","index.html","levels.js?v=265ef53a","manifest.json","portable-save.js?v=e1fc8666","records.js?v=c94d187d","rivals.js?v=ccf135b7","share-card.js?v=d8d98497","sound.js?v=56559168","storage.js?v=797e343a","style.css?v=dcc3fce2","telemetry.js?v=f337f69a","textures.js?v=b46ed567","ui-art.js?v=f6e2bcd0"];
self.addEventListener('install', (e) => {
  // 28/11: baixa tudo conferindo com o servidor; se faltar um arquivo, a versão anterior continua valendo
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(FILES.map((u) => c.add(new Request(u, { cache: 'no-cache' }))))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('lostrelics-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin !== location.origin) return; // anúncios e o resto passam direto
  if (r.mode === 'navigate') { // 28/11: ao abrir já vem a versão nova; sem rede, com erro ou após 3,5 s abre a cópia guardada. Sem recarregar a página.
    e.respondWith(caches.open(CACHE).then((c) => c.match('index.html')).then((hit) => {
      const net = fetch(r.url, { cache: 'no-cache' });
      if (!hit) return net;
      return Promise.race([
        net.then((resp) => (resp.ok && !resp.redirected ? resp : hit), () => hit),
        new Promise((ok) => setTimeout(() => ok(hit), 3500)),
      ]);
    }));
    return;
  }
  e.respondWith(caches.match(r).then((hit) => hit || fetch(r).then((resp) => { if (resp.ok) { const cp = resp.clone(); caches.open(CACHE).then((c) => c.put(r, cp)); } return resp; })));
});
