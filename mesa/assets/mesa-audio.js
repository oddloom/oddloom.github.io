/* Mesa — Controle padrão de volume (Música e Efeitos Sonoros) no app e em todos os minigames */
(function () {
  'use strict';

  var CHAVE_MUSICA = 'mesa-vol-musica';
  var CHAVE_EFEITOS = 'mesa-vol-efeitos';
  var CHAVE_ANTIGA_PREF = 'mesa-audio-global-';
  var EV_MUDOU = 'mesa-audio-mudou';
  var EV_VOL = 'mesa-volume-mudou';

  function idioma() {
    var l = (document.documentElement.lang || navigator.language || 'pt').toLowerCase().slice(0, 2);
    if (l === 'es' || l === 'en' || l === 'ja') return l;
    return 'pt';
  }

  var TX = {
    pt: { titulo: 'Volume', musica: 'Música', efeitos: 'Efeitos sonoros', som: 'Controle de volume', fechar: 'Fechar' },
    es: { titulo: 'Volumen', musica: 'Música', efeitos: 'Efectos de sonido', som: 'Control de volumen', fechar: 'Cerrar' },
    en: { titulo: 'Volume', musica: 'Music', efeitos: 'Sound effects', som: 'Volume control', fechar: 'Close' },
    ja: { titulo: '音量', musica: '音楽', efeitos: '効果音', som: '音量設定', fechar: '閉じる' },
  };

  function t() {
    return TX[idioma()] || TX.pt;
  }

  function clampPct(v) {
    var n = Math.round(Number(v));
    if (!Number.isFinite(n)) return 100;
    return Math.max(0, Math.min(100, n));
  }

  function lerInicial(chaveVol, tipoAntigo) {
    try {
      var salvo = localStorage.getItem(chaveVol);
      if (salvo !== null && salvo !== '') return clampPct(salvo);
      if (localStorage.getItem(CHAVE_ANTIGA_PREF + tipoAntigo) === 'desligado') return 0;
    } catch (_) {}
    return 100;
  }

  var pctMusica = lerInicial(CHAVE_MUSICA, 'musica');
  var pctEfeitos = lerInicial(CHAVE_EFEITOS, 'efeitos');
  var ultimoNaoZero = {
    musica: pctMusica > 0 ? pctMusica : 75,
    efeitos: pctEfeitos > 0 ? pctEfeitos : 80,
  };

  function volMusica() {
    return pctMusica / 100;
  }

  function volEfeitos() {
    return pctEfeitos / 100;
  }

  function retomarCtx(ctx) {
    if (!ctx || ctx.state === 'closed') return;
    if (ctx.state === 'suspended' || ctx.state === 'interrupted') {
      try {
        var p = ctx.resume();
        if (p && p.catch) p.catch(function () {});
      } catch (_) {}
    }
  }

  function aplicarGanho(ctx, gainNode, v) {
    if (!ctx || !gainNode || ctx.state === 'closed') return;
    if (ctx.state !== 'running') {
      try { gainNode.gain.value = v; } catch (_) {}
      retomarCtx(ctx);
      return;
    }
    var now = ctx.currentTime;
    try {
      gainNode.gain.cancelScheduledValues(now);
      gainNode.gain.setValueAtTime(gainNode.gain.value, now);
      gainNode.gain.linearRampToValueAtTime(v, now + 0.025);
    } catch (_) {
      try { gainNode.gain.value = v; } catch (__) {}
    }
  }

  // Master GainNode por AudioContext para Efeitos Sonoros
  var mapaDestinos = new WeakMap();
  var listaGanhos = [];

  function destinoEfeitos(ctx) {
    if (!ctx) return null;
    var g = mapaDestinos.get(ctx);
    if (!g) {
      g = ctx.createGain();
      g.gain.value = volEfeitos();
      g.connect(ctx.destination);
      mapaDestinos.set(ctx, g);
      listaGanhos.push({ ctx: ctx, gain: g });
    }
    retomarCtx(ctx);
    return g;
  }

  function atualizarGanhosEfeitos() {
    var v = volEfeitos();
    var vivos = [];
    for (var i = 0; i < listaGanhos.length; i++) {
      var item = listaGanhos[i];
      if (!item.ctx || item.ctx.state === 'closed') continue;
      vivos.push(item);
      aplicarGanho(item.ctx, item.gain, v);
    }
    listaGanhos = vivos;
  }

  // Master GainNode por AudioContext para Música (Gun Arena e Web Audio)
  var mapaDestinosMusica = new WeakMap();
  var listaGanhosMusica = [];

  function destinoMusica(ctx) {
    if (!ctx) return null;
    var g = mapaDestinosMusica.get(ctx);
    if (!g) {
      g = ctx.createGain();
      g.gain.value = volMusica();
      g.connect(ctx.destination);
      mapaDestinosMusica.set(ctx, g);
      listaGanhosMusica.push({ ctx: ctx, gain: g });
    }
    retomarCtx(ctx);
    return g;
  }

  function atualizarGanhosMusica() {
    var v = volMusica();
    var vivos = [];
    for (var i = 0; i < listaGanhosMusica.length; i++) {
      var item = listaGanhosMusica[i];
      if (!item.ctx || item.ctx.state === 'closed') continue;
      vivos.push(item);
      aplicarGanho(item.ctx, item.gain, v);
    }
    listaGanhosMusica = vivos;
  }

  // Controle seguro para HTMLAudioElement (música ambiente da Home/Sala e prévia da Loja).
  // NUNCA usa createMediaElementSource no iOS/Safari (bug conhecido do WebKit silencia <audio>).
  // Usa audio.muted para 0% (funciona no iOS) e audio.volume nos demais navegadores.
  var ehIOS = /iP(hone|ad|od)/i.test(navigator.userAgent || '') ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var mapaElementos = new WeakMap();
  var listaElementos = [];

  function sincronizarElemento(info) {
    var v = volMusica();
    var finalVol = Math.max(0, Math.min(1, info.base * v));
    try {
      info.audio.muted = v <= 0 || info.base <= 0;
      info.audio.volume = finalVol;
    } catch (_) {}
  }

  function aplicarVolumeElemento(audio, baseVol) {
    if (!audio) return;
    var base = Number.isFinite(baseVol) ? Math.max(0, Math.min(1, baseVol)) : 1;
    var info = mapaElementos.get(audio);
    if (!info) {
      info = { audio: audio, base: base };
      mapaElementos.set(audio, info);
      listaElementos.push(info);
    } else {
      info.base = base;
    }
    sincronizarElemento(info);
  }

  function atualizarElementosMusica() {
    var vivos = [];
    for (var i = 0; i < listaElementos.length; i++) {
      var info = listaElementos[i];
      if (!info || !info.audio) continue;
      vivos.push(info);
      sincronizarElemento(info);
    }
    listaElementos = vivos;
  }

  // Desbloqueio confiável de todos os AudioContext no primeiro gesto do usuário (essencial no iOS Safari)
  var desbloqueados = new WeakSet();
  function desbloquearTodosContextos() {
    var listas = [listaGanhos, listaGanhosMusica];
    for (var l = 0; l < listas.length; l++) {
      var arr = listas[l];
      for (var i = 0; i < arr.length; i++) {
        var ctx = arr[i] && arr[i].ctx;
        if (!ctx || ctx.state === 'closed') continue;
        retomarCtx(ctx);
        if (ehIOS && !desbloqueados.has(ctx)) {
          try {
            var buf = ctx.createBuffer(1, 1, 22050);
            var src = ctx.createBufferSource();
            src.buffer = buf;
            src.connect(ctx.destination);
            src.start(0);
            desbloqueados.add(ctx);
          } catch (_) {}
        }
      }
    }
    // Se algum áudio ambiente em loop estava pausado aguardando gesto no iOS, retoma com volume > 0
    if (volMusica() > 0) {
      for (var j = 0; j < listaElementos.length; j++) {
        var el = listaElementos[j] && listaElementos[j].audio;
        if (el && el.loop && el.src && el.paused && !el.muted) {
          try {
            var pr = el.play();
            if (pr && pr.catch) pr.catch(function () {});
          } catch (_) {}
        }
      }
    }
  }

  ['touchstart', 'touchend', 'pointerdown', 'click', 'keydown'].forEach(function (ev) {
    document.addEventListener(ev, desbloquearTodosContextos, { capture: true, passive: true });
  });

  function sincronizarAntigo(tipo, pct) {
    try {
      localStorage.setItem(tipo === 'musica' ? CHAVE_MUSICA : CHAVE_EFEITOS, String(pct));
      localStorage.setItem(CHAVE_ANTIGA_PREF + tipo, pct > 0 ? 'ligado' : 'desligado');
    } catch (_) {}
  }

  function notificar() {
    atualizarGanhosMusica();
    atualizarGanhosEfeitos();
    atualizarElementosMusica();
    atualizarTodosBotoes();
    try {
      window.dispatchEvent(new Event(EV_VOL));
      window.dispatchEvent(new Event(EV_MUDOU));
    } catch (_) {}
  }

  function definirMusica(pct) {
    var novo = clampPct(pct);
    if (novo > 0) ultimoNaoZero.musica = novo;
    pctMusica = novo;
    sincronizarAntigo('musica', novo);
    notificar();
  }

  function definirEfeitos(pct) {
    var novo = clampPct(pct);
    if (novo > 0) ultimoNaoZero.efeitos = novo;
    pctEfeitos = novo;
    sincronizarAntigo('efeitos', novo);
    notificar();
  }

  function iconeSom(ativo) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m11 5-5 4H3v6h3l5 4z"/>' +
      (ativo ? '<path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>' : '<path d="m16 9 6 6m0-6-6 6"/>') +
      '</svg>';
  }

  function iconeMusica(ativo) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>' +
      (ativo ? '' : '<path d="M3 3l18 18"/>') +
      '</svg>';
  }

  function criarLinhaSlider(tipo) {
    var ehMusica = tipo === 'musica';
    var wrap = document.createElement('div');
    wrap.className = 'mesa-vol-item';

    var cab = document.createElement('div');
    cab.className = 'mesa-vol-cab';

    var rot = document.createElement('div');
    rot.className = 'mesa-vol-rotulo';

    var btnMute = document.createElement('button');
    btnMute.type = 'button';
    btnMute.className = 'mesa-vol-mute ' + tipo;

    var labelSpan = document.createElement('span');
    labelSpan.textContent = ehMusica ? t().musica : t().efeitos;

    rot.append(btnMute, labelSpan);

    var pctEl = document.createElement('span');
    pctEl.className = 'mesa-vol-pct';

    cab.append(rot, pctEl);

    var input = document.createElement('input');
    input.type = 'range';
    input.min = '0';
    input.max = '100';
    input.step = '1';
    input.className = 'mesa-vol-range ' + tipo;
    input.setAttribute('aria-label', ehMusica ? t().musica : t().efeitos);

    function render() {
      var val = ehMusica ? pctMusica : pctEfeitos;
      input.value = String(val);
      input.style.setProperty('--mv-pct', val + '%');
      pctEl.textContent = val + '%';
      btnMute.classList.toggle('mudo', val === 0);
      btnMute.innerHTML = ehMusica ? iconeMusica(val > 0) : iconeSom(val > 0);
      btnMute.setAttribute('aria-pressed', String(val === 0));
    }

    function aoAlterar() {
      if (ehMusica) definirMusica(input.value);
      else definirEfeitos(input.value);
      render();
    }

    input.addEventListener('input', aoAlterar);
    input.addEventListener('change', aoAlterar);

    btnMute.addEventListener('click', function () {
      var atual = ehMusica ? pctMusica : pctEfeitos;
      var proximo = atual > 0 ? 0 : (ultimoNaoZero[tipo] || 80);
      if (ehMusica) definirMusica(proximo);
      else definirEfeitos(proximo);
      render();
    });

    var onSync = function () {
      if (!wrap.isConnected) {
        window.removeEventListener(EV_VOL, onSync);
        return;
      }
      render();
    };
    window.addEventListener(EV_VOL, onSync);

    render();
    wrap.append(cab, input);
    return wrap;
  }

  function criarControlesInline() {
    var lista = document.createElement('div');
    lista.className = 'mesa-vol-lista';
    lista.append(criarLinhaSlider('musica'), criarLinhaSlider('efeitos'));
    return lista;
  }

  // ---- Painel flutuante padrão (usado dentro de todos os minigames e atalhos) ----
  var painelAberto = null;

  function fecharPainel() {
    if (!painelAberto) return;
    var p = painelAberto;
    painelAberto = null;
    p.backdrop.classList.remove('visivel');
    p.box.classList.remove('visivel');
    window.removeEventListener('keydown', p.onKey);
    setTimeout(function () {
      p.backdrop.remove();
      p.box.remove();
    }, 170);
  }

  function abrirPainel(ancora) {
    if (painelAberto) {
      var mesma = ancora && painelAberto.ancora === ancora;
      fecharPainel();
      if (mesma) return;
    }

    var backdrop = document.createElement('div');
    backdrop.className = 'mesa-vol-backdrop';
    backdrop.addEventListener('click', fecharPainel);

    var box = document.createElement('div');
    box.className = 'mesa-vol-painel';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', t().titulo);
    box.addEventListener('pointerdown', function (ev) { ev.stopPropagation(); });
    box.addEventListener('touchstart', function (ev) { ev.stopPropagation(); }, { passive: true });

    var topo = document.createElement('div');
    topo.className = 'mesa-vol-topo';
    var h = document.createElement('h3');
    h.className = 'mesa-vol-titulo';
    h.textContent = t().titulo;
    var x = document.createElement('button');
    x.type = 'button';
    x.className = 'mesa-vol-fechar';
    x.setAttribute('aria-label', t().fechar);
    x.textContent = '×';
    x.addEventListener('click', fecharPainel);
    topo.append(h, x);

    box.append(topo, criarControlesInline());
    var telaDeitada = document.querySelector('.art-tela.art-deitado');
    if (telaDeitada) {
      backdrop.classList.add('em-deitado');
      box.classList.add('em-deitado');
      telaDeitada.append(backdrop, box);
    } else {
      document.body.append(backdrop, box);

      // Posicionamento inteligente perto da âncora ou centralizado no topo
      var w = box.offsetWidth || 290;
      var hBox = box.offsetHeight || 210;
      var left = Math.round((window.innerWidth - w) / 2);
      var top = 64;
      if (ancora && ancora.getBoundingClientRect) {
        var r = ancora.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          left = Math.round(r.right - w);
          top = Math.round(r.bottom + 8);
          if (left < 12) left = 12;
          if (left + w > window.innerWidth - 12) left = window.innerWidth - w - 12;
          if (top + hBox > window.innerHeight - 12) top = Math.max(12, Math.round(r.top - hBox - 8));
        }
      }
      box.style.left = left + 'px';
      box.style.top = top + 'px';
    }

    var onKey = function (ev) {
      if (ev.key === 'Escape') fecharPainel();
    };
    window.addEventListener('keydown', onKey);

    painelAberto = { backdrop: backdrop, box: box, ancora: ancora || null, onKey: onKey };

    requestAnimationFrame(function () {
      backdrop.classList.add('visivel');
      box.classList.add('visivel');
    });
  }

  function atualizarTodosBotoes() {
    var mudo = pctMusica === 0 && pctEfeitos === 0;
    var btns = document.querySelectorAll('.mesa-vol-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle('mudo', mudo);
      btns[i].innerHTML = iconeSom(!mudo);
      btns[i].title = t().som;
      btns[i].setAttribute('aria-label', t().som);
    }
  }

  function criarBotao(extraClass) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mesa-vol-btn' + (extraClass ? ' ' + extraClass : '');
    var mudo = pctMusica === 0 && pctEfeitos === 0;
    btn.classList.toggle('mudo', mudo);
    btn.innerHTML = iconeSom(!mudo);
    btn.title = t().som;
    btn.setAttribute('aria-label', t().som);
    btn.addEventListener('click', function (ev) {
      ev.stopPropagation();
      abrirPainel(btn);
    });
    return btn;
  }

  var SELETORES_JOGO = '.tela-domino, .tela-truco, .tela-uni, .tela-sinuca-site, .tela-xadrez, .tela-damas, .tela-ludo, .tela-botao, .tela-gartic, .tela-stop, .tela-bomb, .art-tela, .tela-sala';

  function garantirBotaoNaTela() {
    var app = document.getElementById('app');
    if (!app) return;

    // Se a tela já tem botão nativo de som (Gun Arena, Bomb, Gartic, Stop, Uni), ele abre o painel diretamente
    var temNativo = Boolean(app.querySelector('.art-som-caixa, .bomb-som, .som-uni'));
    var flutuante = document.querySelector('.mesa-vol-btn.flutuante');

    if (temNativo) {
      if (flutuante) flutuante.remove();
      return;
    }

    // Procura barra de atalhos padrão dentro de minigames ou sala
    var barra = app.querySelector('.atalhos, .xe-cabecalho, .topo-damas, .ludo-topo, .tela-sala .topo-volta');
    if (barra) {
      if (flutuante) flutuante.remove();
      if (!barra.querySelector('.mesa-vol-btn')) {
        var b = criarBotao('com-icone');
        barra.insertBefore(b, barra.lastElementChild || null);
      }
      return;
    }

    // Fallback discreto caso um minigame esteja aberto sem .atalhos
    var emJogo = Boolean(app.querySelector(SELETORES_JOGO));
    if (emJogo) {
      if (!flutuante) {
        document.body.append(criarBotao('flutuante'));
      }
    } else if (flutuante) {
      flutuante.remove();
    }
  }

  var agendado = false;
  function agendarVerificacao() {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(function () {
      agendado = false;
      garantirBotaoNaTela();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      garantirBotaoNaTela();
      new MutationObserver(agendarVerificacao).observe(document.body, { childList: true, subtree: true });
    });
  } else {
    garantirBotaoNaTela();
    new MutationObserver(agendarVerificacao).observe(document.body, { childList: true, subtree: true });
  }

  // Sincroniza se o antigo toggle mudar por fora
  window.addEventListener(EV_MUDOU, function () {
    try {
      var gm = localStorage.getItem(CHAVE_ANTIGA_PREF + 'musica');
      var ge = localStorage.getItem(CHAVE_ANTIGA_PREF + 'efeitos');
      if (gm === 'desligado' && pctMusica > 0) { pctMusica = 0; localStorage.setItem(CHAVE_MUSICA, '0'); }
      else if (gm === 'ligado' && pctMusica === 0) { pctMusica = ultimoNaoZero.musica || 75; localStorage.setItem(CHAVE_MUSICA, String(pctMusica)); }
      if (ge === 'desligado' && pctEfeitos > 0) { pctEfeitos = 0; localStorage.setItem(CHAVE_EFEITOS, '0'); }
      else if (ge === 'ligado' && pctEfeitos === 0) { pctEfeitos = ultimoNaoZero.efeitos || 80; localStorage.setItem(CHAVE_EFEITOS, String(pctEfeitos)); }
      atualizarGanhosMusica();
      atualizarGanhosEfeitos();
      atualizarElementosMusica();
      atualizarTodosBotoes();
    } catch (_) {}
  });

  var api = {
    volMusica: volMusica,
    volEfeitos: volEfeitos,
    pctMusica: function () { return pctMusica; },
    pctEfeitos: function () { return pctEfeitos; },
    definirMusica: definirMusica,
    definirEfeitos: definirEfeitos,
    destinoMusica: destinoMusica,
    destinoEfeitos: destinoEfeitos,
    aplicarVolumeElemento: aplicarVolumeElemento,
    criarControlesInline: criarControlesInline,
    abrirPainel: abrirPainel,
    fecharPainel: fecharPainel,
  };

  window.__mesaAudio = api;
  window.MesaAudio = api;
})();
