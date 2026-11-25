/* Mesa — Componente único de animação de Elo para partidas ranqueadas de todos os minigames.
   Reutilizado por todos os 11 minigames ranqueados (domino, truco, cartas, xadrez, botao,
   damas, ludo, gartic, stop, bomb, artilharia) via hook em bv()/Ov(). */
(function () {
  'use strict';

  var LIGAS = [
    { id: 'bronze', min: 0, max: 100, img: '/mesa/arte/elo/liga-bronze.png?v=2' },
    { id: 'prata', min: 100, max: 250, img: '/mesa/arte/elo/liga-prata.png?v=2' },
    { id: 'ouro', min: 250, max: 450, img: '/mesa/arte/elo/liga-ouro.png?v=2' },
    { id: 'diamante', min: 450, max: 700, img: '/mesa/arte/elo/liga-diamante.png?v=2' },
    { id: 'mestre', min: 700, max: 1000, img: '/mesa/arte/elo/liga-mestre.png?v=2' },
  ];

  var JOGOS_ICONE = {
    domino: '/mesa/arte/mesa-ui/jogo-domino.webp',
    truco: '/mesa/arte/mesa-ui/jogo-truco.webp',
    cartas: '/mesa/arte/mesa-ui/jogo-uni.webp',
    xadrez: '/mesa/arte/mesa-ui/jogo-xadrez.webp',
    botao: '/mesa/arte/mesa-ui/jogo-botao.webp',
    damas: '/mesa/arte/mesa-ui/jogo-damas.webp',
    ludo: '/mesa/arte/mesa-ui/jogo-ludo.webp',
    gartic: '/mesa/arte/mesa-ui/jogo-gartic.webp',
    stop: '/mesa/arte/mesa-ui/jogo-stop.webp',
    bomb: '/mesa/arte/mesa-ui/jogo-bomb.webp',
    artilharia: '/mesa/arte/mesa-ui/jogo-artilharia.webp',
  };

  var JOGOS_NOMES = {
    pt: {
      domino: 'Dominó', truco: 'Truco', cartas: 'UN', xadrez: 'Xadrez',
      botao: 'Botão', damas: 'Damas', ludo: 'Ludo',
      gartic: 'Desenho', stop: 'Stop', bomb: 'Bomb', artilharia: 'Gun Arena',
    },
    es: {
      domino: 'Dominó', truco: 'Truco', cartas: 'UN', xadrez: 'Ajedrez',
      botao: 'Botón', damas: 'Damas', ludo: 'Ludo',
      gartic: 'Dibujo', stop: 'Stop', bomb: 'Bomb', artilharia: 'Gun Arena',
    },
    en: {
      domino: 'Dominoes', truco: 'Truco', cartas: 'UN', xadrez: 'Chess',
      botao: 'Soccer', damas: 'Checkers', ludo: 'Ludo',
      gartic: 'Drawing', stop: 'Stop', bomb: 'Bomb', artilharia: 'Gun Arena',
    },
  };

  var TEXTOS = {
    pt: {
      ranqueada: 'Ranqueada',
      subiu: 'Elo subiu!',
      caiu: 'Elo caiu',
      piso: 'Piso da liga',
      subiuLiga: 'Subiu de liga!',
      caiuLiga: 'Caiu de liga',
      antes: 'Antes',
      depois: 'Depois',
      pular: 'Pular',
      continuar: 'Continuar',
      pts: 'pts',
      ligas: { bronze: 'Bronze', prata: 'Prata', ouro: 'Ouro', diamante: 'Diamante', mestre: 'Mestre' },
    },
    es: {
      ranqueada: 'Clasificatoria',
      subiu: '¡Subió tu Elo!',
      caiu: 'Bajó tu Elo',
      piso: 'Piso de liga',
      subiuLiga: '¡Subiste de liga!',
      caiuLiga: 'Bajaste de liga',
      antes: 'Antes',
      depois: 'Después',
      pular: 'Omitir',
      continuar: 'Continuar',
      pts: 'pts',
      ligas: { bronze: 'Bronce', prata: 'Plata', ouro: 'Oro', diamante: 'Diamante', mestre: 'Maestro' },
    },
    en: {
      ranqueada: 'Ranked',
      subiu: 'Elo up!',
      caiu: 'Elo down',
      piso: 'League floor',
      subiuLiga: 'League up!',
      caiuLiga: 'League down',
      antes: 'Before',
      depois: 'After',
      pular: 'Skip',
      continuar: 'Continue',
      pts: 'pts',
      ligas: { bronze: 'Bronze', prata: 'Silver', ouro: 'Gold', diamante: 'Diamond', mestre: 'Master' },
    },
  };

  function idiomaAtual() {
    var lang = (document.documentElement.lang || navigator.language || 'pt').toLowerCase();
    if (lang.indexOf('es') === 0) return 'es';
    if (lang.indexOf('en') === 0) return 'en';
    return 'pt';
  }

  function ligaDe(pontos) {
    var p = Math.max(0, Number(pontos) || 0);
    if (p >= 700) return LIGAS[4];
    if (p >= 450) return LIGAS[3];
    if (p >= 250) return LIGAS[2];
    if (p >= 100) return LIGAS[1];
    return LIGAS[0];
  }

  function progressoNaLiga(pontos) {
    var p = Math.max(0, Number(pontos) || 0);
    var l = ligaDe(p);
    if (l.id === 'mestre') return 100;
    var span = Math.max(1, l.max - l.min);
    return Math.max(0, Math.min(100, ((p - l.min) / span) * 100));
  }

  function tocarSomElo(subiu) {
    try {
      var volApi = window.__mesaAudio;
      var fator = volApi && typeof volApi.volEfeitos === 'function' ? volApi.volEfeitos() : 1;
      if (fator <= 0) return;
      var pref = localStorage.getItem('mesa-audio-global-efeitos');
      if (pref === 'desligado') return;
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      var ctx = new AC();
      if (ctx.state === 'suspended') ctx.resume().catch(function () {});
      var dest = volApi && typeof volApi.destinoEfeitos === 'function' ? volApi.destinoEfeitos(ctx) : ctx.destination;
      var now = ctx.currentTime;
      var notas = subiu ? [523.25, 659.25, 783.99, 1046.5] : [392.0, 349.23, 293.66];
      var passo = subiu ? 0.075 : 0.11;
      for (var i = 0; i < notas.length; i++) {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = subiu ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(notas[i], now + i * passo);
        gain.gain.setValueAtTime(0.0001, now + i * passo);
        gain.gain.exponentialRampToValueAtTime(subiu ? 0.11 : 0.085, now + i * passo + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * passo + (subiu ? 0.28 : 0.3));
        osc.connect(gain);
        gain.connect(dest);
        osc.start(now + i * passo);
        osc.stop(now + i * passo + 0.34);
      }
      setTimeout(function () { ctx.close().catch(function () {}); }, 1300);
    } catch (_) {}
  }

  // ---- Motor leve de partículas em Canvas 2D (confetes 3D na subida, gotinhas/folhinhas na descida) ----
  function iniciarParticulasCanvas(canvas, subiu) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return function () {};
    }
    var ctx = canvas.getContext('2d');
    if (!ctx) return function () {};
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var coresSubida = ['#ffc93c', '#34d399', '#4aaeff', '#ff6b9d', '#a78bfa', '#fff0a8'];
    var coresDescida = ['#93c5fd', '#c4b5fd', '#fda4af', '#a5b4fc'];
    var itens = [];
    var cx = w / 2;
    var cy = h / 2 - 40;

    if (subiu) {
      for (var i = 0; i < 64; i++) {
        var lado = i % 2 === 0 ? -1 : 1;
        var ang = (lado < 0 ? -Math.PI * 0.72 : -Math.PI * 0.28) + (Math.random() - 0.5) * 0.75;
        var vel = 4.5 + Math.random() * 8.5;
        itens.push({
          x: cx + lado * (24 + Math.random() * 60),
          y: cy + (Math.random() - 0.5) * 40,
          vx: Math.cos(ang) * vel,
          vy: Math.sin(ang) * vel - 2.2,
          w: 7 + Math.random() * 6,
          h: 4 + Math.random() * 5,
          rot: Math.random() * Math.PI * 2,
          vrot: (Math.random() - 0.5) * 0.24,
          cor: coresSubida[i % coresSubida.length],
          estrela: i % 5 === 0,
          vida: 1,
        });
      }
    } else {
      for (var j = 0; j < 26; j++) {
        itens.push({
          x: cx + (Math.random() - 0.5) * 320,
          y: cy - 160 - Math.random() * 140,
          vx: (Math.random() - 0.5) * 0.6,
          vy: 1.4 + Math.random() * 1.9,
          fase: Math.random() * Math.PI * 2,
          tam: 4 + Math.random() * 4.5,
          cor: coresDescida[j % coresDescida.length],
          vida: 1,
        });
      }
    }

    var ativo = true;
    var raf = 0;

    function desenharEstrela(r) {
      ctx.beginPath();
      for (var k = 0; k < 5; k++) {
        var a = (k * 4 * Math.PI) / 5 - Math.PI / 2;
        var px = Math.cos(a) * r;
        var py = Math.sin(a) * r;
        if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    }

    function tick() {
      if (!ativo) return;
      ctx.clearRect(0, 0, w, h);
      var vivos = 0;
      for (var i = 0; i < itens.length; i++) {
        var p = itens[i];
        if (p.vida <= 0.02) continue;
        vivos++;
        if (subiu) {
          p.vy += 0.22;
          p.vx *= 0.985;
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.vrot;
          p.vida -= 0.0085;
          ctx.save();
          ctx.globalAlpha = Math.max(0, Math.min(1, p.vida));
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.cor;
          if (p.estrela) {
            desenharEstrela(p.w * 0.7);
          } else {
            ctx.scale(1, Math.cos(p.rot * 2) * 0.6 + 0.4);
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          }
          ctx.restore();
        } else {
          p.fase += 0.05;
          p.x += p.vx + Math.sin(p.fase) * 0.45;
          p.y += p.vy;
          p.vida -= 0.0065;
          ctx.save();
          ctx.globalAlpha = Math.max(0, Math.min(0.78, p.vida));
          ctx.fillStyle = p.cor;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.tam * 0.55, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      if (vivos > 0) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return function () {
      ativo = false;
      if (raf) cancelAnimationFrame(raf);
    };
  }

  // ---- Estado do overlay ativo ----
  var overlayAtivo = null;
  var rafContador = 0;
  var timerAuto = 0;
  var timerGarantia = 0;
  var pararCanvas = null;
  var listenerTecla = null;

  function fechar() {
    if (rafContador) { cancelAnimationFrame(rafContador); rafContador = 0; }
    if (timerAuto) { clearTimeout(timerAuto); timerAuto = 0; }
    if (timerGarantia) { clearTimeout(timerGarantia); timerGarantia = 0; }
    if (pararCanvas) { pararCanvas(); pararCanvas = null; }
    if (listenerTecla) {
      window.removeEventListener('keydown', listenerTecla, true);
      listenerTecla = null;
    }
    var el = overlayAtivo;
    overlayAtivo = null;
    if (!el) return;
    el.classList.remove('visivel');
    el.classList.add('saindo');
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 220);
  }

  function mostrar(opts) {
    if (!opts) return;
    fechar();

    var antes = Math.max(0, Math.round(Number(opts.antes) || 0));
    var depois = Math.max(0, Math.round(Number(opts.depois) || 0));
    var delta = typeof opts.delta === 'number' ? Math.round(opts.delta) : (depois - antes);
    var subiu = delta > 0;
    var piso = Boolean(opts.piso) || (delta === 0 && !subiu);
    var lang = idiomaAtual();
    var tx = TEXTOS[lang] || TEXTOS.pt;
    var nomesJogos = JOGOS_NOMES[lang] || JOGOS_NOMES.pt;
    var jogoId = opts.jogo || '';
    var nomeJogo = jogoId && nomesJogos[jogoId] ? nomesJogos[jogoId] : '';

    var ligaAntes = ligaDe(antes);
    var ligaDepois = ligaDe(depois);
    var mudouLiga = ligaAntes.id !== ligaDepois.id;

    var backdrop = document.createElement('div');
    backdrop.className = 'mesa-elo-backdrop';
    backdrop.setAttribute('role', 'dialog');
    backdrop.setAttribute('aria-modal', 'true');
    backdrop.setAttribute('aria-label', subiu ? tx.subiu : tx.caiu);

    var canvas = document.createElement('canvas');
    canvas.className = 'mesa-elo-canvas';
    backdrop.appendChild(canvas);

    var palco = document.createElement('div');
    palco.className = 'mesa-elo-palco ' + (subiu ? 'subiu' : 'caiu');

    if (subiu) {
      var halo = document.createElement('div');
      halo.className = 'mesa-elo-halo';
      palco.appendChild(halo);
    }

    // Mascote Lumi saltando do topo do cartão
    var lumiWrap = document.createElement('div');
    lumiWrap.className = 'mesa-elo-lumi-wrap';
    var lumiImg = document.createElement('img');
    lumiImg.className = 'mesa-elo-lumi';
    lumiImg.alt = 'Lumi';
    lumiImg.draggable = false;
    lumiImg.src = subiu ? '/mesa/arte/elo/lumi-subiu.png?v=2' : '/mesa/arte/elo/lumi-caiu.png?v=2';
    lumiWrap.appendChild(lumiImg);
    palco.appendChild(lumiWrap);

    var card = document.createElement('div');
    card.className = 'mesa-elo-card';

    // Pill com ícone 3D do minigame jogado
    var jogoPill = document.createElement('div');
    jogoPill.className = 'mesa-elo-jogo-pill';
    if (jogoId && JOGOS_ICONE[jogoId]) {
      var jImg = document.createElement('img');
      jImg.className = 'mesa-elo-jogo-icone';
      jImg.src = JOGOS_ICONE[jogoId];
      jImg.alt = '';
      jImg.draggable = false;
      jogoPill.appendChild(jImg);
    }
    var jTxt = document.createElement('span');
    jTxt.textContent = nomeJogo || tx.ranqueada;
    jogoPill.appendChild(jTxt);
    card.appendChild(jogoPill);

    // Botão Pular
    var btnPular = document.createElement('button');
    btnPular.type = 'button';
    btnPular.className = 'mesa-elo-pular';
    btnPular.textContent = tx.pular;
    btnPular.addEventListener('click', function (ev) {
      ev.stopPropagation();
      fechar();
    });
    card.appendChild(btnPular);

    // Faixa 3D do título (estilo Roleta da Mesa)
    var faixa = document.createElement('div');
    faixa.className = 'mesa-elo-faixa';
    faixa.textContent = mudouLiga
      ? (subiu ? tx.subiuLiga : tx.caiuLiga)
      : (subiu ? tx.subiu : (piso ? tx.piso : tx.caiu));
    card.appendChild(faixa);

    // Painel branco com emblema 3D da liga + Elo + barra
    var painel = document.createElement('div');
    painel.className = 'mesa-elo-painel';

    var embLinha = document.createElement('div');
    embLinha.className = 'mesa-elo-emblema-linha';

    var embBox = document.createElement('div');
    embBox.className = 'mesa-elo-emblema-box';
    var embImg = document.createElement('img');
    embImg.className = 'mesa-elo-emblema-img';
    embImg.alt = tx.ligas[ligaDepois.id] || ligaDepois.id;
    embImg.draggable = false;
    embImg.src = ligaDepois.img;
    embBox.appendChild(embImg);

    var ptsCol = document.createElement('div');
    ptsCol.className = 'mesa-elo-pontos-col';

    var ligaTxt = document.createElement('div');
    ligaTxt.className = 'mesa-elo-liga-txt';
    var ligaNome = document.createElement('span');
    ligaNome.textContent = tx.ligas[ligaDepois.id] || ligaDepois.id;
    ligaTxt.appendChild(ligaNome);
    if (mudouLiga) {
      var badgeLiga = document.createElement('span');
      badgeLiga.className = 'mesa-elo-liga-badge';
      badgeLiga.textContent = (tx.ligas[ligaAntes.id] || ligaAntes.id) + ' → ' + (tx.ligas[ligaDepois.id] || ligaDepois.id);
      ligaTxt.appendChild(badgeLiga);
    }

    var numLinha = document.createElement('div');
    numLinha.className = 'mesa-elo-numero-linha';
    var elValor = document.createElement('span');
    elValor.className = 'mesa-elo-valor';
    elValor.textContent = String(antes);
    var elDelta = document.createElement('span');
    elDelta.className = 'mesa-elo-delta';
    elDelta.textContent = delta > 0 ? '▲ +' + delta : delta < 0 ? '▼ ' + delta : '▼ 0';
    numLinha.appendChild(elValor);
    numLinha.appendChild(elDelta);

    ptsCol.appendChild(ligaTxt);
    ptsCol.appendChild(numLinha);

    embLinha.appendChild(embBox);
    embLinha.appendChild(ptsCol);
    painel.appendChild(embLinha);

    // Comparação Antes -> Depois
    var comp = document.createElement('div');
    comp.className = 'mesa-elo-comparacao';
    comp.innerHTML =
      '<span>' + tx.antes + ': <b>' + antes + '</b></span>' +
      '<span>→</span>' +
      '<span>' + tx.depois + ': <b>' + depois + '</b> ' + tx.pts + '</span>';
    painel.appendChild(comp);

    // Barra de progresso da liga
    var barraLabels = document.createElement('div');
    barraLabels.className = 'mesa-elo-barra-labels';
    barraLabels.innerHTML =
      '<span>' + (tx.ligas[ligaDepois.id] || ligaDepois.id) + '</span>' +
      '<span>' + (ligaDepois.id === 'mestre' ? depois + ' ' + tx.pts : depois + ' / ' + ligaDepois.max) + '</span>';
    var trilha = document.createElement('div');
    trilha.className = 'mesa-elo-barra-trilha';
    var fill = document.createElement('div');
    fill.className = 'mesa-elo-barra-fill';
    var pctInicial = mudouLiga ? (subiu ? 0 : 100) : progressoNaLiga(antes);
    var pctFinal = progressoNaLiga(depois);
    fill.style.width = pctInicial.toFixed(1) + '%';
    trilha.appendChild(fill);
    painel.appendChild(barraLabels);
    painel.appendChild(trilha);

    card.appendChild(painel);

    // Botão 3D Continuar
    var btnContinuar = document.createElement('button');
    btnContinuar.type = 'button';
    btnContinuar.className = 'mesa-elo-continuar';
    btnContinuar.textContent = tx.continuar;
    btnContinuar.addEventListener('click', function (ev) {
      ev.stopPropagation();
      fechar();
    });
    card.appendChild(btnContinuar);

    var durAuto = typeof opts.duracaoAutoMs === 'number' ? opts.duracaoAutoMs : 4200;
    if (durAuto > 0) {
      var timerBar = document.createElement('div');
      timerBar.className = 'mesa-elo-timer';
      timerBar.style.transition = 'transform ' + durAuto + 'ms linear';
      card.appendChild(timerBar);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          timerBar.style.transform = 'scaleX(0)';
        });
      });
    }

    palco.appendChild(card);
    backdrop.appendChild(palco);

    var animacaoConcluida = false;
    function concluirContagem() {
      if (animacaoConcluida) return;
      if (rafContador) { cancelAnimationFrame(rafContador); rafContador = 0; }
      animacaoConcluida = true;
      elValor.textContent = String(depois);
      fill.style.width = pctFinal.toFixed(1) + '%';
      elValor.classList.add('pulso');
      setTimeout(function () { elValor.classList.remove('pulso'); }, 260);
    }

    backdrop.addEventListener('click', function () {
      concluirContagem();
      fechar();
    });

    listenerTecla = function (ev) {
      if (ev.key === 'Escape' || ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        fechar();
      }
    };
    window.addEventListener('keydown', listenerTecla, true);

    document.body.appendChild(backdrop);
    overlayAtivo = backdrop;

    requestAnimationFrame(function () {
      backdrop.classList.add('visivel');
      pararCanvas = iniciarParticulasCanvas(canvas, subiu);
      setTimeout(function () {
        fill.style.width = pctFinal.toFixed(1) + '%';
      }, 220);
    });

    tocarSomElo(subiu);

    var inicio = performance.now();
    var durContagem = 920;
    function passo(agora) {
      var t = Math.min(1, (agora - inicio) / durContagem);
      var eased = 1 - Math.pow(1 - t, 3);
      var atual = Math.round(antes + (depois - antes) * eased);
      elValor.textContent = String(atual);
      if (t < 1) {
        rafContador = requestAnimationFrame(passo);
      } else {
        concluirContagem();
      }
    }
    rafContador = requestAnimationFrame(passo);
    timerGarantia = setTimeout(concluirContagem, durContagem + 120);

    if (durAuto > 0) {
      timerAuto = setTimeout(fechar, durAuto);
    }
  }

  // ---- Integração automática com todos os 11 minigames ranqueados ----
  function detectarFim(estado) {
    if (!estado) return null;
    if (estado.ludo && estado.ludo.vencedor !== null && estado.ludo.vencedor !== undefined) return 'ludo';
    if (estado.damas && estado.damas.fase === 'fim') return 'damas';
    if (estado.xadrez && estado.xadrez.fase === 'fim') return 'xadrez';
    if (estado.botao && estado.botao.fase === 'fim') return 'botao';
    if (estado.truco && estado.truco.fase === 'fim') return 'truco';
    if (estado.cartas && estado.cartas.fase === 'fim') return 'cartas';
    if (estado.jogo && estado.jogo.fase === 'fim-de-jogo') return 'domino';
    if (estado.gartic && estado.gartic.fase === 'fim') return 'gartic';
    if (estado.bomb && estado.bomb.fase === 'fim') return 'bomb';
    if (estado.artilharia && estado.artilharia.fase === 'fim') return 'artilharia';
    if (estado.stop && estado.stop.fase === 'fim') return 'stop';
    return null;
  }

  function contaAtual() {
    try {
      var api = window.__mesaConta;
      if (!api) return null;
      var perfil = api.perfil && api.perfil();
      var base = api.base && api.base();
      if (!perfil || perfil.visitante || !perfil.code || !base) return null;
      return { code: perfil.code, base: base };
    } catch (_) {
      return null;
    }
  }

  function buscarSnapshotElo() {
    var c = contaAtual();
    if (!c) return Promise.resolve(null);
    return fetch(c.base + '/ranking?jogo=rankeado&code=' + encodeURIComponent(c.code))
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d) return null;
        var eu = d.eu || (Array.isArray(d.top) ? d.top.find(function (x) { return x && x.code === c.code; }) : null);
        return {
          pontos: eu ? (Number(eu.pontos) || 0) : 0,
          v: eu ? (Number(eu.v) || 0) : 0,
          p: eu ? (Number(eu.p) || 0) : 0,
        };
      })
      .catch(function () { return null; });
  }

  function estaEmLobby(estado) {
    if (!estado) return false;
    return !estado.ludo && !estado.damas && !estado.xadrez && !estado.botao &&
      !estado.truco && !estado.cartas && !estado.jogo && !estado.gartic &&
      !estado.bomb && !estado.artilharia && !estado.stop && !estado.sinuca;
  }

  var mesaAtual = '';
  var promessaAntes = null;
  var disparadoMesa = '';
  var canceladorPoll = 0;
  var pendenteExibicao = null; // { payload } ou { codigo, jogo, promessaAntes }

  function exibirQuandoSair() {
    var pend = pendenteExibicao;
    if (!pend) return;
    pendenteExibicao = null;

    if (pend.payload) {
      var dado = pend.payload;
      setTimeout(function () { mostrar(dado); }, 280);
      return;
    }

    // Jogador saiu antes do polling terminar: resolve rápido já na sala/home
    var tokenSaida = ++canceladorPoll;
    var atrasos = [260, 550, 950];
    Promise.resolve(pend.promessaAntes).then(function (antes) {
      if (!antes || tokenSaida !== canceladorPoll) return;
      var tentativa = 0;
      function checarSaida() {
        if (tokenSaida !== canceladorPoll) return;
        buscarSnapshotElo().then(function (depois) {
          if (tokenSaida !== canceladorPoll) return;
          if (depois && (depois.pontos !== antes.pontos || depois.p > antes.p)) {
            var delta = depois.pontos - antes.pontos;
            mostrar({
              antes: antes.pontos,
              depois: depois.pontos,
              delta: delta,
              jogo: pend.jogo,
              piso: delta === 0 && depois.p > antes.p,
            });
            return;
          }
          if (tentativa < atrasos.length) {
            setTimeout(checarSaida, atrasos[tentativa++]);
          }
        });
      }
      setTimeout(checarSaida, atrasos[tentativa++]);
    });
  }

  function aoSair() {
    mesaAtual = '';
    promessaAntes = null;
    if (pendenteExibicao) {
      exibirQuandoSair();
    } else {
      canceladorPoll++;
    }
  }

  function aoEstado(atual, anterior, codigoMesa, modoEntrada) {
    if (!atual || atual.espectador) return;

    // Se havia Elo pendente e o jogador voltou para a sala/lobby da mesa (ex.: "Voltar à mesa"), exibe agora
    if (pendenteExibicao && estaEmLobby(atual) && !estaEmLobby(anterior)) {
      exibirQuandoSair();
      return;
    }

    var modo = modoEntrada || '';
    if (modo !== 'rankeado') return;
    if (!contaAtual()) return;

    var codigo = String(codigoMesa || '');
    if (!codigo) return;

    if (mesaAtual !== codigo) {
      mesaAtual = codigo;
      promessaAntes = buscarSnapshotElo();
      canceladorPoll++;
    }

    var jogoFim = detectarFim(atual);
    if (!jogoFim) return;
    if (disparadoMesa === codigo) return;
    var estavaFim = Boolean(detectarFim(anterior));
    if (estavaFim) return;

    // Guarda o resultado em segundo plano; NÃO exibe durante a partida (só ao sair para sala ou home)
    disparadoMesa = codigo;
    pendenteExibicao = { codigo: codigo, jogo: jogoFim, promessaAntes: promessaAntes, payload: null };
    var tokenPoll = ++canceladorPoll;
    var atrasos = [350, 650, 1000, 1500];

    Promise.resolve(promessaAntes).then(function (antes) {
      if (!antes || tokenPoll !== canceladorPoll) return;
      var tentativa = 0;

      function checar() {
        if (tokenPoll !== canceladorPoll) return;
        buscarSnapshotElo().then(function (depois) {
          if (tokenPoll !== canceladorPoll) return;
          if (depois && (depois.pontos !== antes.pontos || depois.p > antes.p)) {
            var delta = depois.pontos - antes.pontos;
            var payload = {
              antes: antes.pontos,
              depois: depois.pontos,
              delta: delta,
              jogo: jogoFim,
              piso: delta === 0 && depois.p > antes.p,
            };
            if (pendenteExibicao && pendenteExibicao.codigo === codigo) {
              pendenteExibicao.payload = payload;
            }
            return;
          }
          if (tentativa < atrasos.length) {
            var espera = atrasos[tentativa++];
            setTimeout(checar, espera);
          }
        });
      }

      setTimeout(checar, atrasos[tentativa++]);
    });
  }

  var api = {
    mostrar: mostrar,
    fechar: fechar,
    aoEstado: aoEstado,
    aoSair: aoSair,
    detectarFim: detectarFim,
    ligaDe: ligaDe,
    _pendente: function () { return pendenteExibicao; },
  };

  window.__mesaElo = api;
  window.MesaElo = api;
})();
