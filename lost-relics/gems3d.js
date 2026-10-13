// Joias em 3D: o three.js modela e ilumina cada lapidação UMA vez, e a imagem vira sprite.
// O jogo continua leve (só copia imagem), mas as joias ganham facetas, reflexo e profundidade reais.
// Se o three.js não carregar, o art.js usa as joias 2D como reserva.
(function (root) {
  'use strict';
  const SIZE = 320, FRAMES = 8;
  const images = {};
  let ready = false;

  // contornos (mesmos do art.js) — raio ~1, y pra baixo na tela
  function outline(shape) {
    const P = [];
    const ring = (n, fn) => { for (let i = 0; i < n; i++) P.push(fn((i / n) * Math.PI * 2 - Math.PI / 2)); };
    if (shape === 'oval') ring(32, (a) => [Math.cos(a) * 0.76, Math.sin(a) * 0.96]);
    if (shape === 'round') ring(24, (a) => [Math.cos(a) * 0.95, Math.sin(a) * 0.95]);
    if (shape === 'emerald') {
      const w = 0.74, h = 0.96, c = 0.24;
      P.push([-w + c, -h], [w - c, -h], [w, -h + c], [w, h - c], [w - c, h], [-w + c, h], [-w, h - c], [-w, -h + c]);
    }
    if (shape === 'trillion') {
      const R = 1.1, shift = 0.26;
      const V = [0, 1, 2].map((k) => { const a = -Math.PI / 2 + (k * Math.PI * 2) / 3; return [Math.cos(a) * R, Math.sin(a) * R + shift]; });
      for (let k = 0; k < 3; k++) {
        const A = V[k], B = V[(k + 1) % 3];
        const mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2 - shift, ml = Math.hypot(mx, my);
        for (let j = 0; j < 6; j++) { const t = j / 6, b = Math.sin(Math.PI * t) * 0.18; P.push([A[0] + (B[0] - A[0]) * t + (mx / ml) * b, A[1] + (B[1] - A[1]) * t + (my / ml) * b]); }
      }
    }
    if (shape === 'pear') for (let i = 0; i < 26; i++) { const t = (i / 26) * Math.PI * 2; P.push([Math.sin(t) * Math.sin(t / 2) * 1.1, -Math.cos(t) * 0.96]); }
    if (shape === 'losango') {
      const V = [[0, -1], [0.82, 0], [0, 1], [-0.82, 0]];
      for (let k = 0; k < 4; k++) { const A = V[k], B = V[(k + 1) % 4]; for (let j = 0; j < 5; j++) { const t = j / 5; P.push([A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t]); } }
    }
    return P;
  }

  // perfil da lapidação: [escala do contorno, altura, girar meio passo?]
  const BRILLIANT = [[0.48, 0.42, 0], [0.66, 0.37, 1], [0.86, 0.26, 0], [1, 0.14, 1], [1, 0.08, 1], [0.62, -0.3, 0], [0.04, -0.72, 1]];
  const STEP = [[0.6, 0.36, 0], [0.72, 0.33, 0], [0.86, 0.25, 0], [1, 0.12, 0], [1, 0.07, 0], [0.8, -0.14, 0], [0.58, -0.34, 0], [0.34, -0.52, 0], [0.08, -0.64, 0]];

  function buildGeometry(THREE, shape, style) {
    const P = outline(shape), n = P.length;
    const mid = P.map((p, i) => { const q = P[(i + 1) % n]; return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; });
    const prof = style === 'step' ? STEP : BRILLIANT;
    const rings = prof.map(([s, y, off]) => (off ? mid : P).map(([x, z]) => new THREE.Vector3(x * s, y, z * s)));
    const pos = [];
    const tri = (a, b, c) => pos.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
    // mesa (tampo)
    const top = new THREE.Vector3(0, prof[0][1], 0);
    for (let i = 0; i < n; i++) tri(top, rings[0][(i + 1) % n], rings[0][i]);
    // anéis
    for (let r = 0; r < rings.length - 1; r++) {
      const A = rings[r], B = rings[r + 1];
      for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        tri(A[i], A[j], B[j]);
        tri(A[i], B[j], B[i]);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals(); // não-indexado = facetas chapadas, cada uma refletindo de um jeito
    return g;
  }

  // ambiente de estúdio (as "janelas" de luz que as facetas refletem)
  function studioEnv(THREE, renderer) {
    const env = new THREE.Scene();
    const room = new THREE.Mesh(new THREE.BoxGeometry(12, 12, 12), new THREE.MeshBasicMaterial({ color: 0x030202, side: THREE.BackSide }));
    env.add(room);
    const panel = (w, h, x, y, z, rx, ry, intensity, color) => {
      const m = new THREE.MeshBasicMaterial({ color: new THREE.Color(color || 0xffffff).multiplyScalar(intensity), side: THREE.DoubleSide });
      m.toneMapped = false;
      const p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m);
      p.position.set(x, y, z); p.rotation.set(rx, ry, 0);
      env.add(p);
    };
    // estúdio de joalheria: muitas faixas finas de luz alternando com escuro, pra cada faceta refletir algo diferente
    for (let i = 0; i < 22; i++) {
      const a = (i / 22) * Math.PI * 2, r = 5.8;
      const inten = i % 3 === 0 ? 11 : i % 3 === 1 ? 4 : 1.5;
      const tint = i % 5 === 0 ? 0xbfe0ff : i % 4 === 0 ? 0xffd2a0 : 0xffffff;
      panel(0.32, 7, Math.cos(a) * r, 0.6, Math.sin(a) * r, 0, -a + Math.PI / 2, inten, tint);
    }
    for (let i = 0; i < 9; i++) {
      const gx = (i % 3) - 1, gz = Math.floor(i / 3) - 1;
      panel(0.9, 0.9, gx * 2.2 - 0.6, 5.8, gz * 2.2 - 0.4, Math.PI / 2, 0, i % 2 ? 14 : 3);
    }
    panel(2.5, 0.5, 0, -5.8, 0, -Math.PI / 2, 0, 2.5, 0xffb070);    const pm = new THREE.PMREMGenerator(renderer);
    const tex = pm.fromScene(env, 0.02).texture;
    pm.dispose();
    return tex;
  }

  const GEMS = [
    { key: 'ruby', shape: 'oval', style: 'brilliant', color: 0xc00a24, emissive: 0x5a000e, rough: 0.06 },
    { key: 'emerald', shape: 'emerald', style: 'step', color: 0x036030, emissive: 0x003316, rough: 0.07 },
    { key: 'sapphire', shape: 'trillion', style: 'brilliant', color: 0x0e2ea6, emissive: 0x061250, rough: 0.06 },
    { key: 'topaz', shape: 'pear', style: 'brilliant', color: 0xf29a00, emissive: 0x5c2e00, rough: 0.06 },
    { key: 'amethyst', shape: 'losango', style: 'brilliant', color: 0x8420c4, emissive: 0x33085a, rough: 0.06 },
    { key: 'diamond', shape: 'round', style: 'brilliant', color: 0xf4f8ff, emissive: 0x000000, rough: 0.02, iri: true },
  ];

  // tratamento de cor depois do render: mais saturação e contraste, borda escura e miolo que acende
  function grade(c, d) {
    const ctx = c.getContext('2d');
    const img = ctx.getImageData(0, 0, SIZE, SIZE), px = img.data;
    const sat = d.iri ? 1.0 : 1.15, con = d.iri ? 1.5 : 1.28, lift = 0;
    for (let i = 0; i < px.length; i += 4) {
      if (!px[i + 3]) continue;
      const L = px[i] * 0.299 + px[i + 1] * 0.587 + px[i + 2] * 0.114;
      for (let k = 0; k < 3; k++) {
        let v = L + (px[i + k] - L) * sat;
        v = ((v / 255 - 0.5) * con + 0.5) * 255 + lift;
        px[i + k] = v < 0 ? 0 : v > 255 ? 255 : v;
      }
    }
    ctx.putImageData(img, 0, 0);
    ctx.save();
    ctx.globalCompositeOperation = 'source-atop';
    let g = ctx.createRadialGradient(SIZE * 0.5, SIZE * 0.46, SIZE * 0.08, SIZE * 0.5, SIZE * 0.5, SIZE * 0.36);
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(0.8, 'rgba(0,0,0,0.06)'); g.addColorStop(1, 'rgba(0,0,0,0.28)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, SIZE, SIZE);
    const col = new root.THREE.Color(d.color);
    g = ctx.createRadialGradient(SIZE * 0.47, SIZE * 0.42, 0, SIZE * 0.5, SIZE * 0.47, SIZE * 0.22);
    const r = Math.round(Math.min(255, col.r * 255 + 90)), gg = Math.round(Math.min(255, col.g * 255 + 90)), b = Math.round(Math.min(255, col.b * 255 + 90));
    g.addColorStop(0, 'rgba(' + r + ',' + gg + ',' + b + ',' + (d.iri ? 0.12 : 0.26) + ')'); g.addColorStop(1, 'rgba(' + r + ',' + gg + ',' + b + ',0)');
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = g; ctx.fillRect(0, 0, SIZE, SIZE);
    ctx.restore();
  }

  function init() {

    const THREE = root.THREE;
    if (!THREE) return false;
    try {
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
      renderer.setPixelRatio(1);
      renderer.setSize(SIZE, SIZE, false);
      renderer.setClearColor(0x000000, 0);
      if ('outputColorSpace' in renderer) renderer.outputColorSpace = 'srgb'; else renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      const envTex = studioEnv(THREE, renderer);
      const scene = new THREE.Scene();
      scene.environment = envTex;
      const key = new THREE.DirectionalLight(0xfff2dc, 0.7); key.position.set(-2.5, 6, -2); scene.add(key);
      const rim = new THREE.DirectionalLight(0x9fd0ff, 0.9); rim.position.set(3, 2, 3); scene.add(rim);
      scene.add(new THREE.AmbientLight(0xffffff, 0.02));
      const cam = new THREE.PerspectiveCamera(24, 1, 0.1, 50);
      cam.position.set(0, 4.9, 2.9); cam.up.set(0, 0, -1); cam.lookAt(0, -0.05, 0.12);
      for (const d of GEMS) {
        const mat = new THREE.MeshPhysicalMaterial({
          color: d.color, emissive: d.emissive, roughness: d.rough * 0.4, metalness: 1,
          clearcoat: d.iri ? 0.6 : 0.22, clearcoatRoughness: 0.01, envMapIntensity: d.iri ? 2.6 : 2.5, flatShading: true,
          specularIntensity: 1, ior: d.iri ? 2.4 : 1.77,
        });
        if (d.iri && 'iridescence' in mat) { mat.iridescence = 1; mat.iridescenceIOR = 1.6; mat.iridescenceThicknessRange = [120, 640]; }
        const mesh = new THREE.Mesh(buildGeometry(THREE, d.shape, d.style), mat);
        scene.add(mesh);
        // 8 quadros com a pedra balançando de leve: a luz passeia pelas facetas (cintilar)
        images[d.key] = [];
        for (let f = 0; f < FRAMES; f++) {
          const a = (f / FRAMES) * Math.PI * 2;
          mesh.rotation.set(-0.05 + Math.sin(a) * 0.05, Math.sin(a) * 0.11, Math.cos(a) * 0.03);
          renderer.render(scene, cam);
          const c = document.createElement('canvas');
          c.width = c.height = SIZE;
          c.getContext('2d').drawImage(renderer.domElement, 0, 0);
          grade(c, d);
          images[d.key].push(c);
        }
        scene.remove(mesh); mesh.geometry.dispose(); mat.dispose();
      }
      renderer.dispose();
      if (renderer.forceContextLoss) renderer.forceContextLoss();
      ready = true;
      return true;
    } catch (e) {
      console.warn('joias 3D indisponíveis, usando 2D', e);
      return false;
    }
  }

  root.GEM3D = { init, FRAMES, image: (key, f) => (ready ? images[key][(f || 0) % FRAMES] : null), get ready() { return ready; } };
})(window);
