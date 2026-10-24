// Scene library. Each factory takes the 1-based scene number n and options, and returns
// { html, js, sfx: [[file, t, vol, dur?]], min }. JS runs against the shared timeline core.
import { tr, chars, rng, mascot, CUBE, LOGO, BLOGO, BROKERS, claudeTile, cubrikTile, labels, chatHead, LANG } from "./core.mjs";

const fit = (text, max, width = 960, k = 0.68) => Math.min(max, Math.floor(width / (tr(text).length * k)));

// ---------- hook headline (two stacked labels, second one slams, optional strike) ----------
export function hero(l1, l2, strike = false) {
  return `<div class="hero"><div class="hl hl1" style="font-size:${fit(l1, 60)}px">${tr(l1)}</div><div class="hl hl2" style="font-size:${fit(l2, 100)}px">${tr(l2)}${strike ? '<div class="strike"></div>' : ""}</div></div>`;
}
const heroJs = (n, strikeAt) => `
  tl.fromTo("#s${n} .hl1",{scale:1.14},{scale:1,duration:.35,ease:"expo.out"},at(${n - 1},0));
  tl.fromTo("#s${n} .hl2",{scale:1.9,opacity:0,rotation:-5},{scale:1,opacity:1,rotation:0,duration:.3,ease:"expo.out"},at(${n - 1},.18));
  shake("#s${n} .hero",at(${n - 1},.42),12,5);
  ${strikeAt ? `tl.fromTo("#s${n} .strike",{scaleX:0},{scaleX:1,duration:.22,ease:"power3.out"},at(${n - 1},${strikeAt}));` : ""}`;
const heroSfx = (strikeAt) => [["impact-bass-1", 0, 0.6, 1.8], ["click-soft", 0.2, 0.35, 0.3], ...(strikeAt ? [["glitch-3", strikeAt, 0.3, 0.6]] : [])];

// ---------- 1a. hook: strategy videos everyone watches, nobody applies ----------
export function hookFeed(n, o) {
  const vids = [
    ["GOLD 1H STRATEGY", "My 1H Gold Strategy That Actually Works", "1.2M views", -7],
    ["90% WIN RATE", "The Only Scalping Strategy You Need", "2.4M views", 0],
    ["SMART MONEY", "Smart Money Concepts, Fully Explained", "860K views", 7],
  ];
  const html = `
  <div class="feed">
    ${vids
      .map(
        ([t, title, views, rot], k) => `<div class="fv fv${k}" data-layout-allow-overlap data-layout-allow-occlusion style="--r:${rot}deg">
        <div class="fvThumb"><img src="assets/img/thumb.jpg" alt=""><div class="fvShade"></div><div class="fvT">${t}</div><div class="fvPlay">${LOGO("youtube")}</div></div>
        <div class="fvMeta"><div class="fvTitle">${title}</div><div class="mono xs">${views}</div></div>
        <div class="fvTag mono" data-layout-allow-overlap>${tr("SAVED · NEVER USED")}</div></div>`,
      )
      .join("")}
    ${mascot("mFeed")}
  </div>
  ${hero(o.l1, o.l2, o.strike ?? true)}`;
  const st = o.strike ?? true ? 1.25 : 0;
  const js = `(function(){const i=${n - 1};${heroJs(n, st)}
  [0,1,2].forEach(k=>tl.fromTo("#s${n} .fv"+k,{y:420,opacity:0,rotation:0},{y:0,opacity:1,rotation:[-7,0,7][k],duration:.45,ease:"back.out(1.8)"},at(i,.05+k*.1)));
  [0,1,2].forEach(k=>tl.fromTo("#s${n} .fv"+k+" .fvTag",{scale:1.6,opacity:0,rotation:-12},{scale:1,opacity:1,rotation:-8,duration:.22,ease:"back.out(3)"},at(i,.75+k*.14)));
  [0,1,2].forEach(k=>tl.to("#s${n} .fv"+k+" .fvThumb",{filter:"grayscale(1) brightness(.7)",duration:.2},at(i,.75+k*.14)));
  const m=q("#s${n} .mFeed");tl.fromTo(m,{x:-900},{x:0,duration:1.1,ease:"power2.out"},at(i,.2));walk(m,i,0,D[i]);})();`;
  return { html, js, sfx: [...heroSfx(st), ["pop", 0.1, 0.3, 0.5], ["pop", 0.3, 0.3, 0.5], ["click", 0.75, 0.4], ["click", 0.89, 0.4], ["click", 1.03, 0.4]], min: 2.4, card: false, labels: false };
}

// ---------- 1b. hook: TradingView alerts firing ----------
export function hookTV(n, o) {
  const r = rng(5);
  const W = 820, H = 380, NC = 34, bars = [];
  let p = 100;
  for (let k = 0; k < NC; k++) {
    const o1 = p, c = p + (r() - 0.4) * 6;
    bars.push([o1, c, Math.max(o1, c) + r() * 3, Math.min(o1, c) - r() * 3]);
    p = c;
  }
  const hiAll = Math.max(...bars.map((b) => b[2])), loAll = Math.min(...bars.map((b) => b[3]));
  const Y = (v) => 30 + (1 - (v - loAll) / (hiAll - loAll)) * (H - 70);
  let candles = "";
  const pts = [];
  bars.forEach(([o1, c, hi, lo], k) => {
    const x = 24 + k * ((W - 48) / (NC - 1)), up = c >= o1;
    const col = up ? "#26A69A" : "#EF5350";
    candles += `<line x1="${x.toFixed(1)}" x2="${x.toFixed(1)}" y1="${Y(hi).toFixed(1)}" y2="${Y(lo).toFixed(1)}" stroke="${col}" stroke-width="2"/><rect x="${(x - 7).toFixed(1)}" y="${Y(Math.max(o1, c)).toFixed(1)}" width="14" height="${Math.max(2, Math.abs(Y(o1) - Y(c))).toFixed(1)}" fill="${col}"/>`;
    pts.push([x, Y((o1 + c) / 2) + 18]);
  });
  const ind = pts.map((q, k) => (k ? "L" : "M") + q[0].toFixed(1) + " " + q[1].toFixed(1)).join(" ");
  const alerts = ["RSI cross ↑ · XAUUSD", "Breakout · BTCUSD", "MACD cross · NAS100"];
  const html = `
  <div class="tvWrap">
    <div class="tvChart">
      <div class="tvBar"><div class="tvLg">${LOGO("tradingview")}</div><span class="tvSym">XAUUSD · 1h</span><span class="tvPine mono">${tr("My RSI Strategy")} · Pine</span></div>
      <svg viewBox="0 0 ${W} ${H}" class="tvSvg">${[1, 2, 3].map((k) => `<line x1="0" x2="${W}" y1="${(H * k) / 4}" y2="${(H * k) / 4}" stroke="rgba(255,255,255,.06)"/>`).join("")}${candles}<path class="tvInd" d="${ind}" fill="none" stroke="#7C3AED" stroke-width="3"/></svg>
    </div>
    <div class="tvAlerts">${alerts.map((a, k) => `<div class="tvAl tva${k}"><span class="bell">🔔</span><span>${tr("Alert")} · ${a}</span><span class="tvOrd mono">→ ${tr("ORDER")} ✓</span></div>`).join("")}</div>
    ${mascot("mTV")}
  </div>
  ${hero(o.l1, o.l2)}`;
  const js = `(function(){const i=${n - 1};${heroJs(n)}
  tl.fromTo("#s${n} .tvChart",{y:80,opacity:0,scale:.94},{y:0,opacity:1,scale:1,duration:.4,ease:"back.out(1.8)"},at(i,0));
  draw("#s${n} .tvInd",i,.1,.8);
  [0,1,2].forEach(k=>tl.fromTo("#s${n} .tva"+k,{x:420,opacity:0},{x:0,opacity:1,duration:.3,ease:"back.out(2)"},at(i,.45+k*.22)));
  [0,1,2].forEach(k=>tl.fromTo("#s${n} .tva"+k+" .tvOrd",{scale:.4,opacity:0},{scale:1,opacity:1,duration:.22,ease:"back.out(3)"},at(i,1.25+k*.12)));
  const m=q("#s${n} .mTV");tl.fromTo(m,{x:-900},{x:0,duration:1.1,ease:"power2.out"},at(i,.2));walk(m,i,0,D[i]);})();`;
  return { html, js, sfx: [...heroSfx(), ["notification", 0.45, 0.22, 0.6], ["ping", 0.67, 0.22, 0.5], ["ping", 0.89, 0.22, 0.5], ["pop", 1.25, 0.3, 0.5], ["pop", 1.37, 0.3, 0.5], ["pop", 1.49, 0.3, 0.5]], min: 2.4, card: false, labels: false };
}

// ---------- 1c. hook: prop firm challenge failed ----------
export function hookProp(n, o) {
  const html = `
  <div class="stage propHookStage"><div class="card phCard">
    <div class="phTop"><div class="h2">${tr("100K Challenge")}</div><div class="pill mono">${tr("PHASE 1")}</div></div>
    <div class="phRow"><span>${tr("Profit target")}</span><b>${tr("+7.8% / 10%")}</b></div>
    <div class="phBar"><div class="phFill"></div></div>
    <div class="phRow danger"><span>${tr("Daily loss limit")}</span><b class="phDL">${tr("−5.2% / 5%")}</b></div>
    <div class="phBar red"><div class="phFill2"></div></div>
    <div class="stamp" data-layout-allow-overlap>${tr("FAILED")}</div>
    ${mascot("onCard")}
  </div></div>
  <div class="redFlash"></div>
  ${hero(o.l1, o.l2)}`;
  const js = `(function(){const i=${n - 1};${heroJs(n)}
  rise("#s${n} .phCard",i,0,120);
  tl.fromTo("#s${n} .phFill",{scaleX:0},{scaleX:.78,duration:.6,ease:"power2.out"},at(i,.2));
  tl.fromTo("#s${n} .phFill2",{scaleX:0},{scaleX:1,duration:.7,ease:"power2.in"},at(i,.3));
  tl.fromTo("#s${n} .stamp",{scale:2.6,opacity:0,rotation:-24},{scale:1,opacity:1,rotation:-12,duration:.22,ease:"power4.in"},at(i,1.05));
  shake("#s${n} .cam",at(i,1.27),18,6);
  tl.fromTo("#s${n} .redFlash",{opacity:.5},{opacity:0,duration:.4,immediateRender:false},at(i,1.27));
  mascotOnCard(i,.3);})();`;
  return { html, js, sfx: [...heroSfx(), ["error", 1.0, 0.35, 1.0], ["glitch-1", 1.25, 0.32, 1.0]], min: 2.4, card: false, labels: false };
}

// ---------- 2. connect cubrik to Claude ----------
export function connect(n, o = {}) {
  const html = `
  <div class="stage"><div class="card win s2card">
    <div class="titlebar"><i></i><i></i><i></i><span class="mono">CONNECTORS</span></div>
    <div class="s2body">
      ${claudeTile("s2a")}
      <svg class="link" viewBox="0 0 300 160"><path class="linkPath" d="M10 120 C 80 10, 220 10, 290 120" fill="none" stroke="#7C3AED" stroke-width="7" stroke-linecap="round"/><circle class="ld1" cx="10" cy="120" r="10" fill="#7C3AED"/><circle class="ld2" cx="290" cy="120" r="10" fill="#7C3AED"/></svg>
      ${cubrikTile("s2b")}
    </div>
    <div class="s2foot"><div class="badge ok s2badge">✓ Connected</div></div>
    ${mascot("onCard")}
  </div></div>
  ${labels(o.l1 || "CONNECT CUBRIK", o.l2 || "TO CLAUDE")}`;
  const js = `(function(){const i=${n - 1};
  rise("#s${n} .s2card",i,0);bounce("#s${n} .s2a",i,.12);bounce("#s${n} .s2b",i,.22);
  draw("#s${n} .linkPath",i,.48,.4);pop("#s${n} .ld1",i,.45);pop("#s${n} .ld2",i,.86);
  tl.fromTo("#s${n} .s2a,#s${n} .s2b",{scale:1},{scale:1.08,duration:.12,yoyo:true,repeat:1,ease:"power2.out"},at(i,.9));
  pop("#s${n} .s2badge",i,1.0,.3);mascotOnCard(i,.3);labels(${n});})();`;
  return { html, js, sfx: [["pop", 0.14, 0.22, 0.5], ["pop", 0.26, 0.22, 0.5], ["ping", 1.0, 0.3]], min: 1.7 };
}

// ---------- 3. YouTube video, copy link ----------
export function ytCopy(n, o) {
  const tap = o.tap ?? 0.95;
  const html = `
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
  ${labels(o.l1, o.l2)}`;
  const js = `(function(){const i=${n - 1};
  rise("#s${n} .vcard",i,0,200);
  tl.fromTo("#s${n} .thumbImg",{scale:1.15},{scale:1,duration:D[i],ease:"power1.out"},at(i,0));
  tl.fromTo("#s${n} .thumbTitle",{x:-60,opacity:0},{x:0,opacity:1,duration:.3,ease:"back.out(2)"},at(i,.18));
  tl.fromTo("#s${n} .ytPlay",{scale:.3,opacity:0},{scale:1,opacity:1,duration:.3,ease:"back.out(3)"},at(i,.25));
  tap("#s${n} .hand","#s${n} .copy",i,${tap});
  tl.set("#s${n} .copy",{backgroundColor:"#7C3AED",color:"#fff",borderColor:"#7C3AED"},at(i,${tap + 0.05}));
  tl.set("#s${n} .cp1",{opacity:0},at(i,${tap + 0.05}));tl.set("#s${n} .cp2",{opacity:1},at(i,${tap + 0.05}));
  tl.fromTo("#s${n} .toast",{y:40,opacity:0,scale:.8},{y:0,opacity:1,scale:1,duration:.28,ease:"back.out(2.6)"},at(i,${tap + 0.1}));
  mascotOnCard(i,.3);labels(${n});})();`;
  return { html, js, sfx: [["click", tap, 0.6], ["ping", tap + 0.1, 0.25]], min: 1.8 };
}

// ---------- 4. paste in Claude -> analyze -> rules (-> agent created) ----------
export const GOLD_RULES = [
  ["MARKET", "XAU/USD · 1 hour"],
  ["ENTRY", "RSI < 30 + bullish engulfing"],
  ["EXIT", "Take profit 2R · stop below low"],
  ["RISK", "1% per trade"],
];
export function chatAnalyze(n, o) {
  const E = { paste: 0.25, send: 0.52, steps: [0.95, 1.1, 1.25], rules: 1.45, loop: 2.3, agent: null, ...o };
  const html = `
  <div class="stage"><div class="card s5card">
    ${chatHead()}
    <div class="bubbleRow"><div class="linkBubble"><img src="assets/img/thumb.jpg" alt=""><div><div class="lbT">My 1H Gold Strategy That Actually Works</div><div class="lbU">youtube.com/watch?v=gold-1h</div></div></div></div>
    <div class="analyze">
      <div class="anHead"><span class="spin"></span><span class="anTxt">cubrik is watching the video…</span><span class="anDone">✓ Video analyzed · 14:32</span></div>
      <div class="steps"><span class="st sA">✓ Transcript</span><span class="st sB">✓ Chart patterns</span><span class="st sC">✓ Rules</span></div>
    </div>
    <div class="rules">
    ${GOLD_RULES.map(
      ([k, v], i) => `<div class="rule r${i}"><div class="rk mono">${k}</div><div class="rv">${chars(v)}</div>${
        i === 1 ? `<svg class="loop" viewBox="0 0 860 110"><path class="loopPath" d="M470 8 C 700 2, 856 20, 853 55 C 850 92, 690 106, 430 105 C 170 104, 8 92, 7 55 C 6 20, 180 3, 540 13" fill="none" stroke="#7C3AED" stroke-width="5" stroke-linecap="round"/></svg>` : ""
      }</div>`,
    ).join("")}
    </div>
    ${E.agent ? `<div class="agentBar"><div class="agChk">✓</div><div class="agTx"><div class="agT">Agent created</div><div class="mono xs">GOLD RSI SCALPER · READY TO BACKTEST</div></div><div class="agBtn">Open</div></div>` : ""}
    <div class="composer"><div class="cmpIn"><span class="ph">Reply to Claude…</span><span class="pasted">${LOGO("youtube")}youtube.com/watch?v=gold-1h</span></div><div class="send">↑</div></div>
    <div class="keycap mono">⌘ V</div>
    ${mascot("onCard")}
  </div></div>
  ${labels(o.l1, o.l2)}`;
  const js = `(function(){const i=${n - 1},s="#s${n} ";
  rise(s+".s5card",i,0);
  tl.fromTo(s+".keycap",{scale:.4,opacity:0,y:20},{scale:1,opacity:1,y:0,duration:.18,ease:"back.out(3)"},at(i,${E.paste - 0.1}));
  tl.to(s+".keycap",{scale:.88,duration:.05,yoyo:true,repeat:1},at(i,${E.paste - 0.04}));
  tl.to(s+".keycap",{opacity:0,y:-20,duration:.18},at(i,${E.paste + 0.18}));
  tl.set(s+".ph",{opacity:0},at(i,${E.paste}));
  tl.fromTo(s+".pasted",{opacity:0,scale:.85},{opacity:1,scale:1,duration:.2,ease:"back.out(2.5)"},at(i,${E.paste}));
  tl.fromTo(s+".cmpIn",{backgroundColor:"#EDE9FE"},{backgroundColor:"#F8F4ED",duration:.4,immediateRender:false},at(i,${E.paste}));
  tl.to(s+".send",{scale:.82,duration:.06,yoyo:true,repeat:1},at(i,${E.send}));
  tl.set(s+".pasted",{opacity:0},at(i,${E.send + 0.06}));tl.set(s+".ph",{opacity:1},at(i,${E.send + 0.06}));
  tl.fromTo(s+".linkBubble",{y:120,scale:.8,opacity:0},{y:0,scale:1,opacity:1,duration:.32,ease:"back.out(2.2)",transformOrigin:"right bottom"},at(i,${E.send + 0.06}));
  tl.fromTo(s+".analyze",{opacity:0,y:30},{opacity:1,y:0,duration:.25,ease:"back.out(2)"},at(i,.8));
  tl.fromTo(s+".spin",{rotation:0},{rotation:720,duration:.6,ease:"none"},at(i,.8));
  ${JSON.stringify(E.steps)}.forEach((t,k)=>tl.fromTo(s+".s"+"ABC"[k],{scale:.5,opacity:0},{scale:1,opacity:1,duration:.2,ease:"back.out(3)"},at(i,t)));
  tl.set(s+".spin,"+s+".anTxt",{opacity:0},at(i,${E.rules - 0.07}));
  tl.fromTo(s+".anDone",{opacity:0,x:-10},{opacity:1,x:0,duration:.18},at(i,${E.rules - 0.07}));
  [0,1,2,3].forEach(k=>{const t=${E.rules}+k*.16;tl.fromTo(s+".r"+k,{opacity:0,x:-30},{opacity:1,x:0,duration:.16},at(i,t));type(s+".r"+k+" .rv",i,t+.04,130);});
  draw(s+".loopPath",i,${E.loop},.34);
  ${E.agent ? `tl.fromTo(s+".agentBar",{y:60,scale:.8,opacity:0},{y:0,scale:1,opacity:1,duration:.32,ease:"back.out(2.6)"},at(i,${E.agent}));` : ""}
  mascotOnCard(i,.3);labels(${n});})();`;
  const sfx = [
    ["key-press", E.paste - 0.04, 0.7], ["click", E.send, 0.5], ["pop", E.send + 0.08, 0.3, 0.5],
    ...E.steps.map((t) => ["click-soft", t, 0.35, 0.3]), ["typing", E.rules, 0.22, 0.85], ["whoosh", E.loop - 0.1, 0.18],
    ...(E.agent ? [["sparkle", E.agent, 0.32], ["ping", E.agent + 0.02, 0.3]] : []),
  ];
  return { html, js, sfx, min: E.agent ? 3.6 : 2.9 };
}

// ---------- 5. Claude asks what the video forgot ----------
export function clarify(n, o) {
  const QS = o.qs || [
    ["Which session?", ["London", "New York", "Both"], 0],
    ["Max trades per day?", ["1", "2", "3"], 1],
    ["News days?", ["Trade", "Skip"], 1],
  ];
  const t0 = 0.55, dt = 0.42;
  const html = `
  <div class="stage"><div class="card s5card clCard">
    ${chatHead()}
    <div class="reply"><div class="avatar">${CUBE}</div><div class="clIntro">${tr("The video skips 3 things. Quick check:")}</div></div>
    <div class="qList">
      ${QS.map(
        ([qt, opts, pick], k) => `<div class="qRow q${k}"><div class="qT">${tr(qt)}</div><div class="qOpts">${opts
          .map((op, j) => `<span class="qo${j === pick ? " qPick" : ""}">${tr(op)}${j === pick ? '<span class="qHand" data-layout-allow-overlap>👆</span>' : ""}</span>`)
          .join("")}</div></div>`,
      ).join("")}
    </div>
    <div class="clDone">✓ ${tr("Strategy complete · 7 rules")}</div>
    ${mascot("onCard")}
  </div></div>
  ${labels(o.l1, o.l2)}`;
  const js = `(function(){const i=${n - 1},s="#s${n} ";
  rise(s+".clCard",i,0);
  tl.fromTo(s+".clIntro",{opacity:0,x:-20},{opacity:1,x:0,duration:.25},at(i,.2));
  [0,1,2].forEach(k=>slideIn(s+".q"+k,i,.32+k*.08));
  [0,1,2].forEach(k=>{const t=${t0}+k*${dt}+.3;
    tl.to(s+".q"+k+" .qPick",{backgroundColor:"#7C3AED",color:"#fff",borderColor:"#7C3AED",scale:1.08,duration:.12},at(i,t));
    tl.to(s+".q"+k+" .qPick",{scale:1,duration:.15},at(i,t+.12));});
  [0,1,2].forEach(k=>{const t=${t0}+k*${dt}+.3,h=s+".q"+k+" .qHand";
    tl.fromTo(h,{opacity:0,x:60,y:60},{opacity:1,x:0,y:0,duration:.2,ease:"power3.out"},at(i,t-.24));
    tl.to(h,{scale:.82,duration:.06,yoyo:true,repeat:1},at(i,t-.02));
    tl.to(h,{opacity:0,duration:.15},at(i,t+.2));});
  tl.fromTo(s+".clDone",{scale:.6,opacity:0},{scale:1,opacity:1,duration:.28,ease:"back.out(3)"},at(i,${t0 + 2 * dt + 0.55}));
  mascotOnCard(i,.3);labels(${n});})();`;
  return {
    html, js,
    sfx: [[`pop`, 0.2, 0.25, 0.5], ...[0, 1, 2].map((k) => ["click", t0 + k * dt + 0.3, 0.5]), ["ping", t0 + 2 * dt + 0.55, 0.3]],
    min: 2.6,
  };
}

// ---------- backtest ----------
function equity() {
  const r = rng(42), w = 800, h = 340, pts = [];
  let v = 0;
  for (let i = 0; i <= 90; i++) {
    let drift = 0.9;
    if (i > 28 && i < 36) drift = -1.6;
    if (i > 60 && i < 66) drift = -1.2;
    v += drift + (r() - 0.5) * 3.2;
    pts.push(v);
  }
  const min = Math.min(...pts), max = Math.max(...pts);
  const d = pts.map((p, i) => (i ? "L" : "M") + ((i / 90) * w).toFixed(1) + " " + (h - 20 - ((p - min) / (max - min)) * (h - 50)).toFixed(1)).join(" ");
  return { d, area: d + ` L${w} ${h} L0 ${h} Z`, w, h };
}
const EQ = equity();
export function backtest(n, o) {
  const stats = o.stats || [["WIN RATE", "61%"], ["PROFIT FACTOR", "1.8"], ["NET PROFIT", "+38.4%", "pos"]];
  const html = `
  <div class="stage"><div class="card s7card">
    <div class="s7head"><div><div class="h2">Backtest</div><div class="mono small">${tr(o.sub || "5 YEARS · FEES INCLUDED")}</div></div><div class="tvBadge"><div class="tvIco">${LOGO("tradingview")}</div><div><div class="tvTop mono">${tr("DATA VIA")}</div><div class="tvName">TradingView API</div></div></div></div>
    <svg class="eq" viewBox="0 0 ${EQ.w} ${EQ.h}">
      <defs>
        <linearGradient id="eqg${n}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7C3AED" stop-opacity=".32"/><stop offset="1" stop-color="#7C3AED" stop-opacity="0"/></linearGradient>
        <clipPath id="eqc${n}"><rect class="eqClip" x="0" y="0" width="${EQ.w}" height="${EQ.h}"/></clipPath>
      </defs>
      ${[1, 2, 3].map((k) => `<line x1="0" x2="${EQ.w}" y1="${(EQ.h * k) / 4}" y2="${(EQ.h * k) / 4}" stroke="#EFE8DC" stroke-width="2"/>`).join("")}
      <g clip-path="url(#eqc${n})"><path d="${EQ.area}" fill="url(#eqg${n})"/><path d="${EQ.d}" fill="none" stroke="#7C3AED" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/></g>
    </svg>
    <div class="years mono xs"><span>2021</span><span>2022</span><span>2023</span><span>2024</span><span>2025</span></div>
    <div class="stats">${stats.map(([k, v, c], j) => `<div class="stat st${j}"><div class="mono xs">${tr(k)}</div><div class="sv ${c || ""}">${tr(v)}</div></div>`).join("")}</div>
    ${mascot("onCard")}
  </div></div>
  ${labels(o.l1, o.l2)}`;
  const js = `(function(){const i=${n - 1};
  rise("#s${n} .s7card",i,0);
  tl.fromTo("#s${n} .eqClip",{attr:{width:0}},{attr:{width:${EQ.w}},duration:1.0,ease:"power2.inOut"},at(i,.22));
  [1.25,1.4,1.55].forEach((t,k)=>tl.fromTo("#s${n} .st"+k,{scale:.4,opacity:0,y:30},{scale:1,opacity:1,y:0,duration:.28,ease:"back.out(3)"},at(i,t)));
  mascotOnCard(i,.3);labels(${n});})();`;
  return { html, js, sfx: [["pop", 1.25, 0.26, 0.5], ["pop", 1.4, 0.26, 0.5], ["pop", 1.55, 0.26, 0.5]], min: 2.4 };
}

// ---------- agent live + notification ----------
export function live(n, o) {
  const notif = o.notif ?? 2.2;
  const CLOCK = Array.from({ length: 22 }, (_, k) => `02:${String(14 + k).padStart(2, "0")}`);
  const html = `
  <div class="stage"><div class="card s8card">
    <div class="s8top"><div class="dotWrap"><div class="dotRing"></div><div class="dot"></div></div><div class="h2">${tr(o.title || "Gold RSI Scalper")}</div><div class="live mono">LIVE</div></div>
    <div class="mono small">${tr(o.sub || "RUNS 24/7 ON METATRADER 5")}</div>
    <div class="clockRow"><div class="moon">🌙</div><div class="clock">${CLOCK.map((c, k) => `<span class="ck ck${k}">${c}</span>`).join("")}</div></div>
    <div class="asleep">${tr("you're asleep")}</div>
    <div class="s8foot mono xs"><span>${tr(o.foot || "XAU/USD · GOLD")}</span><span class="pnl">${tr(o.pnl || "+$1,385.38")}</span></div>
    ${mascot("onCard")}
  </div></div>
  <div class="goldFlash"></div>
  <div class="notif">
    <div class="nIco">${CUBE}</div>
    <div class="nTxt"><div class="nTop"><span>cubrik</span><span class="nNow">now</span></div>
      <div class="nMain">${tr(o.main || "💰 Take profit hit: +$1,385.38")}</div>
      <div class="nSub">${tr(o.nsub || "Gold RSI Scalper closed XAU/USD (+2R)")}</div></div>
  </div>
  ${labels(o.l1, o.l2)}`;
  const js = `(function(){const i=${n - 1},s="#s${n} ";
  rise(s+".s8card",i,0);
  tl.fromTo(s+".dotRing",{scale:1,opacity:.5},{scale:2.6,opacity:0,duration:.7,repeat:Math.max(0,Math.floor(D[i]/.7)-1),ease:"power1.out"},at(i,0));
  const ck=qa(s+".ck"),step=(D[i]-.3)/(ck.length-1);
  ck.forEach((c,k)=>{if(!k)return;tl.set(ck[k-1],{opacity:0},at(i,.2+k*step));tl.set(c,{opacity:1},at(i,.2+k*step));});
  tl.fromTo(s+".notif",{y:-320,opacity:0},{y:0,opacity:1,duration:.38,ease:"back.out(1.7)"},at(i,${notif}));
  tl.fromTo(s+".pnl",{opacity:0,scale:.5},{opacity:1,scale:1,duration:.26,ease:"back.out(3)"},at(i,${notif + 0.25}));
  shake(s+".cam",at(i,${notif + 0.24}),10,5);
  tl.fromTo(s+".goldFlash",{opacity:.4},{opacity:0,duration:.4,immediateRender:false},at(i,${notif + 0.25}));
  mascotOnCard(i,.3);labels(${n});})();`;
  return { html, js, sfx: [["take_profit", notif + 0.25, 0.95]], min: Math.max(3.2, notif + 1.4) };
}

// ---------- confirm before live ----------
export function confirm(n, o) {
  const t = o.tap ?? 1.05;
  const html = `
  <div class="stage"><div class="card s9card">
    <div class="s9head"><div class="blogo img" style="background:#fff">${LOGO("mt5", "png")}</div><div class="h2">${tr(o.title || "Launch on MetaTrader?")}</div></div>
    <div class="s9txt"><div>${tr(o.line1 || "Real money · 1% risk per trade")}</div><div><span class="green">✓</span> ${tr(o.line2 || "Stop loss always on")}</div></div>
    <div class="btns"><div class="btn cancel">Cancel</div><div class="btn confirm"><span class="bt1">Confirm</span><span class="bt2">Live ✓</span><div class="ripple"></div></div></div>
    <div class="hand" data-layout-allow-overlap>👆</div>
    ${mascot("onCard")}
  </div></div>
  ${labels(o.l1, o.l2)}`;
  const js = `(function(){const i=${n - 1},s="#s${n} ";
  rise(s+".s9card",i,0);
  tap(s+".hand",s+".confirm",i,${t});
  tl.set(s+".confirm",{backgroundColor:"#16A34A"},at(i,${t + 0.05}));
  tl.set(s+".bt1",{opacity:0},at(i,${t + 0.05}));
  tl.fromTo(s+".bt2",{opacity:0,scale:.5},{opacity:1,scale:1,duration:.24,ease:"back.out(3)"},at(i,${t + 0.05}));
  tl.fromTo(s+".ripple",{scale:0,opacity:.7},{scale:10,opacity:0,duration:.4,ease:"power2.out"},at(i,${t}));
  mascotOnCard(i,.3);labels(${n});})();`;
  return { html, js, sfx: [["click", t, 0.6], ["ping", t + 0.08, 0.28]], min: 2.2 };
}

// ---------- end card ----------
export function endCard(n, o) {
  const word = o.word || "CLAUDE";
  const q = LANG === "fr" ? `« ${word} »` : `“${word}”`;
  const size = Math.min(100, Math.floor(720 / (q.length * 0.66)));
  const html = `
  <div class="endWrap">
    <div class="card endCard">
      <div class="cmt">Comment</div>
      <div class="cpill" style="font-size:${size}px">${q}</div>
      <div class="setup serif">${tr(o.sub || "&amp; I'll send you the setup")}</div>
      ${mascot("onCard")}
    </div>
    <div class="pair">${cubrikTile("sm")}<div class="x">×</div>${claudeTile("sm")}</div>
    <div class="works mono">CUBRIK WORKS WITH CLAUDE</div>
  </div>
  <div class="walkRow"><div class="walkStrip">${Array.from({ length: 12 }, () => mascot("w")).join("")}</div></div>`;
  const js = `(function(){const i=${n - 1},s="#s${n} ";
  tl.fromTo(s+".endCard",{scale:1.6,rotation:-14,opacity:0},{scale:1,rotation:-3,opacity:1,duration:.4,ease:"expo.out"},at(i,.02));
  shake(s+".cam",at(i,.2),12,5);
  pop(s+".cpill",i,.34,.3);
  tl.fromTo(s+".cpill",{rotation:-6},{rotation:0,duration:.4,ease:"back.out(3)"},at(i,.34));
  tl.fromTo(s+".setup",{opacity:0,y:30},{opacity:1,y:0,duration:.3,ease:"back.out(2.2)"},at(i,.55));
  bounce(s+".pair",i,.8);
  tl.fromTo(s+".works",{opacity:0,y:12},{opacity:1,y:0,duration:.25},at(i,1.0));
  mascotOnCard(i,.6);
  tl.fromTo(s+".walkStrip",{x:-1080},{x:-1080+D[i]*190,duration:D[i],ease:"none"},at(i,0));
  qa(s+".w").forEach(w=>walk(w,i,0,D[i],.14));})();`;
  return { html, js, sfx: [["pop", 0.36, 0.3, 0.5], ["sparkle", 0.6, 0.25]], min: 3.4, card: false, labels: false };
}

// ---------- TradingView: Claude gives a webhook ----------
export function tvWebhook(n, o) {
  const msg = o.msg || "hook my TradingView alerts to an agent";
  const html = `
  <div class="stage"><div class="card s3card whCard">
    ${chatHead()}
    <div class="bubbleRow"><div class="uBubble">${chars(msg)}<span class="cursor"></span></div></div>
    <div class="reply"><div class="avatar">${CUBE}</div>
      <div class="replyCard">
        <div class="replyTitle">${tr("Done. Paste this webhook in your alert:")}</div>
        <div class="whUrl"><span class="mono">hooks.cubrik.ai/a/gold-rsi</span><span class="whCopy"><span class="wc1">${tr("Copy")}</span><span class="wc2">✓</span></span></div>
        <div class="whSteps">
          <div class="whs w0"><b>1</b>${tr("Open your alert")}</div>
          <div class="whs w1"><b>2</b>${tr("Notifications → Webhook URL")}</div>
          <div class="whs w2"><b>3</b>${tr("Save. That's it.")}</div>
        </div>
      </div>
    </div>
    <div class="hand hwh" data-layout-allow-overlap>👆</div>
    ${mascot("onCard")}
  </div></div>
  ${labels(o.l1, o.l2)}`;
  const tap = 1.75;
  const js = `(function(){const i=${n - 1},s="#s${n} ";
  rise(s+".whCard",i,0);
  tl.fromTo(s+".uBubble",{scale:.7,opacity:0},{scale:1,opacity:1,duration:.24,ease:"back.out(2.6)",transformOrigin:"right center"},at(i,.08));
  const e=type(s+".uBubble",i,.12,60);tl.set(s+".uBubble .cursor",{opacity:0},at(i,e+.06));
  rise(s+".reply",i,e+.12,70);
  tl.fromTo(s+".whUrl",{scale:.85,opacity:0},{scale:1,opacity:1,duration:.26,ease:"back.out(2.4)"},at(i,e+.3));
  [0,1,2].forEach(k=>slideIn(s+".w"+k,i,e+.45+k*.1));
  tap(s+".hand",s+".whCopy",i,${tap});
  tl.set(s+".wc1",{opacity:0},at(i,${tap + 0.05}));tl.set(s+".wc2",{opacity:1},at(i,${tap + 0.05}));
  tl.set(s+".whCopy",{backgroundColor:"#16A34A"},at(i,${tap + 0.05}));
  mascotOnCard(i,.3);labels(${n});})();`;
  return { html, js, sfx: [["typing", 0.12, 0.3, 0.6], ["pop", 1.0, 0.25, 0.5], ["click", tap, 0.6], ["ping", tap + 0.08, 0.25]], min: 2.6 };
}

// ---------- TradingView: create alert dialog with the webhook ----------
export function tvAlert(n, o) {
  const html = `
  <div class="stage"><div class="tvDlg">
    <div class="tvdHead"><div class="tvLg">${LOGO("tradingview")}</div><span>${tr("Create alert on XAUUSD")}</span><span class="x2">✕</span></div>
    <div class="tvdRow"><div class="tvdK">${tr("Condition")}</div><div class="tvdV">${tr("My RSI Strategy")} · ${tr("order fills")}</div></div>
    <div class="tvdRow"><div class="tvdK">${tr("Notifications")}</div><div class="tvdV"><span class="cbx">✓</span> Webhook URL</div></div>
    <div class="tvdField"><span class="tvdPh">https://</span><span class="tvdUrl mono">${chars("hooks.cubrik.ai/a/gold-rsi")}</span></div>
    <div class="tvdRow"><div class="tvdK">${tr("Message")}</div><div class="tvdV mono tvdMsg">{"action":"{{strategy.order.action}}"}</div></div>
    <div class="pineOk">✓ ${tr("Pine script unchanged")}</div>
    <div class="tvdBtns"><div class="tvdCancel">${tr("Cancel")}</div><div class="tvdCreate"><span class="tc1">${tr("Create")}</span><span class="tc2">✓ ${tr("Created")}</span></div></div>
    <div class="hand htv" data-layout-allow-overlap>👆</div>
    ${mascot("onCard")}
  </div></div>
  ${labels(o.l1, o.l2)}`;
  const paste = 0.55, tap = 1.75;
  const js = `(function(){const i=${n - 1},s="#s${n} ";
  rise(s+".tvDlg",i,0);
  tl.set(s+".tvdPh",{opacity:0},at(i,${paste}));
  qa(s+".tvdUrl .ch").forEach(c=>tl.set(c,{display:"inline"},at(i,${paste})));
  tl.fromTo(s+".tvdField",{backgroundColor:"#3b2a6b"},{backgroundColor:"#1e222d",duration:.5,immediateRender:false},at(i,${paste}));
  tl.fromTo(s+".pineOk",{scale:.6,opacity:0},{scale:1,opacity:1,duration:.26,ease:"back.out(3)"},at(i,1.0));
  tap(s+".hand",s+".tvdCreate",i,${tap});
  tl.set(s+".tc1",{opacity:0},at(i,${tap + 0.05}));tl.set(s+".tc2",{opacity:1},at(i,${tap + 0.05}));
  tl.set(s+".tvdCreate",{backgroundColor:"#16A34A"},at(i,${tap + 0.05}));
  mascotOnCard(i,.3);labels(${n});})();`;
  return { html, js, sfx: [["key-press", paste - 0.03, 0.7], ["ping", 1.0, 0.25], ["click", tap, 0.6]], min: 2.6 };
}

// ---------- TradingView: alert -> cubrik -> broker in under a second ----------
export function tvFlow(n, o) {
  const html = `
  <div class="stage"><div class="card flowCard">
    <div class="fNode fn0"><div class="fIco tvI">${LOGO("tradingview")}</div><div><div class="fT">${tr("TradingView alert")}</div><div class="mono xs">RSI cross ↑ · XAUUSD</div></div><span class="fTime mono">0.0 s</span></div>
    <div class="fLine fl0"><div class="fDot"></div></div>
    <div class="fNode fn1"><div class="fIco cbI">${CUBE}</div><div><div class="fT">${tr("cubrik agent")}</div><div class="mono xs">${tr("risk checked · size 0.5 lot")}</div></div><span class="fTime mono">0.3 s</span></div>
    <div class="fLine fl1"><div class="fDot"></div></div>
    <div class="fNode fn2"><div class="fIco mtI">${LOGO("mt5", "png")}</div><div><div class="fT">${tr("Order placed")}</div><div class="mono xs">XAU/USD · LONG · SL/TP ${tr("set")}</div></div><span class="fTime mono fOk">0.8 s ✓</span></div>
    ${mascot("onCard")}
  </div></div>
  ${labels(o.l1, o.l2)}`;
  const js = `(function(){const i=${n - 1},s="#s${n} ";
  rise(s+".flowCard",i,0);
  [0,1,2].forEach(k=>{const t=.25+k*.45;slideIn(s+".fn"+k,i,t,-80);
    tl.fromTo(s+".fn"+k+" .fTime",{opacity:0,scale:.6},{opacity:1,scale:1,duration:.2,ease:"back.out(3)"},at(i,t+.15));
    if(k<2){tl.fromTo(s+".fl"+k+" .fDot",{y:0,opacity:1},{y:70,duration:.3,ease:"power2.in"},at(i,t+.15));}});
  tl.to(s+".fn2",{borderColor:"#86EFAC",backgroundColor:"#F0FDF4",duration:.15},at(i,1.2));
  tl.fromTo(s+".fn2",{scale:1},{scale:1.05,duration:.1,yoyo:true,repeat:1},at(i,1.2));
  mascotOnCard(i,.3);labels(${n});})();`;
  return { html, js, sfx: [["pop", 0.25, 0.25, 0.5], ["whoosh", 0.45, 0.2], ["pop", 0.7, 0.25, 0.5], ["whoosh", 0.9, 0.2], ["ping", 1.2, 0.35]], min: 2.4 };
}

// ---------- guardrails toggles ----------
export function guardrails(n, o) {
  const rows = o.rows || [
    ["Stop loss on every order", "ON"],
    ["Max loss per day", "−3%"],
    ["One position per asset", "ON"],
  ];
  const html = `
  <div class="stage"><div class="card grCard">
    <div class="grHead"><span class="shield">🛡</span><div class="h2">${tr(o.title || "Guardrails")}</div></div>
    ${rows.map(([k, v], j) => `<div class="grRow gr${j}"><span>${tr(k)}</span><span class="grV mono">${tr(v)}</span><span class="tog"><i></i></span></div>`).join("")}
    <div class="grFoot mono xs">${tr(o.foot || "STOPS SIT ON YOUR BROKER · ALWAYS ON")}</div>
    ${mascot("onCard")}
  </div></div>
  ${labels(o.l1, o.l2)}`;
  const js = `(function(){const i=${n - 1},s="#s${n} ";
  rise(s+".grCard",i,0);
  [0,1,2].forEach(k=>{const t=.3+k*.3;slideIn(s+".gr"+k,i,t);
    tl.to(s+".gr"+k+" .tog",{backgroundColor:"#16A34A",duration:.15},at(i,t+.25));
    tl.to(s+".gr"+k+" .tog i",{x:38,duration:.18,ease:"back.out(2)"},at(i,t+.25));});
  tl.fromTo(s+".grFoot",{opacity:0,y:10},{opacity:1,y:0,duration:.25},at(i,1.35));
  mascotOnCard(i,.3);labels(${n});})();`;
  return { html, js, sfx: [["click-soft", 0.55, 0.45, 0.3], ["click-soft", 0.85, 0.45, 0.3], ["click-soft", 1.15, 0.45, 0.3]], min: 2.2 };
}

// ---------- prop firm: Claude sets the challenge rules ----------
export function propRules(n, o) {
  const msg = o.msg || "I'm on a 100k prop firm challenge";
  const rules = [
    ["Max daily loss", "5%"],
    ["Max total drawdown", "10%"],
    ["Profit target", "10%"],
    ["Min trading days", "4"],
  ];
  const html = `
  <div class="stage"><div class="card s3card prCard">
    ${chatHead()}
    <div class="bubbleRow"><div class="uBubble">${chars(msg)}<span class="cursor"></span></div></div>
    <div class="reply"><div class="avatar">${CUBE}</div>
      <div class="replyCard">
        <div class="replyTitle">${tr("Rules locked on all your agents:")}</div>
        ${rules.map(([k, v], j) => `<div class="prRow pr${j}"><span class="lock">🔒</span><span class="prK">${tr(k)}</span><b class="prV">${tr(v)}</b></div>`).join("")}
      </div>
    </div>
    ${mascot("onCard")}
  </div></div>
  ${labels(o.l1, o.l2)}`;
  const js = `(function(){const i=${n - 1},s="#s${n} ";
  rise(s+".prCard",i,0);
  tl.fromTo(s+".uBubble",{scale:.7,opacity:0},{scale:1,opacity:1,duration:.24,ease:"back.out(2.6)",transformOrigin:"right center"},at(i,.08));
  const e=type(s+".uBubble",i,.12,60);tl.set(s+".uBubble .cursor",{opacity:0},at(i,e+.06));
  rise(s+".reply",i,e+.12,70);
  [0,1,2,3].forEach(k=>{const t=e+.35+k*.2;slideIn(s+".pr"+k,i,t);
    tl.fromTo(s+".pr"+k+" .lock",{scale:2,opacity:0,rotation:-20},{scale:1,opacity:1,rotation:0,duration:.22,ease:"back.out(3)"},at(i,t+.12));});
  mascotOnCard(i,.3);labels(${n});})();`;
  return { html, js, sfx: [["typing", 0.12, 0.3, 0.55], ["click", 1.15, 0.4], ["click", 1.35, 0.4], ["click", 1.55, 0.4], ["click", 1.75, 0.4]], min: 2.6 };
}

// ---------- prop firm: live gauges ----------
export function propGauges(n, o) {
  const g = [
    ["Daily loss", "1.2% / 5%", 0.24, "#16A34A"],
    ["Total drawdown", "3.4% / 10%", 0.34, "#16A34A"],
    ["Profit target", "7.8% / 10%", 0.78, "#7C3AED"],
  ];
  const html = `
  <div class="stage"><div class="card gCard">
    <div class="gHead"><div class="h2">${tr("Challenge · Day 6")}</div><div class="live mono">LIVE</div></div>
    ${g.map(([k, v, f, c], j) => `<div class="gRow g${j}"><div class="gTop"><span>${tr(k)}</span><b class="mono">${tr(v)}</b></div><div class="gBar"><div class="gFill" style="background:${c};--f:${f}"></div></div></div>`).join("")}
    <div class="gFoot mono xs">${tr("3 AGENTS RUNNING · ALL WITHIN LIMITS")}</div>
    ${mascot("onCard")}
  </div></div>
  ${labels(o.l1, o.l2)}`;
  const js = `(function(){const i=${n - 1},s="#s${n} ";
  rise(s+".gCard",i,0);
  [0,1,2].forEach(k=>{const t=.3+k*.22;slideIn(s+".g"+k,i,t);
    tl.fromTo(s+".g"+k+" .gFill",{scaleX:0},{scaleX:[.24,.34,.78][k],duration:.7,ease:"power2.out"},at(i,t+.1));});
  tl.fromTo(s+".gFoot",{opacity:0},{opacity:1,duration:.25},at(i,1.3));
  mascotOnCard(i,.3);labels(${n});})();`;
  return { html, js, sfx: [["pop", 0.3, 0.2, 0.5], ["pop", 0.52, 0.2, 0.5], ["pop", 0.74, 0.2, 0.5]], min: 2.2 };
}

// ---------- prop firm: order blocked ----------
export function propBlocked(n, o) {
  const html = `
  <div class="stage"><div class="card blCard">
    <div class="blOrder"><div class="mono xs">${tr("NEW ORDER")}</div><div class="blO">XAU/USD · LONG · 2.0 lots</div></div>
    <div class="blCheck"><span class="spin"></span><span>${tr("Checking challenge rules…")}</span></div>
    <div class="blStop">
      <div class="blIco">⛔</div>
      <div><div class="blT">${tr("Order blocked")}</div><div class="blS">${tr("Would push today's loss to 5.4% · limit is 5%")}</div></div>
    </div>
    <div class="blSafe">✓ ${tr("Challenge safe · agents resume tomorrow")}</div>
    ${mascot("onCard")}
  </div></div>
  <div class="redFlash"></div>
  ${labels(o.l1, o.l2)}`;
  const js = `(function(){const i=${n - 1},s="#s${n} ";
  rise(s+".blCard",i,0);
  slideIn(s+".blOrder",i,.2);
  tl.fromTo(s+".blCheck",{opacity:0},{opacity:1,duration:.2},at(i,.45));
  tl.fromTo(s+".blCheck .spin",{rotation:0},{rotation:540,duration:.5,ease:"none"},at(i,.45));
  tl.to(s+".blCheck",{opacity:.35,duration:.15},at(i,.95));
  tl.fromTo(s+".blStop",{scale:1.4,opacity:0},{scale:1,opacity:1,duration:.22,ease:"power4.in"},at(i,.95));
  shake(s+".blCard",at(i,1.17),14,6);
  tl.fromTo(s+".redFlash",{opacity:.45},{opacity:0,duration:.4,immediateRender:false},at(i,1.17));
  tl.set(s+".blO",{textDecoration:"line-through",color:"#E11D48"},at(i,1.17));
  tl.fromTo(s+".blSafe",{y:20,opacity:0},{y:0,opacity:1,duration:.26,ease:"back.out(2.4)"},at(i,1.6));
  mascotOnCard(i,.3);labels(${n});})();`;
  return { html, js, sfx: [["pop", 0.2, 0.25, 0.5], ["error", 1.12, 0.32, 0.9], ["ping", 1.6, 0.25]], min: 2.4 };
}

// ---------- 1d. hook: three monitors bleeding red, then dying (ported from the launch reel) ----------
function fallingPath(seed, w, h) {
  const r = rng(seed);
  let y = h * 0.18;
  const pts = [];
  for (let i = 0; i <= 40; i++) {
    y += (r() - 0.32) * h * 0.06 + (i > 22 ? h * 0.018 : 0);
    y = Math.min(h * 0.92, Math.max(h * 0.1, y));
    pts.push([(i / 40) * w, y]);
  }
  const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  return { d, area: d + ` L${w} ${h} L0 ${h} Z` };
}
function monitor(n, i, w, h, pair, pct) {
  const p = fallingPath(11 + i * 7, w, h - 60);
  return `<div class="mon mon${i}"><div class="bezel"><div class="scr" style="width:${w}px;height:${h}px">
      <div class="scrIn"><div class="scrHead"><span>${pair}</span><span class="neg">${pct}</span></div>
        <svg class="scrChart" viewBox="0 0 ${w} ${h - 60}" width="${w}" height="${h - 60}">
          <defs><linearGradient id="rg${n}_${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E11D48" stop-opacity=".45"/><stop offset="1" stop-color="#E11D48" stop-opacity="0"/></linearGradient></defs>
          ${[1, 2, 3].map((k) => `<line x1="0" x2="${w}" y1="${((h - 60) * k) / 4}" y2="${((h - 60) * k) / 4}" stroke="rgba(255,255,255,.07)"/>`).join("")}
          <path d="${p.area}" fill="url(#rg${n}_${i})"/><path class="redLine" d="${p.d}" fill="none" stroke="#FB3B5C" stroke-width="4" stroke-linejoin="round"/>
        </svg></div><div class="crt"></div></div></div><div class="neck"></div><div class="foot"></div></div>`;
}
export function hookDesk(n, o) {
  const html = `
  <div class="s1wrap">
    <div class="mons">${monitor(n, 1, 215, 165, "ETH/USD", "−9.8%")}${monitor(n, 2, 400, 275, "BTC/USD", "−12.4%")}${monitor(n, 3, 215, 165, "NAS100", "−7.1%")}</div>
    <div class="desk"><div class="deskTop"></div></div>
    ${mascot("m1")}
  </div>
  <div class="redFlash"></div>
  ${hero(o.l1, o.l2, o.strike)}`;
  const js = `(function(){const i=${n - 1},s="#s${n} ";${heroJs(n, o.strike ? 1.2 : 0)}
  shake(s+".cam",at(i,.06),16,6);
  qa(s+".redLine").forEach(p=>{const L=p.getTotalLength();tl.fromTo(p,{strokeDasharray:L,strokeDashoffset:L},{strokeDashoffset:0,duration:.45,ease:"power2.in"},at(i,0));});
  tl.fromTo(s+".mons",{y:60,scale:.9},{y:0,scale:1,duration:.4,ease:"back.out(2)"},at(i,0));
  [.5,.78,1.06].forEach((t,k)=>{const m=s+".mon"+(k+1);
    tl.to(m+" .scrIn",{opacity:.2,duration:.03},at(i,t));tl.to(m+" .scrIn",{opacity:1,duration:.03},at(i,t+.05));
    tl.to(m+" .scrIn",{scaleY:.012,filter:"brightness(4)",duration:.09,ease:"power2.in"},at(i,t+.1));
    tl.set(m+" .crt",{opacity:1},at(i,t+.17));tl.set(m+" .scrIn",{opacity:0},at(i,t+.2));
    tl.to(m+" .crt",{scaleX:0,duration:.1,ease:"power2.in"},at(i,t+.2));tl.set(m+" .crt",{opacity:0},at(i,t+.32));
    shake(s+".mons",at(i,t+.12),9,4);
    tl.fromTo(s+".redFlash",{opacity:.35},{opacity:0,duration:.25,immediateRender:false},at(i,t+.12));});
  const m=q(s+".m1");tl.fromTo(m,{x:-1000},{x:0,duration:1.1,ease:"power2.out"},at(i,.15));walk(m,i,0,D[i]);})();`;
  return { html, js, sfx: [...heroSfx(o.strike ? 1.2 : 0), ["glitch-1", 0.6, 0.3, 0.5], ["glitch-1", 0.88, 0.26, 0.5], ["glitch-3", 1.16, 0.3, 0.5]], min: 2.4, card: false, labels: false };
}

// ---------- 1e. hook: someone asks Claude to trade, cubrik answers "agent ready" ----------
export function hookChat(n, o) {
  const lines = o.lines || ["✓ Strategy loaded", "✓ Broker linked · MetaTrader 5", "✓ Agent ready · waiting for your OK"];
  const html = `
  <div class="hcStage"><div class="card hcCard">
    ${chatHead()}
    <div class="bubbleRow"><div class="uBubble">${chars(o.ask || "trade gold for me while I sleep")}<span class="cursor"></span></div></div>
    <div class="reply"><div class="avatar">${CUBE}</div><div class="replyCard">${lines.map((l, k) => `<div class="hcL hcL${k}">${tr(l)}</div>`).join("")}</div></div>
    ${mascot("onCard")}
  </div></div>
  ${hero(o.l1, o.l2, o.strike)}`;
  const js = `(function(){const i=${n - 1},s="#s${n} ";${heroJs(n, o.strike ? 1.4 : 0)}
  rise(s+".hcCard",i,0,100);
  tl.fromTo(s+".uBubble",{scale:.7,opacity:0},{scale:1,opacity:1,duration:.22,ease:"back.out(2.6)",transformOrigin:"right center"},at(i,.05));
  const e=type(s+".uBubble",i,.08,55);tl.set(s+".uBubble .cursor",{opacity:0},at(i,e+.04));
  rise(s+".reply",i,e+.08,60);
  [0,1,2].forEach(k=>tl.fromTo(s+".hcL"+k,{x:-50,opacity:0},{x:0,opacity:1,duration:.24,ease:"back.out(2.4)"},at(i,e+.2+k*.18)));
  mascotOnCard(i,.3);})();`;
  return { html, js, sfx: [...heroSfx(o.strike ? 1.4 : 0), ["pop", 1.1, 0.25, 0.5], ["pop", 1.28, 0.25, 0.5], ["ping", 1.46, 0.25, 0.5]], min: 2.4, card: false, labels: false };
}

// ---------- 1f. hook: morning lock screen full of agent notifications ----------
export function hookNotifs(n, o) {
  const items = o.items || [
    ["🛡", "Skipped a trade · CPI news in 5 min", "02:14"],
    ["↗", "Stop moved to breakeven · XAU/USD", "03:41"],
    ["✅", "Take profit hit · +2R", "05:09"],
  ];
  const html = `
  <div class="hnWrap">
    <div class="hnTime">${o.time || "7:02"}</div>
    <div class="hnDate mono">${tr(o.date || "WHILE YOU WERE ASLEEP")}</div>
    ${items.map(([ic, t, h], k) => `<div class="hnN hn${k}"><div class="hnIco">${CUBE}</div><div class="hnTx"><div class="hnTop"><span>cubrik</span><span>${h}</span></div><div class="hnMain">${ic} ${tr(t)}</div></div></div>`).join("")}
    ${mascot("mHN")}
  </div>
  ${hero(o.l1, o.l2, o.strike)}`;
  const js = `(function(){const i=${n - 1},s="#s${n} ";${heroJs(n, o.strike ? 1.3 : 0)}
  tl.fromTo(s+".hnTime",{y:-60,opacity:0},{y:0,opacity:1,duration:.35,ease:"expo.out"},at(i,0));
  tl.fromTo(s+".hnDate",{opacity:0},{opacity:1,duration:.25},at(i,.15));
  [0,1,2].forEach(k=>tl.fromTo(s+".hn"+k,{y:-120,opacity:0,scale:.92},{y:0,opacity:1,scale:1,duration:.32,ease:"back.out(1.8)"},at(i,.35+k*.3)));
  const m=q(s+".mHN");tl.fromTo(m,{x:-900},{x:0,duration:1.1,ease:"power2.out"},at(i,.2));walk(m,i,0,D[i]);})();`;
  return { html, js, sfx: [...heroSfx(o.strike ? 1.3 : 0), ["notification", 0.35, 0.25, 0.6], ["notification", 0.65, 0.22, 0.6], ["notification", 0.95, 0.25, 0.6]], min: 2.4, card: false, labels: false };
}

// ---------- link a broker in one message (ported from the launch reel) ----------
export function broker(n, o = {}) {
  const B = o.brokers || [[LOGO("mt5", "png"), "MetaTrader 5", "#fff"], [LOGO("binance"), "Binance", "#fff"], [BLOGO("ibkr", "webp"), "Interactive Brokers", "#fff"]];
  const checks = [1.3, 1.6, 1.9];
  const html = `
  <div class="stage"><div class="card s3card">
    ${chatHead()}
    <div class="bubbleRow"><div class="uBubble">${chars(o.msg || "connect my broker")}<span class="cursor"></span></div></div>
    <div class="reply"><div class="avatar">${CUBE}</div><div class="replyCard">
      <div class="replyTitle">${tr("Pick a broker to link:")}</div>
      ${B.map(([g, nm, bg], k) => `<div class="brow br${k}"><div class="blogo img" style="background:${bg}">${g}</div><div class="bname">${nm}</div><div class="chk chk${k}">✓</div></div>`).join("")}
    </div></div>
    <div class="brMore mono">${tr("+ OKX, Bitget, Kraken, Coinbase, eToro, Robinhood, MoonX")}</div>
    <div class="mono small s3foot">${tr("🔒 Keys checked · trading on · withdrawals off")}</div>
    ${mascot("onCard")}
  </div></div>
  ${labels(o.l1 || "LINK YOUR BROKER", o.l2 || "IN ONE MESSAGE")}`;
  const js = `(function(){const i=${n - 1},s="#s${n} ";
  rise(s+".s3card",i,0);
  tl.fromTo(s+".uBubble",{scale:.7,opacity:0},{scale:1,opacity:1,duration:.24,ease:"back.out(2.6)",transformOrigin:"right center"},at(i,.08));
  const e=type(s+".uBubble",i,.12,45);tl.set(s+".uBubble .cursor",{opacity:0},at(i,e+.06));
  rise(s+".reply",i,.6,70);
  [0,1,2].forEach(k=>tl.fromTo(s+".br"+k,{x:-60,opacity:0},{x:0,opacity:1,duration:.28,ease:"back.out(2.2)"},at(i,.68+k*.06)));
  ${JSON.stringify(checks)}.forEach((t,k)=>{pop(s+".chk"+k,i,t,.28);tl.to(s+".br"+k,{borderColor:"#86EFAC",backgroundColor:"#F0FDF4",duration:.15},at(i,t));
    tl.fromTo(s+".br"+k,{scale:1},{scale:1.035,duration:.1,yoyo:true,repeat:1},at(i,t));});
  tl.fromTo(s+".s3foot",{opacity:0,y:12},{opacity:1,y:0,duration:.22},at(i,${checks[2] + 0.15}));
  mascotOnCard(i,.3);labels(${n});})();`;
  return { html, js, sfx: checks.map((t) => ["ping", t, 0.28]), min: 2.4 };
}

// ---------- pick a strategy from Claude Skills (ported from the launch reel) ----------
export function skills(n, o = {}) {
  const S = o.skills || [
    ["IC", "ICT Concepts", "#FDE68A"], ["WY", "Wyckoff", "#BFDBFE"], ["VP", "Volume Profile", "#C7F9CC"], ["NF", "News filter", "#FECACA"],
    ["TS", "Trailing stop", "#DDD6FE"], ["SF", "Session filter", "#FED7AA"], ["SM", "Smart Money", "#A5F3FC"],
  ];
  const pickK = o.pick ?? 4, ring = o.ring ?? 1.0;
  const html = `
  <div class="stage"><div class="card s6card">
    <div class="s6head">${LOGO("claude")}<div class="h2">${tr("Claude Skills")}</div></div>
    <div class="grid">
      ${S.map(([g, nm, c], k) => `<div class="chip c${k}${k === pickK ? " pick" : ""}"><div class="cIco mono" style="background:${c}">${g}</div><div class="cName">${tr(nm)}</div>${k === pickK ? '<div class="ring"></div>' : ""}</div>`).join("")}
      <div class="chip c7 own"><div class="cIco mono" style="background:#161514;color:#fff">&lt;/&gt;</div><div><div class="cName">${tr("Your own")}</div><div class="mono xs violet">${tr("FROM GITHUB")}</div></div></div>
    </div>
    ${mascot("onCard")}
  </div></div>
  ${labels(o.l1 || "OR USE", o.l2 || "YOUR CLAUDE SKILLS")}`;
  const js = `(function(){const i=${n - 1},s="#s${n} ";
  rise(s+".s6card",i,0);
  for(let k=0;k<8;k++)tl.fromTo(s+".c"+k,{scale:.4,opacity:0,y:30},{scale:1,opacity:1,y:0,duration:.26,ease:"back.out(2.8)"},at(i,.15+k*.05));
  tl.fromTo(s+".ring",{opacity:0,scale:1.25},{opacity:1,scale:1,duration:.26,ease:"back.out(2.6)"},at(i,${ring}));
  tl.to(s+".pick",{borderColor:"#7C3AED",backgroundColor:"#F5F1FF",duration:.15},at(i,${ring}));
  tl.fromTo(s+".pick",{scale:1},{scale:1.07,duration:.12,yoyo:true,repeat:1},at(i,${ring}));
  mascotOnCard(i,.3);labels(${n});})();`;
  return { html, js, sfx: [["pop", 0.2, 0.22, 0.5], ["pop", 0.45, 0.22, 0.5], ["click", ring, 0.5]], min: 2.0 };
}

// ---------- 1g. hook: a wall of bot code you no longer need ----------
export function hookCode(n, o) {
  const C = (t, c = "") => `<span class="${c}">${t}</span>`;
  const lines = [
    `${C("import", "kw")} ccxt, pandas ${C("as", "kw")} pd`,
    `${C("def", "kw")} ${C("signal", "fn")}(df):`,
    `  rsi = ta.rsi(df.close, ${C("14", "nb")})`,
    `  ${C("if", "kw")} rsi.iloc[-${C("1", "nb")}] < ${C("30", "nb")} ${C("and", "kw")} engulf(df):`,
    `    ${C("return", "kw")} ${C("'BUY'", "st")}`,
    `${C("while", "kw")} ${C("True", "kw")}:`,
    `  ${C("try", "kw")}: order = ex.create_order(...)`,
    `  ${C("except", "kw")} ${C("RateLimitExceeded", "fn")}: ...`,
    `  ${C("# TODO fix stop loss bug", "cm")}`,
  ];
  const html = `
  <div class="hcodeWrap">
    <div class="hcode" data-layout-allow-overlap>
      <div class="hcBar"><i></i><i></i><i></i><span class="mono">trading_bot.py</span></div>
      <div class="hcBody mono">${lines.map((l, k) => `<div class="hcLn hcl${k}"><span class="hcNo">${k + 1}</span>${l}</div>`).join("")}</div>
      <div class="hcStamp" data-layout-allow-overlap>${tr(o.stamp || "0 LINES OF CODE")}</div>
    </div>
    ${mascot("mHN")}
  </div>
  ${hero(o.l1, o.l2)}`;
  const js = `(function(){const i=${n - 1},s="#s${n} ";${heroJs(n)}
  tl.fromTo(s+".hcode",{y:80,opacity:0,scale:.94},{y:0,opacity:1,scale:1,duration:.35,ease:"back.out(1.8)"},at(i,0));
  for(let k=0;k<${lines.length};k++)tl.fromTo(s+".hcl"+k,{opacity:0,x:-20},{opacity:1,x:0,duration:.1},at(i,.12+k*.07));
  tl.to(s+".hcBody",{opacity:.25,filter:"blur(2px)",duration:.25},at(i,1.0));
  tl.fromTo(s+".hcStamp",{scale:2.4,opacity:0,rotation:-20},{scale:1,opacity:1,rotation:-8,duration:.22,ease:"power4.in"},at(i,1.05));
  shake(s+".hcode",at(i,1.27),12,5);
  const m=q(s+".mHN");tl.fromTo(m,{x:-900},{x:0,duration:1.1,ease:"power2.out"},at(i,.2));walk(m,i,0,D[i]);})();`;
  return { html, js, sfx: [...heroSfx(), ["typing", 0.12, 0.25, 0.6], ["impact-bass-2", 1.25, 0.4, 1.2], ["pop", 1.27, 0.3, 0.5]], min: 2.4, card: false, labels: false };
}

// ---------- describe a strategy in plain words -> rules -> agent created ----------
export function describe(n, o) {
  const rules = o.rules || GOLD_RULES;
  const agent = o.agent ?? 2.0;
  const html = `
  <div class="stage"><div class="card s5card dsCard">
    ${chatHead()}
    <div class="bubbleRow"><div class="uBubble">${chars(o.msg || "buy gold when RSI drops under 30 on the 1h, 1% risk")}<span class="cursor"></span></div></div>
    <div class="rules">${rules.map(([k, v], j) => `<div class="rule r${j}"><div class="rk mono">${tr(k)}</div><div class="rv">${tr(v)}</div></div>`).join("")}</div>
    <div class="agentBar"><div class="agChk">✓</div><div class="agTx"><div class="agT">${tr("Agent created")}</div><div class="mono xs">${o.name || "GOLD RSI SCALPER"} · ${tr("READY TO BACKTEST")}</div></div><div class="agBtn">${tr("Open")}</div></div>
    ${mascot("onCard")}
  </div></div>
  ${labels(o.l1, o.l2)}`;
  const js = `(function(){const i=${n - 1},s="#s${n} ";
  rise(s+".dsCard",i,0);
  tl.fromTo(s+".uBubble",{scale:.7,opacity:0},{scale:1,opacity:1,duration:.22,ease:"back.out(2.6)",transformOrigin:"right center"},at(i,.06));
  const e=type(s+".uBubble",i,.1,60);tl.set(s+".uBubble .cursor",{opacity:0},at(i,e+.04));
  [0,1,2,3].forEach(k=>tl.fromTo(s+".r"+k,{opacity:0,x:-30},{opacity:1,x:0,duration:.18,ease:"back.out(2)"},at(i,Math.min(e+.1,1.3)+k*.13)));
  tl.fromTo(s+".agentBar",{y:60,scale:.8,opacity:0},{y:0,scale:1,opacity:1,duration:.32,ease:"back.out(2.6)"},at(i,${agent}));
  mascotOnCard(i,.3);labels(${n});})();`;
  return { html, js, sfx: [["typing", 0.1, 0.22, 0.9], ["pop", 1.3, 0.25, 0.5], ["sparkle", agent, 0.32], ["ping", agent + 0.02, 0.3]], min: 2.8 };
}

// ---------- 1h. hook: manual trading vs AI trading, side by side ----------
export function hookVs(n, o) {
  const rows = o.rows || [
    ["8h in front of charts", "Watches 24/7"],
    ["Emotions decide", "Rules decide"],
    ["Missed setups", "Never misses an alert"],
    ["Stop moved \"just once\"", "Stop always on"],
  ];
  const html = `
  <div class="vsWrap">
    <div class="card vsCard">
      <div class="vsHead"><div class="vsH vsL mono">${tr("MANUAL")}</div><div class="vsMid">VS</div><div class="vsH vsR mono">${tr("AI · cubrik")}</div></div>
      ${rows.map(([a, b], k) => `<div class="vsRow vr${k}"><div class="vsC vsBad">✗ ${tr(a)}</div><div class="vsC vsGood">✓ ${tr(b)}</div></div>`).join("")}
    </div>
    ${mascot("mHN")}
  </div>
  ${hero(o.l1, o.l2)}`;
  const js = `(function(){const i=${n - 1},s="#s${n} ";${heroJs(n)}
  tl.fromTo(s+".vsCard",{y:80,opacity:0,scale:.94},{y:0,opacity:1,scale:1,duration:.35,ease:"back.out(1.8)"},at(i,0));
  tl.fromTo(s+".vsMid",{scale:2.2,opacity:0,rotation:-15},{scale:1,opacity:1,rotation:0,duration:.25,ease:"back.out(3)"},at(i,.2));
  [0,1,2,3].forEach(k=>{tl.fromTo(s+".vr"+k+" .vsBad",{x:-40,opacity:0},{x:0,opacity:1,duration:.16},at(i,.4+k*.22));
    tl.fromTo(s+".vr"+k+" .vsGood",{x:40,opacity:0},{x:0,opacity:1,duration:.16},at(i,.5+k*.22));});
  const m=q(s+".mHN");tl.fromTo(m,{x:-900},{x:0,duration:1.1,ease:"power2.out"},at(i,.2));walk(m,i,0,D[i]);})();`;
  return { html, js, sfx: [...heroSfx(), ["click", 0.4, 0.3], ["ping", 0.5, 0.22], ["click", 0.62, 0.3], ["ping", 0.72, 0.22], ["click", 0.84, 0.3], ["ping", 0.94, 0.22], ["click", 1.06, 0.3], ["ping", 1.16, 0.22]], min: 2.6, card: false, labels: false };
}

// ---------- every official broker, ticked one by one (also usable as a hook with o.hero) ----------
export function brokerGrid(n, o = {}) {
  const html = `
  <div class="${o.hero ? "bgHookWrap" : "stage"}"><div class="card bgCard">
    <div class="bgHead"><div class="h2">${tr(o.title || "Works with your broker")}</div><div class="pill mono">${tr("~30 S TO CONNECT")}</div></div>
    <div class="bgGrid">${BROKERS.map(([f, e, nm], k) => `<div class="bgCell bc${k}"><div class="bgLogo">${BLOGO(f, e)}</div><div class="bgName">${nm}</div><div class="bgChk">✓</div></div>`).join("")}</div>
    <div class="bgFoot mono xs">${tr(o.foot || "CRYPTO · FOREX · INDICES · COMMODITIES")}</div>
    ${mascot("onCard")}
  </div></div>
  ${o.hero ? hero(o.l1, o.l2) : labels(o.l1 || "WORKS WITH", o.l2 || "YOUR BROKER")}`;
  const js = `(function(){const i=${n - 1},s="#s${n} ";${o.hero ? heroJs(n) : ""}
  rise(s+".bgCard",i,0,${o.hero ? 100 : 80});
  for(let k=0;k<${BROKERS.length};k++){tl.fromTo(s+".bc"+k,{scale:.5,opacity:0},{scale:1,opacity:1,duration:.22,ease:"back.out(2.6)"},at(i,.15+k*.07));
    tl.fromTo(s+".bc"+k+" .bgChk",{scale:0},{scale:1,duration:.16,ease:"back.out(3)"},at(i,.55+k*.08));}
  mascotOnCard(i,.3);${o.hero ? "" : `labels(${n});`}})();`;
  const sfx = [...(o.hero ? heroSfx() : []), ...[0, 1, 2, 3, 4].map((k) => ["pop", 0.15 + k * 0.14, 0.2, 0.4]), ["ping", 1.3, 0.3]];
  return { html, js, sfx, min: 2.4, ...(o.hero ? { card: false, labels: false } : {}) };
}

// ---------- 1i. hook: an account in the red, every loss labelled with the human error behind it ----------
export function hookLoss(n, o) {
  const rows = o.rows || [
    ["XAU/USD", "−1,240 €", "Stop widened"],
    ["BTC/USD", "−2,180 €", "Size doubled after a loss"],
    ["NAS100", "−907 €", "The 11 pm trade"],
  ];
  const html = `
  <div class="lsWrap"><div class="card lsCard">
    <div class="lsTop"><div class="mono xs">${tr("THIS MONTH")}</div><div class="lsBig">${tr(o.total || "−4,327 €")}</div></div>
    ${rows.map(([a, v, why], k) => `<div class="lsRow lr${k}"><span class="lsPair mono">${a}</span><span class="lsV">${tr(v)}</span><span class="lsWhy">${tr(why)}</span></div>`).join("")}
    ${mascot("onCard")}
  </div></div>
  <div class="redFlash"></div>
  ${hero(o.l1, o.l2)}`;
  const js = `(function(){const i=${n - 1},s="#s${n} ";${heroJs(n)}
  rise(s+".lsCard",i,0,100);
  tl.fromTo(s+".lsBig",{scale:1.6,opacity:0},{scale:1,opacity:1,duration:.3,ease:"expo.out"},at(i,.15));
  [0,1,2].forEach(k=>{tl.fromTo(s+".lr"+k,{x:-50,opacity:0},{x:0,opacity:1,duration:.2,ease:"back.out(2)"},at(i,.45+k*.25));
    tl.fromTo(s+".lr"+k+" .lsWhy",{scale:1.8,opacity:0,rotation:-8},{scale:1,opacity:1,rotation:-3,duration:.2,ease:"power4.in"},at(i,.6+k*.25));});
  shake(s+".cam",at(i,.82),10,4);
  tl.fromTo(s+".redFlash",{opacity:.3},{opacity:0,duration:.3,immediateRender:false},at(i,.82));
  mascotOnCard(i,.3);})();`;
  return { html, js, sfx: [...heroSfx(), ["error", 0.6, 0.3, 0.8], ["click", 0.85, 0.35], ["click", 1.1, 0.35]], min: 2.6, card: false, labels: false };
}

// ---------- 1j. hook: broker permissions card, "withdraw funds: not possible" ----------
export function hookSafe(n, o = {}) {
  const rows = [["Read balance and positions", "Allowed", "ok"], ["Place, modify and close orders", "Allowed", "ok"], ["Withdraw or transfer funds", "Not possible", "no"]];
  const html = `
  <div class="${o.hero === false ? "stage" : "sfWrap"}"><div class="card sfCard">
    <div class="sfHead"><div class="blogo img" style="background:#fff">${LOGO("mt5", "png")}</div><div><div class="h2">${tr("Broker access")}</div><div class="mono xs">${tr("MetaTrader · granted to cubrik")}</div></div></div>
    ${rows.map(([a, b, c], k) => `<div class="sfRow sr${k}"><span>${tr(a)}</span><span class="sfV ${c}">${tr(b)}</span></div>`).join("")}
    <div class="sfFoot mono xs">${tr("REVOKE IN ONE TAP · STOPS LIVE AT THE BROKER")}</div>
    ${mascot("onCard")}
  </div></div>
  ${o.hero === false ? labels(o.l1, o.l2) : hero(o.l1, o.l2)}`;
  const js = `(function(){const i=${n - 1},s="#s${n} ";${o.hero === false ? "" : heroJs(n)}
  rise(s+".sfCard",i,0,100);
  [0,1,2].forEach(k=>tl.fromTo(s+".sr"+k,{x:-40,opacity:0},{x:0,opacity:1,duration:.2,ease:"back.out(2)"},at(i,.3+k*.25)));
  tl.fromTo(s+".sr2 .sfV",{scale:1.8},{scale:1,duration:.25,ease:"back.out(3)"},at(i,.85));
  shake(s+".sfCard",at(i,.9),8,4);
  mascotOnCard(i,.3);${o.hero === false ? `labels(${n});` : ""}})();`;
  return { html, js, sfx: [...(o.hero === false ? [] : heroSfx()), ["click-soft", 0.3, 0.4, 0.3], ["click-soft", 0.55, 0.4, 0.3], ["error", 0.85, 0.28, 0.6]], min: 2.4, ...(o.hero === false ? {} : { card: false, labels: false }) };
}

// ---------- library: copy a shared agent with its backtest ----------
export function library(n, o = {}) {
  const cards = o.cards || [
    ["Gold London sweep", "XAU/USD · 1h", "58%"],
    ["Volume breakout", "BTC, ETH +3 · 1h", "40%"],
    ["Quiet-market reversion", "BTC, SOL +2 · 1h", "61%"],
  ];
  const t = o.tap ?? 1.3;
  const html = `
  <div class="stage"><div class="card lbCard">
    <div class="lbHead"><div class="h2">${tr("Library")}</div><div class="pill mono">${tr("13,353 AGENTS")}</div></div>
    ${cards.map(([nm, mk, wr], k) => `<div class="lbRow lb${k}"><div><div class="lbName">${tr(nm)}</div><div class="mono xs">${mk} · ${tr("win rate")} ${wr}</div></div><div class="lbBtn ${k === 0 ? "lbPick" : ""}"><span class="lb1">${tr("Copy")}</span>${k === 0 ? `<span class="lb2">✓</span>` : ""}</div></div>`).join("")}
    <div class="lbFoot mono xs">${tr("EVERY AGENT COMES WITH ITS BACKTEST · NO RANKING, NO PROMISES")}</div>
    <div class="hand" data-layout-allow-overlap>👆</div>
    ${mascot("onCard")}
  </div></div>
  ${labels(o.l1 || "COPY A STRATEGY", o.l2 || "WITH ITS BACKTEST")}`;
  const js = `(function(){const i=${n - 1},s="#s${n} ";
  rise(s+".lbCard",i,0);
  [0,1,2].forEach(k=>tl.fromTo(s+".lb"+k,{y:40,opacity:0},{y:0,opacity:1,duration:.22,ease:"back.out(2)"},at(i,.2+k*.12)));
  tap(s+".hand",s+".lbPick",i,${t});
  tl.set(s+".lbPick",{backgroundColor:"#16A34A"},at(i,${t + 0.05}));tl.set(s+".lbPick .lb1",{opacity:0},at(i,${t + 0.05}));
  tl.fromTo(s+".lbPick .lb2",{opacity:0,scale:.4},{opacity:1,scale:1,duration:.2,ease:"back.out(3)"},at(i,${t + 0.05}));
  mascotOnCard(i,.3);labels(${n});})();`;
  return { html, js, sfx: [["pop", 0.2, 0.22, 0.4], ["pop", 0.44, 0.22, 0.4], ["click", t, 0.55], ["ping", t + 0.08, 0.28]], min: 2.4 };
}

// ---------- analytics that talk back: where the money goes + one-tap recommendation ----------
export function analytics(n, o = {}) {
  const t = o.tap ?? 1.6;
  const html = `
  <div class="stage"><div class="card anCard">
    <div class="h2">${tr("What your month says")}</div>
    <div class="anRow ar0"><span>${tr("London session")}</span><span class="mono xs">58 ${tr("trades")} · 74%</span><b class="pos">+2.7R</b></div>
    <div class="anRow ar1"><span>${tr("New York session")}</span><span class="mono xs">9 ${tr("trades")} · 22%</span><b class="neg">−0.8R</b></div>
    <div class="anRec"><div><div class="anRT">${tr("Stop trading the New York session")}</div><div class="mono xs">${tr("AI RECOMMENDATION")}</div></div><div class="anBtn"><span class="ab1">${tr("Apply")}</span><span class="ab2">✓</span></div></div>
    <div class="hand" data-layout-allow-overlap>👆</div>
    ${mascot("onCard")}
  </div></div>
  ${labels(o.l1 || "IT READS YOUR TRADES", o.l2 || "AND TELLS YOU WHY")}`;
  const js = `(function(){const i=${n - 1},s="#s${n} ";
  rise(s+".anCard",i,0);
  [0,1].forEach(k=>slideIn(s+".ar"+k,i,.25+k*.2));
  tl.fromTo(s+".anRec",{y:40,opacity:0,scale:.9},{y:0,opacity:1,scale:1,duration:.28,ease:"back.out(2.4)"},at(i,.8));
  tap(s+".hand",s+".anBtn",i,${t});
  tl.set(s+".anBtn",{backgroundColor:"#16A34A"},at(i,${t + 0.05}));tl.set(s+".ab1",{opacity:0},at(i,${t + 0.05}));
  tl.fromTo(s+".ab2",{opacity:0,scale:.4},{opacity:1,scale:1,duration:.2,ease:"back.out(3)"},at(i,${t + 0.05}));
  mascotOnCard(i,.3);labels(${n});})();`;
  return { html, js, sfx: [["click-soft", 0.25, 0.35, 0.3], ["click-soft", 0.45, 0.35, 0.3], ["pop", 0.8, 0.28, 0.4], ["click", t, 0.55], ["ping", t + 0.08, 0.28]], min: 2.6 };
}
