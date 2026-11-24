/* Mesa 2026-11-24: atalho de Missões (pergaminho flutuante) logo abaixo do sininho no início.
   Abre o painel de Missões que já existe, pelo mesmo item do menu "⋯" (2º item). */
(function(){
  var SVG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 12h-5"/><path d="M15 8h-5"/></svg>';
  function rotulo(){var m=document.querySelector('.bn-menu-lista');var b=m&&m.children[1];return (b&&b.textContent.trim())||'Missões'}
  function abrir(){var m=document.querySelector('.tela.inicio .bn-menu-lista')||document.querySelector('.bn-menu-lista');var b=m&&m.children[1];if(b)b.click()}
  function poe(sino){
    if(sino.parentElement&&sino.parentElement.classList.contains('mh-sino-col'))return;
    var col=document.createElement('span');col.className='mh-sino-col';
    var bt=document.createElement('button');bt.type='button';bt.className='com-icone mh-missoes';
    var r=rotulo();bt.title=r;bt.setAttribute('aria-label',r);bt.innerHTML=SVG;bt.onclick=abrir;
    sino.replaceWith(col);col.append(sino,bt);
  }
  function varrer(){document.querySelectorAll('.tela.inicio .mh-atalhos > .sino').forEach(poe)}
  new MutationObserver(varrer).observe(document.documentElement,{childList:true,subtree:true});varrer();
})();
