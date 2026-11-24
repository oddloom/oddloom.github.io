/* Mesa 2026-11-24: pergaminho das Missões na faixa da home Jogos (idempotente, sem loop). */
(function(){
  function rotulo(){var m=document.querySelector('.bn-menu-lista');var b=m&&m.children[1];return (b&&b.textContent.trim())||'Missões'}
  function abrir(){var m=document.querySelector('.tela.inicio .bn-menu-lista')||document.querySelector('.bn-menu-lista');var b=m&&m.children[1];if(b)b.click()}
  function limparCabecalho(){
    document.querySelectorAll('.mh-cabecalho .mh-missoes, .mh-sino-col > .mh-missoes, .mh-sino-col > .mh-roleta').forEach(function(n){n.remove()})
  }
  function instalar(){
    limparCabecalho()
    var tela=document.querySelector('.tela.inicio.jogos-colorido')
    if(!tela) return
    var rolagem=tela.querySelector('.mh-rolagem')||tela.querySelector('.rolagem')
    if(!rolagem) return
    var faixa=rolagem.querySelector(':scope > .mh-icones-jogos')
    if(!faixa){
      faixa=document.createElement('div')
      faixa.className='mh-icones-jogos'
      rolagem.insertBefore(faixa, rolagem.firstChild)
    }
    if(faixa.querySelector(':scope > .mh-missoes')) return
    var bt=document.createElement('button')
    bt.type='button'
    bt.className='mh-missoes'
    var r=rotulo()
    bt.title=r
    bt.setAttribute('aria-label',r)
    var img=document.createElement('img')
    img.src='/mesa/arte/mesa-ui/pergaminho-missoes.webp?v=2'
    img.alt=''
    img.draggable=false
    bt.append(img)
    bt.onclick=abrir
    faixa.append(bt)
  }

function observarSeguro(fn) {
  const MAX_POR_SEGUNDO = 8
  const GREVES_PARA_PARAR = 3
  let obs = null
  let raf = 0
  let ocupado = false
  let stamps = []
  let greves = 0
  let parado = false
  let lento = 0

  function rodar() {
    raf = 0
    if (ocupado) return
    ocupado = true
    if (obs) obs.disconnect()
    try { fn() }
    catch (err) { console.error("mesa-atalho", err) }
    finally {
      ocupado = false
      if (obs && !parado) obs.observe(document.documentElement, { childList: true, subtree: true })
    }
  }

  function agendar() {
    if (ocupado || raf) return
    const agora = performance.now()
    stamps = stamps.filter((t) => agora - t < 1000)
    if (stamps.length >= MAX_POR_SEGUNDO) {
      greves += 1
      if (greves >= GREVES_PARA_PARAR && !parado) {
        parado = true
        if (obs) { obs.disconnect(); obs = null }
        if (!lento) lento = setInterval(() => { if (!ocupado) rodar() }, 1000)
      }
      return
    }
    if (parado) return
    stamps.push(agora)
    raf = requestAnimationFrame(rodar)
  }

  obs = new MutationObserver(agendar)
  obs.observe(document.documentElement, { childList: true, subtree: true })
  document.addEventListener("click", (ev) => {
    const alvo = ev.target
    if (alvo && alvo.closest && alvo.closest(".barra, .barra-moderna")) agendar()
  }, true)
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", agendar)
  else agendar()
}

  observarSeguro(instalar)
})();
