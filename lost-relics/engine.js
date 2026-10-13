// Lost Relics — regras do jogo, sem desenho nem som.
// Tudo aqui é determinístico (semente) pra poder testar e simular partidas no Node.
//
// Peças: gem (joia, pode ter especial), rock (rocha, não cai), artifact (baú que desce até a saída).
// Célula: mask (existe no tabuleiro), sand (0-2 camadas embaixo da peça).
// Especiais: lineH / lineV (dinamite), barrel (barril, explode 2x), idol (ídolo dourado).
(function (root) {
  'use strict';

  const SCORE = { gem: 30, line: 120, barrel: 200, idol: 300, rock: 40, sand: 60, vine: 40, artifact: 1000, treasure: 250 };
  const GEM_NAMES = ['ruby', 'emerald', 'sapphire', 'topaz', 'amethyst', 'diamond'];

  // ---------- sorteio com semente (estado copiável) ----------
  function rand(s) {
    let a = (s.seed = (s.seed + 0x6D2B79F5) | 0);
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  const randInt = (s, n) => Math.floor(rand(s) * n);

  // ---------- criação ----------
  function newGem(s, color, special) {
    return { id: s.nextId++, kind: 'gem', color, special: special || null, armed: false, vine: false };
  }

  // Legenda do layout:
  //  .  joia      x  sem casa     s/S  areia 1/2 camadas
  //  r/R/T rocha 1/2/3            v  joia presa no cipó (w/W = cipó sobre areia 1/2)
  //  a  baú (artefato)
  function createState(level, seed) {
    const rows = level.layout;
    const H = rows.length, W = rows[0].length;
    const s = {
      W, H, mask: [], grid: [], sand: [],
      colors: level.colors, seed: seed >>> 0, nextId: 1,
      score: 0, moves: level.moves, cascade: 0,
      goals: level.goals.map((g) => Object.assign({ count: 0 }, g)),
      artifactsLeft: level.artifacts || 0, artifactMax: level.artifactMax || 1,
      sandTotal: 0, level,
    };
    const vines = [];
    for (let y = 0; y < H; y++) {
      s.mask.push([]); s.grid.push([]); s.sand.push([]);
      for (let x = 0; x < W; x++) {
        const ch = rows[y][x];
        s.mask[y].push(ch !== 'x');
        let sand = 0;
        if (ch === 's' || ch === 'w') sand = 1;
        if (ch === 'S' || ch === 'W') sand = 2;
        s.sand[y].push(sand);
        s.sandTotal += sand;
        let p = null;
        if (ch === 'r' || ch === 'R' || ch === 'T') p = { id: s.nextId++, kind: 'rock', hp: ch === 'r' ? 1 : ch === 'R' ? 2 : 3 };
        if (ch === 'a') { p = { id: s.nextId++, kind: 'artifact' }; s.artifactsLeft--; }
        if (ch === 'v' || ch === 'w' || ch === 'W') vines.push(y * W + x);
        s.grid[y].push(p);
      }
    }
    if (s.artifactsLeft < 0) s.artifactsLeft = 0;
    // joias sem combinação pronta
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (!s.mask[y][x] || s.grid[y][x]) continue;
      s.grid[y][x] = newGem(s, safeColor(s, x, y));
    }
    for (const k of vines) s.grid[Math.floor(k / W)][k % W].vine = true;
    for (const g of s.goals) if (g.type === 'sand') g.target = s.sandTotal;
    if (!findMove(s)) shuffle(s);
    return s;
  }

  function safeColor(s, x, y) {
    for (let tries = 0; tries < 30; tries++) {
      const c = randInt(s, s.colors);
      if (x >= 2 && colorAt(s, x - 1, y) === c && colorAt(s, x - 2, y) === c) continue;
      if (y >= 2 && colorAt(s, x, y - 1) === c && colorAt(s, x, y - 2) === c) continue;
      return c;
    }
    return randInt(s, s.colors);
  }

  function cloneState(s) {
    const c = Object.assign({}, s);
    c.mask = s.mask; // nunca muda
    c.grid = s.grid.map((row) => row.map((p) => (p ? Object.assign({}, p) : null)));
    c.sand = s.sand.map((row) => row.slice());
    c.goals = s.goals.map((g) => Object.assign({}, g));
    return c;
  }

  // ---------- consultas ----------
  const inside = (s, x, y) => x >= 0 && y >= 0 && x < s.W && y < s.H && s.mask[y][x];
  function colorAt(s, x, y) {
    if (!inside(s, x, y)) return -1;
    const p = s.grid[y][x];
    return p && p.kind === 'gem' && p.special !== 'idol' && p.color != null ? p.color : -1;
  }
  const movable = (p) => !!p && p.kind !== 'rock' && !p.vine;
  const swappable = (p) => !!p && (p.kind === 'gem' || p.kind === 'artifact') && !p.vine;
  const isSpecial = (p) => !!p && p.kind === 'gem' && !!p.special;

  function isSpawn(s, x, y) {
    if (!s.mask[y][x]) return false;
    for (let yy = 0; yy < y; yy++) if (s.mask[yy][x]) return false;
    return true;
  }
  function isExit(s, x, y) { return y === s.H - 1 || !s.mask[y + 1][x]; }

  // ---------- combinações ----------
  function findGroups(s) {
    const runs = [];
    for (let y = 0; y < s.H; y++) {
      let x = 0;
      while (x < s.W) {
        const c = colorAt(s, x, y);
        if (c < 0) { x++; continue; }
        let e = x + 1;
        while (e < s.W && colorAt(s, e, y) === c) e++;
        if (e - x >= 3) { const cells = []; for (let i = x; i < e; i++) cells.push([i, y]); runs.push({ dir: 'h', cells, color: c }); }
        x = e;
      }
    }
    for (let x = 0; x < s.W; x++) {
      let y = 0;
      while (y < s.H) {
        const c = colorAt(s, x, y);
        if (c < 0) { y++; continue; }
        let e = y + 1;
        while (e < s.H && colorAt(s, x, e) === c) e++;
        if (e - y >= 3) { const cells = []; for (let i = y; i < e; i++) cells.push([x, i]); runs.push({ dir: 'v', cells, color: c }); }
        y = e;
      }
    }
    if (!runs.length) return [];
    // junta sequências que dividem uma casa (L e T)
    const parent = runs.map((_, i) => i);
    const find = (i) => (parent[i] === i ? i : (parent[i] = find(parent[i])));
    const owner = new Map();
    runs.forEach((r, i) => r.cells.forEach(([x, y]) => {
      const k = y * s.W + x;
      if (owner.has(k)) parent[find(i)] = find(owner.get(k)); else owner.set(k, i);
    }));
    const byRoot = new Map();
    runs.forEach((r, i) => {
      const k = find(i);
      if (!byRoot.has(k)) byRoot.set(k, { runs: [], cells: [], keys: new Set(), color: r.color });
      const g = byRoot.get(k);
      g.runs.push(r);
      for (const [x, y] of r.cells) { const ck = y * s.W + x; if (!g.keys.has(ck)) { g.keys.add(ck); g.cells.push([x, y]); } }
    });
    return [...byRoot.values()];
  }

  function groupSpecial(g) {
    let longest = g.runs[0], h = false, v = false;
    for (const r of g.runs) {
      if (r.cells.length > longest.cells.length) longest = r;
      if (r.dir === 'h') h = true; else v = true;
    }
    const n = longest.cells.length;
    if (n >= 5) return { type: 'idol', run: longest };
    if (h && v) return { type: 'barrel' };
    if (n === 4) return { type: longest.dir === 'h' ? 'lineV' : 'lineH', run: longest };
    return null;
  }

  function specialSpot(s, g, sp, prefer) {
    const ok = ([x, y]) => { const p = s.grid[y][x]; return p && !p.vine && !p.special; };
    if (prefer) for (const [px, py] of prefer) {
      const c = g.cells.find(([x, y]) => x === px && y === py);
      if (c && ok(c)) return c;
    }
    if (sp.type === 'barrel') {
      const hk = new Set(), both = [];
      for (const r of g.runs) if (r.dir === 'h') r.cells.forEach(([x, y]) => hk.add(y * s.W + x));
      for (const r of g.runs) if (r.dir === 'v') r.cells.forEach((c) => { if (hk.has(c[1] * s.W + c[0])) both.push(c); });
      const c = both.find(ok); if (c) return c;
    } else if (sp.run) {
      const c = sp.run.cells[Math.floor(sp.run.cells.length / 2)];
      if (ok(c)) return c;
    }
    return g.cells.find(ok) || null;
  }

  // ---------- áreas dos especiais ----------
  function specialArea(s, p, x, y) {
    const out = [];
    if (p.special === 'lineH') for (let i = 0; i < s.W; i++) out.push([i, y]);
    else if (p.special === 'lineV') for (let i = 0; i < s.H; i++) out.push([x, i]);
    else if (p.special === 'barrel') for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) out.push([x + dx, y + dy]);
    else if (p.special === 'idol') {
      const c = p.target != null ? p.target : commonColor(s);
      for (let yy = 0; yy < s.H; yy++) for (let xx = 0; xx < s.W; xx++) if (colorAt(s, xx, yy) === c) out.push([xx, yy]);
    }
    return out;
  }
  function commonColor(s) {
    const n = new Array(s.colors).fill(0);
    for (let y = 0; y < s.H; y++) for (let x = 0; x < s.W; x++) { const c = colorAt(s, x, y); if (c >= 0) n[c]++; }
    let best = 0; for (let i = 1; i < n.length; i++) if (n[i] > n[best]) best = i;
    return best;
  }

  // ---------- metas ----------
  function bump(s, type, color) {
    for (const g of s.goals) {
      if (g.type !== type) continue;
      if (type === 'collect' && g.color !== color) continue;
      g.count++;
    }
  }
  function sandLeft(s) { let n = 0; for (const row of s.sand) for (const v of row) n += v; return n; }
  function goalDone(s, g) {
    if (g.type === 'score') return s.score >= g.target;
    if (g.type === 'sand') return sandLeft(s) === 0;
    return g.count >= g.target;
  }
  function isWon(s) { return s.goals.every((g) => goalDone(s, g)); }

  // ---------- acertos (combinação, explosão) ----------
  // hits: [{x,y,src:'match'|'blast'}]. Cada casa leva no máximo 1 acerto por chamada.
  function applyHits(s, hits, creates) {
    const done = new Set();
    const res = { removed: [], sand: [], rocks: [], vines: [], blasts: [], created: [], score: 0 };
    const mult = Math.max(1, s.cascade);
    let cur = hits, wave = 0;
    while (cur.length) {
      const next = [];
      for (const h of cur) {
        const { x, y } = h;
        if (!inside(s, x, y)) continue;
        const k = y * s.W + x;
        if (done.has(k)) continue;
        done.add(k);
        const p = s.grid[y][x];
        if (p && p.kind === 'rock') {
          p.hp--;
          const dead = p.hp <= 0;
          res.rocks.push({ x, y, p, dead, wave });
          if (dead) { s.grid[y][x] = null; bump(s, 'rock'); res.score += SCORE.rock; }
          continue;
        }
        if (p && p.kind === 'artifact') continue;
        if (p && p.vine) {
          p.vine = false; bump(s, 'vine'); res.score += SCORE.vine;
          res.vines.push({ x, y, wave });
          continue;
        }
        if (s.sand[y][x] > 0) { s.sand[y][x]--; res.sand.push({ x, y, left: s.sand[y][x], wave }); res.score += SCORE.sand; }
        if (!p) continue;
        if (p.special) {
          const area = specialArea(s, p, x, y);
          res.blasts.push({ x, y, special: p.special, color: p.color, wave, area, second: p.armed });
          res.score += SCORE[p.special === 'lineH' || p.special === 'lineV' ? 'line' : p.special];
          for (const [ax, ay] of area) next.push({ x: ax, y: ay, src: 'blast' });
          if (p.special === 'barrel' && !p.armed) { p.armed = true; continue; } // fica e explode de novo depois
        }
        if (h.src === 'match') {
          for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const q = inside(s, x + dx, y + dy) && s.grid[y + dy][x + dx];
            if (q && q.kind === 'rock') next.push({ x: x + dx, y: y + dy, src: 'adj' });
          }
        }
        s.grid[y][x] = null;
        res.removed.push({ piece: p, x, y, wave });
        if (p.color != null) bump(s, 'collect', p.color);
        res.score += SCORE.gem * mult;
      }
      cur = next; wave++;
    }
    for (const c of creates || []) {
      if (!inside(s, c.x, c.y) || s.grid[c.y][c.x]) continue;
      const p = newGem(s, c.special === 'idol' ? null : c.color, c.special);
      s.grid[c.y][c.x] = p;
      res.created.push({ x: c.x, y: c.y, piece: p });
    }
    res.waves = wave;
    s.score += res.score;
    return res;
  }

  // ---------- gravidade (passo a passo, pra animar) ----------
  function spawnPiece(s) {
    const onBoard = s.artifactsLeft > 0 ? countKind(s, 'artifact') : 0;
    if (s.artifactsLeft > 0 && onBoard < s.artifactMax && rand(s) < (onBoard ? 0.12 : 0.35)) {
      s.artifactsLeft--;
      return { id: s.nextId++, kind: 'artifact' };
    }
    return newGem(s, randInt(s, s.colors));
  }
  function countKind(s, kind) {
    let n = 0;
    for (const row of s.grid) for (const p of row) if (p && p.kind === kind) n++;
    return n;
  }
  function gravityStep(s) {
    const moves = [];
    const moved = new Set();
    const order = s.H & 1 ? [-1, 1] : [1, -1];
    for (let y = s.H - 1; y >= 0; y--) {
      for (let x = 0; x < s.W; x++) {
        if (!s.mask[y][x] || s.grid[y][x]) continue;
        if (y > 0 && s.mask[y - 1][x]) {
          const p = s.grid[y - 1][x];
          if (!p) continue; // a de cima ainda vai encher
          if (movable(p)) {
            if (moved.has(p.id)) continue;
            s.grid[y][x] = p; s.grid[y - 1][x] = null; moved.add(p.id);
            moves.push({ p, fx: x, fy: y - 1, tx: x, ty: y });
            continue;
          }
        } else if (isSpawn(s, x, y)) {
          const p = spawnPiece(s);
          s.grid[y][x] = p; moved.add(p.id);
          moves.push({ p, fx: x, fy: y - 1, tx: x, ty: y, spawn: true });
          continue;
        }
        // em cima está bloqueado: escorrega na diagonal
        for (const dx of order) {
          const nx = x + dx, ny = y - 1;
          if (ny < 0 || !inside(s, nx, ny)) continue;
          const q = s.grid[ny][nx];
          if (!movable(q) || moved.has(q.id)) continue;
          if (s.mask[y][nx] && !s.grid[y][nx]) continue; // ela cai reto na própria coluna
          s.grid[y][x] = q; s.grid[ny][nx] = null; moved.add(q.id);
          moves.push({ p: q, fx: nx, fy: ny, tx: x, ty: y });
          break;
        }
      }
    }
    return moves;
  }
  function gravity(s) {
    const steps = [];
    for (let i = 0; i < 200; i++) {
      const m = gravityStep(s);
      if (!m.length) break;
      steps.push(m);
    }
    return steps;
  }
  function collectArtifacts(s) {
    const out = [];
    for (let y = 0; y < s.H; y++) for (let x = 0; x < s.W; x++) {
      const p = s.grid[y][x];
      if (p && p.kind === 'artifact' && isExit(s, x, y)) {
        s.grid[y][x] = null; bump(s, 'artifact'); s.score += SCORE.artifact;
        out.push({ x, y, piece: p });
      }
    }
    return out;
  }

  // ---------- troca ----------
  function adjacent(a, b) { return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) === 1; }

  // Faz a troca. Devolve null se não vale (e desfaz), ou o "início" pra resolve().
  function doSwap(s, a, b) {
    if (!adjacent(a, b) || !inside(s, a[0], a[1]) || !inside(s, b[0], b[1])) return null;
    const pa = s.grid[a[1]][a[0]], pb = s.grid[b[1]][b[0]];
    if (!swappable(pa) || !swappable(pb)) return null;
    s.grid[a[1]][a[0]] = pb; s.grid[b[1]][b[0]] = pa;
    const start = comboStart(s, pa, pb, a, b);
    if (start) { s.moves--; return start; }
    if (findGroups(s).length || isPush(pa, pb, a, b)) { s.moves--; return { prefer: [b, a] }; }
    s.grid[a[1]][a[0]] = pa; s.grid[b[1]][b[0]] = pb;
    return null;
  }

  // Empurrar o baú uma casa pra baixo sempre vale (gasta movimento), pra ele não travar.
  function isPush(pa, pb, a, b) {
    if (pa.kind === 'artifact' && pb.kind === 'gem' && b[1] === a[1] + 1) return true;
    if (pb.kind === 'artifact' && pa.kind === 'gem' && a[1] === b[1] + 1) return true;
    return false;
  }

  // Combinação de especiais (ou ídolo com qualquer joia). pa agora está em b, pb em a.
  function comboStart(s, pa, pb, a, b) {
    if (pa.kind !== 'gem' || pb.kind !== 'gem') return null;
    const ia = pa.special === 'idol', ib = pb.special === 'idol';
    const [bx, by] = b;
    const all = (fn) => { const out = []; for (let y = 0; y < s.H; y++) for (let x = 0; x < s.W; x++) if (fn(x, y)) out.push({ x, y, src: 'blast' }); return out; };
    const at = (cells) => cells.map(([x, y]) => ({ x, y, src: 'blast' }));
    if (ia && ib) {
      pa.special = pb.special = null;
      return { hits: all((x, y) => inside(s, x, y)), combo: 'idol+idol', at: b };
    }
    if (ia || ib) {
      const idol = ia ? pa : pb, other = ia ? pb : pa;
      const idolCell = ia ? b : a;
      idol.special = null;
      const c = other.color;
      const kind = other.special;
      const cells = [];
      for (let y = 0; y < s.H; y++) for (let x = 0; x < s.W; x++) {
        if (colorAt(s, x, y) !== c) continue;
        const q = s.grid[y][x];
        if (kind === 'lineH' || kind === 'lineV') { q.special = rand(s) < 0.5 ? 'lineH' : 'lineV'; }
        else if (kind === 'barrel') { q.special = 'barrel'; q.armed = false; }
        cells.push([x, y]);
      }
      return { hits: [{ x: idolCell[0], y: idolCell[1], src: 'blast' }].concat(at(cells)), combo: 'idol+' + (kind ? (kind === 'barrel' ? 'barrel' : 'line') : 'gem'), at: idolCell, color: c, converted: kind ? cells : null };
    }
    if (!pa.special || !pb.special) return null;
    const lines = (p) => p.special === 'lineH' || p.special === 'lineV';
    const cells = [];
    let combo;
    if (lines(pa) && lines(pb)) {
      combo = 'line+line';
      for (let i = 0; i < s.W; i++) cells.push([i, by]);
      for (let i = 0; i < s.H; i++) cells.push([bx, i]);
    } else if (pa.special === 'barrel' && pb.special === 'barrel') {
      combo = 'barrel+barrel';
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) cells.push([bx + dx, by + dy]);
    } else {
      combo = 'line+barrel';
      for (let d = -1; d <= 1; d++) {
        for (let i = 0; i < s.W; i++) cells.push([i, by + d]);
        for (let i = 0; i < s.H; i++) cells.push([bx + d, i]);
      }
    }
    pa.special = pb.special = null;
    cells.push(a, b);
    return { hits: at(cells), combo, at: b };
  }

  // ---------- resolução completa (gerador: o jogo anima cada passo) ----------
  function* resolve(s, start) {
    s.cascade = 0;
    let first = start && start.hits ? start : null;
    let prefer = start && start.prefer ? start.prefer : null;
    for (let guard = 0; guard < 60; guard++) {
      let hits, creates = [], kind = 'match';
      if (first) {
        hits = first.hits; kind = 'combo'; first = null;
      } else {
        const groups = findGroups(s);
        if (groups.length) {
          hits = [];
          for (const g of groups) {
            for (const [x, y] of g.cells) hits.push({ x, y, src: 'match' });
            const sp = groupSpecial(g);
            if (sp) {
              const spot = specialSpot(s, g, sp, prefer);
              if (spot) creates.push({ x: spot[0], y: spot[1], special: sp.type, color: g.color });
            }
          }
          prefer = null;
        } else {
          const armed = [];
          for (let y = 0; y < s.H; y++) for (let x = 0; x < s.W; x++) {
            const p = s.grid[y][x];
            if (p && p.special === 'barrel' && p.armed) armed.push({ x, y, src: 'blast' });
          }
          if (!armed.length) break;
          hits = armed; kind = 'armed';
        }
      }
      s.cascade++;
      const res = applyHits(s, hits, creates);
      res.kind = kind; res.cascade = s.cascade;
      yield Object.assign({ type: 'clear' }, res);
      for (let g2 = 0; g2 < 20; g2++) {
        const steps = gravity(s);
        if (steps.length) yield { type: 'fall', steps };
        const col = collectArtifacts(s);
        if (!col.length) break;
        yield { type: 'collect', items: col };
      }
    }
    if (!findMove(s)) { shuffle(s); yield { type: 'shuffle' }; }
  }

  function runAll(gen) { const out = []; for (const e of gen) out.push(e); return out; }

  // ---------- jogadas possíveis ----------
  function matchThrough(s, x, y) {
    const c = colorAt(s, x, y);
    if (c < 0) return false;
    let n = 1;
    for (let i = x - 1; colorAt(s, i, y) === c; i--) n++;
    for (let i = x + 1; colorAt(s, i, y) === c; i++) n++;
    if (n >= 3) return true;
    n = 1;
    for (let i = y - 1; colorAt(s, x, i) === c; i--) n++;
    for (let i = y + 1; colorAt(s, x, i) === c; i++) n++;
    return n >= 3;
  }
  function swapIsValid(s, a, b) {
    const pa = s.grid[a[1]][a[0]], pb = s.grid[b[1]][b[0]];
    if (!swappable(pa) || !swappable(pb)) return false;
    if (pa.kind === 'gem' && pb.kind === 'gem') {
      if (pa.special === 'idol' || pb.special === 'idol') return true;
      if (pa.special && pb.special) return true;
    }
    if (isPush(pa, pb, a, b)) return true;
    s.grid[a[1]][a[0]] = pb; s.grid[b[1]][b[0]] = pa;
    const ok = matchThrough(s, a[0], a[1]) || matchThrough(s, b[0], b[1]);
    s.grid[a[1]][a[0]] = pa; s.grid[b[1]][b[0]] = pb;
    return ok;
  }
  function allMoves(s) {
    const out = [];
    for (let y = 0; y < s.H; y++) for (let x = 0; x < s.W; x++) {
      if (!inside(s, x, y)) continue;
      if (inside(s, x + 1, y) && swapIsValid(s, [x, y], [x + 1, y])) out.push([[x, y], [x + 1, y]]);
      if (inside(s, x, y + 1) && swapIsValid(s, [x, y], [x, y + 1])) out.push([[x, y], [x, y + 1]]);
    }
    return out;
  }
  function findMove(s) {
    for (let y = 0; y < s.H; y++) for (let x = 0; x < s.W; x++) {
      if (!inside(s, x, y)) continue;
      if (inside(s, x + 1, y) && swapIsValid(s, [x, y], [x + 1, y])) return [[x, y], [x + 1, y]];
      if (inside(s, x, y + 1) && swapIsValid(s, [x, y], [x, y + 1])) return [[x, y], [x, y + 1]];
    }
    return null;
  }
  function shuffle(s) {
    const cells = [];
    for (let y = 0; y < s.H; y++) for (let x = 0; x < s.W; x++) {
      const p = s.grid[y][x];
      if (p && p.kind === 'gem' && !p.vine) cells.push([x, y]);
    }
    const pieces = cells.map(([x, y]) => s.grid[y][x]);
    for (let tries = 0; tries < 200; tries++) {
      for (let i = pieces.length - 1; i > 0; i--) { const j = randInt(s, i + 1); [pieces[i], pieces[j]] = [pieces[j], pieces[i]]; }
      cells.forEach(([x, y], i) => { s.grid[y][x] = pieces[i]; });
      if (!findGroups(s).length && findMove(s)) return true;
      if (tries > 100) for (const p of pieces) if (!p.special) p.color = randInt(s, s.colors); // última saída: recolore
    }
    return false;
  }

  // ---------- fim de fase: Corrida do Tesouro ----------
  // Movimentos que sobraram viram dinamites, depois todo especial no tabuleiro explode.
  function* treasureRush(s) {
    while (s.moves > 0) {
      const plain = [];
      for (let y = 0; y < s.H; y++) for (let x = 0; x < s.W; x++) {
        const p = s.grid[y][x];
        if (p && p.kind === 'gem' && !p.special && !p.vine) plain.push([x, y]);
      }
      s.moves--;
      s.score += SCORE.treasure;
      if (!plain.length) continue;
      const [x, y] = plain[randInt(s, plain.length)];
      s.grid[y][x].special = rand(s) < 0.5 ? 'lineH' : 'lineV';
      yield { type: 'convert', x, y, piece: s.grid[y][x] };
    }
    for (let round = 0; round < 8; round++) {
      const hits = [];
      for (let y = 0; y < s.H; y++) for (let x = 0; x < s.W; x++) if (isSpecial(s.grid[y][x])) hits.push({ x, y, src: 'blast' });
      if (!hits.length) break;
      yield* resolve(s, { hits });
    }
  }

  function stars(s) {
    const t = s.level.stars;
    return s.score >= t[2] ? 3 : s.score >= t[1] ? 2 : 1;
  }

  const api = {
    SCORE, GEM_NAMES, rand, createState, cloneState, findGroups, groupSpecial, applyHits, gravity, gravityStep,
    collectArtifacts, doSwap, swapIsValid, resolve, runAll, allMoves, findMove, shuffle, treasureRush,
    isWon, goalDone, sandLeft, stars, colorAt, inside, swappable, isExit,
  };
  root.LR = api;
  if (typeof module !== 'undefined') module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
