// Arte das telas: logo em ouro gravado e ornamentos de canto das janelas.
(function (root) {
  'use strict';

  // canto ornamental (filete duplo + volutas + losango), girado pra cada canto
  function cornerSvg(rot) {
    const g = '<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0bd"/><stop offset=".5" stop-color="#d4a84b"/><stop offset="1" stop-color="#7c5a1c"/></linearGradient>';
    const body =
      '<path d="M3 44 V10 Q3 3 10 3 H44" fill="none" stroke="url(#g)" stroke-width="1.6"/>' +
      '<path d="M9 44 V16 Q9 9 16 9 H44" fill="none" stroke="url(#g)" stroke-width=".8" opacity=".8"/>' +
      '<path d="M16 9 Q22 14 18 20 Q14 24 10 20" fill="none" stroke="url(#g)" stroke-width="1.1"/>' +
      '<path d="M9 16 Q14 22 20 18" fill="none" stroke="url(#g)" stroke-width="1.1"/>' +
      '<rect x="4.5" y="4.5" width="5" height="5" transform="rotate(45 7 7)" fill="#fff0bd"/>' +
      '<circle cx="30" cy="3" r="1.3" fill="#d4a84b"/><circle cx="3" cy="30" r="1.3" fill="#d4a84b"/>';
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><defs>' + g + '</defs><g transform="rotate(' + rot + ' 24 24)">' + body + '</g></svg>';
    return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
  }
  function applyCorners() {
    const r = document.documentElement.style;
    r.setProperty('--corner-tl', cornerSvg(0));
    r.setProperty('--corner-tr', cornerSvg(90));
    r.setProperty('--corner-br', cornerSvg(180));
    r.setProperty('--corner-bl', cornerSvg(270));
  }

  // texto em ouro gravado: extrusão escura, metal com faixa de brilho, bisel claro/escuro, desgaste de pedra e aura
  function goldText(ctx, text, x, y, size, font, tex) {
    ctx.save();
    ctx.font = font;
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    // aura dourada
    ctx.shadowColor = 'rgba(255,200,100,0.55)'; ctx.shadowBlur = size * 0.45;
    ctx.fillStyle = 'rgba(120,80,20,0.6)'; ctx.fillText(text, x, y);
    ctx.shadowColor = 'transparent';
    // extrusão (profundidade)
    const depth = Math.max(3, Math.round(size * 0.07));
    for (let i = depth; i > 0; i--) {
      ctx.fillStyle = i === depth ? '#0c0904' : 'rgb(' + (52 - i * 3) + ',' + (34 - i * 2) + ',' + (10 - i) + ')';
      ctx.fillText(text, x, y + i);
    }
    // metal
    const m = ctx.createLinearGradient(0, y - size * 0.85, 0, y + size * 0.1);
    m.addColorStop(0, '#fff6d0'); m.addColorStop(0.2, '#f3d27f'); m.addColorStop(0.46, '#c99539');
    m.addColorStop(0.52, '#8a5f1c'); m.addColorStop(0.62, '#b98428'); m.addColorStop(0.86, '#f6dc94'); m.addColorStop(1, '#a87a2a');
    ctx.fillStyle = m; ctx.fillText(text, x, y);
    // desgaste de pedra (só dentro das letras)
    if (tex) {
      ctx.globalCompositeOperation = 'source-atop';
      ctx.globalAlpha = 0.28;
      ctx.fillStyle = ctx.createPattern(tex, 'repeat');
      ctx.fillRect(x - size * 6, y - size, size * 12, size * 1.3);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }
    // bisel: luz em cima, sombra embaixo
    ctx.lineWidth = Math.max(1, size * 0.018);
    ctx.strokeStyle = 'rgba(255,248,220,0.75)'; ctx.save(); ctx.translate(0, -size * 0.012); ctx.strokeText(text, x, y); ctx.restore();
    ctx.strokeStyle = 'rgba(40,24,4,0.85)'; ctx.save(); ctx.translate(0, size * 0.014); ctx.strokeText(text, x, y); ctx.restore();
    ctx.restore();
  }

  function drawLogo(canvas, gemImg, tex) {
    const W = 1120, H = 600;
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, W, H);
    // luz atrás do título
    const halo = ctx.createRadialGradient(W / 2, H * 0.5, 10, W / 2, H * 0.5, W * 0.48);
    halo.addColorStop(0, 'rgba(255,205,120,0.28)'); halo.addColorStop(0.5, 'rgba(255,190,90,0.08)'); halo.addColorStop(1, 'rgba(255,190,90,0)');
    ctx.fillStyle = halo; ctx.fillRect(0, 0, W, H);
    // joia no alto, com raios
    if (gemImg) {
      ctx.save(); ctx.translate(W / 2, 96); ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 12; i++) {
        ctx.rotate(Math.PI / 6);
        const g = ctx.createLinearGradient(0, 0, 0, -150);
        g.addColorStop(0, 'rgba(255,120,120,0.35)'); g.addColorStop(1, 'rgba(255,120,120,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-5, 0); ctx.lineTo(0, i % 2 ? -110 : -160); ctx.lineTo(5, 0); ctx.closePath(); ctx.fill();
      }
      ctx.restore();
      ctx.drawImage(gemImg, W / 2 - 78, 96 - 78, 156, 156);
    }
    goldText(ctx, 'LOST', W / 2, 252, 92, '900 92px "Cinzel Decorative", "Cinzel", Georgia, serif', tex);
    goldText(ctx, 'RELICS', W / 2, 452, 196, '900 196px "Cinzel Decorative", "Cinzel", Georgia, serif', tex);
    // filete ornamental embaixo
    const y = 512, cx = W / 2;
    const line = ctx.createLinearGradient(cx - 360, 0, cx + 360, 0);
    line.addColorStop(0, 'rgba(212,168,75,0)'); line.addColorStop(0.3, '#d4a84b'); line.addColorStop(0.5, '#fff0bd'); line.addColorStop(0.7, '#d4a84b'); line.addColorStop(1, 'rgba(212,168,75,0)');
    ctx.fillStyle = line; ctx.fillRect(cx - 360, y, 720, 2);
    ctx.save(); ctx.translate(cx, y + 1); ctx.rotate(Math.PI / 4);
    ctx.fillStyle = '#fff0bd'; ctx.shadowColor = 'rgba(255,220,140,0.9)'; ctx.shadowBlur = 16; ctx.fillRect(-8, -8, 16, 16);
    ctx.restore();
  }

  root.UIART = { applyCorners, drawLogo, goldText };
})(window);
