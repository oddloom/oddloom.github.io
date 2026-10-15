// Sons sintetizados na hora (sem arquivo de áudio, sem direito autoral).
// Música: marimba e tambor da selva, gerados em escala pentatônica.
(function (root) {
  let ctx = null, master = null, sfxBus = null, musicBus = null, noiseBuf = null;
  let sfxOn = true, musicOn = true, musicTimer = null, beat = 0;
  try { sfxOn = localStorage.getItem('lostrelics.sfx') !== '0'; musicOn = localStorage.getItem('lostrelics.music') !== '0'; } catch (e) {}

  function init() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    const AC = root.AudioContext || root.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = 0.8;
    const comp = ctx.createDynamicsCompressor();
    master.connect(comp); comp.connect(ctx.destination);
    sfxBus = ctx.createGain(); sfxBus.gain.value = sfxOn ? 1 : 0; sfxBus.connect(master);
    musicBus = ctx.createGain(); musicBus.gain.value = musicOn ? 0.32 : 0; musicBus.connect(master);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    startMusic();
  }

  const hz = (semi) => 261.63 * Math.pow(2, semi / 12); // C4 + semitons
  function tone(freq, t0, dur, type, vol, bus, attack) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + (attack || 0.005));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(bus || sfxBus);
    o.start(t0); o.stop(t0 + dur + 0.05);
    return o;
  }
  function marimba(freq, t0, vol, bus) {
    tone(freq, t0, 0.5, 'sine', vol, bus);
    tone(freq * 4, t0, 0.08, 'sine', vol * 0.35, bus);
    tone(freq * 2.01, t0, 0.2, 'triangle', vol * 0.25, bus);
  }
  function noise(t0, dur, vol, filter, f0, f1, bus) {
    const s = ctx.createBufferSource(); s.buffer = noiseBuf;
    const f = ctx.createBiquadFilter(); f.type = filter || 'lowpass';
    f.frequency.setValueAtTime(f0 || 1000, t0);
    if (f1) f.frequency.exponentialRampToValueAtTime(f1, t0 + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    s.connect(f); f.connect(g); g.connect(bus || sfxBus);
    s.start(t0); s.stop(t0 + dur + 0.05);
  }

  const PENTA = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24, 26, 28, 31];
  const S = {
    swap() { const t = ctx.currentTime; noise(t, 0.12, 0.25, 'bandpass', 600, 2400); },
    bad() { const t = ctx.currentTime; tone(160, t, 0.18, 'triangle', 0.3); tone(120, t + 0.06, 0.2, 'triangle', 0.25); },
    // vidro estilhaçando: estalo + cacos tilintando (notas altas aleatórias) + chiado de rachadura. n = intensidade (1 a 3)
    glass(n) {
      const t = ctx.currentTime, k = Math.max(1, Math.min(3, n || 1));
      noise(t, 0.05, 0.55 * k, 'highpass', 3500);                          // estalo
      noise(t + 0.01, 0.28 + 0.08 * k, 0.22 * k, 'bandpass', 6500, 2500);   // chiado da rachadura
      const shards = 7 + k * 5;
      for (let i = 0; i < shards; i++) {                                     // cacos caindo e tilintando
        const dt = 0.02 + Math.random() * (0.18 + 0.1 * k), f = 2400 + Math.random() * 5200;
        tone(f, t + dt, 0.06 + Math.random() * 0.12, 'sine', (0.05 + Math.random() * 0.06) * (k * 0.6 + 0.4));
        if (Math.random() < 0.4) tone(f * 1.5, t + dt, 0.04, 'triangle', 0.025);
      }
      tone(1800 + Math.random() * 400, t, 0.18, 'sine', 0.08);              // "ping" do vidro
    },
    match(cascade) {
      const t = ctx.currentTime, i = Math.min(PENTA.length - 3, cascade - 1);
      marimba(hz(PENTA[i] + 12), t, 0.35); marimba(hz(PENTA[i + 2] + 12), t + 0.04, 0.22);
    },
    line() { const t = ctx.currentTime; const o = tone(1400, t, 0.3, 'sawtooth', 0.12); o.frequency.exponentialRampToValueAtTime(180, t + 0.3); noise(t, 0.35, 0.35, 'highpass', 900); },
    barrel() { const t = ctx.currentTime; noise(t, 0.6, 0.7, 'lowpass', 900, 80); const o = tone(110, t, 0.5, 'sine', 0.6); o.frequency.exponentialRampToValueAtTime(40, t + 0.5); },
    idol() { const t = ctx.currentTime; [0, 4, 7, 12, 16, 19, 24].forEach((s, k) => marimba(hz(s + 12), t + k * 0.045, 0.22)); noise(t, 0.6, 0.12, 'highpass', 5000); },
    rock() { const t = ctx.currentTime; noise(t, 0.18, 0.5, 'bandpass', 1800, 400); tone(90, t, 0.12, 'square', 0.12); },
    sand() { const t = ctx.currentTime; noise(t, 0.2, 0.18, 'lowpass', 2500, 500); },
    vine() { const t = ctx.currentTime; noise(t, 0.06, 0.4, 'highpass', 3000); tone(520, t, 0.1, 'triangle', 0.15); },
    chest() { const t = ctx.currentTime; [0, 7, 12, 19].forEach((s, k) => tone(hz(s + 24), t + k * 0.07, 0.25, 'square', 0.08)); },
    create() { const t = ctx.currentTime; tone(hz(31), t, 0.25, 'sine', 0.18); tone(hz(36), t + 0.06, 0.3, 'sine', 0.14); },
    click() { const t = ctx.currentTime; tone(900, t, 0.05, 'triangle', 0.15); },
    rush() { const t = ctx.currentTime; const o = tone(200, t, 1, 'sawtooth', 0.08); o.frequency.exponentialRampToValueAtTime(1600, t + 0.9); },
    convert() { const t = ctx.currentTime; tone(hz(24 + Math.floor(Math.random() * 5) * 2), t, 0.12, 'square', 0.06); },
    win() { const t = ctx.currentTime; [0, 4, 7, 12, 7, 12, 16].forEach((s, k) => marimba(hz(s + 12), t + k * 0.11, 0.3)); },
    lose() { const t = ctx.currentTime; [7, 3, 0, -5].forEach((s, k) => marimba(hz(s + 12), t + k * 0.18, 0.28)); },
    announce() { const t = ctx.currentTime; noise(t, 1.2, 0.9, 'lowpass', 400, 40); const o = tone(65, t, 1.4, 'sine', 0.8); o.frequency.exponentialRampToValueAtTime(32, t + 1.2); [0, 7, 12].forEach((s, k) => tone(hz(s - 12), t + 0.05, 2.2, 'triangle', 0.16 - k * 0.04)); tone(hz(-5) * 2.76, t + 0.05, 2.4, 'sine', 0.1); },
    // rugido da onça: 3 serras graves desafinadas que sobem e caem, abafadas, com sopro rouco por cima
    roar() {
      const t = ctx.currentTime, f = ctx.createBiquadFilter(), g = ctx.createGain();
      f.type = 'lowpass'; f.frequency.setValueAtTime(500, t); f.frequency.linearRampToValueAtTime(1300, t + 0.3); f.frequency.exponentialRampToValueAtTime(260, t + 1.2);
      g.gain.value = 1; f.connect(g); g.connect(sfxBus);
      [0, 6, 13].forEach((d) => {
        const o = tone(70 + d, t, 1.25, 'sawtooth', 0.22, f, 0.12);
        o.frequency.linearRampToValueAtTime(150 + d * 1.4, t + 0.32); o.frequency.exponentialRampToValueAtTime(52 + d, t + 1.2);
      });
      noise(t, 1.1, 0.55, 'bandpass', 700, 200);
      noise(t, 0.5, 0.5, 'lowpass', 220, 60);
    },
    star(i) { const t = ctx.currentTime; marimba(hz([12, 16, 19][i] + 12), t, 0.35); tone(hz([12, 16, 19][i] + 36), t, 0.4, 'sine', 0.08); },
  };

  // música generativa: marimba + tambor, 104 bpm
  const MELODY = [0, 4, 7, 9, 7, 4, 2, 4, 0, 2, 4, 7, 12, 9, 7, 4];
  function startMusic() {
    if (musicTimer || !ctx) return;
    let next = ctx.currentTime + 0.1;
    const step = 60 / 104 / 2;
    musicTimer = setInterval(() => {
      if (!ctx || ctx.state !== 'running') return;
      while (next < ctx.currentTime + 0.3) {
        const b = beat % 32;
        if (b % 4 === 0) { noise(next, 0.18, 0.5, 'lowpass', 180, 60, musicBus); tone(70, next, 0.2, 'sine', 0.5, musicBus); }
        if (b % 4 === 2) noise(next, 0.05, 0.15, 'highpass', 6000, null, musicBus);
        if (b % 2 === 0 && Math.random() < 0.8) {
          const n = MELODY[(beat / 2) % 16 | 0] + (beat % 64 >= 32 ? 2 : 0);
          marimba(hz(n), next, 0.18, musicBus);
        }
        if (b === 0 || b === 16) marimba(hz(-12 + (beat % 64 >= 32 ? 5 : 0)), next, 0.25, musicBus);
        beat++; next += step;
      }
    }, 100);
  }

  // locutor: voz do próprio aparelho, grave e lenta (estilo anúncio de luta)
  let voices = [];
  function loadVoices() { try { voices = speechSynthesis.getVoices() || []; } catch (e) { voices = []; } }
  if (root.speechSynthesis) { loadVoices(); try { speechSynthesis.onvoiceschanged = loadVoices; } catch (e) {} }
  function speak(text, lang) {
    if (!sfxOn || !root.speechSynthesis || !root.SpeechSynthesisUtterance) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const pref = lang === 'pt' ? /^pt/i : /^en/i;
      const male = /(daniel|felipe|ricardo|reed|eddy|rocko|grandpa|fred|ralph|male|masculin|google uk english male|antonio|thiago|jorge)/i;
      const pool = voices.filter((v) => pref.test(v.lang));
      u.voice = pool.find((v) => male.test(v.name)) || pool[0] || null;
      u.lang = lang === 'pt' ? 'pt-BR' : 'en-US';
      u.pitch = 0.2; u.rate = 0.78; u.volume = 1;
      speechSynthesis.speak(u);
    } catch (e) {}
  }

  // locutor gravado (audio-data.js): decodifica uma vez e toca pelo canal de efeitos; a música abaixa enquanto ele fala
  const voiceBufs = {};
  // 14/10: locutor desligado a pedido dele (voz do Windows soava robótica mesmo tratada). Pra religar, apague esta linha.
  const VOICE_OFF = true;
  function voice(id, lang) {
    if (VOICE_OFF || !ctx || !sfxOn) return;
    const L = root.VOICE_DATA && (root.VOICE_DATA[lang] || root.VOICE_DATA.pt);
    const src = L && L[id];
    if (!src) return;
    const play = (buf) => {
      const s = ctx.createBufferSource(), g = ctx.createGain();
      s.buffer = buf; g.gain.value = 1.15; s.connect(g); g.connect(sfxBus); s.start();
      if (musicOn && musicBus) {
        const t = ctx.currentTime;
        musicBus.gain.cancelScheduledValues(t); musicBus.gain.setValueAtTime(musicBus.gain.value, t);
        musicBus.gain.linearRampToValueAtTime(0.1, t + 0.15); musicBus.gain.linearRampToValueAtTime(0.32, t + buf.duration + 0.4);
      }
    };
    const key = lang + id;
    if (voiceBufs[key]) return play(voiceBufs[key]);
    try {
      const bin = atob(src.split(',')[1]), arr = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      ctx.decodeAudioData(arr.buffer, (b) => { voiceBufs[key] = b; play(b); }, () => {});
    } catch (e) {}
  }

  root.Sound = {
    voice,
    speak,    init,
    play(name, arg) { if (!ctx || !sfxOn) return; try { S[name](arg); } catch (e) {} },
    get sfx() { return sfxOn; }, get music() { return musicOn; },
    setSfx(v) { sfxOn = v; if (sfxBus) sfxBus.gain.value = v ? 1 : 0; try { localStorage.setItem('lostrelics.sfx', v ? '1' : '0'); } catch (e) {} },
    setMusic(v) { musicOn = v; if (musicBus) musicBus.gain.value = v ? 0.32 : 0; try { localStorage.setItem('lostrelics.music', v ? '1' : '0'); } catch (e) {} },
    pause() { if (ctx && ctx.state === 'running') ctx.suspend(); },
    resume() { if (ctx && ctx.state === 'suspended') ctx.resume(); },
  };
})(window);
