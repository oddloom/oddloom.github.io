// Cartão compartilhável para Jogada do Dia e recordes Difíceis.
(function (root) {
  'use strict';
  // endereço fixo do site: no app Android a página é local (capacitor://localhost) e o link não abria em lugar nenhum
  const SITE = 'https://oddloomgames.com/lost-relics/';
  const isApp = () => !!(root.Capacitor && root.Capacitor.isNativePlatform && root.Capacitor.isNativePlatform());
  // CrazyGames não permite link para fora do portal: lá o compartilhamento vai só com a imagem e o texto
  const isCrazy = () => root.LR_PLATFORM === 'crazygames';
  const shareUrl = (kind, id) => {
    if (isCrazy()) return '';
    const campaign = kind === 'daily' ? 'daily_' + new Date().toISOString().slice(0, 10) : 'hard_weekly';
    const hash = kind === 'daily' ? '#diario' : '#dificil' + id;
    return SITE + '?utm_source=' + (isApp() ? 'android' : 'player_share') + '&utm_medium=organic&utm_campaign=' + encodeURIComponent(campaign) + '&utm_content=' + encodeURIComponent(kind + (id || '')) + hash;
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
    if (!isCrazy()) { x.fillStyle = '#aeb8b1'; x.font = '32px system-ui'; x.fillText('oddloomgames.com/lost-relics', 540, 1220); }
    return new Promise((resolve) => c.toBlob(resolve, 'image/png', .92));
  }
  // 23/11 (testador no Android): o WebView do app não tem navigator.share e o link de download não faz nada, então o
  // botão ficava mudo. Agora: plugin nativo Share do Capacitor (se instalado) > Web Share > copia o texto e avisa.
  const plugin = (name) => (root.Capacitor && root.Capacitor.Plugins && root.Capacitor.Plugins[name]) || null;
  const canceled = (e) => !!e && (e.name === 'AbortError' || /cancel/i.test(String(e.message || e)));
  const blobBase64 = (blob) => new Promise((resolve, reject) => { const r = new FileReader(); r.onload = () => resolve(String(r.result).split(',')[1]); r.onerror = reject; r.readAsDataURL(blob); });
  async function shareNative(blob, name, data) {
    const S = plugin('Share'), FS = plugin('Filesystem');
    if (!S || !S.share) return false;
    if (S.canShare) { try { const r = await S.canShare(); if (r && r.value === false) return false; } catch (e) { return false; } }
    const opts = Object.assign({ dialogTitle: 'Lost Relics' }, data);
    // imagem só se o plugin Filesystem também existir (o Share nativo recebe arquivo pelo caminho, não Blob)
    if (FS && FS.writeFile && blob) {
      try {
        const w = await FS.writeFile({ path: name, data: await blobBase64(blob), directory: 'CACHE' });
        await S.share(Object.assign({ files: [w.uri] }, opts)); return true;
      } catch (e) { if (canceled(e)) throw e; }
    }
    await S.share(opts); return true;
  }
  async function copyText(text) {
    try { if (navigator.clipboard && navigator.clipboard.writeText) { await navigator.clipboard.writeText(text); return true; } } catch (e) {}
    try {
      const t = document.createElement('textarea'); t.value = text; t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
      document.body.appendChild(t); t.select(); const ok = document.execCommand('copy'); t.remove(); return ok;
    } catch (e) { return false; }
  }
  async function share(options) {
    const blob = await make(options), url = shareUrl(options.kind, options.level), text = url ? options.text + ' ' + url : options.text;
    const name = 'lost-relics-' + options.kind + '.png';
    const data = url ? { title: 'Lost Relics', text, url } : { title: 'Lost Relics', text };
    try { if (await shareNative(blob, name, data)) return 'shared'; } catch (e) { if (canceled(e)) throw e; }
    if (navigator.share) {
      try {
        const file = blob && typeof File === 'function' ? new File([blob], name, { type: 'image/png' }) : null;
        if (file && (!navigator.canShare || navigator.canShare({ files: [file] }))) { await navigator.share(Object.assign({ files: [file] }, data)); return 'shared'; }
      } catch (e) { if (canceled(e)) throw e; }
      try { await navigator.share(data); return 'shared'; } catch (e) { if (canceled(e)) throw e; }
    }
    // sem compartilhamento: copia o texto (o jogo mostra "Texto copiado!"); no navegador também baixa a imagem
    const copied = await copyText(text);
    if (!isApp() && blob) { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); }
    if (copied) return 'copied';
    // último recurso: mostra o texto selecionável pra copiar na mão
    try { root.prompt(options.copyHint || 'Lost Relics', text); } catch (e) {}
    return 'manual';
  }
  root.ShareCard = { share, make, shareUrl };
})(window);
