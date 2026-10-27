// Scenes of the "Claude vs ChatGPT vs Grok" video, plugged into the build-full.mjs engine by build-battle.mjs.
// Presenter lines: speech starts at T+0.1; demo voice-overs at T+0.2. Word times below come from the transcribed takes.
// Every class is prefixed "bt" so nothing restyles the scenes of the first video.
import { BODY_SCENES, BODY_OVERLAYS, BODY_OVER, bodySfx, BODY_CSS } from "./battle-body.mjs";
const LOGO = { claude: "assets/ai/claude-color.svg", gpt: "assets/ai/openai.svg", grok: "assets/ai/grok.svg" };
const AIS = [["claude", "Claude"], ["gpt", "ChatGPT"], ["grok", "Grok"]];
const CUBE = `<svg viewBox="0 0 100 104"><polygon points="50,6 92,30 50,54 8,30" fill="#c4b5fd"/><polygon points="8,30 50,54 50,100 8,76" fill="#7c3aed"/><polygon points="50,54 92,30 92,76 50,100" fill="#a855f7"/></svg>`;

// deterministic gold candles for chart backgrounds
function candles(n = 64, w = 1920, h = 520, seed = 7) {
  let s = seed, p = 0.55, out = "";
  const r = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  const cw = w / n;
  for (let i = 0; i < n; i++) {
    const o = p, c = Math.min(0.92, Math.max(0.08, p + (r() - 0.47) * 0.09));
    const hi = Math.max(o, c) + r() * 0.04, lo = Math.min(o, c) - r() * 0.04;
    const up = c >= o, col = up ? "#34d399" : "#fb7185", x = i * cw + cw / 2;
    out += `<line x1="${x.toFixed(1)}" x2="${x.toFixed(1)}" y1="${(h * (1 - hi)).toFixed(1)}" y2="${(h * (1 - lo)).toFixed(1)}" stroke="${col}" stroke-width="2"/><rect x="${(x - cw * 0.3).toFixed(1)}" y="${(h * (1 - Math.max(o, c))).toFixed(1)}" width="${(cw * 0.6).toFixed(1)}" height="${Math.max(2, h * Math.abs(o - c)).toFixed(1)}" fill="${col}" rx="1"/>`;
    p = c;
  }
  return `<svg class="btCandles" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">${out}</svg>`;
}

export const SCENES = {
  // h1 (cam A): "I gave three AIs fifty thousand dollars each, and one week to trade gold."
  bh1: () => ({
    html: `<div class="btTop"><span class="btGold mono">XAU/USD</span><span>GOLD · 1 WEEK</span></div>
      <div class="btRow">${AIS.map(([k, n], i) => `<div class="btCard c${i}"><img class="lg-${k}" src="${LOGO[k]}" alt=""><div><b>${n}</b><span class="mono btBal">$0</span></div></div>`).join("")}</div>`,
    js: () => `const V=T+.1;
      [.56,.72,.88].forEach((w,i)=>tl.fromTo(S+".c"+i,{y:120,opacity:0,scale:.8,rotation:i===0?-4:i===2?4:0},{y:0,opacity:1,scale:1,rotation:0,duration:.45,ease:"back.out(1.8)"},V+w));
      [0,1,2].forEach(i=>count(S+".c"+i+" .btBal",0,50000,V+1.6+i*.05,.9,"$"));
      tl.fromTo(S+".btRow",{y:0},{y:-10,duration:3,ease:"none"},V+1.6);
      tl.fromTo(S+".btTop",{y:-80,opacity:0},{y:0,opacity:1,duration:.4,ease:"expo.out"},V+3.5);
      tl.fromTo(S+".btGold",{backgroundColor:"#f5c542"},{backgroundColor:"#e0a91d",duration:.6,yoyo:true,repeat:1},V+4.4);
      tl.to(S+".btRow,"+S+".btTop",{opacity:0,y:30,duration:.3,ease:"power2.in"},T+D-.35);`,
  }),
  // h2 (demo): "Same strategy. Same prompt. Same account. Claude, ChatGPT and Grok. Only one thing changes: the AI making the decisions."
  bh2: () => ({
    html: `<div class="btBg">${candles()}</div><div class="btVig"></div>
      <div class="btSame">${["STRATEGY", "PROMPT", "ACCOUNT"].map((w, i) => `<div class="btS s${i}"><span class="mono">SAME</span><b>${w}</b><i>✓</i></div>`).join("")}</div>
      <div class="btCols">${AIS.map(([k, n], i) => `<div class="btCol k${i}"><img class="lg-${k}" src="${LOGO[k]}" alt=""><b>${n}</b><div class="btEq mono">$50,000</div><div class="btQ mono">$??,???</div></div>`).join("")}</div>
      <div class="btOnly"><span class="mono">ONLY ONE THING CHANGES</span><b>THE AI</b></div>`,
    js: () => `const V=T+.2;
      tl.fromTo(S+".btCandles",{x:0},{x:-260,duration:D,ease:"none"},T);
      [0,1.2,2.16].forEach((w,i)=>{tl.fromTo(S+".s"+i,{scale:1.6,opacity:0,filter:"blur(12px)"},{scale:1,opacity:1,filter:"blur(0px)",duration:.3,ease:"expo.out"},V+w);
        tl.fromTo(S+".s"+i+" i",{scale:0},{scale:1,duration:.25,ease:"back.out(3)"},V+w+.3);});
      tl.to(S+".btSame",{y:-60,opacity:0,duration:.3,ease:"power2.in"},V+2.85);
      [3.04,3.68,4.72].forEach((w,i)=>tl.fromTo(S+".k"+i,{y:140,opacity:0},{y:0,opacity:1,duration:.45,ease:"back.out(1.6)"},V+w));
      tl.to(S+".btEq",{opacity:0,y:-20,duration:.2},V+5.45);tl.fromTo(S+".btQ",{opacity:0,y:20,filter:"blur(8px)"},{opacity:1,y:0,filter:"blur(3px)",duration:.3},V+5.5);
      tl.to(S+".btCols",{y:-150,scale:.82,duration:.5,ease:"power3.inOut"},V+6.2);
      tl.fromTo(S+".btOnly",{opacity:0,y:60},{opacity:1,y:0,duration:.4,ease:"expo.out"},V+6.3);
      tl.fromTo(S+".btOnly b",{scale:2.2,opacity:0},{scale:1,opacity:1,duration:.32,ease:"expo.out"},V+7.05);
      [[-12,6],[10,-5],[-6,3],[0,0]].forEach(([x,y],j)=>tl.to(S+".btOnly",{x:x,y:y,duration:.035},V+7.2+j*.035));
      tl.to(S+".btCol",{boxShadow:"0 0 60px -6px #a855f7",borderColor:"#a855f7",duration:.3,stagger:.08},V+7.3);`,
  }),
  // h3 (cam B): "One of them lost money. One of them made a lot. And the gap between them honestly surprised me."
  bh3: () => ({
    html: `<div class="btGap">
      <div class="btR neg r0"><span class="btAi mono">AI ?</span><b>LOST MONEY</b><em class="mono">−$•,•••</em></div>
      <div class="btBar"><i></i><span class="mono">THE GAP</span></div>
      <div class="btR pos r1"><span class="btAi mono">AI ?</span><b>MADE A LOT</b><em class="mono">+$••,•••</em></div></div>`,
    js: () => `const V=T+.1;
      tl.fromTo(S+".r0",{x:-120,opacity:0},{x:0,opacity:1,duration:.4,ease:"expo.out"},V+.5);
      tl.fromTo(S+".r1",{x:-120,opacity:0},{x:0,opacity:1,duration:.4,ease:"expo.out"},V+1.8);
      tl.fromTo(S+".btBar i",{scaleY:0},{scaleY:1,duration:.5,ease:"power3.out"},V+3.0);
      tl.fromTo(S+".btBar span",{scale:.4,opacity:0},{scale:1,opacity:1,duration:.3,ease:"back.out(3)"},V+3.2);
      tl.to(S+".btR em",{filter:"blur(0px)",duration:.01},V+3.2);
      tl.to(S+".btGap",{opacity:0,x:-40,duration:.3,ease:"power2.in"},T+D-.35);`,
  }),
  // h4 (cam A): "I'm Max. Let me show you exactly how I set it up, so you can run the same test yourself."
  bh4: () => ({
    html: `<div class="btName"><div class="btNm">Max</div><div class="mono btRole">TRADER · AI PRESENTER</div></div><div class="btNext mono">RUN THE SAME TEST ↓</div>`,
    js: () => `const V=T+.1;
      tl.fromTo(S+".btName",{x:-80,opacity:0},{x:0,opacity:1,duration:.45,ease:"expo.out"},V+.05);
      tl.fromTo(S+".btNm",{clipPath:"inset(0 100% 0 0)"},{clipPath:"inset(0 0% 0 0)",duration:.4,ease:"power3.out"},V+.1);
      tl.fromTo(S+".btNext",{y:40,opacity:0},{y:0,opacity:1,duration:.35,ease:"back.out(2)"},V+3.6);
      tl.to(S+".btName,"+S+".btNext",{opacity:0,duration:.3},T+D-.35);`,
  }),
};

Object.assign(SCENES, BODY_SCENES, BODY_OVERLAYS);
export const OVER = { h1: "bh1", h3: "bh3", h4: "bh4", ...BODY_OVER };
export const CHAP = {};
export const DEMOCHAP = {};

// sound beats: at(id, seconds from segment start, file, volume)
export const sfx = (at) => {
  at("h1", 0.66, "pop", 0.3); at("h1", 0.82, "pop", 0.3); at("h1", 0.98, "pop", 0.3); at("h1", 1.7, "sparkle", 0.3); at("h1", 3.6, "whoosh-short", 0.25);
  at("h2", 0.2, "impact-bass-1", 0.35); at("h2", 1.4, "click-soft", 0.35); at("h2", 2.36, "click-soft", 0.35);
  at("h2", 3.24, "pop", 0.3); at("h2", 3.88, "pop", 0.3); at("h2", 4.92, "pop", 0.3); at("h2", 5.7, "glitch-1", 0.25); at("h2", 7.25, "impact-bass-1", 0.45);
  at("h3", 0.6, "error", 0.22); at("h3", 1.9, "ping", 0.3); at("h3", 3.1, "whoosh", 0.3);
  at("h4", 0.15, "whoosh-short", 0.25); at("h4", 3.7, "click-soft", 0.3);
  bodySfx(at);
};

export const CSS = BODY_CSS + `
.seg.demo{opacity:0}
.lg-gpt,.lg-grok{background:#000!important;box-shadow:inset 0 0 0 2px #3a3a42}
.btTop{position:absolute;left:0;right:0;top:70px;display:flex;justify-content:center;align-items:center;gap:18px;font-family:"JetBrains Mono";font-weight:700;font-size:34px;letter-spacing:.14em;color:#fff}
.btTop>span:last-child{background:rgba(10,10,12,.88);border:1px solid #2a2a30;border-radius:12px;padding:10px 22px}
.btGold{background:#f5c542;color:#1a1204;border-radius:12px;padding:10px 22px}
.btRow{position:absolute;left:0;right:0;bottom:90px;display:flex;justify-content:center;gap:34px}
.btCard{display:flex;align-items:center;gap:22px;width:420px;background:rgba(10,10,12,.9);border:1px solid #2f2f36;border-radius:24px;padding:22px 28px;box-shadow:0 30px 60px -20px rgba(0,0,0,.7);opacity:0}
.btCard img{width:78px;height:78px;object-fit:contain;background:#fff;border-radius:18px;padding:10px}
.btCard b{display:block;font-size:36px;font-weight:600}.btBal{display:block;font-size:44px;font-weight:700;color:#34d399}
.btBg{position:absolute;inset:0;background:radial-gradient(circle at 50% 40%,#1b1030 0%,#07050c 70%)}
.btCandles{position:absolute;left:0;top:300px;width:2300px;height:520px;opacity:.28}
.btVig{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,transparent 30%,rgba(0,0,0,.75) 100%)}
.btSame{position:absolute;left:0;right:0;top:250px;display:flex;flex-direction:column;align-items:center;gap:22px}
.btS{display:flex;align-items:center;gap:26px;opacity:0}.btS span{font-size:40px;letter-spacing:.2em;color:#c4b5fd}.btS b{font-weight:800;font-size:110px;line-height:1;color:#fff}
.btS i{font-style:normal;width:80px;height:80px;border-radius:50%;background:#34d399;color:#06281b;display:grid;place-items:center;font-size:46px;font-weight:800}
.btCols{position:absolute;left:0;right:0;top:250px;display:flex;justify-content:center;gap:44px}
.btCol{position:relative;width:440px;height:500px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;background:rgba(14,12,20,.92);border:2px solid #2f2f36;border-radius:34px;opacity:0}
.btCol img{width:140px;height:140px;object-fit:contain;background:#fff;border-radius:34px;padding:22px}.btCol b{font-size:52px;font-weight:700}
.btEq,.btQ{font-size:58px;font-weight:700;color:#34d399}.btQ{position:absolute;bottom:84px;color:#c4b5fd;opacity:0}
.btOnly{position:absolute;left:0;right:0;bottom:120px;display:flex;flex-direction:column;align-items:center;gap:6px;opacity:0}
.btOnly span{font-size:40px;letter-spacing:.2em;color:#c4b5fd}.btOnly b{font-weight:800;font-size:150px;line-height:1;color:#fff;background:#7c3aed;border-radius:26px;padding:0 44px;box-shadow:0 30px 90px -20px #7c3aedcc}
.btGap{position:absolute;left:110px;top:200px;display:flex;flex-direction:column;gap:0}
.btR{display:flex;align-items:center;gap:22px;background:rgba(10,10,12,.9);border:1px solid #2f2f36;border-radius:22px;padding:22px 30px;width:max-content;opacity:0}
.btR b{font-weight:800;font-size:54px}.btR em{font-style:normal;font-size:50px;font-weight:700;filter:blur(7px)}
.btR.neg b,.btR.neg em{color:#fb7185}.btR.pos b,.btR.pos em{color:#34d399}
.btAi{font-size:24px;color:#c4b5fd;border:1px solid #c4b5fd55;border-radius:10px;padding:6px 12px}
.btBar{position:relative;height:190px;margin-left:60px;display:flex;align-items:center}
.btBar i{position:absolute;left:0;top:10px;bottom:10px;width:10px;border-radius:5px;background:linear-gradient(180deg,#fb7185,#a855f7,#34d399);transform-origin:50% 0}
.btBar span{margin-left:40px;font-weight:700;font-size:48px;letter-spacing:.14em;color:#fff;background:#7c3aed;border-radius:14px;padding:8px 22px}
.btName{position:absolute;left:110px;bottom:120px;background:rgba(10,10,12,.9);border:1px solid #2f2f36;border-left:8px solid #a855f7;border-radius:20px;padding:18px 34px}
.btNm{font-weight:800;font-size:72px;line-height:1.05}.btRole{font-size:24px;letter-spacing:.14em;color:#c4b5fd}
.btNext{position:absolute;right:110px;bottom:120px;font-weight:700;font-size:36px;letter-spacing:.12em;background:#7c3aed;color:#fff;border-radius:14px;padding:14px 26px;box-shadow:0 20px 50px -14px #7c3aedcc}
`;
