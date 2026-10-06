// Textos do jogo em português e inglês.
// Idioma: o que o jogador escolheu no menu; senão, português se o navegador
// estiver em português e inglês pra qualquer outro idioma.
(function (root) {
  const STRINGS = {
    pt: {
      'meter': 'cogumelos: cor do mundo',
      'sound.on': 'SOM', 'sound.off': 'MUDO',
      'legend.food': 'comida: cresce (rápido = combo)',
      'legend.mush': 'cogumelo: pinta o mundo e solta a música',
      'legend.boost': 'azul: turbo 3s, pontos 2x',
      'legend.gold': 'dourado (raro): chuva de moedas',
      'legend.near': 'raspar no corpo: bônus',
      'legend.phase': 'a cada 15 comidas: fase nova com perigo. na cabeça mata, no corpo corta o rabo',
      'menu.play': 'JOGAR', 'menu.daily': 'DESAFIO DO DIA', 'menu.phases': 'FASES',
      'menu.custom': 'PERSONALIZAR', 'menu.records': 'RECORDES',
      'menu.hint': 'deslize o dedo ou use as setas',
      'records.title': 'RECORDES', 'records.label': 'MODO NORMAL · TOP 5', 'records.empty': 'nenhuma partida ainda',
      'back': 'VOLTAR', 'done': 'PRONTO', 'play': 'JOGAR', 'menu': 'MENU',
      'phases.title': 'FASES',
      'phases.note': 'No jogo normal a fase muda a cada 15 comidas. Aqui você treina direto na fase que quiser, começando devagar. Treino não conta pro recorde.',
      'custom.title': 'PERSONALIZAR', 'custom.color': 'COR DA COBRA', 'custom.food': 'COMIDA', 'custom.board': 'CENÁRIO',
      'custom.note': 'no jogo tudo começa cinza e ganha essa cor com os cogumelos',
      'custom.snake': 'cobra',
      'food.classica': 'CLÁSSICA', 'food.maca': 'MAÇÃ',
      'board.classico': 'CLÁSSICO', 'board.synth': 'SYNTHWAVE',
      'phases': [
        { name: 'FLIPERAMA', danger: '', how: 'Sem perigo. Coma, pegue cogumelos pra colorir e liberar a música, e emende comidas pro combo.' },
        { name: 'DESERTO', danger: 'flechas', how: 'Flechas. A linha pisca vermelho por 1 segundo antes da flecha passar: saia dela.' },
        { name: 'CAVERNA', danger: 'morcegos', how: 'Morcegos voam de lado a lado em zigue-zague. Na cabeça mata; no corpo, corta o rabo.' },
        { name: 'VULCÃO', danger: 'rochas', how: 'Rochas caem onde aparece a sombra e ficam 9 segundos bloqueando o caminho.' },
        { name: 'CAOS', danger: 'tudo junto', how: 'Flechas, morcegos e rochas ao mesmo tempo, e com mais frequência.' },
      ],
      'stats.daily': 'desafio de hoje', 'stats.games': 'partidas jogadas', 'stats.combo': 'maior combo',
      'stats.phase': 'fase mais longe', 'stats.mush': 'mais cogumelos numa partida', 'stats.near': 'raspadas no total',
      'stats.coins': 'moedas no total', 'stats.cuts': 'rabos cortados',
      'pause': 'PAUSA', 'resume': 'CONTINUAR',
      'cause.wall': 'bateu na parede', 'cause.self': 'bateu no próprio corpo', 'cause.rock': 'bateu numa rocha',
      'cause.arrow': 'flechada na cabeça', 'cause.bat': 'pego por um morcego',
      'over.daily': 'DESAFIO', 'over.practice': 'TREINO (não conta recorde)',
      'over.phase': 'fase', 'over.record': 'novo recorde!', 'over.best': 'recorde',
      'over.eaten': 'comidas', 'over.mush': 'cogumelos', 'over.near': 'raspadas',
      'over.win': 'VOCÊ ZEROU', 'over.again': 'DE NOVO', 'over.copy': 'COPIAR RESULTADO', 'over.otherPhase': 'OUTRA FASE',
      'over.continue': 'CONTINUAR · VER ANÚNCIO',
      'share.head': 'Neon Snake · desafio de', 'share.points': 'pontos',
      'share.copied': 'COPIADO', 'share.manual': 'COPIE O TEXTO ACIMA',
      'toast.practice': 'TREINO · FASE', 'toast.back': 'VOLTOU!', 'toast.cut': 'CORTOU', 'toast.near': 'RASPOU! +15',
      'toast.phase': 'FASE', 'toast.danger': 'cuidado:', 'toast.boost': 'TURBO', 'toast.gold': 'CHUVA DE MOEDAS',
      'toast.rainbow': 'ARCO-ÍRIS',
      'layers': ['', '+COR · BUMBO', '+COR · CASCAVEL', '+COR · BAIXO', '+COR · PALMAS', '+COR · SSSS', 'COR TOTAL · MELODIA'],
      'status.coins': 'MOEDAS', 'status.turbo': 'TURBO 2x', 'status.phase': 'FASE',
      'ad.tag': 'ANÚNCIO · SIMULAÇÃO', 'ad.slot': 'aqui aparece o anúncio', 'ad.reward': 'recompensado', 'ad.next': 'entre partidas',
      'ad.rewardIn': 'recompensa em', 'ad.closeIn': 'pode fechar em', 'ad.rewardOk': 'recompensa liberada',
      'ad.close': 'FECHAR', 'ad.skip': 'DESISTIR',
      'site.more': 'mais jogos', 'site.privacy': 'privacidade',
    },
    en: {
      'meter': 'mushrooms: color of the world',
      'sound.on': 'SOUND', 'sound.off': 'MUTED',
      'legend.food': 'food: grow (fast = combo)',
      'legend.mush': 'mushroom: paints the world and unlocks the music',
      'legend.boost': 'blue: 3s turbo, 2x points',
      'legend.gold': 'gold (rare): coin rain',
      'legend.near': 'brush past your body: bonus',
      'legend.phase': 'every 15 foods: new level with a hazard. hits your head, you die; hits your body, you lose the tail',
      'menu.play': 'PLAY', 'menu.daily': 'DAILY CHALLENGE', 'menu.phases': 'LEVELS',
      'menu.custom': 'CUSTOMIZE', 'menu.records': 'RECORDS',
      'menu.hint': 'swipe or use the arrow keys',
      'records.title': 'RECORDS', 'records.label': 'NORMAL MODE · TOP 5', 'records.empty': 'no games yet',
      'back': 'BACK', 'done': 'DONE', 'play': 'PLAY', 'menu': 'MENU',
      'phases.title': 'LEVELS',
      'phases.note': 'In the normal game the level changes every 15 foods. Here you practice any level you want, starting slow. Practice does not count for records.',
      'custom.title': 'CUSTOMIZE', 'custom.color': 'SNAKE COLOR', 'custom.food': 'FOOD', 'custom.board': 'BACKGROUND',
      'custom.note': 'in the game everything starts gray and gets this color from mushrooms',
      'custom.snake': 'snake',
      'food.classica': 'CLASSIC', 'food.maca': 'APPLE',
      'board.classico': 'CLASSIC', 'board.synth': 'SYNTHWAVE',
      'phases': [
        { name: 'ARCADE', danger: '', how: 'No hazards. Eat, grab mushrooms to add color and unlock the music, and chain foods for combos.' },
        { name: 'DESERT', danger: 'arrows', how: 'Arrows. The line flashes red for 1 second before the arrow flies: get out of it.' },
        { name: 'CAVE', danger: 'bats', how: 'Bats zigzag from side to side. On your head they kill; on your body, they cut the tail.' },
        { name: 'VOLCANO', danger: 'rocks', how: 'Rocks fall where the shadow appears and block the way for 9 seconds.' },
        { name: 'CHAOS', danger: 'everything', how: 'Arrows, bats and rocks all at once, and more often.' },
      ],
      'stats.daily': "today's challenge", 'stats.games': 'games played', 'stats.combo': 'best combo',
      'stats.phase': 'furthest level', 'stats.mush': 'most mushrooms in a game', 'stats.near': 'total near misses',
      'stats.coins': 'total coins', 'stats.cuts': 'tails cut',
      'pause': 'PAUSED', 'resume': 'RESUME',
      'cause.wall': 'hit the wall', 'cause.self': 'hit your own body', 'cause.rock': 'hit a rock',
      'cause.arrow': 'arrow to the head', 'cause.bat': 'caught by a bat',
      'over.daily': 'CHALLENGE', 'over.practice': 'PRACTICE (no records)',
      'over.phase': 'level', 'over.record': 'new record!', 'over.best': 'record',
      'over.eaten': 'foods', 'over.mush': 'mushrooms', 'over.near': 'near misses',
      'over.win': 'YOU BEAT IT', 'over.again': 'PLAY AGAIN', 'over.copy': 'COPY RESULT', 'over.otherPhase': 'OTHER LEVEL',
      'over.continue': 'CONTINUE · WATCH AD',
      'share.head': 'Neon Snake · challenge', 'share.points': 'points',
      'share.copied': 'COPIED', 'share.manual': 'COPY THE TEXT ABOVE',
      'toast.practice': 'PRACTICE · LEVEL', 'toast.back': 'BACK IN!', 'toast.cut': 'CUT', 'toast.near': 'CLOSE! +15',
      'toast.phase': 'LEVEL', 'toast.danger': 'watch out:', 'toast.boost': 'TURBO', 'toast.gold': 'COIN RAIN',
      'toast.rainbow': 'RAINBOW',
      'layers': ['', '+COLOR · KICK', '+COLOR · RATTLE', '+COLOR · BASS', '+COLOR · CLAPS', '+COLOR · HISS', 'FULL COLOR · MELODY'],
      'status.coins': 'COINS', 'status.turbo': 'TURBO 2x', 'status.phase': 'LEVEL',
      'ad.tag': 'AD · PREVIEW', 'ad.slot': 'the ad shows here', 'ad.reward': 'rewarded', 'ad.next': 'between games',
      'ad.rewardIn': 'reward in', 'ad.closeIn': 'close in', 'ad.rewardOk': 'reward unlocked',
      'ad.close': 'CLOSE', 'ad.skip': 'GIVE UP',
      'site.more': 'more games', 'site.privacy': 'privacy',
    },
  };

  function saved() {
    try { const s = localStorage.getItem('neonsnake.lang'); return STRINGS[s] ? s : null; } catch (e) { return null; }
  }
  const fromLocale = (loc) => (/^pt\b/i.test(loc || '') ? 'pt' : 'en');
  function detect() {
    const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    return saved() || fromLocale(langs[0]);
  }

  const I18N = {
    lang: detect(),
    t(key) {
      const v = STRINGS[I18N.lang][key];
      return v == null ? STRINGS.pt[key] : v;
    },
    set(lang) {
      if (!STRINGS[lang]) return;
      I18N.lang = lang;
      try { localStorage.setItem('neonsnake.lang', lang); } catch (e) {}
      I18N.apply();
    },
    // idioma informado pela plataforma (ex.: CrazyGames). Só vale se o jogador
    // ainda não escolheu no menu.
    setDefault(locale) {
      if (saved()) return;
      const lang = fromLocale(locale);
      if (lang === I18N.lang) return;
      I18N.lang = lang;
      I18N.apply();
      root.dispatchEvent(new Event('langchange'));
    },
    // textos fixos do HTML: elementos com data-i18n (texto) ou data-i18n-title
    apply() {
      document.documentElement.lang = I18N.lang === 'pt' ? 'pt-BR' : 'en';
      document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = I18N.t(el.dataset.i18n); });
      document.querySelectorAll('[data-i18n-title]').forEach((el) => { el.title = I18N.t(el.dataset.i18nTitle); });
      document.querySelectorAll('[data-lang]').forEach((el) => el.classList.toggle('sel', el.dataset.lang === I18N.lang));
    },
  };
  root.I18N = I18N;
})(this);
