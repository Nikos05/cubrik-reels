// Body scenes of the "Claude vs ChatGPT vs Grok" video (everything after the hook). Merged by battle-scenes.mjs.
// Demo voice-overs start at T+0.2 (V); presenter lines at T+0.1 (V). Beat times = transcribed word times.
// Results are the team's demo-account figures: $50,000 each, one week, gold only.
const LOGO = { claude: "assets/ai/claude-color.svg", gpt: "assets/ai/openai.svg", grok: "assets/ai/grok.svg", gemini: "assets/ai/gemini-color.svg", deepseek: "assets/ai/deepseek-color.svg", mistral: "assets/ai/mistral-color.svg" };
const AIS = [["claude", "Claude"], ["gpt", "ChatGPT"], ["grok", "Grok"]];
const CUBE = `<svg viewBox="0 0 100 104"><polygon points="50,6 92,30 50,54 8,30" fill="#c4b5fd"/><polygon points="8,30 50,54 50,100 8,76" fill="#7c3aed"/><polygon points="50,54 92,30 92,76 50,100" fill="#a855f7"/></svg>`;
const img = (k, cls = "") => `<img class="lg-${k} ${cls}" src="${LOGO[k]}" alt="">`;
const typed = (s) => `${[...s].map((c) => `<span class="k">${c}</span>`).join("")}<span class="caret2"></span>`;
const bg = `<div class="bxBg"></div>`;
const label = (n, t) => `<div class="bxStep"><span class="mono">${n}</span><b>${t}</b></div>`;
const stepIn = `tl.fromTo(S+".bxStep",{x:-60,opacity:0},{x:0,opacity:1,duration:.4,ease:"expo.out"},T+.15);`;

// ---------- deterministic gold charts ----------
function series(wp, n, seed) {
  let s = seed;
  const r = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  const out = [];
  let prev = wp[0][1];
  for (let i = 0; i < n; i++) {
    let k = 0;
    while (k < wp.length - 2 && wp[k + 1][0] < i) k++;
    const [i0, p0] = wp[k], [i1, p1] = wp[k + 1];
    const t = Math.min(1, Math.max(0, (i - i0) / Math.max(1, i1 - i0)));
    const c = p0 + (p1 - p0) * t + (r() - 0.5) * 0.018;
    const o = prev;
    out.push([o, c, Math.max(o, c) + r() * 0.02, Math.min(o, c) - r() * 0.02]);
    prev = c;
  }
  return out;
}
const W = 1600, H = 640;
function chart(data, over = {}) {
  const n = data.length, cw = (W - 60) / n;
  const X = (i) => 30 + i * cw + cw / 2;
  const Y = (p) => 20 + (1 - p) * (H - 40);
  let c = "";
  data.forEach(([o, cl, h, l], i) => {
    if (over[i]) [o, cl, h, l] = over[i];
    const up = cl >= o, col = up ? "#34d399" : "#fb7185", x = X(i);
    c += `<g class="cd"><line x1="${x.toFixed(1)}" x2="${x.toFixed(1)}" y1="${Y(h).toFixed(1)}" y2="${Y(l).toFixed(1)}" stroke="${col}" stroke-width="3"/><rect x="${(x - cw * 0.32).toFixed(1)}" y="${Y(Math.max(o, cl)).toFixed(1)}" width="${(cw * 0.64).toFixed(1)}" height="${Math.max(3, Math.abs(Y(o) - Y(cl))).toFixed(1)}" rx="2" fill="${col}"/></g>`;
  });
  return { X, Y, cw, candles: c };
}
const svgWrap = (id, inner, ann) => `<svg class="bxChart" viewBox="0 0 ${W} ${H}"><defs><clipPath id="${id}"><rect class="bxClip" x="0" y="0" width="${W}" height="${H}"/></clipPath></defs>${[0.25, 0.5, 0.75].map((k) => `<line x1="0" x2="${W}" y1="${H * k}" y2="${H * k}" stroke="#ffffff10" stroke-width="2"/>`).join("")}<g clip-path="url(#${id})">${inner}</g>${ann}</svg>`;
const reveal = (a, d) => `tl.fromTo(S+".bxClip",{attr:{width:0}},{attr:{width:${W}},duration:${d},ease:"power1.inOut"},${a});`;
const pop = (sel, at, from = "scale:.4") => `tl.fromTo(S+"${sel}",{${from},opacity:0,transformOrigin:"50% 50%"},{scale:1,x:0,y:0,opacity:1,duration:.35,ease:"back.out(2.4)"},${at});`;
const popE = (...a) => pop(...a).replace(/;$/, "");
const draw = (sel, at, d = 0.5) => `tl.fromTo(S+"${sel}",{strokeDasharray:2000,strokeDashoffset:2000},{strokeDashoffset:0,duration:${d},ease:"power2.out"},${at});`;
const tagSvg = (cls, x, y, text, fill = "#7c3aed", color = "#fff", anchor = "middle") => `<g class="${cls}" style="opacity:0"><rect x="${anchor === "middle" ? x - text.length * 9.5 - 16 : x}" y="${y - 26}" width="${text.length * 19 + 32}" height="44" rx="10" fill="${fill}"/><text x="${anchor === "middle" ? x : x + 16 + text.length * 9.5}" y="${y + 4}" text-anchor="middle" font-family="JetBrains Mono" font-weight="700" font-size="26" fill="${color}">${text}</text></g>`;

// chart data
const BIAS = series([[0, 0.22], [6, 0.42], [9, 0.33], [16, 0.56], [20, 0.47], [28, 0.7], [32, 0.61], [40, 0.86], [47, 0.8]], 48, 3);
const SWEEP = series([[0, 0.52], [4, 0.57], [8, 0.48], [12, 0.58], [16, 0.49], [19, 0.54], [22, 0.5], [24, 0.44], [26, 0.55], [31, 0.63], [37, 0.72], [43, 0.8]], 44, 11);
const ENTRY = series([[0, 0.62], [6, 0.5], [8, 0.46], [10, 0.36], [12, 0.42], [14, 0.4], [16, 0.52], [18, 0.7], [20, 0.72], [23, 0.57], [26, 0.64], [32, 0.76], [39, 0.84]], 40, 21);
const ENTRY_OVER = { 10: [0.42, 0.37, 0.43, 0.27], 16: [0.4, 0.55, 0.56, 0.39], 17: [0.55, 0.68, 0.69, 0.54] };

export const BODY_SCENES = {
  // 02 "Benchmarks test code, math and essays. None of them tell you what happens when an AI has to read a gold chart..."
  bench: () => ({
    html: `${bg}<div class="bxBench"><div class="mono bxBt">AI BENCHMARKS</div>${["Code", "Math", "Essays"].map((w, i) => `<div class="bxBr b${i}"><span>${w}</span><b>✓</b><i></i></div>`).join("")}</div>
      <div class="bxReal"><div class="mono bxBt">WHAT TRADING ACTUALLY NEEDS</div>${["Read a gold chart", "Wait for the right setup", "Pull the trigger"].map((w, i) => `<div class="bxRr q${i}"><span class="mono">0${i + 1}</span>${w}</div>`).join("")}<div class="bxRisk">Real rules · Real risk</div></div>`,
    js: () => `const V=T+.2;[.88,1.36,1.92].forEach((w,i)=>${popE('.b"+i+"', "V+w", "x:-60")});
      tl.fromTo(S+".bxBench",{opacity:0,y:30},{opacity:1,y:0,duration:.4,ease:"expo.out"},T);
      [0,1,2].forEach(i=>tl.fromTo(S+".b"+i+" i",{scaleX:0},{scaleX:1,duration:.22,ease:"power3.out"},V+3.3+i*.12));
      tl.to(S+".bxBench",{x:-480,opacity:.35,scale:.8,duration:.6,ease:"power3.inOut"},V+4.2);
      tl.fromTo(S+".bxReal",{x:300,opacity:0},{x:0,opacity:1,duration:.6,ease:"expo.out"},V+4.4);
      [6.0,7.36,8.8].forEach((w,i)=>${popE('.q"+i+"', "V+w", "y:40")});
      ${pop(".bxRisk", "V+9.84", "scale:1.6")}`,
  }),
  // 05 "cubrik is a trading workspace with the most powerful AIs inside..."
  what: () => {
    const ring = [["claude", 4.72], ["gpt", 5.52], ["grok", 6.48], ["gemini", 7.28], ["deepseek", 8.08], ["mistral", 9.36]];
    return {
      html: `${bg}<div class="bxHub"><div class="bxCube">${CUBE}<b>cubrik</b></div>${ring.map(([k], i) => `<div class="bxOrb o${i}" style="transform:rotate(${i * 60}deg) translate(330px) rotate(${-i * 60}deg)">${img(k)}</div>`).join("")}</div>
        <div class="bxFlow">${[["💬", "Plain English"], ["🤖", "Agent"], ["📈", "Watches the market"], ["✅", "Orders on your broker"]].map(([e, t], i) => `<div class="bxF f${i}"><span>${e}</span>${t}</div>${i < 3 ? `<i class="bxA a${i}">→</i>` : ""}`).join("")}</div>`,
      js: () => `const V=T+.2;tl.fromTo(S+".bxCube",{scale:.3,opacity:0},{scale:1,opacity:1,duration:.5,ease:"back.out(2.4)"},T+.1);
        ${JSON.stringify(ring.map((x) => x[1]))}.forEach((w,i)=>tl.fromTo(S+".o"+i,{opacity:0,scale:.2},{opacity:1,scale:1,duration:.4,ease:"back.out(2.4)"},V+w));
        tl.to(S+".bxHub",{rotation:8,duration:5,ease:"none"},V+4.5);
        tl.to(S+".bxHub",{y:-170,scale:.62,duration:.6,ease:"power3.inOut"},V+9.8);
        [10.24,13.28,15.52,16.72].forEach((w,i)=>{tl.fromTo(S+".f"+i,{y:50,opacity:0},{y:0,opacity:1,duration:.35,ease:"back.out(2)"},V+w);if(i)tl.fromTo(S+".a"+(i-1),{opacity:0,x:-20},{opacity:1,x:0,duration:.25},V+w-.2);});
        tl.to(S+".f3",{borderColor:"#34d399",boxShadow:"0 0 50px -10px #34d399",duration:.3},V+17.4);`,
    };
  },
  // 08 "Connecting MetaTrader takes about thirty seconds. And the access is trade-only..."
  mt5: () => ({
    html: `${bg}<div class="bxMt"><div class="bxMtH"><img src="assets/brokers/metatrader5.webp" alt=""><div><b>MetaTrader 5</b><span class="mono">DEMO ACCOUNT</span></div><div class="bxSt mono"><span class="bxSp"></span><em>CONNECTING…</em><strong>✓ CONNECTED</strong></div></div>
      <div class="bxBal"><span class="mono">BALANCE</span><b class="mono bxBalN">$0</b><span class="mono bxX3">× 3 AGENTS</span></div>
      <div class="bxPerm p0"><span>Place, modify and close orders</span><b class="pos">✓ Allowed</b></div><div class="bxPerm p1"><span>Withdraw or transfer money</span><b class="neg">✕ Never</b></div></div>`,
    js: () => `const V=T+.2;tl.fromTo(S+".bxMt",{y:60,opacity:0},{y:0,opacity:1,duration:.45,ease:"expo.out"},T+.05);
      tl.fromTo(S+".bxSp",{rotation:0},{rotation:720,duration:2,ease:"none"},V);
      tl.set(S+".bxSt em,"+S+".bxSp",{display:"none"},V+2.2);tl.fromTo(S+".bxSt strong",{display:"none",scale:.5},{display:"inline",scale:1,duration:.3,ease:"back.out(3)"},V+2.2);
      count(S+".bxBalN",0,50000,V+2.4,1,"$");${pop(".bxX3", "V+3.0", "scale:1.8")}
      ${pop(".p0", "V+6.0", "x:-60")}${pop(".p1", "V+7.44", "x:-60")}
      [[-10,4],[8,-3],[0,0]].forEach(([x,y],j)=>tl.to(S+".p1",{x:x,y:y,duration:.04},V+7.8+j*.04));`,
  }),
  // 10 "Step three: I duplicated the agent three times..."
  dup: () => ({
    html: `${bg}${label("STEP 3", "Duplicate the agent")}<div class="bxDup">${AIS.map(([k, n], i) => `<div class="bxAg g${i}"><div class="bxAgT"><span class="mono">AGENT ${i + 1}</span><b>Gold SMC</b></div><div class="bxAgM"><span class="mono">MODEL</span><div class="bxSel">${img(k)}<b>${i === 0 ? "Claude Opus 5.5" : n}</b></div></div><div class="mono bxAgS">● READY</div></div>`).join("")}</div>
      <div class="bxBadges">${["XAU/USD", "Every 5 min", "Same risk", "1 week"].map((b, i) => `<span class="mono bb${i}">${b}</span>`).join("")}</div>`,
    js: () => `const V=T+.2;${stepIn}
      tl.fromTo(S+".g1",{opacity:0},{opacity:1,duration:.01},T);tl.fromTo(S+".g0",{opacity:0,scale:.8},{opacity:1,scale:1,duration:.4,ease:"back.out(2)"},V+1.3);
      tl.set(S+".g1,"+S+".g2",{x:-480,opacity:0},V+1.3);tl.to(S+".g1",{x:0,opacity:1,duration:.5,ease:"expo.out"},V+2.9);tl.to(S+".g2",{x:0,opacity:1,duration:.5,ease:"expo.out"},V+3.2);
      tl.set(S+".bxSel",{opacity:0},T);[5.04,8.32,10.64].forEach((w,i)=>{tl.fromTo(S+".g"+i+" .bxSel",{opacity:0,y:20},{opacity:1,y:0,duration:.3,ease:"back.out(2)"},V+w);tl.to(S+".g"+i,{borderColor:"#a855f7",boxShadow:"0 0 50px -12px #a855f7",duration:.3},V+w);});
      [11.68,13.04,14.16,16.08].forEach((w,i)=>${popE('.bb"+i+"', "V+w", "y:30")});`,
  }),
  // 12 "Gold only, XAU USD. It's a smart money strategy... First, the bias..."
  sBias: () => {
    const { X, Y, candles } = chart(BIAS);
    const hh = [6, 16, 28, 40], hl = [9, 20, 32];
    const ann = hh.map((i, k) => tagSvg(`hh h${k}`, X(i), Y(BIAS[i][2]) - 34, "HH", "#34d399", "#06281b")).join("") + hl.map((i, k) => tagSvg(`hl l${k}`, X(i), Y(BIAS[i][3]) + 40, "HL", "#1f2937", "#c4b5fd")).join("") +
      [6, 16, 28].map((i, k) => `<line class="bos s${k}" x1="${X(i)}" x2="${X(i + 12)}" y1="${Y(BIAS[i][2])}" y2="${Y(BIAS[i][2])}" stroke="#c4b5fd" stroke-width="3" stroke-dasharray="10 8" style="opacity:0"/>`).join("");
    return {
      html: `${bg}${label("STEP 1", "The bias · 4H structure")}<div class="bxHead"><span class="bxGold mono">XAU/USD</span><span class="mono">SMART MONEY + NEWS FILTER</span></div>
        <div class="bxCW">${svgWrap("cb", candles, ann)}</div><div class="bxSide up">▲ BREAKING HIGHS<b>ONLY BUYS</b></div><div class="bxSide dn">▼ BREAKING LOWS<b>ONLY SELLS</b></div>`,
      js: () => `const V=T+.2;tl.fromTo(S+".bxHead",{y:-40,opacity:0},{y:0,opacity:1,duration:.4,ease:"expo.out"},V+1.2);
        tl.set(S+".bxStep",{opacity:0},T);tl.fromTo(S+".bxStep",{x:-60,opacity:0},{x:0,opacity:1,duration:.4,ease:"expo.out"},V+6.4);
        ${reveal("V+.3", 6.5)}
        [0,1,2,3].forEach(k=>${popE('.h"+k+"', "V+11.6+k*.18")});[0,1,2].forEach(k=>${popE('.l"+k+"', "V+11.7+k*.18")});
        [0,1,2].forEach(k=>tl.to(S+".s"+k,{opacity:1,duration:.2},V+12.2+k*.15));
        ${pop(".up", "V+13.6", "x:80")}${pop(".dn", "V+15.3", "x:80")}`,
    };
  },
  // 13 "Second, the liquidity... sweep the Asian session high or low... retail stop losses sit."
  sSweep: () => {
    const { X, Y, candles } = chart(SWEEP, { 24: [0.5, 0.47, 0.51, 0.37] });
    const lo = 0.47, hi = 0.6;
    const ann = `<rect class="asia" x="${X(3)}" y="${Y(hi)}" width="${X(19) - X(3)}" height="${Y(lo) - Y(hi)}" fill="#a855f722" stroke="#a855f7" stroke-width="2" rx="6" style="opacity:0"/>` +
      tagSvg("asiaT", X(11), Y(hi) - 30, "ASIAN RANGE", "#7c3aed") +
      `<line class="lon" x1="${X(20)}" x2="${X(20)}" y1="10" y2="${H - 10}" stroke="#f5c542" stroke-width="3" stroke-dasharray="8 8" style="opacity:0"/>` + tagSvg("lonT", X(20), 40, "LONDON OPEN", "#f5c542", "#1a1204") +
      `<line class="ny" x1="${X(33)}" x2="${X(33)}" y1="10" y2="${H - 10}" stroke="#f5c542" stroke-width="3" stroke-dasharray="8 8" style="opacity:0"/>` + tagSvg("nyT", X(33), 40, "NEW YORK OPEN", "#f5c542", "#1a1204") +
      `<line class="loL" x1="${X(3)}" x2="${X(26)}" y1="${Y(lo)}" y2="${Y(lo)}" stroke="#fb7185" stroke-width="3" style="opacity:0"/>` +
      [8, 10, 12, 14, 16, 18].map((i, k) => `<g class="stp t${k}" style="opacity:0"><circle cx="${X(i)}" cy="${Y(lo) + 40}" r="15" fill="#fb7185"/><text x="${X(i)}" y="${Y(lo) + 49}" text-anchor="middle" font-family="JetBrains Mono" font-weight="700" font-size="24" fill="#2a0d14">SL</text></g>`).join("") +
      tagSvg("swT", X(24), Y(0.37) + 52, "SWEEP", "#fb7185");
    return {
      html: `${bg}${label("STEP 2", "The liquidity")}<div class="bxCW">${svgWrap("cs", candles, ann)}</div><div class="bxNote mono">RETAIL STOP LOSSES SIT HERE</div>`,
      js: () => `const V=T+.2;${stepIn}${reveal("V+.2", 5.8)}
        tl.to(S+".asia",{opacity:1,duration:.3},V+.9);${pop(".asiaT", "V+.9")}
        tl.to(S+".lon",{opacity:1,duration:.2},V+2.2);${pop(".lonT", "V+2.2")}tl.to(S+".ny",{opacity:1,duration:.2},V+3.3);${pop(".nyT", "V+3.3")}
        tl.to(S+".loL",{opacity:1,duration:.2},V+6.1);${pop(".swT", "V+6.3", "scale:1.8")}
        [0,1,2,3,4,5].forEach(k=>${popE('.t"+k+"', "V+11.2+k*.08", "y:-20")});${pop(".bxNote", "V+11.3", "y:30")}
        tl.fromTo(S+".bxCW",{scale:1},{scale:1.06,duration:${"D"},ease:"none",transformOrigin:"55% 60%"},T);`,
    };
  },
  // 14 "Third, the entry. After the sweep, it waits for a change of character on the fifteen minute chart..."
  sEntry: () => {
    const { X, Y, candles } = chart(ENTRY, ENTRY_OVER);
    const ann = `<line class="ch" x1="${X(5)}" x2="${X(19)}" y1="${Y(0.5)}" y2="${Y(0.5)}" stroke="#c4b5fd" stroke-width="3" stroke-dasharray="10 8" style="opacity:0"/>` + tagSvg("chT", X(12), Y(0.5) - 30, "CHoCH", "#7c3aed") +
      `<rect class="fvg" x="${X(16)}" y="${Y(0.6)}" width="${X(39) - X(16)}" height="${Y(0.52) - Y(0.6)}" fill="#34d39926" stroke="#34d399" stroke-width="2" rx="6" style="opacity:0"/>` + tagSvg("fvT", X(30), Y(0.6) - 28, "FAIR VALUE GAP", "#34d399", "#06281b") +
      `<rect class="ob" x="${X(15)}" y="${Y(0.43)}" width="${X(39) - X(15)}" height="${Y(0.38) - Y(0.43)}" fill="#7c3aed26" stroke="#a855f7" stroke-width="2" rx="6" style="opacity:0"/>` + tagSvg("obT", X(30), Y(0.38) + 40, "ORDER BLOCK", "#7c3aed") +
      `<g class="ent" style="opacity:0"><circle cx="${X(23)}" cy="${Y(0.56)}" r="14" fill="#a855f7" stroke="#fff" stroke-width="4"/></g>` + tagSvg("enT", X(23), Y(0.56) + 52, "ENTRY · RETEST", "#fff", "#0d0d0f") + tagSvg("swT", X(10), Y(0.27) + 48, "SWEEP", "#fb7185");
    return {
      html: `${bg}${label("STEP 3", "The entry · 15 min")}<div class="bxCW">${svgWrap("ce", candles, ann)}</div>`,
      js: () => `const V=T+.2;${stepIn}${reveal("V+.1", 3.4)}${pop(".swT", "V+2.2", "scale:1.6")}
        tl.to(S+".ch",{opacity:1,duration:.2},V+3.6);${pop(".chT", "V+3.7")}
        tl.to(S+".fvg",{opacity:1,duration:.3},V+8.0);${pop(".fvT", "V+8.0")}tl.to(S+".ob",{opacity:1,duration:.3},V+9.4);${pop(".obT", "V+9.4")}
        ${pop(".ent", "V+6.6", "scale:3")}${pop(".enT", "V+7.2", "y:20")}`,
    };
  },
  // 15 "The stop goes just beyond the wick of the sweep. Half the position is closed at twice the risk..."
  sExit: () => {
    const { X, Y, candles } = chart(ENTRY, ENTRY_OVER);
    const e = 0.56, sl = 0.26, tp1 = e + 2 * (e - sl) > 0.95 ? 0.86 : e + 2 * (e - sl), tp2 = 0.95;
    const z = (cls, y1, y2, col) => `<rect class="${cls}" x="${X(23)}" y="${Y(y1)}" width="${X(39) - X(23)}" height="${Y(y2) - Y(y1)}" fill="${col}" style="opacity:0"/>`;
    const ln = (cls, y, col, dash = "") => `<line class="${cls}" x1="${X(23)}" x2="${X(39)}" y1="${Y(y)}" y2="${Y(y)}" stroke="${col}" stroke-width="4" ${dash ? `stroke-dasharray="${dash}"` : ""} style="opacity:0"/>`;
    const ann = z("rk", e, sl, "#fb718522") + z("rw", tp1, e, "#34d39922") + ln("sl", sl, "#fb7185") + ln("en", e, "#ffffff") + ln("t1", tp1, "#34d399") + ln("t2", tp2, "#34d399", "10 8") + ln("be", e, "#c4b5fd") +
      tagSvg("slT", X(36), Y(sl) + 30, "STOP · BELOW THE SWEEP", "#fb7185") + tagSvg("t1T", X(34), Y(tp1) - 30, "2R · CLOSE 50%", "#34d399", "#06281b") + tagSvg("beT", X(34), Y(e) + 36, "STOP → BREAK EVEN", "#c4b5fd", "#1a1030") + tagSvg("t2T", X(33), Y(tp2) - 26, "NEXT LIQUIDITY", "#34d399", "#06281b");
    return {
      html: `${bg}${label("EXIT", "Stop, partials, runner")}<div class="bxCW">${svgWrap("cx", candles, ann)}</div>`,
      js: () => `const V=T+.2;${stepIn}tl.set(S+".bxClip",{attr:{width:${W}}},T);
        tl.to(S+".en",{opacity:1,duration:.2},V);tl.to(S+".sl,"+S+".rk",{opacity:1,duration:.3},V+.3);${pop(".slT", "V+.4")}
        tl.to(S+".t1,"+S+".rw",{opacity:1,duration:.3},V+4.7);${pop(".t1T", "V+4.8")}
        tl.to(S+".sl",{attr:{y1:${Y(e)},y2:${Y(e)}},duration:.6,ease:"power3.inOut"},V+6.5);tl.to(S+".rk",{opacity:0,duration:.4},V+6.5);tl.to(S+".slT",{opacity:0,duration:.2},V+6.5);
        tl.to(S+".be",{opacity:1,duration:.2},V+7.0);${pop(".beT", "V+7.0")}tl.to(S+".t2",{opacity:1,duration:.3},V+8.9);${pop(".t2T", "V+8.9")}`,
    };
  },
  // 16 "And the news filter. No new trade thirty minutes before or after high impact US news..."
  sNews: () => {
    const rows = [["14:30", "USD", "CPI (inflation)"], ["14:30", "USD", "Non-Farm Payrolls"], ["20:00", "USD", "FOMC rate decision"]];
    return {
      html: `${bg}${label("FILTER", "News")}<div class="bxCal"><div class="bxCalH mono">ECONOMIC CALENDAR · HIGH IMPACT</div>${rows.map(([t, c, n], i) => `<div class="bxCr c${i}"><span class="mono">${t}</span><span class="mono bxUsd">${c}</span><b>${n}</b><em class="mono">NO TRADE ±30 MIN</em></div>`).join("")}</div>
        <div class="bxNews"><div class="bxCalH mono">HEADLINES · READ BEFORE EVERY DECISION</div><div class="bxNw n0">Gold steady ahead of US data</div><div class="bxNw n1 hot">⚡ Gold jumps 1.4% in minutes on surprise headline</div><div class="bxSkip mono">SKIP</div></div>`,
      js: () => `const V=T+.2;${stepIn}tl.fromTo(S+".bxCal",{y:60,opacity:0},{y:0,opacity:1,duration:.45,ease:"expo.out"},V+.2);
        [6.3,7.3,8.1].forEach((w,i)=>{${pop('.c"+i+"', "V+w", "x:-50")}tl.fromTo(S+".c"+i+" em",{opacity:0,scale:.5},{opacity:1,scale:1,duration:.3,ease:"back.out(3)"},V+2.0+i*.2>V+w?V+w+.2:V+w+.2);});
        tl.to(S+".bxCal",{x:-560,scale:.7,opacity:.3,duration:.6,ease:"power3.inOut"},V+9.6);tl.fromTo(S+".bxNews",{x:400,opacity:0},{x:0,opacity:1,duration:.6,ease:"expo.out"},V+9.8);
        ${pop(".n0", "V+10.3", "y:20")}${pop(".n1", "V+12.6", "y:20")}tl.fromTo(S+".bxSkip",{scale:2.4,opacity:0,rotation:-14},{scale:1,opacity:1,rotation:-8,duration:.25,ease:"power4.in"},V+14.1);`,
    };
  },
  // 17 "Risk was set high on purpose for this test: two percent per trade, a maximum of two trades a day..."
  sRisk: () => ({
    html: `${bg}${label("RISK", "Aggressive on purpose")}<div class="bxRk">${[["2%", "risk per trade"], ["2", "trades max per day"], ["−3%", "daily loss limit"]].map(([a, b], i) => `<div class="bxRc r${i}"><b class="mono">${a}</b><span>${b}</span></div>`).join("")}</div><div class="bxWarn">On a real account, start much lower.</div>`,
    js: () => `const V=T+.2;${stepIn}[3.2,5.44,7.44].forEach((w,i)=>${popE('.r"+i+"', "V+w", "y:60")});${pop(".bxWarn", "V+9.7", "y:30")}`,
  }),
  // 19 the exact prompt, typed
  prompt: () => {
    const p = "Trade gold only. Use the 4H structure for bias. During London and New York, wait for a sweep of the Asian or previous day high/low, then a 15-min change of character, and enter on the fair value gap retest. Stop beyond the sweep, half off at 2R, then break even. 2% risk, 2 trades/day max, stop for the day at −3%. No trades around high-impact news.";
    return {
      html: `${bg}<div class="bxPr"><div class="bxPrH">${AIS.map(([k]) => img(k)).join("")}<span class="mono">SAME PROMPT × 3</span></div><div class="bxBox"><div class="bxTxt">${typed(p)}</div><div class="bxFoot"><span class="mono">cubrik · new agent</span><span class="bxGo">↑</span></div></div><div class="bxOk mono">✓ 3 AGENTS CREATED</div></div>`,
      js: () => `const V=T+.2;tl.fromTo(S+".bxPr",{y:60,opacity:0},{y:0,opacity:1,duration:.45,ease:"expo.out"},T+.05);typeReal(S+".bxTxt",V+.1,V+24.4);
        tl.to(S+".bxGo",{backgroundColor:"#a855f7",scale:1.15,duration:.1,yoyo:true,repeat:1},T+D-.9);${pop(".bxOk", "T+D-.75", "y:20")}`,
    };
  },
  // 21 "Every five minutes, each agent read the chart, checked the news, and decided on its own..."
  week: () => {
    const logs = [["wait", "no sweep yet"], ["skip", "CPI window"], ["entry", "FVG retest"], ["manage", "stop → break even"], ["close", "take profit"]];
    return {
      html: `${bg}<div class="bxDays mono">${["MON", "TUE", "WED", "THU", "FRI"].map((d, i) => `<span class="dy d${i}">${d}</span>`).join("")}</div><div class="bxLogs">${AIS.map(([k, n], c) => `<div class="bxLc"><div class="bxLh">${img(k)}<b>${n}</b></div>${logs.map(([a, b], j) => `<div class="bxLg L${c}${j}"><span class="mono bxAct ${a}">${a.toUpperCase()}</span>${b}</div>`).join("")}</div>`).join("")}</div><div class="bxLogged mono">EVERY DECISION LOGGED · WITH ITS REASON</div>`,
      js: () => `const V=T+.2;tl.fromTo(S+".bxLogs",{y:60,opacity:0},{y:0,opacity:1,duration:.45,ease:"expo.out"},T+.05);
        [0,1,2,3,4].forEach(j=>[0,1,2].forEach(c=>tl.fromTo(S+".L"+c+""+j,{x:-30,opacity:0},{x:0,opacity:1,duration:.25,ease:"back.out(2)"},V+1.4+j*1.5+c*.18+((c*j)%3)*.12)));
        [0,1,2,3,4].forEach(k=>tl.to(S+".d"+k,{color:"#fff",backgroundColor:"#7c3aed",duration:.15},V+.4+k*1.8));${pop(".bxLogged", "V+9.5", "y:30")}`,
    };
  },
  // 24 / 25 / 26 results podium, revealed from third to first
  p3: () => podium(3),
  p2: () => podium(2),
  p1: () => podium(1),
  // 29 "First: the rules aren't enough. Smart money concepts leave room for interpretation..."
  lesson1: () => ({
    html: `${bg}${label("LESSON 1", "Rules leave room for interpretation")}<div class="bxQs">${["What counts as a real sweep?", "Is the change of character clean?", "Is this a good retest?"].map((q, i) => `<div class="bxQ z${i}"><b>${q}</b><div class="bxVotes">${AIS.map(([k]) => `<span>${img(k)}<i>?</i></span>`).join("")}</div></div>`).join("")}</div>`,
    js: () => `const V=T+.2;${stepIn}[2.5,4.7,6.3].forEach((w,i)=>${popE('.z"+i+"', "V+w", "x:-60")});
      [8.3,10.2,11.8].forEach((w,i)=>tl.to(S+".z"+i,{borderColor:"#f5c542",boxShadow:"0 0 50px -12px #f5c542",duration:.3},V+w));`,
  }),
  // 30 "Second: one week is a very small sample..."
  lesson2: () => ({
    html: `${bg}${label("LESSON 2", "One week is a small sample")}<div class="bxGrid">${Array.from({ length: 52 }, (_, i) => `<i class="${i === 51 ? "on" : ""}"></i>`).join("")}</div><div class="bxTags">${["Demo account", "Aggressive risk", "One specific week"].map((t, i) => `<span class="mono tg${i}">${t}</span>`).join("")}</div><div class="bxWarn bxLong">Run it longer before drawing conclusions.</div>`,
    js: () => `const V=T+.2;${stepIn}tl.fromTo(S+".bxGrid i",{opacity:0,scale:.4},{opacity:1,scale:1,duration:.2,stagger:.012},V+.6);tl.fromTo(S+".bxGrid .on",{scale:1},{scale:1.5,duration:.25,yoyo:true,repeat:3},V+2.4);
      [4.7,6.0,8.0].forEach((w,i)=>${popE('.tg"+i+"', "V+w", "y:30")});${pop(".bxLong", "V+9.2", "y:30")}`,
  }),
};

function podium(rank) {
  const R = [["gpt", "ChatGPT", 47161, -2839, "−5.7%", 3], ["grok", "Grok", 58328, 8328, "+16.7%", 2], ["claude", "Claude Opus 5.5", 62289, 12289, "+24.6%", 1]];
  const at = { 3: [1.12, 2.72], 2: [1.2, 2.16], 1: [1.28, 4.16] }[rank];
  return {
    html: `${bg}<div class="bxBan mono">DEMO ACCOUNT · $50,000 EACH · 1 WEEK · GOLD ONLY</div>${rank === 1 ? `<div class="bxConf">${Array.from({ length: 40 }, (_, i) => `<i style="left:${(i * 47) % 100}%;background:${["#f5c542", "#a855f7", "#34d399", "#fff"][i % 4]}"></i>`).join("")}</div>` : ""}<div class="bxPod">${R.map(([k, n, bal, pl, pct, r]) => `<div class="bxPc k${r}${r < rank ? " hid" : ""}${r === rank ? " now" : ""}"><div class="bxRank mono">#${r}</div>${img(k)}<b>${n}</b><div class="mono bxBalv">$${(r === rank ? 50000 : bal).toLocaleString("en-US")}</div><div class="mono bxPl ${pl < 0 ? "neg" : "pos"}">${pl < 0 ? "−" : "+"}$${Math.abs(pl).toLocaleString("en-US")} · ${pct}</div><div class="bxStand" style="height:${[0, 300, 220, 150][r]}px"></div></div>`).join("")}</div>`,
    js: () => {
      const [b, n, , pl] = R.find((x) => x[5] === rank).slice(0, 4);
      return `const V=T+.2;tl.fromTo(S+".bxBan",{y:-30,opacity:0},{y:0,opacity:1,duration:.35},T+.05);
        tl.fromTo(S+".now",{y:200,opacity:0},{y:0,opacity:1,duration:.55,ease:"back.out(1.6)"},V+${at[0]});
        tl.set(S+".now .bxPl",{opacity:0},T);count(S+".now .bxBalv",50000,${R.find((x) => x[5] === rank)[2]},V+${at[1]},1.4,"$");
        tl.fromTo(S+".now .bxPl",{opacity:0,scale:.5},{opacity:1,scale:1,duration:.35,ease:"back.out(3)"},V+${at[1]}+1.2);
        ${rank === 1 ? `tl.to(S+".now",{boxShadow:"0 0 120px -10px #f5c542",borderColor:"#f5c542",duration:.4},V+${at[1]}+1.3);tl.fromTo(S+".bxConf i",{y:-200,opacity:0},{y:900,opacity:1,duration:2.6,stagger:.03,ease:"power1.in"},V+${at[1]}+1.2);` : ""}`;
    },
  };
}

// presenter overlays (cam A / B lines)
const pill = (cls, text, kind = "p1") => `<div class="lt ${cls}"><div class="pill ${kind}">${text}</div></div>`;
const pin = (sel, at, out) => `tl.fromTo(S+"${sel}",{x:-80,opacity:0},{x:0,opacity:1,duration:.35,ease:"expo.out"},${at});tl.to(S+"${sel}",{opacity:0,x:-40,duration:.3},${out});`;
export const BODY_OVERLAYS = {
  o01: () => ({ html: pill("q", "Which AI trades best?", "p2s"), js: () => pin(".q", "T+3.2", "T+D-.35") }),
  o03: () => ({ html: `<div class="lt q">${["Same job", "Same market", "Same time"].map((t, i) => `<div class="pill p1 j${i}">${t}</div>`).join("")}</div>`, js: () => `[2.6,3.9,4.9].forEach((w,i)=>tl.fromTo(S+".j"+i,{x:-80,opacity:0},{x:0,opacity:1,duration:.3,ease:"expo.out"},T+w));tl.to(S+".q",{opacity:0,duration:.3},T+D-.35);` }),
  o04: () => ({ html: `<div class="lt3 q">${CUBE}<div><b>cubrik</b><span>cubrik.ai</span></div></div>`, js: () => pin(".q", "T+1.2", "T+D-.3") }),
  o06: () => ({ html: `<div class="lt q"><div class="pill p1">Same rules</div><div class="pill p2s">Different brain 🧠</div></div>`, js: () => pin(".q", "T+5.4", "T+D-.35") }),
  o07: () => ({ html: `<div class="chap q"><span class="mono">01</span><b>The setup</b></div>${pill("w", "MetaTrader demo · $50,000 × 3")}`, js: () => pin(".q", "T+.2", "T+3.2") + pin(".w", "T+5.6", "T+D-.35") }),
  o09: () => ({ html: pill("q", "One prompt × 3 AIs", "p2s"), js: () => pin(".q", "T+2.0", "T+D-.35") }),
  o11: () => ({ html: `<div class="chap q"><span class="mono">02</span><b>The strategy</b></div>${pill("w", "📸 Screenshot this part", "p2s")}`, js: () => pin(".q", "T+.2", "T+D-.3") + pin(".w", "T+1.6", "T+D-.3") }),
  o18: () => ({ html: `<div class="chap q"><span class="mono">03</span><b>The exact prompt</b></div>`, js: () => pin(".q", "T+.2", "T+D-.3") }),
  o20: () => ({ html: pill("q", "7 days · hands off", "p2s"), js: () => pin(".q", "T+2.2", "T+D-.35") }),
  o22: () => ({ html: `<div class="tag serif q">Same rules,<br><b>different reading.</b></div>`, js: () => `tl.fromTo(S+".q",{y:40,opacity:0},{y:0,opacity:1,duration:.5,ease:"expo.out"},T+4.6);tl.to(S+".q",{opacity:0,duration:.3},T+D-.35);` }),
  o23: () => ({ html: `<div class="chap q"><span class="mono">04</span><b>The results</b></div>`, js: () => pin(".q", "T+.2", "T+D-.3") }),
  o27: () => ({ html: `<div class="lt q"><div class="pill p1">1st vs last</div><div class="pill p2">$15,128 gap</div></div>`, js: () => pin(".q", "T+3.6", "T+D-.35") }),
  o28: () => ({ html: `<div class="chap q"><span class="mono">05</span><b>What it teaches</b></div>`, js: () => pin(".q", "T+.2", "T+D-.3") }),
  o31: () => ({ html: `<div class="chap q"><span class="mono">LESSON 3</span><b>Test it yourself, on demo</b></div>`, js: () => pin(".q", "T+.4", "T+D-.35") }),
  o32: () => ({ html: `<div class="lt q"><div class="pill p1">Free demo</div><div class="pill p2s">→ Real account in one click</div></div>`, js: () => pin(".q", "T+1.0", "T+D-.35") }),
  o33: () => ({
    html: `<div class="end q"><div class="endc">${CUBE}<div class="ebig">cubrik.ai</div><div class="eurl">Link in the description · start on a free demo</div><div class="legal">Demo account results, one week. Not financial advice. AI presenter.</div></div></div>`,
    js: () => `tl.fromTo(S+".endc",{y:60,opacity:0,scale:.92},{y:0,opacity:1,scale:1,duration:.5,ease:"expo.out"},T+.8);`,
  }),
};
export const BODY_OVER = Object.fromEntries(Object.keys(BODY_OVERLAYS).map((k) => [k.slice(1), k]));

export const bodySfx = (at) => {
  [[".88", "pop"], ["1.36", "pop"], ["1.92", "pop"], ["3.5", "error"], ["6.2", "click-soft"], ["7.56", "click-soft"], ["9.0", "click-soft"], ["10.0", "impact-bass-1"]].forEach(([t, f]) => at("02", +t + 0.2, f, 0.28));
  [4.9, 5.7, 6.7, 7.5, 8.3, 9.6].forEach((t) => at("05", t, "pop", 0.22)); at("05", 17.0, "ping", 0.3);
  at("08", 2.4, "ping", 0.32); at("08", 6.2, "click-soft", 0.3); at("08", 7.64, "error", 0.25);
  at("10", 1.5, "pop", 0.25); at("10", 3.1, "whoosh-short", 0.25); [5.24, 8.52, 10.84].forEach((t) => at("10", t, "sparkle", 0.25)); [11.9, 13.2, 14.4, 16.3].forEach((t) => at("10", t, "click-soft", 0.25));
  at("12", 11.8, "pop", 0.25); at("12", 13.8, "ping", 0.3); at("12", 15.5, "ping", 0.3);
  at("13", 6.5, "impact-bass-1", 0.3); at("13", 11.4, "pop", 0.25);
  at("14", 3.9, "click-soft", 0.3); at("14", 6.8, "ping", 0.3); at("14", 8.2, "pop", 0.25); at("14", 9.6, "pop", 0.25);
  at("15", 0.6, "click-soft", 0.3); at("15", 5.0, "ping", 0.3); at("15", 6.7, "whoosh-short", 0.22); at("15", 9.1, "sparkle", 0.25);
  at("16", 6.5, "click-soft", 0.25); at("16", 7.5, "click-soft", 0.25); at("16", 8.3, "click-soft", 0.25); at("16", 12.8, "notification", 0.3); at("16", 14.3, "error", 0.3);
  at("17", 3.4, "pop", 0.28); at("17", 5.6, "pop", 0.28); at("17", 7.6, "pop", 0.28);
  at("21", 9.7, "ping", 0.25);
  at("24", 1.3, "whoosh-short", 0.3); at("24", 4.2, "error", 0.28);
  at("25", 1.4, "whoosh-short", 0.3); at("25", 3.6, "ping", 0.3);
  at("26", 1.5, "whoosh-short", 0.3); at("26", 5.6, "take_profit", 0.45); at("26", 5.6, "sparkle", 0.35);
  [8.5, 10.4, 12.0].forEach((t) => at("29", t, "pop", 0.25)); at("30", 2.6, "ping", 0.25);
};

export const BODY_CSS = `
.bxBg{position:absolute;inset:0;background:radial-gradient(circle at 50% 35%,#1b1030 0%,#07050c 72%)}
.bxStep{position:absolute;left:70px;top:60px;display:flex;align-items:center;gap:16px;background:rgba(10,10,12,.9);border:1px solid #2f2f36;border-radius:16px;padding:12px 24px;z-index:5}.bxStep span{font-size:22px;color:#c4b5fd;letter-spacing:.14em}.bxStep b{font-size:34px}
.bxBench,.bxReal{position:absolute;top:220px;display:flex;flex-direction:column;gap:18px}.bxBench{left:640px}.bxReal{left:760px;opacity:0}
.bxBt{font-size:26px;letter-spacing:.18em;color:#c4b5fd;margin-bottom:6px}
.bxBr{position:relative;display:flex;align-items:center;justify-content:space-between;width:600px;font-size:56px;font-weight:700;background:rgba(14,12,20,.92);border:1px solid #2f2f36;border-radius:20px;padding:18px 34px;opacity:0}.bxBr b{color:#34d399}
.bxBr i{position:absolute;left:24px;right:24px;top:50%;height:8px;background:#fb7185;border-radius:4px;transform-origin:0 50%}
.bxRr{display:flex;align-items:center;gap:22px;width:860px;font-size:50px;font-weight:700;background:rgba(14,12,20,.92);border:1px solid #2f2f36;border-left:8px solid #f5c542;border-radius:20px;padding:18px 30px;opacity:0}.bxRr span{font-size:28px;color:#f5c542}
.bxRisk{margin-top:14px;font-weight:800;font-size:64px;color:#fff;background:#7c3aed;border-radius:20px;padding:10px 34px;width:max-content;opacity:0;box-shadow:0 30px 80px -20px #7c3aedcc}
.bxHub{position:absolute;left:50%;top:50%;width:0;height:0}.bxCube{position:absolute;left:-150px;top:-120px;width:300px;display:flex;flex-direction:column;align-items:center;gap:10px}.bxCube svg{width:160px;height:160px;filter:drop-shadow(0 0 40px #a855f7aa)}.bxCube b{font-size:64px;font-weight:600}
.bxOrb{position:absolute;left:-60px;top:-60px;width:120px;height:120px;opacity:0}.bxOrb img{width:120px;height:120px;object-fit:contain;background:#fff;border-radius:30px;padding:20px;box-shadow:0 20px 50px -14px #000}
.bxFlow{position:absolute;left:0;right:0;bottom:120px;display:flex;justify-content:center;align-items:center;gap:20px}
.bxF{display:flex;align-items:center;gap:14px;font-size:36px;font-weight:600;background:rgba(14,12,20,.94);border:2px solid #2f2f36;border-radius:20px;padding:18px 26px;opacity:0}.bxF span{font-size:40px}.bxA{font-style:normal;font-size:44px;color:#c4b5fd;opacity:0}
.bxMt{position:absolute;left:50%;top:150px;width:1100px;margin-left:-550px;background:rgba(14,12,20,.95);border:1px solid #2f2f36;border-radius:34px;padding:40px 50px;display:flex;flex-direction:column;gap:24px}
.bxMtH{display:flex;align-items:center;gap:26px}.bxMtH img{width:110px;height:110px;border-radius:24px;background:#fff;object-fit:contain;padding:10px}.bxMtH b{display:block;font-size:52px}.bxMtH span{font-size:24px;color:#f5c542;letter-spacing:.14em}
.bxSt{margin-left:auto;display:flex;align-items:center;gap:12px;font-size:26px;color:#c4b5fd}.bxSt strong{display:none;color:#34d399;font-size:30px}.bxSp{width:30px;height:30px;border-radius:50%;border:4px solid #a855f7;border-top-color:transparent}
.bxBal{display:flex;align-items:baseline;gap:22px;background:#0b0a10;border-radius:22px;padding:22px 30px}.bxBal span{font-size:24px;color:#8b8b93;letter-spacing:.14em}.bxBal b{font-size:84px;color:#34d399}.bxX3{margin-left:auto;color:#c4b5fd!important;font-size:34px!important;opacity:0}
.bxPerm{display:flex;justify-content:space-between;font-size:38px;background:#0b0a10;border-radius:18px;padding:18px 30px;opacity:0}.bxPerm b{font-weight:700}
.bxDup{position:absolute;left:0;right:0;top:230px;display:flex;justify-content:center;gap:40px}
.bxAg{width:500px;background:rgba(14,12,20,.95);border:2px solid #2f2f36;border-radius:30px;padding:30px;display:flex;flex-direction:column;gap:22px;opacity:0}
.bxAgT span{font-size:22px;color:#8b8b93;letter-spacing:.14em}.bxAgT b{display:block;font-size:46px}
.bxAgM span{font-size:20px;color:#8b8b93;letter-spacing:.14em}.bxSel{display:flex;align-items:center;gap:16px;margin-top:8px;background:#0b0a10;border:1px solid #3a3a42;border-radius:16px;padding:14px 18px}.bxSel img{width:58px;height:58px;object-fit:contain;background:#fff;border-radius:14px;padding:8px}.bxSel b{font-size:34px}
.bxAgS{font-size:22px;color:#34d399;letter-spacing:.14em}
.bxBadges{position:absolute;left:0;right:0;bottom:120px;display:flex;justify-content:center;gap:20px}.bxBadges span{font-size:34px;font-weight:700;background:#7c3aed;border-radius:14px;padding:12px 26px;opacity:0}
.bxHead{position:absolute;right:70px;top:66px;display:flex;gap:18px;font-size:30px;letter-spacing:.14em;opacity:0}.bxHead span{background:rgba(10,10,12,.9);border:1px solid #2f2f36;border-radius:12px;padding:10px 20px}.bxHead .bxGold{background:#f5c542;color:#1a1204;border:0}
.bxCW{position:absolute;left:160px;top:180px;width:1600px;height:640px}.bxChart{width:1600px;height:640px;overflow:visible}
.bxSide{position:absolute;right:70px;padding:16px 26px;border-radius:18px;font-family:"JetBrains Mono";font-weight:700;font-size:24px;letter-spacing:.1em;opacity:0}.bxSide b{display:block;font-family:Poppins;font-size:46px;letter-spacing:0}
.bxSide.up{top:200px;background:#06281bee;border:2px solid #34d399;color:#34d399}.bxSide.dn{top:380px;background:#2a0d14ee;border:2px solid #fb7185;color:#fb7185}
.bxNote{position:absolute;left:300px;bottom:110px;font-size:30px;font-weight:700;letter-spacing:.12em;background:#fb7185;color:#2a0d14;border-radius:14px;padding:12px 24px;opacity:0}
.bxCal,.bxNews{position:absolute;top:200px;width:1100px;background:rgba(14,12,20,.95);border:1px solid #2f2f36;border-radius:30px;padding:34px 40px;display:flex;flex-direction:column;gap:18px}.bxCal{left:410px;opacity:0}.bxNews{left:860px;width:900px;opacity:0}
.bxCalH{font-size:24px;color:#c4b5fd;letter-spacing:.16em}
.bxCr{display:flex;align-items:center;gap:22px;background:#0b0a10;border-radius:18px;padding:18px 24px;font-size:34px;opacity:0}.bxCr span{font-size:28px;color:#8b8b93}.bxUsd{color:#f5c542!important}.bxCr em{margin-left:auto;font-style:normal;font-size:22px;color:#fb7185;border:2px solid #fb7185;border-radius:10px;padding:6px 12px}
.bxNw{background:#0b0a10;border-radius:16px;padding:18px 24px;font-size:32px;opacity:0}.bxNw.hot{border:2px solid #f5c542;color:#f5c542}
.bxSkip{position:absolute;right:40px;bottom:-40px;font-size:70px;font-weight:700;color:#fb7185;border:6px solid #fb7185;border-radius:18px;padding:4px 30px;background:#2a0d14;opacity:0}
.bxRk{position:absolute;left:0;right:0;top:300px;display:flex;justify-content:center;gap:44px}
.bxRc{width:440px;height:300px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(14,12,20,.95);border:2px solid #2f2f36;border-radius:30px;opacity:0}.bxRc b{font-size:120px;color:#fff}.bxRc span{font-size:34px;color:#c4b5fd}
.bxWarn{position:absolute;left:0;right:0;margin:auto;width:max-content;bottom:130px;font-weight:700;font-size:44px;background:#f5c542;color:#1a1204;border-radius:16px;padding:12px 30px;opacity:0}
.bxPr{position:absolute;left:50%;top:120px;width:1500px;margin-left:-750px;display:flex;flex-direction:column;gap:24px}
.bxPrH{display:flex;align-items:center;gap:16px}.bxPrH img{width:62px;height:62px;object-fit:contain;background:#fff;border-radius:16px;padding:8px}.bxPrH span{margin-left:10px;font-size:30px;font-weight:700;letter-spacing:.14em;color:#c4b5fd}
.bxBox{background:rgba(14,12,20,.96);border:2px solid #a855f7;border-radius:30px;padding:38px 44px 30px;box-shadow:0 30px 90px -30px #7c3aedaa}.bxTxt{font-size:40px;line-height:1.5;min-height:540px}
.bxFoot{display:flex;justify-content:space-between;align-items:center;margin-top:10px}.bxFoot span{font-size:22px;color:#8b8b93}.bxGo{width:56px;height:56px;border-radius:50%;background:#2f2f36;display:grid;place-items:center;font-size:30px;font-weight:700}
.bxOk{font-size:34px;font-weight:700;color:#34d399;opacity:0}
.bxDays{position:absolute;left:0;right:0;top:70px;display:flex;justify-content:center;gap:14px}.dy{font-size:28px;letter-spacing:.14em;color:#8b8b93;border:1px solid #2f2f36;border-radius:12px;padding:10px 22px}
.bxLogs{position:absolute;left:0;right:0;top:170px;display:flex;justify-content:center;gap:30px}
.bxLc{width:520px;background:rgba(14,12,20,.95);border:1px solid #2f2f36;border-radius:28px;padding:24px;display:flex;flex-direction:column;gap:12px}
.bxLh{display:flex;align-items:center;gap:14px;margin-bottom:6px}.bxLh img{width:54px;height:54px;object-fit:contain;background:#fff;border-radius:14px;padding:7px}.bxLh b{font-size:34px}
.bxLg{display:flex;align-items:center;gap:14px;font-size:28px;background:#0b0a10;border-radius:14px;padding:12px 16px;opacity:0}
.bxAct{font-size:20px;font-weight:700;border-radius:8px;padding:4px 10px;min-width:96px;text-align:center}.bxAct.wait,.bxAct.skip{background:#2f2f36;color:#c4b5fd}.bxAct.entry{background:#7c3aed;color:#fff}.bxAct.manage{background:#f5c542;color:#1a1204}.bxAct.close{background:#34d399;color:#06281b}
.bxLogged{position:absolute;left:0;right:0;margin:auto;width:max-content;bottom:90px;font-size:30px;font-weight:700;letter-spacing:.12em;background:#7c3aed;border-radius:14px;padding:12px 26px;opacity:0}
.bxBan{position:absolute;left:0;right:0;margin:auto;width:max-content;top:60px;font-size:28px;font-weight:700;letter-spacing:.14em;color:#f5c542;border:2px solid #f5c542;border-radius:14px;padding:10px 24px}
.bxPod{position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:center;align-items:flex-end;gap:40px}
.bxPc{position:relative;width:480px;display:flex;flex-direction:column;align-items:center;gap:10px;background:rgba(14,12,20,.96);border:2px solid #2f2f36;border-radius:30px 30px 0 0;padding:30px 20px 0}.bxPc.hid{opacity:0}
.bxPc.k1{order:2}.bxPc.k2{order:1}.bxPc.k3{order:3}
.bxRank{position:absolute;top:-30px;font-size:34px;font-weight:700;background:#7c3aed;border-radius:12px;padding:4px 18px}.bxPc.k1 .bxRank{background:#f5c542;color:#1a1204}
.bxPc img{width:120px;height:120px;object-fit:contain;background:#fff;border-radius:30px;padding:18px}.bxPc b{font-size:42px}
.bxBalv{font-size:60px;font-weight:700}.bxPl{font-size:34px;font-weight:700}
.bxStand{width:100%;background:linear-gradient(180deg,#2a1a4a,#120a20);border-top:2px solid #3a2a5a;margin-top:14px}
.bxQs{position:absolute;left:0;right:0;top:220px;display:flex;flex-direction:column;align-items:center;gap:26px}
.bxQ{display:flex;align-items:center;gap:40px;width:1300px;justify-content:space-between;background:rgba(14,12,20,.95);border:1px solid #2f2f36;border-radius:24px;padding:26px 36px;opacity:0}.bxQ b{font-size:46px}
.bxVotes{display:flex;gap:16px}.bxVotes span{position:relative}.bxVotes img{width:70px;height:70px;object-fit:contain;background:#fff;border-radius:18px;padding:10px}.bxVotes i{position:absolute;right:-8px;bottom:-8px;width:34px;height:34px;border-radius:50%;background:#f5c542;color:#1a1204;font-style:normal;font-weight:800;display:grid;place-items:center;font-size:22px}
.bxGrid{position:absolute;left:50%;top:200px;width:1300px;margin-left:-650px;display:grid;grid-template-columns:repeat(13,1fr);gap:14px}.bxGrid i{height:70px;border-radius:12px;background:#1f1a2e}.bxGrid i.on{background:#f5c542;box-shadow:0 0 40px #f5c542aa}
.bxTags{position:absolute;left:0;right:0;top:640px;display:flex;justify-content:center;gap:20px}.bxTags span{font-size:34px;font-weight:700;background:rgba(14,12,20,.95);border:2px solid #fb7185;color:#fb7185;border-radius:14px;padding:12px 26px;opacity:0}
.bxLong{bottom:110px}
.bxConf{position:absolute;inset:0;pointer-events:none;z-index:5}.bxConf i{position:absolute;top:0;width:14px;height:22px;border-radius:3px;opacity:0}
`;
