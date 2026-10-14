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
    { moves: 14, colors: 5, goals: [{ type: 'score', target: 9000 }], tut: 'idol', layout: FULL },
    { moves: 18, colors: 5, goals: [{ type: 'artifact', target: 2 }], artifacts: 2, artifactMax: 1, layout: ['....a...', '........', '........', '........', '........', '........', '........', '........'] },
    // fase 10 = 2º chefe (14/10): ONÇA DE JADE. Monta numa joia como o escaravelho (golpe = joia dela ou encostada,
    // 1 por jogada, ela salta pra longe) e a cada 3 jogadas crava a garra: 2 joias perto dela viram pedra.
    { moves: 20, colors: 5, goals: [{ type: 'boss', target: 1 }], bossKind: 'jaguar', bossHp: 6, boss: true, tut: 'jaguar', layout: FULL },
    { moves: 12, colors: 5, goals: [{ type: 'rock', target: 10 }], tut: 'rock', layout: [
      '........', '........', '........', '........', '........', 'rr.rr.rr', '.r.rr.r.', '........'] },
    { moves: 13, colors: 5, goals: [{ type: 'sand' }, { type: 'rock', target: 8 }], layout: [
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
    { moves: 17, colors: 6, goals: [{ type: 'score', target: 7500 }], layout: [
      'xx....xx', 'x......x', '........', '........', '........', '........', 'x......x', 'xx....xx'] },
    { moves: 19, colors: 6, goals: [{ type: 'artifact', target: 2 }, { type: 'rock', target: 8 }], artifacts: 2, artifactMax: 1, layout: [
      '...a....', '........', '........', 'r.r..r.r', '.r.rr.r.', '........', '........', '........'] },
    // fase 20 = chefe final (14/10): KUKULKÁN, a serpente emplumada. Ocupa 2 joias vizinhas e rasteja 1 casa
    // a cada jogada em que não apanha. Golpe = quebrar uma das 2 joias dela (encostada não vale: ela já é grande);
    // ao apanhar, mergulha e reaparece longe. 5 vidas.
    { moves: 19, colors: 6, goals: [{ type: 'boss', target: 1 }], bossKind: 'serpent', bossHp: 5, boss: true, tut: 'serpent', layout: [
      'r......r', '........', '........', '........', '........', '........', '........', 'r..rr..r'] },
  ];
  // estrelas: [1, 2, 3] em pontos — calibradas pelo tools/simular.js (13/10/2026, 60 partidas por fase)
  // ganhar já dá 1 estrela; 2 = pontuação mediana de quem ganha; 3 = os 20% melhores
  const STARS = [
    [4500, 12500, 18500], [7000, 21000, 27500], [5000, 16000, 21000], [4500, 13500, 24500], [3000, 13500, 19500], // fase 5 recalibrada pros 3 escaravelhos (14/10)
    [5000, 17500, 27500], [4500, 14500, 24000], [7500, 19000, 24500], [5500, 18500, 26500], [7500, 29500, 39000], // fase 10 = onça (14/10)
    [3500, 15500, 22000], [5000, 18000, 28500], [4500, 12500, 16500], [5000, 15500, 21500], [9500, 33000, 42000], // fase 15 = ídolo (14/10)
    [7500, 20500, 24500], [5000, 15000, 21000], [4000, 12000, 14500], [3000, 12000, 15500], [5000, 14500, 19000], // fase 20 = serpente (14/10)
  ];
  // Chefes (14/10), simulador com robô que caça o chefe e enxerga as joias que vão cair (joga melhor que gente;
  // vale como comparação): fase 5 vence 100% sobrando 18 jogadas (ele testou e aprovou), 10 = 98%/12,
  // 15 = 92%/9, 20 = 88%/9. Cada chefe um pouco mais apertado que o anterior.
  LEVELS.forEach((l, i) => { l.id = i + 1; l.stars = STARS[i]; });
  root.LEVELS = LEVELS;
  if (typeof module !== 'undefined') module.exports = LEVELS;
})(typeof window !== 'undefined' ? window : globalThis);
