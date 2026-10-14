// Textos em português e inglês. Idioma: o escolhido no menu; senão o do navegador (pt → português, resto → inglês).
(function (root) {
  const STRINGS = {
    pt: {
      'title.sub': 'Uma expedição de joias',
      'menu.play': 'JOGAR', 'menu.continue': 'CONTINUAR', 'menu.sound': 'SOM', 'menu.music': 'MÚSICA',
      'on': 'LIGADO', 'off': 'DESLIGADO', 'lang': 'ENGLISH',
      'map.title': 'Selva Esmeralda', 'map.sub': 'Maldição da Pirâmide', 'map.world': 'MUNDO 1', 'map.soon': 'Próximo mundo: Pirâmides do Egito, em breve',
      'level': 'FASE', 'moves': 'MOVIMENTOS', 'score': 'MOEDAS',
      'wallet': 'Você tem {n} moedas', 'shop.title': 'Loja do Templo', 'shop.eyebrow': 'TROQUE SUAS MOEDAS', 'shop.have': 'Você tem: {n}', 'shop.use': 'USAR NESTA FASE', 'shop.get': 'Comprar vantagens na loja', 'shop.note': 'Moedas vêm de cada fase vencida: quanto mais pontos e estrelas, mais moedas.',
      'item.moves': '+3 movimentos', 'item.moves.d': 'Começa a fase com 3 movimentos a mais.', 'item.dyn': 'Joias Flecha', 'item.dyn.d': 'Duas Joias Flecha já no tabuleiro.', 'item.orb': 'Orbe Solar inicial', 'item.orb.d': 'Começa com um Orbe Solar pronto.', 'item.hammer': 'Martelo', 'item.hammer.d': 'Na fase, toque no martelo e depois numa joia: ela quebra sem gastar movimento.', 'goal': 'META',
      'play': 'JOGAR', 'retry': 'TENTAR DE NOVO', 'next': 'PRÓXIMA FASE', 'map': 'MAPA', 'resume': 'CONTINUAR', 'restart': 'RECOMEÇAR',
      'pause': 'PAUSA', 'close': 'FECHAR',
      'goal.score': 'Faça {n} pontos', 'goal.collect': 'Junte {n}', 'goal.sand': 'Limpe toda a areia', 'goal.artifact': 'Leve {n} baú(s) até o fundo',
      'goal.rock': 'Quebre {n} rochas', 'goal.vine': 'Quebre {n} selos', 'goal.boss': 'Derrote os {n} escaravelhos',
      'tut.boss': 'Três ESCARAVELHOS DOURADOS guardam o templo! Cada um fica em cima de uma joia. Quebre a joia dele ou uma encostada: ele leva um golpe e voa pra outra. Só um golpe por jogada em cada, e quem ficar 3 jogadas sem apanhar foge. Derrube os três!',
      'win.title': 'Fase concluída!', 'win.best': 'Recorde: {n}', 'win.new': 'Novo recorde!',
      'lose.title': 'Faltou pouco!', 'lose.left': 'Ainda falta:', 'lose.extra': '+5 MOVIMENTOS', 'lose.extraAd': 'assistindo um anúncio',
      'rush': 'Corrida do Tesouro!', 'shuffle': 'Sem jogadas, embaralhando…',
      'praise.1': 'Ótimo!', 'praise.2': 'Incrível!', 'praise.3': 'Lendário!',
      'boss': 'FASE DO GUARDIÃO',
      'announce': 'Fase {n}', 'announce.say': 'Fase {n}!', 'announce.boss': 'Fase do guardião!', 'announce.final': 'Fase final!',
      'tut.swap': 'Arraste uma joia para o lado para trocar de lugar com a vizinha. Três iguais em linha somem.',
      'tut.collect': 'Cada fase tem uma meta. Aqui você precisa juntar rubis: combine rubis para contar.',
      'tut.line': 'Quatro em linha viram uma JOIA FLECHA. Use ela numa combinação e um dardo do templo atravessa a fileira inteira na direção da flecha.',
      'tut.sand': 'Areia cobre o chão do templo. Combine joias em cima dela para limpar. Areia escura precisa de duas.',
      'tut.barrel': 'Formato de L ou T vira uma JOIA SELO: o anel de runas explode tudo em volta, duas vezes.',
      'tut.artifact': 'Leve o BAÚ até o fundo do tabuleiro. Limpe as joias embaixo dele, ou arraste o baú para baixo (gasta um movimento).',
      'tut.idol': 'Cinco em linha viram o ORBE SOLAR. Troque ele com uma joia e raios de sol levam todas daquela cor. Troque com um especial e veja o que acontece.',
      'tut.rock': 'ROCHAS não se mexem. Faça combinações encostadas nelas para quebrar.',
      'tut.diamond': 'O DIAMANTE entrou na expedição. Agora são seis joias, e fica mais difícil.',
      'tut.vine': 'SELOS DOURADOS prendem a joia: ela não troca nem cai. Use ela numa combinação para quebrar o selo.',
      'tip.combo': 'Dica: troque dois especiais entre si para uma explosão maior.',
      'ad.tag': 'ANÚNCIO', 'ad.slot': 'Espaço do anúncio', 'ad.reward': 'recompensa: +5 movimentos', 'ad.next': 'entre fases',
      'ad.rewardIn': 'Recompensa em', 'ad.closeIn': 'Fechar em', 'ad.rewardOk': 'Recompensa liberada!', 'ad.skip': 'PULAR', 'ad.close': 'FECHAR',
      'loading': 'Abrindo o templo…',
    },
    en: {
      'title.sub': 'A jewel expedition',
      'menu.play': 'PLAY', 'menu.continue': 'CONTINUE', 'menu.sound': 'SOUND', 'menu.music': 'MUSIC',
      'on': 'ON', 'off': 'OFF', 'lang': 'PORTUGUÊS',
      'map.title': 'Emerald Jungle', 'map.sub': 'Curse of the Pyramid', 'map.world': 'WORLD 1', 'map.soon': 'Next world: Pyramids of Egypt, coming soon',
      'level': 'LEVEL', 'moves': 'MOVES', 'score': 'COINS',
      'wallet': 'You have {n} coins', 'shop.title': 'Temple Shop', 'shop.eyebrow': 'SPEND YOUR COINS', 'shop.have': 'You have: {n}', 'shop.use': 'USE IN THIS LEVEL', 'shop.get': 'Buy boosters in the shop', 'shop.note': 'Coins come from every level you beat: more points and stars, more coins.',
      'item.moves': '+3 moves', 'item.moves.d': 'Start the level with 3 extra moves.', 'item.dyn': 'Starting dynamite', 'item.dyn.d': 'Two dynamites already on the board.', 'item.orb': 'Starting Solar Orb', 'item.orb.d': 'Start with a Solar Orb ready.', 'item.hammer': 'Hammer', 'item.hammer.d': 'In a level, tap the hammer then a jewel: it breaks without using a move.', 'goal': 'GOAL',
      'play': 'PLAY', 'retry': 'TRY AGAIN', 'next': 'NEXT LEVEL', 'map': 'MAP', 'resume': 'RESUME', 'restart': 'RESTART',
      'pause': 'PAUSED', 'close': 'CLOSE',
      'goal.score': 'Score {n} points', 'goal.collect': 'Collect {n}', 'goal.sand': 'Clear all the sand', 'goal.artifact': 'Bring {n} chest(s) to the bottom',
      'goal.rock': 'Break {n} rocks', 'goal.vine': 'Break {n} seals', 'goal.boss': 'Defeat the {n} scarabs',
      'tut.boss': 'Three GOLDEN SCARABS guard the temple! Each sits on a jewel. Break its jewel or one touching it: it takes a hit and flies to another. Only one hit per move on each, and any scarab left alone for 3 moves runs away. Bring all three down!',
      'win.title': 'Level complete!', 'win.best': 'Best: {n}', 'win.new': 'New best!',
      'lose.title': 'So close!', 'lose.left': 'Still missing:', 'lose.extra': '+5 MOVES', 'lose.extraAd': 'by watching an ad',
      'rush': 'Treasure Rush!', 'shuffle': 'No moves left, shuffling…',
      'praise.1': 'Great!', 'praise.2': 'Amazing!', 'praise.3': 'Legendary!',
      'boss': 'GUARDIAN LEVEL',
      'announce': 'Level {n}', 'announce.say': 'Level {n}!', 'announce.boss': 'Guardian level!', 'announce.final': 'Final level!',
      'tut.swap': 'Drag a jewel sideways to swap it with its neighbor. Three of a kind in a row disappear.',
      'tut.collect': 'Every level has a goal. Here you need rubies: match rubies to count them.',
      'tut.line': 'Four in a row make DYNAMITE. Match it or hit it and it blasts the whole line along its fuse.',
      'tut.sand': 'Sand covers the temple floor. Match jewels on top of it to clear it. Dark sand takes two.',
      'tut.barrel': 'An L or T shape makes a POWDER BARREL: it blasts everything around it, twice.',
      'tut.artifact': 'Bring the CHEST to the bottom of the board. Clear the jewels under it, or drag the chest down (costs one move).',
      'tut.idol': 'Five in a row make the GOLDEN IDOL. Swap it with a jewel and every jewel of that color vanishes. Swap it with a special and see what happens.',
      'tut.rock': 'ROCKS do not move. Make matches next to them to break them.',
      'tut.diamond': 'The DIAMOND joins the expedition. Six jewels now, and things get harder.',
      'tut.vine': 'GOLDEN SEALS lock a jewel: it cannot swap or fall. Use it in a match to break the seal.',
      'tip.combo': 'Tip: swap two specials with each other for a bigger blast.',
      'ad.tag': 'AD', 'ad.slot': 'Ad space', 'ad.reward': 'reward: +5 moves', 'ad.next': 'between levels',
      'ad.rewardIn': 'Reward in', 'ad.closeIn': 'Close in', 'ad.rewardOk': 'Reward unlocked!', 'ad.skip': 'SKIP', 'ad.close': 'CLOSE',
      'loading': 'Opening the temple…',
    },
  };
  const GEM_NAMES = {
    pt: ['rubis', 'esmeraldas', 'safiras', 'topázios', 'ametistas', 'diamantes'],
    en: ['rubies', 'emeralds', 'sapphires', 'topazes', 'amethysts', 'diamonds'],
  };
  let lang = 'pt';
  try { lang = localStorage.getItem('lostrelics.lang') || ''; } catch (e) {}
  if (!STRINGS[lang]) lang = /^pt/i.test(navigator.language || '') ? 'pt' : 'en';

  root.I18N = {
    get lang() { return lang; },
    t(key, vars) {
      let s = (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.pt[key] || key;
      if (vars) for (const k in vars) s = s.replace('{' + k + '}', vars[k]);
      return s;
    },
    gem(i) { return GEM_NAMES[lang][i]; },
    toggle() {
      lang = lang === 'pt' ? 'en' : 'pt';
      try { localStorage.setItem('lostrelics.lang', lang); } catch (e) {}
      document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    },
    setDefault(loc) {
      let saved = null;
      try { saved = localStorage.getItem('lostrelics.lang'); } catch (e) {}
      if (!saved) lang = /^pt/i.test(loc) ? 'pt' : 'en';
    },
  };
})(window);
