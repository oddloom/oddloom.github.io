// Telemetria anônima e leve do Lost Relics.
// Guarda a fila offline e envia em lotes ao mesmo Worker usado pelos recordes.
(function (root) {
  'use strict';
  const API = String(root.LR_TELEMETRY_API || root.LR_RECORDS_API || '').replace(/\/$/, '');
  const STATE_KEY = 'lostrelics.telemetry.v1';
  const CAMPAIGN_KEY = 'lostrelics.campaign.v1';
  const MAX_QUEUE = 120;
  const randomId = () => {
    if (root.crypto && crypto.randomUUID) return crypto.randomUUID();
    const b = new Uint8Array(16);
    if (root.crypto && crypto.getRandomValues) crypto.getRandomValues(b);
    else for (let i = 0; i < b.length; i++) b[i] = Math.floor(Math.random() * 256);
    b[6] = (b[6] & 15) | 64; b[8] = (b[8] & 63) | 128;
    const h = [...b].map((x) => x.toString(16).padStart(2, '0')).join('');
    return h.slice(0, 8) + '-' + h.slice(8, 12) + '-' + h.slice(12, 16) + '-' + h.slice(16, 20) + '-' + h.slice(20);
  };
  const clean = (v, n) => String(v == null ? '' : v).replace(/[<>\u0000-\u001f]/g, '').trim().slice(0, n || 80);
  let stored = { anonId: randomId(), queue: [] };
  try { stored = Object.assign(stored, JSON.parse(localStorage.getItem(STATE_KEY)) || {}); } catch (e) {}
  if (!stored.anonId) stored.anonId = randomId();
  if (!Array.isArray(stored.queue)) stored.queue = [];
  const sessionId = randomId();
  const platform = root.LR_PLATFORM || (root.Capacitor && root.Capacitor.isNativePlatform && root.Capacitor.isNativePlatform() ? 'android' : (root.matchMedia && root.matchMedia('(display-mode: standalone)').matches ? 'pwa' : 'web'));

  const query = new URLSearchParams(location.search);
  let campaign = {};
  try { campaign = JSON.parse(localStorage.getItem(CAMPAIGN_KEY)) || {}; } catch (e) {}
  const incoming = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((k) => {
    if (query.get(k)) incoming[k.slice(4)] = clean(query.get(k), 60);
  });
  if (query.get('ref')) incoming.ref = clean(query.get('ref'), 60);
  if (Object.keys(incoming).length) {
    campaign = Object.assign({ firstAt: new Date().toISOString() }, incoming, { lastAt: new Date().toISOString() });
    try { localStorage.setItem(CAMPAIGN_KEY, JSON.stringify(campaign)); } catch (e) {}
  }

  let timer = 0, sending = false;
  const persist = () => {
    try { localStorage.setItem(STATE_KEY, JSON.stringify({ anonId: stored.anonId, queue: stored.queue.slice(-MAX_QUEUE) })); } catch (e) {}
  };
  const compactParams = (params) => {
    const out = {};
    Object.keys(params || {}).slice(0, 16).forEach((k) => {
      const v = params[k];
      if (typeof v === 'number' && Number.isFinite(v)) out[clean(k, 32)] = v;
      else if (typeof v === 'boolean') out[clean(k, 32)] = v;
      else if (v != null) out[clean(k, 32)] = clean(v, 100);
    });
    return out;
  };
  async function flush(useBeacon) {
    if (!API || sending || !stored.queue.length) return false;
    const batch = stored.queue.slice(0, 20), body = JSON.stringify({ events: batch });
    if (useBeacon && navigator.sendBeacon) {
      const ok = navigator.sendBeacon(API + '/events', new Blob([body], { type: 'application/json' }));
      if (ok) { stored.queue.splice(0, batch.length); persist(); }
      return ok;
    }
    sending = true;
    try {
      const res = await fetch(API + '/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true });
      if (!res.ok) throw new Error('telemetry_' + res.status);
      stored.queue.splice(0, batch.length); persist();
      if (stored.queue.length) setTimeout(() => flush(false), 250);
      return true;
    } catch (e) { return false; }
    finally { sending = false; }
  }
  function event(name, params) {
    if (!/^[a-z][a-z0-9_]{1,39}$/.test(name || '')) return;
    stored.queue.push({
      id: randomId(), name, ts: new Date().toISOString(), anonId: stored.anonId, sessionId,
      platform, lang: clean(root.I18N && I18N.lang || navigator.language || '', 12),
      build: clean(root.LR_BUILD || 'dev', 24), campaign, params: compactParams(params),
    });
    if (stored.queue.length > MAX_QUEUE) stored.queue.splice(0, stored.queue.length - MAX_QUEUE);
    persist();
    clearTimeout(timer); timer = setTimeout(() => flush(false), 1200);
  }

  root.addEventListener('online', () => flush(false));
  root.addEventListener('pagehide', () => flush(true));
  root.addEventListener('error', (e) => event('client_error', { message: e.message, file: (e.filename || '').split('/').pop(), line: e.lineno || 0 }));
  root.addEventListener('unhandledrejection', (e) => event('client_error', { message: e.reason && (e.reason.message || String(e.reason)) }));
  root.Telemetry = { event, flush, getCampaign: () => Object.assign({}, campaign), getAnonId: () => stored.anonId };
  event('session_start', { path: location.pathname, standalone: platform === 'pwa' });
})(window);
