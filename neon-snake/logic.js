// Regras do jogo, sem tela nem input. Dá pra testar no Node.
(function (root) {
  const START_MS = 150;     // intervalo entre passos no início
  const MIN_MS = 55;        // limite de velocidade
  const STEP_MS = 3;        // quanto acelera a cada comida
  const QUEUE_MAX = 3;      // curvas guardadas (zigue-zague rápido)

  const MUSHROOM_EVERY = 3;     // a cada 3 comidas aparece um cogumelo
  const MUSHROOM_TTL = 9000;    // some se não pegar
  const COLOR_PER_MUSH = 1 / 6; // 6 cogumelos = cor total
  const BOOST_CHANCE = 0.3;     // chance do item azul aparecer após comer
  const BOOST_TTL = 7000;
  const BOOST_TIME = 3000;      // duração do turbo
  const BOOST_FACTOR = 1.8;     // turbo = 1.8x mais rápido
  const COMBO_WINDOW = 3500;    // tempo pra emendar a próxima comida
  const COMBO_MAX = 5;
  const NEAR_BONUS = 15;        // passar raspando no próprio corpo
  const GOLD_CHANCE = 0.03;     // cogumelo dourado: 3% a cada comida
  const GOLD_TTL = 6000;
  const FRENZY_TIME = 6000;     // chuva de moedas
  const COINS = 12;
  const COIN_POINTS = 20;

  // Fases: a cada 15 comidas muda o cenário e entra um perigo novo.
  // 0 fliperama (nada) · 1 deserto (flechas) · 2 caverna (morcegos) · 3 vulcão (rochas) · 4 caos (tudo)
  const PHASE_EVERY = 15;
  const LAST_PHASE = 4;
  const HAZARD_EVERY = { 1: 2600, 2: 3400, 3: 2200, 4: 1500 }; // ms entre um perigo e outro
  const ARROW_WARN = 1000;      // a linha pisca antes da flecha sair
  const ARROW_SPEED = 0.024;    // casas por ms (24 por segundo)
  const BAT_SPEED = 0.0045;     // casas por ms
  const BAT_WAVE = 2.5;         // altura do zigue-zague do morcego
  const ROCK_WARN = 1200;       // sombra no chão antes da rocha cair
  const ROCK_LIFE = 9000;       // rocha fica no chão e depois esfarela
  const MAX = { arrows: 3, bats: 2, rocks: 6 };

  const DIRS = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  };

  const same = (a, b) => a && b && a.x === b.x && a.y === b.y;

  function opposite(a, b) {
    return DIRS[a].x === -DIRS[b].x && DIRS[a].y === -DIRS[b].y;
  }

  // Gerador com semente: mesma semente = mesma sequência (desafio do dia).
  function seedRng(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function createGame(cols, rows, rng) {
    const g = { cols, rows, rng: rng || Math.random };
    reset(g);
    return g;
  }

  function reset(g, rng) {
    if (rng) g.rng = rng;
    const cx = Math.floor(g.cols / 2);
    const cy = Math.min(g.rows - 3, Math.floor(g.rows / 2) + 3);
    g.snake = [{ x: cx, y: cy }, { x: cx, y: cy + 1 }, { x: cx, y: cy + 2 }];
    g.dir = 'up';
    g.queue = [];
    g.score = 0;
    g.eaten = 0;
    g.mushrooms = 0;
    g.color = 0;          // 0 = cinza, 1 = cor total
    g.alive = true;
    g.tickMs = START_MS;
    g.boostLeft = 0;
    g.combo = 0;
    g.comboLeft = 0;
    g.frenzyLeft = 0;
    g.nearMisses = 0;
    g.dangerAhead = false;
    g.mushroom = null;    // { x, y, ttl }
    g.boost = null;       // { x, y, ttl }
    g.gold = null;        // { x, y, ttl }
    g.coins = [];
    g.arrows = [];        // { axis: 'row'|'col', line, dir, warn, pos }
    g.bats = [];          // { x, y, y0, dir, t }
    g.rocks = [];         // { x, y, warn, life }
    g.hazardTimer = 1500;
    g.cuts = 0;
    g.food = null;
    spawnFood(g);
  }

  function phase(g) {
    return Math.min(LAST_PHASE, Math.floor(g.eaten / PHASE_EVERY));
  }

  function interval(g) {
    return g.boostLeft > 0 ? Math.round(g.tickMs / BOOST_FACTOR) : g.tickMs;
  }

  function speed(g) {
    return Math.round(1000 / interval(g));
  }

  const turboMult = (g) => (g.boostLeft > 0 ? 2 : 1);

  // Guarda a curva na fila. Recusa repetir a mesma direção e a ré de 180°.
  function turn(g, d) {
    if (!DIRS[d]) return false;
    const last = g.queue.length ? g.queue[g.queue.length - 1] : g.dir;
    if (d === last || opposite(d, last)) return false;
    if (g.queue.length >= QUEUE_MAX) return false;
    g.queue.push(d);
    return true;
  }

  function occupied(g) {
    const s = new Set(g.snake.map((p) => p.x + ',' + p.y));
    for (const p of [g.food, g.mushroom, g.boost, g.gold, ...g.coins, ...g.rocks])
      if (p) s.add(p.x + ',' + p.y);
    return s;
  }

  const rockAt = (g, c) => g.rocks.some((r) => r.warn <= 0 && same(r, c));

  // ---------- perigos ----------
  function spawnHazard(g) {
    const ph = phase(g);
    const kind = ph === 4 ? ['arrow', 'bat', 'rock'][Math.floor(g.rng() * 3)]
      : ph === 1 ? 'arrow' : ph === 2 ? 'bat' : 'rock';
    const head = g.snake[0];
    if (kind === 'arrow' && g.arrows.length < MAX.arrows) {
      const axis = g.rng() < 0.5 ? 'row' : 'col';
      const size = axis === 'row' ? g.rows : g.cols;
      const avoid = axis === 'row' ? head.y : head.x; // nunca na linha onde a cabeça está
      let line = Math.floor(g.rng() * size);
      if (line === avoid) line = (line + 2 + Math.floor(g.rng() * (size - 3))) % size;
      const dir = g.rng() < 0.5 ? 1 : -1;
      const len = axis === 'row' ? g.cols : g.rows;
      g.arrows.push({ axis, line, dir, warn: ARROW_WARN, pos: dir > 0 ? -1 : len });
      return kind;
    } else if (kind === 'bat' && g.bats.length < MAX.bats) {
      const dir = g.rng() < 0.5 ? 1 : -1;
      const y0 = 3 + g.rng() * (g.rows - 7);
      g.bats.push({ x: dir > 0 ? -1 : g.cols, y: y0, y0, dir, t: g.rng() * 3000 });
      return kind;
    } else if (kind === 'rock' && g.rocks.length < MAX.rocks) {
      for (let i = 0; i < 20; i++) {
        const c = pickFree(g);
        if (c && Math.abs(c.x - head.x) + Math.abs(c.y - head.y) > 3) {
          g.rocks.push({ x: c.x, y: c.y, warn: ROCK_WARN, life: ROCK_LIFE });
          return kind;
        }
      }
    }
    return null;
  }

  // Acertou a cobra: na cabeça mata, no corpo corta o rabo dali pra trás.
  function hit(g, idx, at, by, events) {
    if (idx === 0) {
      g.alive = false;
      events.push({ type: by, at });
      return true;
    }
    const lost = g.snake.length - idx;
    g.snake = g.snake.slice(0, idx);
    g.cuts++;
    events.push({ type: 'cut', at, lost, by });
    return false;
  }

  // Continuar depois do anúncio recompensado: limpa os perigos e aponta a
  // cobra pra direção com mais espaço livre. Se não tiver saída, sobra só a cabeça.
  function revive(g) {
    g.arrows = [];
    g.bats = [];
    g.rocks = [];
    g.hazardTimer = 2500;
    g.queue = [];
    g.boostLeft = 0;
    g.dangerAhead = false;
    const free = (c, body) => c.x >= 0 && c.y >= 0 && c.x < g.cols && c.y < g.rows && !body.some((s) => same(s, c));
    const room = (d, body) => {
      const v = DIRS[d], h = g.snake[0];
      let n = 0;
      for (let c = { x: h.x + v.x, y: h.y + v.y }; free(c, body) && n < 40; c = { x: c.x + v.x, y: c.y + v.y }) n++;
      return n;
    };
    let body = g.snake.slice(0, -1);
    let best = Object.keys(DIRS).sort((a, b) => room(b, body) - room(a, body))[0];
    if (room(best, body) === 0) {
      g.snake = [g.snake[0]];
      body = [];
      best = Object.keys(DIRS).sort((a, b) => room(b, body) - room(a, body))[0];
    }
    g.dir = best;
    g.alive = true;
  }

  // Perigos andam no tempo real (não nos passos da cobra). Chamar todo quadro.
  function advance(g, ms) {
    const events = [];
    if (!g.alive) return events;
    if (phase(g) >= 1) {
      g.hazardTimer -= ms;
      if (g.hazardTimer <= 0) {
        const kind = spawnHazard(g);
        if (kind) events.push({ type: 'spawn', kind });
        g.hazardTimer = HAZARD_EVERY[phase(g)];
      }
    }

    for (const a of g.arrows) {
      if (a.warn > 0) {
        if ((a.warn -= ms) <= 0) events.push({ type: 'arrowGo' });
        continue;
      }
      const old = a.pos;
      a.pos += a.dir * ARROW_SPEED * ms;
      const from = Math.floor(old), to = Math.floor(a.pos);
      for (let c = from; a.dir > 0 ? c <= to : c >= to; c += a.dir) {
        const cell = a.axis === 'row' ? { x: c, y: a.line } : { x: a.line, y: c };
        const idx = g.snake.findIndex((s) => same(s, cell));
        if (idx >= 0) {
          a.done = true;
          if (hit(g, idx, cell, 'arrow', events)) return events;
          break;
        }
      }
    }
    g.arrows = g.arrows.filter((a) => {
      const len = a.axis === 'row' ? g.cols : g.rows;
      return !a.done && a.pos > -2 && a.pos < len + 2;
    });

    for (const b of g.bats) {
      b.x += b.dir * BAT_SPEED * ms;
      b.t += ms;
      b.y = b.y0 + Math.sin(b.t / 380) * BAT_WAVE;
      const idx = g.snake.findIndex((s) => Math.abs(s.x - b.x) < 0.6 && Math.abs(s.y - b.y) < 0.6);
      if (idx >= 0) {
        b.done = true;
        if (hit(g, idx, g.snake[idx], 'bat', events)) return events;
      }
    }
    g.bats = g.bats.filter((b) => !b.done && b.x > -2 && b.x < g.cols + 2);

    for (const r of g.rocks) {
      if (r.warn > 0) {
        if ((r.warn -= ms) <= 0) {
          events.push({ type: 'rockLand', at: { x: r.x, y: r.y } });
          const idx = g.snake.findIndex((s) => same(s, r));
          if (idx >= 0 && hit(g, idx, { x: r.x, y: r.y }, 'rock', events)) return events;
        }
      } else {
        r.life -= ms;
      }
    }
    g.rocks = g.rocks.filter((r) => r.life > 0);
    return events;
  }

  // Sorteia uma casa livre. Sorteia na grade inteira primeiro (assim o desafio
  // do dia põe as coisas nos mesmos lugares pra todo mundo) e só depois cai
  // na lista de casas livres.
  function pickFree(g) {
    const taken = occupied(g);
    for (let i = 0; i < 40; i++) {
      const c = { x: Math.floor(g.rng() * g.cols), y: Math.floor(g.rng() * g.rows) };
      if (!taken.has(c.x + ',' + c.y)) return c;
    }
    const free = [];
    for (let y = 0; y < g.rows; y++)
      for (let x = 0; x < g.cols; x++)
        if (!taken.has(x + ',' + y)) free.push({ x, y });
    return free.length ? free[Math.floor(g.rng() * free.length)] : null;
  }

  function spawnFood(g) {
    g.food = pickFree(g);
    return !!g.food;
  }

  function tickTimers(g, ms) {
    if (g.boostLeft > 0) g.boostLeft = Math.max(0, g.boostLeft - ms);
    if (g.comboLeft > 0 && (g.comboLeft -= ms) <= 0) { g.comboLeft = 0; g.combo = 0; }
    if (g.frenzyLeft > 0 && (g.frenzyLeft -= ms) <= 0) { g.frenzyLeft = 0; g.coins = []; }
    for (const k of ['mushroom', 'boost', 'gold'])
      if (g[k] && (g[k].ttl -= ms) <= 0) g[k] = null;
  }

  // A casa logo à frente é o próprio corpo? (o rabo não conta: ele sai do lugar)
  function bodyAhead(g) {
    const v = DIRS[g.dir], h = g.snake[0];
    const c = { x: h.x + v.x, y: h.y + v.y };
    return g.snake.slice(0, -1).some((s) => same(s, c));
  }

  function step(g) {
    if (!g.alive) return { type: 'dead' };
    tickTimers(g, interval(g));
    if (g.queue.length) g.dir = g.queue.shift();

    const v = DIRS[g.dir];
    const head = g.snake[0];
    const next = { x: head.x + v.x, y: head.y + v.y };

    if (next.x < 0 || next.y < 0 || next.x >= g.cols || next.y >= g.rows) {
      g.alive = false;
      return { type: 'wall' };
    }
    if (rockAt(g, next)) {
      g.alive = false;
      return { type: 'rock' };
    }

    const eats = same(next, g.food);
    // Se não vai crescer, o rabo sai do lugar neste passo — dá pra "seguir o rabo".
    const body = eats ? g.snake : g.snake.slice(0, -1);
    if (body.some((s) => same(s, next))) {
      g.alive = false;
      return { type: 'self' };
    }

    g.snake.unshift(next);
    const r = { type: 'move', at: next, nearMiss: false };

    // estava indo direto pro corpo e desviou a tempo
    if (g.dangerAhead) {
      r.nearMiss = true;
      g.nearMisses++;
      g.score += NEAR_BONUS * turboMult(g);
    }

    if (eats) {
      // comida: só cresce (e pontua, com combo)
      g.eaten++;
      g.combo = g.comboLeft > 0 ? Math.min(COMBO_MAX, g.combo + 1) : 1;
      g.comboLeft = COMBO_WINDOW;
      g.score += 10 * g.combo * turboMult(g);
      // no treino (começa numa fase adiantada) a velocidade conta só o que comeu lá
      g.tickMs = Math.max(MIN_MS, START_MS - (g.eaten - (g.eatenBase || 0)) * STEP_MS);
      if (!spawnFood(g)) {
        g.alive = false;
        return { type: 'win', at: next };
      }
      if (g.eaten % MUSHROOM_EVERY === 0 && !g.mushroom) {
        const c = pickFree(g);
        if (c) g.mushroom = { x: c.x, y: c.y, ttl: MUSHROOM_TTL };
      }
      if (!g.boost && g.boostLeft === 0 && g.rng() < BOOST_CHANCE) {
        const c = pickFree(g);
        if (c) g.boost = { x: c.x, y: c.y, ttl: BOOST_TTL };
      }
      if (!g.gold && g.frenzyLeft === 0 && g.rng() < GOLD_CHANCE) {
        const c = pickFree(g);
        if (c) g.gold = { x: c.x, y: c.y, ttl: GOLD_TTL };
      }
      if (g.eaten % PHASE_EVERY === 0 && g.eaten / PHASE_EVERY <= LAST_PHASE) {
        r.phase = phase(g);
        g.hazardTimer = 2000; // respiro antes do primeiro perigo da fase
      }
      r.type = 'eat';
    } else {
      g.snake.pop();
      const coin = g.coins.findIndex((c) => same(c, next));
      if (coin >= 0) {
        g.coins.splice(coin, 1);
        g.score += COIN_POINTS * turboMult(g);
        r.type = 'coin';
      } else if (same(next, g.mushroom)) {
        // cogumelo: não cresce, colore o mundo
        g.mushroom = null;
        g.mushrooms++;
        g.color = Math.min(1, g.mushrooms * COLOR_PER_MUSH);
        g.score += 25 * turboMult(g);
        r.type = 'mushroom';
      } else if (same(next, g.boost)) {
        // azul: turbo por poucos segundos, pontos em dobro
        g.boost = null;
        g.boostLeft = BOOST_TIME;
        r.type = 'boost';
      } else if (same(next, g.gold)) {
        // dourado: chuva de moedas por alguns segundos
        g.gold = null;
        g.frenzyLeft = FRENZY_TIME;
        for (let i = 0; i < COINS; i++) {
          const c = pickFree(g);
          if (c) g.coins.push(c);
        }
        r.type = 'gold';
      }
    }
    g.dangerAhead = bodyAhead(g);
    r.combo = g.combo;
    return r;
  }

  const api = {
    createGame, reset, turn, step, advance, revive, phase, interval, speed, seedRng, DIRS,
    COMBO_WINDOW, FRENZY_TIME, ARROW_WARN, ROCK_WARN, PHASE_EVERY,
  };
  if (typeof module !== 'undefined') module.exports = api;
  else root.SnakeLogic = api;
})(this);
