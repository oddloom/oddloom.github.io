// Lost Relics — tela, animação, toque, efeitos, mapa e janelas.
// As regras ficam no engine.js; aqui só se mostra o que ele decide.
(function () {
  'use strict';
  const T = (k, v) => I18N.t(k, v);
  const $ = (id) => document.getElementById(id);
  const canvas = $('stage'), ctx = canvas.getContext('2d');
  const REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- progresso salvo no aparelho ----------
  const SAVE_KEY = 'lostrelics.save.v1';
  let save = { unlocked: 1, stars: {}, best: {}, wins: 0 };
  try { const s = JSON.parse(localStorage.getItem(SAVE_KEY)); if (s && s.unlocked) save = Object.assign(save, s); } catch (e) {}
  save.coins = save.coins == null ? 300 : save.coins;
  save.items = Object.assign({ moves: 0, dyn: 0, orb: 0, hammer: 1 }, save.items);
  // moedas da fase = pontos / 100 (+10 por estrela na vitória)
  const coinsOf = (score) => Math.floor(score / 100);
  const SHOP = [
    { id: 'moves', price: 150, icon: 'hourglass' },
    { id: 'dyn', price: 200, icon: 'dynamite' },
    { id: 'orb', price: 400, icon: 'idol' },
    { id: 'hammer', price: 250, icon: 'hammer' },
  ];
  const persist = () => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) {} };

  // ---------- tempo do jogo: animações e agendamentos ----------
  const tweens = [], timers = [];
  let now = 0;
  const EASE = {
    lin: (p) => p, out: (p) => 1 - (1 - p) * (1 - p), in: (p) => p * p,
    inout: (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2),
    back: (p) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2); },
    fall: (p) => 0.65 * p + 0.35 * p * p,
  };
  function anim(dur, fn, ease, delay) {
    return new Promise((res) => tweens.push({ t: -(delay || 0), dur: Math.max(0.0001, dur), fn, ease: EASE[ease || 'out'], res }));
  }
  function tween(o, to, dur, ease, delay) {
    let from = null;
    return anim(dur, (e) => {
      if (!from) { from = {}; for (const k in to) from[k] = o[k]; }
      for (const k in to) o[k] = from[k] + (to[k] - from[k]) * e;
    }, ease, delay);
  }
  const wait = (s) => anim(s, () => {}, 'lin');
  const later = (s, fn) => timers.push({ t: s, fn });
  function stepTime(dt) {
    now += dt;
    for (let i = tweens.length - 1; i >= 0; i--) {
      const tw = tweens[i];
      tw.t += dt;
      if (tw.t < 0) continue;
      const p = Math.min(1, tw.t / tw.dur);
      tw.fn(tw.ease(p), p);
      if (p >= 1) { tweens.splice(i, 1); tw.res(); }
    }
    for (let i = timers.length - 1; i >= 0; i--) {
      timers[i].t -= dt;
      if (timers[i].t <= 0) { const f = timers[i].fn; timers.splice(i, 1); f(); }
    }
  }

  // ---------- tela e tamanho ----------
  let W = 0, H = 0, dpr = 1, cs = 48, ox = 0, oy = 0, S = 96, backdrop = null;
  function layout() {
    W = window.innerWidth; H = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    backdrop = ART.drawBackdrop(canvas.width, canvas.height);
    if (state) fitBoard();
    initFlies();
  }
  function fitBoard() {
    const hud = $('hud');
    const top = hud.hidden ? 12 : hud.getBoundingClientRect().bottom + 6;
    const availH = H - top - 18, availW = Math.min(W, 640) - 20;
    const G = window.ART_DATA && ART_DATA.boardGrid;
    if (ART.board && G && state.W === 8 && state.H === 8) {
      // tabuleiro pintado: a moldura ocupa casas extras em volta da grade
      const px = G.w / 8, py = G.h / 8;
      const L = (G.x - G.visX0) / px, R = (G.visX1 - G.x - G.w) / px, T = (G.y - G.visY0) / py, B = (G.visY1 - G.y - G.h) / py;
      // em tela estreita a moldura pode passar um pouco da borda (até 0,7 casa de cada lado); em cima ela entra por baixo do painel
      const needH = 8 + T * 0.45 + B * 0.9;
      // tela estreita (celular): a pedra de fora da moldura pode sair da tela; ficam o filete de ouro e a faixa de glifos (~0,55 casa de cada lado)
      const crop = W < 560 ? Math.max(1.4, L + R - 1.1) : 1.4;
      cs = Math.max(20, Math.floor(Math.min(W / (8 + L + R - crop), availH / needH, 80)));
      ox = Math.round((W - cs * 8) / 2);
      oy = Math.round(top + T * 0.45 * cs + Math.max(0, (availH - needH * cs) * 0.35));
    } else {
      cs = Math.max(20, Math.floor(Math.min(availW / state.W, availH / state.H, 82)));
      ox = Math.round((W - cs * state.W) / 2);
      oy = Math.round(top + Math.max(0, (availH - cs * state.H) * 0.35));
    }
    S = Math.round(cs * dpr);
    buildBoardLayer();
  }

  // ---------- estado da partida ----------
  let scene = 'menu', state = null, level = null, busy = false;
  let vis = new Map(), dying = [], parts = [], floats = [], glints = [];
  let shake = 0, hint = null, idle = 0, selected = null, drag = null, usedExtra = false, praiseLevel = 0, glintClock = 0;
  const modalOpen = () => !$('modal').hidden;
  function V(p, x, y) {
    let v = vis.get(p.id);
    if (!v) { v = { x, y, s: 1, a: 1, sq: 0 }; vis.set(p.id, v); }
    return v;
  }
  const cellX = (x) => ox + (x + 0.5) * cs, cellY = (y) => oy + (y + 0.5) * cs;

  async function startLevel(id, boosts) {
    level = LEVELS[id - 1];
    state = LR.createState(level, ((Date.now() & 0x7fffffff) ^ (id * 7919)) >>> 0);
    applyBoosts(boosts || {});
    hammerMode = false;
    vis = new Map(); dying = []; parts = []; floats = []; glints = [];
    hint = null; selected = null; drag = null; usedExtra = false; idle = 0; shake = 0;
    scene = 'play';
    $('screen-map').hidden = true; $('screen-menu').hidden = true; $('hud').hidden = false;
    buildGoalChips();
    renderHUD();
    fitBoard();
    Ads.gameplay(true);
    busy = true;
    const proms = [];
    for (let y = 0; y < state.H; y++) for (let x = 0; x < state.W; x++) {
      const p = state.grid[y][x];
      if (!p) continue;
      const v = V(p, x, y - state.H - 1);
      proms.push(tween(v, { y }, 0.42, 'in', x * 0.025 + (state.H - y) * 0.035).then(() => { v.sq = 0.1; tween(v, { sq: 0 }, 0.14); }));
    }
    announceLevel(level);
    await Promise.all(proms);
    busy = false;
  }

  // vantagens da loja aplicadas no começo da fase
  function applyBoosts(b) {
    if (b.moves) state.moves += 3;
    const plain = () => { const out = []; for (let y = 0; y < state.H; y++) for (let x = 0; x < state.W; x++) { const p = state.grid[y][x]; if (p && p.kind === 'gem' && !p.special && !p.vine) out.push(p); } return out; };
    if (b.dyn) { const l = plain(); for (let k = 0; k < 2 && l.length; k++) { const p = l.splice(Math.floor(Math.random() * l.length), 1)[0]; p.special = Math.random() < 0.5 ? 'lineH' : 'lineV'; } }
    if (b.orb) { const l = plain(); if (l.length) { const p = l[Math.floor(Math.random() * l.length)]; p.special = 'idol'; p.color = null; } }
  }

  // FASE N na tela + locutor (estrondo, gongo e a voz grave dizendo a fase)
  function announceLevel(L) {
    const el = document.createElement('div');
    el.className = 'announce' + (L.boss ? ' boss' : '');
    el.innerHTML = '<span class="metal">' + T('announce', { n: L.id }) + '</span>' + (L.boss ? '<small>' + T('boss') + '</small>' : '');
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2300);
    Sound.play('announce');
    later(0.18, () => addShake(0.45));
    setTimeout(() => Sound.voice(L.id === LEVELS.length ? 'final' : L.boss ? 'boss' : 'fase' + L.id, I18N.lang), 200);
  }

  // ---------- toque ----------
  function cellAt(px, py) {
    if (!state) return null;
    const x = Math.floor((px - ox) / cs), y = Math.floor((py - oy) / cs);
    return LR.inside(state, x, y) ? [x, y] : null;
  }
  const adj = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) === 1;
  canvas.addEventListener('pointerdown', (e) => {
    Sound.init();
    if (scene !== 'play' || busy || modalOpen()) return;
    idle = 0; hint = null;
    const c = cellAt(e.clientX, e.clientY);
    if (!c) { selected = null; return; }
    if (hammerMode) { const hp = state.grid[c[1]][c[0]]; if (hp && hp.kind !== 'artifact') { selected = null; useHammer(c); } return; }
    if (selected && adj(selected, c)) { const a = selected; selected = null; trySwap(a, c); return; }
    const p = state.grid[c[1]][c[0]];
    if (!LR.swappable(p)) { selected = null; if (p) nudge(p, c); return; }
    selected = c;
    drag = { x: e.clientX, y: e.clientY, c };
    try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!drag || busy) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < cs * 0.3) return;
    const a = drag.c;
    const b = Math.abs(dx) > Math.abs(dy) ? [a[0] + Math.sign(dx), a[1]] : [a[0], a[1] + Math.sign(dy)];
    drag = null; selected = null;
    if (LR.inside(state, b[0], b[1])) trySwap(a, b);
  });
  const endDrag = () => { drag = null; };
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);

  function nudge(p, c) {
    const v = V(p, c[0], c[1]);
    v.s = 0.88; tween(v, { s: 1 }, 0.25, 'back');
    Sound.play('bad');
  }

  async function trySwap(a, b) {
    const pa = state.grid[a[1]][a[0]], pb = state.grid[b[1]][b[0]];
    if (!LR.swappable(pa)) return;
    busy = true;
    const va = V(pa, a[0], a[1]);
    if (!LR.swappable(pb)) {
      Sound.play('bad');
      await tween(va, { x: a[0] + (b[0] - a[0]) * 0.22, y: a[1] + (b[1] - a[1]) * 0.22 }, 0.08);
      await tween(va, { x: a[0], y: a[1] }, 0.12);
      busy = false; return;
    }
    const vb = V(pb, b[0], b[1]);
    Sound.play('swap');
    await Promise.all([tween(va, { x: b[0], y: b[1] }, 0.19, 'back'), tween(vb, { x: a[0], y: a[1] }, 0.19, 'back')]);
    const start = LR.doSwap(state, a, b);
    if (!start) {
      Sound.play('bad'); buzz(10);
      await Promise.all([tween(va, { x: a[0], y: a[1] }, 0.17, 'back'), tween(vb, { x: b[0], y: b[1] }, 0.17, 'back')]);
      busy = false; return;
    }
    praiseLevel = 0;
    renderHUD();
    if (start.combo) comboFx(start);
    await play(LR.resolve(state, start));
    await afterMove();
  }

  async function play(gen) { for (const ev of gen) await handle(ev); }
  function handle(ev) {
    if (ev.type === 'clear') return onClear(ev);
    if (ev.type === 'fall') return onFall(ev);
    if (ev.type === 'collect') return onCollect(ev);
    if (ev.type === 'shuffle') return onShuffle();
    if (ev.type === 'convert') return onConvert(ev);
    return Promise.resolve();
  }

  const WAVE = 0.085;
  async function onClear(ev) {
    if (ev.kind !== 'armed') Sound.play('match', ev.cascade);
    if (ev.removed.length) Sound.play('glass', Math.min(3, 1 + Math.floor(ev.removed.length / 6) + (ev.blasts.length ? 1 : 0)));
    buzz(ev.blasts.length ? 35 : 12);
    for (const b of ev.blasts) later(b.wave * WAVE, () => blastFx(b));
    for (const r of ev.removed) {
      const d = r.wave * WAVE;
      const v = vis.get(r.piece.id) || { x: r.x, y: r.y, s: 1, a: 1, sq: 0 };
      vis.delete(r.piece.id);
      dying.push({ p: r.piece, v: { x: r.x, y: r.y, s: v.s, a: 1, sq: 0 }, t: -d, dur: 0.26 });
      later(d + 0.06, () => burst(r.x, r.y, r.piece));
    }
    let rockSnd = false, sandSnd = false, vineSnd = false;
    for (const r of ev.rocks) later(r.wave * WAVE, () => {
      dust(r.x, r.y);
      if (!rockSnd) { rockSnd = true; Sound.play('rock'); }
      if (r.dead) { vis.delete(r.p.id); dying.push({ p: Object.assign({}, r.p, { hp: 1 }), v: { x: r.x, y: r.y, s: 1, a: 1, sq: 0 }, t: 0, dur: 0.25 }); }
      else { const v = V(r.p, r.x, r.y); v.s = 1.15; tween(v, { s: 1 }, 0.22, 'back'); }
    });
    for (const s of ev.sand) later(s.wave * WAVE + 0.04, () => { sandPuff(s.x, s.y); if (!sandSnd) { sandSnd = true; Sound.play('sand'); } });
    for (const s of ev.vines) later(s.wave * WAVE, () => { leaves(s.x, s.y); if (!vineSnd) { vineSnd = true; Sound.play('vine'); } });
    for (const c of ev.created) {
      const v = V(c.piece, c.x, c.y);
      v.s = 0;
      later(ev.waves * WAVE + 0.05, () => { tween(v, { s: 1 }, 0.32, 'back'); ring(c.x, c.y, 'rgba(255,220,120,0.9)', 1.1); Sound.play('create'); });
    }
    if (ev.score > 0 && ev.removed.length) {
      let sx = 0, sy = 0; const colorCount = {};
      for (const r of ev.removed) { sx += r.x; sy += r.y; if (r.piece.color != null) colorCount[r.piece.color] = (colorCount[r.piece.color] || 0) + 1; }
      const top = Object.keys(colorCount).sort((a, b) => colorCount[b] - colorCount[a])[0];
      const g = top != null ? ART.GEMS[+top] : null;
      floats.push({ x: cellX(sx / ev.removed.length), y: cellY(sy / ev.removed.length), text: '+' + ev.score, color: g ? ART.hsl(g.h, g.s, Math.max(62, g.l + 22)) : '#ffe08a', t: 0 });
    }
    if (ev.cascade >= 7) praise(3); else if (ev.cascade >= 5) praise(2); else if (ev.cascade >= 3) praise(1);
    later(0.12, renderHUD);
    await wait(0.2 + ev.waves * WAVE);
  }

  async function onFall(ev) {
    const CELL = 0.05, paths = new Map();
    ev.steps.forEach((step, k) => {
      for (const m of step) {
        let e = paths.get(m.p.id);
        if (!e) {
          e = { p: m.p, pts: [[m.fx, m.fy]], start: k };
          paths.set(m.p.id, e);
          if (m.spawn) vis.set(m.p.id, { x: m.fx, y: m.fy, s: 1, a: 1, sq: 0 });
        }
        e.pts.push([m.tx, m.ty]);
      }
    });
    const proms = [];
    for (const e of paths.values()) {
      const v = V(e.p, e.pts[0][0], e.pts[0][1]);
      v.x = e.pts[0][0]; v.y = e.pts[0][1];
      const n = e.pts.length - 1;
      proms.push(anim(n * CELL + 0.04, (q) => {
        const f = q * n, i = Math.min(n - 1, Math.floor(f)), fr = f - i, A = e.pts[i], B = e.pts[i + 1];
        v.x = A[0] + (B[0] - A[0]) * fr; v.y = A[1] + (B[1] - A[1]) * fr;
      }, 'fall', e.start * CELL).then(() => { v.sq = 0.17; tween(v, { sq: 0 }, 0.22, 'back'); }));
    }
    await Promise.all(proms);
  }

  async function onCollect(ev) {
    for (const it of ev.items) {
      vis.delete(it.piece.id);
      dying.push({ p: it.piece, v: { x: it.x, y: it.y, s: 1, a: 1, sq: 0 }, t: 0, dur: 0.45, kind: 'collect' });
      sparks(it.x, it.y, 18, '#ffd76a');
      floats.push({ x: cellX(it.x), y: cellY(it.y), text: '+' + LR.SCORE.artifact, color: '#ffe08a', t: 0 });
    }
    Sound.play('chest');
    praise(2);
    later(0.2, renderHUD);
    await wait(0.32);
  }

  async function onShuffle() {
    showPraise(T('shuffle'), 'info');
    const proms = [];
    for (let y = 0; y < state.H; y++) for (let x = 0; x < state.W; x++) {
      const p = state.grid[y][x];
      if (p) proms.push(tween(V(p, x, y), { x, y }, 0.5, 'inout'));
    }
    await Promise.all(proms);
    await wait(0.1);
  }

  async function onConvert(ev) {
    const v = V(ev.piece, ev.x, ev.y);
    v.s = 1.45; tween(v, { s: 1 }, 0.25, 'back');
    sparks(ev.x, ev.y, 8, '#ffcf6a');
    Sound.play('convert');
    renderHUD();
    await wait(0.07);
  }

  function comboFx(start) {
    const [ax, ay] = start.at;
    if (start.combo.startsWith('idol')) {
      Sound.play('idol');
      for (const h of start.hits) if (h.x !== ax || h.y !== ay) parts.push({ type: 'bolt', x1: cellX(ax), y1: cellY(ay), x2: cellX(h.x), y2: cellY(h.y), life: 0, max: 0.4 });
      parts.push({ type: 'flash', life: 0, max: 0.35 });
      addShake(0.35);
      praise(start.combo === 'idol+gem' ? 2 : 3);
    } else if (start.combo === 'line+line') {
      Sound.play('line');
      beam('h', ay); beam('v', ax); addShake(0.25); praise(1);
    } else if (start.combo === 'line+barrel') {
      Sound.play('line'); Sound.play('barrel');
      for (let d = -1; d <= 1; d++) { beam('h', ay + d); beam('v', ax + d); }
      addShake(0.5); praise(2);
    } else if (start.combo === 'barrel+barrel') {
      Sound.play('barrel');
      ring(ax, ay, 'rgba(255,140,40,0.9)', 2.8); fire(ax, ay, 40); addShake(0.6); praise(2);
    }
  }

  function blastFx(b) {
    if (b.special === 'lineH' || b.special === 'lineV') {
      Sound.play('line'); beam(b.special === 'lineH' ? 'h' : 'v', b.special === 'lineH' ? b.y : b.x); addShake(0.15);
      // dardo do templo: sai da moldura e atravessa a fileira (os dois sentidos)
      if (ART.fx('dart')) for (const dir of [1, -1]) parts.push({ type: 'dart', h: b.special === 'lineH', at: b.special === 'lineH' ? b.y : b.x, dir, life: 0, max: 0.42 });
    } else if (b.special === 'barrel') {
      Sound.play('barrel'); addShake(0.35);
      if (ART.fx('shock')) { parts.push({ type: 'fxsprite', key: 'shock', x: cellX(b.x), y: cellY(b.y), s0: 0.6, s1: 3.6, life: 0, max: 0.55 }); sparks(b.x, b.y, 14, '#7ff3ea'); }
      else { ring(b.x, b.y, 'rgba(255,150,50,0.95)', 1.7); fire(b.x, b.y, 22); }
    } else if (b.special === 'idol') {
      Sound.play('idol');
      if (ART.fx('sunbeam')) { b.area.forEach(([x, y], k) => parts.push({ type: 'fxsprite', key: 'sunbeam', x: cellX(x), y: cellY(y) - cs * 1.4, s0: 1, s1: 1, tall: true, life: -k * 0.02, max: 0.6 })); parts.push({ type: 'fxsprite', key: 'flare2', x: cellX(b.x), y: cellY(b.y), s0: 1, s1: 2.6, life: 0, max: 0.5 }); }
      else for (const [x, y] of b.area) parts.push({ type: 'bolt', x1: cellX(b.x), y1: cellY(b.y), x2: cellX(x), y2: cellY(y), life: 0, max: 0.4 });
      addShake(0.25);
    }
  }

  async function afterMove() {
    renderHUD();
    if (LR.isWon(state)) { await treasureRush(); showWin(); return; }
    if (state.moves <= 0) { showLose(); return; }
    busy = false;
  }

  async function treasureRush() {
    await wait(0.25);
    if (state.moves > 0) {
      showPraise(T('rush'), 'banner');
      Sound.play('rush');
      Sound.voice('rush', I18N.lang);
      await wait(0.7);
    }
    await play(LR.treasureRush(state));
    renderHUD();
    await wait(0.35);
  }

  // ---------- transição entre telas: cortina circular que fecha, troca a tela e abre ----------
  let wiping = false;
  function wipe(fn) {
    const el = $('wipe');
    if (REDUCED || !el.animate || wiping) { fn(); return; }
    wiping = true;
    const big = Math.ceil(Math.hypot(W, H)) + 'px';
    el.style.pointerEvents = 'auto';
    Sound.play('swap');
    const a = el.animate([{ clipPath: 'circle(0px at 50% 55%)' }, { clipPath: 'circle(' + big + ' at 50% 55%)' }], { duration: 360, easing: 'cubic-bezier(.6,0,.3,1)', fill: 'forwards' });
    a.onfinish = () => {
      fn();
      const b = el.animate([{ clipPath: 'circle(' + big + ' at 50% 50%)' }, { clipPath: 'circle(0px at 50% 50%)' }], { duration: 560, delay: 80, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'forwards' });
      b.onfinish = () => { el.style.pointerEvents = 'none'; wiping = false; };
    };
  }
  // vibração curta no celular (segue a chave de SOM)
  function buzz(p) { try { if (navigator.vibrate && Sound.sfx) navigator.vibrate(p); } catch (e) {} }

  // ---------- efeitos ----------
  const addShake = (v) => { if (!REDUCED) shake = Math.max(shake, v); };
  function praise(n) {
    if (n <= praiseLevel) return;
    praiseLevel = n;
    showPraise(T('praise.' + n));
    Sound.voice('p' + n, I18N.lang);
  }
  function showPraise(text, cls) {
    const el = document.createElement('div');
    el.className = 'praise' + (cls ? ' ' + cls : '');
    el.textContent = text;
    document.body.appendChild(el);
    setTimeout(() => { if (!/^#evento-/.test(location.hash)) el.remove(); }, 1150);
  }
  function beam(dir, at) { parts.push({ type: 'beam', dir, at, life: 0, max: 0.38 }); }
  function ring(x, y, color, r) { parts.push({ type: 'ring', x: cellX(x), y: cellY(y), r: r * cs, color, life: 0, max: 0.45 }); }
  function burst(x, y, p) {
    const g = p.color != null ? ART.GEMS[p.color] : null;
    const px = cellX(x), py = cellY(y);
    for (let i = 0; i < 9; i++) {
      const a = Math.random() * Math.PI * 2, sp = cs * (2 + Math.random() * 4);
      parts.push({ type: 'shard', x: px, y: py, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - cs * 2, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 14,
        size: cs * (0.07 + Math.random() * 0.07), color: g ? ART.hsl(g.h, g.s, g.l + Math.random() * 30) : '#f5c94f', life: 0, max: 0.55 + Math.random() * 0.3 });
    }
    sparks(x, y, 5, g ? ART.hsl(g.h, 60, 85) : '#fff3b0');
  }
  function sparks(x, y, n, color) {
    const px = cellX(x), py = cellY(y);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, sp = cs * (1 + Math.random() * 3);
      parts.push({ type: 'spark', x: px, y: py, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, size: cs * (0.05 + Math.random() * 0.05), color, life: 0, max: 0.4 + Math.random() * 0.3 });
    }
  }
  function fire(x, y, n) {
    const px = cellX(x), py = cellY(y);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, sp = cs * (2 + Math.random() * 5);
      parts.push({ type: 'spark', x: px, y: py, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, size: cs * (0.08 + Math.random() * 0.1), color: Math.random() < 0.5 ? '#ff9a3c' : '#ffd36a', life: 0, max: 0.5 + Math.random() * 0.3 });
    }
  }
  function dust(x, y) {
    const px = cellX(x), py = cellY(y);
    for (let i = 0; i < 8; i++) {
      const a = Math.random() * Math.PI * 2, sp = cs * (0.6 + Math.random() * 1.5);
      parts.push({ type: 'dust', x: px, y: py, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, size: cs * (0.12 + Math.random() * 0.12), color: 'rgba(160,150,128,', life: 0, max: 0.6 });
      parts.push({ type: 'shard', x: px, y: py, vx: Math.cos(a) * sp * 2, vy: Math.sin(a) * sp * 2 - cs * 2, rot: 0, vr: 8, size: cs * 0.07, color: '#6f6858', life: 0, max: 0.6 });
    }
  }
  function sandPuff(x, y) {
    const px = cellX(x), py = cellY(y);
    for (let i = 0; i < 7; i++) {
      const a = Math.random() * Math.PI * 2, sp = cs * (0.5 + Math.random());
      parts.push({ type: 'dust', x: px, y: py, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, size: cs * (0.1 + Math.random() * 0.1), color: 'rgba(220,181,122,', life: 0, max: 0.55 });
    }
  }
  function leaves(x, y) {
    const px = cellX(x), py = cellY(y);
    for (let i = 0; i < 6; i++) {
      parts.push({ type: 'leaf', x: px, y: py, vx: (Math.random() - 0.5) * cs * 3, vy: -cs * (1 + Math.random() * 2), rot: Math.random() * 6, vr: (Math.random() - 0.5) * 8, size: cs * 0.1, color: Math.random() < 0.5 ? '#5fa046' : '#3f8a34', life: 0, max: 0.9 });
    }
  }

  // brasas douradas subindo (no lugar dos vaga-lumes)
  let embers = [];
  function initFlies() {
    embers = [];
    const n = Math.round(Math.min(60, (W * H) / 16000));
    for (let i = 0; i < n; i++) embers.push({ x: Math.random() * W, y: Math.random() * H, sp: 12 + Math.random() * 30, ph: Math.random() * 6, sw: 0.4 + Math.random() * 0.8, r: 0.8 + Math.random() * 1.6 });
  }

  // camada do tabuleiro: pedra, filete de ouro e casas fundas (redesenha só quando muda tamanho ou fase)
  let boardLayer = null, boardLayerX = 0, boardLayerY = 0;
  function buildBoardLayer() {
    const G = window.ART_DATA && ART_DATA.boardGrid;
    if (ART.board && G && state.W === 8 && state.H === 8) return buildPaintedBoard(G);
    buildCodeBoard();
  }
  // tabuleiro pintado (IA): a imagem é esticada pra grade pintada cair exatamente nas casas do jogo
  function buildPaintedBoard(G) {
    const im = ART.board, sx = cs / (G.w / 8), sy = cs / (G.h / 8);
    const iw = (im.naturalWidth || im.width) * sx, ih = (im.naturalHeight || im.height) * sy;
    const ix = ox - G.x * sx, iy = oy - G.y * sy;
    const c = document.createElement('canvas');
    c.width = Math.round(iw * dpr); c.height = Math.round(ih * dpr);
    const g = c.getContext('2d');
    g.scale(dpr, dpr);
    g.imageSmoothingQuality = 'high';
    g.save(); g.shadowColor = 'rgba(0,0,0,0.75)'; g.shadowBlur = cs * 0.5; g.shadowOffsetY = cs * 0.12;
    g.drawImage(im, 0, 0, iw, ih);
    g.restore();
    // areia dourada escorrendo pela direita e pelo canto de baixo, como na referência
    const sandIm = ART.pieceImage('sand');
    if (sandIm) {
      const W2 = Math.ceil(iw), H2 = Math.ceil(ih);
      const lc = document.createElement('canvas'); lc.width = W2; lc.height = H2;
      const sg = lc.getContext('2d');
      const tile = document.createElement('canvas'); tile.width = tile.height = Math.max(16, Math.round(cs * 3.2));
      tile.getContext('2d').drawImage(sandIm, sandIm.width * 0.18, sandIm.height * 0.18, sandIm.width * 0.64, sandIm.height * 0.64, 0, 0, tile.width, tile.height);
      sg.fillStyle = sg.createPattern(tile, 'repeat'); sg.fillRect(0, 0, W2, H2);
      const mk = document.createElement('canvas'); mk.width = W2; mk.height = H2;
      const mg = mk.getContext('2d'); mg.globalCompositeOperation = 'lighter';
      const gx = ox - ix, gy = oy - iy;
      const blobs = [[8.15, 3.4, 0.75], [7.95, 4.7, 0.95], [7.7, 5.9, 1.1], [7.45, 7.0, 1.25], [6.5, 8.0, 1.05], [5.4, 8.2, 0.75]];
      for (const [bx, by, br] of blobs) {
        const X = gx + bx * cs, Y = gy + by * cs, R = br * cs;
        const rg = mg.createRadialGradient(X, Y, 0, X, Y, R);
        rg.addColorStop(0, 'rgba(0,0,0,0.6)'); rg.addColorStop(0.5, 'rgba(0,0,0,0.3)'); rg.addColorStop(1, 'rgba(0,0,0,0)');
        mg.fillStyle = rg; mg.fillRect(X - R, Y - R, R * 2, R * 2);
      }
      sg.globalCompositeOperation = 'destination-in'; sg.drawImage(mk, 0, 0);
      g.save(); g.shadowColor = 'rgba(40,24,6,0.55)'; g.shadowBlur = cs * 0.15; g.drawImage(lc, 0, 0, iw, ih); g.restore();
    }
    // casas que não existem na fase: viram fosso de pedra escura
    const dark = g.createPattern(TEX.get('dark'), 'repeat');
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
      if (state.mask[y][x]) continue;
      const X = ox - ix + x * cs, Y = oy - iy + y * cs;
      g.fillStyle = dark; g.fillRect(X - 1, Y - 1, cs + 2, cs + 2);
      const sh = g.createLinearGradient(0, Y, 0, Y + cs);
      sh.addColorStop(0, 'rgba(0,0,0,0.85)'); sh.addColorStop(1, 'rgba(0,0,0,0.55)');
      g.fillStyle = sh; g.fillRect(X - 1, Y - 1, cs + 2, cs + 2);
    }
    boardLayer = c; boardLayerX = ix; boardLayerY = iy;
  }
  function buildCodeBoard() {    const M = Math.round(cs * 0.55), BW = state.W, BH = state.H;
    const c = document.createElement('canvas');
    c.width = Math.round((BW * cs + M * 2) * dpr); c.height = Math.round((BH * cs + M * 2) * dpr);
    const g = c.getContext('2d');
    g.scale(dpr, dpr); g.translate(M, M);
    const shape = (pad, r) => {
      g.beginPath();
      for (let y = 0; y < BH; y++) for (let x = 0; x < BW; x++) {
        if (!state.mask[y][x]) continue;
        const X = x * cs - pad, Y = y * cs - pad, w = cs + pad * 2;
        g.moveTo(X + r, Y); g.arcTo(X + w, Y, X + w, Y + w, r); g.arcTo(X + w, Y + w, X, Y + w, r); g.arcTo(X, Y + w, X, Y, r); g.arcTo(X, Y, X + w, Y, r); g.closePath();
      }
    };
    const P = Math.max(10, cs * 0.24);
    // sombra projetada
    g.save(); g.shadowColor = 'rgba(0,0,0,0.85)'; g.shadowBlur = cs * 0.6; g.shadowOffsetY = cs * 0.15;
    shape(P, cs * 0.22); g.fillStyle = '#0a0907'; g.fill('nonzero'); g.restore();
    // laje de pedra
    shape(P, cs * 0.22);
    g.save(); g.clip('nonzero');
    g.fillStyle = g.createPattern(TEX.get('slab'), 'repeat'); g.fillRect(-M, -M, BW * cs + M * 2, BH * cs + M * 2);
    const lit = g.createLinearGradient(0, -P, 0, BH * cs + P);
    lit.addColorStop(0, 'rgba(255,220,160,0.16)'); lit.addColorStop(0.5, 'rgba(0,0,0,0.2)'); lit.addColorStop(1, 'rgba(0,0,0,0.55)');
    g.fillStyle = lit; g.fillRect(-M, -M, BW * cs + M * 2, BH * cs + M * 2);
    g.restore();
    // filete de ouro + vala escura
    const gold = g.createLinearGradient(0, -P, 0, BH * cs + P);
    gold.addColorStop(0, '#fff0bd'); gold.addColorStop(0.25, '#d4a84b'); gold.addColorStop(0.55, '#7c5a1c'); gold.addColorStop(0.8, '#d9ae58'); gold.addColorStop(1, '#8e6420');
    shape(P * 0.5, cs * 0.16); g.fillStyle = gold; g.fill('nonzero');
    shape(P * 0.5 - 1.6, cs * 0.15); g.fillStyle = '#0b0906'; g.fill('nonzero');
    // casas: pedra escura funda, com sombra interna em cima
    const dark = g.createPattern(TEX.get('dark'), 'repeat');
    for (let y = 0; y < BH; y++) for (let x = 0; x < BW; x++) {
      if (!state.mask[y][x]) continue;
      const X = x * cs + 1.5, Y = y * cs + 1.5, w = cs - 3;
      ART.roundRect(g, X, Y, w, w, cs * 0.1);
      g.fillStyle = dark; g.fill();
      g.fillStyle = (x + y) % 2 ? 'rgba(255,230,180,0.045)' : 'rgba(0,0,0,0.12)'; g.fill();
      g.save(); g.clip();
      const ins = g.createLinearGradient(0, Y, 0, Y + w);
      ins.addColorStop(0, 'rgba(0,0,0,0.6)'); ins.addColorStop(0.25, 'rgba(0,0,0,0)'); ins.addColorStop(0.9, 'rgba(0,0,0,0)'); ins.addColorStop(1, 'rgba(255,220,160,0.08)');
      g.fillStyle = ins; g.fillRect(X, Y, w, w);
      g.restore();
    }
    // losangos de ouro nos cantos da laje
    const corners = [[0, 0], [BW - 1, 0], [0, BH - 1], [BW - 1, BH - 1]];
    for (const [x, y] of corners) {
      if (!state.mask[y][x]) continue;
      const X = x === 0 ? -P * 0.5 : BW * cs + P * 0.5, Y = y === 0 ? -P * 0.5 : BH * cs + P * 0.5;
      g.save(); g.translate(X, Y); g.rotate(Math.PI / 4);
      g.shadowColor = 'rgba(255,210,120,0.8)'; g.shadowBlur = 10;
      g.fillStyle = gold; g.fillRect(-P * 0.28, -P * 0.28, P * 0.56, P * 0.56);
      g.restore();
    }
    boardLayer = c; boardLayerX = ox - M; boardLayerY = oy - M;
  }

  function update(dt) {
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.life += dt;
      if (p.life >= p.max) { parts.splice(i, 1); continue; }
      if (p.vx != null) {
        p.x += p.vx * dt; p.y += p.vy * dt;
        if (p.type === 'shard') p.vy += cs * 22 * dt;
        if (p.type === 'leaf') { p.vy += cs * 4 * dt; p.vx *= 0.97; }
        if (p.type === 'spark' || p.type === 'dust') { p.vx *= 0.92; p.vy *= 0.92; }
        if (p.rot != null) p.rot += p.vr * dt;
      }
    }
    for (let i = floats.length - 1; i >= 0; i--) { floats[i].t += dt; if (floats[i].t > 0.9) floats.splice(i, 1); }
    for (let i = dying.length - 1; i >= 0; i--) { dying[i].t += dt; if (dying[i].t >= dying[i].dur) dying.splice(i, 1); }
    for (let i = glints.length - 1; i >= 0; i--) { glints[i].t += dt; if (glints[i].t > 0.7) glints.splice(i, 1); }
    shake = Math.max(0, shake - dt * 1.6);
    if (scene === 'play' && state) {
      glintClock += dt;
      if (glintClock > 0.35) {
        glintClock = 0;
        const x = (Math.random() * state.W) | 0, y = (Math.random() * state.H) | 0;
        const p = LR.inside(state, x, y) && state.grid[y][x];
        if (p && p.kind === 'gem' && !p.special) glints.push({ id: p.id, t: 0 });
      }
      if (!busy && !modalOpen()) {
        idle += dt;
        const limit = level.id === 1 ? 1.5 : level.id <= 3 ? 3 : 6;
        if (idle > limit && !hint) hint = LR.findMove(state);
      }
    }
  }

  // ---------- desenho ----------
  function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (backdrop) ctx.drawImage(backdrop, 0, 0);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawEmbers(lastDt);
    if (scene === 'play' && state) drawBoard();
  }

  let emberC = null;
  function emberSprite() {
    if (emberC) return emberC;
    emberC = document.createElement('canvas'); emberC.width = emberC.height = 32;
    const x = emberC.getContext('2d'), g = x.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, 'rgba(255,214,140,1)'); g.addColorStop(0.35, 'rgba(240,150,60,0.5)'); g.addColorStop(1, 'rgba(240,150,60,0)');
    x.fillStyle = g; x.fillRect(0, 0, 32, 32);
    return emberC;
  }
  function drawEmbers(dt) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const e of embers) {
      e.y -= e.sp * (dt || 0.016); e.ph += (dt || 0.016);
      if (e.y < -10) { e.y = H + 10; e.x = Math.random() * W; }
      const x = e.x + Math.sin(e.ph * e.sw) * 14;
      const a = (0.35 + 0.35 * Math.sin(e.ph * 3 + e.x)) * Math.min(1, e.y / (H * 0.25));
      ctx.globalAlpha = Math.max(0, a);
      ctx.drawImage(emberSprite(), x - e.r * 4, e.y - e.r * 4, e.r * 8, e.r * 8);
    }
    ctx.restore();
  }

  function drawBoard() {
    const sh = shake * cs * 0.22;
    const sx = sh ? (Math.random() - 0.5) * sh : 0, sy = sh ? (Math.random() - 0.5) * sh : 0;
    ctx.save();
    ctx.translate(sx, sy);
    const BW = state.W, BH = state.H;
    // tabuleiro de pedra com filete de ouro (pré-desenhado em fitBoard)
    if (boardLayer) ctx.drawImage(boardLayer, boardLayerX, boardLayerY, boardLayer.width / dpr, boardLayer.height / dpr);
    for (let y = 0; y < BH; y++) for (let x = 0; x < BW; x++) {
      if (state.mask[y][x] && state.sand[y][x] > 0) { ctx.globalAlpha = ART.board ? 0.82 : 1; ctx.drawImage(ART.sandSprite(state.sand[y][x], S), ox + x * cs, oy + y * cs, cs, cs); ctx.globalAlpha = 1; }
    }
    // saída dos baús
    if (level.artifacts) {
      ctx.fillStyle = 'rgba(255,214,110,' + (0.55 + 0.35 * Math.sin(now * 4)) + ')';
      for (let x = 0; x < BW; x++) for (let y = BH - 1; y >= 0; y--) {
        if (!state.mask[y][x]) continue;
        if (!LR.isExit(state, x, y)) break;
        const cx = cellX(x), cy = oy + (y + 1) * cs + 8 + Math.sin(now * 4) * 2;
        ctx.beginPath(); ctx.moveTo(cx - cs * 0.22, cy); ctx.lineTo(cx + cs * 0.22, cy); ctx.lineTo(cx, cy + cs * 0.18); ctx.closePath(); ctx.fill();
        ctx.lineWidth = 1.5; ctx.strokeStyle = 'rgba(60,35,5,0.9)'; ctx.stroke();
        break;
      }
    }
    if (selected) {
      ctx.save();
      ctx.shadowColor = 'rgba(255,220,120,0.9)'; ctx.shadowBlur = cs * 0.3;
      ctx.strokeStyle = 'rgba(255,230,150,0.95)'; ctx.lineWidth = Math.max(2, cs * 0.05);
      ART.roundRect(ctx, ox + selected[0] * cs + 2, oy + selected[1] * cs + 2, cs - 4, cs - 4, cs * 0.14); ctx.stroke();
      ctx.restore();
    }
    // peças (cortadas no topo pra as novas entrarem por cima)
    ctx.save();
    ctx.beginPath(); ctx.rect(ox - 6, oy - 3, cs * BW + 12, cs * BH + 10); ctx.clip();
    const glintMap = new Map(glints.map((g) => [g.id, g.t]));
    for (let y = 0; y < BH; y++) for (let x = 0; x < BW; x++) {
      const p = state.grid[y][x];
      if (!p) continue;
      const v = V(p, x, y);
      let extra = 1;
      if (hint && ((hint[0][0] === x && hint[0][1] === y) || (hint[1][0] === x && hint[1][1] === y))) extra = 1 + 0.09 * Math.sin(now * 9);
      if (selected && selected[0] === x && selected[1] === y) extra = 1.08;
      drawPiece(p, v, extra, glintMap.get(p.id));
    }
    ctx.restore();
    for (const d of dying) {
      if (d.t < 0) { drawPiece(d.p, d.v, 1); continue; }
      const q = Math.min(1, d.t / d.dur);
      const v = Object.assign({}, d.v);
      if (d.kind === 'collect') { v.y = d.v.y - q * 0.8; v.s = 1 + q * 0.4; v.a = 1 - q; }
      else { v.s = d.v.s * (q < 0.3 ? 1 + q * 0.8 : 1.24 * (1 - (q - 0.3) / 0.7)); v.a = 1 - q * q; }
      drawPiece(d.p, v, 1);
    }
    drawParts();
    ctx.restore();
    drawFloats();
  }

  function drawPiece(p, v, extra, glintT) {
    const s = v.s * (extra || 1);
    if (s <= 0.01 || v.a <= 0.01) return;
    const cx = ox + (v.x + 0.5) * cs, cy = oy + (v.y + 0.5) * cs;
    const w = cs * s * (1 + v.sq), h = cs * s * (1 - v.sq);
    ctx.globalAlpha = v.a;
    // feitiço: aura da cor da pedra que "respira" devagar, cada joia no seu ritmo
    if (p.kind === 'gem' && !p.special && p.color != null && ART.hasAI) {
      const gg = ART.GEMS[p.color], pulse = 0.5 + 0.5 * Math.sin(now * 2.1 + p.id * 1.7);
      const r = cs * s * (0.6 + 0.1 * pulse);
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = (0.55 + 0.45 * pulse) * v.a;
      ctx.drawImage(auraSprite(p.color), cx - r, cy - r, r * 2, r * 2);
      ctx.restore();
    }
    if (p.special === 'idol') {
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(now * 0.8);
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = 'rgba(255,210,100,0.16)';
      for (let i = 0; i < 6; i++) { ctx.rotate(Math.PI / 3); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(cs * 0.62 * s, -cs * 0.1); ctx.lineTo(cs * 0.62 * s, cs * 0.1); ctx.closePath(); ctx.fill(); }
      ctx.restore();
    }
    if (p.special === 'barrel' && ART.fx('runering')) {   // Joia Selo: anel de runas girando em volta
      const r = ART.fx('runering'), sz = cs * s * 1.12;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(now * 0.9); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = v.a * (0.8 + 0.2 * Math.sin(now * 5));
      ctx.drawImage(r, -sz / 2, -sz / 2, sz, sz); ctx.restore();
    }
    if (p.armed) {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, cs * 0.6);
      g.addColorStop(0, 'rgba(255,90,40,' + (0.5 + 0.3 * Math.sin(now * 20)) + ')'); g.addColorStop(1, 'rgba(255,90,40,0)');
      ctx.fillStyle = g; ctx.fillRect(cx - cs * 0.6, cy - cs * 0.6, cs * 1.2, cs * 1.2);
    }
    // cintilar: cada joia alterna entre os quadros 3D no seu próprio ritmo (vai e volta)
    let fr = 0;
    const NF = !ART.hasAI && window.GEM3D && GEM3D.ready ? GEM3D.FRAMES : 1;
    if (NF > 1 && p.kind === 'gem' && !p.special) { const k = Math.floor(now * 5 + (p.id * 2.37) % 14) % (NF * 2 - 2); fr = k < NF ? k : NF * 2 - 2 - k; }
    const spr = ART.pieceSprite(p, S, fr);
    const isSel = selected && v === vis.get(p.id) && state && state.grid[selected[1]] && state.grid[selected[1]][selected[0]] === p;
    // joia parada e nítida; a cada ~7 s uma faixa de luz atravessa as facetas (cada joia no seu momento)
    const sweepU = ((now + p.id * 1.37) % 7) / 0.9;
    if (p.kind === 'gem' && !p.special && ART.hasAI && !REDUCED && (sweepU < 1 || isSel)) {
      if (gemFx.width !== S) { gemFx.width = gemFx.height = S; }
      gx2.globalCompositeOperation = 'copy'; gx2.drawImage(spr, 0, 0);
      gx2.globalCompositeOperation = 'source-atop';
      if (sweepU < 1) {
        const e = sweepU * sweepU * (3 - 2 * sweepU);
        gx2.globalAlpha = Math.sin(Math.PI * sweepU);
        gx2.drawImage(bandSprite(S), -S * 1.4 + e * S * 1.8, 0, S * 2, S);
        gx2.globalAlpha = 1;
      }
      ctx.save();
      ctx.translate(cx, cy + (cs * v.sq) / 2);
      if (isSel) { const k = Math.sin(now * 4); ctx.transform(Math.cos(k * 0.35), 0.03 * k, 0, 1, 0, 0); }   // selecionada: inclina e respira
      ctx.drawImage(gemFx, -w / 2, -h / 2, w, h);
      ctx.restore()
    } else {
      ctx.drawImage(spr, cx - w / 2, cy - h / 2 + (cs * v.sq) / 2, w, h);
    }
    if (p.vine) { ctx.save(); ctx.translate(cx, cy); ctx.rotate(now * 0.35 + p.id); ctx.globalAlpha = v.a * (0.85 + 0.15 * Math.sin(now * 3 + p.id)); ctx.drawImage(ART.vineSprite(S), -(cs * s) / 2, -(cs * s) / 2, cs * s, cs * s); ctx.restore(); }
    if (p.special === 'lineH' || p.special === 'lineV') {
      const [fx, fy] = ART.fusePoint(cs * s, p.special === 'lineV');
      const r = cs * (0.05 + Math.random() * 0.04);
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      const g = ctx.createRadialGradient(cx + fx, cy + fy, 0, cx + fx, cy + fy, r * 2.5);
      g.addColorStop(0, 'rgba(255,240,180,1)'); g.addColorStop(0.4, 'rgba(255,150,40,0.9)'); g.addColorStop(1, 'rgba(255,100,20,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx + fx, cy + fy, r * 2.5, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
    if (glintT != null) {
      const k = Math.sin((Math.PI * glintT) / 0.7), h = (p.id * 37) % 10;
      flare(cx + cs * (-0.2 + h * 0.035), cy - cs * (0.12 + (h % 4) * 0.04), cs * 0.27 * k, k * v.a);
    }
    ctx.globalAlpha = 1;
  }

  // aura (uma por cor) e faixa de reflexo pré-desenhadas: o quadro só copia imagem, sem recriar gradiente
  const auraCache = {};
  function auraSprite(color) {
    if (auraCache[color]) return auraCache[color];
    const gg = ART.GEMS[color], c = document.createElement('canvas'); c.width = c.height = 128;
    const x = c.getContext('2d'), au = x.createRadialGradient(64, 64, 8, 64, 64, 64);
    au.addColorStop(0, ART.hsl(gg.h, Math.min(100, gg.s + 12), Math.min(78, gg.l + 28), gg.key === 'diamond' ? 0.16 : 0.26));
    au.addColorStop(1, ART.hsl(gg.h, gg.s, gg.l, 0));
    x.fillStyle = au; x.fillRect(0, 0, 128, 128);
    return (auraCache[color] = c);
  }
  let bandC = null;
  function bandSprite(S) {
    if (bandC && bandC.height === S) return bandC;
    bandC = document.createElement('canvas'); bandC.width = S * 2; bandC.height = S;
    const x = bandC.getContext('2d'), g = x.createLinearGradient(S * 0.8, 0, S * 1.2, S * 0.35);
    g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.5, 'rgba(255,252,240,0.42)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = g; x.fillRect(0, 0, S * 2, S);
    return bandC;
  }
  // tela de apoio pro reflexo que corre pela joia (reaproveitada por todas)
  const gemFx = document.createElement('canvas'), gx2 = gemFx.getContext('2d');

  // faísca de joia: brilho central + raios longos em cruz (estrela de luz)
  function flare(x, y, r, a) {
    if (r <= 0.5 || a <= 0.02) return;
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = Math.min(1, a);
    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 0.55);
    g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.3, 'rgba(255,250,235,0.6)'); g.addColorStop(1, 'rgba(255,240,200,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 0.55, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    for (const [len, w, ang] of [[r * 1.7, r * 0.06, 0], [r * 1.7, r * 0.06, Math.PI / 2], [r * 0.8, r * 0.04, Math.PI / 4], [r * 0.8, r * 0.04, -Math.PI / 4]]) {
      ctx.save(); ctx.translate(x, y); ctx.rotate(ang + now * 0.4);
      ctx.beginPath(); ctx.moveTo(-len, 0); ctx.lineTo(0, -w); ctx.lineTo(len, 0); ctx.lineTo(0, w); ctx.closePath(); ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }

  function drawParts() {    for (const p of parts) {
      const q = p.life / p.max;
      if (p.type === 'shard') {
        ctx.save(); ctx.globalAlpha = 1 - q; ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.fillStyle = p.color; ctx.beginPath(); ctx.moveTo(0, -p.size); ctx.lineTo(p.size * 0.8, p.size * 0.6); ctx.lineTo(-p.size * 0.8, p.size * 0.6); ctx.closePath(); ctx.fill();
        ctx.restore();
      } else if (p.type === 'leaf') {
        ctx.save(); ctx.globalAlpha = 1 - q; ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.fillStyle = p.color; ctx.beginPath(); ctx.ellipse(0, 0, p.size, p.size * 0.45, 0, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      } else if (p.type === 'dust') {
        ctx.fillStyle = p.color + (0.5 * (1 - q)) + ')';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * (1 + q * 1.5), 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const p of parts) {
      const q = p.life / p.max;
      if (p.type === 'spark') {
        const r = p.size * (1 - q * 0.5);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2.2);
        g.addColorStop(0, 'rgba(255,255,255,' + (1 - q) + ')'); g.addColorStop(0.35, p.color); g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.globalAlpha = 1 - q; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, r * 2.2, 0, Math.PI * 2); ctx.fill();
      } else if (p.type === 'ring') {
        ctx.globalAlpha = 1 - q; ctx.strokeStyle = p.color; ctx.lineWidth = cs * 0.22 * (1 - q) + 1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * EASE.out(q), 0, Math.PI * 2); ctx.stroke();
      } else if (p.type === 'beam') {
        const th = cs * (0.95 - q * 0.7);
        ctx.globalAlpha = 1 - q * q;
        if (p.dir === 'h') {
          const y = cellY(p.at);
          const g = ctx.createLinearGradient(0, y - th / 2, 0, y + th / 2);
          g.addColorStop(0, 'rgba(255,120,40,0)'); g.addColorStop(0.5, 'rgba(255,245,200,1)'); g.addColorStop(1, 'rgba(255,120,40,0)');
          ctx.fillStyle = g; ctx.fillRect(ox - cs * 0.3, y - th / 2, cs * (state.W + 0.6), th);
        } else {
          const x = cellX(p.at);
          const g = ctx.createLinearGradient(x - th / 2, 0, x + th / 2, 0);
          g.addColorStop(0, 'rgba(255,120,40,0)'); g.addColorStop(0.5, 'rgba(255,245,200,1)'); g.addColorStop(1, 'rgba(255,120,40,0)');
          ctx.fillStyle = g; ctx.fillRect(x - th / 2, oy - cs * 0.3, th, cs * (state.H + 0.6));
        }
      } else if (p.type === 'bolt') {
        ctx.globalAlpha = 1 - q; ctx.strokeStyle = 'rgba(255,225,140,0.95)'; ctx.lineWidth = Math.max(1.5, cs * 0.05);
        ctx.beginPath(); ctx.moveTo(p.x1, p.y1);
        const n = 6;
        for (let i = 1; i < n; i++) {
          const t = i / n;
          ctx.lineTo(p.x1 + (p.x2 - p.x1) * t + (Math.random() - 0.5) * cs * 0.35, p.y1 + (p.y2 - p.y1) * t + (Math.random() - 0.5) * cs * 0.35);
        }
        ctx.lineTo(p.x2, p.y2); ctx.stroke();
      } else if (p.type === 'dart' && p.life >= 0) {
        const im = ART.fx('dart'), q2 = EASE.inout(q), L = cs * 1.9, Hh = L * im.height / im.width;
        const span = (p.h ? state.W : state.H) * cs + cs * 2, start = -cs + (p.dir > 0 ? 0 : span), pos = start + p.dir * q2 * span;
        const x = p.h ? ox + pos : cellX(p.at), y = p.h ? cellY(p.at) : oy + pos;
        ctx.save(); ctx.globalAlpha = 1 - Math.max(0, (q - 0.8) / 0.2); ctx.translate(x, y); ctx.rotate((p.h ? 0 : Math.PI / 2) + (p.dir < 0 ? Math.PI : 0));
        ctx.drawImage(im, -L * 0.8, -Hh / 2, L, Hh); ctx.restore();
      } else if (p.type === 'fxsprite' && p.life >= 0) {
        const im = ART.fx(p.key); if (im) {
          const sc = p.s0 + (p.s1 - p.s0) * EASE.out(q), w0 = p.tall ? cs * 0.75 : cs * sc, h0 = p.tall ? cs * 2.6 : w0 * im.height / im.width;
          const peak = { sunbeam: 0.42, flare2: 0.6, shock: 0.8 }[p.key] || 0.8;
          ctx.globalAlpha = peak * (1 - q) * (q < 0.15 ? q / 0.15 : 1); ctx.drawImage(im, p.x - w0 / 2, p.y - h0 / 2, w0, h0);
        }
      } else if (p.type === 'flash') {
        ctx.globalAlpha = 0.5 * (1 - q); ctx.fillStyle = '#fff4cc';
        ctx.fillRect(ox - cs, oy - cs, cs * (state.W + 2), cs * (state.H + 2));
      }
    }
    ctx.restore();
  }

  function drawFloats() {
    ctx.save();
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (const f of floats) {
      const q = f.t / 0.9;
      ctx.globalAlpha = q < 0.7 ? 1 : 1 - (q - 0.7) / 0.3;
      ctx.font = '700 ' + Math.round(cs * 0.42) + 'px "Uncial Antiqua", Georgia, serif';
      const y = f.y - q * cs * 0.9;
      ctx.lineWidth = Math.max(2, cs * 0.08); ctx.strokeStyle = 'rgba(10,8,4,0.85)'; ctx.strokeText(f.text, f.x, y);
      ctx.fillStyle = f.color; ctx.fillText(f.text, f.x, y);
    }
    ctx.restore();
  }

  // ---------- painel do jogo ----------
  const goalIconKey = (g) => (g.type === 'score' ? 'star' : g.type === 'collect' ? 'gem' + g.color : g.type === 'sand' ? 'sand' : g.type === 'rock' ? 'rock' : g.type === 'vine' ? 'vine' : 'chest');
  function goalLeft(g) {
    if (g.type === 'score') return Math.max(0, g.target - state.score);
    if (g.type === 'sand') return LR.sandLeft(state);
    return Math.max(0, g.target - g.count);
  }
  let chipEls = [], lastLeft = [];
  function buildGoalChips() {
    const box = $('goals');
    box.innerHTML = '';
    chipEls = state.goals.map((g) => {
      const el = document.createElement('div');
      el.className = 'chip';
      el.innerHTML = '<img alt="" src="' + ART.icon(goalIconKey(g), 64) + '"><b></b>';
      box.appendChild(el);
      return el;
    });
    lastLeft = state.goals.map(() => null);
    for (const k of ['mk1', 'mk2', 'mk3']) { $(k).classList.remove('on'); $(k).src = ART.icon('star0', 48); }
  }
  function renderHUD() {
    if (!state) return;
    const mv = $('moves');
    mv.textContent = state.moves;
    mv.classList.toggle('low', state.moves <= 5 && state.moves > 0 && !LR.isWon(state));
    $('score').innerHTML = '<img class="coin" alt="" src="' + ART.icon('coin', 48) + '">' + coinsOf(state.score).toLocaleString(I18N.lang === 'pt' ? 'pt-BR' : 'en-US');
    updateHammerBtn();
    const top = level.stars[2];
    $('starfill').style.width = Math.min(100, (state.score / top) * 100) + '%';
    level.stars.forEach((v, i) => {
      const el = $('mk' + (i + 1));
      el.style.left = Math.min(100, (v / top) * 100) - (i === 2 ? 4 : 0) + '%';
      const on = state.score >= v;
      if (on !== el.classList.contains('on')) { el.classList.toggle('on', on); el.src = ART.icon(on ? 'star' : 'star0', 48); if (on && scene === 'play') Sound.play('star', i); }
    });
    state.goals.forEach((g, i) => {
      const left = goalLeft(g), el = chipEls[i];
      if (!el) return;
      const done = LR.goalDone(state, g);
      el.classList.toggle('done', done);
      el.querySelector('b').textContent = done ? '✓' : (g.type === 'score' ? g.target.toLocaleString() : left);
      if (lastLeft[i] != null && left !== lastLeft[i]) { el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }
      lastLeft[i] = left;
    });
  }

  // ---------- janelas ----------
  function openModal(html) {
    const card = $('modalCard');
    card.innerHTML = html;
    $('modal').hidden = false;
    const first = card.querySelector('.btn');
    if (first) setTimeout(() => first.focus({ preventScroll: true }), 50);
    return card;
  }
  function closeModal() { $('modal').hidden = true; }
  const goalText = (g) => {
    if (g.type === 'collect') return T('goal.collect', { n: g.target }) + ' ' + I18N.gem(g.color);
    const s = T('goal.' + g.type, { n: g.type === 'score' ? g.target.toLocaleString() : g.target });
    return s.replace('baú(s)', g.target === 1 ? 'baú' : 'baús').replace('chest(s)', g.target === 1 ? 'chest' : 'chests');
  };
  const TUT_ICON = { swap: 'gem3', collect: 'gem0', line: 'dynamite', sand: 'sand', barrel: 'barrel', artifact: 'chest', idol: 'idol', rock: 'rock', diamond: 'gem5', vine: 'vine' };

  function openPre(id) {
    const L = LEVELS[id - 1];
    const tutKey = L.tut ? 'tut.' + L.tut : id === 9 ? 'tip.combo' : null;
    const rows = L.goals.map((g) => {
      const gg = Object.assign({}, g);
      if (g.type === 'sand') { gg.target = L.layout.join('').split('').reduce((n, c) => n + (c === 's' || c === 'w' ? 1 : c === 'S' || c === 'W' ? 2 : 0), 0); }
      return '<div class="goal-row"><img alt="" src="' + ART.icon(goalIconKey(g), 80) + '"><span>' + goalText(gg) + '</span></div>';
    }).join('');
    const card = openModal(
      '<div class="eyebrow">' + T('map.title').toUpperCase() + '</div>' +
      '<h2 class="metal">' + T('level') + ' ' + id + '</h2><div class="orn"><i></i></div>' +
      (L.boss ? '<div class="boss-tag">' + T('boss') + '</div>' : '') +
      '<div class="goal-list">' + rows + '</div>' +
      '<div class="moves-line">' + T('moves') + ': <b>' + L.moves + '</b></div>' +
      (tutKey ? '<div class="tut"><img alt="" src="' + ART.icon(TUT_ICON[L.tut] || 'barrel', 108) + '"><p>' + T(tutKey) + '</p></div>' : '') +
      boostPicker() +
      '<div class="btns"><button class="btn" id="mPlay" type="button">' + T('play') + '</button>' +
      '<button class="btn dark small" id="mMap" type="button">' + T('map') + '</button></div>');
    const picked = {};
    card.querySelectorAll('.boost').forEach((b) => { b.onclick = () => { const k = b.dataset.k; picked[k] = !picked[k]; b.classList.toggle('on', picked[k]); b.setAttribute('aria-pressed', picked[k]); Sound.play('click'); }; });
    const shopLink = card.querySelector('#mShop'); if (shopLink) shopLink.onclick = () => { Sound.play('click'); openShop(() => openPre(id)); };
    card.querySelector('#mPlay').onclick = () => {
      Sound.init(); Sound.play('click');
      for (const k in picked) if (picked[k] && save.items[k] > 0) save.items[k]--; else delete picked[k];
      persist(); closeModal(); wipe(() => startLevel(id, picked));
    };
    card.querySelector('#mMap').onclick = () => { Sound.play('click'); closeModal(); if (scene !== 'map') openMap(); };
  }

  async function showWin() {
    Ads.gameplay(false);
    const id = level.id, stars = LR.stars(state);
    const prevBest = save.best[id] || 0, isNew = state.score > prevBest && prevBest > 0;
    save.stars[id] = Math.max(save.stars[id] || 0, stars);
    save.best[id] = Math.max(prevBest, state.score);
    save.unlocked = Math.max(save.unlocked, Math.min(LEVELS.length, id + 1));
    save.wins = (save.wins || 0) + 1;
    const earned = coinsOf(state.score) + stars * 10;
    save.coins += earned;
    persist();
    Sound.play('win'); buzz([30, 60, 30, 60, 90]);
    setTimeout(() => Sound.voice('win', I18N.lang), 350);
    const last = id === LEVELS.length;
    const card = openModal(
      '<div class="eyebrow">' + T('level') + ' ' + id + '</div>' +
      '<h2 class="metal">' + T('win.title') + '</h2><div class="orn"><i></i></div>' +
      '<div class="stars-big"><img alt=""><img alt=""><img alt=""></div>' +
      '<div class="final-score"><img class="coin" alt="" src="' + ART.icon('coin', 96) + '">+<span id="mScore">0</span></div>' +
      '<div class="best' + (isNew ? ' new' : '') + '">' + (isNew ? T('win.new') + ' · ' : '') + T('wallet', { n: save.coins.toLocaleString() }) + '</div>' +
      (last ? '<p>' + T('map.soon') + '</p>' : '') +
      '<div class="btns">' + (last ? '' : '<button class="btn" id="mNext" type="button">' + T('next') + '</button>') +
      '<button class="btn dark small" id="mMap" type="button">' + T('map') + '</button></div>');
    const imgs = card.querySelectorAll('.stars-big img');
    imgs.forEach((im) => { im.src = ART.icon('star', 128); });
    const sc = { v: 0 }, target = earned;
    tween(sc, { v: target }, 1, 'out').then(() => {});
    const scoreEl = card.querySelector('#mScore');
    const iv = setInterval(() => { scoreEl.textContent = Math.round(sc.v).toLocaleString(); if (sc.v >= target) clearInterval(iv); }, 40);
    const next = card.querySelector('#mNext');
    if (next) next.onclick = () => {
      Sound.play('click'); closeModal();
      const go = () => openPre(id + 1);
      if (save.wins % 3 === 0) Ads.interstitial(go); else go();
    };
    card.querySelector('#mMap').onclick = () => { Sound.play('click'); closeModal(); wipe(openMap); };
    for (let i = 0; i < stars; i++) { await wait(0.35); imgs[i].classList.add('on'); Sound.play('star', i); }
  }

  function showLose() {
    Ads.gameplay(false);
    Sound.play('lose');
    const id = level.id;
    const rows = state.goals.filter((g) => !LR.goalDone(state, g)).map((g) =>
      '<div class="goal-row"><img alt="" src="' + ART.icon(goalIconKey(g), 80) + '"><span>' + goalText(g) + '</span><b>' + (g.type === 'score' ? goalLeft(g).toLocaleString() : goalLeft(g)) + '</b></div>').join('');
    const card = openModal(
      '<div class="eyebrow">' + T('level') + ' ' + id + '</div>' +
      '<h2 class="metal">' + T('lose.title') + '</h2><div class="orn"><i></i></div>' +
      '<div class="moves-line">' + T('lose.left') + '</div>' +
      '<div class="goal-list">' + rows + '</div>' +
      '<div class="btns">' +
      '<button class="btn stack" id="mExtra" type="button" hidden>' + T('lose.extra') + '<span class="sub">' + T('lose.extraAd') + '</span></button>' +
      '<button class="btn' + (usedExtra ? '' : ' stone') + '" id="mRetry" type="button">' + T('retry') + '</button>' +
      '<button class="btn dark small" id="mMap" type="button">' + T('map') + '</button></div>');
    card.querySelector('#mRetry').onclick = () => { Sound.play('click'); closeModal(); wipe(() => startLevel(id)); };
    card.querySelector('#mMap').onclick = () => { Sound.play('click'); closeModal(); wipe(openMap); };
    if (!usedExtra) {
      Ads.offerReward({
        onAvailable(show) {
          const b = card.querySelector('#mExtra');
          if (!b) return;
          b.hidden = false;
          b.onclick = () => { Sound.play('click'); show(); };
        },
        onReward() {
          usedExtra = true;
          state.moves += 5;
          closeModal(); renderHUD();
          Ads.gameplay(true);
          busy = false;
        },
      });
    }
  }

  function openPause() {
    if (scene !== 'play' || modalOpen() || busy) return;
    Sound.play('click');
    const card = openModal(
      '<h2 class="metal">' + T('pause') + '</h2><div class="orn"><i></i></div>' +
      '<div class="btns"><button class="btn" id="mResume" type="button">' + T('resume') + '</button>' +
      '<button class="btn dark" id="mRestart" type="button">' + T('restart') + '</button>' +
      '<button class="btn dark" id="mMap" type="button">' + T('map') + '</button></div>' +
      '<div class="toggle-row icons"><button class="icon-btn toggle" id="mSfx" type="button">' + $('btnSfx').innerHTML + '</button><button class="icon-btn toggle" id="mMusic" type="button">' + $('btnMusic').innerHTML + '</button></div>');
    const paint = () => {
      for (const [id, on, key] of [['#mSfx', Sound.sfx, 'menu.sound'], ['#mMusic', Sound.music, 'menu.music']]) { const b = card.querySelector(id); b.classList.toggle('off', !on); b.setAttribute('aria-pressed', on); b.setAttribute('aria-label', T(key) + ': ' + T(on ? 'on' : 'off')); }
    };
    paint();
    card.querySelector('#mResume').onclick = () => { Sound.play('click'); closeModal(); };
    card.querySelector('#mRestart').onclick = () => { Sound.play('click'); closeModal(); wipe(() => startLevel(level.id)); };
    card.querySelector('#mMap').onclick = () => { Sound.play('click'); closeModal(); wipe(openMap); };
    card.querySelector('#mSfx').onclick = () => { Sound.setSfx(!Sound.sfx); paint(); };
    card.querySelector('#mMusic').onclick = () => { Sound.setMusic(!Sound.music); paint(); };
  }
  $('btnPause').onclick = openPause;
  $('modal').addEventListener('pointerdown', (e) => { e.stopPropagation(); });

  // ---------- loja do templo e vantagens ----------
  function boostPicker() {
    const owned = SHOP.filter((it) => it.id !== 'hammer' && save.items[it.id] > 0);
    if (!owned.length) return '<button class="link-btn" id="mShop" type="button">' + T('shop.get') + '</button>';
    return '<div class="boosts"><div class="moves-line">' + T('shop.use') + '</div><div class="boost-row">' +
      owned.map((it) => '<button class="boost" type="button" aria-pressed="false" data-k="' + it.id + '"><img alt="" src="' + ART.icon(it.icon, 80) + '"><span>' + T('item.' + it.id) + '</span><b>×' + save.items[it.id] + '</b></button>').join('') +
      '</div></div>';
  }
  function openShop(back) {
    Sound.play('click');
    const render = () => {
      const card = openModal(
        '<div class="eyebrow">' + T('shop.eyebrow') + '</div>' +
        '<h2 class="metal">' + T('shop.title') + '</h2><div class="orn"><i></i></div>' +
        '<div class="wallet"><img class="coin" alt="" src="' + ART.icon('coin', 96) + '"><b>' + save.coins.toLocaleString() + '</b></div>' +
        '<div class="shop-list">' + SHOP.map((it) =>
          '<div class="shop-item"><img alt="" src="' + ART.icon(it.icon, 96) + '"><div><b>' + T('item.' + it.id) + '</b><span>' + T('item.' + it.id + '.d') + '</span><small>' + T('shop.have', { n: save.items[it.id] }) + '</small></div>' +
          '<button class="btn small buy" type="button" data-id="' + it.id + '"' + (save.coins < it.price ? ' disabled' : '') + '><img class="coin" alt="" src="' + ART.icon('coin', 48) + '">' + it.price + '</button></div>').join('') + '</div>' +
        '<p class="shop-note">' + T('shop.note') + '</p>' +
        '<div class="btns"><button class="btn dark small" id="mBack" type="button">' + T('close') + '</button></div>');
      card.querySelectorAll('.buy').forEach((b) => { b.onclick = () => {
        const it = SHOP.find((x) => x.id === b.dataset.id);
        if (!it || save.coins < it.price) return;
        save.coins -= it.price; save.items[it.id]++; persist();
        Sound.play('chest'); render(); paintWallet();
      }; });
      card.querySelector('#mBack').onclick = () => { Sound.play('click'); closeModal(); if (back) back(); };
    };
    render();
  }
  function paintWallet() { const el = $('mapCoins'); if (el) el.textContent = save.coins.toLocaleString(); }

  // martelo: o próximo toque quebra a joia escolhida (não gasta movimento)
  let hammerMode = false;
  function updateHammerBtn() {
    const b = $('btnHammer'); if (!b) return;
    b.hidden = scene !== 'play' || !(save.items.hammer > 0);
    b.classList.toggle('on', hammerMode);
    $('hammerCount').textContent = '×' + (save.items.hammer || 0);
  }
  $('btnHammer').onclick = () => { if (busy || scene !== 'play' || !(save.items.hammer > 0)) return; hammerMode = !hammerMode; Sound.play('click'); updateHammerBtn(); };
  async function useHammer(c) {
    hammerMode = false; save.items.hammer--; persist(); updateHammerBtn();
    busy = true; praiseLevel = 0;
    Sound.play('rock'); addShake(0.3);
    await play(LR.resolve(state, { hits: [{ x: c[0], y: c[1], src: 'blast' }] }));
    await afterMove();
  }

  // ---------- menu ----------
  function paintMenu() {
    document.querySelectorAll('[data-t]').forEach((el) => { el.textContent = T(el.dataset.t); });
    $('btnPlay').textContent = save.unlocked > 1 ? T('menu.continue') : T('menu.play');
    for (const [id, on, key] of [['btnSfx', Sound.sfx, 'menu.sound'], ['btnMusic', Sound.music, 'menu.music']]) {
      const b = $(id); b.classList.toggle('off', !on); b.setAttribute('aria-pressed', on); b.setAttribute('aria-label', T(key) + ': ' + T(on ? 'on' : 'off')); b.title = T(key);
    }
    $('btnLang').textContent = T('lang');
    $('btnPause').setAttribute('aria-label', T('pause'));
  }
  function openMenu() {
    scene = 'menu'; state = null; updateHammerBtn();
    $('hud').hidden = true; $('screen-map').hidden = true; $('screen-menu').hidden = false;
    paintMenu();
  }
  $('btnPlay').onclick = () => {
    Sound.init(); Sound.play('click');
    wipe(() => { openMap(); if (save.unlocked === 1 && !save.stars[1]) openPre(1); });
  };
  $('btnSfx').onclick = () => { Sound.init(); Sound.setSfx(!Sound.sfx); paintMenu(); Sound.play('click'); };
  $('btnMusic').onclick = () => { Sound.init(); Sound.setMusic(!Sound.music); paintMenu(); };
  $('btnLang').onclick = () => { I18N.toggle(); paintMenu(); Sound.play('click'); };
  $('btnMapBack').onclick = () => { Sound.play('click'); wipe(openMenu); };

  // ---------- mapa ----------
  function openMap() {
    Ads.gameplay(false);
    scene = 'map'; state = null; updateHammerBtn();
    $('hud').hidden = true; $('screen-menu').hidden = true; $('screen-map').hidden = false;
    paintMenu();
    buildMap();
  }
  function buildMap() {
    const inner = $('mapInner'), scroll = $('mapScroll');
    const n = LEVELS.length, D = window.ART_DATA || {};
    let totalStars = 0;
    for (let i = 1; i <= n; i++) totalStars += save.stars[i] || 0;
    // câmera de jornada (estilo Mario/DK/Crash): o mapa fica ~1,9x a altura da tela e rola;
    // só o caminho até a fase atual aparece, o resto fica escondido na névoa
    const fullW = scroll.clientWidth || W, h = scroll.clientHeight || H;
    const w = Math.min(fullW, Math.round(h * 0.72));
    const IW = 832, IH = 1248, mapH = Math.round(h * 1.9), s = mapH / IH, mapW = IW * s;
    // centraliza na horizontal na fase atual (o caminho serpenteia de um lado pro outro)
    const RP = (D.mapPath || [[416, 1200], [416, 150]]); let rTot = 0; const rSeg = [];
    for (let i = 0; i < RP.length - 1; i++) { const l = Math.hypot(RP[i + 1][0] - RP[i][0], RP[i + 1][1] - RP[i][1]); rSeg.push(l); rTot += l; }
    const rAt = (dd) => { for (let i = 0; i < rSeg.length; i++) { if (dd <= rSeg[i] || i === rSeg.length - 1) { const k = Math.min(1, dd / rSeg[i]); return [RP[i][0] + (RP[i + 1][0] - RP[i][0]) * k, RP[i][1] + (RP[i + 1][1] - RP[i][1]) * k]; } dd -= rSeg[i]; } return RP[RP.length - 1]; };
    const curRaw = rAt((rTot * (Math.min(save.unlocked, n) - 0.5)) / n);
    const offX = Math.max(w - mapW, Math.min(0, w / 2 - curRaw[0] * s)), offY = 0;
    inner.style.height = mapH + 'px'; inner.style.width = w + 'px'; inner.style.margin = '0 auto';
    $('screen-map').style.backgroundImage = D.map ? 'url("' + D.map + '")' : 'none';
    inner.style.backgroundImage = D.map ? 'url("' + D.map + '")' : 'none';
    inner.style.backgroundSize = mapW + 'px ' + mapH + 'px';
    inner.style.backgroundPosition = offX + 'px ' + offY + 'px';
    const P = (D.mapPath || [[416, 1200], [416, 150]]).map(([x, y]) => [offX + x * s, offY + y * s]);
    const seg = []; let tot = 0;
    for (let i = 0; i < P.length - 1; i++) { const l = Math.hypot(P[i + 1][0] - P[i][0], P[i + 1][1] - P[i][1]); seg.push(l); tot += l; }
    const at = (d) => { for (let i = 0; i < seg.length; i++) { if (d <= seg[i] || i === seg.length - 1) { const k = Math.min(1, d / seg[i]); return [P[i][0] + (P[i + 1][0] - P[i][0]) * k, P[i][1] + (P[i + 1][1] - P[i][1]) * k]; } d -= seg[i]; } return P[P.length - 1]; };
    const pts = LEVELS.map((L, i) => at((tot * (i + 0.5)) / n));
    const curIdx = Math.min(save.unlocked, n) - 1;
    // borda da névoa: no meio do caminho entre a fase atual e a próxima
    const fogAt = (i) => (i >= n - 1 ? pts[n - 1][1] - 90 * s : (pts[i][1] + pts[i + 1][1]) / 2 + 10);
    const fogPrevIdx = Math.min(curIdx, save.fogShown == null ? curIdx : save.fogShown);
    const lock = '<svg class="lock" viewBox="0 0 20 20"><path d="M6 8V6a4 4 0 1 1 8 0v2h1v10H5V8zm2 0h4V6a2 2 0 1 0-4 0z"/></svg>';
    let html = '';
    LEVELS.forEach((L, i) => {
      if (i > curIdx) return;   // fases à frente: mistério
      const id = i + 1, st = save.stars[id] || 0;
      const locked = id > save.unlocked, current = id === save.unlocked && !st;
      const gem = locked ? (L.boss ? 'g-amethyst' : 'g-night') : 'g-emerald';
      const cls = 'node' + (st ? ' done' : '') + (L.boss ? ' boss' : '') + (locked ? ' locked' : '') + (current ? ' current' : '');
      const NI = (k) => ART.nodeImg(k), starSrc = (on) => NI(on ? 'star' : 'star0') || ART.icon(on ? 'star' : 'star0', 40);
      const stars = locked || current ? '' : '<span class="st">' + [0, 1, 2].map((k) => '<img alt="" src="' + starSrc(k < st) + '">').join('') + '</span>';
      const face = locked ? (L.boss ? '<img class="scarab" alt="" src="' + ART.icon('scarab', 80) + '">' : lock) : '<span class="num">' + id + '</span>';
      html += '<button type="button" class="' + cls + '" data-id="' + id + '" style="left:' + pts[i][0].toFixed(1) + 'px;top:' + pts[i][1].toFixed(1) + 'px;z-index:' + (current ? 30 : 10 + i) + '"' +
        (locked ? ' disabled' : '') + ' aria-label="' + T('level') + ' ' + id + (locked ? ' (bloqueada)' : '') + '">' +
        (current ? '<span class="cur-label">' + T('level') + '</span>' : '') +
        (NI('done') ? '<img class="node-img" alt="" src="' + NI(current ? 'current' : locked ? (L.boss ? 'boss' : 'locked') : L.boss ? 'boss' : 'done') + '">' + (locked ? '' : '<span class="num">' + id + '</span>') : '<span class="hex-frame"></span><span class="hex-gem ' + gem + '"></span>' + face) +
        (current ? '<span class="cur-bar"><i style="width:' + Math.max(4, Math.round((totalStars / (n * 3)) * 100)) + '%"></i></span>' : stars) + '</button>';
    });
    html += '<div class="map-fog" style="height:' + fogAt(fogPrevIdx).toFixed(0) + 'px"><i class="c1"></i><i class="c2"></i><i class="c3"></i></div>';
    const FX = D.mapFx || {}, pos = (p) => 'left:' + (offX + p[0] * s).toFixed(1) + 'px;top:' + (offY + p[1] * s).toFixed(1) + 'px';
    let fx = '';
    (FX.torch || []).forEach((p, k) => { fx += '<i class="fx-torch" style="' + pos(p) + ';--d:' + (k * 0.37) + 's;--r:' + (60 * s * 1.9) + 'px"></i>'; });
    if (FX.door) fx += '<i class="fx-door" style="' + pos(FX.door) + ';--r:' + (130 * s) + 'px"></i>';
    (FX.gems || []).forEach((p, k) => { fx += '<i class="fx-gem" style="' + pos(p) + ';--d:' + ((k * 0.73) % 4) + 's"></i>'; });
    if (FX.disc) fx += '<i class="fx-disc" style="' + pos(FX.disc) + ';--r:' + (300 * s) + 'px"></i>';
    for (let k = 0; k < 40; k++) fx += '<i class="fx-fly" style="left:' + (Math.random() * w).toFixed(0) + 'px;top:' + (Math.random() * mapH).toFixed(0) + 'px;--d:' + (Math.random() * 8).toFixed(2) + 's;--t:' + (6 + Math.random() * 6).toFixed(2) + 's"></i>';
    // câmera: começa na fase atual; se abriu fase nova, a névoa recua revelando o próximo trecho
    const camY = (y) => Math.max(0, Math.min(mapH - h, y - h * 0.62));
    requestAnimationFrame(() => {
      scroll.scrollTop = camY(pts[curIdx][1] + (fogPrevIdx < curIdx ? 60 : 0));
      if (fogPrevIdx < curIdx) {
        const fog = inner.querySelector('.map-fog');
        setTimeout(() => { fog.style.height = fogAt(curIdx).toFixed(0) + 'px'; Sound.play('idol'); scroll.scrollTo({ top: camY(pts[curIdx][1]), behavior: 'smooth' }); }, 600);
      }
      save.fogShown = curIdx; persist();
    });    inner.innerHTML = '<div class="map-fx" aria-hidden="true">' + fx + '</div>' + html;
    $('mapStars').textContent = totalStars + '/' + n * 3;
    $('mapStarIc').src = ART.icon('star', 44);
    $('mapCoinIc').src = ART.icon('coin', 64);
    paintWallet();
    inner.querySelectorAll('.node:not(.locked)').forEach((b) => { b.onclick = () => { Sound.init(); Sound.play('click'); openPre(+b.dataset.id); }; });
  }
  $('btnShop').onclick = () => { Sound.init(); openShop(); };
  // ---------- laço principal ----------
  let last = performance.now(), lastDt = 0.016;
  function frame(t) {
    const dt = Math.min(0.05, (t - last) / 1000);
    last = t; lastDt = dt;
    stepTime(dt);
    update(dt);
    draw();
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', () => { layout(); if (scene === 'map') buildMap(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) Sound.pause(); else Sound.resume(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') { if (modalOpen() && $('modalCard').querySelector('#mResume')) closeModal(); else openPause(); } });
  Ads.setHooks({ pause: () => Sound.pause(), resume: () => Sound.resume() });

  // atalho de teste automático: avança o relógio do jogo sem depender da tela (aba escondida não anima)
  window.__lr = {
    async step(sec) {
      for (let t = 0; t < sec; t += 1 / 60) {
        stepTime(1 / 60); update(1 / 60);
        for (let k = 0; k < 6; k++) await null; // deixa as etapas assíncronas andarem
      }
      draw();
    },
    swap(a, b) { if (!busy) trySwap(a, b); },
    get state() { return state; }, get busy() { return busy; }, get scene() { return scene; },
    findMove() { return state && LR.findMove(state); },
  };

  function boot() {
    layout();
    TEX.applyCss();
    // kit de interface pintado: cada peça vira variável CSS (--ui-btn, --ui-frame...)
    const UIK = ART.uiImages();
    for (const k in UIK) { const im = UIK[k]; const url = im.toDataURL ? im.toDataURL('image/png') : im.src; document.documentElement.style.setProperty('--ui-' + k, 'url(' + url + ')'); }
    if (Object.keys(UIK).length) document.documentElement.classList.add('ui-kit');
    UIART.applyCorners();
    $('hammerIc').src = ART.icon('hammer', 80);
    if (!window.ART_DATA) GEM3D.init();
    ART.clearCache();
    const ld = $('loading'); ld.classList.add('done'); setTimeout(() => ld.remove(), 700);
    const m = /^#fase(\d+)$/.exec(location.hash || '');
    if (m && LEVELS[+m[1] - 1]) { openMap(); openPre(+m[1]); }
    else if (/^#jogar\d+$/.test(location.hash)) startLevel(+location.hash.slice(6));
    else if (location.hash === '#fxdemo') { startLevel(5); setTimeout(() => { state.grid[3][2].special = 'lineH'; state.grid[5][5].special = 'barrel'; state.grid[6][1] = { id: 9997, kind: 'gem', color: null, special: 'idol', armed: false, vine: false }; setInterval(() => { if (Math.random() < 0.34) blastFx({ special: 'lineH', x: 2, y: 3, area: [] }); else if (Math.random() < 0.5) blastFx({ special: 'barrel', x: 5, y: 5, area: [] }); else blastFx({ special: 'idol', x: 1, y: 6, area: [[0, 0], [3, 1], [6, 2], [4, 7]] }); }, 1400); if (0) setInterval(() => { blastFx({ special: 'lineH', x: 2, y: 3, area: [] }); blastFx({ special: 'barrel', x: 5, y: 5, area: [] }); blastFx({ special: 'idol', x: 1, y: 6, area: [[0, 0], [3, 1], [6, 2], [4, 7]] }); }, 900); }, 1500); }
    else if (/^#evento-/.test(location.hash)) { if (location.hash === '#evento-anton') document.documentElement.classList.add('ev-anton'); startLevel(3); setTimeout(() => { showPraise(T('praise.3')); const b = document.createElement('div'); b.className = 'praise banner'; b.textContent = T('rush'); b.style.top = '62%'; b.style.animation = 'none'; b.style.transform = 'translate(-50%,-50%)'; document.body.appendChild(b); const a = document.querySelector('.praise:not(.banner)'); if (a) { a.style.animation = 'none'; a.style.transform = 'translate(-50%,-50%)'; a.style.opacity = '1'; a.style.top = '40%'; setTimeout(() => document.body.appendChild(a), 1); } }, 2600); }
    else if (location.hash === '#mapa') openMap();
    else if (location.hash === '#mapademo') { save.unlocked = 7; save.fogShown = 5; for (let i = 1; i <= 6; i++) save.stars[i] = (i % 3) + 1; openMap(); }
    else if (location.hash === '#loja') { openMap(); openShop(); }
    else openMenu();
    requestAnimationFrame(frame);
  }
  $('loadingTxt').textContent = T('loading');
  const fontsReady = document.fonts && document.fonts.ready ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]) : Promise.resolve();
  fontsReady.then(() => ART.loadAI(boot));
})();
