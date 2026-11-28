// Rivais do jogo (28/11): desafios criados pelo jogo para o ranking não abrir vazio. NÃO são pessoas.
// Só existem na hora de exibir: nada vai para o servidor, save, nuvem ou estatísticas, e não entram na
// numeração, nas medalhas nem nos pontos de quem é real. A tela sempre mostra o selo "Rival".
(function (root) {
  'use strict';
  const EXIT_AT = 11; // com 11 jogadores reais num ranking, os rivais saem DAQUELE ranking
  const PER_BOARD = 6;

  // permanentes (lista de pontos e ranking "total" de cada fase). Os pontos são a meta de cada rival.
  const FIXED = [
    ['JadeRush', 'temple:1', 24], ['ReiDoRubi', 'gold:0', 19], ['LuaDourada', 'gold:3', 16], ['MestreMaia', 'obsidian:4', 13],
    ['TucanoZen', 'solar:2', 10], ['PedraSolar', 'solar:0', 8], ['CipoVeloz', 'obsidian:1', 5], ['NinaCombo', 'temple:5', 3],
  ].map(([name, avatar, points], id) => ({ id, name, avatar, points, rival: true }));
  // semanais: o sorteio muda toda segunda-feira
  const WEEKLY = ['AstroInca', 'SapoSortudo', 'VulcaoAzul', 'Safirinha', 'TrilhaKuka', 'GemaTurbo', 'RaioDeJade', 'TemploVivo',
    'MicoDasRuinas', 'NoiteDeOnix', 'FolhaMagica', 'Topazito', 'SolPoente', 'IdoloRisonho', 'BrilhoRaro', 'PassoDeOnca'];
  // desafio semanal de 20 jogadas (metas de estrela 8000/16000/24000 no jogo)
  const WEEKLY_CHALLENGE = [6000, 15000];

  function random(key) {
    let h = 2166136261;
    for (let i = 0; i < key.length; i++) { h ^= key.charCodeAt(i); h = Math.imul(h, 16777619); }
    let a = h >>> 0;
    return () => {
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function pick(list, n, rnd) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a.slice(0, n);
  }
  // faixa de placar pelas metas de estrela da própria fase: alcançável (nunca perto do teto de 3 estrelas)
  function range(kind, stars) {
    if (kind === 'weekly') return WEEKLY_CHALLENGE;
    const [one, two, three] = stars;
    return kind === 'level-week'
      ? [one * 1.05, one + (two - one) * 0.8]
      : [one + (two - one) * 0.45, two + (three - two) * 0.3];
  }
  function scores(lo, hi, n, rnd) {
    const step = (hi - lo) / n;
    // um placar por faixa, do maior para o menor, sem empate
    return Array.from({ length: n }, (_, i) => Math.round((hi - step * (i + 0.15 + rnd() * 0.7)) / 10) * 10);
  }
  // opts: { kind: 'level-week' | 'level-all' | 'weekly', level, week, stars }
  function lineup(opts) {
    const permanent = opts.kind === 'level-all';
    const rnd = random(['rivals', opts.kind, opts.level || '', permanent ? '' : opts.week].join(':'));
    const who = permanent ? pick(FIXED, PER_BOARD, rnd)
      : pick(WEEKLY, PER_BOARD, rnd).map((name) => ({ name }));
    const [lo, hi] = range(opts.kind, opts.stars);
    const values = scores(lo, hi, who.length, rnd);
    return who.map((r, i) => ({ id: r.id, name: r.name, score: values[i], rival: true }));
  }

  const fold = (s) => String(s || '').trim().toLowerCase();
  const without = (list, realRows) => {
    const taken = new Set((realRows || []).map((r) => fold(r.name)));
    return list.filter((r) => !taken.has(fold(r.name)));
  };
  // ranking de placar. Sem resposta do servidor (offline) não dá para saber quantos reais há: não mostra rival.
  function forBoard(realRows, opts) {
    if (!Array.isArray(realRows) || realRows.offline || realRows.length >= EXIT_AT) return [];
    return without(lineup(opts), realRows);
  }
  // ranking permanente de pontos. O servidor manda só os 10 primeiros: o total vem em rows.players.
  // Servidor sem esse campo: com menos de 10 linhas o total é conhecido; com 10, não é (lista cheia, sem rival).
  function forChampions(realRows) {
    if (!Array.isArray(realRows)) return [];
    const total = Number.isInteger(realRows.players) ? realRows.players : (realRows.length < 10 ? realRows.length : null);
    if (total === null || total >= EXIT_AT) return [];
    return without(FIXED, realRows).map((r) => Object.assign({}, r));
  }
  // perfil do rival: placares dele no ranking "total" das fases que ESTE jogador já alcançou
  function challenges(id, levels, unlocked, max) {
    const out = [];
    for (let i = levels.length - 1; i >= 0 && out.length < (max || 8); i--) {
      const L = levels[i];
      if (L.id > unlocked) continue;
      const row = lineup({ kind: 'level-all', level: L.id, stars: L.stars }).find((r) => r.id === id);
      if (row) out.push({ level: L.id, score: row.score });
    }
    return out.reverse();
  }

  const api = { EXIT_AT, PER_BOARD, FIXED, WEEKLY, lineup, forBoard, forChampions, challenges };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.LRRivals = api;
})(typeof window !== 'undefined' ? window : globalThis);
