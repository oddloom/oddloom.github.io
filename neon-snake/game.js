// Tela, input, menus e loop. As regras ficam em logic.js e os sons em sound.js.
(function () {
  const COLS = 20;
  const ROWS = 32; // em pé, bom pra gravar vídeo vertical
  const L = window.SnakeLogic;
  const S = window.Sound;

  const RED = '#e0245e';
  const BLUE = '#3b8cff';
  const GOLD = '#ffcc33';
  const GRAY_SNAKE = { head: [190, 190, 190], body: [128, 128, 128] };
  const GRAY_HUD = [154, 154, 154];

  // ---------- skins ----------
  // Cada peça visual é uma lista de opções. Skin nova = mais um item na lista.
  const SNAKE_COLORS = [
    { id: 'verde', head: [170, 255, 180], body: [46, 214, 72] },
    { id: 'ciano', head: [190, 250, 255], body: [0, 196, 232] },
    { id: 'rosa', head: [255, 200, 228], body: [255, 64, 160] },
    { id: 'laranja', head: [255, 224, 176], body: [255, 140, 26] },
    { id: 'roxo', head: [224, 200, 255], body: [150, 84, 255] },
    { id: 'amarelo', head: [255, 250, 190], body: [240, 210, 40] },
    { id: 'branco', head: [255, 255, 255], body: [215, 215, 215] },
  ];

  const APPLE = [ // maçã em pixel art 6x6: r = casca, w = brilho, l = folha, t = cabo
    '...tl.',
    '.rrtr.',
    'rwrrrr',
    'rwrrrr',
    'rrrrrr',
    '.rrrr.',
  ];
  const FOODS = [
    {
      id: 'classica', name: 'CLÁSSICA',
      draw(c, x, y, s, t) {
        const k = 0.78 + 0.06 * Math.sin(t / 180);
        const d = (s * (1 - k)) / 2;
        c.fillStyle = RED;
        c.fillRect(x + d, y + d, s * k, s * k);
      },
    },
    {
      id: 'maca', name: 'MAÇÃ',
      draw(c, x, y, s, t) {
        const bob = Math.sin(t / 220) * s * 0.04;
        pixelArt(c, APPLE, { r: '#ff3b3b', w: '#ffc2c2', l: '#5fd35f', t: '#8a5a2b' }, x, y + bob, s);
      },
    },
  ];

  const BOARDS = [
    {
      id: 'classico', name: 'CLÁSSICO',
      bgGray: [0, 0, 0], bgTop: [0, 0, 0], bgBottom: [0, 0, 0],
      gridGray: [34, 34, 34], grid: [16, 58, 20], gridAlpha: 1, sun: false,
    },
    {
      id: 'synth', name: 'SYNTHWAVE',
      bgGray: [12, 12, 14], bgTop: [18, 0, 42], bgBottom: [74, 0, 84],
      gridGray: [44, 44, 48], grid: [255, 60, 175], gridAlpha: 0.45, sun: true,
    },
  ];

  // Fases: cenário próprio de cada uma. A fase 1 usa o cenário escolhido em Personalizar.
  const PHASES = [
    { name: 'FLIPERAMA', board: null },
    { name: 'DESERTO', danger: 'flechas', board: {
      bgGray: [12, 12, 12], bgTop: [44, 28, 8], bgBottom: [96, 60, 20],
      gridGray: [40, 40, 40], grid: [210, 160, 80], gridAlpha: 0.3, sun: false } },
    { name: 'CAVERNA', danger: 'morcegos', board: {
      bgGray: [8, 8, 8], bgTop: [4, 6, 14], bgBottom: [18, 22, 40],
      gridGray: [36, 36, 36], grid: [90, 110, 170], gridAlpha: 0.35, sun: false } },
    { name: 'VULCÃO', danger: 'rochas', board: {
      bgGray: [10, 10, 10], bgTop: [22, 2, 0], bgBottom: [84, 16, 0],
      gridGray: [40, 40, 40], grid: [255, 100, 30], gridAlpha: 0.3, sun: false } },
    { name: 'CAOS', danger: 'tudo junto', board: null }, // usa o synthwave
  ];

  const BAT = [ // morcego 8x5 em dois quadros (asa em cima / embaixo)
    ['b......b', 'bb.bb.bb', '.bbbbbb.', '..beeb..', '...bb...'],
    ['........', '...bb...', '.bbeebb.', 'bbbbbbbb', 'b..bb..b'],
  ];
  const ROCK = [
    '..gg..',
    '.gggh.',
    'gggggh',
    'gdgggg',
    'gddggg',
    '.dddd.',
  ];

  const MUSH = [ // cogumelo em pixel art 6x6: c = chapéu, w = pinta, s = cabo
    '.cccc.',
    'cwcccc',
    'cccwcc',
    'cccccc',
    '..ss..',
    '..ss..',
  ];

  function pixelArt(c, rows, pal, x, y, s) {
    const px = s / rows[0].length;
    rows.forEach((row, yy) => [...row].forEach((ch, xx) => {
      if (ch === '.') return;
      c.fillStyle = pal[ch];
      c.fillRect(x + xx * px, y + yy * px, Math.ceil(px), Math.ceil(px));
    }));
  }

  function drawMushroom(c, x, y, s, t, gold) {
    if (gold) { c.shadowColor = GOLD; c.shadowBlur = 12 + 6 * Math.sin(t / 120); }
    pixelArt(c, MUSH, gold
      ? { c: GOLD, w: '#fff6c8', s: '#c99a2e' }
      : { c: '#ff4b3e', w: '#ffffff', s: '#f2d9b3' }, x, y, s);
    c.shadowBlur = 0;
  }

  function drawBoost(c, x, y, s, t) {
    const pulse = 0.8 + 0.2 * Math.sin(t / 120);
    c.save();
    c.translate(x + s / 2, y + s / 2);
    c.rotate(Math.PI / 4);
    c.shadowColor = BLUE;
    c.shadowBlur = 14;
    c.fillStyle = BLUE;
    const q = s * 0.55 * pulse;
    c.fillRect(-q / 2, -q / 2, q, q);
    c.restore();
  }

  function drawCoin(c, x, y, s, t) {
    const spin = Math.abs(Math.cos(t / 200 + x));
    c.fillStyle = GOLD;
    c.beginPath();
    c.ellipse(x + s / 2, y + s / 2, Math.max(1, s * 0.3 * spin), s * 0.3, 0, 0, Math.PI * 2);
    c.fill();
  }

  // fundo + grade. k = quanto de cor (0 cinza, 1 cor total)
  function paintBoard(c, b, w, h, cs, k, t, frenzy) {
    const top = mix(b.bgGray, b.bgTop, k), bot = mix(b.bgGray, b.bgBottom, k);
    if (top.join() === bot.join()) c.fillStyle = rgba(top);
    else {
      const g = c.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, rgba(top));
      g.addColorStop(1, rgba(bot));
      c.fillStyle = g;
    }
    c.fillRect(-10, -10, w + 20, h + 20);
    if (b.sun && k > 0) {
      // sol listrado do synthwave, aparece junto com a cor
      const r = w * 0.28, cx = w / 2, cy = h * 0.3;
      const g = c.createLinearGradient(0, cy - r, 0, cy + r);
      g.addColorStop(0, `rgba(255,214,90,${0.5 * k})`);
      g.addColorStop(1, `rgba(255,50,140,${0.5 * k})`);
      c.fillStyle = g;
      c.beginPath();
      c.arc(cx, cy, r, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = rgba(mix(b.bgGray, b.bgTop, k));
      for (let i = 0; i < 5; i++) c.fillRect(cx - r, cy + r * (0.15 + i * 0.18), r * 2, r * 0.05 + i * 1.2);
    }
    c.strokeStyle = frenzy ? `hsla(${(t / 6) % 360}, 80%, 40%, 0.8)` : rgba(mix(b.gridGray, b.grid, k), b.gridAlpha);
    c.lineWidth = 1;
    c.beginPath();
    for (let x = 0; x <= w + 0.5; x += cs) { c.moveTo(Math.round(x) + 0.5, 0); c.lineTo(Math.round(x) + 0.5, h); }
    for (let y = 0; y <= h + 0.5; y += cs) { c.moveTo(0, Math.round(y) + 0.5); c.lineTo(w, Math.round(y) + 0.5); }
    c.stroke();
  }

  // ---------- elementos ----------
  const canvas = document.getElementById('c');
  const ctx = canvas.getContext('2d');
  const $ = (id) => document.getElementById(id);
  const hud = {
    score: $('score'), best: $('best'), speed: $('speed'), status: $('status'),
    combo: $('combo'), comboBar: $('combo').firstElementChild, meter: $('meter'),
    sound: $('btn-sound'), pause: $('btn-pause'),
  };
  const ov = $('overlay');
  const screens = { main: $('scr-main'), msg: $('scr-msg'), records: $('scr-records'), custom: $('scr-custom') };
  for (let i = 0; i < 6; i++) hud.meter.appendChild(document.createElement('i'));

  // ---------- armazenamento local ----------
  function loadJSON(key, fallback) {
    try { const v = JSON.parse(localStorage.getItem(key)); return v == null ? fallback : v; } catch (e) { return fallback; }
  }
  function saveJSON(key, v) {
    try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) {}
  }
  function today() {
    const d = new Date();
    return {
      key: d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate(),
      label: String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0'),
    };
  }
  const dailyKey = () => 'neonsnake.daily.' + today().key;
  function loadTop() {
    let top = loadJSON('neonsnake.top', null);
    if (!Array.isArray(top)) {
      const old = loadJSON('neonsnake.best', 0); // recorde da versão anterior
      top = old > 0 ? [{ s: old, d: '--' }] : [];
    }
    return top;
  }
  const loadStats = () => Object.assign({ games: 0, bestCombo: 0, maxMush: 0, near: 0, coins: 0, maxPhase: 0, cuts: 0 }, loadJSON('neonsnake.stats', {}));

  const skin = Object.assign({ color: 'verde', food: 'classica', board: 'classico' }, loadJSON('neonsnake.skin', {}));
  const pickById = (list, id) => list.find((o) => o.id === id) || list[0];
  const cur = () => ({ color: pickById(SNAKE_COLORS, skin.color), food: pickById(FOODS, skin.food), board: pickById(BOARDS, skin.board) });
  function phaseBoard() {
    const ph = L.phase(game);
    if (ph === 0) return cur().board;
    return PHASES[ph].board || pickById(BOARDS, 'synth');
  }

  // ---------- estado ----------
  const game = L.createGame(COLS, ROWS);
  let state = 'menu'; // menu | play | pause | over
  let mode = 'normal'; // normal | daily
  let best = 0;
  let cell = 16;
  let acc = 0;
  let last = 0;
  let shake = 0;
  let slowmo = 0;
  let beatN = 0;
  let runMaxCombo = 0;
  let runCoins = 0;
  let prevSnake = null;
  let particles = [];
  let waves = [];
  let toasts = [];
  let statusText = null;

  function loadBest() {
    best = mode === 'daily' ? loadJSON(dailyKey(), 0) : ((loadTop()[0] || {}).s || 0);
  }

  // ---------- cor ----------
  const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a == null ? 1 : a})`;
  function palette() {
    const k = Math.min(1, game.color);
    const sc = cur().color;
    return {
      k,
      head: mix(GRAY_SNAKE.head, sc.head, k),
      body: mix(GRAY_SNAKE.body, sc.body, k),
      hud: mix(GRAY_HUD, mix(sc.body, [255, 255, 255], 0.2), k),
      rainbow: game.mushrooms > 6 || game.frenzyLeft > 0,
    };
  }

  // ---------- tamanho da tela ----------
  function resize() {
    const hudH = 64;
    const vw = document.documentElement.clientWidth || window.innerWidth;
    const vh = document.documentElement.clientHeight || window.innerHeight;
    cell = Math.max(8, Math.floor(Math.min(Math.min(vw - 16, 560) / COLS, (vh - hudH - 12) / ROWS)));
    const w = cell * COLS, h = cell * ROWS;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    $('hud').style.width = w + 'px';
    draw(performance.now());
  }
  window.addEventListener('resize', resize);

  // ---------- telas do menu ----------
  function showScreen(name) {
    for (const k in screens) screens[k].hidden = k !== name;
    ov.hidden = false;
    ov.scrollTop = 0;
  }

  function showMessage(title, score, text, buttons, dead) {
    $('ov-title').textContent = title;
    $('ov-title').classList.toggle('dead', !!dead);
    $('ov-score').textContent = score;
    $('ov-text').textContent = text;
    const box = $('msg-btns');
    box.innerHTML = '';
    for (const [label, action, cls] of buttons) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn' + (cls ? ' ' + cls : '');
      b.textContent = label;
      b.dataset.action = action;
      box.appendChild(b);
    }
    showScreen('msg');
  }

  function goMenu() {
    state = 'menu';
    mode = 'normal';
    L.reset(game, Math.random);
    prevSnake = null;
    loadBest();
    updateHud();
    showScreen('main');
  }

  function showRecords() {
    const top = loadTop();
    const list = $('rec-list');
    list.innerHTML = '';
    if (!top.length) {
      const e = document.createElement('span');
      e.className = 'empty';
      e.textContent = 'nenhuma partida ainda';
      list.appendChild(e);
    }
    top.forEach((r, i) => {
      for (const [cls, txt] of [['n', i + 1 + '.'], ['', r.d], ['s', r.s]]) {
        const el = document.createElement('span');
        if (cls) el.className = cls;
        el.textContent = txt;
        list.appendChild(el);
      }
    });
    const st = loadStats();
    const rows = [
      ['desafio de hoje (' + today().label + ')', loadJSON(dailyKey(), 0)],
      ['partidas jogadas', st.games],
      ['maior combo', st.bestCombo ? 'x' + st.bestCombo : '-'],
      ['fase mais longe', (st.maxPhase + 1) + ' · ' + PHASES[st.maxPhase].name],
      ['mais cogumelos numa partida', st.maxMush],
      ['raspadas no total', st.near],
      ['moedas no total', st.coins],
      ['rabos cortados', st.cuts],
    ];
    const box = $('rec-stats');
    box.innerHTML = '';
    for (const [a, b] of rows) {
      for (const txt of [a, b]) {
        const el = document.createElement('span');
        el.textContent = txt;
        box.appendChild(el);
      }
    }
    showScreen('records');
  }

  // ---------- personalizar ----------
  function buildCustom() {
    const colorBox = $('opt-color');
    colorBox.innerHTML = '';
    for (const c of SNAKE_COLORS) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'swatch' + (c.id === skin.color ? ' sel' : '');
      b.style.background = rgba(c.body);
      b.setAttribute('aria-label', 'cobra ' + c.id);
      b.addEventListener('click', () => setSkin('color', c.id));
      colorBox.appendChild(b);
    }
    for (const [boxId, list, key] of [['opt-food', FOODS, 'food'], ['opt-board', BOARDS, 'board']]) {
      const box = $(boxId);
      box.innerHTML = '';
      for (const o of list) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'opt' + (o.id === skin[key] ? ' sel' : '');
        b.textContent = o.name;
        b.addEventListener('click', () => setSkin(key, o.id));
        box.appendChild(b);
      }
    }
    drawPreview(performance.now());
  }

  function setSkin(key, id) {
    skin[key] = id;
    saveJSON('neonsnake.skin', skin);
    buildCustom();
    updateHud();
  }

  // amostra: como fica com a cor total
  const preview = $('preview');
  const pctx = preview.getContext('2d');
  function drawPreview(t) {
    const cs = 16, w = cs * 15, h = cs * 6;
    const dpr = window.devicePixelRatio || 1;
    if (preview.width !== w * dpr) {
      preview.width = w * dpr; preview.height = h * dpr;
      preview.style.width = w + 'px'; preview.style.height = h + 'px';
    }
    pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const c = cur();
    paintBoard(pctx, c.board, w, h, cs, 1, t, false);
    const y = cs * 3, W = cs * 0.7;
    const x0 = cs * 1.5, x1 = cs * 9.5;
    const g = pctx.createLinearGradient(x0, 0, x1 + W / 2, 0);
    g.addColorStop(0, rgba(c.color.body, 0));
    g.addColorStop(0.85, rgba(c.color.body, 0.9));
    g.addColorStop(1, rgba(c.color.head, 1));
    pctx.fillStyle = g;
    pctx.fillRect(x0, y - W / 2, x1 + W / 2 - x0, W);
    c.food.draw(pctx, cs * 12, y - cs / 2, cs, t);
  }

  // ---------- partida ----------
  // Atalho de teste: link terminando em #fase3 começa direto na fase 3 (não salva recorde).
  const testPhase = (() => {
    const m = /^#fase([1-5])$/.exec(location.hash || '');
    return m ? parseInt(m[1], 10) - 1 : 0;
  })();

  function start(m) {
    mode = m || 'normal';
    L.reset(game, mode === 'daily' ? L.seedRng(today().key) : Math.random);
    if (testPhase && mode === 'normal') {
      game.eaten = testPhase * L.PHASE_EVERY;
      game.tickMs = Math.max(55, 150 - game.eaten * 3);
      game.hazardTimer = 300;
    }
    loadBest();
    particles = []; waves = []; toasts = [];
    acc = 0; slowmo = 0; beatN = 0; runMaxCombo = 0; runCoins = 0; prevSnake = null;
    revived = false; pendingSave = false; freeze = 0;
    state = 'play';
    ov.hidden = true;
    S.ensure();
    S.start();
    updateHud();
  }

  function pause() {
    if (state === 'play') {
      state = 'pause';
      showMessage('PAUSA', '', '', [['CONTINUAR', 'resume'], ['MENU', 'menu', 'quiet']]);
    } else if (state === 'pause') {
      state = 'play';
      ov.hidden = true;
    }
  }

  const CAUSES = {
    wall: 'bateu na parede', self: 'bateu no próprio corpo', rock: 'bateu numa rocha',
    arrow: 'flechada na cabeça', bat: 'pego por um morcego',
  };

  // Recorde só é gravado quando a partida acaba de vez: se o jogador ainda
  // pode continuar pelo anúncio, espera ele sair da tela de game over.
  let revived = false;
  let pendingSave = false;
  let freeze = 0;

  function gameOver(win, cause) {
    state = 'over';
    shake = win ? 0 : 1;
    S.die();
    const record = !testPhase && game.score > 0 && game.score > best;
    pendingSave = !testPhase;
    const canContinue = !win && !revived;
    if (!canContinue) commitRun();
    finishRun(record, win, cause, canContinue);
  }

  function commitRun() {
    if (!pendingSave) return;
    pendingSave = false;
    saveRun(loadStats());
  }

  function doRevive() {
    if (state !== 'over') return;
    pendingSave = false; // a partida continua; grava no próximo game over
    revived = true;
    L.revive(game);
    state = 'play';
    ov.hidden = true;
    freeze = 1200;
    acc = 0;
    prevSnake = null;
    toast('VOLTOU!', '#ffffff');
    S.start();
    updateHud();
  }

  // recomeçar a partir do game over passa pelo anúncio entre partidas
  function again(m) {
    commitRun();
    Ads.interstitial(() => start(m));
  }

  Ads.setHooks({ pause: () => S.hold(true), resume: () => S.hold(false) });

  function saveRun(st) {
    st.maxPhase = Math.max(st.maxPhase, L.phase(game));
    st.cuts += game.cuts;
    st.games++;
    st.bestCombo = Math.max(st.bestCombo, runMaxCombo);
    st.maxMush = Math.max(st.maxMush, game.mushrooms);
    st.near += game.nearMisses;
    st.coins += runCoins;
    saveJSON('neonsnake.stats', st);

    if (mode === 'daily') {
      if (game.score > loadJSON(dailyKey(), 0)) saveJSON(dailyKey(), game.score);
    } else if (game.score > 0) {
      const top = loadTop();
      top.push({ s: game.score, d: today().label });
      top.sort((a, b) => b.s - a.s);
      saveJSON('neonsnake.top', top.slice(0, 5));
    }
  }

  function finishRun(record, win, cause, canContinue) {
    if (record) { best = game.score; S.record(); }
    updateHud();

    setTimeout(() => {
      if (state !== 'over') return; // já reiniciou antes do aviso aparecer
      const sub = (mode === 'daily' ? 'DESAFIO ' + today().label + '\n' : '') + 'SCORE ' + game.score;
      const ph = L.phase(game);
      const info = (CAUSES[cause] ? CAUSES[cause] + ' · ' : '') + 'fase ' + (ph + 1) + ' ' + PHASES[ph].name.toLowerCase() +
        '\n' + (record ? 'novo recorde!' : 'recorde: ' + best) +
        '\n' + game.eaten + ' comidas · ' + game.mushrooms + ' cogumelos · ' + game.nearMisses + ' raspadas';
      showMessage(win ? 'VOCÊ ZEROU' : 'GAME OVER', sub, info, mode === 'daily'
        ? [['DE NOVO', 'daily'], ['COPIAR RESULTADO', 'share', 'alt'], ['MENU', 'menu', 'quiet']]
        : [['DE NOVO', 'normal'], ['MENU', 'menu', 'quiet']], !win);
      if (!canContinue) return;
      // o botão só aparece se o Google tiver um anúncio pronto
      Ads.offerReward({
        onAvailable(show) {
          if (state !== 'over') return;
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'btn alt';
          b.textContent = 'CONTINUAR · VER ANÚNCIO';
          b.addEventListener('click', () => { b.disabled = true; show(); });
          $('msg-btns').prepend(b);
        },
        onReward: doRevive,
      });
    }, 500);
  }

  function share(btn) {
    const text = 'Neon Snake · desafio de ' + today().label + '\n' +
      game.score + ' pontos · ' + game.eaten + ' comidas · ' + game.mushrooms + ' cogumelos';
    const done = () => { btn.textContent = 'COPIADO'; };
    const fail = () => { $('ov-text').textContent = text; btn.textContent = 'COPIE O TEXTO ACIMA'; };
    try { navigator.clipboard.writeText(text).then(done, fail); } catch (e) { fail(); }
  }

  // um único ouvinte pra todos os botões do menu
  ov.addEventListener('click', (e) => {
    const b = e.target.closest('[data-action]');
    if (!b) return;
    const a = b.dataset.action;
    if (a === 'normal' || a === 'daily') { if (state === 'over') again(a); else start(a); }
    else if (a === 'resume') pause();
    else if (a === 'menu') { commitRun(); goMenu(); }
    else if (a === 'records') showRecords();
    else if (a === 'custom') { buildCustom(); showScreen('custom'); }
    else if (a === 'share') share(b);
  });
  hud.pause.addEventListener('click', pause);
  hud.sound.addEventListener('click', () => { S.ensure(); S.toggle(); updateHud(); });

  function updateHud() {
    const p = palette();
    document.documentElement.style.setProperty('--hud', rgba(p.hud));
    hud.score.textContent = game.score;
    hud.best.textContent = best;
    hud.speed.textContent = L.speed(game);
    hud.sound.textContent = S.muted ? 'MUDO' : 'SOM';
    [...hud.meter.children].forEach((el, i) => el.classList.toggle('on', i < game.mushrooms));
  }

  // status do meio: moedas > turbo > combo
  function updateStatus() {
    let text = '', cls = '';
    if (game.frenzyLeft > 0) { text = 'MOEDAS ' + Math.ceil(game.frenzyLeft / 1000) + 's'; cls = 'gold'; }
    else if (game.boostLeft > 0) { text = 'TURBO 2x'; cls = 'turbo'; }
    else if (game.combo >= 2) text = 'COMBO x' + game.combo;
    else if (state === 'play') text = 'FASE ' + (L.phase(game) + 1);
    if (text !== statusText) {
      statusText = text;
      hud.status.textContent = text;
      hud.status.className = cls;
      hud.speed.textContent = L.speed(game);
    }
    const on = game.comboLeft > 0 && state === 'play';
    hud.combo.classList.toggle('on', on);
    if (on) hud.comboBar.style.width = (100 * game.comboLeft / L.COMBO_WINDOW) + '%';
  }

  // ---------- input ----------
  const KEYS = {
    ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down',
    ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right',
  };
  window.addEventListener('keydown', (e) => {
    if (KEYS[e.code]) {
      if (state === 'play') { e.preventDefault(); L.turn(game, KEYS[e.code]); }
    } else if (e.code === 'Escape' || e.code === 'KeyP') {
      pause();
    } else if (e.code === 'Space' || e.code === 'Enter') {
      if (document.activeElement && document.activeElement.tagName === 'BUTTON') return;
      e.preventDefault();
      if (state === 'pause') pause();
      else if (state === 'over') again(mode);
      else if (state === 'menu' && !screens.main.hidden) start('normal');
    }
  });

  // Swipe: vira assim que o dedo anda o bastante, sem esperar soltar.
  let touch = null;
  window.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    touch = { x: e.clientX, y: e.clientY };
  });
  window.addEventListener('pointermove', (e) => {
    if (!touch || state !== 'play') return;
    const dx = e.clientX - touch.x, dy = e.clientY - touch.y;
    const min = Math.max(18, cell);
    if (Math.abs(dx) < min && Math.abs(dy) < min) return;
    const d = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
    L.turn(game, d);
    touch = { x: e.clientX, y: e.clientY }; // várias curvas no mesmo arraste
  });
  window.addEventListener('pointerup', () => { touch = null; });
  window.addEventListener('pointercancel', () => { touch = null; });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) return;
    if (state === 'play') pause();
    if (state === 'over') commitRun(); // fechou o app na tela de game over: grava assim mesmo
  });

  // ---------- efeitos ----------
  const center = (at) => ({ x: (at.x + 0.5) * cell, y: (at.y + 0.5) * cell });
  function burst(at, color, n) {
    const c = center(at);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, sp = 40 + Math.random() * 140;
      particles.push({ x: c.x, y: c.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0.5, color });
    }
  }
  function toast(text, color) {
    toasts = toasts.slice(-2);
    toasts.push({ text, color, life: 1.2 });
  }

  // eventos dos perigos (flechas, morcegos, rochas)
  function handleHazard(ev) {
    if (CAUSES[ev.type]) { gameOver(false, ev.type); return; }
    if (ev.type === 'spawn') {
      if (ev.kind === 'arrow') S.warn();
      else if (ev.kind === 'bat') S.bat();
    } else if (ev.type === 'arrowGo') {
      S.arrow();
    } else if (ev.type === 'rockLand') {
      S.thud();
      shake = Math.max(shake, 0.35);
      burst(ev.at, '#8a8a8a', 10);
    } else if (ev.type === 'cut') {
      S.cut();
      burst(ev.at, rgba(palette().body), 14);
      toast('CORTOU -' + ev.lost, RED);
      // o desenho liso usa a posição anterior; corta ela junto
      if (prevSnake) prevSnake = prevSnake.slice(0, game.snake.length + 1);
    }
  }

  function handle(r) {
    if (CAUSES[r.type]) { gameOver(false, r.type); return; }
    if (r.type === 'win') { updateHud(); gameOver(true); return; }
    S.beat(beatN++);
    runMaxCombo = Math.max(runMaxCombo, r.combo || 0);
    if (r.nearMiss) {
      slowmo = 0.45;
      S.near();
      toast('RASPOU! +15', '#ffffff');
    }
    if (r.type === 'eat') {
      burst(r.at, RED, 10);
      S.eat(r.combo);
      if (r.combo >= 2) toast('COMBO x' + r.combo, rgba(palette().hud));
      if (r.phase != null) {
        const ph = PHASES[r.phase];
        S.phase();
        const c = center(r.at);
        waves.push({ x: c.x, y: c.y, r: 0, life: 1 });
        toast('FASE ' + (r.phase + 1) + ' ' + ph.name, '#ffffff');
        toast('cuidado: ' + ph.danger, RED);
      }
    } else if (r.type === 'coin') {
      runCoins++;
      burst(r.at, GOLD, 6);
      S.coin();
    } else if (r.type === 'mushroom') {
      const c = center(r.at);
      waves.push({ x: c.x, y: c.y, r: 0, life: 0.8 });
      S.mushroom();
      toast(game.mushrooms === 6 ? 'COR TOTAL' : game.mushrooms > 6 ? 'ARCO-ÍRIS' : '+COR', rgba(palette().hud));
    } else if (r.type === 'boost') {
      burst(r.at, BLUE, 16);
      S.boost();
      toast('TURBO', BLUE);
    } else if (r.type === 'gold') {
      burst(r.at, GOLD, 24);
      S.gold();
      toast('CHUVA DE MOEDAS', GOLD);
    }
    updateHud();
  }

  // ---------- loop ----------
  function frame(t) {
    const real = Math.min(0.05, (t - last) / 1000 || 0);
    last = t;
    slowmo = Math.max(0, slowmo - real);
    const dt = real * (slowmo > 0 ? 0.35 : 1); // câmera lenta depois de uma raspada
    if (state === 'play' && freeze > 0) {
      freeze -= real * 1000; // respiro depois de continuar
    } else if (state === 'play') {
      acc += dt * 1000;
      while (state === 'play' && acc >= L.interval(game)) {
        acc -= L.interval(game);
        prevSnake = game.snake.map((s) => ({ x: s.x, y: s.y }));
        handle(L.step(game));
      }
      if (state === 'play') for (const ev of L.advance(game, dt * 1000)) handleHazard(ev);
    }
    for (const p of particles) { p.x += p.vx * real; p.y += p.vy * real; p.life -= real; }
    particles = particles.filter((p) => p.life > 0);
    for (const w of waves) { w.r += real * cell * 40; w.life -= real; }
    waves = waves.filter((w) => w.life > 0);
    for (const s of toasts) s.life -= real;
    toasts = toasts.filter((s) => s.life > 0);
    shake = Math.max(0, shake - real * 3);
    updateStatus();
    draw(t);
    if (!screens.custom.hidden && !ov.hidden) drawPreview(t);
    requestAnimationFrame(frame);
  }

  // ---------- desenho ----------
  function draw(t) {
    const w = cell * COLS, h = cell * ROWS;
    const p = palette();
    const c = cur();
    ctx.save();
    if (shake > 0) ctx.translate((Math.random() - 0.5) * 10 * shake, (Math.random() - 0.5) * 10 * shake);

    paintBoard(ctx, phaseBoard(), w, h, cell, p.k, t, game.frenzyLeft > 0);
    drawWarnings(t);

    // onda colorida quando come cogumelo
    for (const wv of waves) {
      ctx.strokeStyle = rgba(p.hud, wv.life);
      ctx.lineWidth = cell * 0.5;
      ctx.beginPath();
      ctx.arc(wv.x, wv.y, wv.r, 0, Math.PI * 2);
      ctx.stroke();
    }

    const blink = (item) => item.ttl < 2000 && Math.floor(t / 150) % 2;
    if (game.food) c.food.draw(ctx, game.food.x * cell, game.food.y * cell, cell, t);
    for (const k of game.coins) drawCoin(ctx, k.x * cell, k.y * cell, cell, t);
    if (game.mushroom && !blink(game.mushroom)) drawMushroom(ctx, game.mushroom.x * cell, game.mushroom.y * cell, cell, t, false);
    if (game.gold && !blink(game.gold)) drawMushroom(ctx, game.gold.x * cell, game.gold.y * cell, cell, t, true);
    if (game.boost && !blink(game.boost)) drawBoost(ctx, game.boost.x * cell, game.boost.y * cell, cell, t);

    drawSnake(t, p);
    drawHazards(t);

    for (const pt of particles) {
      ctx.globalAlpha = Math.max(0, pt.life / 0.5);
      ctx.fillStyle = pt.color;
      ctx.fillRect(pt.x - 2, pt.y - 2, 4, 4);
    }
    ctx.globalAlpha = 1;

    // câmera lenta: borda branca fraquinha
    if (slowmo > 0) {
      ctx.strokeStyle = `rgba(255,255,255,${slowmo})`;
      ctx.lineWidth = 6;
      ctx.strokeRect(3, 3, w - 6, h - 6);
    }

    // avisos no meio da tela
    ctx.textAlign = 'center';
    ctx.font = `${Math.round(cell * 0.85)}px "Press Start 2P", monospace`;
    toasts.forEach((s, i) => {
      ctx.globalAlpha = Math.min(1, s.life * 2);
      ctx.fillStyle = s.color;
      ctx.fillText(s.text, w / 2, h * 0.36 - (1.2 - s.life) * cell * 1.5 + i * cell * 1.6);
    });
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // avisos no chão: linha da flecha piscando e sombra da rocha
  function drawWarnings(t) {
    const w = cell * COLS, h = cell * ROWS;
    const on = Math.floor(t / 120) % 2;
    for (const a of game.arrows) {
      if (a.warn <= 0) continue;
      ctx.fillStyle = `rgba(255,40,70,${on ? 0.28 : 0.12})`;
      if (a.axis === 'row') ctx.fillRect(0, a.line * cell, w, cell);
      else ctx.fillRect(a.line * cell, 0, cell, h);
      // setinha na borda de onde a flecha vem
      const ex = a.axis === 'row' ? (a.dir > 0 ? 0.5 : COLS - 0.5) : a.line + 0.5;
      const ey = a.axis === 'row' ? a.line + 0.5 : (a.dir > 0 ? 0.5 : ROWS - 0.5);
      drawArrowHead(ex * cell, ey * cell, a, '#ff2846', cell * 0.35);
    }
    for (const r of game.rocks) {
      if (r.warn <= 0) continue;
      const k = 1 - r.warn / L.ROCK_WARN; // 0 → 1 enquanto cai
      const c = center(r);
      ctx.fillStyle = `rgba(0,0,0,${0.25 + 0.4 * k})`;
      ctx.beginPath();
      ctx.ellipse(c.x, c.y + cell * 0.25, cell * (0.2 + 0.25 * k), cell * (0.08 + 0.1 * k), 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(255,60,40,${on ? 0.9 : 0.4})`;
      ctx.lineWidth = 2;
      ctx.strokeRect(r.x * cell + 2, r.y * cell + 2, cell - 4, cell - 4);
    }
  }

  function drawArrowHead(x, y, a, color, size) {
    const ux = a.axis === 'row' ? a.dir : 0, uy = a.axis === 'row' ? 0 : a.dir;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x + ux * size, y + uy * size);
    ctx.lineTo(x - ux * size + uy * size, y - uy * size + ux * size);
    ctx.lineTo(x - ux * size - uy * size, y - uy * size - ux * size);
    ctx.closePath();
    ctx.fill();
  }

  function drawHazards(t) {
    // flechas voando
    for (const a of game.arrows) {
      if (a.warn > 0) continue;
      const ux = a.axis === 'row' ? a.dir : 0, uy = a.axis === 'row' ? 0 : a.dir;
      const tip = a.axis === 'row'
        ? { x: (a.pos + 0.5) * cell + ux * cell * 0.5, y: (a.line + 0.5) * cell }
        : { x: (a.line + 0.5) * cell, y: (a.pos + 0.5) * cell + uy * cell * 0.5 };
      const len = cell * 1.8;
      ctx.strokeStyle = '#f2e3c4';
      ctx.lineWidth = Math.max(2, cell * 0.12);
      ctx.beginPath();
      ctx.moveTo(tip.x, tip.y);
      ctx.lineTo(tip.x - ux * len, tip.y - uy * len);
      ctx.stroke();
      drawArrowHead(tip.x, tip.y, a, '#e8e8e8', cell * 0.3);
      ctx.fillStyle = RED; // penas
      ctx.fillRect(tip.x - ux * len - cell * 0.15, tip.y - uy * len - cell * 0.15, cell * 0.3, cell * 0.3);
    }
    // morcegos batendo asa
    const frameN = Math.floor(t / 110) % 2;
    for (const b of game.bats) {
      const s = cell * 1.25;
      const x = (b.x + 0.5) * cell - s / 2, y = (b.y + 0.5) * cell - s * 0.3;
      pixelArt(ctx, BAT[frameN], { b: '#c7a6ff', e: '#ff3355' }, x, y, s);
    }
    // rochas no chão (piscam antes de esfarelar)
    for (const r of game.rocks) {
      if (r.warn > 0) {
        // caindo: desenha a rocha acima da sombra, descendo
        const k = r.warn / L.ROCK_WARN;
        if (k < 0.6) pixelArt(ctx, ROCK, ROCK_PAL, r.x * cell, (r.y - k * 4) * cell, cell);
        continue;
      }
      if (r.life < 1500 && Math.floor(t / 120) % 2) continue;
      pixelArt(ctx, ROCK, ROCK_PAL, r.x * cell, r.y * cell, cell);
    }
  }
  const ROCK_PAL = { g: '#8a8580', h: '#c4beb8', d: '#4f4a46' };

  // Pontos do corpo (centro das casas), com a cabeça e o rabo deslizando
  // entre uma casa e outra pra o movimento ficar liso.
  function snakePoints() {
    const now = game.snake;
    if (state !== 'play' || !prevSnake) return now.map(center);
    const f = Math.min(1, acc / L.interval(game));
    const prev = prevSnake;
    const m = prev.length;
    const lerp = (a, b) => ({ x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f });
    const pts = [lerp(center(prev[0]), center(now[0]))];
    const grew = now.length > m;
    for (let i = 0; i < (grew ? m : m - 1); i++) pts.push(center(prev[i]));
    if (!grew && m >= 2) pts.push(lerp(center(prev[m - 1]), center(prev[m - 2])));
    return pts;
  }

  // Corpo = um retângulo contínuo que dobra nas curvas, com opacidade
  // indo de 100% na cabeça a 0% na ponta do rabo.
  function drawSnake(t, p) {
    const raw = snakePoints();
    const P = [raw[0]];
    for (const q of raw.slice(1)) {
      const l = P[P.length - 1];
      if (Math.abs(q.x - l.x) + Math.abs(q.y - l.y) > 0.01) P.push(q);
    }
    const dead = state === 'over' && !game.alive && game.food;
    const turbo = game.boostLeft > 0;
    const W = cell * 0.7, half = W / 2;

    const color = (frac, a) => {
      if (dead) return `rgba(224,36,94,${a})`;
      if (p.rainbow) return `hsla(${(frac * 300 + t / 6) % 360}, 90%, 60%, ${a})`;
      let c = mix(p.head, p.body, Math.min(1, frac * 5));
      if (turbo) c = mix(c, [59, 140, 255], 0.55);
      return rgba(c, a);
    };

    if (turbo || p.rainbow) {
      ctx.shadowColor = turbo ? BLUE : '#ffffff';
      ctx.shadowBlur = 16;
    }
    if (P.length === 1) {
      ctx.fillStyle = color(0, 1);
      ctx.fillRect(P[0].x - half, P[0].y - half, W, W);
    } else {
      const segs = [];
      let dist = 0;
      for (let k = 0; k < P.length - 1; k++) {
        const a = P[k], b = P[k + 1];
        const len = Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
        segs.push({ a, len, u: { x: Math.sign(b.x - a.x), y: Math.sign(b.y - a.y) }, dist });
        dist += len;
      }
      const total = dist + W;
      const alphaAt = (s) => Math.max(0, 1 - s / total);
      const sameDir = (u, v) => v && u.x === v.x && u.y === v.y;
      segs.forEach((sg, k) => {
        const prevU = k > 0 ? segs[k - 1].u : null;
        const nextU = k < segs.length - 1 ? segs[k + 1].u : null;
        // a casa da curva fica com o trecho que chega nela, pra não sobrepor
        let t0 = k === 0 ? -half : sameDir(sg.u, prevU) ? 0 : half;
        const t1 = sameDir(sg.u, nextU) ? sg.len : sg.len + half;
        if (t1 <= t0) return;
        t0 -= 0.4; // emenda sem fresta entre os trechos
        const sx = sg.a.x + sg.u.x * t0, sy = sg.a.y + sg.u.y * t0;
        const ex = sg.a.x + sg.u.x * t1, ey = sg.a.y + sg.u.y * t1;
        const s0 = half + sg.dist + t0, s1 = half + sg.dist + t1;
        const grad = ctx.createLinearGradient(sx, sy, ex, ey);
        grad.addColorStop(0, color(s0 / total, alphaAt(s0)));
        grad.addColorStop(1, color(s1 / total, alphaAt(s1)));
        ctx.fillStyle = grad;
        if (sg.u.x) ctx.fillRect(Math.min(sx, ex), sy - half, Math.abs(ex - sx), W);
        else ctx.fillRect(sx - half, Math.min(sy, ey), W, Math.abs(ey - sy));
        ctx.shadowBlur = 0; // brilho só na cabeça
      });
    }
    ctx.shadowBlur = 0;
  }

  loadBest();
  updateHud();
  resize();
  showScreen('main');
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => draw(performance.now()));
  requestAnimationFrame(frame);
})();
