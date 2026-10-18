// Mundo 1 — Selva e templo maia. 20 fases.
// Pra ajustar a dificuldade, mude só os números daqui (moves, target, stars).
// Joias: 0 rubi · 1 esmeralda · 2 safira · 3 topázio · 4 ametista · 5 diamante
// Layout: . joia  x sem casa  s/S areia 1/2  r/R/T rocha 1/2/3  v cipó  w/W cipó sobre areia 1/2  a baú
// tut: tutorial mostrado antes da fase (chave em i18n)
(function (root) {
  const FULL = ['........', '........', '........', '........', '........', '........', '........', '........'];
  const LEVELS = [
    { moves: 15, colors: 5, goals: [{ type: 'score', target: 2000 }], tut: 'swap', layout: FULL },
    { moves: 18, colors: 5, goals: [{ type: 'collect', color: 0, target: 30 }], tut: 'collect', layout: FULL },
    { moves: 13, colors: 5, goals: [{ type: 'score', target: 6000 }], tut: 'line', layout: FULL },
    { moves: 15, colors: 5, goals: [{ type: 'sand' }], tut: 'sand', layout: [
      '........', '........', '........', '..ssss..', '..ssss..', '........', '........', '........'] },
    // fase 5 = 1º chefe (14/10, ideia dele): Escaravelho Dourado, 3 golpes. Antes era "35 esmeraldas + 35 safiras".
    // 3 escaravelhos x 3 vidas, 24 movimentos (pedido dele 14/10: com 1 escaravelho de 3 vidas ficou fácil e rápido).
    // Simulação (120 sementes, jogador médio): vence ~61%, quem vence leva ~10 jogadas (antes: 77% em 5 jogadas).
    // Com 2 vidas cada ainda morria em ~7 jogadas; só a própria joia valer golpe ficou impossível (<20%).
    { moves: 24, colors: 5, goals: [{ type: 'boss', target: 3 }], scarab: 3, scarabHp: 3, boss: true, tut: 'boss', layout: FULL },
    { moves: 17, colors: 5, goals: [{ type: 'sand' }], tut: 'barrel', layout: [
      'xx....xx', 'x.ssss.x', '..s..s..', '.ss..ss.', '.ss..ss.', '..s..s..', 'x.ssss.x', 'xx....xx'] },
    { moves: 15, colors: 5, goals: [{ type: 'artifact', target: 1 }], artifacts: 1, artifactMax: 1, tut: 'artifact', layout: [
      '...a....', '........', '........', '........', '........', '........', '........', '........'] },
    // fase 8 (15/10, pedido dele: escaravelhos também em fase comum): ENXAME, 4 escaravelhos de 1 vida + a meta de pontos.
    { moves: 14, colors: 5, goals: [{ type: 'boss', target: 4 }, { type: 'score', target: 9000 }], scarab: 4, scarabHp: 1, tut: 'idol', layout: FULL },
    // fase 9 (18/10, pedido dele): ONÇA-PINTADA normal, antes da Onça de Jade (que ele não gostou do design). Mesma regra da jade, mais mansa:
    // a cada 3 jogadas crava a garra e vira 2 joias em pedra. Daqui pra frente tudo andou 1 fase (a jade virou a 11).
    { moves: 17, colors: 5, goals: [{ type: 'boss', target: 1 }], bossKind: 'onca', bossHp: 4, boss: true, tut: 'onca', layout: FULL },
    { moves: 18, colors: 5, goals: [{ type: 'artifact', target: 2 }], artifacts: 2, artifactMax: 1, layout: ['....a...', '........', '........', '........', '........', '........', '........', '........'] },
    // fase 10 = 2º chefe (14/10): ONÇA DE JADE. Monta numa joia como o escaravelho (golpe = joia dela ou encostada,
    // 1 por jogada, ela salta pra longe) e a cada 3 jogadas crava a garra: 2 joias perto dela viram pedra.
    { moves: 20, colors: 5, goals: [{ type: 'boss', target: 1 }], bossKind: 'jaguar', bossHp: 6, boss: true, tut: 'jaguar', layout: FULL },
    { moves: 12, colors: 5, goals: [{ type: 'rock', target: 10 }], tut: 'rock', layout: [
      '........', '........', '........', '........', '........', 'rr.rr.rr', '.r.rr.r.', '........'] },
    // fase 12 (15/10, ideia dele): JIBOIA. Monta numa joia (golpe = joia dela ou encostada, ela foge pra longe);
    // a cada 2 jogadas sem apanhar engole 1 joia encostada, que vira bolo de pedra. Antes: areia + 8 rochas.
    { moves: 14, colors: 5, goals: [{ type: 'boss', target: 1 }, { type: 'sand' }], bossKind: 'boa', bossHp: 3, tut: 'boa', layout: [
      '........', '........', 'r......r', 'rr....rr', '.ssssss.', '.ssssss.', 'rr....rr', 'r......r'] },
    { moves: 18, colors: 6, goals: [{ type: 'collect', color: 5, target: 25 }], tut: 'diamond', layout: FULL },
    { moves: 26, colors: 6, goals: [{ type: 'vine', target: 10 }], tut: 'vine', layout: [
      '........', '........', '.v....v.', '..v..v..', '...vv...', '..v..v..', '.v....v.', '........'] },
    // fase 15 = 3º chefe (14/10): ÍDOLO DE PEDRA. Bloco 2x2 fixo no meio; combinação comum não faz nada,
    // só explosão de joia especial (Flecha, Selo, Orbe) machuca. Depois de cada golpe, escudo de runas por 1 jogada.
    { moves: 24, colors: 5, goals: [{ type: 'boss', target: 1 }], bossKind: 'statue', bossHp: 3, statueAt: [3, 3], boss: true, tut: 'statue', layout: FULL },
    { moves: 30, colors: 6, goals: [{ type: 'sand' }, { type: 'vine', target: 8 }], layout: [
      '........', '........', 'v.ssss.v', 'v.s..s.v', 'v.s..s.v', 'v.ssss.v', '........', '........'] },
    { moves: 26, colors: 6, goals: [{ type: 'rock', target: 11 }], layout: [
      '........', '........', '........', '........', 'RR.RR.RR', '........', 'r.rr.rr.', '........'] },
    // fase 18 (15/10, ideia dele): MACACO. Monta numa joia (golpe = joia dele ou encostada, ele pula pra longe);
    // a cada 3 jogadas sem apanhar troca 2 joias de lugar perto dele. Antes: só 7.500 pontos.
    { moves: 19, colors: 6, goals: [{ type: 'boss', target: 1 }, { type: 'score', target: 7500 }], bossKind: 'frog', bossHp: 3, tut: 'frog', layout: [
      'xx....xx', 'x......x', '........', '........', '........', '........', 'x......x', 'xx....xx'] },
    { moves: 19, colors: 6, goals: [{ type: 'artifact', target: 2 }, { type: 'rock', target: 8 }], artifacts: 2, artifactMax: 1, layout: [
      '...a....', '........', '........', 'r.r..r.r', '.r.rr.r.', '........', '........', '........'] },
    // fase 20 = chefe final (14/10): KUKULKÁN, a serpente emplumada. Ocupa 2 joias vizinhas e rasteja 1 casa
    // a cada jogada em que não apanha. Golpe = quebrar uma das 2 joias dela (encostada não vale: ela já é grande);
    // ao apanhar, mergulha e reaparece longe. 5 vidas.
    { moves: 19, colors: 6, goals: [{ type: 'boss', target: 1 }], bossKind: 'serpent', bossHp: 5, boss: true, tut: 'serpent', layout: [
      'r......r', '........', '........', '........', '........', '........', '........', 'r..rr..r'] },
    // ---- fases 21-35 (16/10): mecânicas adaptadas do Candy Crush ----
    // m = MUSGO VIVO (bloco; se ninguém quebrar musgo na jogada, ele engole 1 joia vizinha; meta 'moss' = limpar todo)
    // b = ÍDOLO AMALDIÇOADO (joia com contagem; zerou = derrota; quebrar a joia desarma). bombSpawn/bombMax/bombTimer = nascem caindo
    // PEDIDO DO SACERDOTE = meta { type: 'make', special: 'line' | 'barrel' | 'idol' }: criar joias especiais
    { moves: 14, colors: 5, goals: [{ type: 'moss' }], tut: 'moss', layout: [
      '........', '........', '........', '...mm...', '...mm...', '........', '........', '........'] },
    { moves: 12, colors: 5, goals: [{ type: 'make', special: 'line', target: 3 }], tut: 'make', layout: FULL },
    { moves: 12, colors: 5, goals: [{ type: 'score', target: 8000 }], tut: 'bomb', bombTimer: 10, layout: [
      '........', '........', '..b..b..', '........', '........', '........', '........', '........'] },
    { moves: 18, colors: 5, goals: [{ type: 'sand' }, { type: 'moss' }], layout: [
      'm......m', '........', '.ssssss.', '.ssssss.', '.ssssss.', '.ssssss.', '........', 'm......m'] },
    // fase 25 = chefe: a Onça de Jade volta mais forte, com musgo nos cantos
    { moves: 18, colors: 5, goals: [{ type: 'boss', target: 1 }], bossKind: 'jaguar', bossHp: 7, boss: true, layout: [
      'mm....mm', 'm......m', '........', '........', '........', '........', 'm......m', 'mm....mm'] },
    // fase 27 (18/10): pedido do Sacerdote com a SUPERNOVA: criar 1 Sol Ardente (6 em linha). O robô quase não planeja 6 em linha, então a taxa dele é baixa de propósito
    { moves: 34, colors: 5, goals: [{ type: 'make', special: 'nova', target: 1 }], tut: 'nova', layout: FULL },
    { moves: 12, colors: 5, goals: [{ type: 'artifact', target: 2 }], artifacts: 2, artifactMax: 1, bombSpawn: 0.05, bombMax: 2, bombTimer: 9, clockSpawn: 0.08, clockMax: 2, layout: [
      '...a....', '........', '........', '........', '........', '........', '........', '........'] },
    { moves: 22, colors: 6, goals: [{ type: 'vine', target: 12 }, { type: 'moss' }], layout: [
      '........', '.v.mm.v.', '..v..v..', 'v.v..v.v', 'v.v..v.v', '..v..v..', '.v....v.', '........'] },
    { moves: 27, colors: 6, goals: [{ type: 'rock', target: 12 }, { type: 'make', special: 'line', target: 3 }], layout: [
      '........', '........', '........', '........', 'RR.RR.RR', '........', 'r.rr.rr.', 'r......r'] },
    // fase 30 = chefe: Ídolo de Pedra com 4 vidas e musgo crescendo em volta
    { moves: 32, colors: 5, goals: [{ type: 'boss', target: 1 }], bossKind: 'statue', bossHp: 4, statueAt: [3, 3], boss: true, layout: [
      'm......m', '........', '........', '........', '........', '........', '........', 'm......m'] },
    { moves: 22, colors: 6, goals: [{ type: 'moss' }], layout: [
      '........', '.mm..mm.', '........', '........', '........', '........', '.mm..mm.', '........'] },
    { moves: 15, colors: 6, goals: [{ type: 'boss', target: 1 }], bossKind: 'frog', bossHp: 4, bombSpawn: 0.05, bombMax: 2, bombTimer: 10, layout: [
      '........', '.b....b.', '........', '........', '........', '........', '........', '........'] },
    { moves: 24, colors: 6, goals: [{ type: 'sand' }], bombTimer: 16, clockSpawn: 0.08, clockMax: 2, layout: [
      '........', '..b..b..', 'SS....SS', 'SSssssSS', '.ssssss.', '..ssss..', '........', '........'] },
    { moves: 14, colors: 5, goals: [{ type: 'boss', target: 1 }, { type: 'sand' }], bossKind: 'boa', bossHp: 4, layout: [
      '........', '........', 'm......m', '.ssssss.', '.ssssss.', 'm......m', '........', '........'] },
    // fase 35 = chefe final do trecho: Kukulkán desperto (6 vidas), ídolos amaldiçoados caindo e musgo nos cantos
    { moves: 20, colors: 6, goals: [{ type: 'boss', target: 1 }], bossKind: 'serpent', bossHp: 6, boss: true, bombSpawn: 0.04, bombMax: 1, bombTimer: 12, layout: [
      'm......m', '........', '........', '........', '........', '........', '........', 'mr.rr.rm'] },
    // ---- Mundo 3 (18/10): Vale das Pirâmides, fases 37-51. Escaravelhos (Egito), cobra (jiboia), ídolo; musgo, ídolo amaldiçoado, relógios e Sol Ardente ----
    { /*37*/ moves: 18, colors: 5, goals: [{ type: 'sand' }], layout: [
      '........', '........', '.ssssss.', '.ssssss.', '.ssssss.', '.ssssss.', '........', '........'] },
    { /*38*/ moves: 22, colors: 6, goals: [{ type: 'collect', color: 3, target: 30 }], layout: FULL },
    { /*39*/ moves: 26, colors: 6, goals: [{ type: 'rock', target: 12 }], layout: [
      '........', '..RR.RR.', '........', '.R....R.', '.R....R.', '........', '..RR.RR.', '........'] },
    // fase 40 = chefe: ESCARAVELHOS REAIS, 4 de 2 vidas (o Egito é a casa deles)
    { /*40*/ moves: 16, colors: 6, goals: [{ type: 'boss', target: 4 }], scarab: 4, scarabHp: 2, boss: true, layout: FULL },
    { /*41*/ moves: 16, colors: 6, goals: [{ type: 'moss' }], bombTimer: 12, layout: [
      '........', '.b....b.', '..mm.mm.', '........', '........', '..mm.mm.', '.b....b.', '........'] },
    { /*42*/ moves: 24, colors: 6, goals: [{ type: 'artifact', target: 3 }], artifacts: 3, artifactMax: 1, bombSpawn: 0.04, bombMax: 1, bombTimer: 10, clockSpawn: 0.06, clockMax: 2, layout: [
      '...a....', '........', '........', '........', '........', '........', '........', '........'] },
    { /*43*/ moves: 34, colors: 6, goals: [{ type: 'vine', target: 12 }, { type: 'sand' }], layout: [
      '........', '.v.ss.v.', '.v.ss.v.', '..vssv..', '..vssv..', '.v.ss.v.', '.v.ss.v.', '........'] },
    { /*44*/ moves: 32, colors: 6, goals: [{ type: 'make', special: 'line', target: 4 }, { type: 'make', special: 'barrel', target: 2 }], layout: FULL },
    // fase 45 = a COBRA DO DESERTO (a jiboia) numa fase de areia
    { /*45*/ moves: 15, colors: 5, goals: [{ type: 'boss', target: 1 }, { type: 'sand' }], bossKind: 'boa', bossHp: 4, layout: [
      '........', '........', '.ssssss.', '.ssssss.', '.ssssss.', '.ssssss.', '........', '........'] },
    { /*46*/ moves: 20, colors: 6, goals: [{ type: 'score', target: 22000 }], clockSpawn: 0.08, clockMax: 3, layout: FULL },
    { /*47*/ moves: 36, colors: 6, goals: [{ type: 'collect', color: 5, target: 28 }, { type: 'moss' }], layout: [
      'm......m', '........', '........', '........', '........', '........', '........', 'm......m'] },
    { /*48*/ moves: 38, colors: 5, goals: [{ type: 'rock', target: 12 }, { type: 'make', special: 'nova', target: 1 }], layout: [
      '........', '..rr.rr.', '.R....R.', '........', '........', '.R....R.', '..rr.rr.', '........'] },
    { /*49*/ moves: 34, colors: 6, goals: [{ type: 'sand' }], bombTimer: 14, layout: [
      '........', '..b..b..', 'ss.ss.ss', 'ssssssss', 'ssssssss', 'ss.ss.ss', '........', '........'] },
    // fase 50 = chefe: o ÍDOLO DA ESFINGE (ídolo de pedra com 4 vidas e musgo nos cantos)
    { /*50*/ moves: 32, colors: 5, goals: [{ type: 'boss', target: 1 }], bossKind: 'statue', bossHp: 4, statueAt: [3, 3], boss: true, layout: [
      'm......m', '........', '........', '........', '........', '........', '........', 'm......m'] },
    // fase 51 = chefe final do Mundo 3: enxame real de 5 escaravelhos + meta de pontos, ídolos amaldiçoados caindo e relógios
    { /*51*/ moves: 24, colors: 6, goals: [{ type: 'boss', target: 5 }, { type: 'score', target: 15000 }], scarab: 5, scarabHp: 2, boss: true, bombSpawn: 0.03, bombMax: 1, bombTimer: 12, clockSpawn: 0.05, clockMax: 2, layout: [
      'm......m', '........', '........', '........', '........', '........', '........', 'm......m'] },
  ];
  // estrelas: [1, 2, 3] em pontos — calibradas pelo tools/simular.js (13/10/2026, 60 partidas por fase)
  // ganhar já dá 1 estrela; 2 = pontuação mediana de quem ganha; 3 = os 20% melhores
  const STARS = [
    [4500, 12500, 18500], [7000, 21000, 27500], [5000, 16000, 21000], [4500, 13500, 24500], [3000, 13500, 19500], // fase 5 recalibrada pros 3 escaravelhos (14/10)
    [5000, 17500, 27500], [4500, 14500, 24000], [7500, 19000, 24500], [6500, 20500, 28500], [5500, 18500, 26500], [7500, 29500, 39000], // fase 9 = onça normal (18/10, recalibrar); fase 11 = onça de jade
    [3500, 15500, 22000], [5000, 18000, 28500], [4500, 12500, 16500], [5000, 15500, 21500], [9500, 33000, 42000], // fase 15 = ídolo (14/10)
    [7500, 20500, 24500], [5000, 15000, 21000], [4500, 12500, 15500], [3000, 12000, 15500], [5000, 14500, 19000], // fase 20 = serpente (14/10)
    // fases 21-35 (16/10, simulador 60 partidas): robô vence 78-100%, sobrando ~7-12 jogadas
    [4000, 11000, 17500], [4000, 12000, 17000], [6000, 17000, 26500], [7500, 24500, 36500], [8500, 27000, 40000], // fase 25 = onça forte
    [9000, 45000, 70000], [6000, 21500, 34500], [4500, 11500, 14000], [5000, 16000, 21500], [14000, 37500, 52000], // fase 30 = ídolo forte
    [5000, 13500, 15500], [4000, 11500, 16000], [7000, 23000, 30500], [7000, 22500, 31500], [5500, 15500, 19000], // fase 35 = Kukulkán desperto
    // fases 37-51 (18/10): calibradas com tools/calibrar.js (robô vence 80-95%) + folga de movimentos pra jogador humano nas curtas
    /*37*/[5000, 15000, 22000], /*38*/[5000, 16500, 21000], /*39*/[4500, 13500, 18500], /*40*/[4000, 10500, 14000], /*41*/[3000, 8500, 11000],
    /*42*/[5500, 16000, 19500], /*43*/[9000, 23500, 29500], /*44*/[9000, 21000, 26000], /*45*/[6500, 23000, 35500], /*46*/[12500, 32500, 38000],
    /*47*/[10000, 26000, 31500], /*48*/[13500, 40000, 84000], /*49*/[9500, 22500, 28500], /*50*/[15000, 39000, 55000], /*51*/[9000, 24000, 27500],
  ];
  // Chefes (14/10), simulador com robô que caça o chefe e enxerga as joias que vão cair (joga melhor que gente;
  // vale como comparação): fase 5 vence 100% sobrando 18 jogadas (ele testou e aprovou), 10 = 98%/12,
  // 15 = 92%/9, 20 = 88%/9. Cada chefe um pouco mais apertado que o anterior.
  LEVELS.forEach((l, i) => { l.id = i + 1; l.stars = STARS[i]; });
  root.LEVELS = LEVELS;
  if (typeof module !== 'undefined') module.exports = LEVELS;
})(typeof window !== 'undefined' ? window : globalThis);
