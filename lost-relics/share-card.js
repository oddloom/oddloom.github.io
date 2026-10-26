// Cartão compartilhável para Jogada do Dia e recordes Difíceis.
(function (root) {
  'use strict';
  const shareUrl = (kind, id) => {
    const base = location.origin + location.pathname;
    const campaign = kind === 'daily' ? 'daily_' + new Date().toISOString().slice(0, 10) : 'hard_weekly';
    const hash = kind === 'daily' ? '#diario' : '#dificil' + id;
    return base + '?utm_source=player_share&utm_medium=organic&utm_campaign=' + encodeURIComponent(campaign) + '&utm_content=' + encodeURIComponent(kind + (id || '')) + hash;
  };
  function wrap(ctx, text, x, y, max, lineHeight) {
    const words = String(text).split(/\s+/), lines = []; let line = '';
    words.forEach((word) => { const next = line ? line + ' ' + word : word; if (ctx.measureText(next).width > max && line) { lines.push(line); line = word; } else line = next; });
    if (line) lines.push(line); lines.slice(0, 3).forEach((l, i) => ctx.fillText(l, x, y + i * lineHeight));
  }
  async function make(options) {
    const c = document.createElement('canvas'); c.width = 1080; c.height = 1350;
    const x = c.getContext('2d'), g = x.createRadialGradient(540, 500, 80, 540, 650, 820);
    g.addColorStop(0, '#17433a'); g.addColorStop(.5, '#111b17'); g.addColorStop(1, '#050706'); x.fillStyle = g; x.fillRect(0, 0, c.width, c.height);
    x.strokeStyle = '#cfa64a'; x.lineWidth = 14; x.strokeRect(42, 42, 996, 1266);
    x.strokeStyle = 'rgba(64,220,205,.45)'; x.lineWidth = 4; x.strokeRect(64, 64, 952, 1222);
    x.textAlign = 'center'; x.fillStyle = '#e8c76b'; x.font = '700 52px Georgia'; x.fillText('LOST RELICS', 540, 150);
    x.fillStyle = '#f6ecd2'; x.font = '700 72px Georgia'; wrap(x, options.title, 540, 295, 870, 82);
    x.fillStyle = '#d7c69d'; x.font = '600 42px system-ui'; wrap(x, options.subtitle || '', 540, 500, 860, 54);
    x.fillStyle = '#54d9c7'; x.font = '900 158px Georgia'; x.fillText(String(options.score || 0), 540, 790);
    x.fillStyle = '#f6ecd2'; x.font = '700 42px system-ui'; x.fillText(options.scoreLabel || 'PONTOS', 540, 860);
    x.fillStyle = '#e8c76b'; x.font = '700 45px system-ui'; wrap(x, options.call || 'CONSEGUE SUPERAR?', 540, 1030, 860, 58);
    x.fillStyle = '#aeb8b1'; x.font = '32px system-ui'; x.fillText('oddloomgames.com/lost-relics', 540, 1220);
    return new Promise((resolve) => c.toBlob(resolve, 'image/png', .92));
  }
  async function share(options) {
    const blob = await make(options), url = shareUrl(options.kind, options.level), text = options.text + ' ' + url;
    const file = new File([blob], 'lost-relics-' + options.kind + '.png', { type: 'image/png' });
    if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
      await navigator.share({ title: 'Lost Relics', text, url, files: [file] }); return 'shared';
    }
    if (navigator.share) { await navigator.share({ title: 'Lost Relics', text, url }); return 'shared'; }
    if (navigator.clipboard) await navigator.clipboard.writeText(text);
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = file.name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    return 'downloaded';
  }
  root.ShareCard = { share, make, shareUrl };
})(window);
