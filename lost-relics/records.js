// Ranking semanal do Lost Relics.
// Sem LR_RECORDS_API funciona localmente; ao ligar o backend, a mesma interface passa a mostrar todos os jogadores.
(function (root) {
  'use strict';
  const KEY = 'lostrelics.records.v1';
  const API = String(root.LR_RECORDS_API || '').replace(/\/$/, '');
  let data = { name: '', playerId: '', token: '', scores: {}, levelScores: {} };
  try { data = Object.assign(data, JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {} };
  const cleanName = (v) => String(v || '').replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 18);

  // Semana começa na segunda, em UTC. O identificador é a data da segunda-feira: não precisa apagar dados antigos.
  function week(date) {
    const d = date ? new Date(date) : new Date(), u = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
    u.setUTCDate(u.getUTCDate() - ((u.getUTCDay() + 6) % 7));
    return u.toISOString().slice(0, 10);
  }
  function setName(v) { data.name = cleanName(v); save(); return data.name; }
  const getName = () => data.name || '';
  const localRows = (w) => Object.values(data.scores[w] || {}).sort((a, b) => b.score - a.score || a.name.localeCompare(b.name)).slice(0, 50);
  const localLevelRows = (w, levelId) => {
    const row = data.levelScores[w] && data.levelScores[w][levelId];
    return row ? [Object.assign({ me: true }, row)] : [];
  };
  // Concentra a competição em poucas fases por semana sem apagar os demais rankings.
  function featured(levelIds, w, count) {
    const list = [...new Set((levelIds || []).map(Number).filter((n) => Number.isInteger(n) && n > 0))];
    let h = 2166136261; const key = 'featured:' + (w || week());
    for (let i = 0; i < key.length; i++) { h ^= key.charCodeAt(i); h = Math.imul(h, 16777619); }
    for (let i = list.length - 1; i > 0; i--) { h = Math.imul(h ^ (h >>> 13), 16777619) >>> 0; const j = h % (i + 1); [list[i], list[j]] = [list[j], list[i]]; }
    return list.slice(0, Math.max(1, Math.min(3, count || 3)));
  }

  async function request(path, options) {
    if (!API) throw new Error('offline');
    const r = await fetch(API + path, Object.assign({ headers: { 'Content-Type': 'application/json' } }, options || {}));
    if (!r.ok) throw new Error('records ' + r.status);
    return r.json();
  }
  async function register() {
    if (!API || (data.playerId && data.token)) return;
    const r = await request('/register', { method: 'POST', body: JSON.stringify({ name: data.name }) });
    data.playerId = r.playerId; data.token = r.token; save();
  }
  async function list(w) {
    const key = w || week();
    if (!API) return localRows(key);
    try { const r = await request('/leaderboard?week=' + encodeURIComponent(key)); return r.rows || []; }
    catch (e) { return localRows(key); }
  }
  async function submit(score, meta) {
    const w = (meta && meta.week) || week(), name = cleanName(data.name);
    if (!name) throw new Error('name');
    data.scores[w] = data.scores[w] || {};
    const old = data.scores[w].me;
    if (!old || score > old.score) data.scores[w].me = { name, score: Math.max(0, Math.floor(score)), me: true };
    save();
    if (API) {
      try {
        await register();
        await request('/score', { method: 'POST', body: JSON.stringify({
          playerId: data.playerId, token: data.token, name, week: w, score: Math.max(0, Math.floor(score)),
          seed: meta && meta.seed, moves: meta && meta.moves, replay: meta && meta.replay, version: 1,
        }) });
      } catch (e) { /* mantém o recorde local e tenta novamente numa próxima partida */ }
    }
    return list(w);
  }
  async function listLevel(levelId, w) {
    const key = w || week(), id = Math.max(1, Math.floor(+levelId || 0));
    if (!API) return localLevelRows(key, id);
    try {
      const r = await request('/level-leaderboard?week=' + encodeURIComponent(key) + '&level=' + id);
      return r.rows || [];
    } catch (e) { return localLevelRows(key, id); }
  }
  async function submitLevel(levelId, score, meta) {
    const w = (meta && meta.week) || week(), id = Math.max(1, Math.floor(+levelId || 0)), name = cleanName(data.name);
    if (!name) throw new Error('name');
    data.levelScores[w] = data.levelScores[w] || {};
    const old = data.levelScores[w][id];
    if (!old || score > old.score) data.levelScores[w][id] = { name, score: Math.max(0, Math.floor(score)), me: true };
    save();
    if (API) {
      try {
        await register();
        await request('/level-score', { method: 'POST', body: JSON.stringify({
          playerId: data.playerId, token: data.token, name, week: w, level: id,
          score: Math.max(0, Math.floor(score)), replay: meta && meta.replay, version: 1,
        }) });
      } catch (e) { /* o melhor placar local continua disponível */ }
    }
    return listLevel(id, w);
  }
  root.Records = { online: !!API, week, getName, setName, list, submit, listLevel, submitLevel, featured };
})(window);
