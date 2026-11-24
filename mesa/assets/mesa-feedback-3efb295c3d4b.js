/* Mesa: "Sua opinião" — formulário de feedback (gostei, não gostei, ideia, bug).
   O app expõe window.__mesaConta = { perfil(), base() } (código/sessão do jogador e URL do servidor).
   Cada botão abre o mesmo <dialog>. Nada é enviado sem o jogador apertar "Enviar". */
(function () {
  var L = {
    pt: { botao: 'Enviar sugestão ou relatar problema', link: 'Como foi? Dê sua opinião', titulo: 'Sua opinião',
      sub: 'O time lê tudo. Não pedimos seu e-mail.', tipos: ['Gostei', 'Não gostei', 'Ideia', 'Bug'],
      ph: ['O que você mais gosta?', 'O que não gostou?', 'O que gostaria que tivesse?', 'O que deu errado? Onde e como aconteceu?'],
      nota: 'Sua nota (opcional)', enviar: 'Enviar', cancelar: 'Cancelar', enviando: 'Enviando…',
      ok: 'Obrigado! Recebemos sua opinião.', fechar: 'Fechar', aguarde: 'Espere um minuto para enviar outra.',
      limite: 'Você já enviou bastante hoje. Tente amanhã.', sessao: 'Entre na sua conta e tente de novo.',
      falha: 'Não foi possível enviar. Tente de novo.', curto: 'Escreva pelo menos 3 letras.', cont: function (n) { return n + '/500'; } },
    es: { botao: 'Enviar sugerencia o reportar un problema', link: '¿Qué tal? Danos tu opinión', titulo: 'Tu opinión',
      sub: 'El equipo lo lee todo. No pedimos tu correo.', tipos: ['Me gustó', 'No me gustó', 'Idea', 'Error'],
      ph: ['¿Qué es lo que más te gusta?', '¿Qué no te gustó?', '¿Qué te gustaría que tuviera?', '¿Qué salió mal? ¿Dónde y cómo pasó?'],
      nota: 'Tu nota (opcional)', enviar: 'Enviar', cancelar: 'Cancelar', enviando: 'Enviando…',
      ok: '¡Gracias! Recibimos tu opinión.', fechar: 'Cerrar', aguarde: 'Espera un minuto para enviar otra.',
      limite: 'Ya enviaste bastante hoy. Prueba mañana.', sessao: 'Inicia sesión e inténtalo de nuevo.',
      falha: 'No se pudo enviar. Inténtalo de nuevo.', curto: 'Escribe al menos 3 letras.', cont: function (n) { return n + '/500'; } },
    en: { botao: 'Send a suggestion or report a problem', link: 'How was it? Share your feedback', titulo: 'Your feedback',
      sub: 'The team reads everything. We do not ask for your email.', tipos: ['Liked', 'Disliked', 'Idea', 'Bug'],
      ph: ['What do you like most?', 'What did you not like?', 'What would you like to see?', 'What went wrong? Where and how?'],
      nota: 'Your rating (optional)', enviar: 'Send', cancelar: 'Cancel', enviando: 'Sending…',
      ok: 'Thank you! We got your feedback.', fechar: 'Close', aguarde: 'Wait a minute before sending another.',
      limite: 'You sent plenty today. Try tomorrow.', sessao: 'Sign in and try again.',
      falha: 'Could not send. Try again.', curto: 'Write at least 3 letters.', cont: function (n) { return n + '/500'; } }
  };
  var ICONES = ['👍', '👎', '💡', '🐞'], CHAVES = ['gostei', 'naogostei', 'ideia', 'bug'];
  function t() { var l = (document.documentElement.lang || 'pt').slice(0, 2); return L[l] || L.en; }
  var css = document.createElement('style');
  css.textContent =
    '.fb-janela{border:0;border-radius:22px;padding:0;max-width:min(92vw,420px);width:100%;background:linear-gradient(#fff,#eef5ff);color:#15305c;box-shadow:0 18px 50px #0a1c4066;font-family:inherit}' +
    '.fb-janela::backdrop{background:rgba(10,24,52,.55)}' +
    '.fb-corpo{padding:18px 18px 16px;display:flex;flex-direction:column;gap:10px}' +
    '.fb-corpo h2{margin:0;font-size:22px}.fb-corpo p{margin:0;font-size:13px;opacity:.8}' +
    '.fb-tipos{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}' +
    '.fb-tipos button{border:2px solid #b9d0f5;background:#fff;border-radius:14px;padding:8px 2px;font:inherit;font-size:12px;font-weight:700;color:#15305c;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:2px}' +
    '.fb-tipos button span{font-size:20px;line-height:1}' +
    '.fb-tipos button[aria-pressed=true]{background:#2f7cf6;border-color:#1c5fd0;color:#fff}' +
    '.fb-janela textarea{width:100%;box-sizing:border-box;min-height:110px;border:2px solid #b9d0f5;border-radius:14px;padding:10px;font:inherit;font-size:15px;resize:vertical;color:#15305c;background:#fff}' +
    '.fb-linha{display:flex;justify-content:space-between;align-items:center;font-size:12px;opacity:.85}' +
    '.fb-estrelas{display:flex;gap:2px}.fb-estrelas button{border:0;background:none;font-size:26px;line-height:1;cursor:pointer;padding:0 2px;color:#c9d6ea}' +
    '.fb-estrelas button[aria-pressed=true]{color:#f5b301}' +
    '.fb-acoes{display:flex;gap:8px;justify-content:flex-end;margin-top:2px}' +
    '.fb-acoes button{border:0;border-radius:14px;padding:11px 18px;font:inherit;font-weight:800;cursor:pointer}' +
    '.fb-enviar{background:#2f7cf6;color:#fff}.fb-enviar[disabled]{opacity:.55}.fb-cancelar{background:#dde8fa;color:#15305c}' +
    '.fb-msg{min-height:18px;font-size:13px;font-weight:700}.fb-msg.erro{color:#c4271d}.fb-msg.ok{color:#14803c}' +
    '.fb-link{background:none;border:0;color:inherit;text-decoration:underline;opacity:.85;cursor:pointer;font:inherit;font-size:13px;margin-top:6px}' +
    '.fb-botao{margin-top:8px}' +
    '.fb-janela{max-height:94vh;max-height:94dvh;overflow-y:auto}' +
    '@media (max-height:520px){.fb-janela{max-width:min(94vw,560px)}.fb-corpo{padding:10px 14px 10px;gap:5px}.fb-corpo h2{font-size:17px}.fb-corpo p{font-size:12px}' +
    '.fb-tipos button{padding:3px 2px;flex-direction:row;justify-content:center;gap:5px}.fb-tipos button span{font-size:16px}' +
    '.fb-janela textarea{min-height:52px;font-size:14px;padding:6px 8px}.fb-estrelas button{font-size:22px}.fb-acoes button{padding:8px 16px}.fb-msg{min-height:14px}}';
  document.head.appendChild(css);

  var dlg = null, estado = { tipo: 0, nota: 0, origem: '' }, ultimoEnvio = 0;

  function versao() {
    try {
      var r = performance.getEntriesByType('resource').map(function (e) { return e.name; })
        .filter(function (n) { return /index-[A-Za-z0-9_-]+\.js/.test(n); })[0];
      return r ? /index-([A-Za-z0-9_-]+)\.js/.exec(r)[1] : '';
    } catch (e) { return ''; }
  }
  function monta() {
    var s = t();
    dlg = document.createElement('dialog'); dlg.className = 'fb-janela';
    dlg.setAttribute('aria-label', s.titulo);
    var c = document.createElement('div'); c.className = 'fb-corpo';
    var h = document.createElement('h2'); h.textContent = s.titulo;
    var p = document.createElement('p'); p.textContent = s.sub;
    var tipos = document.createElement('div'); tipos.className = 'fb-tipos'; tipos.setAttribute('role', 'group');
    var bts = [];
    for (var i = 0; i < 4; i++) (function (k) {
      var b = document.createElement('button'); b.type = 'button';
      var ic = document.createElement('span'); ic.textContent = ICONES[k]; b.appendChild(ic); b.appendChild(document.createTextNode(s.tipos[k]));
      b.onclick = function () { estado.tipo = k; atualiza(); }; bts.push(b); tipos.appendChild(b);
    })(i);
    var ta = document.createElement('textarea'); ta.maxLength = 500; ta.rows = 4;
    var linha = document.createElement('div'); linha.className = 'fb-linha';
    var nl = document.createElement('span'); nl.textContent = s.nota;
    var est = document.createElement('div'); est.className = 'fb-estrelas';
    var sts = [];
    for (var j = 1; j <= 5; j++) (function (n) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = '★'; b.setAttribute('aria-label', n + '/5');
      b.onclick = function () { estado.nota = estado.nota === n ? 0 : n; atualiza(); }; sts.push(b); est.appendChild(b);
    })(j);
    var cont = document.createElement('span');
    var linha2 = document.createElement('div'); linha2.className = 'fb-linha'; linha2.appendChild(nl); linha2.appendChild(est);
    var msg = document.createElement('div'); msg.className = 'fb-msg'; msg.setAttribute('role', 'status');
    var acoes = document.createElement('div'); acoes.className = 'fb-acoes';
    var cancelar = document.createElement('button'); cancelar.type = 'button'; cancelar.className = 'fb-cancelar'; cancelar.textContent = s.cancelar;
    var enviar = document.createElement('button'); enviar.type = 'button'; enviar.className = 'fb-enviar'; enviar.textContent = s.enviar;
    acoes.appendChild(cancelar); acoes.appendChild(enviar);
    linha.appendChild(cont);
    c.appendChild(h); c.appendChild(p); c.appendChild(tipos); c.appendChild(ta); c.appendChild(linha); c.appendChild(linha2); c.appendChild(msg); c.appendChild(acoes);
    dlg.appendChild(c); document.body.appendChild(dlg);
    function atualiza() {
      bts.forEach(function (b, k) { b.setAttribute('aria-pressed', String(k === estado.tipo)); });
      sts.forEach(function (b, k) { b.setAttribute('aria-pressed', String(k < estado.nota)); });
      ta.placeholder = s.ph[estado.tipo]; cont.textContent = s.cont(ta.value.length);
    }
    ta.oninput = function () { if (msg.className.indexOf('erro') > -1) { msg.className = 'fb-msg'; msg.textContent = ''; } atualiza(); }; cancelar.onclick = function () { dlg.close(); };
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    enviar.onclick = function () {
      msg.className = 'fb-msg'; msg.textContent = '';
      var texto = ta.value.trim();
      if (texto.length < 3) { msg.className = 'fb-msg erro'; msg.textContent = s.curto; return; }
      if (Date.now() - ultimoEnvio < 60000) { msg.className = 'fb-msg erro'; msg.textContent = s.aguarde; return; }
      var conta = window.__mesaConta, perfil = conta && conta.perfil();
      enviar.disabled = true; msg.textContent = s.enviando;
      var corpo = {
        code: perfil && perfil.code ? perfil.code : undefined, sessao: perfil && perfil.code ? perfil.sessao : undefined, tipo: CHAVES[estado.tipo], texto: texto, nota: estado.nota,
        ctx: { origem: estado.origem, versao: versao(), ua: navigator.userAgent.slice(0, 160), tela: innerWidth + 'x' + innerHeight, lang: (document.documentElement.lang || '').slice(0, 8) }
      };
      fetch(conta.base() + '/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corpo) })
        .then(function (r) { return r.json().catch(function () { return {}; }); })
        .then(function (d) {
          if (d && d.ok) {
            ultimoEnvio = Date.now(); ta.value = ''; estado.nota = 0; atualiza();
            msg.className = 'fb-msg ok'; msg.textContent = s.ok; enviar.hidden = true; cancelar.textContent = s.fechar;
            setTimeout(function () { try { dlg.close(); } catch (e) {} }, 2200);
          } else {
            msg.className = 'fb-msg erro'; msg.textContent = (d && s[d.motivo]) || s.falha; enviar.disabled = false;
          }
        })
        .catch(function () { msg.className = 'fb-msg erro'; msg.textContent = s.falha; enviar.disabled = false; });
    };
    dlg.__reset = function () { estado.tipo = 0; estado.nota = 0; ta.value = ''; msg.textContent = ''; enviar.hidden = false; enviar.disabled = false; cancelar.textContent = s.cancelar; atualiza(); };
    dlg.__reset();
  }
  function abre(origem) {
    if (dlg && dlg.isConnected === false) dlg = null;
    if (!dlg) monta();
    estado.origem = origem || ''; dlg.__reset();
    if (!dlg.open) dlg.showModal();
  }
  window.__mesaFeedback = {
    botao: function (origem) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'botao secundario fb-botao'; b.textContent = '💬 ' + t().botao;
      b.onclick = function (e) { e.stopPropagation(); abre(origem || 'perfil'); }; return b;
    },
    link: function () {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'fb-link'; b.textContent = '💬 ' + t().link;
      b.onclick = function (e) { e.stopPropagation(); abre('fim-partida'); }; return b;
    },
    abrir: abre
  };
})();
