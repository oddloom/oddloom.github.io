/* Mesa: minimizar a busca de partida (22/11/2026).
   Acrescenta, na janela "Procurando partida", o botão "Minimizar". Minimizar só esconde a janela: a busca continua
   rodando (o app não é avisado) e aparece um indicador discreto com o tempo e um X para cancelar.
   Não depende de nomes internos do app: só observa o <dialog class="pp-janela"> que o app cria e usa o botão
   Cancelar dele (.pp-cancelar) para cancelar de verdade. */
(function () {
  'use strict';
  var atual = null // janela da busca ativa
  var chip = null
  var minimizada = false
  var inicio = 0
  var relogio = 0
  var obsClasse = null

  function idiomaDa(d) {
    var titulo = (d.querySelector('.pp-titulo-txt') || {}).textContent || ''
    var cancelar = (d.querySelector('.pp-cancelar') || {}).textContent || ''
    if (/cancel$/i.test(cancelar.trim()) || /^cancel$/i.test(cancelar.trim())) return 'en'
    return /buscando/i.test(titulo) ? 'es' : 'pt'
  }
  var TEXTOS = {
    pt: { min: 'Minimizar', busca: 'Procurando partida', cancelar: 'Cancelar busca', abrir: 'Abrir busca' },
    es: { min: 'Minimizar', busca: 'Buscando partida', cancelar: 'Cancelar búsqueda', abrir: 'Abrir búsqueda' },
    en: { min: 'Minimize', busca: 'Finding match', cancelar: 'Cancel search', abrir: 'Open search' },
  }

  function formatar(ms) {
    var s = Math.max(0, Math.floor(ms / 1000))
    return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2)
  }

  function limparChip() {
    clearInterval(relogio)
    relogio = 0
    if (chip && chip.parentNode) chip.parentNode.removeChild(chip)
    chip = null
    minimizada = false
    if (obsClasse) { obsClasse.disconnect(); obsClasse = null }
  }

  function restaurar() {
    var d = atual
    if (!d || !d.isConnected) { limparChip(); return }
    if (chip) chip.hidden = true
    minimizada = false
    if (!d.open) { try { d.showModal() } catch (e) { /* ja aberta */ } }
  }

  function minimizar() {
    var d = atual
    if (!d || !d.isConnected || !d.open || minimizada) return
    var tx = TEXTOS[idiomaDa(d)]
    minimizada = true
    try { d.close() } catch (e) { minimizada = false; return }
    if (!chip) {
      chip = document.createElement('div')
      chip.className = 'pp-chip'
      chip.setAttribute('role', 'status')
      var abrir = document.createElement('button')
      abrir.type = 'button'
      abrir.className = 'pp-chip-abrir'
      abrir.setAttribute('aria-label', tx.abrir)
      var ponto = document.createElement('i')
      ponto.className = 'pp-chip-ponto'
      var rotulo = document.createElement('span')
      rotulo.textContent = tx.busca
      var tempo = document.createElement('b')
      tempo.className = 'pp-chip-tempo'
      abrir.appendChild(ponto); abrir.appendChild(rotulo); abrir.appendChild(tempo)
      abrir.addEventListener('click', restaurar)
      var x = document.createElement('button')
      x.type = 'button'
      x.className = 'pp-chip-x'
      x.setAttribute('aria-label', tx.cancelar)
      x.textContent = '×'
      x.addEventListener('click', function () {
        var c = atual && atual.querySelector('.pp-cancelar')
        if (c) c.click(); else limparChip()
      })
      chip.appendChild(abrir); chip.appendChild(x)
      document.body.appendChild(chip)
    }
    chip.hidden = false
    var t = chip.querySelector('.pp-chip-tempo')
    var atualizar = function () { t.textContent = formatar(performance.now() - inicio) }
    atualizar()
    clearInterval(relogio)
    relogio = setInterval(atualizar, 1000)
  }

  function preparar(d) {
    // Outra busca nova substitui a anterior (cancela de verdade a antiga).
    if (atual && atual !== d && atual.isConnected) {
      var antigo = atual.querySelector('.pp-cancelar')
      limparChip()
      if (antigo) antigo.click()
    }
    limparChip()
    atual = d
    inicio = performance.now()
    var tx = TEXTOS[idiomaDa(d)]
    var cancelar = d.querySelector('.pp-cancelar')
    if (cancelar && !d.querySelector('.pp-minimizar')) {
      var b = document.createElement('button')
      b.type = 'button'
      b.className = 'pp-minimizar'
      b.textContent = tx.min
      b.addEventListener('click', minimizar)
      cancelar.parentNode.insertBefore(b, cancelar.nextSibling)
    }
    // "Partida encontrada!": volta a mostrar a janela para a pessoa ver o aviso antes de entrar.
    obsClasse = new MutationObserver(function () {
      if (d.classList.contains('achou') && minimizada) restaurar()
    })
    obsClasse.observe(d, { attributes: true, attributeFilter: ['class'] })
  }

  var observador = new MutationObserver(function (muts) {
    for (var i = 0; i < muts.length; i++) {
      var m = muts[i]
      for (var j = 0; j < m.addedNodes.length; j++) {
        var n = m.addedNodes[j]
        if (n.nodeType === 1 && n.matches && n.matches('dialog.pp-janela')) preparar(n)
      }
      for (var k = 0; k < m.removedNodes.length; k++) {
        if (m.removedNodes[k] === atual) { limparChip(); atual = null }
      }
    }
  })
  function iniciar() { observador.observe(document.body, { childList: true }) }
  if (document.body) iniciar(); else document.addEventListener('DOMContentLoaded', iniciar)
})()
