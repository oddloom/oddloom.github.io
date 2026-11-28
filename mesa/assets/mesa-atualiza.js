// Mesa: ao abrir a web, carrega sozinho a versão publicada mais nova.
// Compara os arquivos citados no index.html do servidor com os da página aberta.
// Recarrega no máximo uma vez por versão e nunca depois de um toque ou dentro de mesa/sala.
// Não mexe em localStorage nem IndexedDB (onde fica o progresso).
(function () {
  'use strict';

  // No app Android os arquivos são locais; quem atualiza é a Google Play.
  var cap = window.Capacitor;
  if (cap && cap.isNativePlatform && cap.isNativePlatform()) return;

  var PRAZO_MS = 8000;
  var INTERVALO_MS = 60000;
  var CHAVE = 'mesa-atualizacao';
  var inicio = Date.now();
  var tocou = false;

  ['pointerdown', 'keydown', 'touchstart'].forEach(function (evento) {
    window.addEventListener(evento, function () { tocou = true; }, { capture: true, passive: true });
  });

  // Convite, mesa em andamento, sala ou volta de pagamento: não recarregar.
  function enderecoProtegido(busca) {
    var p = new URLSearchParams(busca);
    return ['mesa', 'sala', 'pagamento', 'convite'].some(function (k) { return p.has(k); });
  }
  var protegidoAoAbrir = enderecoProtegido(location.search);

  function podeRecarregar() {
    return !tocou && !protegidoAoAbrir && !enderecoProtegido(location.search) &&
      Date.now() - inicio < PRAZO_MS && navigator.onLine !== false;
  }

  // Só arquivos do próprio site.
  function arquivos(doc) {
    return Array.prototype.map.call(
      doc.querySelectorAll('script[src], link[rel="stylesheet"][href]'),
      function (el) { return el.getAttribute('src') || el.getAttribute('href'); }
    ).filter(function (u) { return /^(\.?\/)(?!\/)/.test(u); });
  }

  function verificar() {
    if (!podeRecarregar()) return;
    var abertos = new Set(arquivos(document));
    var corte = new AbortController();
    var relogio = setTimeout(function () { corte.abort(); }, PRAZO_MS);

    fetch(location.pathname + '?atualizacao=' + Date.now(), { cache: 'no-store', signal: corte.signal })
      .then(function (r) { return r.ok ? r.text() : ''; })
      .then(function (html) {
        if (!html) return;
        var novo = new DOMParser().parseFromString(html, 'text/html');
        var lista = arquivos(novo);
        // Confirma que a resposta é mesmo a Mesa (e não uma tela de erro ou de login do Wi-Fi).
        var ehMesa = novo.getElementById('app') &&
          lista.some(function (u) { return /\/assets\/index-[^/]+\.js/.test(u); });
        if (!ehMesa || lista.every(function (u) { return abertos.has(u); })) return;
        if (!podeRecarregar()) return;

        // Trava contra loop. Sem sessionStorage, não recarrega.
        var versao = lista.slice().sort().join('|');
        var antes = JSON.parse(sessionStorage.getItem(CHAVE) || '{}');
        var feitas = antes.versoes || [];
        if (feitas.indexOf(versao) !== -1 || Date.now() - (antes.quando || 0) < INTERVALO_MS) return;
        var gravar = JSON.stringify({ versoes: feitas.concat(versao).slice(-5), quando: Date.now() });
        sessionStorage.setItem(CHAVE, gravar);
        if (sessionStorage.getItem(CHAVE) !== gravar) return;
        location.reload();
      })
      .catch(function () { /* offline ou erro: segue com a versão aberta */ })
      .then(function () { clearTimeout(relogio); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', verificar, { once: true });
  } else {
    verificar();
  }
})();
