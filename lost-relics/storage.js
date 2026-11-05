// Dentro do Mesa, cada conta tem seu save local. O jogo independente mantém as chaves originais.
(function (root) {
  const mesa = root.LR_MESA;
  const prefix = mesa && /^[A-Z0-9]{8}$/.test(mesa.code) ? 'mesa.lr.' + mesa.code + '.' : '';
  root.LRStorage = {
    getItem(k) { return localStorage.getItem(prefix + k); },
    setItem(k, v) { localStorage.setItem(prefix + k, v); },
    removeItem(k) { localStorage.removeItem(prefix + k); },
  };
  if (!prefix) return;
  try {
    const key = 'lostrelics.save.v1';
    const old = JSON.parse(localStorage.getItem(key) || 'null');
    const oldCloud = JSON.parse(localStorage.getItem('lr.cloud') || 'null');
    // Só importa save da mesma conta, ou o progresso anônimo ainda não atribuído a outra conta Mesa.
    const anonymous = !oldCloud && !localStorage.getItem('mesa.lr.claimed');
    if (!root.LRStorage.getItem(key) && old && (mesa.importLocal || anonymous) && (old.unlocked > 1 || old.wins > 0)) {
      root.LRStorage.setItem(key, JSON.stringify(old));
      if (anonymous) localStorage.setItem('mesa.lr.claimed', mesa.code);
    }
    for (const k of ['lostrelics.lang']) {
      if (!root.LRStorage.getItem(k) && localStorage.getItem(k)) root.LRStorage.setItem(k, localStorage.getItem(k));
    }
  } catch (e) { /* Armazenamento indisponível não impede jogar; a sessão vem do Mesa. */ }
})(window);
