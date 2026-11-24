// Roleta no bundle da MesaApp (www). O sorteio real é no servidor (girar-roleta).
const CUSTO_GIRO = 10, CUSTO_DEZ = 90, MOEDA_BASE = 10
const MOEDAS_PREMIO = { moedas10: 100, moedas30: 300, moedas500: 5000 }
const CHANCES_BASE = { moedas10: 35, "item-raro": 22, moedas30: 15, moedas500: 10, "item-epico": 10, "item-muitoraro": 4.5, diamantes5: 2, diamantes20: 0.8, diamantes100: 0.2, "item-lendario": 0.5 }
const PITY_EPICO = 40, PITY_LENDARIO = 150
const NOMES_RAR = { raro: "Incomum", epico: "Raro", muitoraro: "Épico", lendario: "Lendário" }
const TIPOS = { avatar: "Ícone", moldura: "Moldura", faixa: "Faixa", tabuleiro: "Tabuleiro", capacete: "Capacete", piloto: "Piloto", musica: "Música" }
// A roda é desenhada em CSS: 8 fatias de 45°, a fatia k fica centrada em k×45° (ponteiro fixo no topo).
// As fatias são ilustrativas: o tamanho NÃO mostra a chance (a tabela de chances é a referência).
const FATIAS = [
  { k: 0, premios: ["moedas10"], cor: "c-creme", icone: "moeda", rotulo: "10×" },
  { k: 1, premios: ["item-raro"], cor: "c-verde", estrela: true, rotulo: "Incomum" },
  { k: 2, premios: ["moedas30"], cor: "c-laranja", icone: "moeda", rotulo: "30×" },
  { k: 3, premios: ["item-epico"], cor: "c-raro", estrela: true, rotulo: "Raro" },
  { k: 4, premios: ["moedas500"], cor: "c-coral", icone: "moeda", rotulo: "500×" },
  { k: 5, premios: ["item-muitoraro"], cor: "c-epico", estrela: true, rotulo: "Épico" },
  { k: 6, premios: ["diamantes5", "diamantes20", "diamantes100"], cor: "c-ciano", icone: "diamante", rotulo: "Diamantes" },
  { k: 7, premios: ["item-lendario"], cor: "c-lenda", estrela: true, rotulo: "Lendário" },
]
// giro final: dá a volta e para com a fatia do prêmio sob o ponteiro (com uma folga para não parar sempre no centro)
function anguloDe(premio) {
  const f = FATIAS.find((x) => x.premios.includes(premio))
  const k = f ? f.k : 0
  return ((360 - 45 * k) % 360) + (Math.random() * 24 - 12)
}
// imagens ficam ao lado deste script (site: /mesa/arte/mesa-ui/, app: /arte/mesa-ui/)
const BASE = new URL("./", import.meta.url).href
const ARTE = (nome) => `${BASE}${nome}.webp?v=1`
const ICONE = ARTE("roleta")

let wsAtual = null, estado = null, janela = null, tela = "giro", ultimo = null, girando = false, espera = 0

function patchWs() {
  const Orig = window.WebSocket
  if (Orig.__mesaRoleta) return
  function Wrap(url, proto) {
    const s = proto === undefined ? new Orig(url) : new Orig(url, proto)
    s.addEventListener("message", (ev) => {
      try {
        const m = JSON.parse(typeof ev.data === "string" ? ev.data : "")
        if (m && m.t === "estado") {
          estado = m
          garantirAtalho()
          if (janela && !girando) montar()
        } else if (m && m.t === "roleta-resultado") resposta(m)
      } catch { /* ignore */ }
    })
    wsAtual = s
    return s
  }
  Wrap.prototype = Orig.prototype
  Wrap.CONNECTING = Orig.CONNECTING
  Wrap.OPEN = Orig.OPEN
  Wrap.CLOSING = Orig.CLOSING
  Wrap.CLOSED = Orig.CLOSED
  Wrap.__mesaRoleta = true
  window.WebSocket = Wrap
}

function diamantesVisiveis() {
  return !!document.querySelector(".saldo-moedas .diamante-icone")
}

function garantirAtalho() {
  // preferência: a faixa de ícones da home Jogos (ao lado do troféu e do pergaminho); senão, a coluna do sino
  const alvos = document.querySelectorAll(".tela.inicio .mh-icones-jogos, .tela.inicio:not(.jogos-colorido) .mh-sino-col")
  alvos.forEach((col) => {
    const existente = col.querySelector(":scope > .mh-roleta")
    if (existente) { existente.hidden = !diamantesVisiveis(); return }
    if (!diamantesVisiveis()) return
    const b = document.createElement("button")
    b.className = "mh-roleta"
    b.type = "button"
    b.title = "Roleta"
    b.setAttribute("aria-label", "Roleta")
    b.addEventListener("click", abrir)
    const missoes = col.querySelector(":scope > .mh-missoes")
    if (missoes) col.insertBefore(b, missoes)
    else col.append(b)
  })
}

function visao() {
  if (estado?.roleta?.chances) return estado.roleta
  const semEpico = estado?.roleta?.semEpico ?? estado?.roleta?.semEpicoPlus ?? 0
  const semLendario = estado?.roleta?.semLendario ?? 0
  return {
    custo: CUSTO_GIRO, custoDez: CUSTO_DEZ, semEpico, semLendario,
    garantiaEpicoEm: Math.max(0, PITY_EPICO - semEpico),
    garantiaLendarioEm: Math.max(0, PITY_LENDARIO - semLendario),
    chances: { ...CHANCES_BASE },
  }
}

function el(tag, props, ...kids) {
  const n = document.createElement(tag)
  if (props) for (const [k, v] of Object.entries(props)) {
    if (k === "className") n.className = v
    else if (k === "dataset") Object.assign(n.dataset, v)
    else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2).toLowerCase(), v)
    else if (k === "text") n.textContent = v
    else if (v === false || v == null) {}
    else if (v === true) n.setAttribute(k, "")
    else n.setAttribute(k, v)
  }
  for (const kid of kids.flat()) if (kid != null && kid !== false) n.append(kid)
  return n
}

function iconeMoeda(cls) {
  const s = el("span", { className: "moeda-icone" + (cls ? " " + cls : "") })
  s.innerHTML = `<img src="${ARTE(cls === "diamante-icone" ? "diamante" : "moeda")}" alt="" decoding="async" draggable="false">`
  return s
}
const moedaEl = () => iconeMoeda("")
const diamanteEl = () => iconeMoeda("diamante-icone")
const numero = (n) => n.toLocaleString("pt-BR")
function valorMoedas(n) { return el("span", { className: "bn-valor" }, moedaEl(), el("strong", { text: numero(n) })) }
function valorDiamantes(n) { return el("span", { className: "bn-valor" }, diamanteEl(), el("strong", { text: numero(n) })) }
function pct(n) { return `${n.toLocaleString("pt-BR", { minimumFractionDigits: Number.isInteger(n) ? 0 : 1, maximumFractionDigits: 2 })}%` }

// nomes de exibição dos itens (iguais aos da loja); se faltar algum, mostra o id com a inicial maiúscula
const NOMES_ITENS = {"avatar":{"gatinha":"Gatinha","nubolimitado":"Lumi","nubocontrole":"Lumi Gamer","nuboexclusivo":"Lumi exclusivo","nuboconvite":"Lumi · Convite","nubopresente":"Lumi · Presente","nubo2d":"Lumi · Olá","bola":"Bola 8","domino":"Dominó","carta":"Carta","dado":"Dado","peao":"Peão","trofeu":"Troféu","coroa":"Coroa","dadocristal":"Dado de cristal","trofeudiamante":"Troféu de diamante","dragaolendario":"Gatinho lendário","coroanova":"Coroa dourada","cerebro":"Cérebro","olhodragao":"Olho de dragão","coracao":"Coração","gatinho":"Gatinho"},"moldura":{"ouro":"Ouro","louros":"Louros","asas":"Asas","asas2":"Asas reais","coroa":"Coroa","chamas":"Chamas","dragao":"Dragão","dragao2":"Dragão real","cristal":"Cristal de gelo","realeza":"Realeza","fenix":"Fênix","anjo":"Asas de luz"},"faixa":{"vermelha":"Vermelha","azul":"Azul","verde":"Verde","rosa":"Rosa","fogo":"Fogo","ouro":"Ouro","galaxia":"Galáxia","raios":"Raios","lendaria":"Aurora lendária"},"tabuleiro":{"mogno":"Mogno","marmore":"Mármore","safira":"Safira","rubi":"Rubi"},"capacete":{"viking":"Viking","samurai":"Samurai","bombeiro":"Bombeiro"},"piloto":{"macaco":"Macaco","raposa":"Raposa","urso":"Urso","tartaruga":"Tartaruga"}}
function nomeItem(chave) {
  const [tipo, id] = String(chave).split(":")
  const bonito = (NOMES_ITENS[tipo] && NOMES_ITENS[tipo][id]) || (id ? id.charAt(0).toUpperCase() + id.slice(1) : String(chave))
  return (TIPOS[tipo] ? TIPOS[tipo] + ": " : "") + bonito
}
function rotulo(g) {
  if (g.item) return nomeItem(g.item)
  if (g.premio === "moedas10") return `${numero(g.moedas || 100)} moedas (10×)`
  if (g.premio === "moedas30") return `${numero(g.moedas || 300)} moedas (30×)`
  if (g.premio === "moedas500") return `${numero(g.moedas || 5000)} moedas (500×)`
  if (String(g.premio).startsWith("diamantes")) return `${numero(g.diamantes || Number(String(g.premio).slice(9)))} diamantes`
  return `${numero(g.moedas || 0)} moedas`
}
function classeR(g) { return g.raridade ? `r-${g.raridade}` : String(g.premio).startsWith("diamantes") ? "r-epico" : "r-moedas" }
function selo(g) { return g.raridade ? NOMES_RAR[g.raridade] : g.premio === "moedas500" ? "500×" : g.premio === "moedas30" ? "30×" : String(g.premio).startsWith("diamantes") ? "Diamantes" : "10×" }

function abrir() {
  janela?.close()
  const j = el("dialog", { className: "bn-janela bn-roleta" })
  janela = j
  tela = "giro"
  j.addEventListener("close", () => { j.remove(); clearTimeout(espera); girando = false; if (janela === j) janela = null })
  document.body.append(j)
  montar()
  j.showModal()
}

function montar() {
  const j = janela
  if (!j) return
  const fechar = el("button", { className: "bn-fechar", type: "button", "aria-label": "Fechar", text: "×" })
  fechar.onclick = () => j.close()
  const corpo = el("div", { className: "bn-corpo" })
  j.replaceChildren(fechar, corpo)
  if (tela === "chances") { corpo.append(cabecalho(), abas()); pintarChances(corpo) }
  else if (tela === "resultado" && ultimo) pintarResultado(corpo, ultimo.giros)
  else { corpo.append(cabecalho(), abas()); pintarGiro(corpo) }
}

function cabecalho() {
  return el("h2", { className: "ro-titulo", text: "Roleta da Mesa" })
}

// abas sempre visíveis: a tabela de chances fica a um toque de distância
function abas() {
  const mk = (id, texto) => {
    const b = el("button", { className: "ro-aba", type: "button", role: "tab", "aria-selected": tela === id ? "true" : "false", text: texto })
    b.onclick = () => { if (tela !== id) { tela = id; montar() } }
    return b
  }
  return el("div", { className: "ro-abas", role: "tablist", "aria-label": "Roleta" }, mk("giro", "Girar"), mk("chances", "Chances"))
}

function fatiaEl(f) {
  const conteudo = f.estrela ? el("span", { className: "ro-estrela", "aria-hidden": "true", text: "★" })
    : el("img", { src: ARTE(f.icone), alt: "", draggable: "false", decoding: "async" })
  return el("div", { className: `ro-fatia ${f.cor}`, style: `--k:${f.k}` }, el("span", {}, conteudo, f.rotulo))
}

// roda decorativa em CSS; aria-hidden porque o resultado e as chances são lidos em texto
function palcoEl() {
  const luzes = []
  for (let i = 0; i < 16; i++) luzes.push(el("i", { className: "ro-luz", style: `--i:${i}` }))
  return el("div", { className: "ro-palco", "aria-hidden": "true" },
    el("div", { className: "ro-aro" }),
    ...luzes,
    el("div", { className: "ro-roda" }, ...FATIAS.map(fatiaEl)),
    el("div", { className: "ro-brilho" }),
    el("div", { className: "ro-centro" }, el("img", { src: ARTE("diamante"), alt: "", draggable: "false" })),
    el("div", { className: "ro-ponteiro" }),
  )
}

function garantia(tipo, titulo, texto, valor, max) {
  return el("div", { className: `ro-garantia g-${tipo}` },
    el("span", { className: "ro-chip", text: titulo }),
    el("strong", { text: texto }),
    el("progress", { value: String(valor ?? 0), max: String(max), "aria-label": `Progresso para ${titulo.toLowerCase()} garantido` }),
  )
}

function pintarGiro(c) {
  const v = visao()
  const diamantes = estado?.diamantes ?? 0
  const moedas = estado?.moedas ?? 0
  c.append(
    el("div", { className: "ro-saldo" }, valorMoedas(moedas), valorDiamantes(diamantes)),
    palcoEl(),
  )
  const pity = el("div", { className: "ro-pity" },
    garantia("epico", "Épico", v.garantiaEpicoEm === 0 ? "O próximo giro garante um item épico." : `Épico garantido em ${v.garantiaEpicoEm} giro${v.garantiaEpicoEm === 1 ? "" : "s"} (${v.semEpico}/40).`, v.semEpico, 40),
    garantia("lenda", "Lendário", v.garantiaLendarioEm === 0 ? "O próximo giro garante um item lendário." : `Lendário garantido em ${v.garantiaLendarioEm} giro${v.garantiaLendarioEm === 1 ? "" : "s"} (${v.semLendario}/150).`, v.semLendario, 150),
  )
  const um = el("button", { className: "bn-acao", type: "button" })
  um.append("Girar · ", diamanteEl(), ` ${CUSTO_GIRO}`)
  um.disabled = girando || !estado || diamantes < CUSTO_GIRO
  um.onclick = () => pedir(1, um)
  const dez = el("button", { className: "bn-acao secundaria", type: "button" })
  dez.append("10 giros · ", diamanteEl(), ` ${CUSTO_DEZ}`)
  dez.disabled = girando || !estado || diamantes < CUSTO_DEZ
  dez.onclick = () => pedir(10, dez)
  const status = el("p", { className: "bn-status", role: "status", "aria-live": "polite" })
  if (!estado) status.textContent = "Entre na sua conta para girar a roleta."
  else if (diamantes < CUSTO_GIRO) status.textContent = `Você precisa de ${CUSTO_GIRO} diamantes para girar.`
  c.append(el("div", { className: "ro-acoes" }, um, dez), status, pity)
}

function pintarChances(c) {
  const v = visao()
  const linhas = [
    ["moedas10", `${numero(100)} moedas (10×)`],
    ["item-raro", `Item ${NOMES_RAR.raro}`],
    ["moedas30", `${numero(300)} moedas (30×)`],
    ["moedas500", `${numero(5000)} moedas (500×)`],
    ["item-epico", `Item ${NOMES_RAR.epico}`],
    ["item-muitoraro", `Item ${NOMES_RAR.muitoraro}`],
    ["diamantes5", `${numero(5)} diamantes`],
    ["diamantes20", `${numero(20)} diamantes`],
    ["diamantes100", `${numero(100)} diamantes`],
    ["item-lendario", `Item ${NOMES_RAR.lendario}`],
  ]
  const classe = { "item-raro": "c-incomum", "item-epico": "c-raro", "item-muitoraro": "c-epico", "item-lendario": "c-lendario", diamantes5: "c-diamante", diamantes20: "c-diamante", diamantes100: "c-diamante" }
  const maior = Math.max(...Object.values(CHANCES_BASE))
  const lista = el("ol")
  for (const [id, nome] of linhas) {
    const base = CHANCES_BASE[id], atual = v.chances[id]
    const li = el("li", { className: classe[id] || "", style: `--p:${Math.max(2, (base / maior) * 100).toFixed(1)}%` }, el("span", { text: nome }), el("span", { className: "ro-pct", text: pct(base) }))
    if (Math.abs((atual ?? base) - base) >= 0.05) li.append(el("span", { className: "ro-atual", text: `Agora, com o seu pity: ${pct(atual)}` }))
    lista.append(li)
  }
  c.append(el("div", { className: "ro-chances" }, el("p", { className: "ro-sub", text: "Chance de cada giro. As cores seguem a raridade do item." }), lista),
    el("p", { className: "bn-nota", text: "Um item épico é garantido a cada 40 giros sem épico; um lendário, a cada 150 giros sem lendário. Se você já tiver o item, recebe moedas no lugar. As fatias da roda são só ilustração: o tamanho delas não mostra a chance." }))
}

const CONFETE = ["#ffc93c", "#ff7a62", "#4aa3ff", "#52d394", "#a46cf7", "#ff8fc1"]
function confete() {
  const caixa = el("div", { className: "ro-confete", "aria-hidden": "true" })
  for (let i = 0; i < 22; i++) {
    const ang = (i / 22) * Math.PI * 2 + Math.random() * 0.4
    const dist = 90 + Math.random() * 90
    caixa.append(el("i", { style: `--c:${CONFETE[i % CONFETE.length]};--x:${Math.round(Math.cos(ang) * dist)}px;--y:${Math.round(Math.sin(ang) * dist - 30)}px;--r:${Math.round(Math.random() * 540 - 270)}deg;--a:${(Math.random() * 0.15).toFixed(2)}s` }))
  }
  return caixa
}

function medalha(g) {
  const dentro = g.item ? el("span", { className: "ro-estrela", "aria-hidden": "true", text: "★" })
    : el("img", { src: ARTE(String(g.premio).startsWith("diamantes") ? "diamante" : "moeda"), alt: "", draggable: "false" })
  return el("div", { className: `ro-vitrine ${classeR(g)}`, "aria-hidden": "true" }, el("div", { className: "ro-medalha" }, dentro))
}

function pintarResultado(c, giros) {
  const g = giros[giros.length - 1]
  const bloco = el("div", { className: "ro-resultado", role: "status" },
    medalha(g),
    el("span", { className: `ro-selo ${classeR(g)}`, text: selo(g) }),
    el("p", { className: `ro-premio ${classeR(g)}`, text: rotulo(g) }),
  )
  if (g.repetido) bloco.append(el("p", { className: "ro-sub", text: "Você já tinha este item. Ganhou moedas no lugar." }))
  if (g.moedas && g.item) bloco.append(valorMoedas(g.moedas))
  if (giros.length > 1) {
    const lista = el("ul", { className: "ro-lista" })
    for (const x of giros) lista.append(el("li", {}, el("span", { text: rotulo(x) }), el("span", { className: `ro-selo ${classeR(x)}`, text: selo(x) })))
    bloco.append(lista)
  }
  if (g.raridade === "muitoraro" || g.raridade === "lendario" || String(g.premio) === "moedas500" || String(g.premio).startsWith("diamantes")) bloco.append(confete())
  const ok = el("button", { className: "bn-acao", type: "button", text: "Legal!" })
  ok.onclick = () => { tela = "giro"; ultimo = null; montar() }
  c.append(cabecalho(), bloco, ok)
}

function pedir(vezes, botao) {
  if (girando || !estado || !wsAtual || wsAtual.readyState !== 1) {
    const status = janela?.querySelector(".bn-status")
    if (status) status.textContent = "Não foi possível girar. Tente de novo."
    return
  }
  girando = true
  botao.disabled = true
  // espera o servidor sortear: lâmpadas aceleram e a roda toma impulso; o giro de verdade começa com o resultado
  janela?.querySelector(".ro-palco")?.classList.add("esperando")
  const status = janela?.querySelector(".bn-status")
  if (status) status.textContent = "Girando…"
  wsAtual.send(JSON.stringify({ t: "girar-roleta", vezes }))
  clearTimeout(espera)
  espera = setTimeout(() => {
    if (!girando) return
    girando = false
    if (status) status.textContent = "Não foi possível girar. Tente de novo."
    botao.disabled = false
    janela?.querySelector(".ro-palco")?.classList.remove("esperando", "girando")
  }, 10000)
}

function resposta(m) {
  clearTimeout(espera)
  girando = false
  if (!m.ok || !m.giros?.length) {
    const status = janela?.querySelector(".bn-status")
    if (status) status.textContent = m.motivo === "diamantes" ? `Você precisa de ${CUSTO_GIRO} diamantes para girar.` : "Não foi possível girar. Tente de novo."
    janela?.querySelectorAll("button").forEach((b) => { if (b.classList.contains("bn-acao")) b.disabled = false })
    return
  }
  ultimo = { giros: m.giros, custo: m.custo ?? CUSTO_GIRO }
  const palco = janela?.querySelector(".ro-palco")
  const roda = janela?.querySelector(".ro-roda")
  const alvo = m.giros[m.giros.length - 1]
  if (roda) roda.style.setProperty("--ro-giro", `${1080 + anguloDe(alvo.premio)}deg`)
  palco?.classList.remove("esperando")
  palco?.classList.add("girando")
  const ir =() => { tela = "resultado"; montar() }
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !janela) ir()
  else setTimeout(ir, 2400)
}

patchWs()
new MutationObserver(garantirAtalho).observe(document.documentElement, { childList: true, subtree: true })
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", garantirAtalho)
else garantirAtalho()
