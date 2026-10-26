// Lost Relics — tela, animação, toque, efeitos, mapa e janelas.
// As regras ficam no engine.js; aqui só se mostra o que ele decide.
(function () {
  'use strict';
  const T = (k, v) => I18N.t(k, v);
  const $ = (id) => document.getElementById(id);
  const track = (name, params) => { if (window.Telemetry) Telemetry.event(name, params || {}); };
  const canvas = $('stage'), ctx = canvas.getContext('2d');
  const REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- progresso salvo no aparelho ----------
  const SAVE_KEY = 'lostrelics.save.v1';
  let save = { unlocked: 1, stars: {}, best: {}, wins: 0 };
  try { const s = JSON.parse(localStorage.getItem(SAVE_KEY)); if (s && s.unlocked) save = Object.assign(save, s); } catch (e) {}
  save.coins = save.coins == null ? 300 : save.coins;
  save.items = Object.assign({ moves: 0, dyn: 0, seal: 0, orb: 0, hammer: 1 }, save.items);
  // 18/10: entrou a Onça normal como fase 9; o progresso que era da fase 9 em diante passa a ser da fase seguinte (uma vez só, e já grava)
  if (!save.v2) {
    const sh = (o) => { const n = {}; for (const k in (o || {})) n[+k >= 9 ? +k + 1 : k] = o[k]; return n; };
    save.stars = sh(save.stars); save.best = sh(save.best);
    if (save.unlocked >= 9) save.unlocked++;
    if (save.fogShown != null && save.fogShown >= 8) save.fogShown++;
    save.v2 = 1;
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) {}
  }
  // 18/10: entrou o Mundo 1 = Amazônia (15 fases novas na frente); todo progresso anda +15 (uma vez só, e já grava).
  // Quem nunca jogou (fase 1 aberta, sem estrela) começa na Amazônia.
  if (!save.v3) {
    const played = save.unlocked > 1 || Object.keys(save.stars || {}).length > 0;
    if (played) {
      const sh = (o) => { const n = {}; for (const k in (o || {})) n[+k + 15] = o[k]; return n; };
      save.stars = sh(save.stars); save.best = sh(save.best);
      save.unlocked += 15;
      if (save.fogShown != null) save.fogShown += 15;
      if (save.orbAt != null) save.orbAt += 15;
    }
    save.v3 = 1;
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) {}
  }
  // 18/10: Amazônia ganhou 6 fases (a antiga 15, chefe final, virou a 21) e o Egito 14 (o chefe final antigo, 66, virou a 86):
  // o progresso anda +6 a partir da 15 e +20 a partir da 66 (uma vez só, e já grava)
  if (!save.v4) {
    const mv = (k) => (k >= 66 ? k + 20 : k >= 15 ? k + 6 : k);
    const sh = (o) => { const n = {}; for (const k in (o || {})) n[mv(+k)] = o[k]; return n; };
    save.stars = sh(save.stars); save.best = sh(save.best);
    save.unlocked = mv(save.unlocked);
    if (save.fogShown != null) save.fogShown = mv(save.fogShown + 1) - 1;
    if (save.orbAt != null) save.orbAt = mv(save.orbAt + 1) - 1;
    save.v4 = 1;
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) {}
  }
  // skins compradas no Códice (16/10): owned = ids comprados; skins = a que está em uso em cada aba (null = a de fábrica)
  save.owned = save.owned || [];
  save.skins = Object.assign({ gem: null, word: null, trail: null }, save.skins);
  // O modo normal abre a jornada; vencer uma fase libera a versão difícil competitiva dela.
  save.hardBest = save.hardBest || {};
  save.hardWeekly = save.hardWeekly || { week: '', scores: {} };
  // Trilha do Explorador (16/10, adaptado do "win streak" do Candy): vitórias seguidas (0-3) viram vantagem grátis na fase seguinte
  save.streak = save.streak || 0;
  // link de teste (tools/montar-link.js): todas as fases abertas, pra testar qualquer uma em qualquer aparelho
  if (window.LR_TESTE) save.unlocked = Math.max(save.unlocked, LEVELS.length);
  // moedas da fase = pontos / 100 (+10 por estrela na vitória)
  const coinsOf = (score) => Math.floor(score / 100);
  // art = ícone pintado (loja do Códice); icon = vetor de reserva
  const SHOP = [
    { id: 'moves', price: 150, icon: 'hourglass', art: 'ixmoves' },
    { id: 'dyn', price: 200, icon: 'dynamite', art: 'ixarrow' },
    { id: 'seal', price: 250, icon: 'barrel', art: 'ixseal' },
    { id: 'hammer', price: 250, icon: 'hammer', art: 'hham' },
    { id: 'orb', price: 400, icon: 'idol', art: 'ixorb' },
  ];
  const itemImg = (it, size) => ART.nodeImg(it.art) || ART.icon(it.icon, size);
  // aplica as skins em uso (joia e rastro trocam a arte no art.js; palavra troca as imagens do anúncio e dos elogios)
  const applySkins = () => ART.setSkins({ gem: save.skins.gem, fx: save.skins.trail });
  const wordImg = (k) => (save.skins.word === 'rare' && ART.nodeImg('wr_' + k)) || ART.nodeImg(k);
  const persist = () => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) {} };
  const hardWeeklyScores = () => {
    const week = Records.week();
    if (save.hardWeekly.week !== week) save.hardWeekly = { week, scores: {} };
    return save.hardWeekly.scores;
  };
  const cloneLevel = (L) => Object.assign({}, L, {
    goals: L.goals.map((g) => Object.assign({}, g)), layout: L.layout.slice(), stars: L.stars.slice(),
  });
  function normalLevel(base) {
    const L = cloneLevel(base);
    L.normal = true;
    L.moves = Math.max(base.moves + 4, Math.ceil(base.moves * 1.25));
    L.weak = false;
    if (L.bossHp) L.bossHp = Math.max(2, Math.ceil(L.bossHp * 0.75));
    if (L.scarabHp) L.scarabHp = Math.max(1, Math.ceil(L.scarabHp * 0.75));
    if (L.bombTimer) L.bombTimer += 3;
    if (L.bombSpawn) L.bombSpawn *= 0.6;
    if (L.clockSpawn) L.clockSpawn *= 1.5;
    L.goals.forEach((g) => {
      if (g.target && ['score', 'collect', 'rock', 'vine', 'make'].includes(g.type)) g.target = Math.max(1, Math.ceil(g.target * 0.82));
    });
    L.stars = L.stars.map((n) => Math.max(1, Math.round(n * 0.82)));
    return L;
  }
  function hardSeed(week, levelId) {
    let h = 2166136261;
    const key = 'lost-relics:level:' + week + ':' + levelId;
    for (let i = 0; i < key.length; i++) { h ^= key.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function levelMode(id, hard) {
    const base = LEVELS[id - 1];
    if (!hard) return normalLevel(base);
    const L = cloneLevel(base), week = Records.week();
    L.hard = true; L.week = week; L.seed = hardSeed(week, id);
    return L;
  }

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
      // fase de chefe: um pouco mais de espaço em cima pra barra de vida
      const barH = level && (level.boss || level.scarab || level.bossKind) && ART.nodeImg('hpbar') ? 0.45 : 0;
      const needH = 8 + T * 0.45 + B * 0.9 + barH;
      // tela estreita (celular): a pedra de fora da moldura pode sair da tela; ficam o filete de ouro e a faixa de glifos (~0,55 casa de cada lado)
      const crop = W < 560 ? Math.max(1.4, L + R - 1.1) : 1.4;
      cs = Math.max(20, Math.floor(Math.min(W / (8 + L + R - crop), availH / needH, 80)));
      ox = Math.round((W - cs * 8) / 2);
      oy = Math.round(top + (T * 0.45 + barH) * cs + Math.max(0, (availH - needH * cs) * 0.35));
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
  let runStartedAt = 0, runEnded = false, tutorialMove = null;
  let vis = new Map(), dying = [], parts = [], floats = [], glints = [];
  let shake = 0, hint = null, idle = 0, selected = null, drag = null, usedExtra = false, praiseLevel = 0, glintClock = 0;
  const modalOpen = () => !$('modal').hidden;
  const runMode = () => level && (level.daily ? 'daily' : level.weekly ? 'weekly' : level.hard ? 'hard' : 'normal');
  function finishRun(result, extra) {
    if (runEnded || !level || !state) return;
    runEnded = true;
    track('level_end', Object.assign({
      level: Number.isInteger(level.id) ? level.id : 0,
      mode: runMode(), result, score: Math.max(0, Math.floor(state.score || 0)),
      moves_left: Math.floor(state.moves || 0), duration_ms: Math.max(0, Date.now() - runStartedAt),
    }, extra || {}));
  }
  function abandonRun(reason) {
    if (runEnded || !level || !state) return;
    runEnded = true;
    track('level_abandon', {
      level: Number.isInteger(level.id) ? level.id : 0,
      mode: runMode(), result: reason || 'leave', score: Math.max(0, Math.floor(state.score || 0)),
      moves_left: Math.floor(state.moves || 0), duration_ms: Math.max(0, Date.now() - runStartedAt),
    });
  }
  function V(p, x, y) {
    let v = vis.get(p.id);
    if (!v) { v = { x, y, s: 1, a: 1, sq: 0 }; vis.set(p.id, v); }
    return v;
  }
  const cellX = (x) => ox + (x + 0.5) * cs, cellY = (y) => oy + (y + 0.5) * cs;

  async function startLevel(id, boosts, hard) {
    const hardAllowed = Number.isInteger(id) && !!hard && !!save.stars[id];
    const Ld = id === 'daily' ? dailyLevel() : id === 'weekly' ? weeklyLevel() : levelMode(id, hardAllowed);
    if ((Ld.bossKind || Ld.scarab) && !EXTRA.done) await extraReady();
    level = Ld;
    runStartedAt = Date.now(); runEnded = false; tutorialMove = null;
    weeklyReplay = level.weekly || level.hard ? [] : weeklyReplay;
    state = level.daily ? dailyState(level) : LR.createState(level, level.weekly || level.hard ? level.seed : ((Date.now() & 0x7fffffff) ^ (id * 7919)) >>> 0);
    if (!level.daily && !level.weekly && !level.hard) { applyBoosts(boosts || {}); applyStreak(); } // modos competitivos são iguais pra todos: sem loja nem trilha
    hammerMode = false;
    RUIN_KEYS.forEach(nodeImgObj);
    vis = new Map(); dying = []; parts = []; floats = []; glints = []; bossAnims = []; bossFlash = []; serpTrail = []; bombTick = {}; threads = []; barShown = null; barHp = null; barHitT = -9;
    // fase de chefe: já carrega toda a arte dele (vidas, golpe, morte), senão o 1º golpe aparece sem desenho
    if (level.bossKind || level.scarab) { // chefe ou enxame de escaravelhos em fase comum
      for (const k of Object.values(BOSS_SPR[bossKindOf(level)])) if (typeof k === 'string') nodeImgObj(k);
      nodeImgObj('sshield'); nodeImgObj('jstone'); nodeImgObj('ostone'); nodeImgObj('alump');
      ['hpbar', 'hpgreen', 'hpred', 'hpcrack', 'name_' + bossKindOf(level)].forEach(nodeImgObj);
    }
    hint = null; selected = null; drag = null; usedExtra = false; idle = 0; shake = 0;
    scene = 'play';
    $('screen-map').hidden = true; $('screen-menu').hidden = true; $('hud').hidden = false;
    buildGoalChips();
    if (level.daily || level.weekly) { $('goals').innerHTML = ''; chipEls = []; }
    renderHUD();
    fitBoard();
    Ads.gameplay(true);
    track('level_start', { level: Number.isInteger(level.id) ? level.id : 0, mode: runMode(), moves: state.moves });
    busy = true;
    const proms = [];
    for (let y = 0; y < state.H; y++) for (let x = 0; x < state.W; x++) {
      const p = state.grid[y][x];
      if (!p) continue;
      const v = V(p, x, y - state.H - 1);
      proms.push(tween(v, { y }, 0.42, 'in', x * 0.025 + (state.H - y) * 0.035).then(() => { v.sq = 0.1; tween(v, { sq: 0 }, 0.14); }));
    }
    if (level.daily) showPraise(T('daily.hint'), 'info');
    else if (level.weekly) showPraise(T('weekly.hint'), 'info');
    else announceLevel(level);
    intro = null;
    if (level.boss || level.bossKind) startIntro(level);
    await Promise.all(proms);
    if (intro) await wait(Math.max(0, intro.t0 + INTRO_DUR - now)); // sem jogar durante a entrada do chefe
    busy = false;
    // resumo de 3 s quando o tabuleiro fica pronto (depois da entrada do chefe, pra não brigar com ela)
    const tutorialRun = level.id === 1 && !level.hard && !save.tutorialDone;
    if (!level.daily && !level.weekly && !tutorialRun && scene === 'play' && level === Ld) briefLevel(level);
    if (level.id === 1 && !level.hard && !level.daily && !level.weekly && !save.tutorialDone) {
      tutorialMove = LR.findMove(state);
      hint = tutorialMove;
      if (tutorialMove) {
        // só depois do "FASE 1" sumir, pra não sobrepor
        setTimeout(() => { if (tutorialMove) showTutorialTip(); }, Math.max(0, announcedAt + 2400 - performance.now()));
        track('tutorial_begin', { level: 1, mode: 'normal' });
      }
    }
  }

  // Trilha do Explorador: 1 vitória seguida = 1 Joia Flecha grátis; 2 = + Joia Selo; 3 = + Orbe Solar
  function applyStreak() {
    const n = Math.min(3, save.streak || 0);
    if (!n) return;
    const l = []; for (let y = 0; y < state.H; y++) for (let x = 0; x < state.W; x++) { const p = state.grid[y][x]; if (p && p.kind === 'gem' && !p.special && !p.vine) l.push(p); }
    const take = () => l.splice(Math.floor(Math.random() * l.length), 1)[0];
    if (n >= 1 && l.length) take().special = Math.random() < 0.5 ? 'lineH' : 'lineV';
    if (n >= 2 && l.length) take().special = 'barrel';
    if (n >= 3 && l.length) { const p = take(); p.special = 'idol'; p.color = null; }
  }
  const breakStreak = () => { if (!(level && (level.daily || level.weekly || level.hard)) && save.streak) { save.streak = 0; persist(); } };
  // fileira da trilha na janela antes da fase: 3 vantagens, acesas até a sequência atual
  const streakHTML = () => {
    const n = Math.min(3, save.streak || 0);
    return '<div class="streak"><div class="moves-line">' + T('streak.title') + '</div><div class="streak-row">' +
      ['ixarrow', 'ixseal', 'ixorb'].map((k, i) => '<img alt="" class="' + (i < n ? 'on' : '') + '" src="' + ART.nodeImg(k) + '">').join('<i></i>') +
      '</div><small>' + (n ? T('streak.n', { n }) : T('streak.0')) + '</small></div>';
  };
  // vantagens da loja aplicadas no começo da fase
  function applyBoosts(b) {
    if (b.moves) state.moves += 3;
    const plain = () => { const out = []; for (let y = 0; y < state.H; y++) for (let x = 0; x < state.W; x++) { const p = state.grid[y][x]; if (p && p.kind === 'gem' && !p.special && !p.vine) out.push(p); } return out; };
    if (b.dyn) { const l = plain(); for (let k = 0; k < 2 && l.length; k++) { const p = l.splice(Math.floor(Math.random() * l.length), 1)[0]; p.special = Math.random() < 0.5 ? 'lineH' : 'lineV'; } }
    if (b.seal) { const l = plain(); for (let k = 0; k < 2 && l.length; k++) l.splice(Math.floor(Math.random() * l.length), 1)[0].special = 'barrel'; }
    if (b.orb) { const l = plain(); if (l.length) { const p = l[Math.floor(Math.random() * l.length)]; p.special = 'idol'; p.color = null; } }
  }

  // dica do tutorial: fixa fora do tabuleiro (embaixo; em cima se não couber) até a primeira jogada
  let tutTip = null, announcedAt = 0;
  function placeTutorialTip() {
    const below = oy + cs * state.H + 12;
    if (below + 64 < innerHeight) { tutTip.style.top = below + 'px'; tutTip.style.transform = 'translateX(-50%)'; }
    else { tutTip.style.top = Math.max(8, oy - 12) + 'px'; tutTip.style.transform = 'translate(-50%,-100%)'; }
  }
  function showTutorialTip() {
    if (tutTip) return;
    tutTip = document.createElement('div');
    tutTip.className = 'tut-tip';
    tutTip.textContent = T('tutorial.follow');
    document.body.appendChild(tutTip);
    placeTutorialTip();
  }
  function hideTutorialTip() { if (tutTip) { tutTip.remove(); tutTip = null; } }

  // FASE N na tela + locutor (estrondo, gongo e a voz grave dizendo a fase)
  function announceLevel(L) {
    announcedAt = performance.now();
    const el = document.createElement('div');
    el.className = 'announce' + (L.boss ? ' boss' : '');
    // em português: "FASE" + número pintados (estilo Solar); senão, texto
    const painted = I18N.lang === 'pt' && ART.nodeImg('fase') && ART.nodeImg('n0');
    const word = painted
      ? '<div class="ann-art"><img class="ann-fase" alt="" src="' + wordImg('fase') + '">' + String(L.id).split('').map((d) => '<img class="ann-num" alt="" src="' + wordImg('n' + d) + '">').join('') + '</div>'
      : '<span class="metal">' + T('announce', { n: L.id }) + '</span>';
    el.innerHTML = word + (L.boss ? '<small>' + T('boss') + '</small>' : '');
    if (painted) el.setAttribute('aria-label', T('announce', { n: L.id }));
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
    idle = 0; hint = tutorialMove || null;
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
    if (tutorialMove) {
      const [ta, tb] = tutorialMove;
      const same = (x, y) => x[0] === y[0] && x[1] === y[1];
      if (!((same(a, ta) && same(b, tb)) || (same(a, tb) && same(b, ta)))) {
        hint = tutorialMove;
        nudge(pa, a);
        showTutorialTip();
        return;
      }
    }
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
    if (level.weekly || level.hard) weeklyReplay.push([a[0], a[1], b[0], b[1]]);
    if (tutorialMove) {
      tutorialMove = null; hint = null; save.tutorialDone = 1; persist();
      hideTutorialTip();
      showPraise(T('tutorial.done'), 'info');
      track('tutorial_complete', { level: 1, mode: 'normal' });
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
    if (ev.type === 'bossland') { bossAnims[ev.idx] = null; return Promise.resolve(); }
    if (ev.type === 'bossflee') return onBossFlee(ev);
    if (ev.type === 'bossclaw') return onBossClaw(ev);
    if (ev.type === 'bosseat') return onBossEat(ev);
    if (ev.type === 'bossswap') return onBossSwap(ev);
    if (ev.type === 'bossspit') return onBossSpit(ev);
    if (ev.type === 'bossweb') return onBossWeb(ev);
    if (ev.type === 'cocoontick') return onCocoonTick(ev);
    if (ev.type === 'bossmove') return onBossMove(ev);
    if (ev.type === 'mossgrow') return onMossGrow(ev);
    if (ev.type === 'bombtick') return onBombTick(ev);
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
    for (const c of ev.clocks || []) later(0.05, () => { floats.push({ x: cellX(c.x), y: cellY(c.y), text: '+2', num: 2, color: '#8ff3ea', t: 0 }); sparks(c.x, c.y, 14, '#7ff3ea'); Sound.play('star', 2); later(0.15, renderHUD); });
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
      floats.push({ x: cellX(sx / ev.removed.length), y: cellY(sy / ev.removed.length), text: '+' + ev.score, num: ev.score, color: g ? ART.hsl(g.h, g.s, Math.max(62, g.l + 22)) : '#ffe08a', t: 0 });
    }
    if (ev.cascade >= 7) praise(3); else if (ev.cascade >= 5) praise(2); else if (ev.cascade >= 3) praise(1);
    for (const b of ev.bosses || []) bossHit(b);
    // ídolo: combinação comum ou golpe durante o escudo só faz o escudo de runas brilhar
    for (const im of ev.immune || []) { bossFlash[im.idx] = now; later(0.05, () => Sound.play('click')); }
    later(0.12, renderHUD);
    await wait(0.2 + ev.waves * WAVE + ((ev.bosses || []).length ? 0.35 : 0));
  }

  // ---------- chefes (escaravelho, onça, ídolo, serpente) ----------
  // bossAnims[i]: null = parado | hit (golpe no lugar) → fly (vai até a joia nova) | dead (quebra) | gone
  //               claw (onça cravando a garra) | slide (serpente rastejando 1 casa)
  // bossFlash[i] = instante em que o escudo de runas do ídolo brilhou (golpe que não pegou)
  let bossAnims = [], bossFlash = [];
  let threads = []; // fios da aranha (x0,y0 -> x1,y1 em casas, t0 = início)
  let bombTick = {}; // id da joia amaldiçoada -> hora da última contagem (pisca)
  let mossC = null;
  function mossSprite(im) {
    if (mossC || !im || !im.naturalWidth) return mossC;
    const c = document.createElement('canvas'); c.width = im.naturalWidth; c.height = im.naturalHeight;
    const x = c.getContext('2d'); x.drawImage(im, 0, 0);
    x.globalCompositeOperation = 'source-atop'; x.fillStyle = 'rgba(140,235,110,0.42)'; x.fillRect(0, 0, c.width, c.height);
    return (mossC = c);
  }

  // ---------- Kukulkán articulado (15/10) ----------
  // Montado em peças vistas de cima (cabeça, anéis do corpo, cauda de penas) sobre um caminho:
  // cabeça → cauda (as 2 casas que valem golpe) → casas por onde ela passou (só as penas da cauda chegam lá).
  // Ondula de lado o tempo todo: serpenteia mesmo parada. serpTrail[i] = casas antigas atrás da cauda (mais nova primeiro).
  let serpTrail = [];
  function serpPolyline(i, head, tail) {
    const pts = [head, tail];
    for (const [x, y] of serpTrail[i] || []) {
      const last = pts[pts.length - 1], p = [cellX(x), cellY(y)];
      if (Math.hypot(p[0] - last[0], p[1] - last[1]) > cs * 1.2) break; // rastro só vale se for contínuo
      pts.push(p);
    }
    // prolonga reto pra sempre ter caminho pra cauda
    const a = pts[pts.length - 2], b = pts[pts.length - 1], d = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    pts.push([b[0] + (b[0] - a[0]) / d * cs * 2, b[1] + (b[1] - a[1]) / d * cs * 2]);
    // arredonda as curvas de 90° (Chaikin, mantendo cabeça e ponta)
    let out = pts;
    for (let k = 0; k < 2; k++) {
      const n = [out[0]];
      for (let j = 0; j < out.length - 1; j++) {
        const p = out[j], q = out[j + 1];
        if (j > 0) n.push([p[0] * 0.75 + q[0] * 0.25, p[1] * 0.75 + q[1] * 0.25]);
        if (j < out.length - 2) n.push([p[0] * 0.25 + q[0] * 0.75, p[1] * 0.25 + q[1] * 0.75]);
      }
      n.push(out[out.length - 1]); out = n;
    }
    return out;
  }
  // ponto a 's' px da cabeça ao longo do caminho
  function serpAt(pts, s) {
    for (let k = 0; k < pts.length - 1; k++) {
      const a = pts[k], b = pts[k + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (s <= L || k === pts.length - 2) { const f = L ? s / L : 0; return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f]; }
      s -= L;
    }
    return pts[0];
  }
  // ponto com a ondulação: parada na cabeça e na casa da cauda, livre nas penas
  function serpWave(pts, s) {
    const p = serpAt(pts, s), q = serpAt(pts, s + cs * 0.1);
    let dx = p[0] - q[0], dy = p[1] - q[1]; const d = Math.hypot(dx, dy) || 1; dx /= d; dy /= d;
    const u = s / cs, env = u < 1 ? Math.sin(Math.PI * u) : Math.min(1, (u - 1) * 1.6);
    const o = 0; // 17/10 (pedido dele): parada de verdade, sem ondular (era cs * 0.1 * env * Math.sin(now * 4.2 - u * 3.4))
    return [p[0] - dy * o, p[1] + dx * o];
  }
  // ângulo (apontando pra cabeça) no trecho em volta de s
  function serpAngle(pts, s) {
    const a = serpWave(pts, Math.max(0, s - cs * 0.15)), b = serpWave(pts, s + cs * 0.15);
    return Math.atan2(a[1] - b[1], a[0] - b[0]);
  }
  // desenha uma peça girada; pivô em pivotX (fração da largura). Virada pra esquerda espelha na vertical pra luz ficar em cima
  // clipFrom (opcional): só desenha da fração clipFrom da largura pra frente (o crânio por cima do corpo, sem a crista)
  function drawSerpPart(im, x, y, ang, w, pivotX, clipFrom) {
    const h = w * im.naturalHeight / im.naturalWidth;
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
    if (Math.cos(ang) < 0) ctx.scale(1, -1);
    if (clipFrom != null) { ctx.beginPath(); ctx.rect(-w * pivotX + w * clipFrom, -h, w, h * 2); ctx.clip(); }
    ctx.drawImage(im, -w * pivotX, -h / 2, w, h);
    ctx.restore();
  }
  function drawSerpent(boss, i, an, K) {
    const seg = nodeImgObj(K.seg), headIm = nodeImgObj(K.head), roarIm = nodeImgObj(K.roar), tailIm = nodeImgObj(K.tail);
    if (!seg || !headIm || !tailIm) return null;
    const toScreen = (cs2) => cs2.map(([x, y]) => [cellX(x), cellY(y)]);
    let head, tail, alpha = 1, scale = 1, roar = false;
    const live = boss.hp > 0 ? bossScreenCells(boss) : [];
    if (an && an.type === 'hit' && an.cells && an.cells.length === 2) {
      // golpe: ruge e treme no lugar antigo
      [head, tail] = toScreen(an.cells); roar = true;
      scale = 1 + 0.08 * Math.sin(Math.min(1, (now - an.t0) / 0.35) * Math.PI);
    } else if (an && an.type === 'fly') {
      // mergulha no lugar antigo e emerge no novo
      const q = Math.min(1, (now - an.t0) / 0.6);
      if (q < 0.5 && an.cells && an.cells.length === 2) { [head, tail] = toScreen(an.cells); alpha = 1 - q * 2; scale = 1 - q * 0.5; }
      else if (live.length === 2) { [head, tail] = live; alpha = q * 2 - 1; scale = 0.75 + 0.25 * alpha; }
      if (q >= 1) bossAnims[i] = null;
    } else if (an && an.type === 'slide' && live.length === 2 && an.from.length === 2) {
      const q = Math.min(1, (now - an.t0) / 0.3), e = q * q * (3 - 2 * q);
      head = [an.from[0][0] + (live[0][0] - an.from[0][0]) * e, an.from[0][1] + (live[0][1] - an.from[0][1]) * e];
      tail = [an.from[1][0] + (live[1][0] - an.from[1][0]) * e, an.from[1][1] + (live[1][1] - an.from[1][1]) * e];
      if (q >= 1) bossAnims[i] = null;
    } else if (live.length === 2) [head, tail] = live;
    if (!head || alpha <= 0.01) return 'hide'; // no meio do mergulho: nada na tela (nem as vidas)
    // sibilo de vez em quando: abre a boca por um instante
    // (sem o sibilo aleatório de antes: boca só abre quando ela apanha)
    const pts = serpPolyline(i, head, tail);
    ctx.save(); ctx.globalAlpha = alpha;
    // marca as 2 casas que valem golpe: brilho de jade pulsando por baixo
    const pulse = 0.35 + 0.2 * Math.sin(now * 3);
    for (const [cx, cy] of [head, tail]) {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, cs * 0.62);
      g.addColorStop(0, 'rgba(80,240,200,' + pulse + ')'); g.addColorStop(1, 'rgba(80,240,200,0)');
      ctx.fillStyle = g; ctx.fillRect(cx - cs, cy - cs, cs * 2, cs * 2);
    }
    ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = cs * 0.18; ctx.shadowOffsetY = cs * 0.07;
    const S = scale;
    // cabeça: balança de leve; ruge no golpe e de vez em quando. A crista de penas fica por baixo do corpo
    const aH = serpAngle(pts, cs * 0.1);
    const hIm = roar && roarIm ? roarIm : headIm, hW = cs * 2.1 * S * (roar ? 1.05 : 1);
    drawSerpPart(hIm, head[0], head[1], aH, hW, 0.8);
    // cauda de penas (balança um pouco além da ondulação)
    const sT = cs * 1.25;
    const pT = serpWave(pts, sT), aT = serpAngle(pts, sT + cs * 0.6);
    drawSerpPart(tailIm, pT[0], pT[1], aT, cs * 2.3 * S, 0.97);
    // anéis do corpo, de trás pra frente
    for (const u of [1.15, 0.8, 0.45]) {
      const p = serpWave(pts, cs * u), breathe = 1;
      drawSerpPart(seg, p[0], p[1], serpAngle(pts, cs * u), cs * 1.15 * S * breathe, 0.5);
    }
    // crânio de novo por cima do pescoço
    drawSerpPart(hIm, head[0], head[1], aH, hW, 0.8, 0.62);
    ctx.restore();
    return [head[0], head[1] - cs * 0.62];
  }
  // penas soltas voando (golpe na serpente)
  function feathers(x, y) {
    const px = cellX(x), py = cellY(y);
    for (let k = 0; k < 7; k++) {
      parts.push({ type: 'leaf', x: px, y: py, vx: (Math.random() - 0.5) * cs * 4, vy: -cs * (1.2 + Math.random() * 2), rot: Math.random() * 6, vr: (Math.random() - 0.5) * 9,
        size: cs * 0.14, color: ['#2fbf86', '#1f8f66', '#d9b04c'][k % 3], life: 0, max: 1.1 });
    }
  }
  // centro de um grupo de pontos já em coordenadas de tela
  const midOf = (pts) => [pts.reduce((a, p) => a + p[0], 0) / pts.length, pts.reduce((a, p) => a + p[1], 0) / pts.length];
  // brilho em volta de cada chefe (marca que é o chefe)
  const BOSS_GLOW = { scarab: '255,196,70', jaguar: '90,255,150', statue: '70,235,220', serpent: '80,240,200', boa: '215,190,90', monkey: '235,180,110', frog: '110,235,90', onca: '255,170,60', spider: '120,240,170' };
  function bossHit(b) {
    const boss = state.bosses[b.idx], kind = (boss && boss.kind) || 'scarab';
    const cells = b.cells && b.cells.length ? b.cells : [b.from];
    const from = midOf(cells.map(([x, y]) => [cellX(x), cellY(y)]));
    Sound.play('rock'); buzz([40, 30, 60]); addShake(kind === 'statue' ? 0.8 : 0.5);
    for (const [cx, cy] of cells) ring(cx, cy, 'rgba(255,215,110,0.95)', 1.4);
    if (kind === 'serpent') { for (const [cx, cy] of cells) feathers(cx, cy); serpTrail[b.idx] = []; }
    bossAnims[b.idx] = { type: 'hit', t0: now, from, cells };
    if (b.dead) {
      later(0.35, () => { bossAnims[b.idx] = { type: 'dead', t0: now, from }; Sound.play('glass', 3); praise(state.bosses.every((x) => x.hp <= 0) ? 3 : 2); });
      later(1.4, () => { if (bossAnims[b.idx] && bossAnims[b.idx].type === 'dead') bossAnims[b.idx] = { type: 'gone' }; });
    } else if (kind === 'statue') {
      // o ídolo não sai do lugar: depois do golpe ergue o escudo de runas
      later(0.4, () => { if (bossAnims[b.idx] && bossAnims[b.idx].type === 'hit') bossAnims[b.idx] = null; bossFlash[b.idx] = now; Sound.play('create'); });
    } else later(0.35, () => { bossAnims[b.idx] = { type: 'fly', t0: now, from, cells }; Sound.play('create'); });
  }
  // escaravelho que ficou 3 jogadas sem apanhar foge voando
  function onBossFlee(ev) {
    if (!ev.from) return Promise.resolve();
    bossAnims[ev.idx] = { type: 'fly', t0: now, from: [cellX(ev.from[0]), cellY(ev.from[1])] };
    Sound.play('create');
    return wait(0.45);
  }
  // onça crava a garra: as joias perto dela viram pedra com a marca verde
  async function onBossClaw(ev) {
    bossAnims[ev.idx] = { type: 'claw', t0: now, from: ev.from ? [cellX(ev.from[0]), cellY(ev.from[1])] : null };
    Sound.play('rock'); buzz([30, 40, 30]); addShake(0.45);
    ev.cells.forEach(([x, y], k) => {
      const p = state.grid[y][x];
      if (!p) return;
      const v = V(p, x, y); v.s = 0;
      later(0.15 + k * 0.12, () => { tween(v, { s: 1 }, 0.3, 'back'); ring(x, y, 'rgba(90,255,140,0.95)', 1.2); dust(x, y); Sound.play('rock'); });
    });
    later(0.55, () => { if (bossAnims[ev.idx] && bossAnims[ev.idx].type === 'claw') bossAnims[ev.idx] = null; });
    await wait(0.75);
  }
  // macaco troca 2 joias: as duas cruzam em arco até o lugar novo (o motor já trocou na grade)
  // sapo cospe gosma: as joias perto dele viram bolhas verdes presas (2 camadas)
  async function onBossSpit(ev) {
    bossAnims[ev.idx] = { type: 'eat', t0: now, from: ev.from ? [cellX(ev.from[0]), cellY(ev.from[1])] : null };
    Sound.play('vine'); buzz([25, 30, 25]); addShake(0.3);
    ev.cells.forEach(([x, y], k) => {
      const p = state.grid[y][x];
      if (!p) return;
      const v = V(p, x, y); v.s = 0;
      later(0.2 + k * 0.12, () => { tween(v, { s: 1 }, 0.3, 'back'); ring(x, y, 'rgba(110,235,90,0.95)', 1.2); leaves(x, y); Sound.play('rock'); });
    });
    later(0.75, () => { if (bossAnims[ev.idx] && bossAnims[ev.idx].type === 'eat') bossAnims[ev.idx] = null; });
    await wait(0.8);
  }
  // aranha embrulha uma joia: o fio desce dela até a casa e o casulo aparece
  async function onBossWeb(ev) {
    bossAnims[ev.idx] = { type: 'eat', t0: now, from: ev.from ? [cellX(ev.from[0]), cellY(ev.from[1])] : null };
    Sound.play('vine'); buzz([20, 30, 20]); addShake(0.2);
    ev.cells.forEach(([x, y], k) => {
      const p = state.grid[y][x];
      if (!p) return;
      const v = V(p, x, y); v.s = 0;
      if (ev.from) threads.push({ x0: ev.from[0], y0: ev.from[1], x1: x, y1: y, t0: now + 0.1 + k * 0.1 });
      later(0.3 + k * 0.1, () => { tween(v, { s: 1 }, 0.3, 'back'); ring(x, y, 'rgba(235,240,255,0.95)', 1.2); dust(x, y); Sound.play('rock'); });
    });
    later(0.75, () => { if (bossAnims[ev.idx] && bossAnims[ev.idx].type === 'eat') bossAnims[ev.idx] = null; });
    await wait(0.8);
  }
  // fim da jogada: casulos contam; o que zera eclode (filhotes!) e custa movimentos
  async function onCocoonTick(ev) {
    for (const [x, y] of ev.ticks) { const p = state.grid[y][x]; if (p) bombTick[p.id] = now; }
    if (ev.ticks.length) Sound.play('click');
    if (ev.hatched.length) {
      Sound.play('barrel'); buzz([60, 40, 60]); addShake(0.6);
      for (const h of ev.hatched) {
        const v = V(h.piece, h.x, h.y); v.s = 0;
        tween(v, { s: 1 }, 0.35, 'back'); ring(h.x, h.y, 'rgba(255,90,70,0.95)', 1.6); dust(h.x, h.y);
        floats.push({ x: cellX(h.x), y: cellY(h.y), text: '-2', num: 2, color: '#ff8a7a', t: 0 });
      }
      later(0.1, renderHUD);
      await wait(0.7);
    } else await wait(0.15);
  }
  async function onBossSwap(ev) {
    bossAnims[ev.idx] = { type: 'eat', t0: now };
    Sound.play('swap'); buzz([20, 40, 20]);
    for (const [to, fromC, lift] of [[ev.a, ev.b, -1], [ev.b, ev.a, 1]]) {
      const p = state.grid[to[1]][to[0]];
      if (!p) continue;
      const v = V(p, fromC[0], fromC[1]); v.x = fromC[0]; v.y = fromC[1];
      const x0 = fromC[0], y0 = fromC[1];
      anim(0.45, (q) => { const e = q * q * (3 - 2 * q); v.x = x0 + (to[0] - x0) * e; v.y = y0 + (to[1] - y0) * e + Math.sin(q * Math.PI) * 0.6 * lift; });
    }
    later(0.75, () => { if (bossAnims[ev.idx] && bossAnims[ev.idx].type === 'eat') bossAnims[ev.idx] = null; });
    await wait(0.6);
  }
  // jiboia engole: abre a boca e a joia vizinha vira bolo de pedra
  async function onBossEat(ev) {
    bossAnims[ev.idx] = { type: 'eat', t0: now };
    Sound.play('create'); buzz([40, 30, 40]); addShake(0.3);
    ev.cells.forEach(([x, y]) => {
      const p = state.grid[y][x];
      if (!p) return;
      const v = V(p, x, y); v.s = 0;
      later(0.3, () => { tween(v, { s: 1 }, 0.35, 'back'); ring(x, y, 'rgba(215,190,90,0.95)', 1.1); dust(x, y); Sound.play('rock'); });
    });
    later(0.75, () => { if (bossAnims[ev.idx] && bossAnims[ev.idx].type === 'eat') bossAnims[ev.idx] = null; });
    await wait(0.8);
  }
  // serpente rasteja: anima da posição antiga (cabeça, cauda) até a nova
  function onBossMove(ev) {
    // a cauda antiga vira rastro: as penas da cauda seguem por onde o corpo passou
    if (ev.from && ev.from[1]) serpTrail[ev.idx] = [ev.from[1]].concat(serpTrail[ev.idx] || []).slice(0, 3);
    bossAnims[ev.idx] = { type: 'slide', t0: now, from: ev.from.map(([x, y]) => [cellX(x), cellY(y)]) };
    return wait(0.32);
  }
  // casas do chefe na tela (acompanham as joias caindo); a serpente vem como [cabeça, cauda]
  function bossScreenCells(b) {
    return LR.bossCells(state, b).map(([x, y]) => {
      const p = state.grid[y][x], v = p && vis.get(p.id);
      return v ? [cellX(v.x), cellY(v.y)] : [cellX(x), cellY(y)];
    });
  }
  function drawThreads() {
    threads = threads.filter((t) => now - t.t0 < 0.9);
    for (const t of threads) {
      const q = (now - t.t0) / 0.9; if (q < 0) continue;
      const grow = Math.min(1, q / 0.3), fade = q > 0.6 ? 1 - (q - 0.6) / 0.4 : 1;
      const x0 = cellX(t.x0), y0 = cellY(t.y0), x1 = x0 + (cellX(t.x1) - x0) * grow, y1 = y0 + (cellY(t.y1) - y0) * grow;
      ctx.save(); ctx.globalAlpha = 0.9 * fade; ctx.strokeStyle = '#f2f6ff'; ctx.lineWidth = Math.max(2, cs * 0.05); ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(200,220,255,0.9)'; ctx.shadowBlur = cs * 0.2;
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo((x0 + x1) / 2 + cs * 0.25, (y0 + y1) / 2 + cs * 0.2, x1, y1); ctx.stroke(); ctx.restore();
    }
  }
  function drawBosses() { drawThreads(); state.bosses.forEach((b, i) => drawBoss(b, i)); drawBossBar(); }

  // ---------- barra de vida dos chefes (15/10) ----------
  // Uma barra só no topo do tabuleiro, no lugar das vidas em cima de cada bicho: moldura de pedra com o retrato
  // do chefe no medalhão, ouro líquido verde que vira vermelho no fim, desce suave e racha a cada golpe.
  // Vários chefes (escaravelhos) = soma das vidas. Canal e medalhão em px da moldura (926x211).
  const HPB = { w: 926, h: 211, cx0: 205, cx1: 872, cy0: 66, cy1: 136, mx: 112, my: 100, mr: 58 };
  let barShown = null, barHp = null, barHitT = -9;
  const hasBossBar = () => !!(nodeImgObj('hpbar') && nodeImgObj('hpgreen'));
  function drawBossBar() {
    const frame = nodeImgObj('hpbar'), green = nodeImgObj('hpgreen'), red = nodeImgObj('hpred'), crack = nodeImgObj('hpcrack');
    if (!frame || !green || !state.bosses.length) return;
    const max = state.bosses.reduce((a, b) => a + b.max, 0), hp = state.bosses.reduce((a, b) => a + Math.max(0, b.hp), 0);
    if (barHp != null && hp < barHp) barHitT = now;
    barHp = hp;
    const target = max ? hp / max : 0;
    barShown = barShown == null ? target : barShown + (target - barShown) * Math.min(1, lastDt * 6);
    const hitQ = Math.max(0, 1 - (now - barHitT) / 0.6);
    const bw = cs * 5.6, bh = bw * HPB.h / HPB.w, k = bw / HPB.w;
    const bx = ox + cs * 4 - bw / 2 + (hitQ ? (Math.random() - 0.5) * cs * 0.12 * hitQ : 0), by = oy - bh - cs * 0.02;
    // canal: ouro líquido cortado na largura da vida
    // a moldura vem com o canal pintado de preto: desenha ela primeiro e o líquido por cima, dentro do filete de ouro
    ctx.drawImage(frame, bx, by, bw, bh);
    const ins = 5 * k, chX = bx + HPB.cx0 * k + ins, chY = by + HPB.cy0 * k + ins, chW = (HPB.cx1 - HPB.cx0) * k - ins * 2, chH = (HPB.cy1 - HPB.cy0) * k - ins * 2;
    ctx.save();
    ctx.beginPath(); ctx.rect(chX, chY, chW * barShown, chH); ctx.clip();
    ctx.drawImage(green, chX, chY, chW, chH);
    const redA = red ? Math.max(0, Math.min(1, (0.5 - barShown) / 0.18)) : 0;
    if (redA > 0) { ctx.globalAlpha = redA; ctx.drawImage(red, chX, chY, chW, chH); ctx.globalAlpha = 1; }
    // brilho correndo pelo líquido
    const sx = chX + ((now * 0.35) % 1.4 - 0.2) * chW, gl = ctx.createLinearGradient(sx - chH, 0, sx + chH, 0);
    gl.addColorStop(0, 'rgba(255,255,255,0)'); gl.addColorStop(0.5, 'rgba(255,250,220,0.35)'); gl.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gl; ctx.fillRect(chX, chY, chW, chH);
    ctx.restore();
    // retrato do chefe no medalhão
    const K = BOSS_SPR[state.bosses[0].kind || 'scarab'], face = nodeImgObj(K.idle);
    if (face) {
      const mx = bx + HPB.mx * k, my = by + HPB.my * k, r = HPB.mr * k;
      ctx.save(); ctx.beginPath(); ctx.arc(mx, my, r, 0, Math.PI * 2); ctx.clip();
      ctx.fillStyle = '#0b1310'; ctx.fillRect(mx - r, my - r, r * 2, r * 2);
      const fw = r * 2.3, fh = fw * face.naturalHeight / face.naturalWidth, pop = 1 + 0.15 * hitQ;
      ctx.drawImage(face, mx - fw * pop / 2, my - fh * pop / 2, fw * pop, fh * pop);
      ctx.restore();
    }
    // nome do chefe pintado (Solar) sobre a faixa de glifos de cima da moldura
    const nm = nodeImgObj('name_' + (state.bosses[0].kind || 'scarab'));
    if (nm) {
      let nh = cs * 0.46, nw = nh * nm.naturalWidth / nm.naturalHeight;
      const maxW = chW * 0.95; if (nw > maxW) { nh *= maxW / nw; nw = maxW; }
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.9)'; ctx.shadowBlur = cs * 0.15;
      ctx.drawImage(nm, chX + chW / 2 - nw / 2, by + HPB.cy0 * k * 0.42 - nh / 2, nw, nh);
      ctx.restore();
    }
    else {
      // chefe sem nome pintado (aranha): escreve o nome em dourado, no mesmo lugar
      const kd = state.bosses[0].kind, gt = T('goal.' + kd), nm0 = gt && gt !== 'goal.' + kd ? gt.replace(/^[^ ]+ (os |as |o |a |the )?/i, '').toUpperCase() : '';
      if (nm0) {
        ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '900 ' + Math.round(cs * 0.34) + 'px ' + (getComputedStyle(document.body).getPropertyValue('--f-display') || 'serif');
        ctx.lineWidth = cs * 0.08; ctx.strokeStyle = '#2a1a02'; ctx.fillStyle = '#ffe6a0'; ctx.shadowColor = 'rgba(0,0,0,0.9)'; ctx.shadowBlur = cs * 0.12;
        const ty = by + HPB.cy0 * k * 0.42; ctx.strokeText(nm0, chX + chW / 2, ty, chW * 0.9); ctx.fillText(nm0, chX + chW / 2, ty, chW * 0.9); ctx.restore();
      }
    }
    // racha no ponto onde a vida caiu
    if (hitQ > 0 && crack) {
      const cw = chH * 2.4 * (1 + (1 - hitQ) * 0.3);
      ctx.save(); ctx.globalAlpha = hitQ; ctx.drawImage(crack, chX + chW * target - cw / 2, chY + chH / 2 - cw / 2, cw, cw); ctx.restore();
    }
  }
  // ---------- Onça em partes (15/10) ----------
  // Peças recortadas da mesma folha do Gemini, então todas têm a mesma escala: as medidas abaixo são px da folha,
  // relativos ao canto do tronco. Cada peça = [ponto no tronco x, y, pivô na peça x, y]. A arte olha pra direita.
  const JAG = { span: 823, cx: 160, cy: 190, head: [385, 45, 30, 85], legF: [320, 150, 54, 33], legB: [95, 150, 60, 40], tail: [20, 70, 12, 32] };
  function jagPart(im, at, ang, mirror) {
    ctx.save(); ctx.translate(at[0], at[1]); ctx.rotate(ang); if (mirror) ctx.scale(-1, 1);
    ctx.drawImage(im, -at[2], -at[3]); ctx.restore();
  }
  // desenha a onça na origem atual; pose = idle | hit | leap | claw | intro, q = progresso da pose (0-1)
  function drawJaguar(K, sc, pose, q, i, flip) {
    const torso = nodeImgObj(K.torso), head = nodeImgObj(K.head), roarIm = nodeImgObj(K.roar), tail = nodeImgObj(K.tail),
      legF = nodeImgObj(K.legF), legB = nodeImgObj(K.legB);
    if (!torso || !head || !tail || !legF || !legB) return false;
    const k = cs * 2.8 * sc / JAG.span, s = Math.sin(Math.min(1, Math.max(0, q)) * Math.PI);
    const breathe = Math.sin(now * 2.4 + i);
    let headA = Math.sin(now * 1.7 + i) * 0.04, legFA = Math.sin(now * 1.3 + i) * 0.04, legBA = -legFA;
    let tailA = 0.35 + Math.sin(now * 2.2 + i) * 0.18, roar = ((now + i * 1.3) % 6) < 0.5;
    if (pose === 'hit') { roar = true; headA -= 0.15 * s; }
    else if (pose === 'leap') { legFA = -0.75; legBA = 0.6; tailA = 0.05; headA = -0.05; }
    else if (pose === 'claw') { roar = true; legFA = -1.3 * s; headA -= 0.12 * s; tailA += 0.3 * s; }
    else if (pose === 'intro') { roar = q > 0.15 && q < 0.85; const r = roar ? Math.sin((q - 0.15) / 0.7 * Math.PI) : 0; headA -= 0.2 * r; legFA -= 0.35 * r; tailA += 0.4 * r; }
    ctx.save(); ctx.scale(flip ? -k : k, k); ctx.translate(-JAG.cx, -JAG.cy);
    jagPart(tail, JAG.tail, tailA, true);
    jagPart(legB, JAG.legB, legBA);
    jagPart(legF, JAG.legF, legFA);
    // tronco respira (escala só na altura, a partir da barriga)
    ctx.save(); ctx.translate(0, torso.naturalHeight); ctx.scale(1, 1 + 0.015 * breathe); ctx.drawImage(torso, 0, -torso.naturalHeight); ctx.restore();
    jagPart(roar && roarIm ? roarIm : head, JAG.head, headA);
    // garrada: rastro verde passando na frente da pata
    const claw = pose === 'claw' && nodeImgObj(K.claw);
    if (claw && s > 0.01) {
      ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = s; ctx.shadowColor = 'transparent';
      ctx.translate(470 + q * 140, 250); ctx.rotate(-0.35); const cw = claw.naturalWidth * (0.6 + 0.6 * q);
      ctx.drawImage(claw, -cw / 2, -cw * claw.naturalHeight / claw.naturalWidth / 2, cw, cw * claw.naturalHeight / claw.naturalWidth);
      ctx.restore();
    }
    ctx.restore();
    return true;
  }

  // ---------- entrada do chefe (15/10) ----------
  // Depois do "FASE N": tela escurece, o chefe aparece grande no meio com o nome pintado, ruge (a onça) e some.
  const INTRO_DUR = 2;
  let intro = null;
  function drawIntro() {
    if (!intro || now < intro.t0) return;
    const q = (now - intro.t0) / INTRO_DUR;
    if (q >= 1) { intro = null; return; }
    const kind = intro.kind, K = BOSS_SPR[kind];
    const vis1 = Math.max(0, Math.min(1, q / 0.12, (1 - q) / 0.15));
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,' + 0.62 * vis1 + ')'; ctx.fillRect(0, 0, W, H);
    // entra com um tranco (passa um pouco do tamanho e volta) e encolhe na saída
    const pin = Math.min(1, q / 0.15), pop = pin < 1 ? 0.6 + 0.55 * Math.sin(pin * Math.PI * 0.75) : 1, out = q > 0.85 ? 1 - (q - 0.85) / 0.15 * 0.3 : 1;
    const bw = Math.min(W * 0.85, 520), cy = H * 0.4, sh = intro.hitT && now - intro.hitT < 0.4 ? (Math.random() - 0.5) * cs * 0.15 : 0;
    ctx.globalAlpha = vis1;
    ctx.translate(W / 2 + sh, cy);
    ctx.shadowColor = 'rgba(' + BOSS_GLOW[kind] + ',0.8)'; ctx.shadowBlur = cs * 0.5;
    if (!(kind === 'jaguar' && drawJaguar(K, bw / (cs * 2.8) * pop * out, 'intro', q, 0, false))) {
      const im = nodeImgObj(K.idle);
      if (im) { const w = bw * 0.7 * pop * out, h = w * im.naturalHeight / im.naturalWidth; ctx.drawImage(im, -w / 2, -h / 2, w, h); }
    }
    ctx.restore();
    const nm = nodeImgObj('name_' + kind);
    if (!nm && T('goal.' + kind) !== 'goal.' + kind) {
      const nq0 = Math.min(1, Math.max(0, (q - 0.1) / 0.2));
      ctx.save(); ctx.globalAlpha = nq0 * vis1; ctx.textAlign = 'center'; ctx.font = '900 ' + Math.round(cs * 0.85) + 'px ' + (getComputedStyle(document.body).getPropertyValue('--f-display') || 'serif'); ctx.fillStyle = '#ffe6a0'; ctx.strokeStyle = '#3a2504'; ctx.lineWidth = cs * 0.12;
      const nm0 = T('goal.' + kind).replace(/^[^ ]+ (os |as |o |a )?/i, '').toUpperCase(); ctx.strokeText(nm0, W / 2, H * 0.62); ctx.fillText(nm0, W / 2, H * 0.62); ctx.restore();
    }
    if (nm) {
      const nq = Math.min(1, Math.max(0, (q - 0.1) / 0.2)), nw = Math.min(W * 0.8, 460) * (1.3 - 0.3 * nq), nh = nw * nm.naturalHeight / nm.naturalWidth;
      ctx.save(); ctx.globalAlpha = nq * vis1; ctx.shadowColor = 'rgba(0,0,0,0.9)'; ctx.shadowBlur = cs * 0.2;
      ctx.drawImage(nm, W / 2 - nw / 2, H * 0.62 - nh / 2, nw, nh); ctx.restore();
    }
  }
  function startIntro(L) {
    const kind = bossKindOf(L);
    intro = { t0: now + 2.2, kind };
    later(2.2 + 0.3, () => {
      if (!intro) return;
      intro.hitT = now; addShake(0.6); buzz([60, 40, 90]);
      Sound.play(kind === 'jaguar' ? 'roar' : 'barrel');
    });
  }

  function drawBoss(boss, i) {
    const an = bossAnims[i];
    if (an && an.type === 'gone') return;
    const kind = boss.kind || 'scarab', K = BOSS_SPR[kind];
    // Kukulkán: corpo articulado em peças (a morte continua com a explosão de penas pintada)
    if (kind === 'serpent' && !(an && an.type === 'dead')) {
      const at = drawSerpent(boss, i, an, K);
      if (at) { if (at !== 'hide' && boss.hp > 0 && !hasBossBar()) drawBossLives(boss, K, kind, at[0], at[1]); return; }
    }
    const cells = boss.hp > 0 ? bossScreenCells(boss) : [];
    // 18/10: sapo também parado (pedido dele), como o ídolo e a jiboia
    const bob = kind === 'statue' || kind === 'boa' || kind === 'frog' ? 0 :Math.sin(now * 3.2 + i * 2.1) * cs * 0.04;
    let key = K.idle, x = null, y = null, a = 1, sc = 1, dir = null; // dir = cabeça - cauda (serpente)
    if (cells.length) [x, y] = midOf(cells);
    if (kind === 'serpent' && cells.length === 2) dir = [cells[0][0] - cells[1][0], cells[0][1] - cells[1][1]];
    if (an && an.type === 'hit') { key = K.hit; [x, y] = an.from; sc = 1 + 0.12 * Math.sin(Math.min(1, (now - an.t0) / 0.35) * Math.PI); }
    else if (an && an.type === 'fly') {
      const q = Math.min(1, (now - an.t0) / 0.6), e = q < 0.5 ? 2 * q * q : 1 - Math.pow(-2 * q + 2, 2) / 2;
      const to = cells.length ? midOf(cells) : an.from;
      key = K.move; x = an.from[0] + (to[0] - an.from[0]) * e; y = an.from[1] + (to[1] - an.from[1]) * e - Math.sin(q * Math.PI) * cs * 1.2; sc = 1.15;
      if (kind === 'serpent') { dir = null; sc = 0.7; } // mergulha enrolada e reaparece longe
      if (q >= 1) bossAnims[i] = null;
    } else if (an && an.type === 'slide') {
      const q = Math.min(1, (now - an.t0) / 0.3), e = q * q * (3 - 2 * q);
      if (cells.length === 2 && an.from.length === 2) {
        const h = [an.from[0][0] + (cells[0][0] - an.from[0][0]) * e, an.from[0][1] + (cells[0][1] - an.from[0][1]) * e];
        const t = [an.from[1][0] + (cells[1][0] - an.from[1][0]) * e, an.from[1][1] + (cells[1][1] - an.from[1][1]) * e];
        x = (h[0] + t[0]) / 2; y = (h[1] + t[1]) / 2; dir = [h[0] - t[0], h[1] - t[1]];
      }
      if (q >= 1) bossAnims[i] = null;
    } else if (an && an.type === 'claw') {
      key = K.move; sc = 1.05 + 0.15 * Math.sin(Math.min(1, (now - an.t0) / 0.5) * Math.PI);
      if (an.from && !cells.length) [x, y] = an.from;
    } else if (an && an.type === 'eat') {
      key = K.eat || K.idle; sc = 1 + 0.14 * Math.sin(Math.min(1, (now - an.t0) / 0.7) * Math.PI);
      if (!cells.length) return;
    } else if (an && an.type === 'dead') { key = K.dead; [x, y] = an.from; const q = Math.min(1, (now - an.t0) / 1); a = 1 - q * q; sc = 1 + q * 0.25; dir = null; }
    else { if (!cells.length || boss.hp <= 0) return; y += bob; }
    if (x == null) return;
    const im = nodeImgObj(key) || nodeImgObj(K.idle);
    if (!im) return;
    // a jiboia cresce um pouco a cada joia engolida
    const grow = kind === 'boa' ? 1 + 0.08 * Math.min(4, boss.meals || 0) : 1;
    const w = cs * K.size * sc * grow, h = w * im.naturalHeight / im.naturalWidth;
    const vert = !!dir && Math.abs(dir[1]) > Math.abs(dir[0]);
    const anchor = kind === 'statue' || kind === 'serpent' ? 0.5 : 0.55;
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y);
    // a arte da serpente olha pra direita: espelha ou gira pra cabeça ficar do lado certo
    if (dir) { if (vert) ctx.rotate(dir[1] > 0 ? Math.PI / 2 : -Math.PI / 2); else if (dir[0] < 0) ctx.scale(-1, 1); }
    ctx.shadowColor = 'rgba(' + BOSS_GLOW[kind] + ',' + (0.65 + 0.25 * Math.sin(now * 4)) + ')'; ctx.shadowBlur = cs * 0.35;
    // onça em partes: olha pro meio do tabuleiro (a pose segue a animação da vez)
    const jagPose = kind === 'jaguar' && key !== K.dead && (!an ? ['idle', 0] : an.type === 'hit' ? ['hit', (now - an.t0) / 0.35]
      : an.type === 'fly' ? ['leap', 0] : an.type === 'claw' ? ['claw', (now - an.t0) / 0.5] : ['idle', 0]);
    const fx = cells.length ? midOf(cells)[0] : x;
    if (!(jagPose && drawJaguar(K, sc, jagPose[0], jagPose[1], i, fx > ox + cs * state.W / 2))) {
      // arte de uma peça só: a vida vem do código. Onça sentada respira e vira a cabeça (balanço leve); aranha treme as pernas e pulsa
      if ((kind === 'onca' || kind === 'spider') && key !== K.dead) {
        const ph = now + i * 1.7, foot = h * (1 - anchor);
        ctx.translate(0, foot);
        if (kind === 'onca') { ctx.rotate(Math.sin(ph * 0.9) * 0.018); ctx.scale(1 + 0.008 * Math.sin(ph * 2.2), 1 + 0.022 * Math.sin(ph * 2.2)); }
        else { ctx.rotate(Math.sin(ph * 7) * 0.012); ctx.scale(1 + 0.02 * Math.sin(ph * 3.1), 1 - 0.018 * Math.sin(ph * 3.1 + 0.6)); }
        ctx.translate(0, -foot);
      }
      ctx.drawImage(im, -w / 2, -h * anchor, w, h);
    }
    ctx.restore();
    // ponto fraco (fases avançadas): anel brilhante da cor que fere o chefe agora, em volta da casa dele (não cobre a joia)
    if (boss.weak != null && boss.hp > 0 && key !== K.dead) {
      const gm = ART.GEMS[boss.weak], pu = 0.5 + 0.5 * Math.sin(now * 4), r = cs * 0.5;
      ctx.save(); ctx.translate(x, y + (kind === 'statue' ? 0 : 0));
      ctx.lineCap = 'round';
      ctx.shadowColor = ART.hsl(gm.h, Math.max(40, gm.s), 62, 1); ctx.shadowBlur = cs * (0.28 + 0.22 * pu);
      ctx.strokeStyle = ART.hsl(gm.h, Math.max(30, gm.s), gm.key === 'diamond' ? 85 : 64, 0.55 + 0.4 * pu);
      ctx.lineWidth = Math.max(3, cs * 0.075);
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
      ctx.rotate(now * 1.6); ctx.setLineDash([cs * 0.22, cs * 0.5]); ctx.lineWidth = Math.max(2, cs * 0.05); ctx.strokeStyle = 'rgba(255,255,255,0.85)';
      ctx.beginPath(); ctx.arc(0, 0, r + cs * 0.06, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
    }
    // ídolo: escudo de runas girando enquanto protegido, e piscando quando um golpe não pega
    if (kind === 'statue' && key !== K.dead) {
      const fl = bossFlash[i] != null ? Math.max(0, 1 - (now - bossFlash[i]) / 0.8) : 0;
      const sa = Math.max(boss.shield > 0 ? 0.7 + 0.2 * Math.sin(now * 5) : 0, fl);
      const sh = nodeImgObj('sshield');
      if (sa > 0.01 && sh) {
        const sw = cs * 2.55;
        ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = sa; ctx.translate(x, y); ctx.rotate(now * 0.3);
        ctx.drawImage(sh, -sw / 2, -sw / 2, sw, sw); ctx.restore();
      }
    }
    // vidas em cima: carapaças (escaravelho), garras (onça), máscaras (ídolo), penas (serpente)
    if (key === K.dead || hasBossBar()) return;
    drawBossLives(boss, K, kind, x, y - (vert ? w / 2 : h * anchor));
  }
  // vidas em fileira acima de 'topY' (centro x)
  function drawBossLives(boss, K, kind, x, topY) {
    const hp = Math.max(0, boss.hp), max = boss.max, ls = cs * (max > 4 ? 0.3 : 0.34);
    const top = topY - ls * 1.05;
    // faixa escura atrás das vidas: lê de longe e não se mistura com o desenho do chefe
    const rowW = max * ls * 0.9 + ls * 0.3;
    ctx.save(); ctx.globalAlpha = 0.55; ctx.fillStyle = '#0b0f0c';
    ART.roundRect(ctx, x - rowW / 2, top - ls * 0.12, rowW, ls * 1.24, ls * 0.5); ctx.fill(); ctx.restore();
    for (let k = 0; k < max; k++) {
      const lim = nodeImgObj(k < hp ? K.l3 : K.l1);
      if (!lim) continue;
      const lw = kind === 'serpent' ? ls * 0.8 : ls, lh = lw * lim.naturalHeight / lim.naturalWidth;
      ctx.drawImage(lim, x - (max * ls * 0.9) / 2 + k * ls * 0.9 + (ls - lw) / 2, top - (lh - ls) / 2, lw, lh);
    }
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
      floats.push({ x: cellX(it.x), y: cellY(it.y), text: '+' + LR.SCORE.artifact, num: LR.SCORE.artifact, color: '#ffe08a', t: 0 });
    }
    Sound.play('chest');
    praise(2);
    later(0.2, renderHUD);
    await wait(0.32);
  }

  // musgo vivo cresce: a joia vira musgo com um estalo de folhas
  async function onMossGrow(ev) {
    const [x, y] = ev.to, p = state.grid[y][x];
    if (p) { const v = V(p, x, y); v.s = 0; tween(v, { s: 1 }, 0.35, 'back'); }
    leaves(x, y); Sound.play('vine'); buzz([20]);
    await wait(0.4);
  }
  // ídolos amaldiçoados contam 1 a menos; se algum zerou, explode e a fase acaba
  async function onBombTick(ev) {
    for (const [x, y] of ev.cells) { const p = state.grid[y][x]; if (p) bombTick[p.id] = now; }
    Sound.play('click');
    if (ev.cursed) {
      const [x, y] = ev.cursed;
      await wait(0.3);
      Sound.play('barrel'); buzz([80, 40, 120]); addShake(0.9);
      ring(x, y, 'rgba(255,40,60,0.95)', 3); fire(x, y, 40); parts.push({ type: 'flash', life: 0, max: 0.5 });
      await wait(0.7);
    } else await wait(0.15);
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
    } else if (start.combo === 'nova+x') {
      Sound.play('barrel'); Sound.play('line');
      for (let d = -1; d <= 1; d++) { beam('h', ay + d); beam('v', ax + d); }
      ring(ax, ay, 'rgba(255,130,40,0.95)', 3.2); fire(ax, ay, 44); addShake(0.7); praise(3);
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
    } else if (b.special === 'nova') {
      Sound.play('barrel'); Sound.play('line');
      beam('h', b.y); beam('v', b.x); ring(b.x, b.y, 'rgba(255,130,40,0.95)', 2.6); fire(b.x, b.y, 34); addShake(0.55);
      if (ART.fx('novaboom')) parts.push({ type: 'fxsprite', key: 'novaboom', x: cellX(b.x), y: cellY(b.y), s0: 1.5, s1: 6, life: 0, max: 0.6 });
      if (ART.fx('novacross')) parts.push({ type: 'fxsprite', key: 'novacross', x: cellX(b.x), y: cellY(b.y), s0: 4, s1: 12, life: 0, max: 0.55 });
    } else if (b.special === 'idol') {
      Sound.play('idol');
      if (ART.fx('sunbeam')) { b.area.forEach(([x, y], k) => parts.push({ type: 'fxsprite', key: 'sunbeam', x: cellX(x), y: cellY(y) - cs * 1.4, s0: 1, s1: 1, tall: true, life: -k * 0.02, max: 0.6 })); parts.push({ type: 'fxsprite', key: 'flare2', x: cellX(b.x), y: cellY(b.y), s0: 1, s1: 2.6, life: 0, max: 0.5 }); }
      else for (const [x, y] of b.area) parts.push({ type: 'bolt', x1: cellX(b.x), y1: cellY(b.y), x2: cellX(x), y2: cellY(y), life: 0, max: 0.4 });
      addShake(0.25);
    }
  }

  async function afterMove() {
    renderHUD();
    if (state.cursed) { showLose(); return; } // ídolo amaldiçoado zerou
    if (level.weekly && state.moves <= 0) { showWeekly(); return; }
    if (LR.isWon(state)) { await treasureRush(); showWin(); return; }
    if (state.moves <= 0) { showLose(); return; }
    busy = false;
  }

  async function treasureRush() {
    await wait(0.25);
    if (state.moves > 0) {
      const rushArt = I18N.lang === 'pt' && ART.nodeImg('rush');
      showPraise(T('rush'), rushArt ? 'art rush' : 'banner', rushArt);
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
    // em português: palavra pintada estilo Solar (Ótimo/Incrível/Lendário); senão, texto
    const art = I18N.lang === 'pt' && wordImg('p' + n);
    showPraise(T('praise.' + n), art ? 'art p' + n : '', art);
    Sound.voice('p' + n, I18N.lang);
  }
  function showPraise(text, cls, img) {
    const el = document.createElement('div');
    el.className = 'praise' + (cls ? ' ' + cls : '');
    if (img) { el.innerHTML = '<img alt="" src="' + img + '">'; el.setAttribute('aria-label', text); } else el.textContent = text;
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
  // blocos de ruína (folha: ruin1 calendário, ruin2 musgo, ruin3 runa acesa, ruin4 raízes).
  // Escolha dele (15/10): todas as casas com o mesmo bloco, o de musgo (misturado ficou bagunçado)
  const RUIN_KEYS = ['ruin2'];
  const ruinPick = () => 0;
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
    // casas que não existem na fase: blocos de ruína que não quebram (pintados; fosso escuro só enquanto a arte carrega)
    const dark = g.createPattern(TEX.get('dark'), 'repeat');
    const ruins = RUIN_KEYS.map(nodeImgObj);
    const ready = ruins.every(Boolean);
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
      if (state.mask[y][x]) continue;
      const X = ox - ix + x * cs, Y = oy - iy + y * cs;
      g.fillStyle = dark; g.fillRect(X - 1, Y - 1, cs + 2, cs + 2);
      if (ready) {
        g.drawImage(ruins[ruinPick(x, y)], X, Y, cs, cs);
        // sombra leve no pé do bloco pra ele assentar na moldura
        const sh = g.createLinearGradient(0, Y + cs * 0.7, 0, Y + cs);
        sh.addColorStop(0, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(0,0,0,0.35)');
        g.fillStyle = sh; g.fillRect(X, Y, cs, cs);
        continue;
      }
      const sh = g.createLinearGradient(0, Y, 0, Y + cs);
      sh.addColorStop(0, 'rgba(0,0,0,0.85)'); sh.addColorStop(1, 'rgba(0,0,0,0.55)');
      g.fillStyle = sh; g.fillRect(X - 1, Y - 1, cs + 2, cs + 2);
    }
    // a arte ainda não carregou: refaz a camada quando chegar
    if (!ready) for (const k of RUIN_KEYS) { const im = nodeImgs[k]; if (im && !im.complete) im.addEventListener('load', () => { if (state) buildBoardLayer(); }, { once: true }); }
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
    for (let i = floats.length - 1; i >= 0; i--) { if (floats[i].hold) continue; floats[i].t += dt; if (floats[i].t > 0.9) floats.splice(i, 1); }
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
    if (scene === 'play' && state) { drawBoard(); drawIntro(); }
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
    if (state.bosses && state.bosses.length) drawBosses();
    drawHammerFx();
    drawParts();
    ctx.restore();
    drawFloats();
  }

  function drawPiece(p, v, extra, glintT) {
    if (p.kind === 'statue') return; // o ídolo inteiro (2x2) é desenhado em drawBoss
    const s = v.s * (extra || 1);
    if (s <= 0.01 || v.a <= 0.01) return;
    const cx = ox + (v.x + 0.5) * cs, cy = oy + (v.y + 0.5) * cs;
    const w = cs * s * (1 + v.sq), h = cs * s * (1 - v.sq);
    ctx.globalAlpha = v.a;
    // joia que a onça transformou em pedra: pedra pintada com a marca verde da garra
    // joia engolida pela jiboia: bolo de escamas com a joia brilhando dentro
    // Musgo Vivo (16/10): o bloco de musgo pintado das ruínas, com um brilho verde que pulsa (está vivo, cresce)
    if (p.kind === 'moss') {
      const im = nodeImgObj('ruin2'), pulse = 0.5 + 0.5 * Math.sin(now * 2.6 + p.id);
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, cs * 0.62 * s);
      g.addColorStop(0, 'rgba(120,255,110,' + (0.45 + 0.25 * pulse) * v.a + ')'); g.addColorStop(1, 'rgba(120,255,110,0)');
      ctx.fillStyle = g; ctx.fillRect(cx - cs, cy - cs, cs * 2, cs * 2);
      const k = 0.9 + 0.03 * pulse;
      // bloco mais claro que a casa vazia (que usa a mesma arte): pintado uma vez, esverdeado; o cipó pintado por cima respira
      const ms = mossSprite(im);
      if (ms) ctx.drawImage(ms, cx - w * 0.5 * k, cy - h * 0.5 * k, w * k, h * k);
      const vine = ART.pieceImage('vine');
      if (vine) { ctx.save(); ctx.translate(cx, cy); ctx.rotate(Math.sin(now * 1.3 + p.id) * 0.12); ctx.globalAlpha = v.a * 0.95; ctx.drawImage(vine, -w * 0.52, -h * 0.52, w * 1.04, h * 1.04); ctx.restore(); }
      ctx.globalAlpha = 1; return;
    }
    if (p.cocoon) {
      const im = nodeImgObj('cocoon'), urgent = p.cocoon <= 1, pulse = 0.5 + 0.5 * Math.sin(now * (urgent ? 9 : 3) + p.id);
      const tick = bombTick[p.id] != null ? Math.max(0, 1 - (now - bombTick[p.id]) / 0.4) : 0;
      if (im) ctx.drawImage(im, cx - w * 0.49, cy - h * 0.49, w * 0.98, h * 0.98);
      if (urgent) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,60,60,' + (0.18 + 0.22 * pulse) * v.a + ')'; ctx.fillRect(cx - w * 0.49, cy - h * 0.49, w * 0.98, h * 0.98); ctx.restore(); }
      // disco escuro atrás da contagem: o dourado dos dígitos some em cima da teia branca
      ctx.save(); ctx.globalAlpha = 0.82 * v.a; ctx.fillStyle = urgent ? '#5a0f12' : '#0f2a1c'; ctx.beginPath(); ctx.arc(cx, cy, cs * s * 0.3, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = urgent ? '#ff8a7a' : '#7fe0a8'; ctx.lineWidth = Math.max(1.5, cs * 0.04); ctx.stroke(); ctx.restore();
      const ds = String(p.cocoon).split('').map((d) => nodeImgObj('n' + d)).filter(Boolean);
      if (ds.length) {
        const dh = cs * s * (0.46 + 0.14 * tick), dw = ds.map((i2) => dh * i2.naturalWidth / i2.naturalHeight * 0.8);
        let x0 = cx - dw.reduce((a, b) => a + b, 0) / 2;
        ctx.save(); ctx.globalAlpha = v.a; ctx.shadowColor = urgent ? 'rgba(255,40,40,0.95)' : 'rgba(0,30,10,0.95)'; ctx.shadowBlur = cs * 0.18;
        ds.forEach((i2, i) => { ctx.drawImage(i2, x0, cy - dh / 2, dw[i], dh); x0 += dw[i]; });
        ctx.restore();
      }
      ctx.globalAlpha = 1; return;
    }
    const stoneIm = (p.claw && nodeImgObj(p.claw === 'onca' ? 'ostone' : 'jstone')) || (p.lump && nodeImgObj('alump'));
    if (stoneIm) { ctx.drawImage(stoneIm, cx - w * 0.48, cy - h * 0.48, w * 0.96, h * 0.96); ctx.globalAlpha = 1; return; }
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
    // Ídolo Amaldiçoado (16/10): aura vermelha que pulsa mais rápido quanto menos falta, e a contagem em dígitos Solar
    if (p.bomb) {
      const urgent = p.bomb <= 3, sp = urgent ? 9 : 3.5, pulse = 0.5 + 0.5 * Math.sin(now * sp + p.id);
      const tick = bombTick[p.id] != null ? Math.max(0, 1 - (now - bombTick[p.id]) / 0.4) : 0;
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, cs * 0.7 * s);
      g.addColorStop(0, 'rgba(255,40,60,' + ((urgent ? 0.45 : 0.25) + 0.25 * pulse + 0.4 * tick) * v.a + ')'); g.addColorStop(1, 'rgba(160,0,60,0)');
      ctx.fillStyle = g; ctx.fillRect(cx - cs, cy - cs, cs * 2, cs * 2); ctx.restore();
      const ds = String(p.bomb).split('').map((d) => nodeImgObj('n' + d)).filter(Boolean);
      if (ds.length) {
        const dh = cs * s * (0.5 + 0.15 * tick), dw = ds.map((im) => dh * im.naturalWidth / im.naturalHeight * 0.8);
        let x0 = cx - dw.reduce((a, b) => a + b, 0) / 2;
        ctx.save(); ctx.globalAlpha = v.a; ctx.shadowColor = urgent ? 'rgba(255,40,40,0.95)' : 'rgba(0,0,0,0.9)'; ctx.shadowBlur = cs * 0.15;
        ds.forEach((im, i) => { ctx.drawImage(im, x0, cy - dh / 2, dw[i], dh); x0 += dw[i]; });
        ctx.restore();
      }
    }
    // Gosma do Sapo (18/10): bolha verde brilhante em cima da joia (2 camadas = grossa; 1 = rachada). Arte própria entra como nó 'slime'/'slime2'
    if (p.vine && p.slime) {
      const r = cs * s * 0.5, im = nodeImgObj(p.slime > 1 ? 'slime' : 'slime2'), wob = 1 + 0.03 * Math.sin(now * 3 + p.id);
      ctx.save(); ctx.globalAlpha = v.a; ctx.translate(cx, cy); ctx.scale(wob, 2 - wob);
      if (im) ctx.drawImage(im, -r, -r, r * 2, r * 2);
      else {
        const g = ctx.createRadialGradient(-r * 0.25, -r * 0.3, r * 0.1, 0, 0, r);
        g.addColorStop(0, p.slime > 1 ? 'rgba(170,255,120,0.78)' : 'rgba(170,255,120,0.5)'); g.addColorStop(0.7, p.slime > 1 ? 'rgba(60,170,60,0.74)' : 'rgba(60,170,60,0.42)'); g.addColorStop(1, 'rgba(20,90,30,0.85)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(0, 0, r * 0.95, r * 0.9, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.beginPath(); ctx.ellipse(-r * 0.3, -r * 0.35, r * 0.22, r * 0.12, -0.5, 0, Math.PI * 2); ctx.fill();
        if (p.slime <= 1) { ctx.strokeStyle = 'rgba(20,70,20,0.9)'; ctx.lineWidth = r * 0.08; ctx.beginPath(); ctx.moveTo(-r * 0.4, -r * 0.1); ctx.lineTo(0, r * 0.1); ctx.lineTo(r * 0.3, -r * 0.2); ctx.stroke(); }
      }
      ctx.restore();
    } else if (p.vine) { ctx.save(); ctx.translate(cx, cy); ctx.rotate(now * 0.35 + p.id); ctx.globalAlpha = v.a * (0.85 + 0.15 * Math.sin(now * 3 + p.id)); ctx.drawImage(ART.vineSprite(S), -(cs * s) / 2, -(cs * s) / 2, cs * s, cs * s); ctx.restore(); }
    // Joia de Tempo (18/10): ampulheta turquesa no canto; combinar dá +2 movimentos
    if (p.clock) {
      const im = nodeImgObj('ixmoves'), r = cs * s * 0.25, bx = cx + cs * s * 0.27, by = cy - cs * s * 0.27, pulse = 1 + 0.08 * Math.sin(now * 4 + p.id);
      ctx.save(); ctx.globalAlpha = v.a; ctx.fillStyle = 'rgba(8,20,24,0.88)'; ctx.beginPath(); ctx.arc(bx, by, r * 1.25 * pulse, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(143,243,234,0.95)'; ctx.lineWidth = Math.max(1.5, cs * 0.03); ctx.stroke();
      if (im) ctx.drawImage(im, bx - r * pulse, by - r * pulse, r * 2 * pulse, r * 2 * pulse);
      ctx.restore();
    }
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
        // rastro de skin (jade/fogo) é bem mais comprido e fino que o dardo: desenha maior e somando luz
        const im = ART.fx('dart'), q2 = EASE.inout(q), long = im.width / im.height > 4.5, L = cs * (long ? 3 : 1.9), Hh = L * im.height / im.width * (long ? 1.6 : 1);
        const span = (p.h ? state.W : state.H) * cs + cs * 2, start = -cs + (p.dir > 0 ? 0 : span), pos = start + p.dir * q2 * span;
        const x = p.h ? ox + pos : cellX(p.at), y = p.h ? cellY(p.at) : oy + pos;
        ctx.save(); if (long) ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 1 - Math.max(0, (q - 0.8) / 0.2); ctx.translate(x, y); ctx.rotate((p.h ? 0 : Math.PI / 2) + (p.dir < 0 ? Math.PI : 0));
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
      const y = f.y - q * cs * 0.9;
      // pontos em dígitos Solar pintados (os mesmos do placar); sem a arte, cai no texto
      const ims = f.num != null ? String(f.num).split('').map(digitImg) : null;
      if (ims && ims.every(Boolean)) {
        const h = cs * 0.78, ws = ims.map((im) => h * im.naturalWidth / im.naturalHeight), gap = -h * 0.2;
        let x = f.x - (ws.reduce((a, b) => a + b, 0) + gap * (ws.length - 1)) / 2;
        ctx.shadowColor = 'rgba(0,0,0,0.9)'; ctx.shadowBlur = cs * 0.14; ctx.shadowOffsetY = cs * 0.03;
        ims.forEach((im, k) => { ctx.drawImage(im, x, y - h / 2, ws[k], h); x += ws[k] + gap; });
        ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
        continue;
      }
      ctx.font = '700 ' + Math.round(cs * 0.42) + 'px "Uncial Antiqua", Georgia, serif';
      ctx.lineWidth = Math.max(2, cs * 0.08); ctx.strokeStyle = 'rgba(10,8,4,0.85)'; ctx.strokeText(f.text, f.x, y);
      ctx.fillStyle = f.color; ctx.fillText(f.text, f.x, y);
    }
    ctx.restore();
  }

  // ---------- painel do jogo ----------
  // ícone da meta: o chefe usa o próprio sprite pintado
  // sprites de cada chefe (art-data.js, folhas do Gemini em assets\boss): parado, golpe, movimento, morte, vida cheia/perdida.
  // size = largura do desenho em casas do tabuleiro
  const BOSS_SPR = {
    scarab: { idle: 'bidle', hit: 'bhit', move: 'bfly', dead: 'bdead', l3: 'blife3', l1: 'blife1', size: 1.3 },
    jaguar: { idle: 'jidle', hit: 'jhit', move: 'jleap', dead: 'jdead', l3: 'jlife3', l1: 'jlife1', size: 1.95,
      torso: 'jtorso', head: 'jhead', roar: 'jroar', tail: 'jtail', legF: 'jlegf', legB: 'jlegb', claw: 'jclaw' }, // peças (drawJaguar)
    statue: { idle: 'sidle', hit: 'shit', move: 'sidle', dead: 'sdead', l3: 'slife3', l1: 'slife1', size: 2.05 },
    // jiboia (fase 12): enrolada, golpe, fugindo (também na saída), engolindo; vidas = carapaças do escaravelho (só se faltar a barra)
    // macaco (fase 18): pendurado no cipó, assustado, fugindo, trocando joias
    // sapo (18/10): enquanto não chega a arte própria, usa os desenhos do macaco; trocar os nomes aqui (fidle, fhit...) e no gerar-arte-data.ps1
    frog: { idle: 'fidle', hit: 'fhit', move: 'fflee', dead: 'fflee', eat: 'fspit', l3: 'blife3', l1: 'blife1', size: 1.85 },
    // onça-pintada normal (18/10): poses inteiras (parada, golpe, salto), sem montar em partes como a de jade
    // 18/10: onça SENTADA (pedido dele, a de salto era esquisita); a animação é de código (respira, balança, apanha, salta em arco)
    onca: { idle: 'oidle', hit: 'ohit', move: 'oidle', dead: 'ohit', l3: 'jlife3', l1: 'jlife1', size: 1.75 },
    // aranha-tecelã (18/10): casulos com contagem; a mesma pose serve pra tudo, o código mexe as pernas (balanço rápido)
    spider: { idle: 'spidle', hit: 'sphit', move: 'spidle', dead: 'sphit', eat: 'spidle', l3: 'jlife3', l1: 'jlife1', size: 2.2 },
    monkey: { idle: 'midle', hit: 'mhit', move: 'mflee', dead: 'mflee', eat: 'mswap', l3: 'blife3', l1: 'blife1', size: 1.4 },
    boa: { idle: 'aidle', hit: 'ahit', move: 'aflee', dead: 'aflee', eat: 'aeat', l3: 'blife3', l1: 'blife1', size: 1.35 },
    serpent: { idle: 'kidle', hit: 'khit', move: 'kcoil', dead: 'kdead', l3: 'klife3', l1: 'klife1', size: 2.3,
      head: 'khead', roar: 'kroar', seg: 'kseg', tail: 'ktail' }, // peças do corpo articulado (drawSerpent)
  };
  const bossKindOf = (L) => (L && (L.bossKind || (L.scarab ? 'scarab' : null))) || 'scarab';
  // musgo e Pedido do Sacerdote usam a arte pintada (bloco de musgo, ícones da loja)
  const MAKE_ART = { line: 'ixarrow', barrel: 'ixseal', idol: 'ixorb', nova: 'ixorb' };
  const goalIcon = (g, size, L) => (g.type === 'boss' && ART.nodeImg(BOSS_SPR[bossKindOf(L || level)].idle)) ||
    (g.type === 'moss' && ART.nodeImg('ruin2')) || (g.type === 'make' && ART.nodeImg(MAKE_ART[g.special])) || ART.icon(goalIconKey(g), size);
  const goalIconKey = (g) => (g.type === 'score' ? 'star' : g.type === 'collect' ? 'gem' + g.color : g.type === 'sand' ? 'sand' : g.type === 'rock' ? 'rock' : g.type === 'vine' ? 'vine' : 'chest');
  function goalLeft(g) {
    if (g.type === 'score') return Math.max(0, g.target - state.score);
    if (g.type === 'sand') return LR.sandLeft(state);
    if (g.type === 'moss') return LR.countKind(state, 'moss'); // o musgo cresce: falta o que tem no tabuleiro
    return Math.max(0, g.target - g.count);
  }
  let chipEls = [], lastLeft = [];
  function buildGoalChips() {
    const box = $('goals');
    box.innerHTML = '';
    chipEls = state.goals.map((g) => {
      const el = document.createElement('div');
      el.className = 'chip';
      el.innerHTML = '<img alt="" src="' + goalIcon(g, 64) + '"><b></b>';
      box.appendChild(el);
      return el;
    });
    lastLeft = state.goals.map(() => null);
    for (const k of ['mk1', 'mk2', 'mk3']) { $(k).classList.remove('on'); $(k).style.opacity = ''; $(k).src = paintedBar() ? ART.nodeImg('vstar') : ART.icon('star0', 48); }
  }
  // dígitos Solar sem halo como imagem, pra desenhar no canvas (pontos que sobem do tabuleiro)
  const nodeImgs = {};
  function nodeImgObj(key) {
    let im = nodeImgs[key];
    if (!im) { const src = ART.nodeImg(key); if (!src) return null; im = nodeImgs[key] = new Image(); im.src = src; }
    return im.complete && im.naturalWidth ? im : null;
  }
  const digitImg = (d) => nodeImgObj('s' + d);
  // placar v2 pintado: barra com 3 encaixes fixos e números em dígitos Solar
  const paintedBar = () => !!(ART.uiImages().bar && ART.uiImages().barfill && ART.nodeImg('vstar'));
  const SOCK = [12.1, 51.6, 87.7]; // centro dos encaixes na arte da barra (% da largura)
  const digitsHTML = (n) => String(n).split('').map((d) => '<img alt="" src="' + (ART.nodeImg('s' + d) || ART.nodeImg('n' + d)) + '">').join('');
  // "Você tem N moedas" (16/10 ele achou texto solto): moeda pintada + dígitos Solar
  const fxURLs = {};
  const fxURL = (k) => { if (fxURLs[k]) return fxURLs[k]; const o = ART.fx(k); if (!o) return ''; return (fxURLs[k] = o.toDataURL ? o.toDataURL('image/png') : o.src); };
  const walletHTML = () => (ART.nodeImg('s0')
    ? '<span class="wallet-row"><img class="coin" alt="" src="' + ART.icon('coin', 64) + '"><span class="digits" aria-label="' + save.coins + '">' + digitsHTML(save.coins) + '</span></span>'
    : T('wallet', { n: save.coins.toLocaleString() }));
  const lastShown = {};
  function setNum(id, n) {
    if (lastShown[id] === n) return;
    lastShown[id] = n;
    const el = $(id);
    if (ART.nodeImg('n0')) { el.innerHTML = digitsHTML(n); el.setAttribute('aria-label', String(n)); el.classList.add('digits'); }
    else el.textContent = n;
  }
  function renderHUD() {
    if (!state) return;
    const mv = $('moves');
    setNum('moves', state.moves);
    mv.classList.toggle('low', state.moves <= 5 && state.moves > 0 && !LR.isWon(state));
    if (ART.nodeImg('n0') && ART.uiImages().coinbar) setNum('score', coinsOf(state.score));
    else { lastShown.score = null; $('score').innerHTML = '<img class="coin" alt="" src="' + ART.icon('coin', 48) + '">' + coinsOf(state.score).toLocaleString(I18N.lang === 'pt' ? 'pt-BR' : 'en-US'); }
    updateHammerBtn();
    const top = level.stars[2];
    if (paintedBar()) {
      // o ouro sai do 1º encaixe e chega em cada encaixe exatamente na pontuação daquela estrela
      const [s1, s2, s3] = level.stars, sc = state.score;
      const w = sc <= s1 ? 0 : sc <= s2 ? (sc - s1) / (s2 - s1) * (SOCK[1] - SOCK[0]) : (SOCK[1] - SOCK[0]) + Math.min(1, (sc - s2) / (s3 - s2)) * (SOCK[2] - SOCK[1]);
      $('starfill').style.width = w + '%';
    } else $('starfill').style.width = Math.min(100, (state.score / top) * 100) + '%';
    level.stars.forEach((v, i) => {
      const el = $('mk' + (i + 1));
      el.style.left = paintedBar() ? SOCK[i] + '%' : Math.min(100, (v / top) * 100) - (i === 2 ? 4 : 0) + '%';
      const on = state.score >= v;
      // antes da 1ª estrela a barra não anda: a estrela do 1º encaixe vai aparecendo aos poucos
      if (paintedBar() && i === 0 && !on) el.style.opacity = (0.5 * state.score / v).toFixed(2);
      if (on !== el.classList.contains('on')) { el.classList.toggle('on', on); if (on) el.style.opacity = ''; if (!paintedBar()) el.src = ART.icon(on ? 'star' : 'star0', 48); if (on && scene === 'play') Sound.play('star', i); }
    });
    state.goals.forEach((g, i) => {
      const left = goalLeft(g), el = chipEls[i];
      if (!el) return;
      const done = LR.goalDone(state, g);
      el.classList.toggle('done', done);
      // meta de pontos mostra quanto FALTA (desce a cada jogada), como as outras metas
      el.querySelector('b').textContent = done ? '✓' : left.toLocaleString(I18N.lang === 'pt' ? 'pt-BR' : 'en-US');
      if (lastLeft[i] != null && left !== lastLeft[i]) { el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }
      lastLeft[i] = left;
    });
  }

  // ---------- janelas ----------
  function openModal(html) {
    const card = $('modalCard');
    // 25/10: zera as classes a cada janela. Antes a classe "pre" (altura fixa + corte) vazava do card da fase
    // pra loja e pros recordes: o botão Fechar da loja ficava cortado e o conteúdo passava da moldura.
    card.className = 'card';
    card.innerHTML = html;
    $('modal').hidden = false;
    const first = card.querySelector('.btn');
    if (first) setTimeout(() => first.focus({ preventScroll: true }), 50);
    return card;
  }
  function closeModal() { $('modal').hidden = true; }
  const goalText = (g, L) => {
    if (g.type === 'collect') return T('goal.collect', { n: g.target }) + ' ' + I18N.gem(g.color);
    if (g.type === 'make') return T('goal.make.' + g.special, { n: g.target });
    if (g.type === 'boss' && bossKindOf(L || level) !== 'scarab') return T('goal.' + bossKindOf(L || level));
    const s = T('goal.' + g.type, { n: g.type === 'score' ? g.target.toLocaleString() : g.target });
    return s.replace('baú(s)', g.target === 1 ? 'baú' : 'baús').replace('chest(s)', g.target === 1 ? 'chest' : 'chests');
  };
  const TUT_ART = { moss: 'ruin2', make: 'ixseal', bomb: 'ixorb', nova: 'ixorb' }; // tutoriais das fases 21+ com arte pintada
  const TUT_ICON = { swap: 'gem3', collect: 'gem0', line: 'dynamite', sand: 'sand', barrel: 'barrel', artifact: 'chest', idol: 'idol', rock: 'rock', diamond: 'gem5', vine: 'vine' };

  // explicação da fase em tópicos curtos (texto do i18n separado por |); fase com ponto fraco ganha a linha do selo
  const tutBullets = (key, L) => {
    // a regra do ponto fraco vem primeiro: é a que muda como se joga e não pode ficar escondida na rolagem
    const parts = (L.weak ? [T('weak.hint')] : []).concat(key ? T(key).split('|') : []);
    return parts.map((t, i) => '<li' + (L.weak && i === 0 ? ' class="weak"' : '') + '>' + t + '</li>').join('');
  };
  const goalRowsHTML = (L) => L.goals.map((g) => {
    const gg = Object.assign({}, g);
    if (g.type === 'sand') { gg.target = L.layout.join('').split('').reduce((n, c) => n + (c === 's' || c === 'w' ? 1 : c === 'S' || c === 'W' ? 2 : 0), 0); }
    if (g.type === 'moss') gg.target = L.layout.join('').split('m').length - 1;
    return '<div class="goal-row"><img alt="" src="' + goalIcon(g, 80, L) + '"><span>' + goalText(gg, L) + '</span></div>';
  }).join('');
  const tutKeyOf = (L) => (L.tut ? 'tut.' + L.tut : L.id === 25 ? 'tip.combo' : null);
  // 25/10 (pedido dele): ao começar, objetivo + 1 dica curta por ~3 s sobre o tabuleiro, sem bloquear o toque
  function briefLevel(L) {
    // 25/10: só o objetivo; a única dica que aparece é a do ponto fraco (sem ela o chefe parece imortal). O resto fica no "i".
    const tip = L.weak ? T('weak.short') : '';
    const el = document.createElement('div');
    el.className = 'brief';
    el.innerHTML = '<div class="goal-list">' + goalRowsHTML(L) + '</div>' + (tip ? '<p' + (L.weak ? ' class="weak"' : '') + '>' + tip + '</p>' : '');
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3400);
  }
  function openPre(id, hard) {
    const hardOpen = !!save.stars[id], hardMode = !!hard && hardOpen;
    const L = levelMode(id, hardMode);
    const tutKey = tutKeyOf(L);
    const rows = goalRowsHTML(L);
    // 25/10 (pedido dele: "tudo clean, info só se clicar"): o card mostra só fase, modo, objetivo, movimentos e
    // itens/ranking. Explicação, regras do Difícil e Trilha ficam atrás do botão "i".
    const lockSvg = '<svg class="lk" viewBox="0 0 20 20" aria-hidden="true"><path d="M6 8V6a4 4 0 1 1 8 0v2h1v10H5V8zm2 0h4V6a2 2 0 1 0-4 0z"/></svg>';
    const tutImg = ((L.boss || L.tut === 'boa' || L.tut === 'monkey' || L.tut === 'frog' || L.tut === 'spider') && L.tut && ART.nodeImg(BOSS_SPR[bossKindOf(L)].idle)) || (TUT_ART[L.tut] && ART.nodeImg(TUT_ART[L.tut])) || ART.icon(TUT_ICON[L.tut] || 'barrel', 108);
    const infoHTML =
      (tutKey || L.weak ? '<div class="tut open"><img alt="" src="' + tutImg + '"><ul class="tut-list">' + tutBullets(tutKey, L) + '</ul></div>' : '') +
      '<p class="info-line">' + T(hardMode ? 'mode.hard.rules' : hardOpen ? 'info.hardOpen' : 'info.locked') + '</p>' +
      (!hardMode && ART.nodeImg('ixarrow') ? streakHTML() : '');
    const card = openModal(
      '<h2 class="pre-title">' + T('level') + ' ' + id + '</h2>' +
      '<div class="mode-pick"><button type="button" id="mNormal" class="' + (!hardMode ? 'on' : '') + '">' + T('mode.normal') + '</button>' +
      '<button type="button" id="mHard" class="' + (hardMode ? 'on' : '') + '"' + (hardOpen ? '' : ' disabled aria-label="' + T('mode.hard.locked') + '"') + '>' + (hardOpen ? '' : lockSvg) + T('mode.hard') + '</button>' +
      '<button type="button" id="mInfo" class="info-dot" aria-label="' + T('info.btn') + '" aria-expanded="false">i</button></div>' +
      '<div class="pre-body"><div class="pre-main">' +
        (L.boss ? '<div class="boss-tag">' + T('boss') + '</div>' : '') +
        '<div class="goal-list">' + rows + '</div>' +
        '<div class="pre-moves">' + T('pre.moves', { n: '<b>' + L.moves + '</b>' }) + '</div>' +
        (hardMode ? '<div class="weekly-list"><div class="weekly-status">' + T('weekly.loading') + '</div></div>' : boostPicker()) +
      '</div><div class="pre-info">' + infoHTML + '</div></div>' +
      '<div class="btns"><button class="btn" id="mPlay" type="button">' + T('play') + '</button>' +
      '<button class="btn dark small" id="mMap" type="button">' + T('map') + '</button></div>');
    card.classList.add('pre');
    if (hardMode) card.classList.add('hard-pre');
    const tl = card.querySelector('.tut-list'), info = card.querySelector('#mInfo');
    info.onclick = () => {
      Sound.play('click');
      const open = card.classList.toggle('info-open');
      info.setAttribute('aria-expanded', open);
      // se a explicação passar da caixa, mostra um degradê embaixo (só ela rola)
      if (open && tl) requestAnimationFrame(() => { tl.classList.toggle('more', tl.scrollHeight > tl.clientHeight + 2); tl.onscroll = () => tl.classList.toggle('more', tl.scrollTop + tl.clientHeight < tl.scrollHeight - 4); });
    };
    const picked = {};
    card.querySelectorAll('.boost').forEach((b) => { b.onclick = () => { const k = b.dataset.k; picked[k] = !picked[k]; b.classList.toggle('on', picked[k]); b.setAttribute('aria-pressed', picked[k]); Sound.play('click'); }; });
    const shopLink = card.querySelector('#mShop'); if (shopLink) shopLink.onclick = () => { Sound.play('click'); openShop(() => openPre(id, false)); };
    card.querySelector('#mNormal').onclick = () => { if (hardMode) { Sound.play('click'); openPre(id, false); } };
    card.querySelector('#mHard').onclick = () => {
      if (!hardOpen || hardMode) return;
      Sound.play('click');
      if (!Records.validName(Records.getName())) return askWeeklyName(() => openPre(id, false), () => openPre(id, true));
      openPre(id, true);
    };
    card.querySelector('#mPlay').onclick = () => {
      Sound.init(); Sound.play('click');
      if (hardMode && !Records.validName(Records.getName())) return askWeeklyName(() => openPre(id, false), () => openPre(id, true));
      for (const k in picked) if (picked[k] && save.items[k] > 0) save.items[k]--; else delete picked[k];
      persist(); closeModal(); wipe(() => startLevel(id, picked, hardMode));
    };
    card.querySelector('#mMap').onclick = () => { Sound.play('click'); closeModal(); if (scene !== 'map') openMap(); };
    if (hardMode) loadLevelBoards(card, id, Records.listLevel(id, L.week));
  }

  async function showWin() {
    if (level.daily) return showDaily();
    Ads.gameplay(false);
    finishRun('win');
    const id = level.id, hardMode = !!level.hard, stars = LR.stars(state);
    const weeklyBest = hardMode ? hardWeeklyScores() : null;
    const prevBest = hardMode ? (weeklyBest[id] || 0) : (save.best[id] || 0), isNew = state.score > prevBest && prevBest > 0;
    if (hardMode) {
      save.hardBest[id] = Math.max(save.hardBest[id] || 0, state.score);
      weeklyBest[id] = Math.max(prevBest, state.score);
    } else {
      save.stars[id] = Math.max(save.stars[id] || 0, stars);
      save.best[id] = Math.max(prevBest, state.score);
      save.unlocked = Math.max(save.unlocked, Math.min(LEVELS.length, id + 1));
      save.wins = (save.wins || 0) + 1;
      save.streak = Math.min(3, (save.streak || 0) + 1);
    }
    const earned = hardMode ? 0 : coinsOf(state.score) + stars * 10;
    if (!hardMode) save.coins += earned;
    persist();
    Sound.play('win'); buzz([30, 60, 30, 60, 90]);
    setTimeout(() => Sound.voice('win', I18N.lang), 350);
    const last = id === LEVELS.length;
    const card = openModal(
      (ART.nodeImg('vtitle') && I18N.lang === 'pt' ? '' : '<div class="eyebrow">' + T('level') + ' ' + id + '</div>') +
      (ART.nodeImg('vtitle') && I18N.lang === 'pt' ? '<h2 class="win-word"><img alt="' + T('win.title') + '" src="' + ART.nodeImg('vtitle') + '"></h2>' : '<h2 class="metal">' + T('win.title') + '</h2><div class="orn"><i></i></div>') +
      '<div class="stars-big"><img alt=""><img alt=""><img alt=""></div>' +
      // moedas ganhas: mesma placa de moeda pintada do placar, número em dígitos Solar
      (ART.uiImages().coinbar && ART.nodeImg('s0')
        ? '<div class="final-score painted"><span id="mScore" class="digits"></span></div>'
        : '<div class="final-score"><img class="coin" alt="" src="' + ART.icon('coin', 96) + '">+<span id="mScore">0</span></div>') +
      '<div class="best' + (isNew ? ' new' : '') + '">' + (isNew ? T('win.new') + ' · ' : '') + (hardMode ? T('mode.hard.score', { n: state.score.toLocaleString(I18N.lang === 'pt' ? 'pt-BR' : 'en-US') }) : walletHTML()) + '</div>' +
      (hardMode ? '<div class="weekly-list"><div class="weekly-status">' + T('weekly.loading') + '</div></div>' : '<div class="moves-line streak-up">' + T('streak.up', { n: save.streak }) + '</div>') +
      (last ? '<p>' + T('map.soon') + '</p>' : '') +
      '<div class="btns">' + (last || hardMode ? '' : '<button class="btn" id="mNext" type="button">' + T('next') + '</button>') +
      (hardMode ? '<button class="btn" id="mShare" type="button">' + T('records.share') + '</button>' : '') +
      '<button class="btn dark small" id="mMap" type="button">' + T('map') + '</button></div>');
    const imgs = card.querySelectorAll('.stars-big img');
    // estrelas pintadas: começa no encaixe de pedra vazio e troca pela estrela Solar ao acender
    const vOn = ART.nodeImg('vstar'), vOff = ART.nodeImg('vstar0');
    imgs.forEach((im) => { im.src = vOff || vOn || ART.icon('star', 128); });
    if (vOn) card.querySelector('.stars-big').classList.add('painted');
    if (vOn && vOff) card.querySelector('.stars-big').classList.add('slots');
    const lightStar = (im) => { if (vOn) im.src = vOn; im.classList.add('on'); };
    const sc = { v: 0 }, target = hardMode ? state.score : earned;
    tween(sc, { v: target }, 1, 'out').then(() => {});
    const scoreEl = card.querySelector('#mScore');
    const paintedScore = scoreEl.classList.contains('digits');
    let shownScore = -1;
    const showScore = (n) => { if (n === shownScore) return; shownScore = n; if (paintedScore) scoreEl.innerHTML = digitsHTML(n); else scoreEl.textContent = n.toLocaleString(); };
    showScore(0);
    const iv = setInterval(() => { showScore(Math.round(sc.v)); if (sc.v >= target) clearInterval(iv); }, 40);
    const next = card.querySelector('#mNext');
    if (next) next.onclick = () => {
      Sound.play('click'); closeModal();
      const go = () => openPre(id + 1);
      if (save.wins % 3 === 0) Ads.interstitial(go, { level: id }); else go();
    };
    const share = card.querySelector('#mShare');
    if (share) share.onclick = async () => {
      Sound.play('click');
      const n = state.score.toLocaleString(I18N.lang === 'pt' ? 'pt-BR' : 'en-US');
      try {
        await ShareCard.share({
          kind: 'hard', level: id, score: n,
          title: T('records.shareTitle', { n: id }), subtitle: T('records.shareSubtitle'),
          scoreLabel: T('records.points'), call: T('records.shareCall'),
          text: T('records.shareText', { level: id, score: n }),
        });
        track('share_result', { mode: 'hard', level: id, result: 'ok', score: state.score });
      } catch (e) { track('share_result', { mode: 'hard', level: id, result: 'cancel' }); }
    };
    card.querySelector('#mMap').onclick = () => { Sound.play('click'); closeModal(); wipe(openMap); };
    if (hardMode) {
      // envio ao ranking com aviso do resultado: ✓ no ranking, ou "não enviado" com botão de tentar de novo
      const runWeek = level.week, replay = weeklyReplay.slice(), score = state.score;
      const statusEl = document.createElement('div');
      statusEl.className = 'rank-status';
      card.querySelector('.weekly-list').after(statusEl);
      const send = () => {
        statusEl.className = 'rank-status'; statusEl.textContent = T('rank.sending');
        loadLevelBoards(card, id, Records.submitLevel(id, score, { week: runWeek, replay, onStatus: (s) => {
          track('score_submit', { mode: 'hard', level: id, result: s });
          if (!statusEl.isConnected) return;
          statusEl.className = 'rank-status ' + s;
          if (s === 'fail') {
            statusEl.innerHTML = T('rank.fail') + ' <button type="button" class="rank-retry">' + T('rank.retry') + '</button>';
            statusEl.querySelector('.rank-retry').onclick = () => { Sound.play('click'); send(); };
          } else statusEl.textContent = s === 'ok' ? T('rank.ok') : s === 'name' ? T('rank.name') : '';
        } }));
      };
      send();
    }
    for (let i = 0; i < stars; i++) { await wait(0.35); lightStar(imgs[i]); Sound.play('star', i); }
  }

  function showLose() {
    Ads.gameplay(false);
    if (level.hard || state.cursed || usedExtra) finishRun('lose', { reason: state.cursed ? 'cursed' : 'moves' });
    Sound.play('lose');
    const id = level.id;
    const rows = state.goals.filter((g) => !LR.goalDone(state, g)).map((g) =>
      '<div class="goal-row"><img alt="" src="' + goalIcon(g, 80) + '"><span>' + goalText(g) + '</span><b>' + (g.type === 'score' ? goalLeft(g).toLocaleString() : goalLeft(g)) + '</b></div>').join('');
    const card = openModal(
      '<div class="eyebrow">' + T('level') + ' ' + id + '</div>' +
      '<h2 class="metal">' + T('lose.title') + '</h2><div class="orn"><i></i></div>' +
      (state.cursed ? '<p>' + T('lose.cursed') + '</p>' : '') +
      '<div class="moves-line">' + T('lose.left') + '</div>' +
      '<div class="goal-list">' + rows + '</div>' +
      (!level.hard && save.streak ? '<div class="moves-line streak-lost">' + T('streak.lost') + '</div>' : '') +
      '<div class="btns">' +
      '<button class="btn stack" id="mExtra" type="button" hidden>' + T('lose.extra') + '<span class="sub">' + T('lose.extraAd') + '</span></button>' +
      '<button class="btn' + (usedExtra ? '' : ' stone') + '" id="mRetry" type="button">' + T('retry') + '</button>' +
      '<button class="btn dark small" id="mMap" type="button">' + T('map') + '</button></div>');
    // perdeu e desistiu (tentar de novo ou mapa) = trilha zera; se pegar +5 movimentos e vencer, mantém
    card.querySelector('#mRetry').onclick = () => { Sound.play('click'); finishRun('lose', { reason: state.cursed ? 'cursed' : 'moves' }); breakStreak(); closeModal(); wipe(() => startLevel(id, {}, !!level.hard)); };
    card.querySelector('#mMap').onclick = () => { Sound.play('click'); finishRun('lose', { reason: state.cursed ? 'cursed' : 'moves' }); breakStreak(); closeModal(); wipe(openMap); };
    if (!level.hard && !usedExtra && !state.cursed) { // desafio difícil e maldição não aceitam movimentos extras
      Ads.offerReward({
        level: id,
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
    card.querySelector('#mRestart').onclick = () => { Sound.play('click'); abandonRun('restart'); breakStreak(); closeModal(); wipe(() => startLevel(level.id, {}, !!level.hard)); };
    card.querySelector('#mMap').onclick = () => { Sound.play('click'); abandonRun('map'); breakStreak(); closeModal(); wipe(openMap); };
    card.querySelector('#mSfx').onclick = () => { Sound.setSfx(!Sound.sfx); paint(); };
    card.querySelector('#mMusic').onclick = () => { Sound.setMusic(!Sound.music); paint(); };
  }
  $('btnPause').onclick = openPause;
  $('modal').addEventListener('pointerdown', (e) => { e.stopPropagation(); });

  // ---------- loja do templo e vantagens ----------
  function boostPicker() {
    const owned = SHOP.filter((it) => it.id !== 'hammer' && save.items[it.id] > 0);
    // 25/10: só os ícones dos itens que ele tem (nome no aria-label); sem item, nada (a loja fica no menu)
    if (!owned.length) return '';
    return '<div class="boosts"><div class="boost-row">' +
      owned.map((it) => '<button class="boost" type="button" aria-pressed="false" aria-label="' + T('item.' + it.id) + '" title="' + T('item.' + it.id) + '" data-k="' + it.id + '"><img alt="" src="' + itemImg(it, 80) + '"><b>×' + save.items[it.id] + '</b></button>').join('') +
      '</div></div>';
  }
  // Códice do Templo (16/10): a loja é a página do livro pintado; as medalhas penduradas são as abas
  // (Itens · Skins de joia · Skins de palavra · Rastro de combo) e a medalha de baixo, do lado, volta.
  // 6 cartas por página; tocar numa carta mostra o detalhe e o botão de comprar embaixo do livro.
  // Skins: a de fábrica (value null) vem de graça; as outras se compram uma vez e depois é só tocar em USAR.
  const CODEX_TABS = [
    { id: 'items', icon: 'ixmoves' },
    { id: 'gems', icon: 'ixpalette', slot: 'gem', skins: [
      { id: 'gem.classic', art: 'skclassic', value: null },
      { id: 'gem.gold', art: 'skgold', value: 'gold', price: 800 },
      { id: 'gem.obsidian', art: 'skobsidian', value: 'obsidian', price: 800 },
      { id: 'gem.temple', art: 'sktemple', value: 'temple', price: 800 }] },
    { id: 'words', icon: 'ixorb', slot: 'word', skins: [
      { id: 'word.solar', art: 'p3', value: null },
      { id: 'word.rare', art: 'wr_p3', value: 'rare', price: 600 },
      { id: 'word.goldgem', soon: true }] },
    { id: 'trail', icon: 'ixarrow', slot: 'trail', skins: [
      { id: 'trail.gold', art: 'ixarrow', value: null },
      { id: 'trail.jade', art: 'skjade', value: 'jade', price: 400 },
      { id: 'trail.fire', art: 'skfire', value: 'fire', price: 400 }] },
  ];
  // Loja do Templo (16/10, no formato do modelo que ele fez): placa com o título, abas, páginas com setas e,
  // em cada página, 2 ofertas lado a lado (moldura grande com a arte + nome, descrição e botão COMPRAR embaixo).
  // Peças pintadas que já existem: placa (cxplate), moldura (cxcard), seta (navarrow) e o botão do kit (.btn).
  // Quando chegar o kit do Gemini no estilo do modelo, só troca a arte (classes ts-*).
  function openShop(back, startTab) {
    if (!ART.nodeImg('cxcard')) return openShopList(back);
    Sound.play('click');
    let tab = startTab || 'items', page = 0;
    const PER = 1; // 16/10, pedido dele: um item por página, centralizado
    const coin = (n, sz) => '<img class="coin" alt="" src="' + ART.icon('coin', sz) + '">' + n;
    const render = () => {
      const T0 = CODEX_TABS.find((t) => t.id === tab);
      const owns = (s) => s.value == null || save.owned.includes(s.id);
      const inUse = (s) => (save.skins[T0.slot] || null) === s.value;
      const offers = tab === 'items'
        ? SHOP.map((it) => ({ key: it.id, img: itemImg(it, 128), name: T('item.' + it.id), desc: T('item.' + it.id + '.d'),
          note: T('shop.have', { n: save.items[it.id] }), btn: 'buy', price: it.price, it }))
        : T0.skins.map((sk) => ({ key: sk.id, img: sk.art && ART.nodeImg(sk.art), sk,
          name: T('codex.' + sk.id), desc: T(sk.soon ? 'codex.soon.d' : 'codex.' + tab + '.d'),
          note: sk.soon ? T('codex.soon') : inUse(sk) ? T('codex.inuse') : owns(sk) ? T('codex.owned') : '',
          btn: sk.soon || inUse(sk) ? null : owns(sk) ? 'use' : 'buy', price: sk.price }));
      const pages = Math.max(1, Math.ceil(offers.length / PER));
      page = Math.min(page, pages - 1);
      const shown = offers.slice(page * PER, page * PER + PER);
      const arrow = ART.nodeImg('navarrow');
      // 25/10: X sempre à mão no canto; abas só com ícone (o nome da aba ativa vai na linha da página); sem nota de rodapé
      const card = openModal(
        '<button type="button" class="card-x" id="mX" aria-label="' + T('close') + '">✕</button>' +
        '<div class="ts-title" style="background-image:url(' + ART.nodeImg('cxplate') + ')"><span>' + T('shop.title') + '</span></div>' +
        '<div class="wallet"><img class="coin" alt="" src="' + ART.icon('coin', 96) + '"><b>' + save.coins.toLocaleString() + '</b></div>' +
        '<div class="ts-tabs">' + CODEX_TABS.map((t) => '<button type="button" class="ts-tab' + (t.id === tab ? ' on' : '') + '" data-tab="' + t.id + '" aria-label="' + T('shop.tab.' + t.id) + '" aria-pressed="' + (t.id === tab) + '"><img alt="" src="' + ART.nodeImg(t.icon) + '"></button>').join('') + '</div>' +
        '<div class="ts-pager">' + (pages > 1 ? '<button type="button" class="ts-prev"' + (page === 0 ? ' disabled' : '') + ' aria-label="<" style="background-image:url(' + arrow + ')"></button>' : '') +
          '<span><b>' + T('shop.tab.' + tab) + '</b>' + (pages > 1 ? ' · ' + (page + 1) + '/' + pages : '') + '</span>' +
          (pages > 1 ? '<button type="button" class="ts-next"' + (page >= pages - 1 ? ' disabled' : '') + ' aria-label=">" style="background-image:url(' + arrow + ')"></button>' : '') + '</div>' +
        '<div class="ts-offers">' + shown.map((o) =>
          '<div class="ts-offer' + (o.sk && o.sk.soon ? ' soon' : '') + '">' +
            '<div class="ts-frame" style="background-image:url(' + ART.nodeImg('cxcard') + ')">' + (o.img ? '<img alt="" src="' + o.img + '">' : '<i>?</i>') + (o.it && save.items[o.it.id] ? '<em>×' + save.items[o.it.id] + '</em>' : '') + '</div>' +
            '<div class="ts-info"><b>' + o.name + '</b><span>' + o.desc + '</span>' + (o.note ? '<small>' + o.note + '</small>' : '') +
              (o.btn === 'buy' ? '<button type="button" class="btn small ts-buy" data-k="' + o.key + '" aria-label="' + T('shop.buy') + ' ' + o.price + '"' + (save.coins < o.price ? ' disabled' : '') + '>' + coin(o.price, 48) + '</button>' // 16/10: só o preço (pedido dele)
                : o.btn === 'use' ? '<button type="button" class="btn dark small ts-use" data-k="' + o.key + '">' + T('codex.use') + '</button>' : '') +
            '</div></div>').join('') + '</div>' +
        '<div class="btns"><button class="btn dark small" id="mBack" type="button">' + T('close') + '</button></div>');
      card.classList.add('tshop');
      card.querySelector('#mX').onclick = () => card.querySelector('#mBack').click();
      card.querySelectorAll('.ts-tab').forEach((b) => { b.onclick = () => { Sound.play('click'); tab = b.dataset.tab; page = 0; render(); }; });
      const prev = card.querySelector('.ts-prev'), next = card.querySelector('.ts-next');
      if (prev) prev.onclick = () => { Sound.play('click'); page--; render(); };
      if (next) next.onclick = () => { Sound.play('click'); page++; render(); };
      const find = (k) => offers.find((o) => o.key === k);
      card.querySelectorAll('.ts-buy').forEach((b) => { b.onclick = () => {
        const o = find(b.dataset.k); if (!o || save.coins < o.price) return;
        save.coins -= o.price;
        if (o.it) save.items[o.it.id]++;
        else { save.owned.push(o.sk.id); save.skins[T0.slot] = o.sk.value; applySkins(); }
        persist(); Sound.play('chest'); render(); paintWallet();
      }; });
      card.querySelectorAll('.ts-use').forEach((b) => { b.onclick = () => {
        const o = find(b.dataset.k); if (!o) return;
        save.skins[T0.slot] = o.sk.value; persist(); applySkins(); Sound.play('create'); render();
      }; });
      card.querySelector('#mBack').onclick = () => { Sound.play('click'); closeModal(); if (back) back(); };
    };
    render();
    // prévias das skins vêm no pacote extra: se a loja abriu antes dele chegar, redesenha quando chegar
    if (!EXTRA.done) extraReady().then(() => { if (modalOpen() && $('modalCard').classList.contains('tshop')) render(); });
  }
  // loja antiga em lista (reserva se a arte do Códice não carregar)
  function openShopList(back) {
    Sound.play('click');
    const render = () => {
      const card = openModal(
        '<div class="eyebrow">' + T('shop.eyebrow') + '</div>' +
        '<h2 class="metal">' + T('shop.title') + '</h2><div class="orn"><i></i></div>' +
        '<div class="wallet"><img class="coin" alt="" src="' + ART.icon('coin', 96) + '"><b>' + save.coins.toLocaleString() + '</b></div>' +
        '<div class="shop-list">' + SHOP.map((it) =>
          '<div class="shop-item"><img alt="" src="' + itemImg(it, 96) + '"><div><b>' + T('item.' + it.id) + '</b><span>' + T('item.' + it.id + '.d') + '</span><small>' + T('shop.have', { n: save.items[it.id] }) + '</small></div>' +
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
  let hammerMode = false, hammerFx = null;
  // desenha a marretada: 0..0.32s ergue e desce girando até a joia, depois fica 0.25s no impacto e some
  function drawHammerFx() {
    if (!hammerFx) return;
    const q = now - hammerFx.t0, im = nodeImgObj('hhamon') || nodeImgObj('hham');
    if (q > 0.6 || !im) { if (q > 0.6) hammerFx = null; return; }
    const down = Math.min(1, q / 0.32), e = down * down * down;
    const ang = -1.1 + e * 1.5; // ergue pra trás e bate pra frente
    const w = cs * 1.7, h = w * im.naturalHeight / im.naturalWidth;
    const px = cellX(hammerFx.x) + cs * 0.55, py = cellY(hammerFx.y) + cs * 0.6; // pivô = mão no cabo
    ctx.save(); ctx.globalAlpha = q < 0.32 ? 1 : Math.max(0, 1 - (q - 0.32) / 0.28);
    ctx.translate(px, py); ctx.rotate(ang);
    ctx.drawImage(im, -w * 0.78, -h * 0.92, w, h); // cabeça do martelo em cima à esquerda da imagem
    ctx.restore();
  }
  function updateHammerBtn() {
    const b = $('btnHammer'); if (!b) return;
    b.hidden = scene !== 'play' || (level && (level.daily || level.weekly || level.hard)) || !(save.items.hammer > 0);
    b.classList.toggle('on', hammerMode);
    const n = save.items.hammer || 0, hc = $('hammerCount');
    if (b.classList.contains('painted')) {
      $('hammerIc').src = ART.nodeImg(hammerMode ? 'hhamon' : 'hham');
      hc.innerHTML = digitsHTML(n); hc.classList.add('digits');
    } else hc.textContent = '×' + n;
  }
  $('btnHammer').onclick = () => { if (busy || scene !== 'play' || (level && level.hard) || !(save.items.hammer > 0)) return; hammerMode = !hammerMode; Sound.play('click'); updateHammerBtn(); };
  async function useHammer(c) {
    hammerMode = false; save.items.hammer--; persist(); updateHammerBtn();
    busy = true; praiseLevel = 0;
    // marretada: o martelo aceso ergue, desce na joia e racha (o golpe acontece no impacto)
    hammerFx = { x: c[0], y: c[1], t0: now };
    await wait(0.32);
    Sound.play('rock'); Sound.play('glass', 2); addShake(0.6); buzz([50]);
    ring(c[0], c[1], 'rgba(255,215,110,0.95)', 1.5); dust(c[0], c[1]);
    await play(LR.resolve(state, { hits: [{ x: c[0], y: c[1], src: 'blast' }] }));
    await afterMove();
  }

  // ---------- Jogada do Dia (18/10) ----------
  // Tabuleiro fixo pela data (semente = AAAAMMDD) com 2 joias especiais, 1 movimento só. O jogo calcula a melhor jogada possível
  // (testa todas) e compara: 100% = achou. Dá estrelas, 20 moedas na 1ª vez do dia e um texto pra compartilhar (TikTok/WhatsApp).
  const todayKey = () => { const d = new Date(); return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate(); };
  const dailyCache = {};
  function dailyState(L) {
    const s = LR.createState(L, L.seed);
    const plain = [];
    for (let y = 0; y < s.H; y++) for (let x = 0; x < s.W; x++) { const p = s.grid[y][x]; if (p && p.kind === 'gem' && !p.special) plain.push(p); }
    const kinds = ['lineH', 'lineV', 'barrel', 'idol'];
    for (let k = 0; k < 2 && plain.length; k++) {
      const p = plain.splice(Math.floor(LR.rand(s) * plain.length), 1)[0], sp = kinds[Math.floor(LR.rand(s) * kinds.length)];
      p.special = sp; if (sp === 'idol') p.color = null;
    }
    if (!LR.findMove(s)) LR.shuffle(s);
    return s;
  }
  function dailyBest(L) {
    const s0 = dailyState(L); let best = 0;
    for (const m of LR.allMoves(s0)) {
      const c = LR.cloneState(s0), st = LR.doSwap(c, m[0], m[1]);
      if (!st) continue;
      LR.runAll(LR.resolve(c, st));
      // 22/10: o jogo roda a corrida do tesouro depois da jogada (especiais que sobraram explodem); sem isso a "melhor" ficava abaixo do real
      if (LR.isWon(c)) LR.runAll(LR.treasureRush(c));
      best = Math.max(best, c.score);
    }
    return Math.max(best, 1);
  }
  function dailyLevel() {
    const date = todayKey();
    if (dailyCache.date === date) return dailyCache.L;
    // dentre 12 tabuleiros da data (todo mundo gera os mesmos), fica o que tem a jogada mais valiosa: o desafio precisa ter uma jogada "uau"
    let L = null;
    for (let k = 0; k < 12; k++) {
      const c = { id: 'daily', daily: true, date, seed: (date * 7 + 13 + k * 977) >>> 0, moves: 1, colors: 6, goals: [{ type: 'score', target: 1 }], layout: Array(8).fill('........'), stars: [1, 2, 3] };
      c.best = dailyBest(c);
      if (!L || c.best > L.best) L = c;
    }
    L.stars = [Math.round(L.best * 0.5), Math.round(L.best * 0.8), L.best];
    dailyCache.date = date; dailyCache.L = L;
    return L;
  }
  function showDaily() {
    Ads.gameplay(false);
    finishRun('win', { value: state.score });
    const best = level.best, sc = state.score, p = Math.min(100, Math.round((100 * sc) / best));
    const first = !save.daily || save.daily.date !== level.date;
    if (first) { save.coins += 20; save.daily = { date: level.date, best: sc, tries: 1 }; }
    else { save.daily.best = Math.max(save.daily.best, sc); save.daily.tries++; }
    persist();
    Sound.play('win'); buzz([30, 60, 30]);
    const n = (v) => v.toLocaleString(I18N.lang === 'pt' ? 'pt-BR' : 'en-US');
    const dd = String(level.date % 100).padStart(2, '0') + '/' + String(Math.floor(level.date / 100) % 100).padStart(2, '0');
    const msg = p >= 100 ? 'daily.perfect' : p >= 80 ? 'daily.close' : 'daily.low';
    const stars = p >= 100 ? 3 : p >= 80 ? 2 : 1;
    const card = openModal(
      '<div class="eyebrow">' + dd + '</div><h2 class="metal">' + T('daily.title') + '</h2><div class="orn"><i></i></div>' +
      '<div class="daily-score">' + n(sc) + '</div>' +
      '<div class="daily-stars">' + '★'.repeat(stars) + '<span>' + '★'.repeat(3 - stars) + '</span></div>' +
      '<p>' + T(msg) + '</p><div class="moves-line">' + T('daily.pct', { p }) + ' · ' + T('daily.best', { n: n(best) }) + '</div>' +
      (first ? '<div class="moves-line streak-up">' + T('daily.coins', { n: 20 }) + '</div>' : '') +
      '<div class="btns"><button class="btn" id="mShare" type="button">' + T('daily.shareBtn') + '</button>' +
      '<button class="btn dark small" id="mRetry" type="button">' + T('daily.retry') + '</button>' +
      '<button class="btn dark small" id="mMap" type="button">' + T('menu.back') + '</button></div>');
    card.querySelector('#mShare').onclick = async () => {
      Sound.play('click');
      const txt = T('daily.share', { d: dd, n: n(sc), p });
      try {
        await ShareCard.share({
          kind: 'daily', score: n(sc), title: T('daily.title'), subtitle: dd + ' · ' + T('daily.pct', { p }),
          scoreLabel: T('records.points'), call: T('records.shareCall'), text: txt,
        });
        track('share_result', { mode: 'daily', result: 'ok', score: sc, value: p });
      } catch (e) { track('share_result', { mode: 'daily', result: 'cancel' }); }
    };
    card.querySelector('#mRetry').onclick = () => { Sound.play('click'); closeModal(); wipe(() => startLevel('daily')); };
    card.querySelector('#mMap').onclick = () => { Sound.play('click'); closeModal(); wipe(openMenu); };
  }

  // ---------- Recorde semanal ----------
  // Um tabuleiro e uma semente por semana, sempre 20 jogadas. Itens, martelo, anúncio de +5 e Trilha ficam fora;
  // skins continuam porque são apenas visuais. O backend usa o mesmo week id e mantém só o melhor placar de cada jogador.
  const weeklyCache = {};
  let weeklyReplay = [];
  const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function weeklySeed(key) {
    let h = 2166136261;
    for (let i = 0; i < key.length; i++) { h ^= key.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function weeklyLevel() {
    const week = Records.week();
    if (weeklyCache.week === week) return weeklyCache.L;
    const L = {
      id: 'weekly', weekly: true, week, seed: weeklySeed('lost-relics:' + week), moves: 20, colors: 6,
      goals: [{ type: 'score', target: 999999999 }], layout: Array(8).fill('........'), stars: [8000, 16000, 24000],
    };
    weeklyCache.week = week; weeklyCache.L = L;
    return L;
  }
  const weeklyDate = (key) => { const p = key.split('-'); return p[2] + '/' + p[1]; };
  function weeklyRowsHTML(rows, emptyKey) {
    if (!rows || !rows.length) return '<div class="weekly-status">' + T(emptyKey || 'weekly.empty') + '</div>';
    const me = Records.getName().toLocaleLowerCase();
    return '<div class="weekly-board">' + rows.slice(0, 20).map((r, i) =>
      '<div class="weekly-row' + (r.me || String(r.name || '').toLocaleLowerCase() === me ? ' me' : '') + '"><i>' + (i + 1) + '</i><b>' + esc(r.name) + '</b><strong>' + (+r.score || 0).toLocaleString(I18N.lang === 'pt' ? 'pt-BR' : 'en-US') + '</strong></div>'
    ).join('') + '</div>';
  }
  function loadWeeklyRows(card, promise) {
    const box = card.querySelector('.weekly-list');
    promise.then((rows) => { if (box && box.isConnected) box.innerHTML = weeklyRowsHTML(rows); }).catch(() => { if (box && box.isConnected) box.innerHTML = weeklyRowsHTML([]); });
  }
  // fase Difícil: duas abas, Semanal (reseta toda segunda) e Total (recordista de todos os tempos)
  function loadLevelBoards(card, id, weeklyPromise) {
    const box = card.querySelector('.weekly-list');
    if (!box) return;
    const rows = { week: null, all: null };
    let tab = 'week';
    const fmt = (n) => (+n || 0).toLocaleString(I18N.lang === 'pt' ? 'pt-BR' : 'en-US');
    const render = () => {
      if (!box.isConnected) return;
      const r = rows[tab];
      const holder = tab === 'all' && r && r.length ? '<div class="rank-holder">' + T('records.holder') + ': <b>' + esc(r[0].name) + '</b> · ' + fmt(r[0].score) + '</div>' : '';
      box.innerHTML = '<div class="rank-tabs"><button type="button" data-t="week"' + (tab === 'week' ? ' class="on"' : '') + '>' + T('records.tabWeek') + '</button>' +
        '<button type="button" data-t="all"' + (tab === 'all' ? ' class="on"' : '') + '>' + T('records.tabAll') + '</button></div>' +
        (r ? holder + weeklyRowsHTML(r, tab === 'all' ? 'records.allEmpty' : 'weekly.empty') : '<div class="weekly-status">' + T('weekly.loading') + '</div>');
      box.querySelectorAll('.rank-tabs button').forEach((b) => { b.onclick = () => { if (tab === b.dataset.t) return; Sound.play('click'); tab = b.dataset.t; render(); }; });
    };
    render();
    // o total só é buscado depois do semanal, para já incluir o placar que acabou de ser enviado
    weeklyPromise.catch(() => []).then((r) => { rows.week = r || []; render(); return Records.listLevelAll(id); })
      .catch(() => []).then((r) => { rows.all = r || []; render(); });
  }
  function askWeeklyName(back, next) {
    const card = openModal(
      '<div class="eyebrow">' + T('weekly.btn') + '</div><h2 class="metal">' + T('weekly.name') + '</h2><div class="orn"><i></i></div>' +
      '<input id="weeklyName" class="weekly-name" maxlength="18" autocomplete="nickname" placeholder="' + T('weekly.placeholder') + '" value="' + esc(Records.getName()) + '">' +
      '<p class="weekly-rules">' + T('weekly.rules') + '</p><div class="btns"><button class="btn" id="mSaveName" type="button">' + T('weekly.play') + '</button>' +
      '<button class="btn dark small" id="mBack" type="button">' + T('menu.back') + '</button></div>');
    const input = card.querySelector('#weeklyName');
    const go = () => {
      // mesma regra do servidor: senão o jogador acha que está no ranking e o envio é recusado
      if (!Records.validName(input.value)) {
        let err = card.querySelector('.name-error');
        if (!err) { err = document.createElement('p'); err.className = 'name-error'; input.after(err); }
        err.textContent = T('rank.nameRule'); input.focus(); return;
      }
      Records.setName(input.value);
      Sound.play('click'); closeModal();
      if (next) next(); else wipe(() => startLevel('weekly'));
    };
    card.querySelector('#mSaveName').onclick = go;
    input.onkeydown = (e) => { if (e.key === 'Enter') go(); };
    card.querySelector('#mBack').onclick = () => { Sound.play('click'); closeModal(); if (back) back(); };
    setTimeout(() => input.focus(), 50);
  }
  // Legacy weekly challenge is preserved for data/API compatibility, but is no longer linked from the menu.
  function openLegacyWeeklyHub() {
    if (!Records.getName()) return askWeeklyName(openMenu);
    const L = weeklyLevel(), local = !Records.online;
    const card = openModal(
      '<div class="eyebrow">' + T('weekly.week', { d: weeklyDate(L.week) }) + '</div><h2 class="metal">' + T('weekly.title') + '</h2><div class="orn"><i></i></div>' +
      '<p class="weekly-rules">' + T('weekly.rules') + '</p><div class="weekly-list"><div class="weekly-status">' + T('weekly.loading') + '</div></div>' +
      '<div class="weekly-status">' + T(local ? 'weekly.local' : 'weekly.online') + '</div>' +
      '<div class="btns"><button class="btn" id="mWeeklyPlay" type="button">' + T('weekly.play') + '</button>' +
      '<button class="btn dark small" id="mWeeklyName" type="button">' + T('weekly.change') + '</button>' +
      '<button class="btn dark small" id="mBack" type="button">' + T('menu.back') + '</button></div>');
    loadWeeklyRows(card, Records.list(L.week));
    card.querySelector('#mWeeklyPlay').onclick = () => { Sound.play('click'); closeModal(); wipe(() => startLevel('weekly')); };
    card.querySelector('#mWeeklyName').onclick = () => { Sound.play('click'); closeModal(); askWeeklyName(openLegacyWeeklyHub); };
    card.querySelector('#mBack').onclick = () => { Sound.play('click'); closeModal(); };
  }
  function openRecordsHub() {
    const week = Records.week(), scores = hardWeeklyScores();
    const ids = LEVELS.map((L) => L.id).filter((id) => !!save.stars[id]);
    // destaques sorteados sempre entre as fases 1–21: os mesmos 3 para todos os jogadores na semana
    const featured = Records.featured(LEVELS.map((L) => L.id).filter((id) => id <= 21), week, 3);
    const ordered = featured.concat(ids.filter((id) => !featured.includes(id)));
    // 25/10: placa com o título, faixa da temporada e as fases (destaque = borda verde + ★, sem texto)
    const rows = ordered.map((id) => {
      const locked = !save.stars[id];
      return '<button type="button" class="record-level' + (featured.includes(id) ? ' featured' : '') + (locked ? ' locked' : '') + '" data-level="' + id + '"' + (locked ? ' disabled' : '') +
        ' aria-label="' + T('level') + ' ' + id + (featured.includes(id) ? ' · ' + T('records.featured') : '') + '"><span>' + T('level') + ' ' + id + '</span><strong>' +
        (locked ? T('records.lockedFeat', { n: id }) : scores[id] ? nf(scores[id]) : '—') + '</strong></button>';
    }).join('');
    track('leaderboard_open', { mode: 'hard', value: ids.length });
    const card = openModal(
      '<h2 class="plaque-title">' + T('records.short') + '</h2>' +
      '<button type="button" class="season-strip" id="mSeason"><span class="weekly-status">' + T('season.loading') + '</span></button>' +
      (ids.length ? '' : '<p class="weekly-rules">' + T('records.empty') + '</p>') + '<div class="records-levels">' + rows + '</div>' +
      '<div class="btns"><button class="btn dark small" id="mWeeklyName" type="button">' + T('weekly.change') + '</button>' +
      '<button class="btn dark small" id="mBack" type="button">' + T('menu.back') + '</button></div>');
    card.classList.add('records-hub');
    card.querySelectorAll('.record-level:not(.locked)').forEach((button) => {
      button.onclick = () => {
        const id = +button.dataset.level;
        Sound.play('click'); closeModal(); wipe(() => { openMap(); openPre(id, true); });
      };
    });
    card.querySelector('#mWeeklyName').onclick = () => { Sound.play('click'); closeModal(); askWeeklyName(openRecordsHub, openRecordsHub); };
    card.querySelector('#mBack').onclick = () => { Sound.play('click'); closeModal(); };
    const strip = card.querySelector('#mSeason');
    strip.onclick = () => { Sound.play('click'); closeModal(); openSeason(); };
    Records.season().then((s) => { if (strip.isConnected) strip.innerHTML = seasonStripHTML(s); }).catch(() => {});
  }

  // ---------- temporada (3 meses) ----------
  const nf = (n) => (+n || 0).toLocaleString(I18N.lang === 'pt' ? 'pt-BR' : 'en-US');
  const tierHTML = (t) => (t ? '<span class="tier tier-' + t + '">' + T('tier.' + t) + '</span>' : '');
  function seasonName(key, withYear) {
    const [from, to] = Records.seasonRange(key), loc = I18N.lang === 'pt' ? 'pt-BR' : 'en-US';
    const end = new Date(to + 'T00:00:00Z'); end.setUTCDate(end.getUTCDate() - 1);
    const m = (d) => d.toLocaleDateString(loc, { month: 'short', timeZone: 'UTC' }).replace('.', '');
    return m(new Date(from + 'T00:00:00Z')) + '–' + m(end) + (withYear === false ? '' : ' ' + key.slice(0, 4));
  }
  const seasonDaysLeft = (s) => Math.max(0, Math.ceil((Date.parse(s.to + 'T00:00:00Z') - Date.now()) / 86400000));
  // inside = dentro da própria tela da temporada (o nome já está no cabeçalho, e a faixa não é botão)
  function seasonStripHTML(s, inside) {
    const head = inside ? '' : '<span class="season-name">' + T('season.title') + ' · ' + seasonName(s.season, false) + ' ›</span>';
    if (!s.me) return head + '<small>' + T('season.none') + '</small>';
    return head + '<span class="season-me">' + tierHTML(s.me.tier) + '<b>' + T('season.pts', { n: nf(s.me.points) }) + '</b>' +
      (s.me.pos ? '<i>' + T('season.pos', { p: s.me.pos, n: s.players }) + '</i>' : '') + '</span>';
  }
  function openSeason() {
    const card = openModal(
      '<h2 class="plaque-title">' + T('season.title') + '</h2>' +
      '<div class="season-head"><b class="season-title">…</b><small class="season-left"></small></div>' +
      '<div class="season-body"><div class="weekly-status">' + T('season.loading') + '</div></div>' +
      '<div class="btns"><button class="btn dark small" id="mBack" type="button">' + T('menu.back') + '</button></div>');
    card.classList.add('season-card');
    card.querySelector('#mBack').onclick = () => { Sound.play('click'); closeModal(); openRecordsHub(); };
    track('season_open', { mode: 'hard' });
    Promise.all([Records.season(), Records.seasons()]).then(([s, past]) => {
      if (!card.isConnected) return;
      card.querySelector('.season-title').textContent = seasonName(s.season);
      card.querySelector('.season-left').textContent = T('season.ends', { n: seasonDaysLeft(s) });
      const me = Records.getName().toLocaleLowerCase();
      const list = s.rows.length ? '<div class="weekly-board">' + s.rows.map((r, i) =>
        '<div class="weekly-row season-row' + (r.me || String(r.name || '').toLocaleLowerCase() === me ? ' me' : '') + '"><i>' + (i + 1) + '</i><b>' + esc(r.name) + '</b>' + tierHTML(r.tier) + '<strong>' + nf(r.points) + '</strong></div>').join('') + '</div>'
        : '<div class="weekly-status">' + T('season.none') + '</div>';
      const champs = past.length ? past.map((p) => '<div class="champ"><span>' + seasonName(p.season) + '</span>' +
        p.top.map((r, i) => '<b class="podium p' + (i + 1) + '">' + (i + 1) + 'º ' + esc(r.name) + ' · ' + nf(r.points) + '</b>').join('') + '</div>').join('')
        : '<div class="weekly-status">' + T('season.noChamps') + '</div>';
      // sem servidor só aparece a própria linha (a liga depende dos outros); nada de aviso técnico na tela
      card.querySelector('.season-body').innerHTML =
        (s.me ? '<div class="season-strip static">' + seasonStripHTML(s, true) + '</div>' : '') + list +
        '<p class="season-rule">' + T('season.rules') + '</p>' +
        '<div class="champs-title">' + T('season.champs') + '</div>' + champs;
    });
  }
  function showWeekly() {
    Ads.gameplay(false);
    finishRun('win', { value: state.score });
    const sc = Math.max(0, Math.floor(state.score)), L = level;
    Sound.play('win'); buzz([30, 60, 30, 60]);
    const card = openModal(
      '<div class="eyebrow">' + T('weekly.week', { d: weeklyDate(L.week) }) + '</div><h2 class="metal">' + T('weekly.title') + '</h2><div class="orn"><i></i></div>' +
      '<div class="daily-score">' + sc.toLocaleString(I18N.lang === 'pt' ? 'pt-BR' : 'en-US') + '</div>' +
      '<div class="moves-line">' + T('weekly.score', { n: sc.toLocaleString(I18N.lang === 'pt' ? 'pt-BR' : 'en-US') }) + '</div>' +
      '<div class="weekly-list"><div class="weekly-status">' + T('weekly.loading') + '</div></div>' +
      '<div class="btns"><button class="btn" id="mRetry" type="button">' + T('weekly.retry') + '</button>' +
      '<button class="btn dark small" id="mMap" type="button">' + T('menu.back') + '</button></div>');
    loadWeeklyRows(card, Records.submit(sc, { week: L.week, seed: L.seed, moves: 20, replay: weeklyReplay.slice() }));
    card.querySelector('#mRetry').onclick = () => { Sound.play('click'); closeModal(); wipe(() => startLevel('weekly')); };
    card.querySelector('#mMap').onclick = () => { Sound.play('click'); closeModal(); wipe(openMenu); };
  }

  // ---------- menu ----------
  function paintMenu() {
    document.querySelectorAll('[data-t]').forEach((el) => { el.textContent = T(el.dataset.t); });
    $('btnPlay').textContent = save.unlocked > 1 ? T('menu.continue') : T('menu.play');
    $('btnWeekly').textContent = T('weekly.btn');
    $('btnDaily').textContent = (save.daily && save.daily.date === todayKey() ? '✓ ' : '') + T('daily.btn');
    $('btnProgress').textContent = T('save.btn');
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
  async function openProgress() {
    let code = '';
    try { code = await PortableSave.exportCode(); } catch (e) { showPraise(T('save.invalid'), 'info'); return; }
    const card = openModal(
      '<h2 class="metal">' + T('save.title') + '</h2><div class="orn"><i></i></div>' +
      '<p class="save-summary">' + T('save.info') + '</p>' +
      '<textarea id="saveCode" class="save-code" spellcheck="false" autocomplete="off" aria-label="' + T('save.title') + '"></textarea>' +
      '<div class="btns"><button class="btn" id="mCopySave" type="button">' + T('save.copy') + '</button>' +
      '<button class="btn dark" id="mImportSave" type="button">' + T('save.import') + '</button>' +
      '<button class="btn dark small" id="mBack" type="button">' + T('menu.back') + '</button></div>');
    const box = card.querySelector('#saveCode'); box.value = code;
    card.querySelector('#mCopySave').onclick = async () => {
      Sound.play('click');
      try { await navigator.clipboard.writeText(box.value); }
      catch (e) { box.select(); document.execCommand('copy'); }
      showPraise(T('daily.copied'), 'info'); track('save_export', { result: 'copied' });
    };
    card.querySelector('#mImportSave').onclick = async () => {
      Sound.play('click');
      try {
        const checked = await PortableSave.inspect(box.value), s = checked.summary;
        if (!window.confirm(T('save.confirm', { n: s.unlocked, s: s.stars, c: s.coins }))) return;
        await PortableSave.importCode(box.value);
        track('save_import', { result: 'ok', level: s.unlocked, value: s.stars });
        window.alert(T('save.ok')); location.reload();
      } catch (e) { showPraise(T('save.invalid'), 'info'); track('save_import', { result: 'invalid' }); }
    };
    card.querySelector('#mBack').onclick = () => { Sound.play('click'); closeModal(); };
  }
  $('btnPlay').onclick = () => {
    Sound.init(); Sound.play('click');
    wipe(() => { openMap(); if (save.unlocked === 1 && !save.stars[1]) openPre(1); });
  };
  $('btnDaily').onclick = () => { Sound.init(); Sound.play('click'); wipe(() => startLevel('daily')); };
  $('btnWeekly').onclick = () => { Sound.init(); Sound.play('click'); openRecordsHub(); };
  $('btnProgress').onclick = () => { Sound.init(); Sound.play('click'); openProgress(); };
  $('btnSfx').onclick = () => { Sound.init(); Sound.setSfx(!Sound.sfx); paintMenu(); Sound.play('click'); };
  $('btnMusic').onclick = () => { Sound.init(); Sound.setMusic(!Sound.music); paintMenu(); };
  $('btnLang').onclick = () => { I18N.toggle(); paintMenu(); Sound.play('click'); };
  $('btnMapBack').onclick = () => { Sound.play('click'); wipe(openMenu); };

  // ---------- mapa ----------
  // as setas do mapa só aparecem na tela do mapa
  const hideMapNav = () => { const n = $('mapNav'); if (n) n.hidden = true; };
  function openMap() {
    Ads.gameplay(false);
    scene = 'map'; state = null; updateHammerBtn();
    $('hud').hidden = true; $('screen-menu').hidden = true; $('screen-map').hidden = false;
    paintMenu();
    buildMap();
  }
  // ---------- pacote extra (15/10) ----------
  // A abertura só baixa e monta o essencial (joias, tabuleiro, interface). Chefes, bichos, barra de vida e o mapa 3D
  // vêm no art-extra.js, baixado depois que o menu aparece; o mapa entra assim que o arquivo chega e os bichos são
  // montados um por vez. Fase com chefe/bicho aberta antes disso espera o pacote terminar.
  const EXTRA = { done: false, wait: [] };
  const extraReady = () => (EXTRA.done ? Promise.resolve() : new Promise((r) => EXTRA.wait.push(r)));
  function loadExtra() {
    const finish = () => { EXTRA.done = true; EXTRA.wait.splice(0).forEach((r) => r()); };
    const cacheExtra = (url) => {
      if (!window.caches || !url) return;
      const ready = navigator.serviceWorker && navigator.serviceWorker.ready ? navigator.serviceWorker.ready.catch(() => null) : Promise.resolve();
      ready.then(() => caches.keys()).then((keys) => {
        const key = keys.find((k) => k.indexOf('lostrelics-') === 0);
        if (!key) return;
        return caches.open(key).then((cache) => cache.match(url).then((hit) => hit || fetch(url).then((res) => {
          if (res.ok) return cache.put(url, res.clone());
        })));
      }).catch(() => {});
    };
    const go = () => {
      const E = window.ART_EXTRA, D = window.ART_DATA;
      if (!E || !D) return finish();
      D.map3 = E.map3; D.mapDepth = E.mapDepth; D.map3b = E.map3b; D.mapDepthB = E.mapDepthB; D.map3c = E.map3c; D.mapDepthC = E.mapDepthC; D.map3a = E.map3a; D.mapDepthA = E.mapDepthA;
      if (scene === 'map' && !MAP3.gl) buildMap();
      ART.loadExtra(E, finish);
    };
    if (window.ART_EXTRA) return go();
    const sc = document.createElement('script'); sc.src = 'art-extra.js' + (window.LR_VER && LR_VER['art-extra.js'] ? '?v=' + LR_VER['art-extra.js'] : ''); sc.onload = () => { go(); cacheExtra(sc.src); }; sc.onerror = finish;
    document.head.appendChild(sc);
  }

  // ---------- mapa 3D falso (15/10) ----------
  // Maquete pintada (ampliada 4x) + mapa de profundidade: um shader desloca cada ponto conforme a distância,
  // então ao rolar a cidade ganha relevo. As fases recebem o mesmo deslocamento (amostram a profundidade na CPU).
  const MAP3 = { gl: null, cv: null, U: null, ready: false, depth: null, raf: 0, cam: null, tilt: [0, 0], lastTop: 0, lastT: 0, nodes: [] };
  function mapGLInit() {
    const D = window.ART_DATA || {};
    if (MAP3.gl || !D.map3 || !D.mapDepth) return !!MAP3.gl;
    const cv = document.createElement('canvas'); cv.id = 'mapGL';
    const gl = cv.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return false;
    const vs = 'attribute vec2 p; varying vec2 v; void main(){ v = p * 0.5 + 0.5; v.y = 1.0 - v.y; gl_Position = vec4(p, 0.0, 1.0); }';
    const fs = 'precision mediump float; varying vec2 v; uniform sampler2D img, dep; uniform vec2 cam; uniform float top, span, left, spanX, k;' +
      'void main(){ vec2 uv = vec2(left + v.x * spanX, top + v.y * span); vec2 t = uv;' +
      ' for (int i = 0; i < 2; i++) { float d = texture2D(dep, t).r; t = uv + cam * k * (d - 0.5); }' +
      ' vec3 c = texture2D(img, t).rgb; float d = texture2D(dep, t).r; c *= 0.86 + 0.22 * d; gl_FragColor = vec4(c, 1.0); }';
    const sh = (ty, s) => { const o = gl.createShader(ty); gl.shaderSource(o, s); gl.compileShader(o); return o; };
    const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return false;
    gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    MAP3.U = {}; for (const u of ['cam', 'top', 'span', 'left', 'spanX', 'k']) MAP3.U[u] = gl.getUniformLocation(pr, u);
    gl.uniform1i(gl.getUniformLocation(pr, 'img'), 0); gl.uniform1i(gl.getUniformLocation(pr, 'dep'), 1);
    // texturas do mundo (16/10: cada mundo tem a sua maquete + profundidade; trocar de mundo recarrega as duas)
    const texs = [gl.createTexture(), gl.createTexture()];
    let loaded = 0, ticket = 0;
    const tex = (src, unit, my, onImg) => { const im = new Image(); im.onload = () => {
      if (my !== ticket) return; // chegou atrasada de outro mundo
      gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, texs[unit]);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im);
      for (const [p, v] of [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]]) gl.texParameteri(gl.TEXTURE_2D, p, v);
      if (onImg) onImg(im);
      if (++loaded === 2) MAP3.ready = true;
    }; im.src = src; };
    MAP3.setWorld = (W) => {
      if (MAP3.texWorld === W) return;
      MAP3.texWorld = W; MAP3.ready = false; loaded = 0; const my = ++ticket;
      tex(D[W.map], 0, my);
      tex(D[W.depth], 1, my, (im) => { const c = document.createElement('canvas'); c.width = 572; c.height = 1024; const x = c.getContext('2d'); x.drawImage(im, 0, 0, 572, 1024); MAP3.depth = x.getImageData(0, 0, 572, 1024).data; });
    };
    MAP3.gl = gl; MAP3.cv = cv;
    $('screen-map').insertBefore(cv, $('mapScroll'));
    return true;
  }
  const mapDepthAt = (x, y) => MAP3.depth ? MAP3.depth[(Math.max(0, Math.min(1023, y | 0)) * 572 + Math.max(0, Math.min(571, x | 0))) * 4] / 255 : 0.5;
  function mapGLFrame(t) {
    MAP3.raf = 0;
    if (scene !== 'map' || !MAP3.cam) return;
    const { gl, U, cam } = MAP3, V = MAP3.view;
    const dt = Math.min(0.05, MAP3.lastT ? (t - MAP3.lastT) / 1000 : 0.016); MAP3.lastT = t;
    // inclinação: velocidade da rolagem + balanço lento (a maquete "respira" mesmo parada)
    // rolagem do próprio jogo (arrasto + inércia + deslize até um alvo), no mesmo quadro do desenho: sem descompasso
    // rolagem nativa (16/10): o dedo rola o próprio celular; aqui só lemos a posição e desenhamos tudo no mesmo quadro
    if (V && V.native) V.top = V.el.scrollTop;
    else if (V && !V.drag) {
      if (V.target != null) { V.top += (V.target - V.top) * Math.min(1, dt * 6); if (Math.abs(V.target - V.top) < 0.5) { V.top = V.target; V.target = null; } }
      else if (Math.abs(V.vel) > 8) { V.top += V.vel * dt; V.vel *= Math.pow(0.06, dt); } else V.vel = 0;
    }
    if (V) { V.top = Math.max(0, Math.min(V.max, V.top)); if (V.top === 0 || V.top === V.max) V.vel = 0; V.frame(); }
    const top = V ? V.top : 0, vy = (top - MAP3.lastTop) / Math.max(0.001, dt); MAP3.lastTop = top;
    const tgt = [Math.sin(t / 2300) * 0.2, Math.max(-1, Math.min(1, vy / 1400)) + Math.cos(t / 3100) * 0.14];
    MAP3.tilt[0] += (tgt[0] - MAP3.tilt[0]) * Math.min(1, dt * 5); MAP3.tilt[1] += (tgt[1] - MAP3.tilt[1]) * Math.min(1, dt * 5);
    const K = REDUCED ? 0 : 0.026, tx = MAP3.tilt[0], ty = MAP3.tilt[1] * (572 / 1024);
    if (MAP3.ready) {
      gl.uniform2f(U.cam, tx, ty); gl.uniform1f(U.k, K);
      gl.uniform1f(U.top, top / cam.mapH); gl.uniform1f(U.span, cam.h / cam.mapH);
      gl.uniform1f(U.left, -cam.O / cam.mapW); gl.uniform1f(U.spanX, cam.w / cam.mapW);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    // fases: o mesmo deslocamento do relevo no ponto onde cada uma está
    const px = K * 572 * cam.s;
    for (const nd of MAP3.nodes) { const d = mapDepthAt(nd.x, nd.y) - 0.5; nd.el.style.translate = (-tx * px * d).toFixed(1) + 'px ' + (-MAP3.tilt[1] * px * d).toFixed(1) + 'px'; }
    MAP3.raf = requestAnimationFrame(mapGLFrame);
  }
  // arrasto com inércia e roda do mouse; um arrasto não vira clique numa fase
  const MAP_DRAG = false;
  function mapView(scroll, inner, max) {
    const old = MAP3.view;
    if (old && old.off) old.off();
    scroll.scrollTop = 0; scroll.style.overflowY = 'hidden'; scroll.style.touchAction = 'none'; inner.style.willChange = 'transform';
    const V = { top: old ? Math.min(old.top, max) : 0, target: null, vel: 0, max, drag: null, moved: false, frame: () => {} };
    const down = (e) => { V.drag = { y: e.clientY, top: V.top, lastY: e.clientY, lastT: performance.now() }; V.target = null; V.vel = 0; V.moved = false; };
    const move = (e) => {
      const d = V.drag; if (!d) return;
      const tm = performance.now(), dy = e.clientY - d.y;
      if (Math.abs(dy) > 6) V.moved = true;
      V.top = Math.max(0, Math.min(V.max, d.top - dy));
      const dts = (tm - d.lastT) / 1000; if (dts > 0) V.vel = V.vel * 0.3 + (-(e.clientY - d.lastY) / dts) * 0.7;
      d.lastY = e.clientY; d.lastT = tm;
    };
    const up = () => {
      if (!V.drag) return;
      if (performance.now() - V.drag.lastT > 90) V.vel = 0;
      const moved = V.moved; V.drag = null;
      // em vez de parar solto, plana até a fase mais perto de onde a inércia levaria
      if (moved && V.snapAt) { const proj = V.top + V.vel / 2.8; V.vel = 0; V.snapAt(Math.max(0, Math.min(V.max, proj))); }
    };
    const wheel = (e) => { e.preventDefault(); V.target = Math.max(0, Math.min(V.max, (V.target == null ? V.top : V.target) + e.deltaY)); };
    const click = (e) => { if (V.moved) { e.stopPropagation(); e.preventDefault(); V.moved = false; } };
    // 16/10, pedido dele: sem deslizar nem roda do mouse; o mapa só anda pelas setas (arrasto/roda ficam aqui se quiser voltar)
    if (MAP_DRAG) {
      scroll.addEventListener('pointerdown', down); window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
      scroll.addEventListener('wheel', wheel, { passive: false }); scroll.addEventListener('click', click, true);
    }
    V.off = () => { scroll.removeEventListener('pointerdown', down); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up); scroll.removeEventListener('wheel', wheel); scroll.removeEventListener('click', click, true); };
    MAP3.view = V;
    return V;
  }
  function mapGLResize(fullW, w, h) {
    const cv = MAP3.cv, dpr = Math.min(1.5, window.devicePixelRatio || 1);
    cv.style.left = Math.round((fullW - w) / 2) + 'px'; cv.style.width = w + 'px'; cv.style.height = h + 'px';
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); MAP3.gl.viewport(0, 0, cv.width, cv.height);
  }

  // ---------- mundos (16/10) ----------
  // Cada mundo tem a sua maquete 3D, a sua profundidade e o seu caminho (px da pintura 572x1024, de baixo pra cima).
  // Mundo 2 = Cenote Sagrado (maquete do Gemini, 16/10); caminho conferido com tools\previa-caminho.ps1.
  // 18/10: Mundo 1 = Amazônia (maquete do Gemini, trilha de troncos em S); os outros andaram +15.
  const WORLDS = [
    { from: 1, to: 21, map: 'map3a', depth: 'mapDepthA', path: [[290, 918], [260, 885], [245, 850], [254, 816], [273, 783], [305, 758], [322, 730], [321, 696], [291, 654], [248, 624], [218, 588], [230, 555], [285, 520], [325, 494], [350, 462], [351, 430], [332, 402], [299, 378], [279, 350], [282, 319], [293, 290]],
      // nodes = centro de cada tronco: 21 troncos, 21 fases
      nodes: [[290, 918], [260, 885], [245, 850], [254, 816], [273, 783], [305, 758], [322, 730], [321, 696], [291, 654], [248, 624], [218, 588], [230, 555], [285, 520], [325, 494], [350, 462], [351, 430], [332, 402], [299, 378], [279, 350], [282, 319], [293, 290]] },
    { from: 22, to: 42, map: 'map3', depth: 'mapDepth', pathKey: 'mapPath3', nodes: [[301, 984], [316, 935], [357, 885], [358, 850], [364, 794], [364, 736], [335, 695], [290, 660], [224, 614], [202, 582], [210, 525], [230, 480], [235, 450], [245, 410], [247, 376], [258, 336], [269, 298], [270, 264], [270, 230], [271, 194], [279, 160]] },
    { from: 43, to: 57, map: 'map3b', depth: 'mapDepthB', path: [[300, 1005], [320, 935], [300, 870], [240, 835], [235, 770], [265, 715], [190, 680], [110, 610], [85, 530], [130, 455], [215, 420], [300, 400], [385, 410], [455, 440], [470, 380], [400, 330], [395, 250]], nodes: [[300, 980], [316, 935], [337, 868], [259, 830], [229, 768], [235, 710], [105, 590], [92, 505], [150, 455], [217, 420], [291, 420], [364, 426], [433, 448], [367, 332], [400, 270]] },
    // Mundo 3 = Vale das Pirâmides (maquete do Gemini, 18/10); caminho conferido com tools\previa-caminho.ps1
    { from: 58, to: 86, map: 'map3c', depth: 'mapDepthC', path: [[257, 880], [290, 856], [320, 836], [338, 808], [350, 776], [324, 751], [298, 730], [267, 712], [229, 698], [193, 684], [162, 665], [139, 640], [120, 614], [110, 585], [125, 551], [156, 525], [190, 502], [227, 487], [275, 470], [318, 462], [352, 441], [362, 413], [345, 388], [303, 372], [271, 352], [262, 322], [277, 294], [298, 270], [318, 236]],
      // 29 discos de areia = 29 fases
      nodes: [[257, 880], [290, 856], [320, 836], [338, 808], [350, 776], [324, 751], [298, 730], [267, 712], [229, 698], [193, 684], [162, 665], [139, 640], [120, 614], [110, 585], [125, 551], [156, 525], [190, 502], [227, 487], [275, 470], [318, 462], [352, 441], [362, 413], [345, 388], [303, 372], [271, 352], [262, 322], [277, 294], [298, 270], [318, 236]] },
  ];
  const worldOf = (id) => Math.max(0, WORLDS.findIndex((w) => id >= w.from && id <= w.to));
  let mapWorld = null; // mundo aberto no mapa (null = o da fase atual)
  // Uncial Antiqua tem algarismos "old-style": 3/4/5/7/9 descem da linha e 6/8 sobem.
  // Altura da tinta de cada algarismo (subida/descida em % da fonte, medida no canvas) pra centralizar no anel.
  const DIGIT_INK = { 0: [56, 3], 1: [55, 2], 2: [57, 13], 3: [56, 21], 4: [55, 22], 5: [55, 21], 6: [74, 3], 7: [55, 20], 8: [74, 3], 9: [56, 21] };
  const numShift = (id) => {
    let up = 0, down = 0;
    for (const d of String(id)) { up = Math.max(up, DIGIT_INK[d][0]); down = Math.max(down, DIGIT_INK[d][1]); }
    // com line-height 1 a linha de base fica a .83em do topo; desloca o centro da tinta pro meio
    return ((up - down) / 200 - 0.33).toFixed(3);
  };
  // Família pintada no próprio projeto: normal, atual, difícil concluída e bloqueada.
  const nodeFace = (id, state) => {
    const src = 'assets/mapa/botoes-v2/' + state + '.png';
    // d2/d3: número com 2/3 algarismos fica menor pra caber dentro do furo do anel
    const dg = String(id).length;
    return '<img class="btn-img" alt="" src="' + src + '"><span class="num map-phase-num' + (dg > 1 ? ' d' + dg : '') + '" style="transform: translateY(' + numShift(id) + 'em)" aria-label="' + id + '">' + id + '</span>';
  };
  function buildMap() {
    const inner = $('mapInner'), scroll = $('mapScroll');
    const D = window.ART_DATA || {};
    const NEW3 = mapGLInit();
    const lastId = Math.min(save.unlocked, LEVELS.length);
    if (mapWorld == null || save.unlocked < WORLDS[mapWorld].from) mapWorld = worldOf(lastId);
    // sem 3D ou sem a arte do mundo ainda (pacote extra chegando): mostra o mundo 1
    const WI = mapWorld > 0 && (!NEW3 || !D[WORLDS[mapWorld].map]) ? 0 : mapWorld;
    const Wd = WORLDS[WI], base = Wd.from - 1, WL = LEVELS.slice(base, Wd.to), n = WL.length;
    if (NEW3) MAP3.setWorld(Wd);
    const sfx = WI ? String(WI + 1) : '';
    [['small', 'map.world'], ['strong', 'map.title'], ['em', 'map.sub']].forEach(([tag, k]) => { const el = document.querySelector('.map-title ' + tag); if (el) { el.dataset.t = k + sfx; el.textContent = T(k + sfx); } });
    let totalStars = 0;
    for (let i = Wd.from; i <= Wd.to; i++) totalStars += save.stars[i] || 0;
    // câmera de jornada (estilo Mario/DK/Crash): o mapa fica ~1,9x a altura da tela e rola;
    // só o caminho até a fase atual aparece, o resto fica escondido na névoa
    const fullW = scroll.clientWidth || W, h = scroll.clientHeight || H;
    const w = Math.min(fullW, Math.round(h * 0.72));
    // 16/10: 35 fases no mesmo caminho; o mapa cresce na proporção pra manter a distância entre as fases
    const IW = NEW3 ? 572 : 832, IH = NEW3 ? 1024 : 1248, mapH = Math.round(h * (NEW3 ? 2.4 : 1.9) * Math.max(1, n / 20)), s = mapH / IH, mapW = IW * s;
    // centraliza na horizontal na fase atual (o caminho serpenteia de um lado pro outro)
    const RP = (NEW3 ? Wd.path || D[Wd.pathKey] : D.mapPath) || [[416, 1200], [416, 150]]; let rTot = 0; const rSeg = [];
    for (let i = 0; i < RP.length - 1; i++) { const l = Math.hypot(RP[i + 1][0] - RP[i][0], RP[i + 1][1] - RP[i][1]); rSeg.push(l); rTot += l; }
    const rAt = (dd) => { for (let i = 0; i < rSeg.length; i++) { if (dd <= rSeg[i] || i === rSeg.length - 1) { const k = Math.min(1, dd / rSeg[i]); return [RP[i][0] + (RP[i + 1][0] - RP[i][0]) * k, RP[i][1] + (RP[i + 1][1] - RP[i][1]) * k]; } dd -= rSeg[i]; } return RP[RP.length - 1]; };
    const NODES = NEW3 && Wd.nodes && Wd.nodes.length === n ? Wd.nodes : null;
    const curRaw = NODES ? NODES[Math.min(save.unlocked - base, n) - 1] : rAt((rTot * (Math.min(save.unlocked - base, n) - 0.5)) / n);
    const offX = Math.max(w - mapW, Math.min(0, w / 2 - curRaw[0] * s)), offY = 0;
    inner.style.setProperty('--ns', Math.max(42, 24 * s).toFixed(1) + 'px'); inner.style.height = mapH + 'px'; inner.style.width = w + 'px'; inner.style.margin = '0 auto';
    const bgMap = NEW3 ? D[Wd.map] : D.map;
    $('screen-map').style.backgroundImage = bgMap ? 'url("' + bgMap + '")' : 'none';
    // mapa 3D: o fundo é o canvas WebGL atrás da coluna; sem isso, a pintura fica como fundo da coluna
    inner.style.backgroundImage = !NEW3 && D.map ? 'url("' + D.map + '")' : 'none';
    inner.classList.toggle('gl', NEW3);
    inner.style.backgroundSize = mapW + 'px ' + mapH + 'px';
    inner.style.backgroundPosition = offX + 'px ' + offY + 'px';
    const P = RP.map(([x, y]) => [offX + x * s, offY + y * s]);
    const seg = []; let tot = 0;
    for (let i = 0; i < P.length - 1; i++) { const l = Math.hypot(P[i + 1][0] - P[i][0], P[i + 1][1] - P[i][1]); seg.push(l); tot += l; }
    const at = (d) => { for (let i = 0; i < seg.length; i++) { if (d <= seg[i] || i === seg.length - 1) { const k = Math.min(1, d / seg[i]); return [P[i][0] + (P[i + 1][0] - P[i][0]) * k, P[i][1] + (P[i + 1][1] - P[i][1]) * k]; } d -= seg[i]; } return P[P.length - 1]; };
    const pts = NODES ? NODES.map(([x, y]) => [offX + x * s, offY + y * s]) : WL.map((L, i) => at((tot * (i + 0.5)) / n));
    const curIdx = Math.min(save.unlocked - base, n) - 1;
    // A fase atual fica estática. O antigo orbe flutuante e a aura giratória foram removidos.
    save.orbAt = base + curIdx;
    // borda da névoa: no meio do caminho entre a fase atual e a próxima
    const fogAt = (i) => (i >= n - 1 ? pts[n - 1][1] - 90 * s : (pts[i][1] + pts[i + 1][1]) / 2 + 10);
    // fogShown = índice global (0 = fase 1) da última fase já revelada
    const fogPrevIdx = Math.min(curIdx, Math.max(0, save.fogShown == null ? curIdx : save.fogShown - base));
    const lock = '<svg class="lock" viewBox="0 0 20 20"><path d="M6 8V6a4 4 0 1 1 8 0v2h1v10H5V8zm2 0h4V6a2 2 0 1 0-4 0z"/></svg>';
    let html = '';
    WL.forEach((L, i) => {
      if (i > curIdx) return;   // fases à frente: mistério
      const id = base + i + 1, st = save.stars[id] || 0;
      const locked = id > save.unlocked, current = id === save.unlocked && !st;
      const gem = locked ? (L.boss ? 'g-amethyst' : 'g-night') : 'g-emerald';
      const stateName = locked ? 'bloqueada' : current ? 'atual' : save.hardBest[id] ? 'dificil' : 'normal';
      const cls = 'node simple art-v2 state-' + stateName + (st ? ' done' : '') + (L.boss ? ' boss' : '') + (locked ? ' locked' : '') + (current ? ' current' : '');
      html += '<button type="button" class="' + cls + '" data-id="' + id + '" style="left:' + pts[i][0].toFixed(1) + 'px;top:' + pts[i][1].toFixed(1) + 'px;z-index:' + (current ? 30 : 10 + i) + '"' +
        (locked ? ' disabled' : '') + ' aria-label="' + T('level') + ' ' + id + (locked ? ' (bloqueada)' : '') + '">' +
        // 14/10: sem rótulo "FASE" em cima da fase atual (pedido dele: o sol e o número já bastam)
        nodeFace(id, stateName) + (locked ? lock : '') + '</button>';
    });
    const fogHtml = '<div class="map-fog" style="height:' + fogAt(fogPrevIdx).toFixed(0) + 'px"><i class="c1"></i><i class="c2"></i><i class="c3"></i></div>';
    const FX = NEW3 ? {} : D.mapFx || {}, pos = (p) => 'left:' + (offX + p[0] * s).toFixed(1) + 'px;top:' + (offY + p[1] * s).toFixed(1) + 'px';
    let fx = '';
    (FX.torch || []).forEach((p, k) => { fx += '<i class="fx-torch" style="' + pos(p) + ';--d:' + (k * 0.37) + 's;--r:' + (60 * s * 1.9) + 'px"></i>'; });
    if (FX.door) fx += '<i class="fx-door" style="' + pos(FX.door) + ';--r:' + (130 * s) + 'px"></i>';
    (FX.gems || []).forEach((p, k) => { fx += '<i class="fx-gem" style="' + pos(p) + ';--d:' + ((k * 0.73) % 4) + 's"></i>'; });
    if (FX.disc) fx += '<i class="fx-disc" style="' + pos(FX.disc) + ';--r:' + (300 * s) + 'px"></i>';
    for (let k = 0; k < 40; k++) fx += '<i class="fx-fly" style="left:' + (Math.random() * w).toFixed(0) + 'px;top:' + (Math.random() * mapH).toFixed(0) + 'px;--d:' + (Math.random() * 8).toFixed(2) + 's;--t:' + (6 + Math.random() * 6).toFixed(2) + 's"></i>';
    // câmera: começa na fase atual; se abriu fase nova, a névoa recua revelando o próximo trecho
    // 16/10 (pedido dele): a rolagem para quando a fase 1 aparece embaixo; não desce pelo resto da maquete vazia
    const maxTop = Math.max(0, Math.min(mapH - h, pts[0][1] + 120 - h));
    const camY = (y) => Math.max(0, Math.min(maxTop, y - h * 0.62));
    // mapa 3D, rolagem (16/10, pedido dele: nem setas nem o arrasto programado): o celular rola de verdade, com o embalo
    // nativo, mas o desenho fica parado numa "janela" grudada no topo (sticky); a cada quadro o jogo lê a posição da
    // rolagem e move a maquete 3D e as fases juntas. Assim o relevo não fica atrás das fases como na rolagem nativa pura.
    if (MAP3.view && MAP3.view.off) MAP3.view.off();
    let port = $('mapPort'), spacer = $('mapSpacer');
    if (NEW3 && !port) {
      port = document.createElement('div'); port.id = 'mapPort';
      spacer = document.createElement('div'); spacer.id = 'mapSpacer';
      scroll.insertBefore(port, inner); port.appendChild(inner); scroll.appendChild(spacer);
    }
    if (port) {
      port.style.cssText = NEW3 ? 'position:sticky;top:0;height:' + h + 'px;overflow:hidden' : '';
      spacer.style.height = NEW3 ? maxTop + 'px' : '0';
    }
    scroll.style.overflowY = NEW3 ? 'auto' : ''; scroll.style.touchAction = NEW3 ? 'pan-y' : ''; scroll.style.overscrollBehavior = NEW3 ? 'none' : 'contain'; // sem elástico no fim (iPhone)
    inner.style.transform = ''; inner.style.willChange = NEW3 ? 'transform' : '';
    const V = NEW3 ? { native: true, el: scroll, top: 0, max: maxTop, frame: () => {} } : null;
    MAP3.view = V;
    const getTop = () => (V ? V.top : scroll.scrollTop);
    const setTop = (y, smooth) => {
      if (smooth) scroll.scrollTo({ top: y, behavior: 'smooth' }); else scroll.scrollTop = y;
      if (V) { V.top = scroll.scrollTop; V.frame(); }
    };
    requestAnimationFrame(() => {
      setTop(camY(pts[curIdx][1] + (fogPrevIdx < curIdx ? 60 : 0)));
      if (fogPrevIdx < curIdx) {
        const fog = inner.querySelector('.map-fog');
        setTimeout(() => { fog.style.height = fogAt(curIdx).toFixed(0) + 'px'; Sound.play('idol'); setTop(camY(pts[curIdx][1]), true); }, 600);
      }
      save.fogShown = Math.max(save.fogShown || 0, base + curIdx); persist();
    });
    // tudo que acompanha o desenho (efeitos + fases) fica numa camada que desliza de lado; a névoa não
    // duas camadas que deslizam juntas: efeitos por baixo da névoa, fases por cima (como era o z-index antes)
    inner.innerHTML = '<div class="map-pan fx"><div class="map-fx" aria-hidden="true">' + fx + '</div></div>' + fogHtml + '<div class="map-pan nodes">' + html + '</div>';
    // câmera segue o caminho (14/10, ele não achava as fases 6-8 no celular): o mapa é mais largo que a tela,
    // então ao rolar ele desliza de lado pra manter o caminho no meio, na altura de ~62% da tela
    const PR = RP.map(([x, y]) => [x * s, y * s]); // caminho em px do mapa, de baixo pra cima (y sempre diminui)
    const pathX = (y) => {
      if (y >= PR[0][1]) return PR[0][0];
      for (let i = 0; i < PR.length - 1; i++) if (y <= PR[i][1] && y >= PR[i + 1][1]) { const k = (PR[i][1] - y) / (PR[i][1] - PR[i + 1][1] || 1); return PR[i][0] + (PR[i + 1][0] - PR[i][0]) * k; }
      return PR[PR.length - 1][0];
    };
    const pans = inner.querySelectorAll('.map-pan');
    const applyPan = () => {
      const O = Math.max(w - mapW, Math.min(0, w / 2 - pathX(getTop() + h * 0.62)));
      pans.forEach((p) => { p.style.transform = 'translateX(' + (O - offX).toFixed(1) + 'px)'; });
      inner.style.backgroundPosition = O.toFixed(1) + 'px ' + offY + 'px';
      if (NEW3) MAP3.cam = { O, w, h, mapW, mapH, s };
    };
    let panRaf = 0;
    // rolagem nativa: as fases andam já no evento de rolagem (mesmo quadro); o relevo 3D acompanha no próximo desenho
    // o limite vale também durante o "elástico" do iPhone (a rolagem passa do fim e volta): o desenho para no limite
    scroll.onscroll = V ? () => { V.top = Math.max(0, Math.min(V.max, scroll.scrollTop)); V.frame(); } : () => { if (!panRaf) panRaf = requestAnimationFrame(() => { panRaf = 0; applyPan(); }); };
    if (V) V.frame = () => { inner.style.transform = 'translate3d(0,' + (-V.top).toFixed(1) + 'px,0)'; applyPan(); };
    // setas de fase em fase (15/10) saíram em 16/10; fica só um botão discreto que volta pra fase atual,
    // e ele só aparece quando a fase atual sai da tela
    if ($('mapNav')) $('mapNav').hidden = true;
    let back = $('mapBack');
    if (V) {
      if (!back) {
        back = document.createElement('button'); back.type = 'button'; back.id = 'mapBack'; back.setAttribute('aria-label', T('map.current'));
        $('screen-map').appendChild(back);
      }
      back.innerHTML = '<img alt="" src="' + (ART.nodeImg('current') || ART.nodeImg('done') || '') + '"><span class="digits">' + (ART.nodeImg('s0') ? digitsHTML(base + curIdx + 1) : base + curIdx + 1) + '</span>';
      back.onclick = () => { Sound.play('click'); setTop(camY(pts[curIdx][1]), true); };
      const curTop = camY(pts[curIdx][1]);
      V.frame = () => {
        inner.style.transform = 'translate3d(0,' + (-V.top).toFixed(1) + 'px,0)'; applyPan();
        const off = Math.abs(V.top - curTop) > h * 0.55;
        if (back.classList.contains('on') !== off) back.classList.toggle('on', off);
      };
    } else if (back) back.classList.remove('on');
    applyPan();
    if (NEW3) {
      mapGLResize(fullW, w, h);
      // posição de cada fase na pintura (pra amostrar a profundidade)
      MAP3.nodes = [...inner.querySelectorAll('.node')].map((el) => { const i = +el.dataset.id - 1 - base, p = pts[i]; return { el, x: (p[0] - offX) / s, y: (p[1] - offY) / s }; });
      MAP3.lastT = 0; MAP3.lastTop = getTop();
      if (!MAP3.raf) MAP3.raf = requestAnimationFrame(mapGLFrame);
    }
    $('mapStars').textContent = totalStars + '/' + n * 3;
    let wn = $('mapWorlds');
    if (!wn) { wn = document.createElement('div'); wn.id = 'mapWorlds'; wn.innerHTML = '<button type="button" class="wprev"></button><button type="button" class="wnext"></button>'; $('screen-map').appendChild(wn); }
    const [wp, wx] = wn.querySelectorAll('button'), arw = ART.nodeImg('navarrow');
    [wp, wx].forEach((b) => { if (arw) b.style.backgroundImage = 'url(' + arw + ')'; });
    const nextOpen = WI + 1 < WORLDS.length && save.unlocked >= WORLDS[WI + 1].from && NEW3 && D[WORLDS[WI + 1].map];
    wp.hidden = WI === 0; wx.hidden = WI + 1 >= WORLDS.length; wx.disabled = !nextOpen;
    wp.setAttribute('aria-label', T('map.world' + (WI > 1 ? WI : ''))); wx.setAttribute('aria-label', T('map.world' + (WI + 2)));
    const goWorld = (k) => { Sound.play('click'); mapWorld = k; wipe(buildMap); };
    wp.onclick = () => goWorld(WI - 1); wx.onclick = () => { if (nextOpen) goWorld(WI + 1); };
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
    // a dica do tutorial some se o jogador sair da fase, e acompanha o tabuleiro se a tela mudar de tamanho
    if (tutTip) { if (scene !== 'play' || !tutorialMove) hideTutorialTip(); else placeTutorialTip(); }
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', () => { layout(); if (scene === 'map') buildMap(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) Sound.pause(); else Sound.resume(); });
  window.addEventListener('pagehide', () => { if (scene === 'play' && !runEnded) abandonRun('pagehide'); });
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
    get save() { return save; }, get tutorialMove() { return tutorialMove; }, openPre, startLevel, openProgress, openRecordsHub, openShop,
    findMove() { return state && LR.findMove(state); },
  };

  function boot() {
    applySkins();
    layout();
    TEX.applyCss();
    // kit de interface pintado: cada peça vira variável CSS (--ui-btn, --ui-frame...)
    const UIK = ART.uiImages();
    for (const k in UIK) { const im = UIK[k]; const url = im.toDataURL ? im.toDataURL('image/png') : im.src; document.documentElement.style.setProperty('--ui-' + k, 'url(' + url + ')'); }
    if (Object.keys(UIK).length) document.documentElement.classList.add('ui-kit');
    UIART.applyCorners();
    // martelo pintado (15/10): botão de pedra redondo, martelo (aceso quando armado) e selo de pedra com o contador
    if (ART.nodeImg('hbtn')) {
      const hb = $('btnHammer'); hb.classList.add('painted');
      hb.style.setProperty('--h-btn', 'url(' + ART.nodeImg('hbtn') + ')');
      hb.style.setProperty('--h-badge', 'url(' + ART.nodeImg('hbadge') + ')');
      $('hammerIc').src = ART.nodeImg('hham');
      nodeImgObj('hham'); nodeImgObj('hhamon');
    } else $('hammerIc').src = ART.icon('hammer', 80);
    if (!window.ART_DATA) GEM3D.init();
    ART.clearCache();
    const ld = $('loading'); ld.classList.add('done'); setTimeout(() => ld.remove(), 700);
    Ads.loading(false);
    setTimeout(loadExtra, 300);
    const hardLink = /^#dificil(\d+)$/.exec(location.hash || '');
    const m = /^#fase(\d+)$/.exec(location.hash || '');
    if (hardLink && LEVELS[+hardLink[1] - 1]) { openMap(); openPre(+hardLink[1], !!save.stars[+hardLink[1]]); }
    else if (m && LEVELS[+m[1] - 1]) { openMap(); openPre(+m[1]); }
    else if (/^#jogar\d+$/.test(location.hash)) startLevel(+location.hash.slice(6));
    else if (location.hash === '#fxdemo') { startLevel(5); setTimeout(() => { state.grid[3][2].special = 'lineH'; state.grid[5][5].special = 'barrel'; state.grid[6][1] = { id: 9997, kind: 'gem', color: null, special: 'idol', armed: false, vine: false }; setInterval(() => { if (Math.random() < 0.34) blastFx({ special: 'lineH', x: 2, y: 3, area: [] }); else if (Math.random() < 0.5) blastFx({ special: 'barrel', x: 5, y: 5, area: [] }); else blastFx({ special: 'idol', x: 1, y: 6, area: [[0, 0], [3, 1], [6, 2], [4, 7]] }); }, 1400); if (0) setInterval(() => { blastFx({ special: 'lineH', x: 2, y: 3, area: [] }); blastFx({ special: 'barrel', x: 5, y: 5, area: [] }); blastFx({ special: 'idol', x: 1, y: 6, area: [[0, 0], [3, 1], [6, 2], [4, 7]] }); }, 900); }, 1500); }
    else if (/^#evento-/.test(location.hash)) { if (location.hash === '#evento-anton') document.documentElement.classList.add('ev-anton'); startLevel(3); setTimeout(() => { const p3 = I18N.lang === 'pt' && ART.nodeImg('p3'); showPraise(T('praise.3'), p3 ? 'art p3' : '', p3); const b = document.createElement('div'); const ra = I18N.lang === 'pt' && ART.nodeImg('rush'); b.className = 'praise ' + (ra ? 'art rush' : 'banner'); if (ra) b.innerHTML = '<img alt="" src="' + ra + '">'; else b.textContent = T('rush'); b.style.top = '62%'; b.style.animation = 'none'; b.style.transform = 'translate(-50%,-50%)'; document.body.appendChild(b); const a = document.querySelector('.praise:not(.banner)'); if (a) { a.style.animation = 'none'; a.style.transform = 'translate(-50%,-50%)'; a.style.opacity = '1'; a.style.top = '40%'; setTimeout(() => document.body.appendChild(a), 1); } }, 2600); }
    else if (location.hash === '#mapa') openMap();
    // #maparolaN: mapa com a fase N aberta, rolado meia tela pra baixo (confere a rolagem nativa e o botão de voltar)
    // #mapavoltaN: abre o mapa na fase N e toca de verdade (elementFromPoint) na seta de mundo; anota o título em body[data-teste]
    else if (/^#mapavolta\d+$/.test(location.hash)) { const u = +location.hash.slice(10); save.unlocked = u; save.fogShown = u - 1; for (let i = 1; i < u; i++) save.stars[i] = 1; openMap();
      setTimeout(() => { const r = document.querySelector('#mapWorlds .wprev').getBoundingClientRect(); const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); document.body.dataset.teste = 'toque em: ' + (el && (el.className || el.id || el.tagName)); el && el.click(); setTimeout(() => { document.body.dataset.teste += ' | titulo: ' + document.querySelector('.map-title strong').textContent; if (/Cenote/.test(document.querySelector('.map-title strong').textContent)) { mapWorld = 0; buildMap(); document.body.dataset.teste += ' | sem cortina: ' + document.querySelector('.map-title strong').textContent + ', fases na tela: ' + document.querySelectorAll('#mapInner .node').length; mapWorld = 1; buildMap(); document.body.dataset.teste += ' | volta ao 2: ' + document.querySelector('.map-title strong').textContent; } }, 2500); }, 4000); }
    else if (/^#maparola\d*$/.test(location.hash)) { const u = +location.hash.slice(9) || 20; save.unlocked = u; save.fogShown = u - 1; for (let i = 1; i < u; i++) save.stars[i] = (i % 3) + 1; openMap(); setTimeout(() => { $('mapScroll').scrollTop += 700; }, 5000); }
    else if (/^#mapademo\d*$/.test(location.hash)) { const u = +location.hash.slice(9) || 7; save.unlocked = u; save.fogShown = u - 2; for (let i = 1; i < u; i++) save.stars[i] = (i % 3) + 1; openMap(); }
    else if (/^#loja/.test(location.hash)) { const m2 = /^#loja-(\w+)(?:-(\w+))?/.exec(location.hash); if (m2 && m2[2]) { save.skins[{ gems: 'gem', words: 'word', trail: 'trail' }[m2[1]]] = m2[2]; applySkins(); } openMap(); openShop(null, m2 ? m2[1] : null); }
    // #pelesN: fase N com a skin de joia/rastro dada (#peles3-gold-fire), pra print
    else if (/^#peles\d+/.test(location.hash)) { const m2 = /^#peles(\d+)-(\w+)-(\w+)/.exec(location.hash); save.skins.gem = m2[2]; save.skins.trail = m2[3]; applySkins(); startLevel(+m2[1]); let n = 0; const iv = setInterval(() => { if (n === 70) blastFx({ special: 'lineH', x: 3, y: 4, area: [] }); stepTime(0.05); update(0.05); draw(); if (++n > 74) clearInterval(iv); }, 50); }
    else if (/^#anuncio\d+$/.test(location.hash)) { const n = +location.hash.slice(8); startLevel(n); setTimeout(() => { announceLevel(LEVELS[n - 1]); const a = document.querySelector('.announce:last-of-type'); if (a) { a.style.animation = 'none'; a.remove = () => {}; } }, 600); }
    else if (location.hash === '#placardemo') { startLevel(3); setTimeout(() => { state.score = Math.round((level.stars[1] + level.stars[2]) / 2); renderHUD(); }, 900); }
    // #verN: fase N com o laço rodando por timer (pra print no Chrome sem janela)
    else if (/^#ver\d+$/.test(location.hash)) {
      startLevel(+location.hash.slice(4));
      let n = 0; const iv = setInterval(() => { stepTime(0.05); update(0.05); draw(); if (++n > 80) clearInterval(iv); }, 50);
    }
    // #entradaN: fase N parada no meio da entrada do chefe (rugido); #garraN: onça dando a garrada
    else if (/^#entrada\d+$/.test(location.hash)) {
      startLevel(+location.hash.slice(8));
      const iv = setInterval(() => { stepTime(0.05); update(0.05); draw(); if (intro && now >= intro.t0 + 0.9) clearInterval(iv); }, 50);
    }
    else if (/^#garra\d+$/.test(location.hash)) {
      startLevel(+location.hash.slice(6));
      let t1 = null; const iv = setInterval(() => {
        if (t1 == null && state && !intro && !busy) { t1 = now; bossAnims[0] = { type: 'claw', t0: now }; }
        stepTime(0.05); update(0.05); draw(); if (t1 != null && now >= t1 + 0.25) clearInterval(iv);
      }, 50);
    }
    // #novademo: Supernova, gosma e Joia de Tempo no tabuleiro; #sapodemo: fase 18 com o sapo (sprites provisórios)
    else if (location.hash === '#novademo') { startLevel(3); setTimeout(() => { const g = state.grid; g[3][3].special = 'nova'; g[5][2].vine = true; g[5][2].slime = 2; g[2][5].vine = true; g[2][5].slime = 1; g[6][5].clock = true; g[1][1].clock = true; }, 700); let n = 0; const iv = setInterval(() => { stepTime(0.05); update(0.05); draw(); if (++n > 50) clearInterval(iv); }, 50); }
    else if (location.hash === '#diario') { startLevel('daily'); let n = 0; const iv = setInterval(() => { stepTime(0.05); update(0.05); draw(); if (++n > 60) clearInterval(iv); }, 50); }
    else if (location.hash === '#diarioresultado') { startLevel('daily').then(() => { state.score = Math.round(level.best * 0.87); setTimeout(() => showDaily(), 300); }); }
    else if (location.hash === '#aranhademo') { startLevel(20); setTimeout(() => { state.grid[3][2] = { id: 9001, kind: 'rock', hp: 1, cocoon: 3 }; state.grid[5][5] = { id: 9002, kind: 'rock', hp: 1, cocoon: 1 }; }, 800); let n = 0; const iv = setInterval(() => { stepTime(0.05); update(0.05); draw(); if (++n > 80) clearInterval(iv); }, 50); }
    else if (location.hash === '#fracodemo') { startLevel(+(location.search.slice(1)) || 21); let n = 0; const iv = setInterval(() => { stepTime(0.05); update(0.05); draw(); if (++n > 80) clearInterval(iv); }, 50); }
    else if (location.hash === '#oncademo') { startLevel(6); let n = 0; const iv = setInterval(() => { stepTime(0.05); update(0.05); draw(); if (++n > 80) clearInterval(iv); }, 50); }
    else if (location.hash === '#sapodemo') { startLevel(13); let n = 0; const iv = setInterval(() => { stepTime(0.05); update(0.05); draw(); if (++n > 80) clearInterval(iv); }, 50); }
    // #serpdemo: fase 20 com o laço rodando por timer (o Chrome sem janela não roda requestAnimationFrame) e um rastro em curva
    else if (location.hash === '#serpdemo') {
      startLevel(36);
      setTimeout(() => {
        const [h, t] = LR.bossCells(state, state.bosses[0]), dx = h[0] - t[0], dy = h[1] - t[1];
        const back = [t[0] - dx, t[1] - dy], side = [back[0] + dy, back[1] + dx];
        serpTrail[0] = [back, side].filter(([x, y]) => x >= 0 && y >= 0 && x < 8 && y < 8);
      }, 300);
      let n = 0; const iv = setInterval(() => { stepTime(0.05); update(0.05); draw(); if (++n > 80) clearInterval(iv); }, 50);
    }
    else if (location.hash === '#chefedemo') { startLevel(20); setTimeout(() => { vis = new Map(); state.bosses[0].hp = 0; state.bosses[1].hp = 1; state.goals[0].count = 1; renderHUD(); }, 1500); }
    else if (location.hash === '#derrotademo') { startLevel(1); setTimeout(() => { showLose(); const x = document.getElementById('mExtra'); if (x) x.hidden = false; }, 900); }
    else if (location.hash === '#pontosdemo') { startLevel(1); setTimeout(() => { state.score = 1290; renderHUD(); floats.push({ x: cellX(3), y: cellY(4), text: '+90', num: 90, color: '#ffe08a', t: 0, hold: true }); }, 900); }
    else if (location.hash === '#vitoriademo') { startLevel(1); setTimeout(() => { state.score = 16900; showWin(); }, 1200); setTimeout(() => document.querySelectorAll('.stars-big img').forEach((im, i) => { if (i < 2) { im.src = ART.nodeImg('vstar') || im.src; im.classList.add('on'); } }), 2600); }
    else openMenu();
    requestAnimationFrame(frame);
  }
  $('loadingTxt').textContent = T('loading');
  const fontsReady = document.fonts && document.fonts.ready ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]) : Promise.resolve();
  fontsReady.then(() => ART.loadAI(boot));
})();
