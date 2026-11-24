/* Mesa 2026-11-24: atalho e página Campeões da Season. Ícones só na rolagem da home Jogos; dado inerte. Observer sem loop. */
(function(){
// Campeões da Season no bundle da MesaApp (www). Lê o ranking mensal real do servidor.
const CORES = ["#f4212e", "#1d9bf0", "#ff7a00", "#7856ff"]
const LUMI = "/mesa/arte/nubo/lumi-campeoes.png?v=4"
const SERVIDOR = "https://mesas-domino.officialoddloom.workers.dev"
const EXEMPLOS = [
  { code: "EXEMPLO1", nome: "Exemplo 1", avatar: null, moldura: null, pontos: 120, v: 18, p: 24, posicao: 1 },
  { code: "EXEMPLO2", nome: "Exemplo 2", avatar: null, moldura: null, pontos: 90, v: 14, p: 22, posicao: 2 },
  { code: "EXEMPLO3", nome: "Exemplo 3", avatar: null, moldura: null, pontos: 70, v: 11, p: 20, posicao: 3 },
  { code: "EXEMPLO4", nome: "Exemplo 4", avatar: null, moldura: null, pontos: 40, v: 8, p: 16, posicao: 4 },
  { code: "EXEMPLO5", nome: "Exemplo 5", avatar: null, moldura: null, pontos: 25, v: 5, p: 12, posicao: 5 },
]

let wsAtual = null, janela = null, timer = 0, dados = null, estado = null

function ehExemplo(code) { return String(code || "").startsWith("EXEMPLO") }
function temporadaAgora() { return new Date(Date.now() - 3 * 3600000).toISOString().slice(0, 7) }
function nomeTemporada(ym) {
  const [ano, mes] = ym.split("-").map(Number)
  const nome = new Date(ano, mes - 1, 15).toLocaleDateString("pt-BR", { month: "long" })
  return `Temporada de ${nome}`
}
function fimDaTemporada(ym) {
  const [ano, mes] = ym.split("-").map(Number)
  return Date.UTC(ano, mes, 1, 3, 0, 0)
}
function textoContagem(fim) {
  const s = Math.max(0, Math.floor((fim - Date.now()) / 1000))
  if (s <= 0) return "A season acabou"
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60)
  if (d > 1) return `Acaba em ${d} dias e ${h} h`
  if (d === 1) return `Acaba em 1 dia e ${h} h`
  if (h >= 1) return `Acaba em ${h} h e ${m} min`
  return `Acaba em ${m} min`
}
function conta() {
  try { return JSON.parse(localStorage.getItem("mesa-conta") ?? "null") } catch { return null }
}
function servidorHttp() {
  const u = wsAtual?.url
  if (u) return u.replace(/^ws/, "http").replace(/\/jogador\/.*$/, "")
  return SERVIDOR
}

function el(tag, props, ...kids) {
  const n = document.createElement(tag)
  if (props) for (const [k, v] of Object.entries(props)) {
    if (k === "className") n.className = v
    else if (k === "text") n.textContent = v
    else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2).toLowerCase(), v)
    else if (k === "disabled") n.disabled = !!v
    else if (v === false || v == null) {}
    else if (v === true) n.setAttribute(k, "")
    else n.setAttribute(k, v)
  }
  for (const kid of kids.flat()) if (kid != null && kid !== false) n.append(kid)
  return n
}

function fotoDe(p) {
  const f = el("span", { className: "foto" }, (p.nome || "?")[0].toUpperCase())
  f.style.setProperty("--cor", CORES[(p.code || "A").charCodeAt(0) % CORES.length])
  return f
}

function patchWs() {
  const Orig = window.WebSocket
  if (Orig.__mesaCampeoes) return
  function Wrap(url, proto) {
    const s = proto === undefined ? new Orig(url) : new Orig(url, proto)
    s.addEventListener("message", (ev) => {
      try {
        const m = JSON.parse(typeof ev.data === "string" ? ev.data : "")
        if (m && m.t === "estado") estado = m
      } catch { /* ignore */ }
    })
    if (String(url).includes("/jogador/")) wsAtual = s
    return s
  }
  Wrap.prototype = Orig.prototype
  Wrap.CONNECTING = Orig.CONNECTING
  Wrap.OPEN = Orig.OPEN
  Wrap.CLOSING = Orig.CLOSING
  Wrap.CLOSED = Orig.CLOSED
  Wrap.__mesaCampeoes = true
  window.WebSocket = Wrap
}


function aplicarSafeArea(j) {
  const d = document.createElement("div")
  d.setAttribute("aria-hidden", "true")
  d.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;padding:env(safe-area-inset-top,0px) env(safe-area-inset-right,0px) env(safe-area-inset-bottom,0px) env(safe-area-inset-left,0px);visibility:hidden;pointer-events:none"
  document.body.append(d)
  const s = getComputedStyle(d)
  j.style.setProperty("--cp-sat", s.paddingTop)
  j.style.setProperty("--cp-sar", s.paddingRight)
  j.style.setProperty("--cp-sab", s.paddingBottom)
  j.style.setProperty("--cp-sal", s.paddingLeft)
  d.remove()
}


function travarDialog(j) {
  aplicarSafeArea(j)
  if (window.innerWidth < 720) {
    const s = ["position","fixed","top","0px","right","0px","bottom","0px","left","0px","width","100%","max-width","100%","min-width","0","height","100%","max-height","100%","margin","0","overflow-x","hidden","box-sizing","border-box","transform","none"]
    for (let i = 0; i < s.length; i += 2) j.style.setProperty(s[i], s[i+1], "important")
    document.documentElement.style.overflowX = "hidden"
  }
}

function abrirMissoes() {
  const m = document.querySelector(".tela.inicio .bn-menu-lista") || document.querySelector(".bn-menu-lista")
  const b = m && m.children[1]
  if (b) b.click()
}

function limparIconesDoCabecalho() {
  const nos = document.querySelectorAll(".mh-cabecalho .mh-trofeu, .mh-cabecalho .mh-dado, .mh-cabecalho .mh-missoes, .mh-sino-col > .mh-trofeu, .mh-sino-col > .mh-dado, .mh-sino-col > .mh-missoes, .mh-sino-col > .mh-roleta")
  nos.forEach((n) => n.remove())
}

function garantirAtalho() {
  limparIconesDoCabecalho()
  const tela = document.querySelector(".tela.inicio.jogos-colorido")
  if (!tela) return
  const rolagem = tela.querySelector(".mh-rolagem") || tela.querySelector(".rolagem")
  if (!rolagem) return
  let faixa = rolagem.querySelector(":scope > .mh-icones-jogos")
  if (!faixa) {
    faixa = el("div", { className: "mh-icones-jogos" })
    rolagem.insertBefore(faixa, rolagem.firstChild)
  } else if (rolagem.firstElementChild !== faixa) {
    rolagem.insertBefore(faixa, rolagem.firstChild)
  }
  let t = faixa.querySelector(":scope > .mh-trofeu")
  if (!t) {
    t = el("button", { className: "mh-trofeu", type: "button", title: "Campeões da Season" })
    t.setAttribute("aria-label", "Campeões da Season")
    t.append(el("img", { src: "/mesa/arte/mesa-ui/trofeu-campeoes.webp?v=1", alt: "", draggable: "false" }))
    t.addEventListener("click", abrir)
  }
  let d = faixa.querySelector(":scope > .mh-dado")
  if (!d) {
    d = el("button", { className: "mh-dado", type: "button", title: "Dado" })
    d.setAttribute("aria-label", "Dado")
    d.setAttribute("aria-disabled", "true")
    d.append(el("img", { src: "/mesa/arte/mesa-ui/dado-vermelho.webp?v=1", alt: "", draggable: "false" }))
    d.addEventListener("click", (ev) => { ev.preventDefault(); ev.stopPropagation() })
  }
  let m = faixa.querySelector(":scope > .mh-missoes")
  if (!m) {
    m = el("button", { className: "mh-missoes", type: "button", title: "Missões" })
    m.setAttribute("aria-label", "Missões")
    m.append(el("img", { src: "/mesa/arte/mesa-ui/pergaminho-missoes.webp?v=2", alt: "", draggable: "false" }))
    m.addEventListener("click", abrirMissoes)
  }
  if (t && !t.querySelector("img")) t.append(el("img", { src: "/mesa/arte/mesa-ui/trofeu-campeoes.webp?v=1", alt: "", draggable: "false" }))
  if (d && !d.querySelector("img")) d.append(el("img", { src: "/mesa/arte/mesa-ui/dado-vermelho.webp?v=1", alt: "", draggable: "false" }))
  if (m && !m.querySelector("img")) m.append(el("img", { src: "/mesa/arte/mesa-ui/pergaminho-missoes.webp?v=2", alt: "", draggable: "false" }))
  const certo = faixa.children.length === 3 && faixa.children[0] === t && faixa.children[1] === d && faixa.children[2] === m
  if (!certo) faixa.append(t, d, m)
}

function abrir() {
  janela?.close()
  const j = el("dialog", { className: "cp-pagina" })
  janela = j
  j.addEventListener("close", () => {
    clearInterval(timer)
    j.remove()
    if (janela === j) janela = null
    document.documentElement.style.overflowX = ""
  })
  document.body.append(j)
  travarDialog(j)
  j.append(el("p", { className: "cp-vazio", text: "Carregando os campeões…" }))
  j.showModal()
  void carregar()
}

async function carregar() {
  const code = conta()?.code ?? ""
  const r = await fetch(`${servidorHttp()}/ranking?jogo=geral&code=${encodeURIComponent(code)}`)
    .then((x) => x.json())
    .catch(() => null)
  if (r && Array.isArray(r.top)) {
    dados = { temporada: r.temporada || temporadaAgora(), top: r.top, eu: r.eu, exemplo: r.top.length === 0 }
    if (dados.exemplo) dados.top = EXEMPLOS
  } else {
    dados = { temporada: temporadaAgora(), top: EXEMPLOS, eu: null, exemplo: true }
  }
  pintarLista()
}

function pintarLista() {
  const j = janela
  if (!j || !dados) return
  const fechar = el("button", { className: "cp-fechar", type: "button", "aria-label": "Fechar", text: "×" })
  fechar.onclick = () => j.close()
  const topo = el("div", { className: "cp-topo" }, el("span", { className: "cp-espaco" }), el("h2", { text: "Campeões da Season" }), fechar)
  const contaEl = el("p", { className: "cp-conta" })
  const atualizar = () => { contaEl.textContent = textoContagem(fimDaTemporada(dados.temporada)) }
  atualizar()
  clearInterval(timer)
  timer = setInterval(atualizar, 30000)
  const hero = el("div", { className: "cp-hero" },
    el("div", { className: "cp-hero-arte" }, el("img", { src: LUMI, alt: "Lumi comemorando os campeões", decoding: "async", draggable: "false", width: "168", height: "204" })),
    el("p", { className: "cp-temporada", text: nomeTemporada(dados.temporada) }),
    contaEl,
    el("p", { className: "cp-convite", text: "O pódio é de quem mais pontua nesta season. Entre para a lista e mostre do que você é capaz." }),
  )
  const corpo = el("div", { className: "cp-corpo" }, hero)
  if (dados.exemplo) corpo.append(el("p", { className: "cp-aviso", text: "Estes são exemplos. O ranking desta season ainda não carregou." }))

  const top = dados.top
  const primeiro = top.find((l) => l.posicao === 1)
  const segundo = top.find((l) => l.posicao === 2)
  const terceiro = top.find((l) => l.posicao === 3)
  if (primeiro || segundo || terceiro) {
    const podio = el("div", { className: "cp-podio" })
    for (const [linha, classe, simbolo] of [[segundo, "p2", "🥈"], [primeiro, "p1", "👑"], [terceiro, "p3", "🥉"]]) {
      if (!linha) { podio.append(el("div")); continue }
      podio.append(cartaoPodio(linha, classe, simbolo))
    }
    corpo.append(podio)
  }
  const resto = top.filter((l) => l.posicao > 3)
  if (resto.length) {
    const lista = el("div", { className: "cp-lista" })
    const meu = conta()?.code ?? ""
    for (const l of resto) lista.append(linhaLista(l, l.code === meu))
    corpo.append(lista)
  } else if (!top.length) {
    corpo.append(el("p", { className: "cp-vazio", text: "Ninguém pontuou ainda nesta season. Seja o primeiro!" }))
  }
  const meuCode = conta()?.code ?? ""
  const noTopo = top.some((l) => l.code === meuCode)
  if (dados.eu && meuCode && !noTopo) corpo.append(el("div", { className: "cp-eu" }, linhaLista(dados.eu, true)))
  j.replaceChildren(topo, corpo)
}

function cartaoPodio(l, classe, simbolo) {
  const b = el("button", { className: `cp-lugar ${classe}`, type: "button" },
    el("span", { className: "cp-medalha" }, simbolo),
    fotoDe(l),
    el("strong", { text: l.nome || "—" }),
    el("span", { className: "cp-pts", text: `${Number(l.pontos).toLocaleString("pt-BR")} pts` }),
  )
  b.setAttribute("aria-label", `${l.posicao}º lugar, ${l.nome}`)
  b.onclick = () => pintarPerfil(l)
  return b
}

function linhaLista(l, eu) {
  const raridade = l.posicao <= 6 ? " r-epico" : l.posicao <= 10 ? " r-raro" : ""
  const b = el("button", { className: `cp-linha${eu ? " eu" : ""}${raridade}`, type: "button" },
    el("span", { className: "cp-pos", text: `${l.posicao}º` }),
    fotoDe(l),
    el("span", { className: "cp-nome" }, el("strong", { text: l.nome || "—" }), el("span", { text: `${l.v} ${l.v === 1 ? "vitória" : "vitórias"} · ${l.p} ${l.p === 1 ? "partida" : "partidas"}` })),
    el("strong", { className: "cp-pts", text: `${Number(l.pontos).toLocaleString("pt-BR")} pts` }),
  )
  b.onclick = () => pintarPerfil(l)
  return b
}

function pintarPerfil(l) {
  const j = janela
  if (!j) return
  const voltar = el("button", { className: "cp-voltar", type: "button", "aria-label": "Voltar", text: "‹" })
  voltar.onclick = () => pintarLista()
  const fechar = el("button", { className: "cp-fechar", type: "button", "aria-label": "Fechar", text: "×" })
  fechar.onclick = () => j.close()
  const topo = el("div", { className: "cp-topo" }, voltar, el("h2", { text: "Perfil" }), fechar)
  const eu = conta()?.code === l.code
  const amigo = (estado?.amigos || []).some((a) => a.code === l.code)
  const status = el("p", { className: "cp-status", role: "status" })
  const acoes = el("div", { className: "cp-acoes" })
  if (!eu && !ehExemplo(l.code)) {
    if (amigo) acoes.append(el("button", { type: "button", disabled: true, text: "Já é seu amigo" }))
    else {
      const add = el("button", { type: "button", text: "Adicionar" })
      add.onclick = () => {
        if (!conta()) { status.textContent = "Entre na sua conta para adicionar esta pessoa."; return }
        if (!wsAtual || wsAtual.readyState !== 1) { status.textContent = "Não foi possível enviar o pedido. Tente de novo."; return }
        wsAtual.send(JSON.stringify({ t: "adicionar", code: l.code }))
        add.disabled = true
        add.textContent = "Pedido enviado"
        status.textContent = "Pedido de amizade enviado."
      }
      acoes.append(add)
    }
    const canal = el("button", { className: "secundario", type: "button", text: "Ver canal" })
    canal.onclick = () => {
      if (!wsAtual || wsAtual.readyState !== 1) {
        status.textContent = "Não foi possível abrir o canal. Tente de novo."
        return
      }
      wsAtual.send(JSON.stringify({ t: "canal-ver", code: l.code }))
      status.textContent = "Abrindo o canal…"
      j.close()
    }
    acoes.append(canal)
  } else if (ehExemplo(l.code)) {
    status.textContent = "Este é um perfil de exemplo."
  }
  const corpo = el("div", { className: "cp-corpo" },
    el("div", { className: "cp-perfil pagina-perfil" },
      el("div", { className: "foto-grande" }, fotoDe(l)),
      el("h1", { text: l.nome || "—" }),
      el("p", { className: "cp-posicao-grande", text: `${l.posicao}º lugar nesta season` }),
      el("p", { className: "cp-stats", text: `${Number(l.pontos).toLocaleString("pt-BR")} pontos · ${l.v} vitórias em ${l.p} partidas` }),
      acoes,
      status,
    ),
  )
  j.replaceChildren(topo, corpo)
}

patchWs()

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

observarSeguro(garantirAtalho)

})();
