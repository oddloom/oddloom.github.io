// Mundo 1 Amazônia (1-21) · 2 Selva Esmeralda (22-42) · 3 Cenote (43-57) · 4 Vale Dourado (58-86).
// Pra ajustar a dificuldade, mude só os números daqui (moves, target, stars).
// Joias: 0 rubi · 1 esmeralda · 2 safira · 3 topázio · 4 ametista · 5 diamante
// Layout: . joia  x sem casa  s/S areia 1/2  r/R/T rocha 1/2/3  v cipó  w/W cipó sobre areia 1/2  a baú
// tut: tutorial mostrado antes da fase (chave em i18n)
(function (root) {
  const FULL = ['........', '........', '........', '........', '........', '........', '........', '........'];
  const LEVELS = [
    // ---- Mundo 1 = AMAZÔNIA (18/10, pedido dele): fases 1-21, introdutórias, com todos os tutoriais e os bichos da floresta ----
    // (onça-pintada, jiboia, sapo). As fases que eram 1-51 andaram +15 (save.v3 no game.js migra o progresso).
    { /*1*/ moves: 15, colors: 5, goals: [{ type: 'score', target: 1500 }], tut: 'swap', layout: FULL },
    { /*2*/ moves: 18, colors: 5, goals: [{ type: 'collect', color: 0, target: 25 }], tut: 'collect', layout: FULL },
    { /*3*/ moves: 14, colors: 5, goals: [{ type: 'score', target: 5000 }], tut: 'line', layout: FULL },
    { /*4*/ moves: 15, colors: 5, goals: [{ type: 'sand' }], tut: 'sand', layout: [
      '........', '........', '........', '...ss...', '..ssss..', '...ss...', '........', '........'] },
    { /*5*/ moves: 18, colors: 5, goals: [{ type: 'sand' }], tut: 'barrel', layout: [
      '........', '.ss..ss.', '.ss..ss.', '........', '........', '.ss..ss.', '.ss..ss.', '........'] },
    // fase 6 = 1º chefe: ONÇA-PINTADA (mansa: 3 golpes)
    { /*6*/ moves: 14, colors: 5, goals: [{ type: 'boss', target: 1 }], bossKind: 'onca', bossHp: 7, boss: true, tut: 'onca', layout: FULL },
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
    // fase 21 = chefe final da Amazônia: a ONÇA-PINTADA volta mais forte, com pedras na trilha
    { /*21*/ weak: true, moves: 14, colors: 5, goals: [{ type: 'boss', target: 1 }], bossKind: 'onca', bossHp: 5, boss: true, layout: [
      'r......r', '........', '........', '........', '........', '........', '........', 'r..rr..r'] },
    // ---- Mundo 2 = Selva Esmeralda (eram as fases 1-21) ----
    { /*22*/ moves: 15, colors: 5, goals: [{ type: 'score', target: 2000 }], layout: FULL },
    { /*23*/ moves: 18, colors: 5, goals: [{ type: 'collect', color: 0, target: 30 }], layout: FULL },
    { /*24*/ moves: 13, colors: 5, goals: [{ type: 'score', target: 6000 }], layout: FULL },
    { /*25*/ moves: 15, colors: 5, goals: [{ type: 'sand' }], layout: [
      '........', '........', '........', '..ssss..', '..ssss..', '........', '........', '........'] },
    // fase 5 = 1º chefe (14/10, ideia dele): Escaravelho Dourado, 3 golpes. Antes era "35 esmeraldas + 35 safiras".
    // 3 escaravelhos x 3 vidas, 24 movimentos (pedido dele 14/10: com 1 escaravelho de 3 vidas ficou fácil e rápido).
    // Simulação (120 sementes, jogador médio): vence ~61%, quem vence leva ~10 jogadas (antes: 77% em 5 jogadas).
    // Com 2 vidas cada ainda morria em ~7 jogadas; só a própria joia valer golpe ficou impossível (<20%).
    { /*26*/ weak: true, moves: 14, colors: 5, goals: [{ type: 'boss', target: 3 }], scarab: 3, scarabHp: 3, boss: true, tut: 'boss', layout: FULL },
    { /*27*/ moves: 17, colors: 5, goals: [{ type: 'sand' }], layout: [
      'xx....xx', 'x.ssss.x', '..s..s..', '.ss..ss.', '.ss..ss.', '..s..s..', 'x.ssss.x', 'xx....xx'] },
    { /*28*/ moves: 15, colors: 5, goals: [{ type: 'artifact', target: 1 }], artifacts: 1, artifactMax: 1, layout: [
      '...a....', '........', '........', '........', '........', '........', '........', '........'] },
    // fase 8 (15/10, pedido dele: escaravelhos também em fase comum): ENXAME, 4 escaravelhos de 1 vida + a meta de pontos.
    { /*29*/ weak: true, moves: 15, colors: 5, goals: [{ type: 'boss', target: 4 }, { type: 'score', target: 9000 }], scarab: 4, scarabHp: 3, layout: FULL },
    // fase 9 (18/10, pedido dele): ONÇA-PINTADA normal, antes da Onça de Jade (que ele não gostou do design). Mesma regra da jade, mais mansa:
    // a cada 3 jogadas crava a garra e vira 2 joias em pedra. Daqui pra frente tudo andou 1 fase (a jade virou a 11).
    { /*30*/ weak: true, moves: 15, colors: 5, goals: [{ type: 'boss', target: 1 }], bossKind: 'onca', bossHp: 4, boss: true, layout: FULL },
    { /*31*/ moves: 18, colors: 5, goals: [{ type: 'artifact', target: 2 }], artifacts: 2, artifactMax: 1, layout: ['....a...', '........', '........', '........', '........', '........', '........', '........'] },
    // fase 10 = 2º chefe (14/10): ONÇA DE JADE. Monta numa joia como o escaravelho (golpe = joia dela ou encostada,
    // 1 por jogada, ela salta pra longe) e a cada 3 jogadas crava a garra: 2 joias perto dela viram pedra.
    { /*32*/ weak: true, moves: 26, colors: 5, goals: [{ type: 'boss', target: 1 }], bossKind: 'jaguar', bossHp: 6, boss: true, tut: 'jaguar', layout: FULL },
    { /*33*/ moves: 12, colors: 5, goals: [{ type: 'rock', target: 10 }], layout: [
      '........', '........', '........', '........', '........', 'rr.rr.rr', '.r.rr.r.', '........'] },
    // fase 12 (15/10, ideia dele): JIBOIA. Monta numa joia (golpe = joia dela ou encostada, ela foge pra longe);
    // a cada 2 jogadas sem apanhar engole 1 joia encostada, que vira bolo de pedra. Antes: areia + 8 rochas.
    { /*34*/ weak: true, moves: 14, colors: 5, goals: [{ type: 'boss', target: 1 }, { type: 'sand' }], bossKind: 'boa', bossHp: 4, layout: [
      '........', '........', 'r......r', 'rr....rr', '.ssssss.', '.ssssss.', 'rr....rr', 'r......r'] },
    { /*35*/ moves: 18, colors: 6, goals: [{ type: 'collect', color: 5, target: 25 }], layout: FULL },
    { /*36*/ moves: 26, colors: 6, goals: [{ type: 'vine', target: 10 }], layout: [
      '........', '........', '.v....v.', '..v..v..', '...vv...', '..v..v..', '.v....v.', '........'] },
    // fase 15 = 3º chefe (14/10): ÍDOLO DE PEDRA. Bloco 2x2 fixo no meio; combinação comum não faz nada,
    // só explosão de joia especial (Flecha, Selo, Orbe) machuca. Depois de cada golpe, escudo de runas por 1 jogada.
    { /*37*/ moves: 14, colors: 5, goals: [{ type: 'boss', target: 1 }], bossKind: 'statue', bossHp: 3, statueAt: [3, 3], boss: true, tut: 'statue', layout: FULL },
    { /*38*/ moves: 30, colors: 6, goals: [{ type: 'sand' }, { type: 'vine', target: 8 }], layout: [
      '........', '........', 'v.ssss.v', 'v.s..s.v', 'v.s..s.v', 'v.ssss.v', '........', '........'] },
    { /*39*/ moves: 26, colors: 6, goals: [{ type: 'rock', target: 11 }], layout: [
      '........', '........', '........', '........', 'RR.RR.RR', '........', 'r.rr.rr.', '........'] },
    // fase 18 (15/10, ideia dele): MACACO. Monta numa joia (golpe = joia dele ou encostada, ele pula pra longe);
    // a cada 3 jogadas sem apanhar troca 2 joias de lugar perto dele. Antes: só 7.500 pontos.
    { /*40*/ weak: true, moves: 31, colors: 6, goals: [{ type: 'boss', target: 1 }, { type: 'score', target: 7500 }], bossKind: 'frog', bossHp: 3, layout: [
      'xx....xx', 'x......x', '........', '........', '........', '........', 'x......x', 'xx....xx'] },
    { /*41*/ moves: 19, colors: 6, goals: [{ type: 'artifact', target: 2 }, { type: 'rock', target: 8 }], artifacts: 2, artifactMax: 1, layout: [
      '...a....', '........', '........', 'r.r..r.r', '.r.rr.r.', '........', '........', '........'] },
    // fase 20 = chefe final (14/10): KUKULKÁN, a serpente emplumada. Ocupa 2 joias vizinhas e rasteja 1 casa
    // a cada jogada em que não apanha. Golpe = quebrar uma das 2 joias dela (encostada não vale: ela já é grande);
    // ao apanhar, mergulha e reaparece longe. 5 vidas.
    { /*42*/ weak: true, moves: 36, colors: 6, goals: [{ type: 'boss', target: 1 }], bossKind: 'serpent', bossHp: 5, boss: true, tut: 'serpent', layout: [
      'r......r', '........', '........', '........', '........', '........', '........', 'r..rr..r'] },
    // ---- fases 21-35 (16/10): mecânicas adaptadas do Candy Crush ----
    // m = MUSGO VIVO (bloco; se ninguém quebrar musgo na jogada, ele engole 1 joia vizinha; meta 'moss' = limpar todo)
    // b = ÍDOLO AMALDIÇOADO (joia com contagem; zerou = derrota; quebrar a joia desarma). bombSpawn/bombMax/bombTimer = nascem caindo
    // PEDIDO DO SACERDOTE = meta { type: 'make', special: 'line' | 'barrel' | 'idol' }: criar joias especiais
    { /*43*/ moves: 14, colors: 5, goals: [{ type: 'moss' }], tut: 'moss', layout: [
      '........', '........', '........', '...mm...', '...mm...', '........', '........', '........'] },
    { /*44*/ moves: 12, colors: 5, goals: [{ type: 'make', special: 'line', target: 3 }], tut: 'make', layout: FULL },
    { /*45*/ moves: 12, colors: 5, goals: [{ type: 'score', target: 8000 }], tut: 'bomb', bombTimer: 10, layout: [
      '........', '........', '..b..b..', '........', '........', '........', '........', '........'] },
    { /*46*/ moves: 18, colors: 5, goals: [{ type: 'sand' }, { type: 'moss' }], layout: [
      'm......m', '........', '.ssssss.', '.ssssss.', '.ssssss.', '.ssssss.', '........', 'm......m'] },
    // fase 25 = chefe: a Onça de Jade volta mais forte, com musgo nos cantos
    { /*47*/ weak: true, moves: 29, colors: 5, goals: [{ type: 'boss', target: 1 }], bossKind: 'jaguar', bossHp: 7, boss: true, layout: [
      'mm....mm', 'm......m', '........', '........', '........', '........', 'm......m', 'mm....mm'] },
    // fase 27 (18/10): pedido do Sacerdote com a SUPERNOVA: criar 1 Sol Ardente (6 em linha). O robô quase não planeja 6 em linha, então a taxa dele é baixa de propósito
    { /*48*/ moves: 34, colors: 5, goals: [{ type: 'make', special: 'nova', target: 1 }], tut: 'nova', layout: FULL },
    { /*49*/ moves: 12, colors: 5, goals: [{ type: 'artifact', target: 2 }], artifacts: 2, artifactMax: 1, bombSpawn: 0.05, bombMax: 2, bombTimer: 9, clockSpawn: 0.08, clockMax: 2, layout: [
      '...a....', '........', '........', '........', '........', '........', '........', '........'] },
    { /*50*/ moves: 22, colors: 6, goals: [{ type: 'vine', target: 12 }, { type: 'moss' }], layout: [
      '........', '.v.mm.v.', '..v..v..', 'v.v..v.v', 'v.v..v.v', '..v..v..', '.v....v.', '........'] },
    { /*51*/ moves: 27, colors: 6, goals: [{ type: 'rock', target: 12 }, { type: 'make', special: 'line', target: 3 }], layout: [
      '........', '........', '........', '........', 'RR.RR.RR', '........', 'r.rr.rr.', 'r......r'] },
    // fase 30 = chefe: Ídolo de Pedra com 4 vidas e musgo crescendo em volta
    { /*52*/ moves: 21, colors: 5, goals: [{ type: 'boss', target: 1 }], bossKind: 'statue', bossHp: 4, statueAt: [3, 3], boss: true, layout: [
      'm......m', '........', '........', '........', '........', '........', '........', 'm......m'] },
    { /*53*/ moves: 22, colors: 6, goals: [{ type: 'moss' }], layout: [
      '........', '.mm..mm.', '........', '........', '........', '........', '.mm..mm.', '........'] },
    { /*54*/ weak: true, moves: 30, colors: 6, goals: [{ type: 'boss', target: 1 }], bossKind: 'frog', bossHp: 3, bombSpawn: 0.05, bombMax: 2, bombTimer: 10, layout: [
      '........', '.b....b.', '........', '........', '........', '........', '........', '........'] },
    { /*55*/ moves: 24, colors: 6, goals: [{ type: 'sand' }], bombTimer: 16, clockSpawn: 0.08, clockMax: 2, layout: [
      '........', '..b..b..', 'SS....SS', 'SSssssSS', '.ssssss.', '..ssss..', '........', '........'] },
    { /*56*/ weak: true, moves: 14, colors: 5, goals: [{ type: 'boss', target: 1 }, { type: 'sand' }], bossKind: 'boa', bossHp: 4, layout: [
      '........', '........', 'm......m', '.ssssss.', '.ssssss.', 'm......m', '........', '........'] },
    // fase 35 = chefe final do trecho: Kukulkán desperto (6 vidas), ídolos amaldiçoados caindo e musgo nos cantos
    { /*57*/ weak: true, moves: 34, colors: 6, goals: [{ type: 'boss', target: 1 }], bossKind: 'serpent', bossHp: 3, boss: true, bombSpawn: 0.04, bombMax: 1, bombTimer: 12, layout: [
      'm......m', '........', '........', '........', '........', '........', '........', 'mr.rr.rm'] },
    // ---- Mundo 4 (18/10): Vale das Pirâmides, fases 58-72. Escaravelhos (Egito), cobra (jiboia), ídolo; musgo, ídolo amaldiçoado, relógios e Sol Ardente ----
    { /*58*/ moves: 18, colors: 5, goals: [{ type: 'sand' }], layout: [
      '........', '........', '.ssssss.', '.ssssss.', '.ssssss.', '.ssssss.', '........', '........'] },
    { /*59*/ moves: 22, colors: 6, goals: [{ type: 'collect', color: 3, target: 30 }], layout: FULL },
    { /*60*/ moves: 26, colors: 6, goals: [{ type: 'rock', target: 12 }], layout: [
      '........', '..RR.RR.', '........', '.R....R.', '.R....R.', '........', '..RR.RR.', '........'] },
    // fase 40 = chefe: ESCARAVELHOS REAIS, 4 de 2 vidas (o Egito é a casa deles)
    { /*61*/ weak: true, moves: 20, colors: 6, goals: [{ type: 'boss', target: 4 }], scarab: 4, scarabHp: 2, boss: true, layout: FULL },
    { /*62*/ moves: 16, colors: 6, goals: [{ type: 'moss' }], bombTimer: 12, layout: [
      '........', '.b....b.', '..mm.mm.', '........', '........', '..mm.mm.', '.b....b.', '........'] },
    { /*63*/ moves: 24, colors: 6, goals: [{ type: 'artifact', target: 3 }], artifacts: 3, artifactMax: 1, bombSpawn: 0.04, bombMax: 1, bombTimer: 10, clockSpawn: 0.06, clockMax: 2, layout: [
      '...a....', '........', '........', '........', '........', '........', '........', '........'] },
    { /*64*/ moves: 34, colors: 6, goals: [{ type: 'vine', target: 12 }, { type: 'sand' }], layout: [
      '........', '.v.ss.v.', '.v.ss.v.', '..vssv..', '..vssv..', '.v.ss.v.', '.v.ss.v.', '........'] },
    { /*65*/ moves: 32, colors: 6, goals: [{ type: 'make', special: 'line', target: 4 }, { type: 'make', special: 'barrel', target: 2 }], layout: FULL },
    // fase 45 = a COBRA DO DESERTO (a jiboia) numa fase de areia
    { /*66*/ weak: true, moves: 15, colors: 5, goals: [{ type: 'boss', target: 1 }, { type: 'sand' }], bossKind: 'boa', bossHp: 5, layout: [
      '........', '........', '.ssssss.', '.ssssss.', '.ssssss.', '.ssssss.', '........', '........'] },
    { /*67*/ moves: 20, colors: 6, goals: [{ type: 'score', target: 22000 }], clockSpawn: 0.08, clockMax: 3, layout: FULL },
    { /*68*/ moves: 36, colors: 6, goals: [{ type: 'collect', color: 5, target: 28 }, { type: 'moss' }], layout: [
      'm......m', '........', '........', '........', '........', '........', '........', 'm......m'] },
    { /*69*/ moves: 38, colors: 5, goals: [{ type: 'rock', target: 12 }, { type: 'make', special: 'nova', target: 1 }], layout: [
      '........', '..rr.rr.', '.R....R.', '........', '........', '.R....R.', '..rr.rr.', '........'] },
    { /*70*/ moves: 34, colors: 6, goals: [{ type: 'sand' }], bombTimer: 14, layout: [
      '........', '..b..b..', 'ss.ss.ss', 'ssssssss', 'ssssssss', 'ss.ss.ss', '........', '........'] },
    // fase 50 = chefe: o ÍDOLO DA ESFINGE (ídolo de pedra com 4 vidas e musgo nos cantos)
    { /*71*/ moves: 21, colors: 5, goals: [{ type: 'boss', target: 1 }], bossKind: 'statue', bossHp: 4, statueAt: [3, 3], boss: true, layout: [
      'm......m', '........', '........', '........', '........', '........', '........', 'm......m'] },
    // ---- fases 72-85 (18/10): 1 fase por disco de areia do Egito (são 29), só com mecânicas já ensinadas ----
    { /*72*/ moves: 18, colors: 6, goals: [{ type: 'collect', color: 0, target: 32 }], clockSpawn: 0.05, clockMax: 2, layout: FULL },
    { /*73*/ moves: 36, colors: 6, goals: [{ type: 'sand' }, { type: 'moss' }], layout: [
      'm......m', '........', '.ssssss.', '.ssssss.', '.ssssss.', '.ssssss.', '........', 'm......m'] },
    { /*74*/ moves: 29, colors: 6, goals: [{ type: 'score', target: 14000 }], bombTimer: 12, layout: [
      '........', '.b....b.', '........', '........', '........', '........', '........', '........'] },
    { /*75*/ moves: 30, colors: 6, goals: [{ type: 'rock', target: 12 }], layout: [
      '........', '.RR..RR.', '........', '........', '........', '........', 'rr.rr.rr', '.r....r.'] },
    { /*76*/ moves: 38, colors: 5, goals: [{ type: 'make', special: 'nova', target: 1 }], clockSpawn: 0.06, clockMax: 2, layout: FULL },
    { /*77*/ weak: true, moves: 15, colors: 5, goals: [{ type: 'boss', target: 1 }, { type: 'sand' }], bossKind: 'boa', bossHp: 4, layout: [
      'm......m', '........', '.ssssss.', '.ssssss.', '.ssssss.', '.ssssss.', '........', 'm......m'] },
    { /*78*/ moves: 40, colors: 6, goals: [{ type: 'vine', target: 12 }, { type: 'moss' }], layout: [
      '........', '.v.mm.v.', '.v.mm.v.', '..v..v..', '..v..v..', '.v.mm.v.', '.v.mm.v.', '........'] },
    { /*79*/ moves: 24, colors: 6, goals: [{ type: 'artifact', target: 3 }], artifacts: 3, artifactMax: 1, bombSpawn: 0.04, bombMax: 1, bombTimer: 10, clockSpawn: 0.06, clockMax: 2, layout: [
      '...a....', '........', '........', '........', '........', '........', '........', '........'] },
    { /*80*/ weak: true, moves: 32, colors: 6, goals: [{ type: 'boss', target: 1 }, { type: 'score', target: 8000 }], bossKind: 'frog', bossHp: 3, bombSpawn: 0.04, bombMax: 1, bombTimer: 12, layout: [
      'xx....xx', 'x......x', '........', '........', '........', '........', 'x......x', 'xx....xx'] },
    { /*81*/ moves: 22, colors: 6, goals: [{ type: 'collect', color: 4, target: 30 }], layout: FULL },
    { /*82*/ moves: 26, colors: 6, goals: [{ type: 'sand' }], bombTimer: 16, clockSpawn: 0.08, clockMax: 2, layout: [
      '........', '..b..b..', 'SS....SS', 'SSssssSS', '.ssssss.', '..ssss..', '........', '........'] },
    { /*83*/ moves: 30, colors: 6, goals: [{ type: 'make', special: 'line', target: 3 }, { type: 'make', special: 'barrel', target: 2 }], layout: FULL },
    { /*84*/ moves: 30, colors: 5, goals: [{ type: 'boss', target: 1 }], bossKind: 'statue', bossHp: 5, statueAt: [3, 3], boss: true, layout: [
      'm......m', '........', '........', '........', '........', '........', '........', 'm......m'] },
    { /*85*/ moves: 20, colors: 6, goals: [{ type: 'score', target: 26000 }], clockSpawn: 0.08, clockMax: 3, layout: FULL },
    // fase 51 = chefe final do Mundo 3: enxame real de 5 escaravelhos + meta de pontos, ídolos amaldiçoados caindo e relógios
    { /*86*/ weak: true, moves: 14, colors: 6, goals: [{ type: 'boss', target: 5 }, { type: 'score', target: 15000 }], scarab: 5, scarabHp: 2, boss: true, bombSpawn: 0.03, bombMax: 1, bombTimer: 12, clockSpawn: 0.05, clockMax: 2, layout: [
      'm......m', '........', '........', '........', '........', '........', '........', 'm......m'] },
  ];
  // estrelas: [1, 2, 3] em pontos — calibradas pelo tools/simular.js (13/10/2026, 60 partidas por fase)
  // ganhar já dá 1 estrela; 2 = pontuação mediana de quem ganha; 3 = os 20% melhores
  const STARS = [
    // Amazônia (18/10): calibradas com tools/calibrar.js
    /*1*/[4000, 12500, 16500], /*2*/[7500, 22500, 27000], /*3*/[5500, 15500, 21500], /*4*/[5000, 15500, 25500], /*5*/[6500, 22000, 31500], /*6*/[8500, 31000, 50500], /*7*/[4500, 14500, 23000], /*8*/[6000, 18000, 24000], /*9*/[4500, 14500, 21500], /*10*/[4500, 16500, 25500], /*11*/[9000, 19500, 26000], /*12*/[4500, 13000, 16500], /*13*/[3000, 8000, 10500], /*14*/[6000, 18000, 21500], /*15*/[4500, 16500, 20000], /*16*/[3000, 12000, 17000], /*17*/[6500, 20000, 25000], /*18*/[6500, 19500, 24000], /*19*/[7000, 17500, 26500], /*20*/[8500, 20000, 26000], /*21*/[8000, 26500, 35000],
    // Selva Esmeralda (eram 1-21)
    /*22*/[4500, 12500, 18500], /*23*/[7000, 21000, 27500], /*24*/[5000, 16000, 21000], /*25*/[4500, 13500, 24500], /*26*/[6500, 40500, 67500], // fase 5 recalibrada pros 3 escaravelhos (14/10)
    /*27*/[5000, 17500, 27500], /*28*/[4500, 14500, 24000], /*29*/[10000, 31500, 48000], /*30*/[9000, 27000, 40500], /*31*/[5500, 18500, 26500], /*32*/[15500, 47000, 73000], // fase 9 = onça normal (18/10, recalibrar); fase 11 = onça de jade
    /*33*/[3500, 15500, 22000], /*34*/[8500, 34000, 44500], /*35*/[4500, 12500, 16500], /*36*/[5000, 15500, 21500], /*37*/[6500, 23000, 33000], // fase 15 = ídolo (14/10)
    /*38*/[7500, 20500, 24500], /*39*/[5000, 15000, 21000], /*40*/[5000, 20000, 22000], /*41*/[3000, 12000, 15500], /*42*/[12500, 30500, 36000], // fase 20 = serpente (14/10)
    // fases 21-35 (16/10, simulador 60 partidas): robô vence 78-100%, sobrando ~7-12 jogadas
    /*43*/[4000, 11000, 17500], /*44*/[4000, 12000, 17000], /*45*/[6000, 17000, 26500], /*46*/[7500, 24500, 36500], /*47*/[17000, 61500, 84500], // fase 25 = onça forte
    /*48*/[9000, 45000, 70000], /*49*/[6000, 21500, 34500], /*50*/[4500, 11500, 14000], /*51*/[5000, 16000, 21500], /*52*/[13500, 35000, 53500], // fase 30 = ídolo forte
    /*53*/[5000, 13500, 15500], /*54*/[7000, 18000, 23000], /*55*/[7000, 23000, 30500], /*56*/[5500, 32000, 44500], /*57*/[9500, 22500, 39500], // fase 35 = Kukulkán desperto
    // fases 37-51 (18/10): calibradas com tools/calibrar.js (robô vence 80-95%) + folga de movimentos pra jogador humano nas curtas
    /*58*/[5000, 15000, 22000], /*59*/[5000, 16500, 21000], /*60*/[4500, 13500, 18500], /*61*/[8000, 20500, 25000], /*62*/[3000, 8500, 11000],
    /*63*/[5500, 16000, 19500], /*64*/[9000, 23500, 29500], /*65*/[9000, 21000, 26000], /*66*/[6500, 34000, 52000], /*67*/[12500, 32500, 38000],
    /*68*/[10000, 26000, 31500], /*69*/[13500, 40000, 84000], /*70*/[9500, 22500, 28500], /*71*/[13500, 35000, 53500], /*72*/[6000, 18500, 20500], /*73*/[11500, 27500, 32500], /*74*/[7500, 19000, 25000], /*75*/[7500, 17500, 21000], /*76*/[13500, 40000, 84000], /*77*/[6500, 33500, 58500], /*78*/[10500, 28000, 32500], /*79*/[6000, 16000, 19000], /*80*/[8000, 19000, 22500], /*81*/[5000, 16000, 22500], /*82*/[8000, 24000, 31500], /*83*/[8000, 19500, 24000], /*84*/[15000, 39500, 57500], /*85*/[16000, 38000, 42000], /*86*/[9000, 26000, 31000],
  ];
  // Chefes (14/10), simulador com robô que caça o chefe e enxerga as joias que vão cair (joga melhor que gente;
  // vale como comparação): fase 5 vence 100% sobrando 18 jogadas (ele testou e aprovou), 10 = 98%/12,
  // 15 = 92%/9, 20 = 88%/9. Cada chefe um pouco mais apertado que o anterior.
  LEVELS.forEach((l, i) => { l.id = i + 1; l.stars = STARS[i]; });
  root.LEVELS = LEVELS;
  if (typeof module !== 'undefined') module.exports = LEVELS;
})(typeof window !== 'undefined' ? window : globalThis);
