/* Mesa 2026-11-24: atalho de Missões (pergaminho) só na rolagem da página Jogos. */
(function(){
  function rotulo(){var m=document.querySelector('.bn-menu-lista');var b=m&&m.children[1];return (b&&b.textContent.trim())||'Missões'}
  function abrir(){var m=document.querySelector('.tela.inicio .bn-menu-lista')||document.querySelector('.bn-menu-lista');var b=m&&m.children[1];if(b)b.click()}
  function faixa(){
    var tela=document.querySelector('.tela.inicio.jogos-colorido');
    if(!tela) return null;
    var rolagem=tela.querySelector('.mh-rolagem')||tela.querySelector('.rolagem');
    if(!rolagem) return null;
    var f=rolagem.querySelector(':scope > .mh-icones-jogos');
    if(!f){ f=document.createElement('div'); f.className='mh-icones-jogos'; rolagem.insertBefore(f, rolagem.firstChild); }
    return f;
  }
  function limparCabecalho(){
    document.querySelectorAll('.mh-cabecalho .mh-missoes, .mh-sino-col > .mh-missoes').forEach(function(n){ n.remove(); });
  }
  function poe(){
    limparCabecalho();
    var f=faixa();
    if(!f || f.querySelector('.mh-missoes')) return;
    var bt=document.createElement('button');
    bt.type='button';
    bt.className='mh-missoes';
    var r=rotulo();
    bt.title=r;
    bt.setAttribute('aria-label',r);
    bt.onclick=abrir;
    f.append(bt);
  }
  new MutationObserver(poe).observe(document.documentElement,{childList:true,subtree:true});
  poe();
})();
