// Lost Relics — arte desenhada em código (sem imagens).
// Cada peça é desenhada uma vez num canvas pequeno (sprite) e depois só copiada na tela.
// THEME: tudo que é visual do mundo fica aqui (pra trocar de pele no futuro, ex.: Sushi Mania).
(function (root) {
  'use strict';

  const GEMS = [
    { key: 'ruby', h: 350, s: 82, l: 42, shape: 'oval', style: 'brilliant' },
    { key: 'emerald', h: 150, s: 72, l: 33, shape: 'emerald', style: 'step' },
    { key: 'sapphire', h: 218, s: 82, l: 43, shape: 'trillion', style: 'brilliant' },
    { key: 'topaz', h: 43, s: 96, l: 51, shape: 'pear', style: 'brilliant' },
    { key: 'amethyst', h: 280, s: 56, l: 47, shape: 'losango', style: 'brilliant' },
    { key: 'diamond', h: 205, s: 14, l: 68, shape: 'round', style: 'brilliant', fire: true },
  ];
  const LIGHT = (() => { const x = -0.6, y = -0.8, n = Math.hypot(x, y); return [x / n, y / n]; })();

  const hsl = (h, s, l, a) => 'hsla(' + h + ',' + Math.max(0, Math.min(100, s)) + '%,' + Math.max(0, Math.min(100, l)) + '%,' + (a == null ? 1 : a) + ')';
  const jitter = (i) => (((i * 9301 + 49297) % 233280) / 233280) * 2 - 1;

  function mkCanvas(w, h) {
    const c = document.createElement('canvas');
    c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h || w));
    return c;
  }
  function path(ctx, P) {
    ctx.beginPath();
    ctx.moveTo(P[0][0], P[0][1]);
    for (let i = 1; i < P.length; i++) ctx.lineTo(P[i][0], P[i][1]);
    ctx.closePath();
  }

  // ---------- contornos (lapidações), raio ~1 ----------
  function outline(shape) {
    const P = [];
    if (shape === 'oval') for (let i = 0; i < 20; i++) { const a = -Math.PI / 2 + (i / 20) * Math.PI * 2; P.push([Math.cos(a) * 0.74, Math.sin(a) * 0.94]); }
    if (shape === 'round') for (let i = 0; i < 16; i++) { const a = -Math.PI / 2 + (i / 16) * Math.PI * 2; P.push([Math.cos(a) * 0.9, Math.sin(a) * 0.9]); }
    if (shape === 'emerald') { const w = 0.7, h = 0.93, c = 0.24; P.push([-w + c, -h], [w - c, -h], [w, -h + c], [w, h - c], [w - c, h], [-w + c, h], [-w, h - c], [-w, -h + c]); }
    if (shape === 'trillion') {
      const R = 1.08, shift = 0.25;
      const V = [0, 1, 2].map((k) => { const a = -Math.PI / 2 + (k * Math.PI * 2) / 3; return [Math.cos(a) * R, Math.sin(a) * R + shift]; });
      for (let k = 0; k < 3; k++) {
        const A = V[k], B = V[(k + 1) % 3];
        const mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2 - shift, ml = Math.hypot(mx, my);
        for (let j = 0; j < 5; j++) {
          const t = j / 5, b = Math.sin(Math.PI * t) * 0.17;
          P.push([A[0] + (B[0] - A[0]) * t + (mx / ml) * b, A[1] + (B[1] - A[1]) * t + (my / ml) * b]);
        }
      }
    }
    if (shape === 'pear') for (let i = 0; i < 24; i++) { const t = (i / 24) * Math.PI * 2; P.push([Math.sin(t) * Math.sin(t / 2) * 1.08, -Math.cos(t) * 0.94]); }
    if (shape === 'losango') {
      const V = [[0, -0.98], [0.8, 0], [0, 0.98], [-0.8, 0]];
      for (let k = 0; k < 4; k++) { const A = V[k], B = V[(k + 1) % 4]; for (let j = 0; j < 3; j++) { const t = j / 3; P.push([A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t]); } }
    }
    return P;
  }

  function facetFill(g, pts, i, kind, R) {
    let cx = 0, cy = 0;
    for (const p of pts) { cx += p[0]; cy += p[1]; }
    cx /= pts.length; cy /= pts.length;
    const len = Math.hypot(cx, cy);
    const d = len > 0.001 ? (cx / len) * LIGHT[0] + (cy / len) * LIGHT[1] : 0;
    const reach = Math.min(1, len / (R * 0.6));
    let l = g.l + d * 34 * reach + (kind === 'A' ? 10 : kind === 'B' ? -8 : 0) + jitter(i + (kind === 'A' ? 0 : 50)) * 9;
    if (d < -0.45 && i % 3 === 0) l += 30; // reflexo interno do lado de baixo (o que faz joia "acender")
    let h = g.h, s = g.s;
    if (g.fire && (i * 7 + (kind === 'A' ? 0 : 3)) % 5 === 0) { h = (i * 67 + (kind === 'A' ? 0 : 140)) % 360; s = 75; l = Math.max(l, 66); }
    return hsl(h, s, l);
  }

  function drawFacet(ctx, pts, fill, R) {
    path(ctx, pts);
    ctx.fillStyle = fill; ctx.fill();
    ctx.lineWidth = Math.max(0.6, R * 0.014);
    ctx.strokeStyle = 'rgba(255,255,255,0.16)';
    ctx.stroke();
  }

  function sparkle(ctx, x, y, r, a) {
    ctx.save();
    ctx.globalAlpha = a;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(x, y - r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.quadraticCurveTo(x, y, x, y + r);
    ctx.quadraticCurveTo(x, y, x - r, y); ctx.quadraticCurveTo(x, y, x, y - r);
    ctx.fill();
    const gl = ctx.createRadialGradient(x, y, 0, x, y, r * 0.8);
    gl.addColorStop(0, 'rgba(255,255,255,0.9)'); gl.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(x, y, r * 0.8, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  // Joia centrada em (0,0) com raio R
  function drawGem(ctx, g, R) {
    const P = outline(g.shape).map(([x, y]) => [x * R, y * R]);
    const n = P.length;
    // sombra
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = R * 0.22; ctx.shadowOffsetY = R * 0.13;
    path(ctx, P); ctx.fillStyle = hsl(g.h, g.s, g.l - 20); ctx.fill();
    ctx.restore();

    ctx.save();
    path(ctx, P); ctx.clip();
    let T;
    if (g.style === 'step') {
      const rings = [1, 0.8, 0.62, 0.46];
      for (let r = 0; r < 3; r++) {
        const A = P.map(([x, y]) => [x * rings[r], y * rings[r]]);
        const B = P.map(([x, y]) => [x * rings[r + 1], y * rings[r + 1]]);
        for (let i = 0; i < n; i++) {
          const j = (i + 1) % n;
          drawFacet(ctx, [A[i], A[j], B[j], B[i]], facetFill(g, [A[i], A[j]], i + r * 11, r % 2 ? 'B' : 'A', R), R);
        }
      }
      T = P.map(([x, y]) => [x * rings[3], y * rings[3]]);
    } else {
      const k = 0.44;
      T = P.map((p, i) => { const q = P[(i + 1) % n]; return [((p[0] + q[0]) / 2) * k, ((p[1] + q[1]) / 2) * k]; });
      for (let i = 0; i < n; i++) {
        const j = (i + 1) % n, h = (i - 1 + n) % n;
        drawFacet(ctx, [P[i], P[j], T[i]], facetFill(g, [P[i], P[j], T[i]], i, 'A', R), R);
        drawFacet(ctx, [T[h], P[i], T[i]], facetFill(g, [T[h], P[i], T[i]], i, 'B', R), R);
      }
    }
    // mesa (a face de cima)
    const tg = ctx.createLinearGradient(-R * 0.45, -R * 0.5, R * 0.45, R * 0.5);
    tg.addColorStop(0, hsl(g.h, g.s - 5, g.l + 26));
    tg.addColorStop(0.55, hsl(g.h, g.s, g.l + 6));
    tg.addColorStop(1, hsl(g.h, g.s, g.l - 6));
    path(ctx, T); ctx.fillStyle = tg; ctx.fill();
    ctx.lineWidth = Math.max(0.6, R * 0.02); ctx.strokeStyle = 'rgba(255,255,255,0.32)'; ctx.stroke();
    // reflexo da mesa
    ctx.save(); path(ctx, T); ctx.clip();
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.beginPath(); ctx.moveTo(-R, -R * 0.15); ctx.lineTo(R * 0.15, -R); ctx.lineTo(R * 0.4, -R); ctx.lineTo(-R, R * 0.1); ctx.closePath(); ctx.fill();
    ctx.restore();
    // brilho geral e luz que volta por baixo
    let gl = ctx.createRadialGradient(-R * 0.38, -R * 0.48, 0, -R * 0.38, -R * 0.48, R * 0.95);
    gl.addColorStop(0, 'rgba(255,255,255,0.42)'); gl.addColorStop(0.45, 'rgba(255,255,255,0.07)'); gl.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gl; ctx.fillRect(-R * 1.2, -R * 1.2, R * 2.4, R * 2.4);
    gl = ctx.createRadialGradient(R * 0.25, R * 0.55, 0, R * 0.25, R * 0.55, R * 0.7);
    gl.addColorStop(0, hsl(g.h, g.s, g.l + 34, 0.38)); gl.addColorStop(1, hsl(g.h, g.s, g.l + 34, 0));
    ctx.fillStyle = gl; ctx.fillRect(-R * 1.2, -R * 1.2, R * 2.4, R * 2.4);
    ctx.restore();
    // aro
    path(ctx, P);
    ctx.lineWidth = Math.max(1, R * 0.055); ctx.strokeStyle = hsl(g.h, g.s + 4, g.l - 24); ctx.stroke();
    const P2 = P.map(([x, y]) => [x * 0.95, y * 0.95]);
    path(ctx, P2); ctx.lineWidth = Math.max(0.5, R * 0.02); ctx.strokeStyle = 'rgba(255,255,255,0.22)'; ctx.stroke();
    sparkle(ctx, -R * 0.3, -R * 0.42, R * 0.2, 0.9);
  }

  // ---------- arte de IA (art-data.js): joias e fundo. Se não existir, usa a arte desenhada aqui ----------
  const AI = { gems: {}, pieces: {}, ui: {}, bg: null, board: null, ready: false };
  function loadAI(onReady) {
    const D = root.ART_DATA;
    if (!D) { if (onReady) onReady(); return; }
    let left = 0;
    const done = () => { if (--left === 0) { AI.ready = true; if (onReady) onReady(); } };
    // src pode ser uma URL simples ou { c: JPEG da cor, a: PNG cinza da transparência } (junta as duas num canvas)
    const load = (src, set) => {
      left++;
      if (typeof src === 'string') { const im = new Image(); im.onload = () => { set(im); done(); }; im.onerror = done; im.src = src; return; }
      const c = new Image(), a = new Image(); let got = 0;
      const join = () => {
        if (++got < 2) return;
        const w = c.naturalWidth, h = c.naturalHeight, cv = mkCanvas(w, h), x = cv.getContext('2d', { willReadFrequently: true });
        x.drawImage(a, 0, 0, w, h);
        const m = x.getImageData(0, 0, w, h);
        x.clearRect(0, 0, w, h); x.drawImage(c, 0, 0);
        const p = x.getImageData(0, 0, w, h);
        for (let i = 0; i < p.data.length; i += 4) p.data[i + 3] = m.data[i];
        x.putImageData(p, 0, 0);
        set(cv); done();
      };
      c.onload = a.onload = join; c.onerror = a.onerror = done;
      c.src = src.c; a.src = src.a;
    };
    for (const k in D.gems) load(D.gems[k], (im) => { AI.gems[k] = im; });
    for (const k in D.pieces || {}) load(D.pieces[k], (im) => { AI.pieces[k] = im; });
    for (const k in D.ui || {}) load(D.ui[k], (im) => { AI.ui[k] = im; });
    if (D.bg) load(D.bg, (im) => { AI.bg = im; });
    if (D.board) load(D.board, (im) => { AI.board = im; });
    if (!left) { AI.ready = true; if (onReady) onReady(); }
  }

  // joia: imagem da IA > 3D (gems3d.js) > 2D desenhada aqui
  function paintGem(ctx, g, R, f) {
    const ai = AI.gems[g.key];
    if (ai) {
      ctx.save();
      const sh = ctx.createRadialGradient(0, R * 0.72, 0, 0, R * 0.72, R * 0.9);
      sh.addColorStop(0, 'rgba(0,0,0,0.5)'); sh.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = sh; ctx.beginPath(); ctx.ellipse(0, R * 0.8, R * 0.85, R * 0.28, 0, 0, Math.PI * 2); ctx.fill();
      ctx.drawImage(ai, -R * 1.42, -R * 1.42, R * 2.84, R * 2.84);
      ctx.restore();
      return;
    }    const img = root.GEM3D && root.GEM3D.image(g.key, f);
    if (!img) return drawGem(ctx, g, R);
    ctx.save();
    // aura da cor da pedra (luz que ela "emite")
    const au = ctx.createRadialGradient(0, 0, R * 0.2, 0, 0, R * 1.18);
    au.addColorStop(0, hsl(g.h, Math.min(100, g.s + 10), Math.min(70, g.l + 18), g.key === 'diamond' ? 0.22 : 0.3)); au.addColorStop(1, hsl(g.h, g.s, g.l, 0));
    ctx.fillStyle = au; ctx.fillRect(-R * 1.25, -R * 1.25, R * 2.5, R * 2.5);
    const sh = ctx.createRadialGradient(0, R * 0.7, 0, 0, R * 0.7, R * 0.95);
    sh.addColorStop(0, 'rgba(0,0,0,0.55)'); sh.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = sh; ctx.beginPath(); ctx.ellipse(0, R * 0.78, R * 0.9, R * 0.32, 0, 0, Math.PI * 2); ctx.fill();
    ctx.drawImage(img, -R * 1.5, -R * 1.5, R * 3, R * 3);
    ctx.restore();
  }
  // ---------- especiais e peças ----------
  function drawDynamite(ctx, S, vertical) {
    ctx.save();
    if (vertical) ctx.rotate(Math.PI / 2);
    const x0 = -S * 0.47, x1 = S * 0.36, h = S * 0.25;
    const g = ctx.createLinearGradient(0, -h / 2, 0, h / 2);
    g.addColorStop(0, '#ff7a55'); g.addColorStop(0.35, '#d8321c'); g.addColorStop(1, '#6d0d06');
    ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = S * 0.06; ctx.shadowOffsetY = S * 0.03;
    roundRect(ctx, x0, -h / 2, x1 - x0, h, h / 2); ctx.fillStyle = g; ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = 'rgba(243,217,164,0.9)';
    for (const bx of [-0.32, 0.2]) ctx.fillRect(S * bx, -h / 2, S * 0.07, h);
    ctx.strokeStyle = '#3b2a1a'; ctx.lineWidth = Math.max(1, S * 0.03);
    ctx.beginPath(); ctx.moveTo(x1 - 1, 0); ctx.quadraticCurveTo(x1 + S * 0.06, -S * 0.08, x1 + S * 0.11, -S * 0.02); ctx.stroke();
    ctx.restore();
  }
  // posição da faísca (ponta do pavio) pra animar
  function fusePoint(S, vertical) { const x = S * 0.47, y = -S * 0.02; return vertical ? [-y, x] : [x, y]; }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }

  function drawBarrel(ctx, S, g) {
    const w = S * 0.72, h = S * 0.84;
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = S * 0.08; ctx.shadowOffsetY = S * 0.05;
    ctx.beginPath();
    ctx.moveTo(-w * 0.4, -h / 2);
    ctx.quadraticCurveTo(-w * 0.62, 0, -w * 0.4, h / 2);
    ctx.lineTo(w * 0.4, h / 2);
    ctx.quadraticCurveTo(w * 0.62, 0, w * 0.4, -h / 2);
    ctx.closePath();
    const wg = ctx.createLinearGradient(-w / 2, 0, w / 2, 0);
    wg.addColorStop(0, '#4a2a10'); wg.addColorStop(0.4, '#a8662c'); wg.addColorStop(0.6, '#94571f'); wg.addColorStop(1, '#3d220c');
    ctx.fillStyle = wg; ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.save(); ctx.clip();
    ctx.strokeStyle = 'rgba(0,0,0,0.28)'; ctx.lineWidth = Math.max(1, S * 0.012);
    for (const sx of [-0.2, 0, 0.2]) { ctx.beginPath(); ctx.moveTo(S * sx * 0.9, -h / 2); ctx.quadraticCurveTo(S * sx * 1.25, 0, S * sx * 0.9, h / 2); ctx.stroke(); }
    for (const hy of [-0.27, 0.27]) {
      const hg = ctx.createLinearGradient(0, S * hy - S * 0.04, 0, S * hy + S * 0.04);
      hg.addColorStop(0, hsl(g.h, g.s * 0.5, 70)); hg.addColorStop(0.5, hsl(g.h, g.s * 0.7, 42)); hg.addColorStop(1, hsl(g.h, g.s * 0.7, 22));
      ctx.fillStyle = hg; ctx.fillRect(-w, S * hy - S * 0.045, w * 2, S * 0.09);
    }
    ctx.restore();
    ctx.beginPath(); ctx.ellipse(0, -h / 2, w * 0.4, S * 0.05, 0, 0, Math.PI * 2); ctx.fillStyle = '#2a1607'; ctx.fill();
    ctx.restore();
  }

  function drawIdol(ctx, S) {
    ctx.save();
    const halo = ctx.createRadialGradient(0, 0, S * 0.1, 0, 0, S * 0.5);
    halo.addColorStop(0, 'rgba(255,220,120,0.55)'); halo.addColorStop(1, 'rgba(255,200,80,0)');
    ctx.fillStyle = halo; ctx.fillRect(-S / 2, -S / 2, S, S);
    const gold = ctx.createRadialGradient(-S * 0.12, -S * 0.2, S * 0.02, 0, 0, S * 0.45);
    gold.addColorStop(0, '#fff4c2'); gold.addColorStop(0.35, '#f5c94f'); gold.addColorStop(0.8, '#b67b14'); gold.addColorStop(1, '#6e4708');
    ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = S * 0.08; ctx.shadowOffsetY = S * 0.05;
    ctx.beginPath();
    ctx.moveTo(-S * 0.3, -S * 0.12);
    ctx.bezierCurveTo(-S * 0.32, -S * 0.46, S * 0.32, -S * 0.46, S * 0.3, -S * 0.12);
    ctx.lineTo(S * 0.26, S * 0.2);
    ctx.quadraticCurveTo(S * 0.2, S * 0.42, 0, S * 0.43);
    ctx.quadraticCurveTo(-S * 0.2, S * 0.42, -S * 0.26, S * 0.2);
    ctx.closePath();
    ctx.fillStyle = gold; ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.lineWidth = Math.max(1, S * 0.02); ctx.strokeStyle = '#6b470a'; ctx.stroke();
    // orelhas
    for (const sx of [-1, 1]) { roundRect(ctx, sx * S * 0.3 - S * 0.05, -S * 0.08, S * 0.1, S * 0.22, S * 0.04); ctx.fillStyle = '#c99027'; ctx.fill(); ctx.stroke(); }
    // faixa da testa
    ctx.fillStyle = 'rgba(110,70,8,0.55)'; ctx.fillRect(-S * 0.28, -S * 0.2, S * 0.56, S * 0.05);
    ctx.fillStyle = 'rgba(255,240,190,0.6)'; for (let i = -2; i <= 2; i++) ctx.fillRect(i * S * 0.1 - S * 0.015, -S * 0.2, S * 0.03, S * 0.05);
    // olhos
    for (const sx of [-1, 1]) {
      ctx.beginPath(); ctx.ellipse(sx * S * 0.12, -S * 0.04, S * 0.075, S * 0.04, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#2b1b05'; ctx.fill();
      ctx.beginPath(); ctx.arc(sx * S * 0.12, -S * 0.04, S * 0.022, 0, Math.PI * 2);
      ctx.fillStyle = '#ff5a3c'; ctx.fill();
    }
    // nariz e boca
    ctx.strokeStyle = 'rgba(90,58,6,0.8)'; ctx.lineWidth = Math.max(1, S * 0.018);
    ctx.beginPath(); ctx.moveTo(0, -S * 0.02); ctx.lineTo(-S * 0.03, S * 0.1); ctx.lineTo(S * 0.03, S * 0.1); ctx.stroke();
    roundRect(ctx, -S * 0.1, S * 0.18, S * 0.2, S * 0.05, S * 0.02); ctx.fillStyle = '#4a2f04'; ctx.fill();
    sparkle(ctx, -S * 0.14, -S * 0.28, S * 0.08, 0.9);
    ctx.restore();
  }

  function drawChest(ctx, S) {
    ctx.save();
    const halo = ctx.createRadialGradient(0, 0, S * 0.1, 0, 0, S * 0.52);
    halo.addColorStop(0, 'rgba(255,214,110,0.45)'); halo.addColorStop(1, 'rgba(255,200,80,0)');
    ctx.fillStyle = halo; ctx.fillRect(-S / 2, -S / 2, S, S);
    const w = S * 0.78, top = -S * 0.06, bh = S * 0.38;
    ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = S * 0.08; ctx.shadowOffsetY = S * 0.05;
    const wood = ctx.createLinearGradient(0, top, 0, top + bh);
    wood.addColorStop(0, '#8a4d1f'); wood.addColorStop(1, '#4a250b');
    roundRect(ctx, -w / 2, top, w, bh, S * 0.04); ctx.fillStyle = wood; ctx.fill();
    ctx.shadowColor = 'transparent';
    // tampa
    ctx.beginPath();
    ctx.moveTo(-w / 2, top);
    ctx.bezierCurveTo(-w / 2, -S * 0.36, w / 2, -S * 0.36, w / 2, top);
    ctx.closePath();
    const lid = ctx.createLinearGradient(0, -S * 0.32, 0, top);
    lid.addColorStop(0, '#b06a2c'); lid.addColorStop(1, '#6a3510');
    ctx.fillStyle = lid; ctx.fill();
    // ferragens douradas
    const gold = ctx.createLinearGradient(0, -S * 0.3, 0, top + bh);
    gold.addColorStop(0, '#fff0b0'); gold.addColorStop(0.5, '#e0a83a'); gold.addColorStop(1, '#8a5a10');
    ctx.fillStyle = gold;
    for (const sx of [-0.27, 0.21]) ctx.fillRect(S * sx, -S * 0.27, S * 0.06, bh + S * 0.21);
    ctx.fillRect(-w / 2, top - S * 0.02, w, S * 0.045);
    roundRect(ctx, -S * 0.07, top - S * 0.03, S * 0.14, S * 0.15, S * 0.03); ctx.fill();
    ctx.fillStyle = '#3a2405'; ctx.beginPath(); ctx.arc(0, top + S * 0.03, S * 0.022, 0, Math.PI * 2); ctx.fill();
    ctx.fillRect(-S * 0.008, top + S * 0.03, S * 0.016, S * 0.05);
    ctx.lineWidth = Math.max(1, S * 0.018); ctx.strokeStyle = '#2e1604';
    roundRect(ctx, -w / 2, top, w, bh, S * 0.04); ctx.stroke();
    sparkle(ctx, -S * 0.2, -S * 0.2, S * 0.07, 0.8);
    ctx.restore();
  }

  // bloco de templo entalhado: bisel nos 4 lados, face com textura, glifo gravado (ouro quando inteiro)
  function drawRock(ctx, S, hp) {
    ctx.save();
    const o = S * 0.45, i = S * 0.33;
    ctx.shadowColor = 'rgba(0,0,0,0.7)'; ctx.shadowBlur = S * 0.1; ctx.shadowOffsetY = S * 0.05;
    roundRect(ctx, -o, -o, o * 2, o * 2, S * 0.06); ctx.fillStyle = '#2a251d'; ctx.fill();
    ctx.shadowColor = 'transparent';
    const tone = hp >= 3 ? 0.75 : hp === 2 ? 0.95 : 1.1;
    const faces = [
      [[-o, -o], [o, -o], [i, -i], [-i, -i], 1.45],
      [[-o, -o], [-i, -i], [-i, i], [-o, o], 1.05],
      [[o, -o], [o, o], [i, i], [i, -i], 0.62],
      [[-o, o], [-i, i], [i, i], [o, o], 0.45],
    ];
    const tex = root.TEX ? root.TEX.get('temple') : null;
    const pat = tex ? ctx.createPattern(tex, 'repeat') : '#6b6454';
    for (const f of faces) {
      ctx.beginPath(); ctx.moveTo(f[0][0], f[0][1]); for (let k = 1; k < 4; k++) ctx.lineTo(f[k][0], f[k][1]); ctx.closePath();
      ctx.fillStyle = pat; ctx.fill();
      const v = f[4] * tone;
      ctx.fillStyle = v > 1 ? 'rgba(255,235,200,' + (v - 1) * 0.5 + ')' : 'rgba(0,0,0,' + (1 - v) * 0.85 + ')';
      ctx.fill();
    }
    ctx.beginPath(); ctx.rect(-i, -i, i * 2, i * 2);
    ctx.fillStyle = pat; ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,' + (hp >= 3 ? 0.35 : hp === 2 ? 0.2 : 0.08) + ')'; ctx.fill();
    // glifo: espiral dentro de moldura
    const glyph = () => {
      ctx.beginPath();
      for (let t = 0; t < 16; t++) { const a = t * 0.55, rr = S * 0.015 + t * S * 0.0135; const x = Math.cos(a) * rr, y = Math.sin(a) * rr; t ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.moveTo(-i * 0.78, -i * 0.78); ctx.lineTo(i * 0.78, -i * 0.78); ctx.lineTo(i * 0.78, i * 0.78); ctx.lineTo(-i * 0.78, i * 0.78); ctx.closePath();
    };
    ctx.lineWidth = Math.max(1, S * 0.028); ctx.lineJoin = 'round';
    ctx.save(); ctx.translate(0, S * 0.012); glyph(); ctx.strokeStyle = 'rgba(255,230,190,0.18)'; ctx.stroke(); ctx.restore();
    glyph(); ctx.strokeStyle = 'rgba(10,8,5,0.8)'; ctx.stroke();
    if (hp >= 3) {
      ctx.save(); ctx.shadowColor = 'rgba(255,200,100,0.8)'; ctx.shadowBlur = S * 0.06;
      glyph(); ctx.lineWidth = Math.max(0.8, S * 0.014); ctx.strokeStyle = '#e8c06a'; ctx.stroke(); ctx.restore();
    }
    if (hp === 1) {
      ctx.strokeStyle = 'rgba(8,6,3,0.9)'; ctx.lineWidth = Math.max(1, S * 0.02);
      ctx.beginPath(); ctx.moveTo(-o * 0.9, -o * 0.35); ctx.lineTo(-o * 0.2, -o * 0.05); ctx.lineTo(-o * 0.35, o * 0.5); ctx.lineTo(-o * 0.1, o * 0.9);
      ctx.moveTo(-o * 0.2, -o * 0.05); ctx.lineTo(o * 0.5, o * 0.12); ctx.lineTo(o * 0.9, o * 0.6); ctx.moveTo(o * 0.5, o * 0.12); ctx.lineTo(o * 0.35, -o * 0.8); ctx.stroke();
      ctx.strokeStyle = 'rgba(255,230,190,0.15)'; ctx.translate(0, 1); ctx.stroke();
    }
    ctx.restore();
  }
  function drawVine(ctx, S) {
    ctx.save();
    const stroke = (pts, w, c) => { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); ctx.bezierCurveTo(pts[1][0], pts[1][1], pts[2][0], pts[2][1], pts[3][0], pts[3][1]); ctx.lineWidth = w; ctx.strokeStyle = c; ctx.lineCap = 'round'; ctx.stroke(); };
    const A = [[-S * 0.46, -S * 0.3], [-S * 0.1, -S * 0.5], [S * 0.1, S * 0.5], [S * 0.46, S * 0.3]];
    const B = [[-S * 0.46, S * 0.32], [-S * 0.05, S * 0.55], [S * 0.05, -S * 0.55], [S * 0.46, -S * 0.32]];
    for (const v of [A, B]) { stroke(v, S * 0.1, '#1e4a1c'); stroke(v, S * 0.06, '#3f8a34'); stroke(v, S * 0.02, 'rgba(180,230,140,0.55)'); }
    const leaf = (x, y, a) => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(a);
      const lg = ctx.createLinearGradient(0, -S * 0.06, 0, S * 0.06); lg.addColorStop(0, '#7cc95a'); lg.addColorStop(1, '#2d6b25');
      ctx.beginPath(); ctx.ellipse(S * 0.08, 0, S * 0.1, S * 0.05, 0, 0, Math.PI * 2); ctx.fillStyle = lg; ctx.fill();
      ctx.strokeStyle = 'rgba(20,50,15,0.6)'; ctx.lineWidth = Math.max(0.5, S * 0.01); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(S * 0.17, 0); ctx.stroke();
      ctx.restore();
    };
    leaf(-S * 0.3, -S * 0.32, -2.4); leaf(S * 0.28, S * 0.3, 0.7); leaf(S * 0.3, -S * 0.3, -0.6); leaf(-S * 0.28, S * 0.34, 2.5);
    ctx.restore();
  }

  // areia sobre o piso: dourada e discreta; 2 camadas = mais escura e compactada
  function drawSand(ctx, S, layers) {
    ctx.save();
    const two = layers >= 2;
    roundRect(ctx, -S * 0.47, -S * 0.47, S * 0.94, S * 0.94, S * 0.1);
    const tex = root.TEX ? root.TEX.get('sandstone') : null;
    ctx.fillStyle = tex ? ctx.createPattern(tex, 'repeat') : '#b08a58'; ctx.fill();
    const g = ctx.createRadialGradient(-S * 0.15, -S * 0.2, S * 0.05, 0, 0, S * 0.7);
    if (two) { g.addColorStop(0, 'rgba(150,100,40,0.25)'); g.addColorStop(1, 'rgba(70,42,12,0.6)'); }
    else { g.addColorStop(0, 'rgba(255,220,150,0.1)'); g.addColorStop(1, 'rgba(110,72,26,0.42)'); }
    ctx.fillStyle = g; ctx.fill();
    ctx.save(); ctx.clip();
    ctx.lineWidth = Math.max(1, S * 0.016);
    for (let k = 0; k < (two ? 4 : 3); k++) {
      const y = -S * 0.32 + k * S * (two ? 0.2 : 0.27);
      ctx.beginPath(); ctx.moveTo(-S * 0.5, y); ctx.bezierCurveTo(-S * 0.2, y - S * 0.07, S * 0.15, y + S * 0.07, S * 0.5, y - S * 0.02);
      ctx.strokeStyle = 'rgba(40,24,6,0.35)'; ctx.stroke();
      ctx.translate(0, S * 0.014); ctx.strokeStyle = 'rgba(255,225,160,0.18)'; ctx.stroke(); ctx.translate(0, -S * 0.014);
    }
    const ins = ctx.createLinearGradient(0, -S / 2, 0, S / 2);
    ins.addColorStop(0, 'rgba(0,0,0,0.45)'); ins.addColorStop(0.2, 'rgba(0,0,0,0)');
    ctx.fillStyle = ins; ctx.fillRect(-S / 2, -S / 2, S, S);
    ctx.restore();
    roundRect(ctx, -S * 0.47, -S * 0.47, S * 0.94, S * 0.94, S * 0.1);
    ctx.lineWidth = Math.max(1, S * 0.018); ctx.strokeStyle = two ? 'rgba(212,168,75,0.5)' : 'rgba(212,168,75,0.28)'; ctx.stroke();
    ctx.restore();
  }
  // selo rúnico dourado (prende a joia): anel duplo de ouro, runas e um losango de luz
  function drawSeal(ctx, S) {
    const R = S * 0.46;
    ctx.save();
    const glow = ctx.createRadialGradient(0, 0, R * 0.55, 0, 0, R * 1.05);
    glow.addColorStop(0, 'rgba(255,200,90,0)'); glow.addColorStop(0.75, 'rgba(255,200,90,0.28)'); glow.addColorStop(1, 'rgba(255,200,90,0)');
    ctx.fillStyle = glow; ctx.fillRect(-S / 2, -S / 2, S, S);
    const gold = ctx.createLinearGradient(0, -R, 0, R);
    gold.addColorStop(0, '#fff3c4'); gold.addColorStop(0.45, '#e2b54e'); gold.addColorStop(1, '#8e6420');
    ctx.strokeStyle = gold; ctx.shadowColor = 'rgba(255,200,100,0.9)'; ctx.shadowBlur = S * 0.06;
    ctx.lineWidth = Math.max(1.5, S * 0.035); ctx.beginPath(); ctx.arc(0, 0, R * 0.92, 0, Math.PI * 2); ctx.stroke();
    ctx.lineWidth = Math.max(1, S * 0.016); ctx.beginPath(); ctx.arc(0, 0, R * 0.74, 0, Math.PI * 2); ctx.stroke();
    // runas entre os anéis
    ctx.lineWidth = Math.max(1, S * 0.018); ctx.lineCap = 'round';
    for (let i = 0; i < 12; i++) {
      ctx.save(); ctx.rotate((i / 12) * Math.PI * 2); ctx.translate(0, -R * 0.83);
      const k = i % 4; ctx.beginPath();
      if (k === 0) { ctx.moveTo(-S * 0.02, -S * 0.025); ctx.lineTo(S * 0.02, S * 0.025); ctx.moveTo(S * 0.02, -S * 0.025); ctx.lineTo(-S * 0.02, S * 0.025); }
      else if (k === 1) { ctx.moveTo(0, -S * 0.028); ctx.lineTo(0, S * 0.028); ctx.moveTo(-S * 0.018, 0); ctx.lineTo(S * 0.018, 0); }
      else if (k === 2) { ctx.arc(0, 0, S * 0.018, 0, Math.PI * 2); }
      else { ctx.moveTo(-S * 0.02, S * 0.02); ctx.lineTo(0, -S * 0.025); ctx.lineTo(S * 0.02, S * 0.02); }
      ctx.stroke(); ctx.restore();
    }
    // quatro travas apontando pro centro
    ctx.fillStyle = gold;
    for (let i = 0; i < 4; i++) {
      ctx.save(); ctx.rotate(Math.PI / 4 + (i * Math.PI) / 2); ctx.translate(0, -R * 0.7);
      ctx.beginPath(); ctx.moveTo(0, S * 0.07); ctx.lineTo(-S * 0.035, -S * 0.01); ctx.lineTo(S * 0.035, -S * 0.01); ctx.closePath(); ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }

  // ícones das vantagens da loja (ouro, mesmo estilo dos selos)
  function drawToolIcon(ctx, px, kind) {
    const s = px;
    const gold = ctx.createLinearGradient(0, -s * 0.4, 0, s * 0.4);
    gold.addColorStop(0, '#fff3c4'); gold.addColorStop(0.45, '#e2b54e'); gold.addColorStop(1, '#8e6420');
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = s * 0.06; ctx.shadowOffsetY = s * 0.03;
    ctx.fillStyle = gold; ctx.strokeStyle = '#4a3108'; ctx.lineWidth = Math.max(1, s * 0.025); ctx.lineJoin = 'round';
    if (kind === 'hammer') {
      ctx.rotate(-0.6);
      const wood = ctx.createLinearGradient(-s * 0.05, 0, s * 0.05, 0); wood.addColorStop(0, '#5a3416'); wood.addColorStop(0.5, '#a8662c'); wood.addColorStop(1, '#4a2a10');
      ctx.fillStyle = wood; roundRect(ctx, -s * 0.045, -s * 0.12, s * 0.09, s * 0.52, s * 0.03); ctx.fill(); ctx.stroke();
      ctx.fillStyle = gold; roundRect(ctx, -s * 0.27, -s * 0.34, s * 0.54, s * 0.22, s * 0.05); ctx.fill(); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(-s * 0.24, -s * 0.32, s * 0.48, s * 0.04);
    } else {
      ctx.beginPath();
      ctx.moveTo(-s * 0.24, -s * 0.38); ctx.lineTo(s * 0.24, -s * 0.38); ctx.lineTo(s * 0.04, 0); ctx.lineTo(s * 0.24, s * 0.38); ctx.lineTo(-s * 0.24, s * 0.38); ctx.lineTo(-s * 0.04, 0); ctx.closePath();
      ctx.fillStyle = 'rgba(180,220,255,0.25)'; ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#e8c06a'; ctx.beginPath(); ctx.moveTo(-s * 0.16, s * 0.34); ctx.lineTo(s * 0.16, s * 0.34); ctx.lineTo(0, s * 0.12); ctx.closePath(); ctx.fill();
      ctx.fillStyle = gold; roundRect(ctx, -s * 0.3, -s * 0.44, s * 0.6, s * 0.08, s * 0.03); ctx.fill(); ctx.stroke();
      roundRect(ctx, -s * 0.3, s * 0.36, s * 0.6, s * 0.08, s * 0.03); ctx.fill(); ctx.stroke();
    }
    ctx.restore();
  }

  // ---------- cache de sprites ----------
  let cache = new Map(), cacheSize = 0;
  function sprite(key, S, draw) {
    if (S !== cacheSize) { cache = new Map(); cacheSize = S; }
    let c = cache.get(key);
    if (!c) {
      c = mkCanvas(S, S);
      const ctx = c.getContext('2d');
      ctx.translate(S / 2, S / 2);
      draw(ctx, S);
      cache.set(key, c);
    }
    return c;
  }
  function gemSprite(color, S, f) { f = f || 0; return sprite('g' + color + '_' + f, S, (ctx) => paintGem(ctx, GEMS[color], S * 0.4, f)); }
  // peça pintada pela IA (imagem quadrada, objeto ocupando ~80%): desenha centrada com tamanho relativo à casa
  function drawAIPiece(ctx, key, S, scale, rot) {
    const im = AI.pieces[key];
    if (!im) return false;
    const s = S * (scale || 1);
    ctx.save(); if (rot) ctx.rotate(rot);
    ctx.drawImage(im, -s / 2, -s / 2, s, s);
    ctx.restore();
    return true;
  }
  function pieceSprite(p, S, f) {
    if (AI.pieces.chest) {
      if (p.kind === 'rock') return sprite('ar' + p.hp, S, (ctx) => drawAIPiece(ctx, 'rock' + Math.min(3, Math.max(1, p.hp)), S, 1.08));
      if (p.kind === 'artifact') return sprite('achest', S, (ctx) => drawAIPiece(ctx, 'chest', S, 1.12));
      if (p.special === 'idol' || p.color == null) return sprite('aorb', S, (ctx) => drawAIPiece(ctx, 'orb', S, 1.12));
      if (p.special === 'lineH' || p.special === 'lineV') {
        const v = p.special === 'lineV';
        return sprite('al' + p.color + (v ? 'v' : 'h'), S, (ctx) => { drawAIPiece(ctx, 'dynamite', S, 1.18, (v ? Math.PI / 2 : 0) - 0.35); ctx.scale(0.74, 0.74); paintGem(ctx, GEMS[p.color], S * 0.4, 0); });
      }
      if (p.special === 'barrel') return sprite('ab' + p.color, S, (ctx) => { drawAIPiece(ctx, 'barrel', S, 1.1); ctx.translate(0, S * 0.06); ctx.scale(0.5, 0.5); paintGem(ctx, GEMS[p.color], S * 0.4, 0); });
    }    if (p.kind === 'rock') return sprite('r' + p.hp, S, (ctx) => drawRock(ctx, S, p.hp));
    if (p.kind === 'artifact') return sprite('chest', S, (ctx) => drawChest(ctx, S));
    if (p.special === 'idol' || p.color == null) return sprite('idol', S, (ctx) => drawIdol(ctx, S)); // ídolo já usado numa combinação perde o "special" mas continua sendo ídolo
    if (p.special === 'lineH' || p.special === 'lineV') {
      const v = p.special === 'lineV';
      return sprite('l' + p.color + (v ? 'v' : 'h'), S, (ctx) => { drawDynamite(ctx, S, v); ctx.scale(0.74, 0.74); paintGem(ctx, GEMS[p.color], S * 0.4); });
    }
    if (p.special === 'barrel') return sprite('b' + p.color, S, (ctx) => { drawBarrel(ctx, S, GEMS[p.color]); ctx.scale(0.46, 0.46); paintGem(ctx, GEMS[p.color], S * 0.4); });
    return gemSprite(p.color, S, f);
  }
  const vineSprite = (S) => sprite('seal', S, (ctx) => drawSeal(ctx, S));
  const sandSprite = (n, S) => sprite('s' + n, S, (ctx) => {
    if (!drawAIPiece(ctx, 'sand', S, 1.16)) return drawSand(ctx, S, n);
    if (n >= 2) { ctx.globalCompositeOperation = 'source-atop'; ctx.fillStyle = 'rgba(70,40,10,0.45)'; ctx.fillRect(-S / 2, -S / 2, S, S); }
  });

  // ícones pra HUD e telas (data URL)
  const iconCache = {};
  function icon(key, px) {
    const k = key + px;
    if (iconCache[k]) return iconCache[k];
    const c = mkCanvas(px, px), ctx = c.getContext('2d');
    ctx.translate(px / 2, px / 2);
    if (key.startsWith('gem')) paintGem(ctx, GEMS[+key.slice(3)], px * 0.4);
    else if (key === 'sand' && drawAIPiece(ctx, 'sand', px, 0.95)) {}
    else if (key === 'rock' && drawAIPiece(ctx, 'rock3', px, 1)) {}
    else if (key === 'vine') { paintGem(ctx, GEMS[1], px * 0.3); drawSeal(ctx, px * 0.95); }
    else if (key === 'chest' && drawAIPiece(ctx, 'chest', px, 1)) {}
    else if (key === 'idol' && drawAIPiece(ctx, 'orb', px, 1)) {}
    else if (key === 'dynamite' && AI.pieces.dynamite) { drawAIPiece(ctx, 'dynamite', px, 1.05, -0.35); ctx.scale(0.7, 0.7); paintGem(ctx, GEMS[0], px * 0.4); }
    else if (key === 'barrel' && AI.pieces.barrel) { drawAIPiece(ctx, 'barrel', px, 1); ctx.scale(0.5, 0.5); paintGem(ctx, GEMS[2], px * 0.4); }
    else if (key === 'sand') drawSand(ctx, px * 0.9, 1);
    else if (key === 'rock') drawRock(ctx, px, 2);
    else if (key === 'vine') { paintGem(ctx, GEMS[1], px * 0.32); drawVine(ctx, px * 0.95); }
    else if (key === 'chest') drawChest(ctx, px * 1.1);
    else if (key === 'idol') drawIdol(ctx, px);
    else if (key === 'dynamite') { drawDynamite(ctx, px * 0.95, false); ctx.scale(0.7, 0.7); paintGem(ctx, GEMS[0], px * 0.4); }
    else if (key === 'barrel') { drawBarrel(ctx, px, GEMS[2]); ctx.scale(0.46, 0.46); paintGem(ctx, GEMS[2], px * 0.4); }
    else if (key === 'coin' && drawAIPiece(ctx, 'coin', px, 1.05)) {}
    else if (key === 'scarab' && drawAIPiece(ctx, 'scarab', px, 1.05)) {}
    else if (key === 'hammer') drawToolIcon(ctx, px, 'hammer');
    else if (key === 'hourglass') drawToolIcon(ctx, px, 'hourglass');
    else if (key === 'star') drawStar(ctx, px * 0.46, true);
    else if (key === 'star0') drawStar(ctx, px * 0.46, false);
    return (iconCache[k] = c.toDataURL());
  }
  function drawStar(ctx, r, on) {
    ctx.beginPath();
    for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
    ctx.closePath();
    if (on) { const g = ctx.createLinearGradient(0, -r, 0, r); g.addColorStop(0, '#fff3b8'); g.addColorStop(0.5, '#f5c03e'); g.addColorStop(1, '#b07812'); ctx.fillStyle = g; }
    else ctx.fillStyle = 'rgba(30,26,18,0.75)';
    ctx.fill();
    ctx.lineWidth = Math.max(1, r * 0.1); ctx.strokeStyle = on ? '#7a4f08' : 'rgba(201,164,106,0.5)'; ctx.stroke();
  }

  // ---------- cenário: templo em ruínas na penumbra, luz dourada do alto, névoa ----------
  function drawBackdrop(w, h) {
    if (AI.bg) return drawPaintedBackdrop(w, h);
    return drawCodeBackdrop(w, h);
  }
  // fundo pintado (IA): tela em pé = cobre tudo; tela deitada = versão desfocada atrás + a pintura inteira no centro
  function drawPaintedBackdrop(w, h) {
    const c = mkCanvas(w, h), ctx = c.getContext('2d'), im = AI.bg;
    const iw = im.naturalWidth, ih = im.naturalHeight;
    ctx.fillStyle = '#0a0907'; ctx.fillRect(0, 0, w, h);
    const cover = Math.max(w / iw, h / ih);
    if (w / h > 0.85) {
      ctx.save(); ctx.filter = 'blur(24px) brightness(0.4) saturate(0.9)';
      ctx.drawImage(im, (w - iw * cover) / 2, (h - ih * cover) / 2, iw * cover, ih * cover);
      ctx.restore();
      const s = h / ih, dw = iw * s, x = (w - dw) / 2;
      ctx.drawImage(im, x, 0, dw, h);
      for (const [x0, dir] of [[x, 1], [x + dw, -1]]) {
        const g = ctx.createLinearGradient(x0, 0, x0 + dir * dw * 0.12, 0);
        g.addColorStop(0, 'rgba(10,9,7,1)'); g.addColorStop(1, 'rgba(10,9,7,0)');
        ctx.fillStyle = g; ctx.fillRect(dir > 0 ? x0 : x0 - dw * 0.12, 0, dw * 0.12, h);
      }
    } else {
      ctx.drawImage(im, (w - iw * cover) / 2, (h - ih * cover) / 2, iw * cover, ih * cover);
    }
    // um véu escuro leve pro tabuleiro e o painel saltarem
    const g = ctx.createRadialGradient(w / 2, h * 0.5, Math.min(w, h) * 0.2, w / 2, h * 0.5, Math.max(w, h) * 0.75);
    g.addColorStop(0, 'rgba(0,0,0,0.12)'); g.addColorStop(1, 'rgba(0,0,0,0.55)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    return c;
  }

  // ---------- cenário desenhado em código (reserva) ----------
  function drawCodeBackdrop(w, h) {    const c = mkCanvas(w, h), ctx = c.getContext('2d');
    const U = Math.min(w, h);
    let g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#0d0c09'); g.addColorStop(0.5, '#15130e'); g.addColorStop(1, '#090806');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    // brilho distante atrás da pirâmide (o "sol" do templo)
    g = ctx.createRadialGradient(w / 2, h * 0.36, 0, w / 2, h * 0.36, Math.max(w, h) * 0.6);
    g.addColorStop(0, 'rgba(255,196,110,0.32)'); g.addColorStop(0.25, 'rgba(200,140,60,0.12)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    // pirâmide em degraus, na névoa
    const pw = Math.min(w * 0.9, h * 0.75), base = h * 0.62;
    for (let k = 0; k < 9; k++) {
      const ww = pw * (1 - k * 0.095), hh = h * 0.034;
      ctx.fillStyle = 'rgba(' + (44 + k * 2) + ',' + (38 + k * 2) + ',' + (30 + k) + ',0.75)';
      ctx.fillRect(w / 2 - ww / 2, base - (k + 1) * hh, ww, hh - 1.5);
      ctx.fillStyle = 'rgba(255,210,140,0.06)'; ctx.fillRect(w / 2 - ww / 2, base - (k + 1) * hh, ww, 1.5);
    }
    // feixes de luz caindo do alto
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    const rays = [[0.5, 0.16, 0.13], [0.36, 0.07, 0.07], [0.63, 0.09, 0.06], [0.22, 0.05, 0.04], [0.78, 0.05, 0.04]];
    for (const [cx, spread, a] of rays) {
      const x = w * cx;
      const rg = ctx.createLinearGradient(0, 0, 0, h * 0.95);
      rg.addColorStop(0, 'rgba(255,220,150,' + a + ')'); rg.addColorStop(0.7, 'rgba(255,200,120,' + a * 0.35 + ')'); rg.addColorStop(1, 'rgba(255,200,120,0)');
      ctx.fillStyle = rg;
      ctx.beginPath(); ctx.moveTo(x - w * 0.02, 0); ctx.lineTo(x + w * 0.02, 0); ctx.lineTo(x + w * spread, h); ctx.lineTo(x - w * spread, h); ctx.closePath(); ctx.fill();
    }
    ctx.restore();
    // névoa em faixas
    for (let k = 0; k < 4; k++) {
      const y = h * (0.55 + k * 0.12);
      g = ctx.createLinearGradient(0, y - h * 0.1, 0, y + h * 0.1);
      g.addColorStop(0, 'rgba(120,110,90,0)'); g.addColorStop(0.5, 'rgba(120,110,90,' + (0.07 + k * 0.02) + ')'); g.addColorStop(1, 'rgba(120,110,90,0)');
      ctx.fillStyle = g; ctx.fillRect(0, y - h * 0.1, w, h * 0.2);
    }
    // colunas quebradas em primeiro plano, com contorno de luz
    const column = (x, cw, top, side) => {
      const grd = ctx.createLinearGradient(x, 0, x + cw, 0);
      grd.addColorStop(0, side < 0 ? '#0c0b08' : '#1b1812'); grd.addColorStop(1, side < 0 ? '#1b1812' : '#0c0b08');
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.moveTo(x, h); ctx.lineTo(x, top + cw * 0.15); ctx.lineTo(x + cw * 0.35, top); ctx.lineTo(x + cw * 0.55, top + cw * 0.22); ctx.lineTo(x + cw, top + cw * 0.08); ctx.lineTo(x + cw, h); ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      for (let i = 1; i < 4; i++) ctx.fillRect(x + (cw * i) / 4 - 1, top + cw * 0.3, 2, h);
      ctx.fillStyle = 'rgba(255,200,120,0.22)';
      ctx.fillRect(side < 0 ? x + cw - 2 : x, top + cw * 0.2, 2, h);
      ctx.fillStyle = '#0a0907';
      ctx.fillRect(x - cw * 0.12, top + (h - top) * 0.55, cw * 1.24, U * 0.025);
    };
    const cw = U * 0.16;
    column(-cw * 0.35, cw, h * 0.18, -1);
    column(w - cw * 0.65, cw, h * 0.3, 1);
    // cipós escuros caindo do alto
    ctx.strokeStyle = 'rgba(10,14,8,0.9)'; ctx.lineCap = 'round';
    for (let i = 0; i < 6; i++) {
      const x = w * (0.04 + i * 0.19) + jitter(i) * 24, len = h * (0.1 + Math.abs(jitter(i * 3)) * 0.18);
      ctx.lineWidth = 2 + Math.abs(jitter(i * 11)) * 3;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.bezierCurveTo(x + 20, len * 0.4, x - 20, len * 0.7, x + 6, len); ctx.stroke();
      for (let k = 1; k < 5; k++) { ctx.beginPath(); ctx.ellipse(x + jitter(i * 9 + k) * 10, (len * k) / 5, 7, 3, 0.6 * (k % 2 ? 1 : -1), 0, Math.PI * 2); ctx.fillStyle = 'rgba(14,20,10,0.95)'; ctx.fill(); }
    }
    // vinheta forte
    g = ctx.createRadialGradient(w / 2, h * 0.45, U * 0.25, w / 2, h * 0.5, Math.max(w, h) * 0.78);
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.78)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    return c;
  }
  root.ART = { loadAI, uiImages: () => AI.ui, pieceImage: (k) => AI.pieces[k] || null, get board() { return AI.board; }, get hasAI() { return Object.keys(AI.gems).length > 0; }, clearCache() { cache = new Map(); cacheSize = 0; for (const k in iconCache) delete iconCache[k]; }, GEMS, pieceSprite, gemSprite, vineSprite, sandSprite, icon, drawBackdrop, fusePoint, hsl, roundRect, sparkle };
})(window);
