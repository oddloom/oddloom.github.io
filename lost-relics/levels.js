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
    { moves: 19, colors: 5, goals: [{ type: 'collect', color: 1, target: 35 }, { type: 'collect', color: 2, target: 35 }], tut: 'barrel', layout: FULL },
    { moves: 17, colors: 5, goals: [{ type: 'sand' }], layout: [
      'xx....xx', 'x.ssss.x', '..s..s..', '.ss..ss.', '.ss..ss.', '..s..s..', 'x.ssss.x', 'xx....xx'] },
    { moves: 15, colors: 5, goals: [{ type: 'artifact', target: 1 }], artifacts: 1, artifactMax: 1, tut: 'artifact', layout: [
      '...a....', '........', '........', '........', '........', '........', '........', '........'] },
    { moves: 14, colors: 5, goals: [{ type: 'score', target: 9000 }], tut: 'idol', layout: FULL },
    { moves: 18, colors: 5, goals: [{ type: 'artifact', target: 2 }], artifacts: 2, artifactMax: 1, layout: ['....a...', '........', '........', '........', '........', '........', '........', '........'] },
    { moves: 21, colors: 5, goals: [{ type: 'sand' }], boss: true, layout: [
      '........', '.SSSSSS.', '.S....S.', '.S.ss.S.', '.S.ss.S.', '.S....S.', '.SSSSSS.', '........'] },
    { moves: 12, colors: 5, goals: [{ type: 'rock', target: 10 }], tut: 'rock', layout: [
      '........', '........', '........', '........', '........', 'rr.rr.rr', '.r.rr.r.', '........'] },
    { moves: 13, colors: 5, goals: [{ type: 'sand' }, { type: 'rock', target: 8 }], layout: [
      '........', '........', 'r......r', 'rr....rr', '.ssssss.', '.ssssss.', 'rr....rr', 'r......r'] },
    { moves: 18, colors: 6, goals: [{ type: 'collect', color: 5, target: 25 }], tut: 'diamond', layout: FULL },
    { moves: 26, colors: 6, goals: [{ type: 'vine', target: 10 }], tut: 'vine', layout: [
      '........', '........', '.v....v.', '..v..v..', '...vv...', '..v..v..', '.v....v.', '........'] },
    { moves: 20, colors: 6, goals: [{ type: 'artifact', target: 3 }], artifacts: 3, artifactMax: 2, layout: [
      'x......x', '.a....a.', '........', '........', '........', '........', '........', 'x......x'] },
    { moves: 30, colors: 6, goals: [{ type: 'sand' }, { type: 'vine', target: 8 }], layout: [
      '........', '........', 'v.ssss.v', 'v.s..s.v', 'v.s..s.v', 'v.ssss.v', '........', '........'] },
    { moves: 26, colors: 6, goals: [{ type: 'rock', target: 11 }], layout: [
      '........', '........', '........', '........', 'RR.RR.RR', '........', 'r.rr.rr.', '........'] },
    { moves: 17, colors: 6, goals: [{ type: 'score', target: 7500 }], layout: [
      'xx....xx', 'x......x', '........', '........', '........', '........', 'x......x', 'xx....xx'] },
    { moves: 19, colors: 6, goals: [{ type: 'artifact', target: 2 }, { type: 'rock', target: 8 }], artifacts: 2, artifactMax: 1, layout: [
      '...a....', '........', '........', 'r.r..r.r', '.r.rr.r.', '........', '........', '........'] },
    { moves: 28, colors: 6, goals: [{ type: 'sand' }, { type: 'vine', target: 4 }, { type: 'rock', target: 6 }], boss: true, layout: [
      'r......r', '.SSSSSS.', '.SwSSwS.', '.S.SS.S.', '.S.SS.S.', '.SwSSwS.', '.SSSSSS.', 'r..rr..r'] },
  ];
  // estrelas: [1, 2, 3] em pontos — calibradas pelo tools/simular.js (13/10/2026, 60 partidas por fase)
  // ganhar já dá 1 estrela; 2 = pontuação mediana de quem ganha; 3 = os 20% melhores
  const STARS = [
    [4500, 12500, 18500], [7000, 21000, 27500], [5000, 16000, 21000], [4500, 13500, 24500], [8500, 26000, 39500],
    [5000, 17500, 27500], [4500, 14500, 24000], [7500, 19000, 24500], [5500, 18500, 26500], [10000, 32000, 41000],
    [3500, 15500, 22000], [5000, 18000, 28500], [4500, 12500, 16500], [5000, 15500, 21500], [3500, 11500, 15000],
    [7500, 20500, 24500], [5000, 15000, 21000], [4000, 12000, 14500], [3000, 12000, 15500], [8500, 23500, 32500],
  ];
  LEVELS.forEach((l, i) => { l.id = i + 1; l.stars = STARS[i]; });
  root.LEVELS = LEVELS;
  if (typeof module !== 'undefined') module.exports = LEVELS;
})(typeof window !== 'undefined' ? window : globalThis);
