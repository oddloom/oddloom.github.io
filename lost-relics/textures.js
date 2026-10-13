// Texturas geradas no aparelho (sem baixar imagem): pedra de templo e ouro escovado.
// Ruído em várias escalas + veios + rachaduras finas. Usadas nos painéis, botões, moldura e logo.
(function (root) {
  'use strict';
  function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

  // ruído de valor que repete nas bordas (tile sem emenda)
  function valueNoise(size, cells, rand) {
    const g = [];
    for (let i = 0; i < cells * cells; i++) g.push(rand());
    const at = (x, y) => g[((y % cells + cells) % cells) * cells + ((x % cells + cells) % cells)];
    const out = new Float32Array(size * size);
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      const fx = (x / size) * cells, fy = (y / size) * cells;
      const x0 = Math.floor(fx), y0 = Math.floor(fy), tx = fx - x0, ty = fy - y0;
      const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty);
      const a = at(x0, y0), b = at(x0 + 1, y0), c = at(x0, y0 + 1), d = at(x0 + 1, y0 + 1);
      out[y * size + x] = (a + (b - a) * sx) * (1 - sy) + (c + (d - c) * sx) * sy;
    }
    return out;
  }

  function stone(opts) {
    const o = Object.assign({ size: 256, seed: 7, base: [150, 132, 104], dark: [70, 60, 46], moss: 0 }, opts);
    const S = o.size, rand = rng(o.seed);
    const layers = [[4, 0.5], [8, 0.25], [16, 0.14], [48, 0.11]].map(([c, w]) => [valueNoise(S, c, rand), w]);
    const c = document.createElement('canvas'); c.width = c.height = S;
    const ctx = c.getContext('2d');
    const img = ctx.createImageData(S, S);
    for (let i = 0; i < S * S; i++) {
      let n = 0;
      for (const [L, w] of layers) n += L[i] * w;
      const grain = (rand() - 0.5) * 0.08;
      const t = Math.min(1, Math.max(0, n * 1.1 - 0.05 + grain));
      img.data[i * 4] = o.dark[0] + (o.base[0] - o.dark[0]) * t;
      img.data[i * 4 + 1] = o.dark[1] + (o.base[1] - o.dark[1]) * t;
      img.data[i * 4 + 2] = o.dark[2] + (o.base[2] - o.dark[2]) * t;
      img.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    // rachaduras finas com borda clara (luz de cima)
    for (let k = 0; k < 7; k++) {
      let x = rand() * S, y = rand() * S, a = rand() * Math.PI * 2;
      const pts = [[x, y]];
      for (let s = 0; s < 9; s++) { a += (rand() - 0.5) * 1.2; x += Math.cos(a) * S * 0.05; y += Math.sin(a) * S * 0.05; pts.push([x, y]); }
      for (const [dy, col, w] of [[1, 'rgba(255,240,210,0.18)', 1.2], [0, 'rgba(25,18,10,0.55)', 1]]) {
        ctx.beginPath(); pts.forEach(([px, py], i) => (i ? ctx.lineTo(px, py + dy) : ctx.moveTo(px, py + dy)));
        ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke();
      }
    }
    // poros
    for (let k = 0; k < 140; k++) {
      const x = rand() * S, y = rand() * S, r = 0.5 + rand() * 1.6;
      ctx.fillStyle = 'rgba(30,22,12,0.35)'; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,245,220,0.12)'; ctx.beginPath(); ctx.arc(x, y + r * 0.8, r * 0.7, 0, Math.PI * 2); ctx.fill();
    }
    if (o.moss) {
      const m = valueNoise(S, 6, rand);
      const id = ctx.getImageData(0, 0, S, S);
      for (let i = 0; i < S * S; i++) {
        const v = Math.max(0, (m[i] - 0.62) * 3) * o.moss;
        id.data[i * 4] = id.data[i * 4] * (1 - v) + 62 * v;
        id.data[i * 4 + 1] = id.data[i * 4 + 1] * (1 - v) + 96 * v;
        id.data[i * 4 + 2] = id.data[i * 4 + 2] * (1 - v) + 40 * v;
      }
      ctx.putImageData(id, 0, 0);
    }
    return c;
  }

  const cache = {};
  function get(name) {
    if (cache[name]) return cache[name];
    let c;
    if (name === 'sandstone') c = stone({ seed: 11, base: [196, 170, 128], dark: [112, 92, 64] });
    else if (name === 'temple') c = stone({ seed: 23, base: [128, 120, 100], dark: [52, 48, 40], moss: 0.8 });
    else if (name === 'dark') c = stone({ seed: 5, base: [74, 68, 56], dark: [26, 23, 18] });
    else if (name === 'slab') c = stone({ seed: 41, base: [92, 86, 70], dark: [38, 35, 28], moss: 0.4 });
    return (cache[name] = c);
  }
  const urls = {};
  function url(name) { return urls[name] || (urls[name] = get(name).toDataURL('image/jpeg', 0.86)); }

  // aplica as texturas como variáveis CSS (painéis e botões usam)
  function applyCss() {
    const r = document.documentElement.style;
    r.setProperty('--tex-sandstone', 'url(' + url('sandstone') + ')');
    r.setProperty('--tex-temple', 'url(' + url('temple') + ')');
    r.setProperty('--tex-dark', 'url(' + url('dark') + ')');
    r.setProperty('--tex-slab', 'url(' + url('slab') + ')');
  }

  root.TEX = { get, url, applyCss };
})(window);
