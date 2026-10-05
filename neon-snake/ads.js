// Anúncios: AdSense para jogos (H5 Games Ads / Ad Placement API).
// Sem o ID do AdSense configurado (ou fora do site próprio), roda em modo
// SIMULADO: mostra uma tela "anúncio de teste" pra ver como fica, sem anúncio real.
//
// Onde aparece (combinado no plano): nunca durante a partida.
//  - recompensado: no game over, "continuar assistindo anúncio" (1 vez por partida)
//  - intersticial: ao tocar em DE NOVO (o Google controla a frequência)
(function (root) {
  const real = () => typeof root.adBreak === 'function' && !!(root.ADS_CONFIG && root.ADS_CONFIG.client);
  let hooks = { pause() {}, resume() {} };
  let mockCount = 0;

  if (typeof root.adConfig === 'function' && real()) {
    try { root.adConfig({ preloadAdBreaks: 'on', sound: 'on' }); } catch (e) {}
  }

  // ---------- simulação ----------
  function mock(kind, done) {
    const box = document.createElement('div');
    box.className = 'mock-ad';
    box.innerHTML =
      '<div class="mock-card">' +
      '<div class="mock-tag">ANÚNCIO · SIMULAÇÃO</div>' +
      '<div class="mock-slot">aqui aparece o anúncio do Google<br><small>(' +
      (kind === 'reward' ? 'recompensado' : 'entre partidas') + ')</small></div>' +
      '<div class="mock-timer"></div>' +
      '<button type="button" class="mock-close">FECHAR</button>' +
      '</div>';
    document.body.appendChild(box);
    const timer = box.querySelector('.mock-timer');
    const close = box.querySelector('.mock-close');
    let left = kind === 'reward' ? 5 : 3;
    const tick = () => {
      timer.textContent = left > 0
        ? (kind === 'reward' ? 'recompensa em ' : 'pode fechar em ') + left + 's'
        : (kind === 'reward' ? 'recompensa liberada' : '');
      close.textContent = kind === 'reward' && left > 0 ? 'DESISTIR' : 'FECHAR';
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

  root.Ads = {
    get real() { return real(); },
    // o jogo informa como pausar/voltar o som durante o anúncio
    setHooks(h) { hooks = Object.assign(hooks, h); },

    // Entre partidas. cb() roda depois do anúncio (ou na hora, se não houver).
    interstitial(cb) {
      if (real()) {
        root.adBreak({
          type: 'next',
          name: 'restart',
          beforeAd: () => hooks.pause(),
          afterAd: () => hooks.resume(),
          adBreakDone: () => cb(),
        });
        return;
      }
      // simulação: 1 a cada 2 recomeços, pra parecer com o ritmo real
      if (++mockCount % 2 === 0) mock('next', () => cb());
      else cb();
    },

    // Recompensado. onAvailable(show) só é chamado se existir anúncio;
    // aí o jogo mostra o botão e chama show() quando o jogador tocar.
    offerReward({ onAvailable, onReward, onSkip }) {
      if (real()) {
        let granted = false;
        root.adBreak({
          type: 'reward',
          name: 'continue',
          beforeAd: () => hooks.pause(),
          afterAd: () => hooks.resume(),
          beforeReward: (showAdFn) => onAvailable(showAdFn),
          adViewed: () => { granted = true; },
          adDismissed: () => {},
          adBreakDone: () => { if (granted) onReward(); else if (onSkip) onSkip(); },
        });
        return;
      }
      onAvailable(() => mock('reward', (ok) => (ok ? onReward() : onSkip && onSkip())));
    },
  };
})(this);
