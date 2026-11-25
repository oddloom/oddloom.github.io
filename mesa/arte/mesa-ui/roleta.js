// Roleta da Mesa v2 — SVG nítido, animação física com pinos e ponteiro reativo, som opcional via Web Audio.
// O sorteio real continua 100% no servidor (girar-roleta).
const CUSTO_GIRO = 10, CUSTO_DEZ = 90, MOEDA_BASE = 10
const MOEDAS_PREMIO = { moedas10: 100, moedas30: 300, moedas500: 5000 }
const CHANCES_BASE = {
  moedas10: 35, "item-raro": 22, moedas30: 15, moedas500: 10,
  "item-epico": 10, "item-muitoraro": 4.5,
  diamantes5: 2, diamantes20: 0.8, diamantes100: 0.2,
  "item-lendario": 0.5,
}
const PITY_EPICO = 40, PITY_LENDARIO = 150
const NOMES_RAR = { raro: "Incomum", epico: "Raro", muitoraro: "Épico", lendario: "Lendário" }
const TIPOS = {
  avatar: "Ícone", moldura: "Moldura", faixa: "Faixa", tabuleiro: "Tabuleiro",
  capacete: "Capacete", piloto: "Piloto", musica: "Música",
}

// 8 fatias ilustrativas de 45° (centro da fatia k em k*45° a partir do topo).
// O tamanho visual das fatias NÃO representa a probabilidade — a tabela de chances é a referência.
const FATIAS = [
  { k: 0, premios: ["moedas10"], grad: ["#fff7cf", "#ffdf78"], claro: false, icone: "moeda", rotulo: "10×" },
  { k: 1, premios: ["item-raro"], grad: ["#66e8ab", "#18a866"], claro: true, icone: "estrela", rotulo: "Incomum" },
  { k: 2, premios: ["moedas30"], grad: ["#ffcb7a", "#f58524"], claro: true, icone: "moeda", rotulo: "30×" },
  { k: 3, premios: ["item-epico"], grad: ["#6ac4ff", "#1c7ce0"], claro: true, icone: "estrela", rotulo: "Raro" },
  { k: 4, premios: ["moedas500"], grad: ["#ff8d7a", "#e63e45"], claro: true, icone: "moeda", rotulo: "500×" },
  { k: 5, premios: ["item-muitoraro"], grad: ["#c58fff", "#7935db"], claro: true, icone: "estrela", rotulo: "Épico" },
  { k: 6, premios: ["diamantes5", "diamantes20", "diamantes100"], grad: ["#6ef0ff", "#0ea4c4"], claro: true, icone: "diamante", rotulo: "Diamantes" },
  { k: 7, premios: ["item-lendario"], grad: ["#fff3a3", "#f2a207"], claro: false, icone: "coroa", rotulo: "Lendário" },
]

// prioridade para destacar o melhor prêmio em um pacote de 10 giros
const PESO_PREMIO = {
  "item-lendario": 100, diamantes100: 90, "item-muitoraro": 80,
  diamantes20: 70, moedas500: 60, "item-epico": 50,
  diamantes5: 40, "item-raro": 30, moedas30: 20, moedas10: 10,
}

const BASE = new URL("./", import.meta.url).href
const ARTE = (nome) => `${BASE}${nome}.webp?v=1`
const SVG_NS = "http://www.w3.org/2000/svg"

let wsAtual = null, estado = null, janela = null, tela = "giro", ultimo = null
let girando = false, espera = 0, animFrame = 0, timerRes = 0
let anguloAtual = 0, ultimoVezes = 1
let audioCtx = null

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
          if (janela && !girando && tela !== "resultado") montar()
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

// A Roleta abre ao tocar no dado vermelho da home Jogos (não tem ícone próprio).
function garantirAtalho() {
  document.querySelectorAll(".mh-roleta").forEach((n) => n.remove())
  document.querySelectorAll(".mh-dado").forEach((d) => {
    if (d.getAttribute("aria-label") !== "Roleta") {
      d.setAttribute("aria-label", "Roleta")
      d.title = "Roleta"
    }
  })
}
document.addEventListener("click", (ev) => {
  const d = ev.target instanceof Element ? ev.target.closest(".mh-dado") : null
  if (!d) return
  ev.preventDefault()
  ev.stopPropagation()
  abrir()
}, true)

// ---------- áudio sintético opcional (respeita chave de efeitos do app) ----------
function efeitosAtivos() {
  try { return localStorage.getItem("mesa-audio-global-efeitos") !== "0" } catch { return true }
}
function garantirAudio() {
  if (!efeitosAtivos()) return null
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return null
    if (!audioCtx) audioCtx = new Ctx()
    if (audioCtx.state === "suspended") audioCtx.resume().catch(() => {})
    return audioCtx
  } catch { return null }
}
function somPino(velocidade) {
  if (!efeitosAtivos() || !audioCtx || audioCtx.state !== "running") return
  try {
    const t = audioCtx.currentTime
    const osc = audioCtx.createOscillator()
    const g = audioCtx.createGain()
    const pitch = Math.min(1150, 580 + velocidade * 26)
    osc.type = "triangle"
    osc.frequency.setValueAtTime(pitch, t)
    osc.frequency.exponentialRampToValueAtTime(220, t + 0.032)
    g.gain.setValueAtTime(0.08, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.036)
    osc.connect(g).connect(audioCtx.destination)
    osc.start(t)
    osc.stop(t + 0.04)
  } catch { /* ignore */ }
}
function somVitoria(forte) {
  if (!efeitosAtivos() || !audioCtx || audioCtx.state !== "running") return
  try {
    const t = audioCtx.currentTime
    const notas = forte ? [523.25, 659.25, 783.99, 1046.5, 1318.5] : [523.25, 659.25, 783.99]
    notas.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator()
      const g = audioCtx.createGain()
      const ini = t + idx * 0.065
      osc.type = "sine"
      osc.frequency.setValueAtTime(freq, ini)
      g.gain.setValueAtTime(0.001, ini)
      g.gain.linearRampToValueAtTime(0.09, ini + 0.015)
      g.gain.exponentialRampToValueAtTime(0.001, ini + 0.28)
      osc.connect(g).connect(audioCtx.destination)
      osc.start(ini)
      osc.stop(ini + 0.3)
    })
  } catch { /* ignore */ }
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

function svgEl(tag, attrs, ...kids) {
  const n = document.createElementNS(SVG_NS, tag)
  if (attrs) for (const [k, v] of Object.entries(attrs)) {
    if (k === "text") n.textContent = v
    else if (v != null && v !== false) n.setAttribute(k, String(v))
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
const numero = (n) => Number(n || 0).toLocaleString("pt-BR")
function valorMoedas(n) { return el("span", { className: "bn-valor" }, moedaEl(), el("strong", { text: numero(n) })) }
function valorDiamantes(n) { return el("span", { className: "bn-valor" }, diamanteEl(), el("strong", { text: numero(n) })) }
function pct(n) { return `${n.toLocaleString("pt-BR", { minimumFractionDigits: Number.isInteger(n) ? 0 : 1, maximumFractionDigits: 2 })}%` }

const NOMES_ITENS = {
  avatar: {
    gatinha: "Gatinha", nubolimitado: "Lumi", nubocontrole: "Lumi Gamer", nuboexclusivo: "Lumi exclusivo",
    nuboconvite: "Lumi · Convite", nubopresente: "Lumi · Presente", nubo2d: "Lumi · Olá",
    bola: "Bola 8", domino: "Dominó", carta: "Carta", dado: "Dado", peao: "Peão", trofeu: "Troféu",
    coroa: "Coroa", dadocristal: "Dado de cristal", trofeudiamante: "Troféu de diamante",
    dragaolendario: "Gatinho lendário", coroanova: "Coroa dourada", cerebro: "Cérebro",
    olhodragao: "Olho de dragão", coracao: "Coração", gatinho: "Gatinho", leao: "Leão",
  },
  moldura: {
    ouro: "Ouro", louros: "Louros", asas: "Asas", asas2: "Asas reais", coroa: "Coroa",
    chamas: "Chamas", dragao: "Dragão", dragao2: "Dragão real", cristal: "Cristal de gelo",
    realeza: "Realeza", fenix: "Fênix", anjo: "Asas de luz",
  },
  faixa: {
    vermelha: "Vermelha", azul: "Azul", verde: "Verde", rosa: "Rosa", fogo: "Fogo",
    ouro: "Ouro", galaxia: "Galáxia", raios: "Raios", lendaria: "Aurora lendária",
  },
  tabuleiro: { mogno: "Mogno", marmore: "Mármore", safira: "Safira", rubi: "Rubi" },
  capacete: { viking: "Viking", samurai: "Samurai", bombeiro: "Bombeiro" },
  piloto: { macaco: "Macaco", raposa: "Raposa", urso: "Urso", tartaruga: "Tartaruga" },
}
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
function classeR(g) {
  if (g.raridade) return `r-${g.raridade}`
  if (String(g.premio).startsWith("diamantes")) return "r-diamante"
  return "r-moedas"
}
function selo(g) {
  if (g.raridade) return NOMES_RAR[g.raridade] || g.raridade
  if (g.premio === "moedas500") return "500×"
  if (g.premio === "moedas30") return "30×"
  if (String(g.premio).startsWith("diamantes")) return "Diamantes"
  return "10×"
}
function destaqueDe(giros) {
  let melhor = giros[giros.length - 1]
  let pMelhor = PESO_PREMIO[melhor?.premio] ?? 0
  for (const g of giros) {
    const p = PESO_PREMIO[g?.premio] ?? 0
    if (p > pMelhor) { melhor = g; pMelhor = p }
  }
  return melhor
}
function premioForte(g) {
  return g?.raridade === "muitoraro" || g?.raridade === "lendario" ||
    String(g?.premio) === "moedas500" || String(g?.premio).startsWith("diamantes")
}

// ---------- geometria da roda SVG ----------
function polar(cx, cy, r, degFromTop) {
  const rad = (degFromTop - 90) * Math.PI / 180
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]
}
function caminhoFatia(cx, cy, r, a0, a1) {
  const [x0, y0] = polar(cx, cy, r, a0)
  const [x1, y1] = polar(cx, cy, r, a1)
  return `M ${cx} ${cy} L ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`
}

function iconeFatiaSvg(tipo, claro) {
  if (tipo === "moeda" || tipo === "diamante") {
    return svgEl("image", {
      href: ARTE(tipo), x: -15, y: -15, width: 30, height: 30,
      preserveAspectRatio: "xMidYMid meet",
    })
  }
  if (tipo === "coroa") {
    return svgEl("g", {},
      svgEl("path", {
        d: "M-13 8 L-15 -6 L-6 1 L0 -10 L6 1 L15 -6 L13 8 Z",
        fill: "#fff9cc", stroke: "#8f4b00", "stroke-width": 1.8, "stroke-linejoin": "round",
      }),
      svgEl("rect", { x: -12, y: 8, width: 24, height: 4, rx: 2, fill: "#ffdf6b", stroke: "#8f4b00", "stroke-width": 1.4 }),
      svgEl("circle", { cx: 0, cy: -11, r: 2.2, fill: "#fff" }),
      svgEl("circle", { cx: -15, cy: -7, r: 1.8, fill: "#fff" }),
      svgEl("circle", { cx: 15, cy: -7, r: 1.8, fill: "#fff" }),
    )
  }
  // estrela facetada para Incomum, Raro, Épico
  return svgEl("path", {
    d: "M0 -13 L3.6 -4.5 L12.8 -3.8 L5.8 2.2 L8 11.2 L0 6.4 L-8 11.2 L-5.8 2.2 L-12.8 -3.8 L-3.6 -4.5 Z",
    fill: claro ? "#ffffff" : "#7c4700",
    stroke: claro ? "#122b4e44" : "#ffffff88",
    "stroke-width": 1.5, "stroke-linejoin": "round",
  })
}

function palcoEl(podeGirar) {
  const cx = 180, cy = 180, rRoda = 144, rAro = 172
  const defs = svgEl("defs", {},
    svgEl("linearGradient", { id: "roAroGrad", x1: "0%", y1: "0%", x2: "100%", y2: "100%" },
      svgEl("stop", { offset: "0%", "stop-color": "#fff5b8" }),
      svgEl("stop", { offset: "28%", "stop-color": "#ffcb3b" }),
      svgEl("stop", { offset: "55%", "stop-color": "#e58c08" }),
      svgEl("stop", { offset: "80%", "stop-color": "#ffd54f" }),
      svgEl("stop", { offset: "100%", "stop-color": "#c97100" }),
    ),
    svgEl("radialGradient", { id: "roBrilhoVidro", cx: "36%", cy: "24%", r: "65%" },
      svgEl("stop", { offset: "0%", "stop-color": "#ffffff", "stop-opacity": "0.34" }),
      svgEl("stop", { offset: "55%", "stop-color": "#ffffff", "stop-opacity": "0.06" }),
      svgEl("stop", { offset: "100%", "stop-color": "#10284a", "stop-opacity": "0.14" }),
    ),
    svgEl("radialGradient", { id: "roPinoGrad", cx: "32%", cy: "28%", r: "70%" },
      svgEl("stop", { offset: "0%", "stop-color": "#ffffff" }),
      svgEl("stop", { offset: "45%", "stop-color": "#ffe27a" }),
      svgEl("stop", { offset: "100%", "stop-color": "#b86300" }),
    ),
    ...FATIAS.map((f) =>
      svgEl("radialGradient", { id: `roFat${f.k}`, cx: "50%", cy: "50%", r: "68%" },
        svgEl("stop", { offset: "0%", "stop-color": f.grad[0] }),
        svgEl("stop", { offset: "100%", "stop-color": f.grad[1] }),
      )
    ),
  )

  // fatias + rótulos + ícones (posicionados radialmente, sem jamais cruzar a divisória)
  const grupoDisco = svgEl("g", { class: "ro-disco", style: `transform:rotate(${anguloAtual.toFixed(2)}deg)` })
  for (const f of FATIAS) {
    const a0 = f.k * 45 - 22.5
    const a1 = f.k * 45 + 22.5
    grupoDisco.append(
      svgEl("path", {
        d: caminhoFatia(cx, cy, rRoda, a0, a1),
        fill: `url(#roFat${f.k})`,
        stroke: "#ffffffdd",
        "stroke-width": 2.4,
        "stroke-linejoin": "round",
      }),
    )
    // grupo rotacionado para o eixo central da fatia k (apontando para fora, 12h)
    const gConteudo = svgEl("g", { transform: `translate(${cx} ${cy}) rotate(${f.k * 45})` })
    // rótulo na borda externa (onde a fatia é larga, sem jamais encostar nas divisórias)
    const txt = svgEl("text", {
      x: 0, y: -116,
      class: `ro-txt ${f.claro ? "ro-txt-claro" : "ro-txt-escuro"}${f.rotulo.length >= 7 ? " ro-txt-sm" : ""}`,
      text: f.rotulo,
    })
    // ícone na faixa intermediária logo abaixo do rótulo
    const gIcone = svgEl("g", { transform: "translate(0 -82) scale(0.9)" }, iconeFatiaSvg(f.icone, f.claro))
    gConteudo.append(txt, gIcone)
    grupoDisco.append(gConteudo)
  }

  // destaque da fatia vencedora (overlay no topo sob o ponteiro)
  const vencedora = svgEl("path", {
    class: "ro-vencedora",
    d: caminhoFatia(cx, cy, rRoda - 1, -22.5, 22.5),
    fill: "#ffffff",
  })

  // 8 pinos metálicos nas divisórias (giram junto com o disco!)
  for (let i = 0; i < 8; i++) {
    const [px, py] = polar(cx, cy, rRoda - 4, 22.5 + i * 45)
    grupoDisco.append(
      svgEl("circle", { cx: px.toFixed(1), cy: py.toFixed(1), r: 5.2, fill: "#7a3f0055" }),
      svgEl("circle", { cx: px.toFixed(1), cy: (py - 0.8).toFixed(1), r: 4.5, fill: "url(#roPinoGrad)", stroke: "#fff6cc", "stroke-width": 1 }),
    )
  }

  // 16 lâmpadas no aro externo (fixas)
  const grupoLuzes = svgEl("g", {})
  for (let i = 0; i < 16; i++) {
    const [lx, ly] = polar(cx, cy, 159, i * 22.5)
    grupoLuzes.append(
      svgEl("circle", { cx: lx.toFixed(1), cy: ly.toFixed(1), r: 6.2, fill: "#8f4b0055" }),
      svgEl("circle", {
        cx: lx.toFixed(1), cy: ly.toFixed(1), r: 4.6,
        class: `ro-luz${i % 2 ? " par" : ""}`,
        style: `--i:${i}`,
        fill: "#fff7c2",
      }),
    )
  }

  const svg = svgEl("svg", { class: "ro-svg", viewBox: "0 0 360 360", "aria-hidden": "true" },
    defs,
    // aro externo dourado + chanfro interno
    svgEl("circle", { cx, cy, r: rAro, fill: "url(#roAroGrad)", stroke: "#fff6cc", "stroke-width": 3 }),
    svgEl("circle", { cx, cy, r: rRoda + 5, fill: "#9e5300" }),
    svgEl("circle", { cx, cy, r: rRoda + 1.5, fill: "#ffe27a" }),
    grupoLuzes,
    grupoDisco,
    vencedora,
    // brilho de vidro fixo
    svgEl("circle", { cx, cy, r: rRoda, fill: "url(#roBrilhoVidro)", "pointer-events": "none" }),
  )

  // ponteiro 3D em SVG
  const ponteiro = el("div", { className: "ro-ponteiro-wrap", "aria-hidden": "true" },
    svgEl("svg", { viewBox: "0 0 42 52" },
      svgEl("defs", {},
        svgEl("linearGradient", { id: "roPtrGrad", x1: "0%", y1: "0%", x2: "0%", y2: "100%" },
          svgEl("stop", { offset: "0%", "stop-color": "#ff6b81" }),
          svgEl("stop", { offset: "55%", "stop-color": "#e62448" }),
          svgEl("stop", { offset: "100%", "stop-color": "#a80d2b" }),
        ),
      ),
      svgEl("path", {
        d: "M21 50 L4 16 C2 10 7 3 14 3 L28 3 C35 3 40 10 38 16 Z",
        fill: "url(#roPtrGrad)", stroke: "#fff", "stroke-width": 2.4, "stroke-linejoin": "round",
      }),
      svgEl("circle", { cx: 21, cy: 14, r: 6.2, fill: "#fff2a8", stroke: "#b36200", "stroke-width": 1.6 }),
      svgEl("circle", { cx: 19.5, cy: 12.5, r: 2, fill: "#fff" }),
    ),
  )

  const centroBtn = el("button", {
    className: "ro-centro-btn", type: "button",
    "aria-label": `Girar roleta por ${CUSTO_GIRO} diamantes`,
    title: "Girar 1×",
    disabled: !podeGirar,
  }, el("img", { src: ARTE("diamante"), alt: "", draggable: "false" }))
  centroBtn.onclick = () => {
    const btn1 = janela?.querySelector(".ro-acoes .bn-acao.primaria")
    if (btn1 && !btn1.disabled) pedir(1, btn1)
  }

  return el("div", { className: "ro-palco" },
    svg,
    centroBtn,
    ponteiro,
    el("div", { className: "ro-faiscas", "aria-hidden": "true" }),
  )
}

function pararAnimacao() {
  if (animFrame) { cancelAnimationFrame(animFrame); animFrame = 0 }
  if (timerRes) { clearTimeout(timerRes); timerRes = 0 }
}

function abrir() {
  janela?.close()
  const j = el("dialog", { className: "bn-janela bn-roleta" })
  janela = j
  tela = "giro"
  j.addEventListener("close", () => {
    pararAnimacao()
    clearTimeout(espera)
    girando = false
    j.remove()
    if (janela === j) janela = null
  })
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
  return el("div", { className: "ro-topo" },
    el("h2", { className: "ro-titulo" },
      el("span", { className: "ro-titulo-estrela", "aria-hidden": "true", text: "✦" }),
      "Roleta da Mesa",
      el("span", { className: "ro-titulo-estrela", "aria-hidden": "true", text: "✦" }),
    ),
  )
}

function abas() {
  const mk = (id, texto, badge) => {
    const b = el("button", {
      className: "ro-aba", type: "button", role: "tab",
      "aria-selected": tela === id ? "true" : "false",
    }, texto, badge ? el("span", { className: "ro-aba-badge", "aria-hidden": "true", text: badge }) : null)
    b.onclick = () => { if (!girando && tela !== id) { tela = id; montar() } }
    return b
  }
  return el("div", { className: "ro-abas", role: "tablist", "aria-label": "Roleta" },
    mk("giro", "Girar"),
    mk("chances", "Chances", "%"),
  )
}

function garantia(tipo, titulo, texto, valor, max) {
  return el("div", { className: `ro-garantia g-${tipo}` },
    el("div", { className: "ro-garantia-topo" },
      el("span", { className: "ro-chip", text: titulo }),
      el("span", { className: "ro-garantia-cont", text: `${valor ?? 0}/${max}` }),
    ),
    el("strong", { text: texto }),
    el("progress", { value: String(valor ?? 0), max: String(max), "aria-label": `Progresso para ${titulo.toLowerCase()} garantido` }),
  )
}

function pintarGiro(c) {
  const v = visao()
  const diamantes = estado?.diamantes ?? 0
  const moedas = estado?.moedas ?? 0
  const podeUm = !girando && !!estado && diamantes >= CUSTO_GIRO
  const podeDez = !girando && !!estado && diamantes >= CUSTO_DEZ

  c.append(
    el("div", { className: "ro-saldo" }, valorMoedas(moedas), valorDiamantes(diamantes)),
    palcoEl(podeUm),
  )

  const um = el("button", { className: "bn-acao primaria", type: "button", disabled: !podeUm })
  um.append("Girar · ", diamanteEl(), ` ${CUSTO_GIRO}`)
  um.onclick = () => pedir(1, um)

  const dez = el("button", { className: "bn-acao", type: "button", disabled: !podeDez })
  dez.append("10× · ", diamanteEl(), ` ${CUSTO_DEZ}`, el("span", { className: "ro-desconto", text: "-10%" }))
  dez.onclick = () => pedir(10, dez)

  const status = el("p", { className: "bn-status", role: "status", "aria-live": "polite" })
  if (!estado) status.textContent = "Entre na sua conta para girar a roleta."
  else if (diamantes < CUSTO_GIRO) status.textContent = `Você precisa de ${CUSTO_GIRO} diamantes para girar.`

  const pity = el("div", { className: "ro-pity" },
    garantia("epico", "Épico",
      v.garantiaEpicoEm === 0 ? "Garantido no próximo giro!" : `Garantido em ${v.garantiaEpicoEm} giro${v.garantiaEpicoEm === 1 ? "" : "s"}`,
      v.semEpico, PITY_EPICO),
    garantia("lenda", "Lendário",
      v.garantiaLendarioEm === 0 ? "Garantido no próximo giro!" : `Garantido em ${v.garantiaLendarioEm} giro${v.garantiaLendarioEm === 1 ? "" : "s"}`,
      v.semLendario, PITY_LENDARIO),
  )

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
  const classe = {
    "item-raro": "c-incomum", "item-epico": "c-raro", "item-muitoraro": "c-epico",
    "item-lendario": "c-lendario", diamantes5: "c-diamante", diamantes20: "c-diamante", diamantes100: "c-diamante",
  }
  const maior = Math.max(...Object.values(CHANCES_BASE))
  const lista = el("ol")
  for (const [id, nome] of linhas) {
    const base = CHANCES_BASE[id], atual = v.chances[id]
    const li = el("li", {
      className: classe[id] || "",
      style: `--p:${Math.max(2, (base / maior) * 100).toFixed(1)}%`,
    }, el("span", { text: nome }), el("span", { className: "ro-pct", text: pct(base) }))
    if (Math.abs((atual ?? base) - base) >= 0.05) {
      li.append(el("span", { className: "ro-atual", text: `Agora, com o seu pity: ${pct(atual)}` }))
    }
    lista.append(li)
  }
  c.append(
    el("div", { className: "ro-chances" },
      el("p", { className: "ro-sub", text: "Chance de cada giro. As cores seguem a raridade do prêmio." }),
      lista,
    ),
    el("p", { className: "bn-nota", text: "Um item épico é garantido a cada 40 giros sem épico; um lendário, a cada 150 giros sem lendário. Se você já tiver o item, recebe moedas no lugar. As fatias da roda são só ilustração: o tamanho delas não mostra a chance." }),
  )
}

const CONFETE = ["#ffcb3b", "#ff6b6b", "#4aa3ff", "#52d394", "#b275ff", "#ff8fc1", "#3fd2ea"]
function confete(qtd) {
  const caixa = el("div", { className: "ro-confete", "aria-hidden": "true" })
  const formas = ["", "redondo", "fita"]
  for (let i = 0; i < qtd; i++) {
    const ang = (i / qtd) * Math.PI * 2 + (Math.random() - 0.5) * 0.35
    const dist = 85 + Math.random() * 115
    caixa.append(el("i", {
      className: formas[i % formas.length],
      style: `--c:${CONFETE[i % CONFETE.length]};--x:${Math.round(Math.cos(ang) * dist)}px;--y:${Math.round(Math.sin(ang) * dist - 24)}px;--r:${Math.round(Math.random() * 640 - 320)}deg;--a:${(Math.random() * 0.18).toFixed(2)}s`,
    }))
  }
  return caixa
}

function soltarFaiscas(palco) {
  const caixa = palco?.querySelector(".ro-faiscas")
  if (!caixa) return
  caixa.replaceChildren()
  for (let i = 0; i < 12; i++) {
    const ang = (i / 12) * Math.PI * 2 + Math.random() * 0.3
    const dist = 34 + Math.random() * 34
    caixa.append(el("i", {
      style: `--c:${CONFETE[i % CONFETE.length]};--x:${Math.round(Math.cos(ang) * dist)}px;--y:${Math.round(Math.sin(ang) * dist)}px`,
    }))
  }
}

function medalha(g) {
  const dentro = g.item
    ? el("span", { className: "ro-estrela", "aria-hidden": "true", text: g.raridade === "lendario" ? "♛" : "★" })
    : el("img", { src: ARTE(String(g.premio).startsWith("diamantes") ? "diamante" : "moeda"), alt: "", draggable: "false" })
  return el("div", { className: `ro-vitrine ${classeR(g)}`, "aria-hidden": "true" },
    el("div", { className: "ro-medalha" }, dentro),
  )
}

function pintarResultado(c, giros) {
  const g = giros.length > 1 ? destaqueDe(giros) : giros[0]
  const bloco = el("div", { className: "ro-resultado", role: "status" },
    medalha(g),
    el("span", { className: `ro-selo ${classeR(g)}`, text: giros.length > 1 ? `Destaque · ${selo(g)}` : selo(g) }),
    el("p", { className: `ro-premio ${classeR(g)}`, text: rotulo(g) }),
  )
  if (g.repetido) bloco.append(el("p", { className: "ro-sub", text: "Você já tinha este item. Ganhou moedas no lugar." }))
  if (g.moedas && g.item) bloco.append(valorMoedas(g.moedas))
  if (giros.length > 1) {
    const lista = el("ul", { className: "ro-lista" })
    giros.forEach((x, idx) => {
      lista.append(el("li", { style: `--idx:${idx}` },
        el("span", { text: rotulo(x) }),
        el("span", { className: `ro-selo ${classeR(x)}`, text: selo(x) }),
      ))
    })
    bloco.append(el("div", { className: "ro-lista-wrap" }, lista))
  }
  if (premioForte(g) || giros.length > 1) bloco.append(confete(premioForte(g) ? 32 : 18))

  const diamantes = estado?.diamantes ?? 0
  const custoNovo = ultimoVezes === 10 ? CUSTO_DEZ : CUSTO_GIRO
  const podeRepetir = !!estado && diamantes >= custoNovo

  const voltar = el("button", { className: "bn-acao", type: "button", text: "Voltar" })
  voltar.onclick = () => { tela = "giro"; ultimo = null; montar() }

  const acoes = el("div", { className: `ro-res-acoes${podeRepetir ? "" : " um-so"}` })
  if (podeRepetir) {
    const denovo = el("button", { className: "bn-acao primaria", type: "button" })
    denovo.append(ultimoVezes === 10 ? "10× de novo · " : "Girar · ", diamanteEl(), ` ${custoNovo}`)
    denovo.onclick = () => {
      tela = "giro"; ultimo = null; montar()
      const btn = janela?.querySelector(ultimoVezes === 10 ? ".ro-acoes .bn-acao:nth-child(2)" : ".ro-acoes .bn-acao.primaria")
      if (btn && !btn.disabled) pedir(ultimoVezes, btn)
    }
    acoes.append(denovo, voltar)
  } else {
    voltar.classList.add("primaria")
    voltar.textContent = "Legal!"
    acoes.append(voltar)
  }
  c.append(cabecalho(), bloco, acoes)
}

// ---------- animação física (impulso + desaceleração + batida nos pinos) ----------
function anguloAlvo(premio) {
  const f = FATIAS.find((x) => x.premios.includes(premio))
  const k = f ? f.k : 0
  // folga segura dentro do meio da fatia (±13° em fatia de ±22.5°)
  return ((360 - 45 * k) % 360) + (Math.random() * 26 - 13)
}

function animarImpulso(palco) {
  pararAnimacao()
  const disco = palco?.querySelector(".ro-disco")
  const ptr = palco?.querySelector(".ro-ponteiro-wrap")
  if (!disco) return
  const inicio = performance.now()
  const base = anguloAtual
  function passo(agora) {
    const t = Math.min(1, (agora - inicio) / 280)
    const ease = 1 - Math.pow(1 - t, 3)
    anguloAtual = base - 16 * ease
    disco.style.transform = `rotate(${anguloAtual.toFixed(2)}deg)`
    if (ptr) ptr.style.transform = `rotate(${(6 * Math.sin(t * Math.PI)).toFixed(2)}deg)`
    if (t < 1 && girando) animFrame = requestAnimationFrame(passo)
  }
  animFrame = requestAnimationFrame(passo)
}

function animarGiro(palco, premio, forte, aoTerminar) {
  pararAnimacao()
  const disco = palco?.querySelector(".ro-disco")
  const ptr = palco?.querySelector(".ro-ponteiro-wrap")
  if (!disco) { aoTerminar(); return }

  const voltas = 6 + Math.floor(Math.random() * 2) // 6 ou 7 voltas completas
  const inicioAng = anguloAtual
  const modAtual = ((inicioAng % 360) + 360) % 360
  const alvoMod = ((anguloAlvo(premio) % 360) + 360) % 360
  const delta = voltas * 360 + ((alvoMod - modAtual + 360) % 360)
  const duracao = 3600

  let inicio = 0
  let ultimoPino = Math.floor((inicioAng + 22.5) / 45)
  let ptrAng = 0
  let ptrVel = 0
  let angAnt = inicioAng

  function easeOutQuinticBounce(t) {
    // aceleração curtinha no início + desaceleração suave longa com suspense no final
    return 1 - Math.pow(1 - t, 4.35)
  }

  function passo(agora) {
    if (!inicio) inicio = agora
    const elapsed = agora - inicio
    const t = Math.min(1, elapsed / duracao)
    const prog = easeOutQuinticBounce(t)
    const ang = inicioAng + delta * prog
    const vel = Math.abs(ang - angAnt)
    angAnt = ang
    anguloAtual = ang
    disco.style.transform = `rotate(${ang.toFixed(2)}deg)`

    // detecta passagem de pino pelo ponteiro no topo
    const pino = Math.floor((ang + 22.5) / 45)
    if (pino !== ultimoPino) {
      ultimoPino = pino
      ptrVel -= Math.min(24, 7 + vel * 0.95)
      somPino(vel)
    }

    // mola amortecida do ponteiro
    const kMola = 0.24
    const amort = 0.74
    ptrVel = (ptrVel - ptrAng * kMola) * amort
    ptrAng += ptrVel
    ptrAng = Math.max(-34, Math.min(14, ptrAng))
    if (ptr) ptr.style.transform = `rotate(${ptrAng.toFixed(2)}deg)`

    if (t < 1) {
      animFrame = requestAnimationFrame(passo)
    } else {
      // assenta ponteiro no centro + flash de vitória na fatia
      if (ptr) ptr.style.transform = "rotate(0deg)"
      palco.classList.remove("girando")
      palco.classList.add("ganhou")
      soltarFaiscas(palco)
      somVitoria(forte)
      timerRes = setTimeout(aoTerminar, 760)
    }
  }
  animFrame = requestAnimationFrame(passo)
}

function pedir(vezes, botao) {
  if (girando || !estado || !wsAtual || wsAtual.readyState !== 1) {
    const status = janela?.querySelector(".bn-status")
    if (status) status.textContent = "Não foi possível girar. Tente de novo."
    return
  }
  garantirAudio()
  girando = true
  ultimoVezes = vezes
  janela?.querySelectorAll(".ro-acoes .bn-acao, .ro-centro-btn").forEach((b) => { b.disabled = true })
  const palco = janela?.querySelector(".ro-palco")
  palco?.classList.remove("ganhou", "girando")
  palco?.classList.add("esperando")
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) animarImpulso(palco)
  const status = janela?.querySelector(".bn-status")
  if (status) status.textContent = vezes > 1 ? "Girando 10×…" : "Girando…"
  wsAtual.send(JSON.stringify({ t: "girar-roleta", vezes }))
  clearTimeout(espera)
  espera = setTimeout(() => {
    if (!girando) return
    pararAnimacao()
    girando = false
    if (status) status.textContent = "Não foi possível girar. Tente de novo."
    palco?.classList.remove("esperando", "girando")
    if (janela) montar()
  }, 10000)
}

function resposta(m) {
  clearTimeout(espera)
  if (!m.ok || !m.giros?.length) {
    pararAnimacao()
    girando = false
    const status = janela?.querySelector(".bn-status")
    if (status) status.textContent = m.motivo === "diamantes" ? `Você precisa de ${CUSTO_GIRO} diamantes para girar.` : "Não foi possível girar. Tente de novo."
    janela?.querySelector(".ro-palco")?.classList.remove("esperando", "girando")
    janela?.querySelectorAll(".ro-acoes .bn-acao, .ro-centro-btn").forEach((b) => { b.disabled = false })
    return
  }
  ultimo = { giros: m.giros, custo: m.custo ?? CUSTO_GIRO }
  const palco = janela?.querySelector(".ro-palco")
  const alvo = m.giros.length > 1 ? destaqueDe(m.giros) : m.giros[0]
  const ir = () => { girando = false; tela = "resultado"; montar() }
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !janela || !palco) {
    ir()
    return
  }
  palco.classList.remove("esperando")
  palco.classList.add("girando")
  animarGiro(palco, alvo.premio, premioForte(alvo), ir)
}

patchWs()
new MutationObserver(garantirAtalho).observe(document.documentElement, { childList: true, subtree: true })
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", garantirAtalho)
else garantirAtalho()
