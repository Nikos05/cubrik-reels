// Generates index.html (the 9:16 reel) and cover.html (1080x1080 cover)
// from the voiceover files in assets/vo. Swap the VO files, rerun `node build.mjs`.
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const VO_LINES = [
  "Claude just killed day traders.",
  "You can now connect cubrik to Claude.",
  "Link your broker in one message. Binance, MetaTrader, Hyperliquid.",
  "Paste any YouTube strategy video.",
  "cubrik watches it, pulls out every rule, and builds your agent.",
  "Or build it from your own Claude skills.",
  "It backtests on TradingView data before risking a single dollar.",
  "Then your AI agent trades it twenty four seven. Even while you sleep.",
  "And nothing goes live without your OK.",
  "Comment CLAUDE, and I'll send you the setup!",
];


// ---------- language ----------
const LANG = process.env.REEL_LANG === "fr" ? "fr" : "en";
const FR_TEXT = {
  // typed / generated strings
  "connect my broker": "connecte mon broker",
  "XAU/USD · 1 hour": "XAU/USD · 1 heure",
  "RSI < 30 + bullish engulfing": "RSI < 30 + englobante haussière",
  "Take profit 2R · stop below low": "TP 2R · stop sous le plus bas",
  "1% per trade": "1 % par trade",
  // labels and hero
  "CLAUDE JUST KILLED": "CLAUDE VIENT DE TUER", "DAY TRADERS": "LES DAY TRADERS",
  "CONNECT CUBRIK": "CONNECTE CUBRIK", "TO CLAUDE": "À CLAUDE",
  "LINK YOUR BROKER": "CONNECTE TON BROKER", "IN ONE MESSAGE": "EN UN MESSAGE",
  "PASTE ANY": "COLLE N'IMPORTE QUELLE", "YOUTUBE STRATEGY": "STRATÉGIE YOUTUBE",
  "CUBRIK PULLS": "CUBRIK EXTRAIT", "EVERY RULE": "CHAQUE RÈGLE",
  "OR USE": "OU UTILISE", "YOUR CLAUDE SKILLS": "TES SKILLS CLAUDE",
  "BACKTESTED ON": "BACKTESTÉ SUR", "TRADINGVIEW DATA": "DONNÉES TRADINGVIEW",
  "TRADES 24/7": "TRADE 24H/24", "WHILE YOU SLEEP": "MÊME QUAND TU DORS",
  "NOTHING GOES LIVE": "RIEN NE PASSE EN LIVE", "WITHOUT YOUR OK": "SANS TON ACCORD",
  // UI
  "CONNECTORS": "CONNECTEURS", "✓ Connected": "✓ Connecté",
  "cubrik connected": "cubrik connecté", "Pick a broker to link:": "Choisis ton broker :",
  "🔒 Keys checked · trading on · withdrawals off": "🔒 Clés vérifiées · trading activé · retraits bloqués",
  "My 1H Gold Strategy That Actually Works": "Ma stratégie Gold 1H qui marche vraiment",
  "@MaxTradesFX · 1.2M views": "@MaxTradesFX · 1,2 M de vues",
  "👍 48K": "👍 48 k", "↗ Share": "↗ Partager", "🔗 Copy link": "🔗 Copier le lien",
  "✓ Copied": "✓ Copié", "✓ Link copied": "✓ Lien copié",
  "Reply to Claude…": "Répondre à Claude…", "cubrik is watching the video…": "cubrik regarde la vidéo…",
  "✓ Video analyzed · 14:32": "✓ Vidéo analysée · 14:32", "✓ Transcript": "✓ Transcription",
  "✓ Chart patterns": "✓ Patterns", "✓ Rules": "✓ Règles",
  "MARKET": "MARCHÉ", "ENTRY": "ENTRÉE", "EXIT": "SORTIE", "RISK": "RISQUE",
  "Agent created": "Agent créé", "GOLD RSI SCALPER · READY TO BACKTEST": "GOLD RSI SCALPER · PRÊT POUR LE BACKTEST",
  "Open": "Ouvrir", "Claude Skills": "Skills Claude", "News filter": "Filtre news",
  "Session filter": "Filtre de session", "Your own": "Les tiens", "FROM GITHUB": "DEPUIS GITHUB",
  "5 YEARS · FEES INCLUDED": "5 ANS · FRAIS INCLUS", "DATA VIA": "DONNÉES VIA",
  "WIN RATE": "RÉUSSITE", "NET PROFIT": "PROFIT NET", "61%": "61 %", "1.8": "1,8", "+38.4%": "+38,4 %",
  "RUNS 24/7 ON METATRADER 5": "TOURNE 24H/24 SUR METATRADER 5", "you're asleep": "tu dors",
  "XAU/USD · GOLD": "XAU/USD · OR", "+$1,385.38": "+1 385,38 $", "now": "maintenant",
  "💰 Take profit hit: +$1,385.38": "💰 Take profit atteint : +1 385,38 $",
  "Gold RSI Scalper closed XAU/USD (+2R)": "Gold RSI Scalper a clôturé XAU/USD (+2R)",
  "Launch on MetaTrader?": "Lancer sur MetaTrader ?", "Real money · 1% risk per trade": "Argent réel · 1 % de risque par trade",
  "Stop loss always on": "Stop loss toujours actif", "Cancel": "Annuler", "Confirm": "Confirmer", "Live ✓": "En live ✓",
  "Comment": "Commente", "“CLAUDE”": "« CLAUDE »", "&amp; I'll send you the setup": "&amp; je t'envoie le setup",
  "CUBRIK WORKS WITH CLAUDE": "CUBRIK FONCTIONNE AVEC CLAUDE",
};
const tr = (s) => (LANG === "fr" && FR_TEXT[s] !== undefined ? FR_TEXT[s] : s);
// swap every whole visible text node that has a translation
const localize = (html) => {
  if (LANG !== "fr") return html;
  return html.replace(/>([^<>]+)</g, (m, t) => {
    const k = t.trim();
    return FR_TEXT[k] !== undefined ? ">" + t.replace(k, FR_TEXT[k]) + "<" : m;
  });
};

// ---------- timing ----------
const VO_OFFSET = 0.06; // VO starts this long after each cut
const GAP = 0.1; // silence after each line before the next cut
const MIN = [2.2, 1.7, 1.7, 1.8, 3.6, 1.9, 2.4, 3.2, 2.3, 3.4]; // visual minimums
const HOLD_END = 1.5;

const probe = (f) =>
  parseFloat(
    execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString(),
  );
const voFile = (i) => `assets/vo${LANG === "fr" ? "-fr" : ""}/vo${String(i + 1).padStart(2, "0")}.wav`;
const VO = VO_LINES.map((_, i) => probe(voFile(i)));
const D = VO.map((v, i) => {
  const need = i === 9 ? VO_OFFSET + v + HOLD_END + 0.3 : VO_OFFSET + v + GAP;
  return +Math.max(MIN[i], need).toFixed(3);
});
const S = [];
D.reduce((acc, d, i) => ((S[i] = +acc.toFixed(3)), acc + d), 0);
const TOTAL = +(S[9] + D[9]).toFixed(3);

// ---------- event times (scene-local seconds) shared by animation + sfx ----------
const EV = {
  lab: [0.06, 0.3],
  s1off: [0.5, 0.78, 1.06],
  s2badge: 1.0,
  s3checks: [2.06, 2.78, 3.58],
  s4copy: 0.95,
  s5paste: 0.25, s5send: 0.52, s5steps: [0.95, 1.1, 1.25], s5rules: 1.45, s5loop: 2.3, s5agent: 2.78,
  s6ring: 1.0,
  s7stats: [1.25, 1.4, 1.55],
  s8notif: 2.6,
  s9tap: 1.05,
};
if (LANG === "fr") Object.assign(EV, { s3checks: [2.55, 3.35, 4.3], s5agent: 2.62, s8notif: 2.4 });
// transition into scene k (k = 1..9), applied at the cut S[k]
const TRANS = [null, "zoom", "whipL", "stripes", "whipU", "zoom", "whipL", "stripes", "whipU", "zoom"];

// ---------- helpers ----------
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const chars = (s) =>
  [...tr(s)].map((c) => `<span class="ch">${c === " " ? "&nbsp;" : esc(c)}</span>`).join("");

function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

// pixel mascot 14x15
const PAL = { T: "#C4B5FD", L: "#7C3AED", R: "#A855F7", W: "#FFFFFF", K: "#1E1033", D: "#3B1580" };
const BODY = [
  "......TT......",
  "....TTTTTT....",
  "..TTTTTTTTTT..",
  "TTTTTTTTTTTTTT",
  "LLTTTTTTTTTTRR",
  "LLLLTTTTTTRRRR",
  "LLLLLLTTRRRRRR",
  "LLLLLLLRRRRRRR",
  "LLLLLWLRWRRRRR",
  "LLLLLKLRKRRRRR",
  "LLLLLLLRRRRRRR",
  "..LLLLLRRRRR..",
  "....LLLRRR....",
];
const LEGS_A = ["....D....D....", "...DD....DD..."];
const LEGS_B = [".....D..D.....", ".....DD.DD...."];
function rects(rows, y0) {
  let out = "";
  rows.forEach((row, y) =>
    [...row].forEach((c, x) => {
      if (c !== ".") out += `<rect x="${x}" y="${y + y0}" width="1.02" height="1.02" fill="${PAL[c]}"/>`;
    }),
  );
  return out;
}
const MASCOT_SVG = `<svg viewBox="0 0 14 15" shape-rendering="crispEdges">${rects(BODY, 0)}<g class="mA">${rects(LEGS_A, 13)}</g><g class="mB" style="opacity:0">${rects(LEGS_B, 13)}</g></svg>`;
const mascot = (cls = "") =>
  `<div class="mascot ${cls}"><div class="mBody">${MASCOT_SVG}</div><div class="mShadow"></div></div>`;

const CUBE = `<svg viewBox="0 0 100 104"><polygon points="50,6 92,30 50,54 8,30" fill="#C4B5FD"/><polygon points="8,30 50,54 50,100 8,76" fill="#7C3AED"/><polygon points="50,54 92,30 92,76 50,100" fill="#A855F7"/></svg>`;
const BUBBLE = `<svg viewBox="0 0 100 100"><path d="M18 22h64a10 10 0 0 1 10 10v34a10 10 0 0 1-10 10H46l-18 14v-14H18A10 10 0 0 1 8 66V32a10 10 0 0 1 10-10z" fill="none" stroke="#7A5C43" stroke-width="6" stroke-linejoin="round"/><circle cx="34" cy="49" r="5" fill="#7A5C43"/><circle cx="50" cy="49" r="5" fill="#7A5C43"/><circle cx="66" cy="49" r="5" fill="#7A5C43"/></svg>`;
const LOGO = (name, ext = "svg", cls = "") => `<img class="lg ${cls}" src="assets/logos/${name}.${ext}" alt="">`;
const claudeTile = (cls = "") =>
  `<div class="tile tClaude ${cls}"><div class="tIcon">${LOGO("claude")}</div><div class="tName serif">Claude</div></div>`;
const cubrikTile = (cls = "") =>
  `<div class="tile tCubrik ${cls}"><div class="tIcon">${CUBE}</div><div class="tName">cubrik</div></div>`;

const labels = (a, b) =>
  `<div class="labels"><div class="lab lab1">${tr(a)}</div><div class="lab lab2 key">${tr(b)}</div></div>`;

// falling chart for scene 1 monitors
function fallingPath(seed, w, h) {
  const r = rng(seed);
  let y = h * 0.18;
  const pts = [];
  for (let i = 0; i <= 40; i++) {
    const x = (i / 40) * w;
    y += (r() - 0.32) * h * 0.06 + (i > 22 ? h * 0.018 : 0);
    y = Math.min(h * 0.92, Math.max(h * 0.1, y));
    pts.push([x, y]);
  }
  const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  return { d, area: d + ` L${w} ${h} L0 ${h} Z` };
}
function monitor(i, w, h, pair, pct) {
  const p = fallingPath(11 + i * 7, w, h - 60);
  return `<div class="mon mon${i}">
    <div class="bezel"><div class="scr" style="width:${w}px;height:${h}px">
      <div class="scrIn">
        <div class="scrHead"><span>${pair}</span><span class="neg">${pct}</span></div>
        <svg class="scrChart" viewBox="0 0 ${w} ${h - 60}" width="${w}" height="${h - 60}">
          <defs><linearGradient id="rg${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E11D48" stop-opacity=".45"/><stop offset="1" stop-color="#E11D48" stop-opacity="0"/></linearGradient></defs>
          ${[1, 2, 3].map((k) => `<line x1="0" x2="${w}" y1="${((h - 60) * k) / 4}" y2="${((h - 60) * k) / 4}" stroke="rgba(255,255,255,.07)"/>`).join("")}
          <path class="redArea" d="${p.area}" fill="url(#rg${i})"/>
          <path class="redLine" d="${p.d}" fill="none" stroke="#FB3B5C" stroke-width="4" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="crt"></div>
    </div></div>
    <div class="neck"></div><div class="foot"></div>
  </div>`;
}

// equity curve for scene 7
function equity() {
  const r = rng(42);
  const w = 800, h = 340;
  let v = 0;
  const pts = [];
  for (let i = 0; i <= 90; i++) {
    let drift = 0.9;
    if (i > 28 && i < 36) drift = -1.6;
    if (i > 60 && i < 66) drift = -1.2;
    v += drift + (r() - 0.5) * 3.2;
    pts.push(v);
  }
  const min = Math.min(...pts), max = Math.max(...pts);
  const xy = pts.map((p, i) => [(i / 90) * w, h - 20 - ((p - min) / (max - min)) * (h - 50)]);
  const d = xy.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  return { d, area: d + ` L${w} ${h} L0 ${h} Z`, w, h };
}
const EQ = equity();

// rising gold chart for youtube thumbnail
function goldPath() {
  const r = rng(7);
  const w = 760, h = 220;
  let y = h * 0.85;
  const pts = [];
  for (let i = 0; i <= 30; i++) {
    y -= (r() - 0.25) * 14;
    y = Math.max(16, Math.min(h - 10, y));
    pts.push([(i / 30) * w, y]);
  }
  return pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
}

const SKILLS = [
  ["IC", "ICT Concepts", "#FDE68A", "PRICE ACTION"],
  ["WY", "Wyckoff", "#BFDBFE", "MARKET CYCLE"],
  ["VP", "Volume Profile", "#C7F9CC", "VOLUME"],
  ["NF", "News filter", "#FECACA", "RISK"],
  ["TS", "Trailing stop", "#DDD6FE", "EXIT"],
  ["SF", "Session filter", "#FED7AA", "TIMING"],
  ["SM", "Smart Money", "#A5F3FC", "STRUCTURE"],
];

const CLOCK = Array.from({ length: 22 }, (_, k) => `02:${String(14 + k).padStart(2, "0")}`);

// ---------- scenes ----------
const scenes = [];

scenes[0] = `
  <div class="s1wrap">
    <div class="mons">
      ${monitor(1, 215, 165, "ETH/USD", "−9.8%")}
      ${monitor(2, 400, 275, "BTC/USD", "−12.4%")}
      ${monitor(3, 215, 165, "NAS100", "−7.1%")}
    </div>
    <div class="desk"><div class="deskTop"></div></div>
    ${mascot("m1")}
  </div>
  <div class="redFlash"></div>
  <div class="hero"><div class="hl hl1">CLAUDE JUST KILLED</div><div class="hl hl2">DAY TRADERS<div class="strike"></div></div></div>`;

scenes[1] = `
  <div class="stage"><div class="card win s2card">
    <div class="titlebar"><i></i><i></i><i></i><span class="mono">CONNECTORS</span></div>
    <div class="s2body">
      ${claudeTile("s2a")}
      <svg class="link" viewBox="0 0 300 160"><path class="linkPath" d="M10 120 C 80 10, 220 10, 290 120" fill="none" stroke="#7C3AED" stroke-width="7" stroke-linecap="round" stroke-dasharray="1 0"/><circle class="ld1" cx="10" cy="120" r="10" fill="#7C3AED"/><circle class="ld2" cx="290" cy="120" r="10" fill="#7C3AED"/></svg>
      ${cubrikTile("s2b")}
    </div>
    <div class="s2foot"><div class="badge ok s2badge">✓ Connected</div></div>
    ${mascot("onCard")}
  </div></div>
  ${labels("CONNECT CUBRIK", "TO CLAUDE")}`;

const BROKERS = [
  [LOGO("binance"), "Binance", "#fff"],
  [LOGO("mt5", "png"), "MetaTrader 5", "#fff"],
  [LOGO("hyperliquid", "png"), "Hyperliquid", "#0A2A26"],
];
scenes[2] = `
  <div class="stage"><div class="card s3card">
    <div class="chatHead">${LOGO("claude")}<span class="chName serif">Claude</span><span class="conn"><i>${CUBE}</i>cubrik connected</span></div>
    <div class="bubbleRow"><div class="uBubble">${chars("connect my broker")}<span class="cursor"></span></div></div>
    <div class="reply">
      <div class="avatar">${CUBE}</div>
      <div class="replyCard">
        <div class="replyTitle">Pick a broker to link:</div>
        ${BROKERS.map(
          ([g, n, bg], k) => `<div class="brow br${k}">
            <div class="blogo img" style="background:${bg}">${g}</div>
            <div class="bname">${n}</div>
            <div class="chk chk${k}">✓</div></div>`,
        ).join("")}
      </div>
    </div>
    <div class="mono small s3foot">🔒 Keys checked · trading on · withdrawals off</div>
    ${mascot("onCard")}
  </div></div>
  ${labels("LINK YOUR BROKER", "IN ONE MESSAGE")}`;

scenes[3] = `
  <div class="stage col s4">
    <div class="card vcard">
      <div class="thumb">
        <img class="thumbImg" src="assets/img/thumb.jpg" alt="">
        <div class="thumbShade"></div>
        <div class="thumbTitle"><div><span class="gold">GOLD</span> 1H</div><div>STRATEGY</div></div>
        <div class="ytPlay">${LOGO("youtube")}</div>
        <div class="dur mono">14:32</div>
      </div>
      <div class="vmeta">
        <div class="chAv">M</div>
        <div><div class="vtitle">My 1H Gold Strategy That Actually Works</div><div class="mono small">@MaxTradesFX · 1.2M views</div></div>
      </div>
      <div class="vactions">
        <div class="act">👍 48K</div><div class="act">↗ Share</div>
        <div class="act copy"><span class="cp1">🔗 Copy link</span><span class="cp2">✓ Copied</span></div>
      </div>
      <div class="hand h4" data-layout-allow-overlap>👆</div>
      ${mascot("onCard")}
    </div>
    <div class="toast">✓ Link copied</div>
  </div>
  ${labels("PASTE ANY", "YOUTUBE STRATEGY")}`;

const RULES = [
  ["MARKET", "XAU/USD · 1 hour"],
  ["ENTRY", "RSI < 30 + bullish engulfing"],
  ["EXIT", "Take profit 2R · stop below low"],
  ["RISK", "1% per trade"],
];
scenes[4] = `
  <div class="stage"><div class="card s5card">
    <div class="chatHead">${LOGO("claude")}<span class="chName serif">Claude</span><span class="conn"><i>${CUBE}</i>cubrik connected</span></div>
    <div class="bubbleRow"><div class="linkBubble"><img src="assets/img/thumb.jpg" alt=""><div><div class="lbT">My 1H Gold Strategy That Actually Works</div><div class="lbU">youtube.com/watch?v=gold-1h</div></div></div></div>
    <div class="analyze">
      <div class="anHead"><span class="spin"></span><span class="anTxt">cubrik is watching the video…</span><span class="anDone">✓ Video analyzed · 14:32</span></div>
      <div class="steps"><span class="st sA">✓ Transcript</span><span class="st sB">✓ Chart patterns</span><span class="st sC">✓ Rules</span></div>
    </div>
    <div class="rules">
    ${RULES.map(
      ([k, v], i) => `<div class="rule r${i}"><div class="rk mono">${k}</div><div class="rv">${chars(v)}</div>${
        i === 1
          ? `<svg class="loop" viewBox="0 0 860 110"><path class="loopPath" d="M470 8 C 700 2, 856 20, 853 55 C 850 92, 690 106, 430 105 C 170 104, 8 92, 7 55 C 6 20, 180 3, 540 13" fill="none" stroke="#7C3AED" stroke-width="5" stroke-linecap="round"/></svg>`
          : ""
      }</div>`,
    ).join("")}
    </div>
    <div class="agentBar"><div class="agChk">✓</div><div class="agTx"><div class="agT">Agent created</div><div class="mono xs">GOLD RSI SCALPER · READY TO BACKTEST</div></div><div class="agBtn">Open</div></div>
    <div class="composer"><div class="cmpIn"><span class="ph">Reply to Claude…</span><span class="pasted">${LOGO("youtube")}youtube.com/watch?v=gold-1h</span></div><div class="send">↑</div></div>
    <div class="keycap mono">⌘ V</div>
    ${mascot("onCard")}
  </div></div>
  ${labels("CUBRIK PULLS", "EVERY RULE")}`;

scenes[5] = `
  <div class="stage"><div class="card s6card">
    <div class="s6head">${LOGO("claude")}<div class="h2">Claude Skills</div></div>
    <div class="grid">
      ${SKILLS.map(
        ([g, n, c, sub], k) => `<div class="chip c${k}${k === 4 ? " pick" : ""}"><div class="cIco mono" style="background:${c}">${g}</div><div class="cName">${n}</div>${k === 4 ? '<div class="ring"></div>' : ""}</div>`,
      ).join("")}
      <div class="chip c7 own"><div class="cIco mono" style="background:#161514;color:#fff">&lt;/&gt;</div><div><div class="cName">Your own</div><div class="mono xs violet">FROM GITHUB</div></div></div>
    </div>
    ${mascot("onCard")}
  </div></div>
  ${labels("OR USE", "YOUR CLAUDE SKILLS")}`;

scenes[6] = `
  <div class="stage"><div class="card s7card">
    <div class="s7head"><div><div class="h2">Backtest</div><div class="mono small">5 YEARS · FEES INCLUDED</div></div><div class="tvBadge"><div class="tvIco">${LOGO("tradingview")}</div><div><div class="tvTop mono">DATA VIA</div><div class="tvName">TradingView API</div></div></div></div>
    <svg class="eq" viewBox="0 0 ${EQ.w} ${EQ.h}">
      <defs>
        <linearGradient id="eqg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7C3AED" stop-opacity=".32"/><stop offset="1" stop-color="#7C3AED" stop-opacity="0"/></linearGradient>
        <clipPath id="eqc"><rect class="eqClip" x="0" y="0" width="${EQ.w}" height="${EQ.h}"/></clipPath>
      </defs>
      ${[1, 2, 3].map((k) => `<line x1="0" x2="${EQ.w}" y1="${(EQ.h * k) / 4}" y2="${(EQ.h * k) / 4}" stroke="#EFE8DC" stroke-width="2"/>`).join("")}
      <g clip-path="url(#eqc)"><path d="${EQ.area}" fill="url(#eqg)"/><path d="${EQ.d}" fill="none" stroke="#7C3AED" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/></g>
    </svg>
    <div class="years mono xs"><span>2021</span><span>2022</span><span>2023</span><span>2024</span><span>2025</span></div>
    <div class="stats">
      <div class="stat st0"><div class="mono xs">WIN RATE</div><div class="sv">61%</div></div>
      <div class="stat st1"><div class="mono xs">PROFIT FACTOR</div><div class="sv">1.8</div></div>
      <div class="stat st2"><div class="mono xs">NET PROFIT</div><div class="sv pos">+38.4%</div></div>
    </div>
    ${mascot("onCard")}
  </div></div>
  ${labels("BACKTESTED ON", "TRADINGVIEW DATA")}`;

scenes[7] = `
  <div class="stage"><div class="card s8card">
    <div class="s8top"><div class="dotWrap"><div class="dotRing"></div><div class="dot"></div></div><div class="h2">Gold RSI Scalper</div><div class="live mono">LIVE</div></div>
    <div class="mono small">RUNS 24/7 ON METATRADER 5</div>
    <div class="clockRow"><div class="moon">🌙</div><div class="clock">${CLOCK.map((c, k) => `<span class="ck ck${k}">${c}</span>`).join("")}</div></div>
    <div class="asleep">you're asleep</div>
    <div class="s8foot mono xs"><span>XAU/USD · GOLD</span><span class="pnl">+$1,385.38</span></div>
    ${mascot("onCard")}
  </div></div>
  <div class="goldFlash"></div>
  <div class="notif">
    <div class="nIco">${CUBE}</div>
    <div class="nTxt"><div class="nTop"><span>cubrik</span><span class="nNow">now</span></div>
      <div class="nMain">💰 Take profit hit: +$1,385.38</div>
      <div class="nSub">Gold RSI Scalper closed XAU/USD (+2R)</div></div>
  </div>
  ${labels("TRADES 24/7", "WHILE YOU SLEEP")}`;

scenes[8] = `
  <div class="stage"><div class="card s9card">
    <div class="s9head"><div class="blogo img" style="background:#fff">${LOGO("mt5", "png")}</div><div class="h2">Launch on MetaTrader?</div></div>
    <div class="s9txt"><div>Real money · 1% risk per trade</div><div><span class="green">✓</span> Stop loss always on</div></div>
        <div class="btns"><div class="btn cancel">Cancel</div><div class="btn confirm"><span class="bt1">Confirm</span><span class="bt2">Live ✓</span><div class="ripple"></div></div></div>
    <div class="hand" data-layout-allow-overlap>👆</div>
    ${mascot("onCard")}
  </div></div>
  ${labels("NOTHING GOES LIVE", "WITHOUT YOUR OK")}`;

scenes[9] = `
  <div class="endWrap">
    <div class="card endCard">
      <div class="cmt">Comment</div>
      <div class="cpill">“CLAUDE”</div>
      <div class="setup serif">&amp; I'll send you the setup</div>
      ${mascot("onCard")}
    </div>
    <div class="pair">${cubrikTile("sm")}<div class="x">×</div>${claudeTile("sm")}</div>
    <div class="works mono">CUBRIK WORKS WITH CLAUDE</div>
  </div>
  <div class="walkRow"><div class="walkStrip">${Array.from({ length: 12 }, () => mascot("w")).join("")}</div></div>`;

// ---------- audio ----------
const audio = [];
let aid = 0;
const SFX_LEN = {};
// at = absolute seconds
const sfxAt = (file, at, vol, track, dur) => {
  SFX_LEN[file] ??= probe(`assets/sfx/${file}.wav`);
  const d = Math.min(dur ?? SFX_LEN[file], TOTAL - at);
  audio.push(
    `<audio id="sfx${++aid}" src="assets/sfx/${file}.wav" data-start="${Math.max(0, at).toFixed(3)}" data-duration="${d.toFixed(3)}" data-track-index="${track}" data-volume="${vol}"></audio>`,
  );
};
const sfx = (file, scene, t, vol, track, dur) => sfxAt(file, S[scene] + t, vol, track, dur);
VO.forEach((_, i) =>
  audio.push(
    `<audio id="vo${i + 1}" src="${voFile(i)}" data-start="${(S[i] + VO_OFFSET).toFixed(3)}" data-duration="${VO[i].toFixed(3)}" data-track-index="2" data-volume="1"></audio>`,
  ),
);
// transitions: whoosh peak (0.16s) lands on the cut
for (let k = 1; k < 10; k++) {
  sfxAt("whoosh", S[k] - 0.16, TRANS[k] === "zoom" ? 0.55 : 0.5, 3 + (k % 2));
  if (TRANS[k] === "zoom") sfxAt("impact-bass-1", S[k] - 0.05, k === 9 ? 0.6 : 0.38, 5, 1.6);
}
// hook
sfx("impact-bass-1", 0, 0, 0.6, 6, 1.8);
sfx("glitch-1", 0, EV.s1off[0] - 0.05, 0.32, 7, 1.4);
sfx("click-soft", 0, 0.2, 0.35, 8, 0.3);
sfx("glitch-3", 0, 1.2, 0.3, 9, 0.6);
// labels: soft click on each pop
for (let i = 1; i < 9; i++) EV.lab.forEach((t, k) => sfx("click-soft", i, t + 0.02, k ? 0.34 : 0.26, 8 + k, 0.3));
// card entrances
[1, 2, 3, 4, 5, 6, 7, 8].forEach((i) => sfx("pop", i, 0.03, 0.3, 10, 0.5));
// scene details
sfx("pop", 1, 0.14, 0.22, 11, 0.5);
sfx("pop", 1, 0.26, 0.22, 12, 0.5);
sfx("ping", 1, EV.s2badge, 0.3, 11);
sfx("typing", 2, 0.12, 0.3, 11, 0.42);
sfx("pop", 2, 0.6, 0.24, 12, 0.5);
EV.s3checks.forEach((t) => sfx("ping", 2, t, 0.26, 13, 0.7));
sfx("click", 3, EV.s4copy, 0.6, 11);
sfx("ping", 3, EV.s4copy + 0.1, 0.25, 12);
sfx("key-press", 4, EV.s5paste - 0.04, 0.7, 11);
sfx("click", 4, EV.s5send, 0.5, 12);
sfx("pop", 4, EV.s5send + 0.08, 0.3, 13, 0.5);
EV.s5steps.forEach((t, k) => sfx("click-soft", 4, t, 0.35, 11 + k, 0.3));
sfx("typing", 4, EV.s5rules, 0.22, 14, 0.85);
sfx("whoosh", 4, EV.s5loop - 0.1, 0.18, 15);
sfx("sparkle", 4, EV.s5agent, 0.32, 16);
sfx("ping", 4, EV.s5agent + 0.02, 0.3, 17);
[0, 2, 4, 6].forEach((k) => sfx("pop", 5, 0.15 + k * 0.05, 0.2, 11 + (k % 4 ? 1 : 0), 0.5));
sfx("click", 5, EV.s6ring, 0.45, 13);
EV.s7stats.forEach((t, k) => sfx("pop", 6, t, 0.26, 11 + (k % 2), 0.5));
sfx("take_profit", 7, EV.s8notif + 0.25, 0.95, 11);
sfx("click", 8, EV.s9tap, 0.6, 11);
sfx("ping", 8, EV.s9tap + 0.08, 0.28, 12);
sfx("pop", 9, 0.36, 0.3, 11, 0.5);
sfx("sparkle", 9, 0.6, 0.25, 12);

// ---------- styles ----------
const fontFaces = [
  ["Poppins", 400, "normal", "poppins-latin-400-normal"],
  ["Poppins", 500, "normal", "poppins-latin-500-normal"],
  ["Poppins", 600, "normal", "poppins-latin-600-normal"],
  ["Poppins", 700, "normal", "poppins-latin-700-normal"],
  ["Poppins", 800, "normal", "poppins-latin-800-normal"],
  ["JetBrains Mono", 500, "normal", "jetbrains-mono-latin-500-normal"],
  ["JetBrains Mono", 700, "normal", "jetbrains-mono-latin-700-normal"],
  ["Lora", 500, "normal", "lora-latin-500-normal"],
  ["Lora", 500, "italic", "lora-latin-500-italic"],
  ["Lora", 600, "italic", "lora-latin-600-italic"],
]
  .map(
    ([f, w, s, file]) =>
      `@font-face{font-family:"${f}";font-weight:${w};font-style:${s};font-display:block;src:url("assets/fonts/${file}.woff2") format("woff2")}`,
  )
  .join("\n");

const CSS_FR = LANG === "fr" ? `.hl2{font-size:76px}.hl1{font-size:56px}.s9head .h2{font-size:46px}.thumbTitle{font-size:84px}` : "";
const CSS = `
${fontFaces}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;overflow:hidden;background:#F3EEE5}
#root{position:relative;width:100%;height:100%;overflow:hidden;font-family:"Poppins",sans-serif;color:#161514}
.clip{position:absolute;inset:0}
.mono{font-family:"JetBrains Mono",monospace;font-weight:500;color:#8B8579;letter-spacing:.06em}
.small{font-size:24px}.xs{font-size:21px}
.serif{font-family:"Lora",serif}
.violet{color:#7C3AED!important}.green{color:#16A34A}.neg{color:#E11D48!important}
.h2{font-size:44px;font-weight:700;letter-spacing:-.01em;line-height:1.15}

/* scene wrappers, transitions */
.sIn,.cam{position:absolute;inset:0}
.sIn{will-change:transform,filter}
#wipe{z-index:50;overflow:hidden;pointer-events:none}
#wipe .bar{position:absolute;top:-10%;height:120%;left:-30%;width:160%;transform:skewX(-14deg)}
#wipe .b1{background:#7C3AED}#wipe .b2{background:#161514}#wipe .b3{background:#C4B5FD}
#flash{z-index:60;background:#fff;opacity:0;pointer-events:none}
.redFlash{position:absolute;inset:0;background:radial-gradient(80% 60% at 50% 40%,rgba(225,29,72,.55),rgba(225,29,72,0) 70%);opacity:0;z-index:25}
.goldFlash{position:absolute;inset:0;background:radial-gradient(70% 50% at 50% 35%,rgba(22,163,74,.35),rgba(22,163,74,0) 70%);opacity:0;z-index:25}

/* background */
#bg{background:#F3EEE5}
#bg .grid{position:absolute;inset:0;background-image:linear-gradient(rgba(70,50,30,.055) 2px,transparent 2px),linear-gradient(90deg,rgba(70,50,30,.055) 2px,transparent 2px);background-size:60px 60px;background-position:-1px -1px}
#bg .wash{position:absolute;border-radius:50%;filter:blur(110px)}
#bg .peach{width:900px;height:800px;left:-320px;top:-260px;background:#FFC9A3;opacity:.55}
#bg .lav{width:950px;height:900px;right:-360px;bottom:-200px;background:#D9CCFF;opacity:.6}

/* labels */
.labels{position:absolute;left:0;right:0;top:1296px;display:flex;flex-direction:column;align-items:center;gap:14px;z-index:20}
.lab{display:block;font-family:"JetBrains Mono",monospace;font-weight:500;font-size:42px;line-height:1.2;letter-spacing:.13em;text-transform:uppercase;padding:12px calc(26px - .13em) 12px 26px;border-radius:10px;background:#161514;color:#F6F2EA;box-shadow:0 10px 24px -10px rgba(40,25,10,.35);opacity:0}
.lab.key{background:#7C3AED;color:#fff;box-shadow:0 12px 28px -10px rgba(124,58,237,.55)}

/* cards */
.stage{position:absolute;left:0;right:0;top:300px;height:960px;display:flex;align-items:center;justify-content:center}
.stage.col{flex-direction:column;gap:30px}
.card{position:relative;background:#FFFDF9;border:2px solid #E7E0D4;border-radius:28px;box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 28px 60px -30px rgba(100,65,30,.28),0 4px 12px -4px rgba(100,65,30,.06)}
.cardHead{margin-bottom:22px}
.badge{display:inline-block;font-weight:600;font-size:34px;padding:12px 28px;border-radius:999px}
.badge.ok{background:#DCFCE7;color:#16A34A;border:2px solid #BBF7D0}
.tvBadge{display:flex;align-items:center;gap:14px;padding:12px 20px 12px 14px;border:2px solid #E7E0D4;border-radius:18px;background:#fff}
.tvIco{width:48px;height:48px;padding:9px;border-radius:12px;background:#F3EEE5;flex:none}
.tvTop{font-size:16px;letter-spacing:.14em}
.tvName{font-size:26px;font-weight:600;line-height:1.1}
.pill{padding:10px 20px;border:2px solid #E7E0D4;border-radius:999px;font-size:22px;color:#5c564d;background:#FBF8F3;height:max-content}

/* mascot */
.mascot{position:absolute;width:98px;height:112px;z-index:15}
.mBody{position:absolute;left:0;top:0;width:98px;height:105px}
.mBody svg{width:98px;height:105px;display:block}
.mShadow{position:absolute;left:14px;bottom:-4px;width:70px;height:12px;border-radius:50%;background:rgba(60,30,10,.16)}
.onCard{right:-30px;bottom:-40px}

/* scene 1 hero */
.hero{position:absolute;left:0;right:0;top:1120px;display:flex;flex-direction:column;align-items:center;gap:18px;z-index:20}
.hl{position:relative;display:block;font-family:"JetBrains Mono",monospace;font-weight:700;text-transform:uppercase;letter-spacing:.08em;border-radius:14px;padding:14px calc(30px - .08em) 14px 30px;background:#161514;color:#F6F2EA;font-size:60px;line-height:1.15;box-shadow:0 16px 34px -14px rgba(40,25,10,.45)}
.hl2{background:#7C3AED;color:#fff;font-size:100px;box-shadow:0 20px 44px -14px rgba(124,58,237,.6)}
.strike{position:absolute;left:22px;right:22px;top:50%;height:14px;margin-top:-7px;background:#E11D48;border-radius:7px;transform-origin:left center;box-shadow:0 4px 12px rgba(225,29,72,.45)}

/* logos */
.lg{display:block;width:100%;height:100%;object-fit:contain}
.blogo.img{padding:10px;border:2px solid #EFE8DC}

/* scene 1 */
.s1wrap{position:absolute;left:0;right:0;top:300px;height:960px}
.mons{position:absolute;left:0;right:0;top:220px;display:flex;justify-content:center;align-items:flex-end;gap:14px;perspective:1400px}
.mon{display:flex;flex-direction:column;align-items:center}
.mon1{transform:rotateY(24deg);transform-origin:right bottom}
.mon3{transform:rotateY(-24deg);transform-origin:left bottom}
.bezel{background:#1B1C1F;padding:12px;border-radius:16px;box-shadow:0 30px 50px -20px rgba(0,0,0,.5),inset 0 0 0 2px #2a2b30}
.scr{position:relative;background:#050608;border-radius:6px;overflow:hidden}
.scrIn{position:absolute;inset:0;background:radial-gradient(120% 90% at 50% 0%,#1a0d12,#0b0d10 70%);padding:14px 16px}
.scrHead{display:flex;justify-content:space-between;font-family:"JetBrains Mono",monospace;font-weight:700;font-size:19px;color:#cfd2d8;margin-bottom:10px}
.scrHead .neg{color:#FB3B5C!important}
.scrChart{position:absolute;left:0;bottom:0}
.crt{position:absolute;left:0;right:0;top:50%;height:4px;margin-top:-2px;background:#fff;box-shadow:0 0 18px 6px rgba(255,255,255,.7);opacity:0}
.neck{width:34px;height:46px;background:linear-gradient(90deg,#2a2b30,#3a3b41,#2a2b30)}
.mon1 .neck,.mon3 .neck{height:30px}
.mon .foot{width:150px;height:14px;border-radius:8px 8px 3px 3px;background:#2a2b30}
.desk{position:absolute;left:60px;right:60px;top:596px;height:70px;border-radius:14px 14px 6px 6px;box-shadow:0 40px 60px -30px rgba(80,45,15,.45)!important;background:repeating-linear-gradient(178deg,rgba(255,255,255,.035) 0 3px,transparent 3px 19px),linear-gradient(180deg,#B07A4E,#8D5B37 60%,#6F4527);box-shadow:0 -2px 0 rgba(255,255,255,.25) inset}
.deskTop{position:absolute;left:0;right:0;top:0;height:18px;background:linear-gradient(180deg,#C9915F,#A06D44)}
.m1{left:850px;top:552px}

/* scene 2 */
.win{width:900px;padding:0 0 46px}
.titlebar{display:flex;align-items:center;gap:12px;height:70px;padding:0 28px;border-bottom:2px solid #EFE8DC}
.titlebar i{width:18px;height:18px;border-radius:50%;background:#EAD9C8}
.titlebar i:nth-child(2){background:#EEE2C4}.titlebar i:nth-child(3){background:#D8E6CF}
.titlebar span{margin-left:auto;font-size:20px}
.s2body{position:relative;display:flex;justify-content:space-between;align-items:center;padding:80px 70px 40px}
.tile{width:250px;height:250px;border-radius:40px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;box-shadow:0 22px 40px -18px rgba(60,35,10,.35)}
.tClaude{background:#EFE5D6;border:2px solid #E2D4BF}
.tCubrik{background:#161514}
.tIcon{width:110px;height:110px}.tIcon svg{width:100%;height:100%}
.tName{font-size:44px;font-weight:600;color:#fff;line-height:1}
.tClaude .tName{color:#2B2520;font-weight:600;font-family:"Lora",serif;font-size:46px}
.link{position:absolute;left:320px;top:40px;width:260px;height:140px;overflow:visible}
.s2foot{display:flex;flex-direction:column;align-items:center;gap:18px}

/* scene 3 */
.s3card{width:900px;padding:34px 40px 40px}
.bubbleRow{display:flex;justify-content:flex-end;margin-bottom:30px}
.uBubble{min-height:84px;background:#161514;color:#F6F2EA;font-size:38px;font-weight:500;padding:18px 30px;border-radius:30px 30px 8px 30px;display:flex;align-items:center}
.ch{display:none}
.cursor{display:inline-block;width:4px;height:42px;background:currentColor;margin-left:4px}
.reply{display:flex;gap:20px;align-items:flex-start}
.avatar{flex:none;width:72px;height:72px;border-radius:20px;background:#161514;padding:12px}
.avatar svg{width:100%;height:100%;display:block}
.replyCard{flex:1;background:#F8F4ED;border:2px solid #EFE8DC;border-radius:24px;padding:24px 26px;display:flex;flex-direction:column;gap:16px}
.replyTitle{font-size:30px;font-weight:500;color:#5c564d}
.brow{display:flex;align-items:center;gap:20px;background:#FFFDF9;border:2px solid #EFE8DC;border-radius:20px;padding:14px 18px}
.blogo{flex:none;width:74px;height:74px;border-radius:18px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:32px}
.bname{flex:1;font-size:36px;font-weight:600;line-height:1.2}
.bname .small{font-size:19px;margin-top:4px}
.chk{flex:none;width:56px;height:56px;border-radius:50%;background:#16A34A;color:#fff;font-size:32px;font-weight:700;display:flex;align-items:center;justify-content:center}
.s3foot{margin-top:24px;text-align:center}

/* scene 4 */
.s4{gap:34px}
.vcard{width:920px;padding:20px 20px 26px}
.thumb{position:relative;height:500px;border-radius:20px;overflow:hidden;background:#0b0b0d}
.thumbImg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform-origin:70% 40%}
.thumbShade{position:absolute;inset:0;background:linear-gradient(100deg,rgba(0,0,0,.75) 0%,rgba(0,0,0,.35) 42%,rgba(0,0,0,0) 60%)}
.thumbTitle{position:absolute;left:34px;top:28px;font-size:84px;font-weight:800;color:#fff;letter-spacing:-.02em;line-height:.95;text-shadow:0 6px 0 rgba(0,0,0,.55),0 0 30px rgba(0,0,0,.6);text-transform:uppercase}
.thumbTitle div{display:block}
.gold{color:#FACC15}
.ytPlay{position:absolute;left:50%;top:50%;width:150px;height:106px;margin:-53px 0 0 -75px;filter:drop-shadow(0 12px 24px rgba(0,0,0,.5))}
.ytPlay img{width:100%;height:100%;display:block}
.dur{position:absolute;right:16px;bottom:16px;background:rgba(0,0,0,.8);color:#fff!important;font-size:24px;padding:4px 12px;border-radius:8px}
.vmeta{display:flex;gap:20px;align-items:center;padding:24px 8px 0}
.chAv{flex:none;width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#FACC15,#D97706);color:#fff;font-weight:800;font-size:34px;display:flex;align-items:center;justify-content:center}
.vtitle{font-size:34px;font-weight:600;line-height:1.25;margin-bottom:6px}
.vactions{display:flex;gap:14px;padding:22px 8px 0}
.act{position:relative;height:64px;padding:0 26px;border-radius:999px;background:#F3EEE5;border:2px solid #EFE8DC;display:flex;align-items:center;font-size:27px;font-weight:600;color:#3d3832}
.copy{min-width:250px;justify-content:center}
.cp1,.cp2{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.cp2{opacity:0}
.h4{left:420px;bottom:-80px}
.toast{background:#161514;color:#F6F2EA;font-size:32px;font-weight:600;padding:18px 34px;border-radius:999px;box-shadow:0 18px 40px -16px rgba(0,0,0,.45);opacity:0}

/* chat header (scenes 3 and 5) */
.chatHead{display:flex;align-items:center;gap:14px;padding-bottom:14px;margin-bottom:16px;border-bottom:2px solid #F1EBE1}
.chatHead .lg{width:46px;height:46px}
.chName{font-size:36px;font-weight:600;color:#2B2520}
.conn{margin-left:auto;display:flex;align-items:center;gap:10px;font-size:22px;font-weight:600;color:#5c564d;background:#F3EEE5;border:2px solid #EFE8DC;border-radius:999px;padding:8px 18px 8px 10px}
.conn i{display:block;width:34px;height:34px;border-radius:10px;background:#161514;padding:6px}
.conn svg{display:block;width:100%;height:100%}

/* scene 5 */
.s5card{width:920px;padding:24px 32px 24px}
.linkBubble{display:flex;gap:18px;align-items:center;background:#161514;color:#F6F2EA;border-radius:26px 26px 8px 26px;padding:14px 22px 14px 14px;max-width:700px;opacity:0}
.linkBubble img{width:150px;height:84px;object-fit:cover;border-radius:12px;flex:none}
.lbT{font-size:26px;font-weight:600;line-height:1.2}
.lbU{font-family:"JetBrains Mono",monospace;font-size:19px;color:#a8a29a;margin-top:4px}
.s5card .bubbleRow{margin-bottom:12px}
.analyze{background:#F8F4ED;border:2px solid #EFE8DC;border-radius:20px;padding:12px 18px;margin-bottom:8px;opacity:0}
.anHead{position:relative;display:flex;align-items:center;gap:14px;height:40px;font-size:28px;font-weight:600}
.spin{width:30px;height:30px;border-radius:50%;border:4px solid #DDD6FE;border-top-color:#7C3AED;flex:none}
.anDone{position:absolute;left:0;top:0;height:40px;display:flex;align-items:center;color:#16A34A;opacity:0}
.steps{display:flex;gap:12px;margin-top:8px}
.st{font-size:22px;font-weight:600;color:#16A34A;background:#F0FDF4;border:2px solid #BBF7D0;border-radius:999px;padding:6px 16px;opacity:0}
.rules{margin-bottom:8px}
.rule{position:relative;display:flex;align-items:center;gap:22px;padding:9px 6px;border-top:2px solid #F1EBE1;min-height:60px;opacity:0}
.rk{flex:none;width:150px;font-weight:700;font-size:24px;color:#7C3AED!important;letter-spacing:.12em}
.rv{font-size:31px;font-weight:500;display:flex;flex-wrap:wrap}
.loop{position:absolute;left:-22px;top:-22px;width:860px;height:110px;overflow:visible}
.agentBar{display:flex;align-items:center;gap:18px;background:#F0FDF4;border:2px solid #86EFAC;border-radius:22px;padding:12px 16px;margin-bottom:12px;opacity:0}
.agChk{flex:none;width:56px;height:56px;border-radius:50%;background:#16A34A;color:#fff;font-size:30px;font-weight:700;display:flex;align-items:center;justify-content:center}
.agT{font-size:32px;font-weight:700;color:#14532D}
.agTx .xs{color:#4d7c5b!important;margin-top:2px}
.agBtn{margin-left:auto;background:#161514;color:#fff;font-size:26px;font-weight:600;padding:12px 26px;border-radius:14px}
.composer{display:flex;align-items:center;gap:14px}
.cmpIn{position:relative;flex:1;height:68px;border-radius:20px;background:#F8F4ED;border:2px solid #EFE8DC;display:flex;align-items:center;padding:0 22px}
.ph{font-size:28px;color:#a39d93}
.pasted{position:absolute;left:14px;top:12px;bottom:12px;display:flex;align-items:center;gap:10px;background:#fff;border:2px solid #DDD6FE;border-radius:12px;padding:0 16px 0 10px;font-family:"JetBrains Mono",monospace;font-size:22px;color:#161514;opacity:0}
.pasted .lg{width:38px;height:27px}
.send{flex:none;width:68px;height:68px;border-radius:20px;background:#D97757;color:#fff;font-size:40px;font-weight:700;display:flex;align-items:center;justify-content:center}
.keycap{position:absolute;left:330px;bottom:92px;background:#161514;color:#fff!important;font-size:30px;font-weight:700;padding:10px 20px;border-radius:14px;box-shadow:0 8px 0 #000,0 14px 24px -6px rgba(0,0,0,.4);opacity:0;z-index:5}

/* scene 6 */
.s6card{width:920px;padding:38px 36px 40px}
.s6head{display:flex;align-items:center;gap:14px;margin-bottom:26px}
.s6head .lg{width:44px;height:44px}
.pos{color:#16A34A}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.chip{position:relative;display:flex;align-items:center;gap:18px;background:#FBF8F3;border:2px solid #EFE8DC;border-radius:22px;padding:22px 22px;min-height:108px}
.cIco{flex:none;width:64px;height:64px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:24px;color:#161514!important;letter-spacing:0}
.cName{font-size:32px;font-weight:600;line-height:1.15}
.chip .xs{margin-top:4px}
.own{border:2px dashed #7C3AED;background:#F5F1FF}
.own .cIco{color:#fff!important}
.ring{position:absolute;inset:-10px;border:5px solid #7C3AED;border-radius:30px;opacity:0}

/* scene 7 */
.s7card{width:900px;padding:38px 44px 40px}
.s7head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:26px}
.eq{width:800px;height:340px;display:block}
.years{display:flex;justify-content:space-between;margin:10px 0 28px}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.stat{background:#FBF8F3;border:2px solid #EFE8DC;border-radius:20px;padding:20px 22px}
.sv{font-size:54px;font-weight:700;letter-spacing:-.02em;margin-top:6px}

/* scene 8 */
.s8card{width:900px;padding:42px 46px 40px}
.s8top{display:flex;align-items:center;gap:20px;margin-bottom:8px}
.dotWrap{position:relative;width:30px;height:30px;flex:none}
.dot,.dotRing{position:absolute;inset:0;border-radius:50%;background:#16A34A}
.dotRing{opacity:.35}
.live{margin-left:auto;background:#DCFCE7;color:#16A34A!important;font-weight:700;font-size:26px;padding:8px 20px;border-radius:999px;border:2px solid #BBF7D0}
.clockRow{display:flex;align-items:center;gap:26px;margin:44px 0 6px}
.moon{font-size:96px;line-height:1}
.clock{position:relative;width:440px;height:160px}
.ck{position:absolute;left:0;top:0;font-size:150px;font-weight:700;letter-spacing:-.03em;line-height:160px;font-variant-numeric:tabular-nums;opacity:0}
.ck0{opacity:1}
.asleep{font-family:"Lora",serif;font-style:italic;font-weight:500;font-size:44px;color:#8B8579;margin:0 0 36px 124px}
.s8foot{padding-right:60px;display:flex;justify-content:space-between;align-items:center;border-top:2px solid #F1EBE1;padding-top:24px;font-size:22px}
.pnl{font-family:"Poppins",sans-serif;font-weight:700;font-size:34px;color:#16A34A;letter-spacing:0;opacity:0}
.notif{position:absolute;left:44px;right:44px;top:150px;display:flex;gap:24px;align-items:center;padding:26px 30px;border-radius:40px;background:rgba(28,28,30,.95);box-shadow:0 30px 60px -20px rgba(0,0,0,.5);z-index:30;opacity:0}
.nIco{flex:none;width:92px;height:92px;border-radius:22px;background:#161514;padding:14px;border:2px solid #333}
.nIco svg{width:100%;height:100%;display:block}
.nTxt{flex:1;color:#fff}
.nTop{display:flex;justify-content:space-between;font-size:28px;font-weight:600;color:#d9d9de}
.nNow{font-weight:400;color:#8e8e93}
.nMain{font-size:36px;font-weight:600;margin-top:2px}
.nSub{font-size:28px;color:#b8b8bd;margin-top:2px}

/* scene 9 */
.s9card{width:900px;padding:44px 46px 46px}
.s9head{display:flex;gap:24px;align-items:center;margin-bottom:26px}
.s9head .h2{font-size:50px}
.s9txt{font-size:36px;color:#4f4a43;line-height:1.55;margin-bottom:40px}
.summary{background:#FBF8F3;border:2px solid #EFE8DC;border-radius:18px;padding:18px 24px;margin-bottom:34px;display:flex;flex-direction:column;gap:8px}
.summary div{display:flex;justify-content:space-between}
.summary b{color:#161514;font-weight:700}
.btns{display:grid;grid-template-columns:1fr 1.3fr;gap:20px}
.btn{position:relative;height:116px;border-radius:26px;display:flex;align-items:center;justify-content:center;font-size:40px;font-weight:600;overflow:hidden}
.cancel{background:#F3EEE5;border:2px solid #E7E0D4;color:#5c564d}
.confirm{background:#161514;color:#fff}
.bt1,.bt2{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.bt2{opacity:0}
.ripple{position:absolute;left:50%;top:50%;width:80px;height:80px;margin:-40px 0 0 -40px;border-radius:50%;background:rgba(255,255,255,.45);opacity:0}
.hand{position:absolute;right:250px;bottom:-20px;font-size:120px;line-height:1;z-index:16;opacity:0}

/* scene 10 */
.endWrap{position:absolute;left:0;right:0;top:330px;display:flex;flex-direction:column;align-items:center}
.endCard{width:860px;padding:60px 40px 66px;display:flex;flex-direction:column;align-items:center;gap:22px}
.cmt{font-size:128px;font-weight:800;letter-spacing:-.03em;line-height:1}
.cpill{background:#7C3AED;color:#fff;font-size:100px;font-weight:800;letter-spacing:.01em;padding:4px 40px 10px;border-radius:30px;line-height:1.15;box-shadow:0 20px 40px -14px rgba(124,58,237,.6)}
.setup{font-style:italic;font-weight:600;font-size:60px;color:#7C3AED;margin-top:8px}
.pair{display:flex;align-items:center;gap:30px;margin-top:76px}
.tile.sm{width:150px;height:150px;border-radius:30px;gap:8px}
.tile.sm .tIcon{width:64px;height:64px}
.tile.sm .tName{font-size:28px}
.x{font-size:64px;font-weight:300;color:#8B8579}
.works{margin-top:30px;font-size:26px;letter-spacing:.22em}
.walkRow{position:absolute;left:0;right:0;top:1440px;height:120px;overflow:hidden}
.walkStrip{position:absolute;left:0;top:0;width:2160px;height:120px}
.walkStrip .w{position:relative;display:inline-block;margin-right:82px;transform:scale(.8)}
`;

// ---------- timeline script ----------
const JS = `
const S=${JSON.stringify(S)}, D=${JSON.stringify(D)}, EV=${JSON.stringify(EV)}, TRANS=${JSON.stringify(TRANS)};
const tl=gsap.timeline({paused:true});
const at=(i,t)=>S[i]+t;
const q=(s)=>document.querySelector(s), qa=(s)=>Array.from(document.querySelectorAll(s));
function pop(sel,i,t,d){tl.fromTo(sel,{scale:.5,opacity:0},{scale:1,opacity:1,duration:d||.24,ease:"back.out(3)"},at(i,t));}
function bounce(sel,i,t){tl.fromTo(sel,{scale:.6,opacity:0},{scale:1,opacity:1,duration:.38,ease:"back.out(2.6)"},at(i,t));}
function rise(sel,i,t,y){tl.fromTo(sel,{y:y||170,scale:.94,opacity:0},{y:0,scale:1,opacity:1,duration:.4,ease:"back.out(2.1)"},at(i,t));}
function labels(i){EV.lab.forEach((t,k)=>{const el="#s"+i+" .lab"+(k+1);
  tl.fromTo(el,{scale:k?1.5:.5,opacity:0,rotation:k?-4:0},{scale:1,opacity:1,rotation:0,duration:.24,ease:"back.out(3.2)"},at(i-1,t));});}
function type(sel,i,t,cps){const c=qa(sel+" .ch");c.forEach((x,k)=>tl.set(x,{display:"inline"},at(i,t+k/cps)));return t+c.length/cps;}
function blink(sel,i,t0,t1){const n=Math.max(1,Math.floor((t1-t0)/.4));for(let k=0;k<n;k++){tl.set(sel,{opacity:0},at(i,t0+k*.4+.2));tl.set(sel,{opacity:1},at(i,t0+k*.4+.4));}}
function walk(el,i,t0,t1,step){step=step||.13;const A=el.querySelector(".mA"),B=el.querySelector(".mB");let k=0;
  for(let t=t0;t<t1;t+=step,k++){tl.set(A,{opacity:k%2?0:1},at(i,t));tl.set(B,{opacity:k%2?1:0},at(i,t));}
  const n=Math.max(1,Math.floor((t1-t0)/step));
  tl.fromTo(el.querySelector(".mBody"),{y:0},{y:-9,duration:step,ease:"sine.out",yoyo:true,repeat:n-1},at(i,t0));}
function mascotOnCard(i,t){const el=q("#s"+(i+1)+" .onCard");if(!el)return;
  tl.fromTo(el,{scale:0,rotation:-25,opacity:0},{scale:1,rotation:0,opacity:1,duration:.35,ease:"back.out(3)"},at(i,t));walk(el,i,0,D[i]);}
function shake(sel,t,amp,n){for(let k=0;k<n;k++)tl.to(sel,{x:(k%2?-1:1)*amp*(1-k/n),y:(k%3-1)*amp*.5*(1-k/n),duration:.035,ease:"none"},t+k*.035);tl.to(sel,{x:0,y:0,duration:.035},t+n*.035);}

// ---- camera: slow push-in on every scene so nothing is ever static
for(let i=0;i<10;i++)tl.fromTo("#s"+(i+1)+" .cam",{scale:1},{scale:1.045,duration:D[i],ease:"none"},at(i,0));

tl.set("#wipe .bar",{xPercent:-135},0);
// ---- transitions (velocity-matched: out accelerates into the cut, in decelerates out of it)
const CH=(b,c)=>"blur("+b+"px) drop-shadow("+c+"px 0 0 rgba(255,40,100,.6)) drop-shadow("+(-c)+"px 0 0 rgba(40,190,255,.6))";
for(let k=1;k<10;k++){const c=S[k],o="#s"+k+" .sIn",n="#s"+(k+1)+" .sIn",T=TRANS[k];
  if(T==="whipL"||T==="whipU"){const p=T==="whipL"?"x":"y",dist=T==="whipL"?760:1100;
    tl.fromTo(o,{[p]:0,filter:CH(0,0)},{[p]:-dist,filter:CH(22,7),duration:.17,ease:"power4.in",immediateRender:false},c-.17);
    tl.fromTo(n,{[p]:dist,filter:CH(22,7)},{[p]:0,filter:CH(0,0),duration:.38,ease:"power4.out",immediateRender:false},c);}
  else if(T==="zoom"){
    tl.fromTo(o,{scale:1,filter:CH(0,0),opacity:1},{scale:1.9,filter:CH(20,6),opacity:0,duration:.18,ease:"power3.in",immediateRender:false},c-.18);
    tl.fromTo(n,{scale:.62,filter:CH(16,5)},{scale:1,filter:CH(0,0),duration:.42,ease:"expo.out",immediateRender:false},c);
    tl.fromTo("#flash",{opacity:.85},{opacity:0,duration:.3,ease:"power2.out",immediateRender:false},c);}
  else if(T==="stripes"){
    qa("#wipe .bar").forEach((b,j)=>{tl.fromTo(b,{xPercent:-135},{xPercent:0,duration:.2,ease:"power3.in",immediateRender:false},c-.2-.04*(2-j));
      tl.fromTo(b,{xPercent:0},{xPercent:135,duration:.26,ease:"power3.out",immediateRender:false},c+.02+.04*j);});
    tl.fromTo(n,{scale:1.12},{scale:1,duration:.45,ease:"expo.out",immediateRender:false},c);}
}

// scene 1: hook slam, monitors die with glitch + shake, mascot walks in
(function(){const i=0;
  tl.fromTo("#s1 .hl1",{scale:1.14},{scale:1,duration:.35,ease:"expo.out"},at(i,0));
  tl.fromTo("#s1 .hl2",{scale:1.9,opacity:0,rotation:-5},{scale:1,opacity:1,rotation:0,duration:.3,ease:"expo.out"},at(i,.18));
  shake("#s1 .hero",at(i,.42),12,5);
  tl.fromTo("#s1 .strike",{scaleX:0},{scaleX:1,duration:.22,ease:"power3.out"},at(i,1.2));
  tl.fromTo("#s1 .hl2",{x:0},{x:10,duration:.04,yoyo:true,repeat:5},at(i,1.22));
  shake("#s1 .cam",at(i,.06),16,6);
  qa("#s1 .redLine").forEach(p=>{const L=p.getTotalLength();tl.fromTo(p,{strokeDasharray:L,strokeDashoffset:L},{strokeDashoffset:0,duration:.45,ease:"power2.in"},at(i,0));});
  tl.fromTo("#s1 .mons",{y:60,scale:.9},{y:0,scale:1,duration:.4,ease:"back.out(2)"},at(i,0));
  EV.s1off.forEach((t,k)=>{const m="#s1 .mon"+(k+1);
    tl.to(m+" .scrIn",{opacity:.2,duration:.03},at(i,t));tl.to(m+" .scrIn",{opacity:1,duration:.03},at(i,t+.05));
    tl.to(m+" .scrIn",{scaleY:.012,filter:"brightness(4)",duration:.09,ease:"power2.in"},at(i,t+.1));
    tl.set(m+" .crt",{opacity:1},at(i,t+.17));tl.set(m+" .scrIn",{opacity:0},at(i,t+.2));
    tl.to(m+" .crt",{scaleX:0,duration:.1,ease:"power2.in"},at(i,t+.2));tl.set(m+" .crt",{opacity:0},at(i,t+.32));
    shake("#s1 .mons",at(i,t+.12),9,4);
    tl.fromTo("#s1 .redFlash",{opacity:.35},{opacity:0,duration:.25,immediateRender:false},at(i,t+.12));});
  const m=q("#s1 .m1");tl.fromTo(m,{x:-1000},{x:0,duration:1.1,ease:"power2.out"},at(i,.15));walk(m,i,0,D[i]);})();

// scene 2
(function(){const i=1;
  rise("#s2 .s2card",i,0);bounce("#s2 .s2a",i,.12);bounce("#s2 .s2b",i,.22);
  const p=q("#s2 .linkPath"),L=p.getTotalLength();
  tl.fromTo(p,{strokeDasharray:L,strokeDashoffset:L},{strokeDashoffset:0,duration:.4,ease:"power3.inOut"},at(i,.48));
  pop("#s2 .ld1",i,.45);pop("#s2 .ld2",i,.86);
  tl.fromTo("#s2 .s2a,#s2 .s2b",{scale:1},{scale:1.08,duration:.12,yoyo:true,repeat:1,ease:"power2.out"},at(i,.9));
  pop("#s2 .s2badge",i,EV.s2badge,.3);
  mascotOnCard(i,.3);labels(2);})();

// scene 3
(function(){const i=2;
  rise("#s3 .s3card",i,0);
  tl.fromTo("#s3 .uBubble",{scale:.7,opacity:0},{scale:1,opacity:1,duration:.24,ease:"back.out(2.6)",transformOrigin:"right center"},at(i,.08));
  const e=type("#s3 .uBubble",i,.12,45);tl.set("#s3 .uBubble .cursor",{opacity:0},at(i,e+.06));
  rise("#s3 .reply",i,.6,70);
  [0,1,2].forEach(k=>tl.fromTo("#s3 .br"+k,{x:-60,opacity:0},{x:0,opacity:1,duration:.28,ease:"back.out(2.2)"},at(i,.68+k*.06)));
  EV.s3checks.forEach((t,k)=>{pop("#s3 .chk"+k,i,t,.28);tl.to("#s3 .br"+k,{borderColor:"#86EFAC",backgroundColor:"#F0FDF4",duration:.15},at(i,t));
    tl.fromTo("#s3 .br"+k,{scale:1},{scale:1.035,duration:.1,yoyo:true,repeat:1},at(i,t));});
  tl.fromTo("#s3 .s3foot",{opacity:0,y:12},{opacity:1,y:0,duration:.22},at(i,EV.s3checks[2]+.15));
  mascotOnCard(i,.3);labels(3);})();

// scene 4: youtube video, copy link
(function(){const i=3;
  rise("#s4 .vcard",i,0,200);
  tl.fromTo("#s4 .thumbImg",{scale:1.15},{scale:1,duration:D[i],ease:"power1.out"},at(i,0));
  tl.fromTo("#s4 .thumbTitle",{x:-60,opacity:0},{x:0,opacity:1,duration:.3,ease:"back.out(2)"},at(i,.18));
  tl.fromTo("#s4 .ytPlay",{scale:.3,opacity:0},{scale:1,opacity:1,duration:.3,ease:"back.out(3)"},at(i,.25));
  tl.fromTo("#s4 .hand",{x:260,y:260,opacity:0},{x:0,y:0,opacity:1,duration:.4,ease:"power3.out"},at(i,EV.s4copy-.48));
  tl.to("#s4 .hand",{scale:.82,duration:.07,yoyo:true,repeat:1},at(i,EV.s4copy-.04));
  tl.to("#s4 .copy",{scale:.92,duration:.06,yoyo:true,repeat:1},at(i,EV.s4copy));
  tl.set("#s4 .copy",{backgroundColor:"#7C3AED",color:"#fff",borderColor:"#7C3AED"},at(i,EV.s4copy+.05));
  tl.set("#s4 .cp1",{opacity:0},at(i,EV.s4copy+.05));tl.set("#s4 .cp2",{opacity:1},at(i,EV.s4copy+.05));
  tl.fromTo("#s4 .toast",{y:40,opacity:0,scale:.8},{y:0,opacity:1,scale:1,duration:.28,ease:"back.out(2.6)"},at(i,EV.s4copy+.1));
  tl.to("#s4 .hand",{x:120,y:140,opacity:0,duration:.3,ease:"power2.in"},at(i,EV.s4copy+.4));
  mascotOnCard(i,.3);labels(4);})();

// scene 5: paste link in Claude -> cubrik analyzes -> rules -> agent created
(function(){const i=4;
  rise("#s5 .s5card",i,0);
  tl.fromTo("#s5 .keycap",{scale:.4,opacity:0,y:20},{scale:1,opacity:1,y:0,duration:.18,ease:"back.out(3)"},at(i,EV.s5paste-.1));
  tl.to("#s5 .keycap",{scale:.88,duration:.05,yoyo:true,repeat:1},at(i,EV.s5paste-.04));
  tl.to("#s5 .keycap",{opacity:0,y:-20,duration:.18},at(i,EV.s5paste+.18));
  tl.set("#s5 .ph",{opacity:0},at(i,EV.s5paste));
  tl.fromTo("#s5 .pasted",{opacity:0,scale:.85},{opacity:1,scale:1,duration:.2,ease:"back.out(2.5)"},at(i,EV.s5paste));
  tl.fromTo("#s5 .cmpIn",{backgroundColor:"#EDE9FE"},{backgroundColor:"#F8F4ED",duration:.4,immediateRender:false},at(i,EV.s5paste));
  tl.to("#s5 .send",{scale:.82,duration:.06,yoyo:true,repeat:1},at(i,EV.s5send));
  tl.set("#s5 .pasted",{opacity:0},at(i,EV.s5send+.06));tl.set("#s5 .ph",{opacity:1},at(i,EV.s5send+.06));
  tl.fromTo("#s5 .linkBubble",{y:120,scale:.8,opacity:0},{y:0,scale:1,opacity:1,duration:.32,ease:"back.out(2.2)",transformOrigin:"right bottom"},at(i,EV.s5send+.06));
  tl.fromTo("#s5 .analyze",{opacity:0,y:30},{opacity:1,y:0,duration:.25,ease:"back.out(2)"},at(i,.8));
  tl.fromTo("#s5 .spin",{rotation:0},{rotation:720,duration:.6,ease:"none"},at(i,.8));
  EV.s5steps.forEach((t,k)=>tl.fromTo("#s5 .s"+"ABC"[k],{scale:.5,opacity:0},{scale:1,opacity:1,duration:.2,ease:"back.out(3)"},at(i,t)));
  tl.set("#s5 .spin,#s5 .anTxt",{opacity:0},at(i,EV.s5rules-.07));
  tl.fromTo("#s5 .anDone",{opacity:0,x:-10},{opacity:1,x:0,duration:.18},at(i,EV.s5rules-.07));
  [0,1,2,3].forEach(k=>{const t=EV.s5rules+k*.16;tl.fromTo("#s5 .r"+k,{opacity:0,x:-30},{opacity:1,x:0,duration:.16},at(i,t));type("#s5 .r"+k+" .rv",i,t+.04,130);});
  const p=q("#s5 .loopPath"),L=p.getTotalLength();
  tl.fromTo(p,{strokeDasharray:L+5,strokeDashoffset:L+5},{strokeDashoffset:0,duration:.34,ease:"power2.inOut"},at(i,EV.s5loop));
  tl.fromTo("#s5 .agentBar",{y:60,scale:.8,opacity:0},{y:0,scale:1,opacity:1,duration:.32,ease:"back.out(2.6)"},at(i,EV.s5agent));
  tl.fromTo("#s5 .agentBar",{boxShadow:"0 0 0 0 rgba(22,163,74,.0)"},{boxShadow:"0 0 0 12px rgba(22,163,74,.18)",duration:.2,yoyo:true,repeat:1,immediateRender:false},at(i,EV.s5agent+.2));
  mascotOnCard(i,.3);labels(5);})();

// scene 6
(function(){const i=5;
  rise("#s6 .s6card",i,0);
  for(let k=0;k<8;k++)tl.fromTo("#s6 .c"+k,{scale:.4,opacity:0,y:30},{scale:1,opacity:1,y:0,duration:.26,ease:"back.out(2.8)"},at(i,.15+k*.05));
  tl.fromTo("#s6 .ring",{opacity:0,scale:1.25},{opacity:1,scale:1,duration:.26,ease:"back.out(2.6)"},at(i,EV.s6ring));
  tl.to("#s6 .pick",{borderColor:"#7C3AED",backgroundColor:"#F5F1FF",duration:.15},at(i,EV.s6ring));
  tl.fromTo("#s6 .pick",{scale:1},{scale:1.07,duration:.12,yoyo:true,repeat:1},at(i,EV.s6ring));
  mascotOnCard(i,.3);labels(6);})();

// scene 7
(function(){const i=6;
  rise("#s7 .s7card",i,0);
  tl.fromTo("#s7 .eqClip",{attr:{width:0}},{attr:{width:${EQ.w}},duration:1.0,ease:"power2.inOut"},at(i,.22));
  EV.s7stats.forEach((t,k)=>tl.fromTo("#s7 .st"+k,{scale:.4,opacity:0,y:30},{scale:1,opacity:1,y:0,duration:.28,ease:"back.out(3)"},at(i,t)));
  mascotOnCard(i,.3);labels(7);})();

// scene 8
(function(){const i=7;
  rise("#s8 .s8card",i,0);
  tl.fromTo("#s8 .dotRing",{scale:1,opacity:.5},{scale:2.6,opacity:0,duration:.7,repeat:Math.max(0,Math.floor(D[i]/.7)-1),ease:"power1.out"},at(i,0));
  const ck=qa("#s8 .ck"),step=(D[i]-.3)/(ck.length-1);
  ck.forEach((c,k)=>{if(!k)return;tl.set(ck[k-1],{opacity:0},at(i,.2+k*step));tl.set(c,{opacity:1},at(i,.2+k*step));});
  tl.fromTo("#s8 .notif",{y:-320,opacity:0},{y:0,opacity:1,duration:.38,ease:"back.out(1.7)"},at(i,EV.s8notif));
  tl.fromTo("#s8 .pnl",{opacity:0,scale:.5},{opacity:1,scale:1,duration:.26,ease:"back.out(3)"},at(i,EV.s8notif+.25));
  shake("#s8 .cam",at(i,EV.s8notif+.24),10,5);
  tl.fromTo("#s8 .goldFlash",{opacity:.4},{opacity:0,duration:.4,immediateRender:false},at(i,EV.s8notif+.25));
  mascotOnCard(i,.3);labels(8);})();

// scene 9
(function(){const i=8;
  rise("#s9 .s9card",i,0);
  tl.fromTo("#s9 .hand",{x:300,y:300,opacity:0},{x:0,y:0,opacity:1,duration:.45,ease:"power3.out"},at(i,EV.s9tap-.55));
  tl.to("#s9 .hand",{scale:.82,duration:.07,yoyo:true,repeat:1},at(i,EV.s9tap-.04));
  tl.to("#s9 .confirm",{scale:.93,duration:.06,yoyo:true,repeat:1},at(i,EV.s9tap));
  tl.set("#s9 .confirm",{backgroundColor:"#16A34A"},at(i,EV.s9tap+.05));
  tl.set("#s9 .bt1",{opacity:0},at(i,EV.s9tap+.05));
  tl.fromTo("#s9 .bt2",{opacity:0,scale:.5},{opacity:1,scale:1,duration:.24,ease:"back.out(3)"},at(i,EV.s9tap+.05));
  tl.fromTo("#s9 .ripple",{scale:0,opacity:.7},{scale:10,opacity:0,duration:.4,ease:"power2.out"},at(i,EV.s9tap));
  tl.fromTo("#s9 .s9card",{boxShadow:"0 0 0 0 rgba(22,163,74,0)"},{boxShadow:"0 0 0 14px rgba(22,163,74,.18)",duration:.2,yoyo:true,repeat:1},at(i,EV.s9tap+.05));
  tl.to("#s9 .hand",{x:140,y:140,opacity:0,duration:.3,ease:"power2.in"},at(i,EV.s9tap+.45));
  mascotOnCard(i,.3);labels(9);})();

// scene 10: end card slam
(function(){const i=9;
  tl.fromTo("#s10 .endCard",{scale:1.6,rotation:-14,opacity:0},{scale:1,rotation:-3,opacity:1,duration:.4,ease:"expo.out"},at(i,.02));
  shake("#s10 .cam",at(i,.2),12,5);
  pop("#s10 .cpill",i,.34,.3);
  tl.fromTo("#s10 .cpill",{rotation:-6},{rotation:0,duration:.4,ease:"back.out(3)"},at(i,.34));
  tl.fromTo("#s10 .setup",{opacity:0,y:30},{opacity:1,y:0,duration:.3,ease:"back.out(2.2)"},at(i,.55));
  bounce("#s10 .pair",i,.8);
  tl.fromTo("#s10 .works",{opacity:0,y:12},{opacity:1,y:0,duration:.25},at(i,1.0));
  mascotOnCard(i,.6);
  tl.fromTo("#s10 .walkStrip",{x:-1080},{x:-1080+D[i]*190,duration:D[i],ease:"none"},at(i,0));
  qa("#s10 .w").forEach(w=>walk(w,i,0,D[i],.14));})();

window.__timelines["main"]=tl;
`;

// ---------- assemble ----------
const sceneDivs = scenes
  .map(
    (html, i) =>
      `<div id="s${i + 1}" class="clip scene" data-start="${S[i]}" data-duration="${D[i]}" data-track-index="1"><div class="sIn"><div class="cam">${html}</div></div></div>`,
  )
  .join("\n");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=1080, height=1920" />
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<style>${CSS}${CSS_FR}</style>
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-duration="${TOTAL}" data-width="1080" data-height="1920">
<div id="bg" class="clip" data-start="0" data-duration="${TOTAL}" data-track-index="0"><div class="wash peach"></div><div class="wash lav"></div><div class="grid"></div></div>
${sceneDivs}
<div id="wipe" data-layout-allow-occlusion class="clip" data-start="0" data-duration="${TOTAL}" data-track-index="14"><div class="bar b1" data-layout-allow-occlusion></div><div class="bar b2" data-layout-allow-occlusion></div><div class="bar b3" data-layout-allow-occlusion></div></div>
<div id="flash" data-layout-allow-occlusion class="clip" data-start="0" data-duration="${TOTAL}" data-track-index="15"></div>
${audio.join("\n")}
</div>
<script>${JS}</script>
</body>
</html>
`;
fs.writeFileSync("index.html", localize(html));

// ---------- cover 1080x1080 ----------
const cover = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=1080, height=1080" />
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<style>${CSS}${CSS_FR}
html,body{width:1080px;height:1080px}
#cv .s1wrap{top:-150px;transform:scale(.92);transform-origin:50% 60%}
#cv .hero{top:690px;gap:14px}
#cv .hl1{font-size:54px}
#cv .hl2{font-size:92px}${LANG === "fr" ? "\n#cv .hl2{font-size:70px}\n#cv .hl1{font-size:50px}" : ""}
#cv .m1{left:880px}
</style>
</head>
<body>
<div id="root" data-composition-id="cover" data-start="0" data-duration="0.5" data-width="1080" data-height="1080">
<div id="bg" class="clip" data-start="0" data-duration="0.5" data-track-index="0"><div class="wash peach"></div><div class="wash lav"></div><div class="grid"></div></div>
<div id="cv" class="clip" data-start="0" data-duration="0.5" data-track-index="1">${scenes[0]}</div>
</div>
<script>const tl=gsap.timeline({paused:true});

tl.set("#cv .mon1 .scrIn",{opacity:0},0);
window.__timelines["cover"]=tl;</script>
</body>
</html>
`;
fs.mkdirSync("cover/assets", { recursive: true });
fs.cpSync("assets/fonts", "cover/assets/fonts", { recursive: true });
fs.writeFileSync("cover/index.html", localize(cover));

console.log("scenes", D.map((d, i) => `${i + 1}:${S[i]}+${d}`).join("  "), "total", TOTAL);
