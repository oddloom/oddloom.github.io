/* Loja > Oferta da semana: cada card da oferta pega do card original da loja a raridade e as camadas animadas
   (brilho, feixe, estrelas). Só observa a tela da Loja; não mexe em mais nada. */
(function () {
  function achaOriginal(item) {
    var nome = (item.querySelector('strong') || {}).textContent
    var arte = item.querySelector('.oferta-arte')
    var html = arte && arte.firstElementChild ? arte.firstElementChild.innerHTML : ''
    var cards = document.querySelectorAll('.loja-cartao[data-raridade]'), ok = null
    for (var i = 0; i < cards.length; i++) {
      var n = cards[i].querySelector('.loja-item-nome')
      if (!n || n.textContent !== nome) continue
      var img = cards[i].querySelector('.loja-cartao-img')
      if (img && html && img.innerHTML === html) return cards[i]
      if (!ok) ok = cards[i]
    }
    return ok
  }
  function ajusta() {
    var itens = document.querySelectorAll('.oferta-item:not([data-oferta-ok])')
    for (var i = 0; i < itens.length; i++) {
      var it = itens[i], orig = achaOriginal(it)
      if (!orig) continue
      it.setAttribute('data-oferta-ok', '1')
      var r = orig.getAttribute('data-raridade'); if (r) it.setAttribute('data-raridade', r)
      var a = orig.style.getPropertyValue('--atraso'); if (a) it.style.setProperty('--atraso', a)
      var camadas = orig.querySelectorAll(':scope > .cartao-luz, :scope > .cartao-brilho, :scope > .cartao-feixe, :scope > .cartao-estrela')
      for (var k = camadas.length - 1; k >= 0; k--) it.insertBefore(camadas[k].cloneNode(true), it.firstChild)
      it.classList.add('na-tela')
    }
  }
  function pilotos() {
    var imgs = document.querySelectorAll('img.loja-piloto-img:not([data-vivo])')
    for (var i = 0; i < imgs.length; i++) {
      var im = imgs[i]; im.setAttribute('data-vivo', '1')
      var m = /raposa-(azul|rosa|laranja|verde)-parado.webp/.exec(im.getAttribute('src') || '')
      if (!m) continue
      var env = document.createElement('span'); env.className = 'loja-piloto-vivo'
      env.style.setProperty('--atraso', '-' + ((i * 1.3) % 4).toFixed(1) + 's')
      im.parentNode.insertBefore(env, im); env.appendChild(im)
      var p = document.createElement('img'); p.className = 'loja-piloto-pisca'; p.alt = ''; p.setAttribute('aria-hidden', 'true'); p.draggable = false
      p.src = im.getAttribute('src').replace('-parado.webp', '-pisca.webp'); env.appendChild(p)
    }
  }
  new MutationObserver(function () { ajusta(); pilotos() }).observe(document.documentElement, { childList: true, subtree: true })
  ajusta(); pilotos()
})()
