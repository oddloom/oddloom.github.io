// Efeitos sonoros sintetizados na hora (Web Audio). Nenhum arquivo de áudio,
// então não tem questão de direito autoral nem download.
(function (root) {
  let ac = null;
  let master = null;
  let noiseBuf = null;
  let muted = false;
  try { muted = localStorage.getItem('neonsnake.muted') === '1'; } catch (e) {}

  // O navegador só libera som depois de um toque/clique do jogador.
  function ensure() {
    if (!ac) {
      try {
        ac = new (window.AudioContext || window.webkitAudioContext)();
        master = ac.createGain();
        master.gain.value = 0.5;
        master.connect(ac.destination);
      } catch (e) { ac = null; }
    }
    if (ac && ac.state === 'suspended') ac.resume();
  }

  function tone(freq, dur, o) {
    if (!ac || muted) return;
    const { type = 'square', vol = 0.15, to = null, delay = 0 } = o || {};
    const t0 = ac.currentTime + delay;
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (to) osc.frequency.exponentialRampToValueAtTime(to, t0 + dur);
    g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  function noise(dur, o) {
    if (!ac || muted) return;
    const { vol = 0.15, hp = 0, lp = 0, delay = 0 } = o || {};
    if (!noiseBuf) {
      noiseBuf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    const t0 = ac.currentTime + delay;
    const src = ac.createBufferSource();
    src.buffer = noiseBuf;
    let node = src;
    for (const [type, f] of [['highpass', hp], ['lowpass', lp]]) {
      if (!f) continue;
      const filt = ac.createBiquadFilter();
      filt.type = type;
      filt.frequency.value = f;
      node.connect(filt);
      node = filt;
    }
    const g = ac.createGain();
    g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    node.connect(g);
    g.connect(master);
    src.start(t0);
    src.stop(t0 + dur + 0.02);
  }

  root.Sound = {
    ensure,
    get muted() { return muted; },
    // silencia tudo enquanto um anúncio está na tela
    hold(on) {
      if (!ac) return;
      try { if (on) ac.suspend(); else ac.resume(); } catch (e) {}
    },
    toggle() {
      muted = !muted;
      try { localStorage.setItem('neonsnake.muted', muted ? '1' : '0'); } catch (e) {}
      return muted;
    },
    start() { tone(330, 0.08, { vol: 0.1 }); tone(660, 0.12, { vol: 0.1, delay: 0.08 }); },
    // quanto maior o combo, mais agudo
    eat(combo) {
      const f = 520 * Math.pow(1.12, (combo || 1) - 1);
      tone(f, 0.09, { vol: 0.12, to: f * 1.5 });
    },
    mushroom() {
      [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.16, { type: 'triangle', vol: 0.18, delay: i * 0.06 }));
    },
    boost() {
      tone(180, 0.35, { type: 'sawtooth', vol: 0.08, to: 900 });
      noise(0.3, { vol: 0.07, hp: 2000 });
    },
    near() {
      noise(0.16, { vol: 0.14, hp: 1500 });
      tone(1000, 0.14, { type: 'sine', vol: 0.1, to: 350 });
    },
    gold() {
      [784, 988, 1175, 1568, 1976].forEach((f, i) => tone(f, 0.2, { vol: 0.09, delay: i * 0.07 }));
    },
    coin() {
      tone(988, 0.06, { vol: 0.07 });
      tone(1319, 0.12, { vol: 0.07, delay: 0.06 });
    },
    die() {
      tone(420, 0.6, { type: 'sawtooth', vol: 0.14, to: 55 });
      noise(0.4, { vol: 0.18, lp: 900 });
    },
    record() {
      [523, 784, 1047, 1568].forEach((f, i) => tone(f, 0.22, { type: 'triangle', vol: 0.16, delay: 0.5 + i * 0.1 }));
    },
    warn() { tone(880, 0.07, { vol: 0.08 }); tone(880, 0.07, { vol: 0.08, delay: 0.14 }); },
    arrow() { noise(0.22, { vol: 0.12, hp: 3000 }); tone(1400, 0.2, { type: 'sine', vol: 0.05, to: 500 }); },
    bat() { tone(1800, 0.05, { type: 'square', vol: 0.04, to: 2400 }); },
    thud() { tone(90, 0.25, { type: 'sine', vol: 0.3, to: 35 }); noise(0.2, { vol: 0.15, lp: 500 }); },
    cut() { noise(0.12, { vol: 0.16, hp: 2500 }); tone(300, 0.2, { type: 'sawtooth', vol: 0.08, to: 120 }); },
    phase() {
      [392, 523, 659, 784, 1047].forEach((f, i) => tone(f, 0.18, { type: 'triangle', vol: 0.15, delay: i * 0.08 }));
      noise(0.5, { vol: 0.05, hp: 4000, delay: 0.4 });
    },
    // batida que acompanha os passos: acelera junto com a cobra
    beat(n) {
      if (n % 4 === 0) tone(110, 0.12, { type: 'sine', vol: 0.22, to: 40 });
      if (n % 8 === 4) noise(0.07, { vol: 0.05, hp: 1500 });
      noise(0.025, { vol: 0.02, hp: 7000 });
    },
  };
})(this);
