// Exportação/importação portátil do progresso entre navegador, PWA e Android.
(function (root) {
  'use strict';
  const GAME_KEY = 'lostrelics.save.v1', RECORDS_KEY = 'lostrelics.records.v1';
  const enc = new TextEncoder();
  const b64 = (s) => btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const unb64 = (s) => decodeURIComponent(escape(atob(String(s).replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(s.length / 4) * 4, '='))));
  async function digest(text) {
    const buf = await crypto.subtle.digest('SHA-256', enc.encode(text));
    return [...new Uint8Array(buf)].map((x) => x.toString(16).padStart(2, '0')).join('').slice(0, 24);
  }
  const read = (key) => { try { return JSON.parse(localStorage.getItem(key)) || null; } catch (e) { return null; } };
  async function exportCode() {
    const payload = { format: 'lostrelics-save', version: 1, createdAt: new Date().toISOString(), game: read(GAME_KEY), records: read(RECORDS_KEY) };
    const raw = JSON.stringify(payload), checksum = await digest(raw);
    return 'LR1.' + b64(JSON.stringify({ payload, checksum }));
  }
  async function inspect(code) {
    const text = String(code || '').trim();
    if (!text.startsWith('LR1.') || text.length > 150000) throw new Error('invalid');
    let envelope; try { envelope = JSON.parse(unb64(text.slice(4))); } catch (e) { throw new Error('invalid'); }
    const p = envelope && envelope.payload;
    if (!p || p.format !== 'lostrelics-save' || p.version !== 1 || !p.game || typeof p.game !== 'object') throw new Error('invalid');
    if (await digest(JSON.stringify(p)) !== envelope.checksum) throw new Error('checksum');
    const maxLevel = root.LEVELS ? LEVELS.length : 999;
    const unlocked = Math.floor(+p.game.unlocked || 0);
    if (unlocked < 1 || unlocked > maxLevel + 1 || JSON.stringify(p.game).length > 100000) throw new Error('invalid');
    return { payload: p, summary: { unlocked, stars: Object.keys(p.game.stars || {}).length, coins: Math.max(0, Math.floor(+p.game.coins || 0)), createdAt: p.createdAt } };
  }
  async function importCode(code) {
    const checked = await inspect(code), p = checked.payload;
    localStorage.setItem(GAME_KEY, JSON.stringify(p.game));
    if (p.records && typeof p.records === 'object') localStorage.setItem(RECORDS_KEY, JSON.stringify(p.records));
    return checked.summary;
  }
  root.PortableSave = { exportCode, inspect, importCode };
})(window);
