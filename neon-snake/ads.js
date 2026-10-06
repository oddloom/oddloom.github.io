// Anúncios e eventos de plataforma. O mesmo jogo roda em três lugares, e o
// build escolhe qual em window.ADS_CONFIG.provider:
//   'adsense'          site próprio (AdSense para jogos / Ad Placement API)
//   'crazygames'       CrazyGames (SDK v3)
//   'gamedistribution' GameDistribution (SDK HTML5)
// Sem provider (ou AdSense sem ID) roda em modo SIMULADO: tela "anúncio de teste".
// Com provider 'none' não mostra anúncio nenhum.
//
// Onde aparece (combinado no plano): nunca durante a partida.
//  - recompensado: no game over, "continuar assistindo anúncio" (1 vez por partida)
//  - intersticial: ao tocar em DE NOVO (a plataforma controla a frequência)
(function (root) {
  const cfg = root.ADS_CONFIG || {};
  const provider = cfg.provider || (cfg.client ? 'adsense' : 'mock');
  let hooks = { pause() {}, resume() {} };
  let mockCount = 0;

  // ---------- simulação ----------
  function mock(kind, done) {
    const T = root.I18N.t;
    const box = document.createElement('div');
    box.className = 'mock-ad';
    box.innerHTML =
      '<div class="mock-card">' +
      '<div class="mock-tag">' + T('ad.tag') + '</div>' +
      '<div class="mock-slot">' + T('ad.slot') + '<br><small>(' +
      T(kind === 'reward' ? 'ad.reward' : 'ad.next') + ')</small></div>' +
      '<div class="mock-timer"></div>' +
      '<button type="button" class="mock-close"></button>' +
      '</div>';
    document.body.appendChild(box);
    const timer = box.querySelector('.mock-timer');
    const close = box.querySelector('.mock-close');
    let left = kind === 'reward' ? 5 : 3;
    const tick = () => {
      timer.textContent = left > 0
        ? T(kind === 'reward' ? 'ad.rewardIn' : 'ad.closeIn') + ' ' + left + 's'
        : (kind === 'reward' ? T('ad.rewardOk') : '');
      close.textContent = T(kind === 'reward' && left > 0 ? 'ad.skip' : 'ad.close');
    };
    tick();
    const iv = setInterval(() => { left--; tick(); if (left <= 0) clearInterval(iv); }, 1000);
    close.addEventListener('click', () => {
      if (kind !== 'reward' && left > 0) return; // intersticial: espera o tempo
      clearInterval(iv);
      box.remove();
      done(left <= 0);
    });
  }

  // ---------- AdSense (site próprio) ----------
  const adsense = {
    init() {
      if (typeof root.adConfig === 'function') {
        try { root.adConfig({ preloadAdBreaks: 'on', sound: 'on' }); } catch (e) {}
      }
    },
    interstitial(cb) {
      root.adBreak({
        type: 'next', name: 'restart',
        beforeAd: () => hooks.pause(), afterAd: () => hooks.resume(),
        adBreakDone: () => cb(),
      });
    },
    offerReward({ onAvailable, onReward, onSkip }) {
      let granted = false;
      root.adBreak({
        type: 'reward', name: 'continue',
        beforeAd: () => hooks.pause(), afterAd: () => hooks.resume(),
        beforeReward: (showAdFn) => onAvailable(showAdFn),
        adViewed: () => { granted = true; },
        adDismissed: () => {},
        adBreakDone: () => { if (granted) onReward(); else if (onSkip) onSkip(); },
      });
    },
  };

  // ---------- CrazyGames ----------
  // O SDK precisa de init() assíncrono; tudo que chega antes espera o "ready".
  let cg = null;
  const cgReady = provider === 'crazygames' && root.CrazyGames
    ? root.CrazyGames.SDK.init().then(() => { cg = root.CrazyGames.SDK; }).catch(() => {})
    : Promise.resolve();
  const crazygames = {
    init() {
      cgReady.then(() => {
        if (!cg) return;
        try {
          const loc = cg.user && cg.user.systemInfo && cg.user.systemInfo.locale;
          if (loc) root.I18N.setDefault(loc);
        } catch (e) {}
      });
    },
    request(type, done) {
      if (!cg) { done(false); return; }
      let ended = false;
      const end = (ok) => { if (ended) return; ended = true; hooks.resume(); done(ok); };
      cg.ad.requestAd(type, {
        adStarted: () => hooks.pause(),
        adFinished: () => end(true),
        adError: () => end(false),
      });
    },
    interstitial(cb) { crazygames.request('midgame', () => cb()); },
    offerReward({ onAvailable, onReward, onSkip }) {
      if (!cg) return;
      onAvailable(() => crazygames.request('rewarded', (ok) => (ok ? onReward() : onSkip && onSkip())));
    },
    // passa pelo cgReady pra não perder o primeiro aviso nem trocar a ordem
    gameplay(on) {
      cgReady.then(() => {
        if (!cg) return;
        try { on ? cg.game.gameplayStart() : cg.game.gameplayStop(); } catch (e) {}
      });
    },
  };

  // ---------- GameDistribution ----------
  // O SDK avisa por eventos: SDK_GAME_PAUSE / SDK_GAME_START (pausar e voltar
  // durante o anúncio) e SDK_REWARDED_WATCH_COMPLETE (recompensa liberada).
  let gdRewarded = false;
  if (provider === 'gamedistribution') {
    root.GD_OPTIONS = {
      gameId: cfg.gdGameId,
      onEvent(ev) {
        if (ev.name === 'SDK_GAME_PAUSE') hooks.pause();
        else if (ev.name === 'SDK_GAME_START') hooks.resume();
        else if (ev.name === 'SDK_REWARDED_WATCH_COMPLETE') gdRewarded = true;
      },
    };
  }
  const gd = () => (typeof root.gdsdk !== 'undefined' ? root.gdsdk : null);
  const gamedistribution = {
    init() {},
    interstitial(cb) {
      const sdk = gd();
      if (!sdk) { cb(); return; }
      sdk.showAd().then(() => cb(), () => cb());
    },
    offerReward({ onAvailable, onReward, onSkip }) {
      const sdk = gd();
      if (!sdk) return;
      onAvailable(() => {
        gdRewarded = false;
        sdk.showAd('rewarded').then(
          () => (gdRewarded ? onReward() : onSkip && onSkip()),
          () => { hooks.resume(); if (onSkip) onSkip(); });
      });
    },
  };

  // ---------- simulação / desligado ----------
  const simulated = {
    init() {},
    // 1 a cada 2 recomeços, pra parecer com o ritmo real
    interstitial(cb) { if (++mockCount % 2 === 0) mock('next', () => cb()); else cb(); },
    offerReward({ onAvailable, onReward, onSkip }) {
      onAvailable(() => mock('reward', (ok) => (ok ? onReward() : onSkip && onSkip())));
    },
  };
  const none = { init() {}, interstitial(cb) { cb(); }, offerReward() {} };

  const impl = {
    adsense: typeof root.adBreak === 'function' ? adsense : simulated,
    crazygames, gamedistribution, none,
  }[provider] || simulated;
  impl.init();

  root.Ads = {
    provider,
    // o jogo informa como pausar/voltar o som durante o anúncio
    setHooks(h) { hooks = Object.assign(hooks, h); },
    // Entre partidas. cb() roda depois do anúncio (ou na hora, se não houver).
    interstitial(cb) { impl.interstitial(cb); },
    // Recompensado. onAvailable(show) só é chamado se existir anúncio;
    // aí o jogo mostra o botão e chama show() quando o jogador tocar.
    offerReward(o) { impl.offerReward(o); },
    // partida rodando (true) ou parada (false): a CrazyGames usa nas métricas
    gameplay(on) { if (impl.gameplay) impl.gameplay(on); },
  };
})(this);
