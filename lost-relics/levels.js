// Mundo 1 Amazônia (1-21) · 2 Selva Esmeralda (22-42) · 3 Cenote (43-57) · 4 Vale Dourado (58-86).
// Pra ajustar a dificuldade, mude só os números daqui (moves, target, stars).
// Joias: 0 rubi · 1 esmeralda · 2 safira · 3 topázio · 4 ametista · 5 diamante
// Layout: . joia  x sem casa  s/S areia 1/2  r/R/T rocha 1/2/3  v cipó  w/W cipó sobre areia 1/2  a baú
// tut: tutorial mostrado antes da fase (chave em i18n)
// 02/11: portals [[deX, deY, paraX, paraY]] · river [{ row, dir }] · storm { every, n, cap } · cavein { every, n, cap } · thief N (ladrão sobe a cada N jogadas) · puzzle + fixedSeed
  // layout novo: g/G portão (G com areia) · p placa · k barril · c joia maldita. Metas: ritual, plate, light, cart. Campos: flood, dark, mirror, spin, cart, skullSpawn, phase2
(function (root) {
  const FULL = ['........', '........', '........', '........', '........', '........', '........', '........'];
  const LEVELS = [
    // ---- Mundo 1 = AMAZÔNIA (18/10, pedido dele): fases 1-21, introdutórias, com todos os tutoriais e os bichos da floresta ----
    // (jiboia, sapo e aranha). As fases que eram 1-51 andaram +15 (save.v3 no game.js migra o progresso).
    { /*1*/ moves: 15, colors: 5, goals: [{ type: 'score', target: 1500 }], tut: 'swap', layout: FULL },
    { /*2*/ moves: 18, colors: 5, goals: [{ type: 'collect', color: 0, target: 25 }], tut: 'collect', layout: FULL },
    { /*3*/ moves: 14, colors: 5, goals: [{ type: 'score', target: 5000 }], tut: 'line', layout: FULL },
    { /*4*/ moves: 15, colors: 5, goals: [{ type: 'sand' }], tut: 'sand', layout: [
      '........', '........', '........', '...ss...', '..ssss..', '...ss...', '........', '........'] },
    { /*5*/ moves: 18, colors: 5, goals: [{ type: 'sand' }], tut: 'barrel', layout: [
      '........', '.ss..ss.', '.ss..ss.', '........', '........', '.ss..ss.', '.ss..ss.', '........'] },
    // fase 6: desafio introdutório de rubis (a onça foi removida)
    { /*6*/ moves: 16, colors: 5, goals: [{ type: 'collect', color: 0, target: 22 }], layout: FULL },
    { /*7*/ moves: 16, colors: 5, goals: [{ type: 'artifact', target: 1 }], artifacts: 1, artifactMax: 1, tut: 'artifact', layout: [
      '....a...', '........', '........', '........', '........', '........', '........', '........'] },
    { /*8*/ moves: 18, colors: 5, goals: [{ type: 'vine', target: 8 }], tut: 'vine', layout: [
      '........', '........', '..v..v..', '...vv...', '...vv...', '..v..v..', '........', '........'] },
    { /*9*/ moves: 14, colors: 5, goals: [{ type: 'rock', target: 7 }], tut: 'rock', layout: [
      '........', '........', '........', '........', '........', 'r.rr.rr.', '.r....r.', '........'] },
    // fase 10 = JIBOIA na margem do rio (areia)
    { /*10*/ moves: 10, colors: 5, goals: [{ type: 'boss', target: 1 }, { type: 'sand' }], bossKind: 'boa', bossHp: 4, tut: 'boa', layout: [
      '........', '........', '........', '..ssss..', '..ssss..', '........', '........', '........'] },
    { /*11*/ moves: 16, colors: 5, goals: [{ type: 'score', target: 9000 }], tut: 'idol', layout: FULL },
    { /*12*/ moves: 20, colors: 6, goals: [{ type: 'collect', color: 5, target: 20 }], tut: 'diamond', layout: FULL },
    // fase 13 = SAPO venenoso nas vitórias-régias
    { /*13*/ moves: 12, colors: 6, goals: [{ type: 'boss', target: 1 }], bossKind: 'frog', bossHp: 3, tut: 'frog', layout: [
      'xx....xx', 'x......x', '........', '........', '........', '........', 'x......x', 'xx....xx'] },
    { /*14*/ moves: 28, colors: 6, goals: [{ type: 'sand' }, { type: 'vine', target: 4 }], layout: [
      '........', '........', '.vssssv.', '..s..s..', '..s..s..', '.vssssv.', '........', '........'] },
    // ---- fases 15-20 (18/10, pedido dele): 1 fase por tronco da trilha (a pintura tem 21). Só mecânicas que a Amazônia já ensinou. ----
    { /*15*/ moves: 22, colors: 6, goals: [{ type: 'collect', color: 3, target: 28 }], layout: FULL },
    { /*16*/ moves: 14, colors: 5, goals: [{ type: 'rock', target: 9 }], layout: [
      '........', '........', '........', '........', 'r.rr.rr.', '.r.rr.r.', '........', '........'] },
    { /*17*/ moves: 14, colors: 5, goals: [{ type: 'artifact', target: 2 }], artifacts: 2, artifactMax: 1, layout: [
      '....a...', '........', '........', '........', '........', '........', '........', '........'] },
    { /*18*/ moves: 32, colors: 6, goals: [{ type: 'vine', target: 10 }], layout: [
      '........', '........', '.v....v.', '..v..v..', '...vv...', '..v..v..', '.v....v.', '........'] },
    { /*19*/ moves: 16, colors: 5, goals: [{ type: 'score', target: 12000 }], layout: FULL },
    // fase 20 = ARANHA-TECELÃ (18/10): casulos com contagem; quebrar o casulo antes de zerar ou perde 2 movimentos
    { /*20*/ weak: true, moves: 29, colors: 6, goals: [{ type: 'boss', target: 1 }], bossKind: 'spider', bossHp: 4, tut: 'spider', layout: FULL },
    // fase 21 = chefe final da Amazônia: a aranha volta entre as pedras da trilha
    { /*21*/ weak: true, moves: 24, colors: 5, goals: [{ type: 'boss', target: 1 }], bossKind: 'spider', bossHp: 5, boss: true, tut: 'spider', layout: [
      'r......r', '........', '........', '........', '........', '........', '........', 'r..rr..r'] },
    // ---- Mundo 2 = Selva Esmeralda (eram as fases 1-21) ----
    { /*22*/ moves: 15, colors: 5, goals: [{ type: 'score', target: 2000 }], layout: FULL },
    { /*23*/ moves: 18, colors: 5, goals: [{ type: 'collect', color: 0, target: 30 }], layout: FULL },
    { /*24*/ moves: 10, colors: 5, goals: [{ type: 'moss' }], tut: 'moss', layout: ['........', '........', '........', '...mm...', '...mm...', '........', '........', '........'] },
    { /*25*/ moves: 15, colors: 5, goals: [{ type: 'sand' }], layout: [
      '........', '........', '........', '..ssss..', '..ssss..', '........', '........', '........'] },
    // fase 5 = 1º chefe (14/10, ideia dele): Escaravelho Dourado, 3 golpes. Antes era "35 esmeraldas + 35 safiras".
    // 3 escaravelhos x 3 vidas, 24 movimentos (pedido dele 14/10: com 1 escaravelho de 3 vidas ficou fácil e rápido).
    // Simulação (120 sementes, jogador médio): vence ~61%, quem vence leva ~10 jogadas (antes: 77% em 5 jogadas).
    // Com 2 vidas cada ainda morria em ~7 jogadas; só a própria joia valer golpe ficou impossível (<20%).
    { /*26*/ weak: true, moves: 14, colors: 5, goals: [{ type: 'boss', target: 3 }], scarab: 3, scarabHp: 3, boss: true, tut: 'boss', layout: FULL },
    { /*27*/ moves: 15, colors: 5, goals: [{ type: 'sand' }], tut: 'portal', portals: [[1, 2, 6, 4], [6, 2, 1, 4]], layout: ['........', '........', '........', '.xx..xx.', '.ss..ss.', '.ss..ss.', '.ss..ss.', '........'] },
    { /*28*/ moves: 12, colors: 5, goals: [{ type: 'score', target: 8000 }], tut: 'bomb', bombTimer: 10, layout: ['........', '........', '..b..b..', '........', '........', '........', '........', '........'] },
    // fase 8 (15/10, pedido dele: escaravelhos também em fase comum): ENXAME, 4 escaravelhos de 1 vida + a meta de pontos.
    { /*29*/ weak: true, moves: 15, colors: 5, goals: [{ type: 'boss', target: 4 }, { type: 'score', target: 9000 }], scarab: 4, scarabHp: 3, layout: FULL },
    { /*30*/ moves: 14, colors: 5, goals: [{ type: 'artifact', target: 2 }], artifacts: 2, artifactMax: 1, tut: 'cavein', cavein: { every: 4, n: 2, cap: 10 }, layout: ['...a....', '........', '........', '........', '........', '........', '........', '........'] },
    { /*31*/ moves: 10, colors: 5, goals: [{ type: 'artifact', target: 2 }], artifacts: 2, artifactMax: 1, tut: 'clock', clockSpawn: 0.08, clockMax: 2, layout: ['....a...', '........', '........', '........', '........', '........', '........', '........'] },
    // fase 32 = enxame real no lugar da antiga onça de jade
    { /*32*/ weak: true, moves: 22, colors: 5, goals: [{ type: 'boss', target: 3 }], scarab: 3, scarabHp: 2, boss: true, tut: 'boss', layout: FULL },
    { /*33*/ moves: 10, colors: 5, goals: [{ type: 'make', special: 'line', target: 3 }], tut: 'make', layout: FULL },
    // fase 12 (15/10, ideia dele): JIBOIA. Monta numa joia (golpe = joia dela ou encostada, ela foge pra longe);
    // a cada 2 jogadas sem apanhar engole 1 joia encostada, que vira bolo de pedra. Antes: areia + 8 rochas.
    { /*34*/ weak: true, moves: 14, colors: 5, goals: [{ type: 'boss', target: 1 }, { type: 'sand' }], bossKind: 'boa', bossHp: 4, layout: [
      '........', '........', 'r......r', 'rr....rr', '.ssssss.', '.ssssss.', 'rr....rr', 'r......r'] },
    { /*35*/ moves: 3, colors: 5, puzzle: true, fixedSeed: 108, goals: [{ type: 'score', target: 3000 }], tut: 'puzzle', layout: FULL },
    { /*36*/ moves: 35, colors: 6, goals: [{ type: 'vine', target: 10 }], portals: [[1, 2, 6, 4], [6, 2, 1, 4]], layout: ['........', '.v....v.', '..v..v..', '.xx..xx.', '..v..v..', '.v....v.', '..v..v..', '........'] },
    // fase 15 = 3º chefe (14/10): ÍDOLO DE PEDRA. Bloco 2x2 fixo no meio; combinação comum não faz nada,
    // só explosão de joia especial (Flecha, Selo, Orbe) machuca. Depois de cada golpe, escudo de runas por 1 jogada.
    { /*37*/ moves: 14, colors: 5, goals: [{ type: 'boss', target: 1 }], bossKind: 'statue', bossHp: 3, statueAt: [3, 3], boss: true, tut: 'statue', layout: FULL },
    { /*38*/ moves: 14, colors: 6, goals: [{ type: 'boss', target: 1 }], scarab: 1, scarabHp: 3, thief: 2, boss: true, tut: 'thief', layout: FULL },
    { /*39*/ moves: 34, colors: 5, goals: [{ type: 'make', special: 'nova', target: 1 }], tut: 'nova', layout: FULL },
    // fase 18 (15/10, ideia dele): MACACO. Monta numa joia (golpe = joia dele ou encostada, ele pula pra longe);
    // a cada 3 jogadas sem apanhar troca 2 joias de lugar perto dele. Antes: só 7.500 pontos.
    { /*40*/ weak: true, moves: 31, colors: 6, goals: [{ type: 'boss', target: 1 }, { type: 'score', target: 7500 }], bossKind: 'frog', bossHp: 3, layout: [
      'xx....xx', 'x......x', '........', '........', '........', '........', 'x......x', 'xx....xx'] },
    { /*41*/ moves: 19, colors: 6, goals: [{ type: 'artifact', target: 2 }, { type: 'rock', target: 8 }], artifacts: 2, artifactMax: 1, layout: [
      '...a....', '........', '........', 'r.r..r.r', '.r.rr.r.', '........', '........', '........'] },
    // fase 20 = chefe final (14/10): KUKULKÁN, a serpente emplumada. Ocupa 2 joias vizinhas e rasteja 1 casa
    // a cada jogada em que não apanha. Golpe = quebrar uma das 2 joias dela (encostada não vale: ela já é grande);
    // ao apanhar, mergulha e reaparece longe. 5 vidas.
    { /*42*/ phase2: { cavein: { every: 4, n: 2, cap: 8 } }, weak: true, moves: 36, colors: 6, goals: [{ type: 'boss', target: 1 }], bossKind: 'serpent', bossHp: 5, boss: true, tut: 'serpent', layout: [
      'r......r', '........', '........', '........', '........', '........', '........', 'r..rr..r'] },
    // ---- fases 21-35 (16/10): mecânicas adaptadas do Candy Crush ----
    { /*43*/ moves: 10, colors: 5, goals: [{ type: 'score', target: 8000 }], tut: 'river', river: [{ row: 3, dir: 1 }, { row: 4, dir: -1 }], layout: FULL },
    { /*44*/ moves: 10, colors: 5, goals: [{ type: 'make', special: 'line', target: 3 }], river: [{ row: 2, dir: 1 }], layout: FULL },
    { /*45*/ moves: 10, colors: 5, goals: [{ type: 'score', target: 8000 }], bombTimer: 10, river: [{ row: 5, dir: -1 }], layout: ['........', '........', '..b..b..', '........', '........', '........', '........', '........'] },
    { /*46*/ moves: 16, colors: 5, goals: [{ type: 'ritual', order: [0, 2, 1], target: 9 }], tut: 'ritual', layout: FULL },
    // fase 47 = jiboia do musgo no lugar da antiga onça de jade
    { /*47*/ weak: true, moves: 27, colors: 5, goals: [{ type: 'boss', target: 1 }], bossKind: 'boa', bossHp: 6, boss: true, tut: 'boa', layout: [
      'mm....mm', 'm......m', '........', '........', '........', '........', 'm......m', 'mm....mm'] },
    { /*48*/ moves: 12, colors: 5, goals: [{ type: 'sand' }], river: [{ row: 3, dir: 1 }, { row: 4, dir: -1 }], layout: ['........', '........', '..ssss..', 'ssssssss', 'ssssssss', '..ssss..', '........', '........'] },
    { /*49*/ moves: 12, colors: 5, goals: [{ type: 'artifact', target: 2 }], artifacts: 2, artifactMax: 1, bombSpawn: 0.05, bombMax: 2, bombTimer: 9, clockSpawn: 0.08, clockMax: 2, layout: [
      '...a....', '........', '........', '........', '........', '........', '........', '........'] },
    { /*50*/ moves: 3, colors: 5, puzzle: true, fixedSeed: 104, goals: [{ type: 'score', target: 3500 }], tut: 'puzzle', layout: FULL },
    { /*51*/ moves: 16, colors: 5, goals: [{ type: 'plate' }, { type: 'sand' }], tut: 'gate', layout: ['........', '..p..p..', '........', '.GG..GG.', '.GG..GG.', '........', '........', '........'] },
    // fase 30 = chefe: Ídolo de Pedra com 4 vidas e musgo crescendo em volta
    { /*52*/ moves: 21, colors: 5, goals: [{ type: 'boss', target: 1 }], bossKind: 'statue', bossHp: 4, statueAt: [3, 3], boss: true, layout: [
      'm......m', '........', '........', '........', '........', '........', '........', 'm......m'] },
    { /*53*/ moves: 12, colors: 6, goals: [{ type: 'moss' }], river: [{ row: 3, dir: 1 }, { row: 4, dir: -1 }], layout: ['........', '.mm..mm.', '........', '........', '........', '........', '.mm..mm.', '........'] },
    { /*54*/ moves: 10, colors: 6, goals: [{ type: 'boss', target: 1 }], bossKind: 'bat', bossHp: 3, boss: true, tut: 'bat', layout: FULL },
    { /*55*/ moves: 10, colors: 5, goals: [{ type: 'collect', color: 2, target: 25 }], tut: 'flood', flood: { every: 4, max: 4 }, layout: FULL },
    { /*56*/ weak: true, moves: 14, colors: 5, goals: [{ type: 'boss', target: 1 }, { type: 'sand' }], bossKind: 'boa', bossHp: 4, layout: [
      '........', '........', 'm......m', '.ssssss.', '.ssssss.', 'm......m', '........', '........'] },
    // fase 35 = chefe final do trecho: Kukulkán desperto (6 vidas), ídolos amaldiçoados caindo e musgo nos cantos
    { /*57*/ phase2: { river: [{ row: 3, dir: 1 }, { row: 4, dir: -1 }] }, weak: true, moves: 34, colors: 6, goals: [{ type: 'boss', target: 1 }], bossKind: 'serpent', bossHp: 3, boss: true, bombSpawn: 0.04, bombMax: 1, bombTimer: 12, layout: [
      'm......m', '........', '........', '........', '........', '........', '........', 'mr.rr.rm'] },
    // ---- Mundo 4 (18/10): Vale das Pirâmides, fases 58-72. Escaravelhos (Egito), cobra (jiboia), ídolo; musgo, ídolo amaldiçoado, relógios e Sol Ardente ----
    { /*58*/ moves: 24, colors: 5, goals: [{ type: 'sand' }], tut: 'storm', storm: { every: 3, n: 2, cap: 26 }, layout: ['........', '........', '.ssssss.', '.ssssss.', '.ssssss.', '.ssssss.', '........', '........'] },
    { /*59*/ moves: 22, colors: 6, goals: [{ type: 'collect', color: 3, target: 30 }], layout: FULL },
    { /*60*/ moves: 15, colors: 6, goals: [{ type: 'rock', target: 12 }], cavein: { every: 5, n: 2, cap: 14 }, layout: ['........', '..RR.RR.', '........', '.R....R.', '.R....R.', '........', '..RR.RR.', '........'] },
    // fase 40 = chefe: ESCARAVELHOS REAIS, 4 de 2 vidas (o Egito é a casa deles)
    { /*61*/ phase2: { spin: { every: 4 } }, weak: true, moves: 20, colors: 6, goals: [{ type: 'boss', target: 4 }], scarab: 4, scarabHp: 2, boss: true, layout: FULL },
    { /*62*/ moves: 10, colors: 5, goals: [{ type: 'light' }], tut: 'dark', dark: { torches: [[1, 1], [6, 1], [1, 6], [6, 6]] }, layout: FULL },
    { /*63*/ moves: 24, colors: 6, goals: [{ type: 'artifact', target: 3 }], artifacts: 3, artifactMax: 1, bombSpawn: 0.04, bombMax: 1, bombTimer: 10, clockSpawn: 0.06, clockMax: 2, layout: [
      '...a....', '........', '........', '........', '........', '........', '........', '........'] },
    { /*64*/ moves: 46, colors: 6, goals: [{ type: 'vine', target: 12 }, { type: 'sand' }], storm: { every: 5, n: 1, cap: 16 }, layout: ['........', '.v.ss.v.', '.v.ss.v.', '..vssv..', '..vssv..', '.v.ss.v.', '.v.ss.v.', '........'] },
    { /*65*/ moves: 16, colors: 5, goals: [{ type: 'make', special: 'line', target: 3 }], tut: 'skull', skullSpawn: 0.12, skullMax: 3, layout: ['........', '..c..c..', '........', '........', '........', '........', '..c..c..', '........'] },
    // fase 45 = a COBRA DO DESERTO (a jiboia) numa fase de areia
    { /*66*/ weak: true, moves: 15, colors: 5, goals: [{ type: 'boss', target: 1 }, { type: 'sand' }], bossKind: 'boa', bossHp: 5, layout: [
      '........', '........', '.ssssss.', '.ssssss.', '.ssssss.', '.ssssss.', '........', '........'] },
    { /*67*/ moves: 29, colors: 6, goals: [{ type: 'score', target: 20000 }], tut: 'keg', layout: ['........', '.k....k.', '........', '...k.k..', '........', '.k....k.', '........', '........'] },
    { /*68*/ moves: 32, colors: 6, goals: [{ type: 'score', target: 15000 }], tut: 'mirror', mirror: true, layout: FULL },
    { /*69*/ moves: 28, colors: 5, goals: [{ type: 'cart' }], tut: 'cart', cart: { path: [[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [7, 6], [7, 5], [7, 4], [6, 4], [5, 4], [4, 4], [3, 4], [2, 4], [1, 4], [0, 4]] }, layout: FULL },
    { /*70*/ moves: 3, colors: 6, puzzle: true, fixedSeed: 209, goals: [{ type: 'score', target: 3500 }], tut: 'puzzle', layout: FULL },
    // fase 50 = chefe: o ÍDOLO DA ESFINGE (ídolo de pedra com 4 vidas e musgo nos cantos)
    { /*71*/ moves: 21, colors: 5, goals: [{ type: 'boss', target: 1 }], bossKind: 'statue', bossHp: 4, statueAt: [3, 3], boss: true, layout: [
      'm......m', '........', '........', '........', '........', '........', '........', 'm......m'] },
    // ---- fases 72-85 (18/10): 1 fase por disco de areia do Egito (são 29), só com mecânicas já ensinadas ----
    { /*72*/ moves: 22, colors: 6, goals: [{ type: 'collect', color: 0, target: 32 }], tut: 'spin', spin: { every: 4 }, layout: FULL },
    { /*73*/ moves: 46, colors: 6, goals: [{ type: 'sand' }, { type: 'moss' }], storm: { every: 5, n: 1, cap: 26 }, layout: ['m......m', '........', '.ssssss.', '.ssssss.', '.ssssss.', '.ssssss.', '........', 'm......m'] },
    { /*74*/ moves: 23, colors: 6, goals: [{ type: 'ritual', order: [3, 0, 4, 2], target: 12 }], skullSpawn: 0.08, skullMax: 2, layout: FULL },
    { /*75*/ moves: 30, colors: 6, goals: [{ type: 'rock', target: 12 }], portals: [[1, 2, 6, 4], [6, 2, 1, 4]], layout: ['........', '.RR..RR.', '........', '.xx..xx.', '........', '........', 'rr.rr.rr', '.r....r.'] },
    { /*76*/ moves: 38, colors: 5, goals: [{ type: 'make', special: 'nova', target: 1 }], clockSpawn: 0.06, clockMax: 2, layout: FULL },
    { /*77*/ moves: 30, colors: 5, goals: [{ type: 'boss', target: 1 }, { type: 'sand' }], bossKind: 'mummy', bossHp: 4, boss: true, tut: 'mummy', layout: ['m......m', '........', '.ssssss.', '.ssssss.', '.ssssss.', '.ssssss.', '........', 'm......m'] },
    { /*78*/ moves: 44, colors: 6, goals: [{ type: 'vine', target: 12 }, { type: 'moss' }], flood: { every: 5, max: 3 }, layout: ['........', '.v.mm.v.', '.v.mm.v.', '..v..v..', '..v..v..', '.v.mm.v.', '.v.mm.v.', '........'] },
    { /*79*/ moves: 29, colors: 6, goals: [{ type: 'artifact', target: 3 }], artifacts: 3, artifactMax: 1, bombSpawn: 0.04, bombMax: 1, bombTimer: 10, clockSpawn: 0.06, clockMax: 2, portals: [[1, 2, 6, 4], [6, 2, 1, 4]], layout: ['...a....', '........', '........', '.xx..xx.', '........', '........', '........', '........'] },
    { /*80*/ moves: 14, colors: 6, goals: [{ type: 'boss', target: 2 }], scarab: 2, scarabHp: 2, thief: 2, boss: true, layout: FULL },
    { /*81*/ moves: 32, colors: 6, goals: [{ type: 'plate' }, { type: 'collect', color: 4, target: 25 }], layout: ['........', '.p....p.', '........', '.gg..gg.', '.gg..gg.', '........', '..p..p..', '........'] },
    { /*82*/ moves: 36, colors: 6, goals: [{ type: 'sand' }], bombTimer: 16, clockSpawn: 0.08, clockMax: 2, storm: { every: 5, n: 1, cap: 26 }, layout: ['........', '..b..b..', 'SS....SS', 'SSssssSS', '.ssssss.', '..ssss..', '........', '........'] },
    { /*83*/ moves: 30, colors: 6, goals: [{ type: 'light' }, { type: 'make', special: 'barrel', target: 2 }], dark: { torches: [[3, 3], [4, 4]] }, layout: FULL },
    { /*84*/ moves: 30, colors: 5, goals: [{ type: 'boss', target: 1 }], bossKind: 'statue', bossHp: 5, statueAt: [3, 3], boss: true, layout: [
      'm......m', '........', '........', '........', '........', '........', '........', 'm......m'] },
    { /*85*/ moves: 20, colors: 6, goals: [{ type: 'score', target: 26000 }], clockSpawn: 0.08, clockMax: 3, river: [{ row: 3, dir: 1 }, { row: 5, dir: -1 }], layout: FULL },
    // fase 51 = chefe final do Mundo 3: enxame real de 5 escaravelhos + meta de pontos, ídolos amaldiçoados caindo e relógios
    { /*86*/ phase2: { storm: { every: 3, n: 2, cap: 14 } }, weak: true, moves: 14, colors: 6, goals: [{ type: 'boss', target: 5 }, { type: 'score', target: 15000 }], scarab: 5, scarabHp: 2, boss: true, bombSpawn: 0.03, bombMax: 1, bombTimer: 12, clockSpawn: 0.05, clockMax: 2, layout: [
      'm......m', '........', '........', '........', '........', '........', '........', 'm......m'] },
  ];
  // estrelas: [1, 2, 3] em pontos — calibradas pelo tools/simular.js (13/10/2026, 60 partidas por fase)
  // ganhar já dá 1 estrela; 2 = pontuação mediana de quem ganha; 3 = os 20% melhores
  const STARS = [
    // Amazônia (18/10): calibradas com tools/calibrar.js
    /*1*/[4000, 12500, 16500], /*2*/[7500, 22500, 27000], /*3*/[5500, 15500, 21500], /*4*/[5000, 15500, 25500], /*5*/[6500, 22000, 31500], /*6*/[8500, 31000, 50500], /*7*/[4500, 14500, 23000], /*8*/[6000, 18000, 24000], /*9*/[4500, 14500, 21500], /*10*/[4500, 16500, 25500], /*11*/[9000, 19500, 26000], /*12*/[4500, 13000, 16500], /*13*/[3000, 8000, 10500], /*14*/[6000, 18000, 21500], /*15*/[4500, 16500, 20000], /*16*/[3000, 12000, 17000], /*17*/[6500, 20000, 25000], /*18*/[6500, 19500, 24000], /*19*/[7000, 17500, 26500], /*20*/[8500, 20000, 26000], /*21*/[8000, 26500, 35000],
    // Selva Esmeralda (eram 1-21)
    /*22*/[4500, 12500, 18500], /*23*/[7000, 21000, 27500], /*24*/[3000, 9000, 13500], /*25*/[4500, 13500, 24500], /*26*/[6500, 40500, 67500], // fase 5 recalibrada pros 3 escaravelhos (14/10)
    /*27*/[4000, 18000, 22500], /*28*/[6000, 17500, 26500], /*29*/[10000, 31500, 48000], /*30*/[5000, 18000, 30000], /*31*/[5500, 18500, 33000], /*32*/[15500, 47000, 73000], // fase 9 = onça normal (18/10, recalibrar); fase 11 = onça de jade
    /*33*/[3500, 13500, 21500], /*34*/[8500, 34000, 44500], /*35*/[3000, 6000, 10000], /*36*/[6000, 17000, 21000], /*37*/[6500, 23000, 33000], // fase 15 = ídolo (14/10)
    /*38*/[4000, 9500, 12500], /*39*/[9000, 45000, 70000], /*40*/[5000, 20000, 22000], /*41*/[3000, 12000, 15500], /*42*/[12500, 30500, 36000], // fase 20 = serpente (14/10)
    // fases 21-35 (16/10, simulador 60 partidas): robô vence 78-100%, sobrando ~7-12 jogadas
    /*43*/[6500, 16500, 25000], /*44*/[3500, 14000, 23000], /*45*/[6500, 16500, 26000], /*46*/[6500, 16000, 22500], /*47*/[17000, 61500, 84500], // fase 25 = onça forte
    /*48*/[8000, 31000, 40000], /*49*/[6000, 21500, 34500], /*50*/[3500, 8000, 20000], /*51*/[5000, 19500, 26500], /*52*/[13500, 35000, 53500], // fase 30 = ídolo forte
    /*53*/[3500, 11500, 15500], /*54*/[3500, 7500, 10500], /*55*/[5500, 14500, 23000], /*56*/[5500, 32000, 44500], /*57*/[9500, 22500, 39500], // fase 35 = Kukulkán desperto
    // fases 37-51 (18/10): calibradas com tools/calibrar.js (robô vence 80-95%) + folga de movimentos pra jogador humano nas curtas
    /*58*/[10500, 39500, 50000], /*59*/[5000, 16500, 21000], /*60*/[2500, 8500, 11500], /*61*/[8000, 20500, 25000], /*62*/[3500, 10000, 16500],
    /*63*/[5500, 16000, 19500], /*64*/[10000, 28000, 34000], /*65*/[4500, 13500, 18000], /*66*/[6500, 34000, 52000], /*67*/[11000, 25500, 29500],
    /*68*/[9000, 22500, 27000], /*69*/[11500, 33000, 40500], /*70*/[3500, 7000, 12000], /*71*/[13500, 35000, 53500], /*72*/[3000, 14500, 19000], /*73*/[11500, 27500, 31500], /*74*/[5000, 12500, 17000], /*75*/[5000, 15500, 19500], /*76*/[13500, 40000, 84000], /*77*/[15000, 49000, 56000], /*78*/[9500, 23500, 29000], /*79*/[6500, 16500, 19000], /*80*/[4000, 10000, 13000], /*81*/[6500, 16000, 23000], /*82*/[11500, 31500, 50000], /*83*/[8000, 20500, 25000], /*84*/[15000, 39500, 57500], /*85*/[18500, 41500, 45500], /*86*/[9000, 26000, 31000],
  ];
  // Chefes (14/10), simulador com robô que caça o chefe e enxerga as joias que vão cair (joga melhor que gente;
  // vale como comparação): fase 5 vence 100% sobrando 18 jogadas (ele testou e aprovou), 10 = 98%/12,
  // 15 = 92%/9, 20 = 88%/9. Cada chefe um pouco mais apertado que o anterior.
  LEVELS.forEach((l, i) => { l.id = i + 1; l.stars = STARS[i]; });
  root.LEVELS = LEVELS;
  if (typeof module !== 'undefined') module.exports = LEVELS;
})(typeof window !== 'undefined' ? window : globalThis);
