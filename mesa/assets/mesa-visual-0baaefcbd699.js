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
  var FOLHAS = {"raposa":0.7393,"urso":0.7051,"tartaruga":0.7692,"coruja":0.7735,"porco":0.7521}
  function pilotos() {
    var imgs = document.querySelectorAll('img.loja-piloto-img:not([data-vivo])')
    for (var i = 0; i < imgs.length; i++) {
      var im = imgs[i]; im.setAttribute('data-vivo', '1')
      var m = /(raposa|urso|tartaruga|coruja|porco)-azul-parado\.webp/.exec(im.getAttribute('src') || '')
      if (!m) continue
      var ar = FOLHAS[m[1]]; if (!ar) continue
      var env = document.createElement('span'); env.className = 'loja-piloto-vivo loja-piloto-folha'
      env.style.setProperty('--atraso', '-' + ((i * 1.3) % 5).toFixed(1) + 's')
      env.style.setProperty('--ar', ar)
      env.style.backgroundImage = 'url(/mesa/arte/artilharia/vitrine/' + m[1] + '-folha.webp)'
      env.setAttribute('role', 'img'); env.setAttribute('aria-label', im.getAttribute('alt') || m[1])
      im.parentNode.insertBefore(env, im); env.appendChild(im)
    }
  }
  new MutationObserver(function () { ajusta(); pilotos() }).observe(document.documentElement, { childList: true, subtree: true })
  ajusta(); pilotos()
})()
