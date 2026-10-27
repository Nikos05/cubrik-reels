// GENERATED from build-full.mjs for the Claude vs ChatGPT vs Grok video (battle-scenes.mjs + takes-battle.mjs).
// Full YouTube video (16:9): presenter takes + full-screen app demos, built from takes.mjs.
// Writes index.html as a TRANSPARENT overlay (graphics + demos); the lip-synced presenter footage is laid
// underneath by ffmpeg (see produce-full.sh), so it never goes through the browser capture.
// Design tokens from app.cubrik.ai: dark UI, Poppins / Lora / JetBrains Mono, violet #a855f7 / #7c3aed, long #34d399.
// Usage: node build-full.mjs   (expects assets/full/takeNN.wav for presenter lines, assets/full/voNN.wav for demos)
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import TAKES0 from "./takes-battle.mjs";
import * as BT from "./battle-scenes.mjs";
// PREVIEW=hook builds only the hook (h1..h4) for a quick validation render
const TAKES = process.env.PREVIEW === "hook" ? TAKES0.filter((k) => k.id.startsWith("h")) : TAKES0;

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const probe = (f) => +execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path.join(ROOT, f)]).toString().trim();

// ---------- timeline ----------
let t = 0;
const SEG = TAKES.map((k) => {
  const pres = k.cam === "A" || k.cam === "B";
  const audio = pres ? `assets/battle/take${k.id}.wav` : `assets/battle/vo${k.id}.wav`;
  const a = probe(audio);
  const lead = pres ? 0 : 0.2;
  const d = +(a + lead + (pres ? -0.25 : 0.3)).toFixed(3);
  const s = { ...k, pres, audio, a, lead, start: +t.toFixed(3), d };
  t += d;
  return s;
});
const TOTAL = +t.toFixed(3);
fs.writeFileSync(path.join(ROOT, "assets/battle/timeline.json"), JSON.stringify(SEG.map(({ id, cam, start, d }) => ({ id, cam, start, d })), null, 1));

// ---------- shared bits ----------
const CUBE = `<svg viewBox="0 0 100 104"><polygon points="50,6 92,30 50,54 8,30" fill="#c4b5fd"/><polygon points="8,30 50,54 50,100 8,76" fill="#7c3aed"/><polygon points="50,54 92,30 92,76 50,100" fill="#a855f7"/></svg>`;
const words = (s) => s.split(" ").map((w) => `<span class="w">${w}</span>`).join(" ");
const typed = (s) => `${[...s].map((c) => `<span class="k">${c === " " ? " " : c}</span>`).join("")}<span class="caret2"></span>`;
const EQ = (n = 36, up = 1.9) => { let y = 120, d = "M0 120"; for (let i = 1; i <= n; i++) { const x = i * (560 / n); y -= up + Math.sin(i * 0.8) * 5.5; d += ` L${x.toFixed(1)} ${y.toFixed(1)}`; } return d; };
const side = (on) => `<div class="side"><div class="brand">${CUBE}<span>cubrik<b>.ai</b></span></div>
  <div class="nav">＋&nbsp; New chat</div>
  ${[["AI agents", '<span class="badge g">● 3 running</span>'], ["Market", ""], ["Analytics", ""], ["Library", '<span class="badge">13,353</span>'], ["Brokers", '<span class="badge">3</span>']]
    .map(([n, b]) => `<div class="nav${n === on ? " on" : ""}">${n} ${b}</div>`).join("")}
  <div class="pinned mono">PINNED</div><div class="nav sm">Gold London sweep</div><div class="nav sm">BTC mean reversion</div>
  <div class="me"><span class="av2">A</span>Alex · Demo</div></div>`;
const shell = (on, inner, title = "") => `<div class="app">${side(on)}<div class="top">${title ? `<div class="ttl">${title}</div>` : '<div class="tog"><span class="on">Trading</span><span>Chat</span></div>'}</div><div class="main">${inner}</div></div>`;
const toast = (cls, head, main, sub) => `<div class="toast ${cls}"><div class="ti">${CUBE}</div><div style="flex:1"><div class="tt"><span>${head}</span><span>now</span></div><div class="tm">${main}</div><div class="ts">${sub}</div></div></div>`;
const AIL = { Claude: "claude-color", GPT: "openai", Gemini: "gemini-color", DeepSeek: "deepseek-color", Grok: "grok", Llama: "meta-color" };
const aiTile = (n) => (n === "Jev" ? `<img class="jevl" src="assets/ai/jev.png" alt="">` : `<img src="assets/ai/${AIL[n]}.svg" alt="">`) + `<span>${n}</span>`;
const BROKERS = [["metatrader5.webp", "MetaTrader 4 / 5"], ["binance.svg", "Binance"], ["okx.svg", "OKX"], ["bitget.svg", "Bitget"], ["kraken.svg", "Kraken"], ["coinbase.svg", "Coinbase"], ["etoro.svg", "eToro"], ["ibkr.webp", "Interactive Brokers"], ["robinhood.svg", "Robinhood"], ["moonx.svg", "MoonX"], ["hyperliquid.png", "Hyperliquid"]];

// Each scene: html + js(T, D) where T = absolute start, D = duration; f(x) = T + x*D places a beat at x (0..1) of the segment.
const SCENES = {
  // ---------- hook (h1..h5). Presenter takes: speech starts at T+0.1; demo voice-overs: at T+0.2 ----------
  oh1: () => ({
    html: `<div class="hk1"><div class="hkl1"><img src="assets/ai/claude-color.svg" alt="">AI just ended</div><div class="hkl2"><span>DAY TRADING</span><i></i></div></div>`,
    js: () => `tl.fromTo(S+".hkl1",{scale:1.8,opacity:0,filter:"blur(14px)"},{scale:1,opacity:1,filter:"blur(0px)",duration:.35,ease:"expo.out"},T+.1);
      tl.fromTo(S+".hkl2",{scale:2.2,opacity:0},{scale:1,opacity:1,duration:.3,ease:"expo.out"},T+1.98);
      [[-14,6],[12,-5],[-8,3],[5,-2],[0,0]].forEach(([x,y],k)=>tl.to(S+".hk1",{x:x,y:y,duration:.04},T+2.0+k*.04));
      tl.fromTo(S+".hkl2 i",{scaleX:0},{scaleX:1,duration:.22,ease:"power3.out"},T+2.42);tl.to(S+".hkl2 span",{color:"#ffffffb3",duration:.2},T+2.5);tl.to(S+".hk1",{opacity:0,scale:.96,duration:.25},T+D-.3);`,
  }),
  // (unused) h2 split screen: dark panel on the left, the presenter (45° camera) is cropped to the right half by produce-full.py (SPLIT)
  oh2: () => ({
    html: `<div class="sp">${[["01", "Hours staring", "at charts", "hk-night.png"], ["02", "Years of", "studying", "hk-study.png"], ["03", "Being an", "expert", "hk-wall.png"]].map(([n, a, b, img], k) => `<div class="spk q${k}"><div class="spn mono">NO MORE · ${n}</div><div class="spt">${a}<br>${b}<i></i></div><div class="spc"><img src="assets/img/${img}" alt=""><span class="spx">✕</span></div></div>`).join("")}</div>`,
    js: () => `const V=T+.1;tl.fromTo(S+".sp",{xPercent:-100},{xPercent:0,duration:.45,ease:"expo.out"},T);
      [[0,1.68,2.32],[2.32,3.44,4.16],[4.16,5.12,99]].forEach(([a,b,e],k)=>{const q=S+".q"+k;tl.fromTo(q,{y:40,opacity:0},{y:0,opacity:1,duration:.35,ease:"expo.out"},V+a-(k?.05:-.15));
        tl.fromTo(q+" .spc img",{scale:1.15},{scale:1,duration:2.2,ease:"power1.out"},V+a);tl.fromTo(q+" i",{scaleX:0},{scaleX:1,duration:.22,ease:"power3.out"},V+b+.2);
        tl.fromTo(q+" .spx",{scale:0},{scale:1,duration:.3,ease:"back.out(3)"},V+b+.25);tl.to(q+" .spc img",{filter:"grayscale(1) brightness(.6)",duration:.3},V+b+.25);if(e<99)tl.to(q,{y:-30,opacity:0,duration:.2},V+e-.15);});`,
  }),
  // full-screen b-roll (night trader / student / trading floor) laid in the base track by produce-full.py (BROLL);
  // this overlay only adds the vignette, the three lines and their strike-through, cut on the same beats
  hookKin: () => ({
    html: `<div class="hkv"></div><div class="hkrows">${[["No more hours", "staring at charts"], ["No more years", "of studying"], ["No need to be", "an expert"]].map(([a, b], k) => `<div class="hkr r${k}"><div><span class="hka">${a}</span><span class="hkb">${b}</span><i></i></div></div>`).join("")}</div>`,
    js: () => `const V=T+.2;tl.fromTo(S+".hkv",{opacity:0},{opacity:1,duration:.25},T);
      [[0,1.68,2.45],[2.32,3.44,4.3],[4.16,5.12,D]].forEach(([a,b,e],k)=>{const r=S+".r"+k;tl.fromTo(r,{scale:1.35,opacity:0,filter:"blur(14px)"},{scale:1,opacity:1,filter:"blur(0px)",duration:.32,ease:"expo.out"},k?T+[0,2.45,4.3][k]:V);
        tl.fromTo(r,{y:0},{y:-14,duration:e-a,ease:"none"},V+a);[[-10,5],[8,-4],[-4,2],[0,0]].forEach(([x,y],j)=>tl.to(S+".hkrows",{x:x,y:y,duration:.035},(k?T+[0,2.45,4.3][k]:V)+.05+j*.035));
        tl.fromTo(r+" i",{scaleX:0},{scaleX:1,duration:.22,ease:"power3.out"},V+b+.2);tl.to(r+" .hkb",{color:"#ffffff99",duration:.2},V+b+.3);if(k<2)tl.to(r,{opacity:0,scale:.96,duration:.12},T+e-.1);});`,
  }),
  oh3: () => {
    const P = [["Claude", 0, 0], ["GPT", 260, 0], ["Gemini", 500, 0], ["DeepSeek", 60, 100], ["Grok", 330, 100], ["Llama", 540, 100]];
    return {
      html: `<div class="hk3">${P.map(([n, x, y], k) => `<div class="ai2 c${k}" style="left:${x}px;top:${y}px">${aiTile(n)}</div>`).join("")}<div class="hk3c">${CUBE}<b>cubrik</b></div></div>`,
      js: () => `${P.map(([, x, y], k) => `tl.fromTo(S+".c${k}",{y:${y + 40},opacity:0},{y:${y},opacity:1,duration:.3,ease:"back.out(2)"},T+${(1.1 + k * 0.17).toFixed(2)});tl.to(S+".c${k}",{x:${330 - x - 60},y:${250},scale:.3,opacity:0,duration:.4,ease:"power3.in"},T+${(3.5 + k * 0.05).toFixed(2)});`).join("")}
        tl.fromTo(S+".hk3c",{scale:.3,opacity:0},{scale:1,opacity:1,duration:.45,ease:"back.out(2.6)"},T+4.2);tl.to(S+".hk3c",{scale:1.12,duration:.12,yoyo:true,repeat:1},T+5.45);tl.to(S+".hk3",{opacity:0,duration:.3},T+D-.3);`,
    };
  },
  hookYT: () => ({
    html: `<div class="ytw hyy"><div class="vcard2"><div class="vthumb"><img src="assets/img/thumb.jpg" alt=""><div class="vplay"><img src="assets/youtube.svg" alt=""></div><span class="vdur mono">14:32</span></div>
      <div class="vt">My 1H Gold Strategy That Actually Works</div><div class="vm">@MaxTradesFX · 1.2M views</div><div class="vbar"><span>👍 48K</span><span>↗ Share</span><span class="copy">🔗 Copy link</span></div><div class="copied mono">✓ Link copied</div></div></div>
      <div class="hyp"><div class="hcube">${CUBE}</div><div class="pbox"><div class="hyl mono">youtube.com/watch?v=gold-1h</div><div class="pfoot"><span class="mdl">Model <b>Claude</b> · Mode <b>Balanced</b></span><span class="send">↑</span></div></div>
        <div class="chips hych"><span class="chip y0"><i>✓</i>watched the video</span><span class="chip y1"><i>✓</i>strategy copied</span><span class="chip y2"><i>✓</i>running automatically</span></div></div>
      <div class="hyx">${[["night", "😴", "3:12 AM", "While you sleep", "Order placed · XAU/USD long", "London sweep confirmed · on your broker"], ["sun", "🌴", "Tue · 2:47 PM", "While you're on vacation", "Take profit hit · XAU/USD", "Target 2R reached · position closed"]].map(([c, e, t, l, m, sub], k) => `<div class="hyc ${c} hc${k}"><div class="hyart">${c === "night" ? '<i class="hst h1"></i><i class="hst h2"></i><i class="hst h3"></i><i class="hst h4"></i><div class="moon"></div>' : '<div class="sunb"></div><div class="sea"></div>'}<div class="hye">${e}</div></div><div class="hyt">${t}</div><div class="hylb">${l}</div><div class="hyn"><div class="nti">${CUBE}</div><div><div class="ntt"><b>cubrik</b><span>now</span></div><div class="ntm">${m}</div><div class="nts">${sub}</div></div></div></div>`).join("")}</div>`,
    js: () => `const V=T+.2;tl.fromTo(S+".vcard2",{y:60,opacity:0,scale:.92},{y:0,opacity:1,scale:1,duration:.45,ease:"expo.out"},T);tl.fromTo(S+".vcard2",{scale:1},{scale:1.04,duration:2.4,ease:"none"},V+.45);tl.to(S+".copy",{backgroundColor:"#a855f7",color:"#fff",duration:.12},V+.6);tl.fromTo(S+".copied",{opacity:0,y:10},{opacity:1,y:0,duration:.2},V+.75);
      tl.to(S+".hyy",{opacity:0,scale:.9,filter:"blur(8px)",duration:.35,ease:"power2.in"},V+2.55);tl.fromTo(S+".hyp",{opacity:0,scale:1.05},{opacity:1,scale:1,duration:.4,ease:"expo.out"},V+2.75);
      tl.fromTo(S+".hyl",{opacity:0,x:-24},{opacity:1,x:0,duration:.2,ease:"expo.out"},V+2.9);tl.fromTo(S+".hyl",{backgroundColor:"#a855f755"},{backgroundColor:"#a855f700",duration:.7},V+2.95);
      tl.to(S+".send",{backgroundColor:"#a855f7",scale:1.15,duration:.1,yoyo:true,repeat:1},V+3.65);[4.5,5.1,6.3].forEach((w,k)=>tl.fromTo(S+".y"+k,{y:14,opacity:0},{y:0,opacity:1,duration:.3,ease:"back.out(2)"},V+w));tl.to(S+".y2",{borderColor:"#34d399",color:"#34d399",duration:.4},V+6.4);
      tl.to(S+".hyp",{opacity:0,y:-40,duration:.4,ease:"power2.in"},V+6.95);tl.fromTo(S+".hyx",{opacity:0},{opacity:1,duration:.3},V+7.0);tl.fromTo(S+".hc0",{x:375},{x:375,duration:.01},V+7.0);tl.to(S+".hc0",{x:0,duration:.6,ease:"expo.inOut"},V+8.3);
      [7.15,8.4].forEach((w,k)=>{const c=S+".hc"+k;tl.fromTo(c,{y:80,opacity:0,rotationX:18},{y:0,opacity:1,rotationX:0,duration:.6,ease:"expo.out"},V+w);tl.fromTo(c+" .hye",{scale:.4},{scale:1,duration:.6,ease:"back.out(2)"},V+w+.1);tl.fromTo(c+" .hyn",{y:-30,opacity:0,scale:.94},{y:0,opacity:1,scale:1,duration:.45,ease:"back.out(1.8)"},V+w+.45);tl.fromTo(c+" .hyart",{scale:1.12},{scale:1,duration:3,ease:"power1.out"},V+w);});
      tl.to(S+".hst",{opacity:.25,duration:.5,yoyo:true,repeat:5,stagger:.15},V+7.2);tl.fromTo(S+".hyx",{scale:1},{scale:1.04,duration:3.4,ease:"none"},V+7.1);`,
  }),
  oh5: () => ({ html: `<div class="lt"><div class="pill p1">This changes how you trade</div><div class="pill p2">Forever.</div></div>`, js: () => `tl.fromTo(S+".p1",{x:-80,opacity:0},{x:0,opacity:1,duration:.3,ease:"expo.out"},T+.4);tl.fromTo(S+".p2",{scale:1.8,opacity:0},{scale:1,opacity:1,duration:.3,ease:"expo.out",transformOrigin:"left center"},T+2.15);tl.to(S+".lt",{opacity:0,x:-40,duration:.25},T+D-.35);` }),
  // ---------- presenter overlays ----------
  o04: () => ({
    html: `<div class="duo2"><div class="pp a">0 TRADES</div><div class="pp b">10 YEARS</div><div class="pp c">ANYONE</div></div>`,
    js: () => `tl.fromTo(S+".a",{y:40,opacity:0},{y:0,opacity:1,duration:.35,ease:"back.out(2)"},f(.55));tl.fromTo(S+".b",{y:40,opacity:0},{y:0,opacity:1,duration:.35,ease:"back.out(2)"},f(.75));tl.to(S+".a",{x:150,opacity:0,duration:.3},f(.9));tl.to(S+".b",{x:-150,opacity:0,duration:.3},f(.9));tl.fromTo(S+".c",{scale:.4,opacity:0},{scale:1,opacity:1,duration:.35,ease:"back.out(2.4)"},f(.92));`,
  }),
  o06: () => ({
    html: `<div class="ais">${["Claude", "GPT", "Gemini", "DeepSeek", "Grok", "Jev"].map((n, k) => `<div class="ai2 a${k}${n === "Jev" ? " jev" : ""}">${aiTile(n)}</div>`).join("")}</div>`,
    js: () => `[6.4,7.2,8.24,9.04,9.92].forEach((w,k)=>tl.fromTo(S+".a"+k,{y:30,opacity:0},{y:0,opacity:1,duration:.3,ease:"back.out(2)"},T+.05+w));tl.fromTo(S+".a5",{scale:.5,opacity:0},{scale:1,opacity:1,duration:.4,ease:"back.out(2.6)"},T+.05+10.72);tl.to(S+".ais",{opacity:0,duration:.25},T+D-.3);`,
  }),
  o08: () => ({
    html: `<div class="be"><div class="bec x1"><span class="mono">BEGINNER</span><b>Just talk to it</b></div><div class="bec x2"><span class="mono">EXPERT</span><b>Your edge, on autopilot</b></div></div>`,
    js: () => `tl.fromTo(S+".x1",{x:-60,opacity:0},{x:0,opacity:1,duration:.4,ease:"expo.out"},f(.06));tl.fromTo(S+".x2",{x:-60,opacity:0},{x:0,opacity:1,duration:.4,ease:"expo.out"},f(.4));tl.to(S+".be",{opacity:0,duration:.3},f(.94));`,
  }),
  o09: () => ({ html: `<div class="tag serif">If you can explain it,<br><b>it can trade it.</b></div>`, js: () => `tl.fromTo(S+".tag",{y:40,opacity:0},{y:0,opacity:1,duration:.5,ease:"expo.out"},f(.36));` }),
  chap: (n, label) => () => ({ html: `<div class="chap"><span class="mono">${n}</span><b>${label}</b></div>`, js: () => `tl.fromTo(S+".chap",{x:-80,opacity:0},{x:0,opacity:1,duration:.45,ease:"expo.out"},f(.04));tl.to(S+".chap",{opacity:0,x:-40,duration:.3},f(.9));` }),
  o13: () => ({ html: `<div class="lt"><div class="pill p1">🔒 Trade-only access</div><div class="pill p2s">No withdrawals. Ever.</div></div>`, js: () => `tl.fromTo(S+".p1",{x:-80,opacity:0},{x:0,opacity:1,duration:.3,ease:"expo.out"},f(.18));tl.fromTo(S+".p2s",{x:-80,opacity:0},{x:0,opacity:1,duration:.3,ease:"expo.out"},f(.42));tl.to(S+".lt",{opacity:0,duration:.3},f(.93));` }),
  o17: () => ({
    html: `<div class="fseg"><span class="s1">Every 1 h</span><span class="s2">15 min</span><span class="s3">5 min</span></div><div class="lt" style="bottom:110px"><div class="pill p2s">Demo first · 2 weeks · 20 trades</div></div>`,
    js: () => `tl.fromTo(S+".fseg",{y:40,opacity:0},{y:0,opacity:1,duration:.4,ease:"back.out(2)"},f(.05));[1,2,3].forEach(k=>tl.to(S+".s"+k,{backgroundColor:"#7c3aed",color:"#fff",duration:.15},f(.12+k*.1)));[1,2].forEach(k=>tl.to(S+".s"+k,{backgroundColor:"rgba(0,0,0,0)",color:"#8b8b93",duration:.15},f(.22+k*.1)));tl.to(S+".fseg",{opacity:0,duration:.3},f(.5));tl.fromTo(S+".p2s",{x:-80,opacity:0},{x:0,opacity:1,duration:.35,ease:"expo.out"},f(.58));tl.to(S+".lt",{opacity:0,duration:.3},f(.94));`,
  }),
  o25: () => ({ html: `<div class="tag serif">Your rules,<br><b>on autopilot.</b></div>`, js: () => `tl.fromTo(S+".tag",{y:40,opacity:0},{y:0,opacity:1,duration:.5,ease:"expo.out"},f(.2));` }),
  o28: () => ({ html: `<div class="lt"><div class="pill p1">📱 Your phone tells you</div></div>`, js: () => `tl.fromTo(S+".p1",{x:-80,opacity:0},{x:0,opacity:1,duration:.35,ease:"expo.out"},f(.55));` }),
  o30: () => ({ html: `<div class="lt"><div class="pill p2s">An AI coach that reads your data</div></div>`, js: () => `tl.fromTo(S+".p2s",{x:-80,opacity:0},{x:0,opacity:1,duration:.35,ease:"expo.out"},f(.2));` }),
  o33: () => ({
    html: `<div class="errs">${["The widened stop", "The doubled size", "The 11 pm revenge trade"].map((e, k) => `<div class="err e${k}">${e}<i></i></div>`).join("")}</div>`,
    js: () => `[0,1,2].forEach(k=>{tl.fromTo(S+".e"+k,{x:-50,opacity:0},{x:0,opacity:1,duration:.3,ease:"expo.out"},f(.52+k*.13));tl.fromTo(S+".e"+k+" i",{scaleX:0},{scaleX:1,duration:.2},f(.6+k*.13));});`,
  }),
  o36: () => ({
    html: `<div class="end"><div class="endc">${CUBE}<div class="ebig">Start free on demo</div><div class="eurl mono">cubrik.ai · link in the description</div><div class="eapp"> Download on the App Store</div></div><div class="legal mono">Not financial advice. Trading involves risk.</div></div>`,
    js: () => `tl.fromTo(S+".endc",{y:60,opacity:0,scale:.94},{y:0,opacity:1,scale:1,duration:.5,ease:"expo.out"},f(.08));tl.fromTo(S+".legal",{opacity:0},{opacity:1,duration:.4},f(.3));`,
  }),

  // ---------- full-screen demos ----------
  explain: () => ({
    html: shell("AI agents", `<div class="col">
      <div class="ubub">${typed("Buy gold when London sweeps the last low and reclaims it. Stop under the swing, 2R target.")}</div>
      <div class="ai"><div class="av">${CUBE}</div><div style="flex:1">
        <div class="chips"><span class="chip c0"><i>✓</i>claude · read strategy</span><span class="chip c1"><i>✓</i>cubrik · build agent</span></div>
        <div class="card"><div class="ch1"><span class="dot"></span><span class="cn">Gold London sweep</span><span class="bro"><img src="assets/brokers/metatrader5.webp" alt="">MetaTrader</span><span class="sw"><span class="swt on"><b></b></span><span>Running</span></span></div>
          <div class="run">Every 5 min · XAU/USD · 1h · watching the market</div>
          <div class="runs"><div class="rl r0"><span class="mono">9:35</span>Nothing to do · position running, stop at break-even</div><div class="rl r1"><span class="mono">9:40</span><b class="pos">Take profit hit</b> · XAU/USD long closed at 4,214</div></div></div>
      </div></div></div>`) + toast("t1", "cubrik · Gold London sweep", "Order placed · XAU/USD long", "at 4,172 · SL 4,151 · TP 4,214 · on your broker"),
    js: () => `typeReal(S+".ubub",f(.02),f(.24));tl.fromTo(S+".ai",{opacity:0},{opacity:1,duration:.2},f(.25));tl.fromTo(S+".c0",{y:14,opacity:0},{y:0,opacity:1,duration:.22,ease:"back.out(2.5)"},f(.27));tl.fromTo(S+".c1",{y:14,opacity:0},{y:0,opacity:1,duration:.22,ease:"back.out(2.5)"},f(.32));
      tl.fromTo(S+".card",{y:60,opacity:0,scale:.96},{y:0,opacity:1,scale:1,duration:.45,ease:"expo.out"},f(.36));cam(S,f(.36),1.12,-40,-120,1.2);
      tl.fromTo(S+".t1",{x:640},{x:0,duration:.45,ease:"back.out(1.6)"},f(.64));tl.fromTo(S+".r0",{opacity:0,x:-20},{opacity:1,x:0,duration:.3},f(.8));tl.fromTo(S+".r1",{opacity:0,x:-20},{opacity:1,x:0,duration:.3},f(.88));`,
  }),
  signup: () => ({
    html: `<div class="auth">
      <div class="acube">${CUBE}</div><div class="ah">Sign in to cubrik</div><div class="asub">No passwords. We e-mail you a link and a code.</div>
      <div class="flab">E-mail address</div><div class="field"><span class="em">${typed("alex@gmail.com")}</span></div>
      <div class="chk"><span class="box"><b>✓</b></span>I confirm I am 18 or older and I accept the Terms of Service and the Risk Disclosure.</div>
      <div class="btn b1">Continue with e-mail</div><div class="or mono">or</div><div class="btn b2"> Continue with Apple</div><div class="btn b2">G&nbsp; Continue with Google</div>
      <div class="code"><div class="ch2">Enter the 6-digit code</div><div class="digits">${[4, 8, 2, 9, 1, 7].map((n, k) => `<span class="dg d${k}">${n}</span>`).join("")}</div></div>
    </div>
    <div class="home"><div class="hcube">${CUBE}</div><div class="hh serif">Good evening, Alex</div><div class="hbox">Describe the agent you want to set up<span class="mdl">Model <b>Claude</b> · Mode <b>Balanced</b></span></div>
      <div class="plan"><span class="pp2 q0">Demo plan · free</span><span class="pp2 q1">No card</span><span class="pp2 q2">No time limit</span></div></div>`,
    js: () => `tl.fromTo(S+".auth",{y:40,opacity:0},{y:0,opacity:1,duration:.45,ease:"expo.out"},f(0));typeReal(S+".em",f(.05),f(.2));tl.to(S+".box",{backgroundColor:"#a855f7",borderColor:"#a855f7",duration:.12},f(.22));tl.fromTo(S+".box b",{scale:0},{scale:1,duration:.2,ease:"back.out(3)"},f(.22));
      tl.to(S+".b1",{backgroundColor:"#f2f1ec",color:"#0d0d0f",duration:.15},f(.25));tl.to(S+".b1",{scale:.96,duration:.08,yoyo:true,repeat:1},f(.28));
      tl.to([S+".field",S+".chk",S+".b1",S+".or",S+".b2",S+".flab"],{opacity:0,y:-20,duration:.3,stagger:.02},f(.31));tl.fromTo(S+".code",{opacity:0,y:30},{opacity:1,y:0,duration:.35,ease:"expo.out"},f(.34));
      [0,1,2,3,4,5].forEach(k=>tl.fromTo(S+".d"+k,{scale:.4,opacity:0},{scale:1,opacity:1,duration:.18,ease:"back.out(3)"},f(.38+k*.025)));
      tl.to(S+".auth",{opacity:0,scale:.96,duration:.35},f(.53));tl.fromTo(S+".home",{opacity:0,scale:1.04},{opacity:1,scale:1,duration:.5,ease:"expo.out"},f(.55));
      [0,1,2].forEach(k=>tl.fromTo(S+".q"+k,{y:30,opacity:0},{y:0,opacity:1,duration:.3,ease:"back.out(2.2)"},f(.66+k*.07)));`,
  }),
  brokers: () => ({
    html: shell("Brokers", `<div class="col"><div class="h2x">Connect a broker</div><div class="sub2">Runs on the broker you already use.</div>
      <div class="bgrid">${BROKERS.map(([img, n], k) => `<div class="bt k${k}"><img src="assets/brokers/${img}" alt=""><span>${n}</span></div>`).join("")}<div class="bt k${BROKERS.length} btx"><b>＋</b><span>Broker not listed?<br>Connect it here</span></div></div>
      <div class="modal"><div class="mh"><img src="assets/brokers/metatrader5.webp" alt="">Connect MetaTrader 5</div>
        <div class="opt o1"><b>One-click</b><span>Where your broker allows it</span></div><div class="opt o2"><b>API key · login</b><span>Trade-only, no withdrawal rights</span></div>
        <div class="prog"><i></i></div><div class="ok2">✓ Connected · trading on · withdrawals off</div></div></div>`, "Brokers"),
    js: () => `const V=T+.2;${[...BROKERS, 0].map((_, k) => `tl.fromTo(S+".k${k}",{y:30,opacity:0},{y:0,opacity:1,duration:.3,ease:"back.out(2)"},T+${(0.05 + k * 0.05).toFixed(2)});`).join("")}
      ${[0, 2.16, 3.12, 4.16, 5.04, 5.92, 6.8, 8.0, 9.36, null, 9.85].map((w, k) => w === null ? "" : `tl.to(S+".k${k}",{borderColor:"#a855f7",backgroundColor:"#a855f71f",boxShadow:"0 0 0 3px #a855f766",scale:1.06,duration:.12},V+${w});tl.to(S+".k${k}",{borderColor:"#2a2a30",backgroundColor:"#0d0d0f",boxShadow:"0 0 0 0px #a855f700",scale:1,duration:.3},V+${(w + 0.75).toFixed(2)});`).join("")}
      tl.to(S+".k0",{borderColor:"#a855f7",boxShadow:"0 0 0 3px #a855f766",duration:.15},V+10.1);tl.fromTo(S+".modal",{y:60,opacity:0,scale:.95},{y:0,opacity:1,scale:1,duration:.4,ease:"expo.out"},V+10.15);cam(S,V+10.15,1.08,-80,-60,1);
      tl.to(S+".btx",{borderColor:"#a855f7",backgroundColor:"#a855f71a",scale:1.06,duration:.15,yoyo:true,repeat:1},V+9.95);tl.to(S+".o1",{borderColor:"#a855f7",backgroundColor:"#a855f71a",duration:.2},V+10.6);tl.to(S+".o2",{borderColor:"#a855f7",backgroundColor:"#a855f71a",duration:.2},V+12.8);tl.fromTo(S+".prog i",{scaleX:0},{scaleX:1,duration:1.4,ease:"power2.inOut"},V+13.4);tl.fromTo(S+".ok2",{scale:.6,opacity:0},{scale:1,opacity:1,duration:.3,ease:"back.out(2.5)"},V+14.9);`,
  }),
  prompt: () => ({
    html: shell("", `<div class="pwrap"><div class="hh serif">What should your agent do?</div>
      <div class="pbox"><div class="ptxt">${typed("On gold, 1 hour chart, during London: wait for a sweep of the last low, buy the reclaim. Stop under the swing, target twice the risk, 1% risk per trade.")}</div><div class="pfoot"><span class="mdl">Model <b>Claude</b> · Mode <b>Balanced</b></span><span class="send">↑</span></div></div>
      <div class="parsed">${["XAU/USD", "1h", "London session", "Sweep → reclaim", "SL under swing", "TP 2R", "Risk 1%"].map((p, k) => `<span class="pc g${k}">${p}</span>`).join("")}</div></div>`),
    js: () => `tl.fromTo(S+".pbox",{y:30,opacity:0},{y:0,opacity:1,duration:.4,ease:"expo.out"},f(.01));typeReal(S+".ptxt",f(.1),f(.8));cam(S,f(.1),1.12,0,40,6);${[0.3, 0.38, 0.44, 0.55, 0.66, 0.74, 0.82].map((x, k) => `tl.fromTo(S+".g${k}",{y:20,opacity:0,scale:.8},{y:0,opacity:1,scale:1,duration:.25,ease:"back.out(2.5)"},f(${x}));`).join("")}tl.to(S+".send",{backgroundColor:"#a855f7",scale:1.15,duration:.12,yoyo:true,repeat:1},f(.92));`,
  }),
  agent: () => ({
    html: shell("AI agents", `<div class="col">
      <div class="ai"><div class="av">${CUBE}</div><div style="flex:1"><div class="say serif">Two quick questions before I build it:</div>
        <div class="qs"><div class="q qa">Which account? <span class="qc on">MetaTrader 5 · demo</span><span class="qc">Binance</span></div><div class="q qb">Max trades per day? <span class="qc">1</span><span class="qc on">2</span><span class="qc">3</span></div></div>
        <div class="card cagent"><div class="ch1"><span class="dot"></span><span class="cn">Gold London sweep</span><span class="bro"><img src="assets/brokers/metatrader5.webp" alt="">MetaTrader</span><span class="jevr"><svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" stroke="#2a2a30" stroke-width="5" fill="none"/><circle class="arc" cx="22" cy="22" r="18" stroke="#a855f7" stroke-width="5" fill="none" stroke-linecap="round" transform="rotate(-90 22 22)"/></svg><b class="jn">0</b><span class="mono">JEV SCORE</span></span></div>
          <div class="bt2"><div class="bth mono">BACKTEST · 5 YEARS · FEES + SLIPPAGE · DATA VIA TRADINGVIEW</div><svg viewBox="0 0 560 130"><path class="eqf" d="${EQ()} L560 130 L0 130 Z" fill="rgba(168,85,247,.16)"/><path class="eql" d="${EQ()}" fill="none" stroke="#a855f7" stroke-width="4" stroke-linejoin="round"/></svg>
          <div class="stats2"><div class="st"><span>WIN RATE</span><b>61%</b></div><div class="st"><span>PROFIT FACTOR</span><b>1.8</b></div><div class="st"><span>MAX DRAWDOWN</span><b>6.2%</b></div><div class="st"><span>TRADES</span><b>412</b></div></div></div></div>
      </div></div></div>`),
    js: () => `tl.fromTo(S+".say",{opacity:0,y:10},{opacity:1,y:0,duration:.3},f(.01));tl.fromTo(S+".qa",{x:-30,opacity:0},{x:0,opacity:1,duration:.3},f(.05));tl.fromTo(S+".qb",{x:-30,opacity:0},{x:0,opacity:1,duration:.3},f(.1));
      tl.fromTo(S+".cagent",{y:60,opacity:0},{y:0,opacity:1,duration:.45,ease:"expo.out"},f(.18));const C=2*Math.PI*18;tl.fromTo(S+".arc",{strokeDasharray:C,strokeDashoffset:C},{strokeDashoffset:C*(1-.86),duration:1.4,ease:"power2.out"},f(.24));count(S+".jn",0,86,f(.24),1.4);
      cam(S,f(.24),1.1,-120,-60,1.4);tl.to(S+" .app",{x:0,y:-170,scale:1.08,duration:1.2,ease:"power2.inOut"},f(.48));
      const L=document.querySelector(S+".eql").getTotalLength();tl.fromTo(S+".eql",{strokeDasharray:L,strokeDashoffset:L},{strokeDashoffset:0,duration:2.2,ease:"power2.out"},f(.52));tl.fromTo(S+".eqf",{opacity:0},{opacity:1,duration:.8},f(.62));tl.fromTo(S+".stats2 .st",{y:20,opacity:0},{y:0,opacity:1,duration:.3,stagger:.12},f(.7));`,
  }),
  approve: () => ({
    html: shell("AI agents", `<div class="col"><div class="card big2"><div class="ch1"><span class="dot"></span><span class="cn">Gold London sweep</span><span class="bro"><img src="assets/brokers/metatrader5.webp" alt="">MetaTrader</span><span class="sw"><span class="swt"><b></b></span><span class="swl">Paused</span></span></div>
      <div class="run">Every 5 min · XAU/USD · 1h · demo account</div></div>
      <div class="modal m2"><div class="mh">Go live on MetaTrader?</div><div class="ml">1% risk per trade · stop loss on every order · max daily loss −3%</div><div class="mb"><span class="btn3">Cancel</span><span class="btn3 go">Approve</span></div></div>
      <div class="okline serif">Nothing goes live without your OK.</div></div>`),
    js: () => `tl.fromTo(S+".m2",{y:50,opacity:0,scale:.95},{y:0,opacity:1,scale:1,duration:.4,ease:"expo.out"},f(.02));tl.to(S+".go",{scale:.94,duration:.08,yoyo:true,repeat:1},f(.38));tl.to(S+".m2",{opacity:0,y:-20,duration:.25},f(.44));
      tl.to(S+".swt",{backgroundColor:"#a855f7",duration:.15},f(.48));tl.to(S+".swt b",{x:26,duration:.18,ease:"back.out(2)"},f(.48));tl.set(S+".swl",{textContent:"Running"},f(.5));tl.fromTo(S+".okline",{y:30,opacity:0},{y:0,opacity:1,duration:.4,ease:"expo.out"},f(.56));cam(S,f(0),1.06,0,0,D);`,
  }),
  library: () => ({
    html: shell("Library", `<div class="col wide"><div class="h2x">Library</div><div class="sub2">No ranking, no promises. Sort, read the rules, copy.</div>
      <div class="tabs"><span class="tb on" data-k="0">Win rate</span><span class="tb" data-k="1">Drawdown</span><span class="tb" data-k="2">Return</span></div>
      <div class="lgrid">${[["Gold London sweep", "XAU/USD · 1h · saltmarsh", "+21.1%", "58%"], ["Volume breakout", "BTC, ETH +3 · 1h · novapulse", "+13.2%", "40%"], ["Momentum break", "SOL, ETH +2 · 1h · kestrelshore", "+15.6%", "40%"], ["Order block retest", "BTC, ETH +3 · 1h · umber_pike", "+12.5%", "42%"], ["Quiet-market reversion", "BTC, SOL +2 · 1h · cedar_grove", "+7.9%", "61%"], ["Calm trend follower", "BTC, ETH +3 · 4h · umberowl", "+5.3%", "43%"]]
        .map(([n, m, r, w], k) => `<div class="lc l${k}"><div class="ln">${n}</div><div class="lm mono">${m}</div><svg viewBox="0 0 200 50"><path d="${EQ(14, 1.2).replace(/(\d+\.?\d*) (\d+\.?\d*)/g, (_, x, y) => `${(x / 2.8).toFixed(1)} ${(y / 2.6).toFixed(1)}`)}" fill="none" stroke="#a855f7" stroke-width="2.5"/></svg><div class="lr"><span class="pos">${r}</span><span>${w} win rate</span><span class="cp">Copy</span></div></div>`).join("")}</div></div>`, "Library") + toast("t2", "cubrik · Library", "Gold London sweep copied", "Started on MetaTrader · demo account"),
    js: () => `[0,1,2,3,4,5].forEach(k=>tl.fromTo(S+".l"+k,{y:40,opacity:0},{y:0,opacity:1,duration:.35,ease:"back.out(1.8)"},f(.02+k*.04)));
      tl.to(S+'.tb[data-k="0"]',{backgroundColor:"rgba(0,0,0,0)",color:"#8b8b93",duration:.1},f(.36));tl.to(S+'.tb[data-k="1"]',{backgroundColor:"#1f1f24",color:"#f2f1ec",duration:.1},f(.36));tl.to(S+".lgrid",{opacity:.4,duration:.12,yoyo:true,repeat:1},f(.36));
      tl.to(S+'.tb[data-k="1"]',{backgroundColor:"rgba(0,0,0,0)",color:"#8b8b93",duration:.1},f(.46));tl.to(S+'.tb[data-k="2"]',{backgroundColor:"#1f1f24",color:"#f2f1ec",duration:.1},f(.46));tl.to(S+".lgrid",{opacity:.4,duration:.12,yoyo:true,repeat:1},f(.46));
      cam(S,f(.58),1.25,260,120,1);tl.to(S+".l0",{borderColor:"#a855f7",boxShadow:"0 0 0 3px #a855f755",duration:.2},f(.62));tl.to(S+".l0 .cp",{backgroundColor:"#a855f7",color:"#fff",scale:1.1,duration:.12,yoyo:true,repeat:1},f(.72));
      tl.fromTo(S+".t2",{x:640},{x:0,duration:.45,ease:"back.out(1.6)"},f(.8));tl.to(S+" .app",{scale:1,x:0,y:0,duration:.8,ease:"power2.inOut"},f(.84));`,
  }),
  youtube: () => ({
    html: `<div class="ytw"><div class="vcard2"><div class="vthumb"><img src="assets/img/thumb.jpg" alt=""><div class="vplay"><img src="assets/youtube.svg" alt=""></div><span class="vdur mono">14:32</span></div>
      <div class="vt">My 1H Gold Strategy That Actually Works</div><div class="vm">@MaxTradesFX · 1.2M views</div><div class="vbar"><span>👍 48K</span><span class="share">↗ Share</span><span class="copy">🔗 Copy link</span></div><div class="copied mono">✓ Link copied</div></div></div>`
      + shell("", `<div class="col"><div class="linkb"><img src="assets/img/thumb.jpg" alt=""><div><div class="lt2">My 1H Gold Strategy That Actually Works</div><div class="lu mono">youtube.com/watch?v=gold-1h</div></div></div>
        <div class="ai"><div class="av">${CUBE}</div><div style="flex:1"><div class="anh"><span class="spin"></span><span class="ant">cubrik is watching the video…</span><span class="and">✓ Video analyzed · 14:32</span></div><div class="vprog"><i></i></div>
          <div class="rules">${[["MARKET", "XAU/USD · 1h"], ["ENTRY", "RSI < 30 + bullish engulfing"], ["EXIT", "TP 2R · stop below low"], ["RISK", "1% per trade"]].map(([a, b], k) => `<div class="rr u${k}"><span class="mono">${a}</span>${b}</div>`).join("")}</div>
          <div class="miss serif">The video skips one thing: which session?</div><div class="qs"><div class="q"><span class="qc">London</span><span class="qc">New York</span><span class="qc on2">Both</span></div></div>
          <div class="made"><span class="dot"></span>Agent created · Gold 1H strategy · ready to backtest</div></div></div></div>`).replace('<div class="app">', '<div class="app ya">'),
    js: () => `tl.fromTo(S+".vcard2",{y:50,opacity:0,scale:.95},{y:0,opacity:1,scale:1,duration:.45,ease:"expo.out"},f(.01));tl.to(S+".share",{color:"#fff",duration:.1},f(.14));tl.to(S+".copy",{backgroundColor:"#a855f7",color:"#fff",duration:.12},f(.2));tl.fromTo(S+".copied",{opacity:0,y:10},{opacity:1,y:0,duration:.2},f(.22));
      tl.to(S+".ytw",{opacity:0,scale:.9,duration:.35,ease:"power2.in"},f(.27));tl.fromTo(S+".ya",{opacity:0,scale:1.05},{opacity:1,scale:1,duration:.4,ease:"expo.out"},f(.29));
      tl.fromTo(S+".linkb",{x:120,opacity:0},{x:0,opacity:1,duration:.35,ease:"expo.out"},f(.31));tl.fromTo(S+".ai",{opacity:0},{opacity:1,duration:.2},f(.36));tl.fromTo(S+".vprog i",{scaleX:0},{scaleX:1,duration:1.6,ease:"power1.inOut"},f(.37));tl.to(S+".ant",{opacity:0,duration:.1},f(.48));tl.fromTo(S+".and",{opacity:0},{opacity:1,duration:.2},f(.48));
      [0,1,2,3].forEach(k=>tl.fromTo(S+".u"+k,{x:-30,opacity:0},{x:0,opacity:1,duration:.28,ease:"back.out(2)"},f(.5+k*.04)));tl.fromTo(S+".miss",{opacity:0},{opacity:1,duration:.3},f(.68));tl.fromTo(S+".ya .qs",{opacity:0,y:10},{opacity:1,y:0,duration:.3},f(.72));tl.to(S+".on2",{backgroundColor:"#7c3aed",color:"#fff",duration:.15},f(.8));
      tl.fromTo(S+".made",{y:30,opacity:0},{y:0,opacity:1,duration:.35,ease:"back.out(2)"},f(.86));cam(S,f(.5),1.1,-60,-200,1.6);`,
  }),
  tradingview: () => ({
    html: `<div class="tvw"><div class="tvchart"><div class="tvh"><img src="assets/tradingview.svg" alt=""><span>XAUUSD · 1h</span><span class="mono pine">My RSI Strategy · Pine</span></div><svg viewBox="0 0 900 300"><path d="${EQ(40, 1.6).replace(/(\d+\.?\d*) (\d+\.?\d*)/g, (_, x, y) => `${(x * 1.6).toFixed(1)} ${(y * 2 + 20).toFixed(1)}`)}" fill="none" stroke="#26a69a" stroke-width="3"/></svg>
      <div class="alrt al0">🔔 Alert · RSI cross ↑ · XAUUSD</div><div class="alrt al1">🔔 Alert · Breakout · BTCUSD</div></div>
      <div class="tvdlg"><div class="tdh">Create alert on XAUUSD</div><div class="tdr"><span>Condition</span><b>My RSI Strategy · order fills</b></div><div class="tdr"><span>Webhook URL</span><b class="hook mono"><span class="hk">${[..."https://hooks.cubrik.ai/a/gold-rsi-7f3c"].map((c) => `<span class="ch">${c}</span>`).join("")}</span></b></div><div class="tdr"><span>Pine script</span><b class="unch">✓ unchanged</b></div><div class="tdb">Create</div></div>
      <div class="flow"><div class="fn f0"><img src="assets/tradingview.svg" alt="">TradingView alert</div><i class="fl l0"></i><div class="fn f1">${CUBE}cubrik agent</div><i class="fl l1"></i><div class="fn f2"><img src="assets/brokers/metatrader5.webp" alt="">Order placed · 0.8 s</div></div>
      <div class="guard"><span class="gd">✓ Stop loss on every order</span><span class="gd">✓ Max daily loss −3%</span><span class="gd">✓ Risk 1% per trade</span></div></div>`,
    js: () => `tl.fromTo(S+".tvchart",{y:40,opacity:0},{y:0,opacity:1,duration:.4,ease:"expo.out"},f(.01));tl.fromTo(S+".al0",{x:80,opacity:0},{x:0,opacity:1,duration:.3,ease:"back.out(2)"},f(.06));tl.fromTo(S+".al1",{x:80,opacity:0},{x:0,opacity:1,duration:.3,ease:"back.out(2)"},f(.1));
      tl.fromTo(S+".tvdlg",{y:60,opacity:0,scale:.95},{y:0,opacity:1,scale:1,duration:.4,ease:"expo.out"},f(.18));typeChars(S+".hk .ch",f(.22),f(.3));tl.fromTo(S+".unch",{scale:.6,opacity:0},{scale:1,opacity:1,duration:.3,ease:"back.out(2.5)"},f(.36));tl.to(S+".tdb",{backgroundColor:"#2962ff",scale:.95,duration:.1,yoyo:true,repeat:1},f(.42));
      tl.to([S+".tvchart",S+".tvdlg"],{opacity:0,y:-40,duration:.35},f(.47));tl.fromTo(S+".flow",{opacity:0},{opacity:1,duration:.2},f(.5));
      [0,1,2].forEach(k=>tl.fromTo(S+".f"+k,{scale:.6,opacity:0},{scale:1,opacity:1,duration:.3,ease:"back.out(2.2)"},f(.52+k*.08)));[0,1].forEach(k=>tl.fromTo(S+".l"+k,{scaleX:0},{scaleX:1,duration:.3,ease:"power2.out"},f(.56+k*.08)));
      tl.fromTo(S+".gd",{y:30,opacity:0},{y:0,opacity:1,duration:.3,stagger:.18,ease:"back.out(2)"},f(.76));`,
  }),
  iphone: () => {
    const SB = `<div class="ipsb"><span>9:41</span><span class="ipsi"><svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5" width="3" height="7" rx="1"/><rect x="10" y="2.5" width="3" height="9.5" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg><svg viewBox="0 0 16 12"><path d="M8 11.5l2.3-2.6a3.2 3.2 0 0 0-4.6 0z"/><path d="M8 5.6a6.4 6.4 0 0 1 4.5 1.9l1.3-1.5A8.4 8.4 0 0 0 8 3.6 8.4 8.4 0 0 0 2.2 6l1.3 1.5A6.4 6.4 0 0 1 8 5.6z"/><path d="M8 0a12 12 0 0 0-8 3.1l1.3 1.5a10 10 0 0 1 13.4 0L16 3.1A12 12 0 0 0 8 0z"/></svg><svg viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.5" fill="none" stroke="#fff" stroke-opacity=".45"/><rect x="2" y="2" width="18" height="9" rx="2"/><rect x="24.5" y="4.5" width="2" height="4" rx="1" fill-opacity=".45"/></svg></span></div>`;
    const spark = (up) => `<svg viewBox="0 0 120 36"><path d="${up ? "M0 30 L15 26 L30 28 L45 18 L60 21 L75 12 L90 14 L105 6 L120 4" : "M0 20 L15 22 L30 16 L45 19 L60 14 L75 17 L90 12 L105 13 L120 10"}" fill="none" stroke="#34d399" stroke-width="3" stroke-linejoin="round"/></svg>`;
    return {
      html: `<div class="ipw"><div class="ipglow"></div>
      <div class="ipcopy"><div class="mono ipk">CUBRIK FOR IPHONE</div><div class="serif iph">Your agents,<br>in your pocket.</div>
        ${["All your agents", "Your open positions", "Every single run", "A push for every move"].map((t, k) => `<div class="ipf f${k}"><i>✓</i>${t}</div>`).join("")}
        <div class="store ipstore"> Download on the App Store</div></div>
      <div class="iph3d"><div class="phone2"><span class="ipb b1"></span><span class="ipb b2"></span><span class="ipb b3"></span><span class="ipb b4"></span>
        <div class="ipgl"><div class="ipscr">
          <div class="ipapp">${SB}<div class="ipt">Agents</div><div class="ipst">3 running · demo account</div>
            <div class="iphero"><div><span class="mono">TODAY</span><b class="pos">+$1,040</b></div>${spark(true)}</div>
            ${[["Gold London sweep", "MetaTrader · XAU/USD · 5 min", "+$11,840"], ["BTC mean reversion", "Binance · BTC/USDT · 15 min", "+$2,310"], ["Morning risk check", "All accounts · daily 8:00", "—"]].map(([n, m, r], k) => `<div class="ipr r${k}"><span class="dot"></span><div class="iprn"><b>${n}</b><span>${m}</span></div><b class="pos">${r}</b></div>`).join("")}
            <div class="ipsec mono">OPEN POSITIONS</div><div class="ipr r3"><div class="iprn"><b>XAU/USD · Long</b><span>4,172 → 4,193 · SL 4,151</span></div><b class="pos">+$1,040</b></div>
            <div class="iptab">${["Agents", "Market", "Analytics", "Profile"].map((t, k) => `<span class="${k ? "" : "on"}"><i></i>${t}</span>`).join("")}</div>
            <div class="ipsheet"><div class="ipgrab"></div><b>Gold London sweep · runs</b>${[["9:40", "Take profit hit · closed at 4,214", "pos"], ["9:35", "Stop moved to break-even", ""], ["9:30", "Order placed · long at 4,172", ""], ["9:25", "No setup · waiting for the sweep", "ash"]].map(([t, m, c]) => `<div class="iprun"><span class="mono">${t}</span><span class="${c}">${m}</span></div>`).join("")}</div>
          </div>
          <div class="iplock">${SB}<div class="iplk">🔒</div><div class="ipdate">Friday, October 16</div><div class="ipclock">9:41</div>
            ${[["Order placed", "XAU/USD long at 4,172 · London sweep confirmed"], ["Stop moved to break-even", "Price reached +1R · protecting the trade"], ["Take profit hit · +$5,238", "Closed at 4,214 · target 2R reached"]].map(([a, b], k) => `<div class="ipn n${k}"><div class="nti">${CUBE}</div><div style="flex:1"><div class="ntt"><b>cubrik</b><span>now</span></div><div class="ntm">${a}</div><div class="nts">${b}</div></div></div>`).join("")}
            <div class="ipbot"><span>🔦</span><span>📷</span></div></div>
          <div class="ipisl"></div><div class="iphome"></div><div class="ipglare"></div>
        </div></div></div></div></div>`,
      js: () => `const V=T+.2;tl.fromTo(S+".iph3d",{y:900,rotationY:-28,rotationX:14},{y:0,rotationY:-12,rotationX:4,duration:1.1,ease:"expo.out"},T);tl.to(S+".iph3d",{rotationY:-6,rotationX:2,duration:D-1.2,ease:"none"},T+1.1);
        tl.fromTo(S+".ipglare",{x:-700},{x:700,duration:1.4,ease:"power2.inOut"},T+.5);tl.fromTo(S+".ipk",{opacity:0,y:20},{opacity:1,y:0,duration:.4},T+.3);tl.fromTo(S+".iph",{opacity:0,y:30},{opacity:1,y:0,duration:.5,ease:"expo.out"},T+.45);
        [1.28,2.48,3.68,5.68].forEach((w,k)=>tl.fromTo(S+".f"+k,{opacity:0,x:-30},{opacity:1,x:0,duration:.3,ease:"back.out(2)"},V+w));
        [0,1,2].forEach(k=>tl.fromTo(S+".r"+k,{y:30,opacity:0},{y:0,opacity:1,duration:.35,ease:"back.out(1.6)"},V+1.2+k*.12));tl.fromTo(S+".iphero",{y:20,opacity:0},{y:0,opacity:1,duration:.35},V+1.0);tl.fromTo([S+".ipsec",S+".r3"],{y:30,opacity:0},{y:0,opacity:1,duration:.35,stagger:.1,ease:"back.out(1.6)"},V+2.4);
        tl.to(S+".r0",{backgroundColor:"#2a2a32",duration:.1,yoyo:true,repeat:1},V+3.5);tl.fromTo(S+".ipsheet",{yPercent:105},{yPercent:0,duration:.5,ease:"expo.out"},V+3.65);tl.fromTo(S+".iprun",{opacity:0,x:20},{opacity:1,x:0,duration:.25,stagger:.1},V+3.9);
        tl.fromTo(S+".iplock",{opacity:0,scale:1.08},{opacity:1,scale:1,duration:.45,ease:"expo.out"},V+5.2);tl.to(S+".iph3d",{scale:1.06,duration:3,ease:"power1.inOut"},V+5.2);
        [8.0,8.96,10.56].forEach((w,k)=>tl.fromTo(S+".n"+k,{y:-120,opacity:0,scale:.9},{y:0,opacity:1,scale:1,duration:.5,ease:"back.out(1.7)"},V+w-.15));
        tl.fromTo(S+".ipstore",{y:30,opacity:0},{y:0,opacity:1,duration:.4,ease:"back.out(2)"},V+11.6);`,
    };
  },
  analytics: () => ({
    html: shell("Analytics", `<div class="col wide an">
      <div class="anr"><div><div class="mono xs2">THIS MONTH'S RESULT · METATRADER</div><div class="res"><span class="rv">+$18,940</span></div><div class="mono xs2">Balance $118,940 · demo account</div></div>
        <div class="tabs"><span class="tb tA">Today</span><span class="tb tB">Week</span><span class="tb tC on">Month</span></div></div>
      <svg class="anchart" viewBox="0 0 1100 220"><path class="ap" d="M0 180 C120 170 180 120 300 130 S480 70 560 90 S760 40 860 60 S1020 20 1100 30" fill="none" stroke="#a855f7" stroke-width="4"/><path class="apf" d="M0 180 C120 170 180 120 300 130 S480 70 560 90 S760 40 860 60 S1020 20 1100 30 L1100 220 L0 220 Z" fill="rgba(168,85,247,.12)"/></svg>
      <div class="anrow"><div class="says"><div class="mono xs2">WHAT YOUR MONTH SAYS</div><p class="serif sy0">Your gold trades in the London session carry the month: <b class="pos">+$27,312</b> at a 74% win rate.</p><p class="serif sy1">The only drag is the New York session: <b class="neg">−$8,372</b> on 9 trades.</p></div>
        <div class="recs"><div class="mono xs2">WHAT THE AI RECOMMENDS</div>${[["Stop trading the New York session", "Avoids −$8,372 this month"], ["Close positions within 24 h", "9 trades held over a day, 33% won"], ["Reduce size on Fridays", "17 trades, −$2,312"]].map(([a, b], k) => `<div class="rec rc${k}"><div><b>${a}</b><span>${b}</span></div><span class="ap2">Apply</span></div>`).join("")}</div></div>
      <div class="wm2 mono">Demo account · illustration</div></div>`, "Analytics"),
    js: () => `tl.fromTo(S+".anr",{y:30,opacity:0},{y:0,opacity:1,duration:.4},f(.01));const P=document.querySelector(S+".ap").getTotalLength();tl.fromTo(S+".ap",{strokeDasharray:P,strokeDashoffset:P},{strokeDashoffset:0,duration:1.4,ease:"power2.out"},f(.03));tl.fromTo(S+".apf",{opacity:0},{opacity:1,duration:.6},f(.08));
      tl.to(S+".tC",{backgroundColor:"rgba(0,0,0,0)",color:"#8b8b93",duration:.1},f(.09));tl.to(S+".tA",{backgroundColor:"#1f1f24",color:"#f2f1ec",duration:.1},f(.09));tl.to(S+".ap",{attr:{d:"M0 160 C200 150 300 170 450 120 S700 140 800 100 S1000 90 1100 70"},duration:.5},f(.09));
      tl.to(S+".tA",{backgroundColor:"rgba(0,0,0,0)",color:"#8b8b93",duration:.1},f(.15));tl.to(S+".tB",{backgroundColor:"#1f1f24",color:"#f2f1ec",duration:.1},f(.15));tl.to(S+".ap",{attr:{d:"M0 190 C150 160 250 150 380 110 S620 120 720 70 S960 60 1100 40"},duration:.5},f(.15));
      tl.to(S+".tB",{backgroundColor:"rgba(0,0,0,0)",color:"#8b8b93",duration:.1},f(.21));tl.to(S+".tC",{backgroundColor:"#1f1f24",color:"#f2f1ec",duration:.1},f(.21));tl.to(S+".ap",{attr:{d:"M0 180 C120 170 180 120 300 130 S480 70 560 90 S760 40 860 60 S1020 20 1100 30"},duration:.5},f(.21));
      count(S+".rv",0,18940,f(.02),1.6,"+$");tl.fromTo(S+".says",{opacity:0},{opacity:1,duration:.3},f(.3));tl.fromTo(S+".sy0",{opacity:0,y:10},{opacity:1,y:0,duration:.35},f(.36));tl.fromTo(S+".sy1",{opacity:0,y:10},{opacity:1,y:0,duration:.35},f(.5));
      cam(S,f(.3),1.12,-140,-180,1.2);tl.fromTo(S+".recs",{opacity:0},{opacity:1,duration:.3},f(.62));[0,1,2].forEach(k=>tl.fromTo(S+".rc"+k,{x:50,opacity:0},{x:0,opacity:1,duration:.3,ease:"back.out(2)"},f(.65+k*.04)));
      tl.to(S+" .app",{scale:1.22,x:-420,y:-240,duration:1,ease:"power2.inOut"},f(.72));tl.to(S+".rc0 .ap2",{scale:1.12,boxShadow:"0 0 0 6px #a855f744",duration:.25,yoyo:true,repeat:3},f(.8));tl.to(S+".rc0 .ap2",{backgroundColor:"#34d399",color:"#0d0d0f",duration:.15},f(.92));tl.set(S+".rc0 .ap2",{textContent:"✓ Applied"},f(.92));`,
  }),
  safety: () => ({
    html: `<div class="saf">${[["🔒", "Trade-only access", "Places orders, never withdraws. Revoke in one tap."], ["🛡️", "Stops live at the broker", "Every stop and target sits on your broker account. They hold even if cubrik is offline."], ["⚡", "Three independent safeguards", "Max daily loss per agent · hourly risk alert on the account · the stops themselves."]].map(([i, a, b], k) => `<div class="sc s${k}"><div class="si">${i}</div><b>${a}</b><span>${b}</span></div>`).join("")}
      <div class="fund mono">YOUR FUNDS NEVER LEAVE YOUR BROKER</div></div>`,
    js: () => `tl.fromTo(S+".fund",{opacity:0,y:-20},{opacity:1,y:0,duration:.4},f(.01));[0,1,2].forEach(k=>tl.fromTo(S+".s"+k,{y:80,opacity:0,rotationX:30},{y:0,opacity:1,rotationX:0,duration:.5,ease:"expo.out"},f([.12,.34,.62][k])));tl.fromTo(S+".saf",{scale:1.04},{scale:1,duration:D,ease:"none"},f(0));`,
  }),
};

Object.assign(SCENES, BT.SCENES);
const OVER = BT.OVER, CHAP = BT.CHAP, DEMOCHAP = BT.DEMOCHAP;

let html = "", js = "", aud = [], sfx = [];
SEG.forEach((s, i) => {
  let sc = null;
  if (s.pres) sc = OVER[s.id] ? SCENES[OVER[s.id]]() : CHAP[s.id] ? SCENES.chap(...CHAP[s.id])() : null;
  else sc = SCENES[s.scene] ? SCENES[s.scene]() : null;
  const cls = s.pres ? "seg pres" : s.scene === "hookKin" ? "seg demo broll" : "seg demo";
  const chap = !s.pres && DEMOCHAP[s.scene] ? `<div class="chap dchap"><span class="mono">${DEMOCHAP[s.scene][0]}</span><b>${DEMOCHAP[s.scene][1]}</b></div>` : "";
  html += `<div id="g${s.id}" class="clip ${cls}"${s.pres ? "" : ' style="opacity:0"'} data-start="${s.start}" data-duration="${s.d}" data-track-index="1">${sc ? sc.html : ""}${chap}</div>\n`;
  if (sc || chap) {
    js += `(function(){const S="#g${s.id} ",T=${s.start},D=${s.d},f=x=>T+x*D;${sc ? sc.js() : ""}${chap ? `tl.fromTo(S+".dchap",{x:-80,opacity:0},{x:0,opacity:1,duration:.4,ease:"expo.out"},f(.0));tl.to(S+".dchap",{opacity:0,duration:.3},f(.16));` : ""}})();\n`;
  }
  // transitions into / out of demos
  if (!s.pres) {
    js += `tl.fromTo("#g${s.id}",{opacity:0,filter:"blur(16px)",scale:1.08},{opacity:1,filter:"blur(0px)",scale:1,duration:.4,ease:"expo.out"},${s.start});`;
    sfx.push(["whoosh", s.start - 0.15, 0.4]);
    const next = SEG[i + 1];
    if (next && next.pres) { js += `tl.to("#g${s.id}",{opacity:0,filter:"blur(12px)",scale:1.04,duration:.3,ease:"power2.in"},${(s.start + s.d - 0.3).toFixed(3)});`; sfx.push(["whoosh-short", s.start + s.d - 0.25, 0.3]); }
  }
  aud.push(`<audio id="a${s.id}" src="${s.audio}" data-start="${(s.start + s.lead).toFixed(3)}" data-duration="${Math.min(s.a, s.d - s.lead).toFixed(3)}" data-track-index="${19 + (i % 2)}" data-volume="1"></audio>`);
});
// light ui sfx on key beats of demos
const at = (id, sec, f, v) => { const s = SEG.find((k) => k.id === id); sfx.push([f, s.start + sec, v]); };
const beat = (id, x, f, v) => { const s = SEG.find((k) => k.id === id); sfx.push([f, s.start + x * s.d, v]); };
BT.sfx((id, sec, f, v) => { if (SEG.find((k) => k.id === id)) at(id, sec, f, v); });
sfx.forEach(([f, at, v], k) => aud.push(`<audio id="x${k}" src="assets/sfx/${f}.wav" data-start="${Math.max(0, at).toFixed(3)}" data-duration="1.2" data-track-index="${21 + (k % 6)}" data-volume="${v}"></audio>`));
// music is mixed by produce-full.py only (not in the overlay), so it is never doubled

const page = `<!doctype html>
<html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=1920, height=1080" />
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<style>
@font-face{font-family:Poppins;font-weight:400;src:url(assets/fonts/poppins-latin-400-normal.woff2)}
@font-face{font-family:Poppins;font-weight:500;src:url(assets/fonts/poppins-latin-500-normal.woff2)}
@font-face{font-family:Poppins;font-weight:600;src:url(assets/fonts/poppins-latin-600-normal.woff2)}
@font-face{font-family:Poppins;font-weight:800;src:url(assets/fonts/poppins-latin-800-normal.woff2)}
@font-face{font-family:Lora;font-weight:500;src:url(assets/fonts/lora-latin-500-normal.woff2)}
@font-face{font-family:"JetBrains Mono";font-weight:500;src:url(assets/fonts/jetbrains-mono-latin-500-normal.woff2)}
@font-face{font-family:"JetBrains Mono";font-weight:700;src:url(assets/fonts/jetbrains-mono-latin-700-normal.woff2)}
:root{--carbon:#0a0a0c;--seam:#ffffff14;--seam2:#1c1c21;--bone:#f2f1ec;--ash:#8b8b93;--neon:#a855f7;--deep:#7c3aed;--pulse:#c4b5fd;--long:#34d399;--short:#fb7185}
html,body{margin:0;width:1920px;height:1080px;overflow:hidden;background:transparent}
#root{position:relative;width:1920px;height:1080px;overflow:hidden;font-family:Poppins,sans-serif;color:var(--bone)}
.seg{position:absolute;inset:0;overflow:hidden}.demo{background:#000}
.mono{font-family:"JetBrains Mono",monospace}.serif{font-family:Lora,serif}.pos{color:var(--long)}.neg{color:var(--short)}
/* presenter overlays */
.stack{position:absolute;left:110px;top:150px;display:flex;flex-direction:column;gap:12px}
.kw{font-family:"JetBrains Mono";font-weight:700;font-size:44px;letter-spacing:.12em;background:rgba(13,13,15,.86);border:1px solid #2a2a30;padding:10px 24px;border-radius:12px;width:max-content}
.big{position:absolute;left:0;right:0;top:120px;text-align:center;font-family:"JetBrains Mono";font-weight:700;font-size:150px;letter-spacing:.14em;color:#fff;text-shadow:0 10px 60px #7c3aedaa}
.lt{position:absolute;left:110px;bottom:120px;display:flex;flex-direction:column;align-items:flex-start;gap:12px}
.pill{font-family:"JetBrains Mono";font-weight:700;text-transform:uppercase;letter-spacing:.1em;padding:12px 26px;border-radius:12px;font-size:40px;box-shadow:0 18px 40px -14px rgba(0,0,0,.7)}
.p1{background:#0d0d0f;color:var(--bone);border:1px solid #2a2a30}.p2{background:var(--deep);color:#fff;font-size:58px}
.p2s{font-family:Poppins;font-weight:600;font-size:34px;background:var(--deep);color:#fff;padding:12px 26px;border-radius:12px}
.strike{position:absolute;left:-8px;right:-8px;top:50%;height:8px;background:var(--short);border-radius:4px;transform-origin:left center}
.duo2{position:absolute;left:110px;bottom:140px;width:700px;height:100px}
.pp{position:absolute;left:0;top:0;font-family:"JetBrains Mono";font-weight:700;font-size:44px;padding:14px 28px;border-radius:14px;background:#0d0d0f;border:1px solid #2a2a30}.pp.b{left:340px}.pp.c{left:120px;background:var(--deep);font-size:60px;border:0}
.lt3{position:absolute;left:110px;bottom:110px;display:flex;align-items:center;gap:16px;background:rgba(10,10,12,.86);border:1px solid var(--seam);border-radius:18px;padding:16px 26px}.lt3 svg{width:44px;height:44px}.lt3 b{display:block;font-size:30px}.lt3 span{font-size:20px;color:var(--ash)}
.ais{position:absolute;right:90px;top:140px;display:grid;grid-template-columns:repeat(3,auto);gap:12px}
.ai2{display:flex;align-items:center;gap:12px;font-weight:600;font-size:30px;background:rgba(10,10,12,.86);border:1px solid #2a2a30;border-radius:14px;padding:12px 22px}.ai2.jev{border-color:#e04fbf;box-shadow:0 0 30px -6px #e04fbf88}.ai2 .jevl{border-radius:10px}.ai2 svg,.ai2 img{width:40px;height:40px;object-fit:contain}
.be{position:absolute;left:110px;bottom:110px;display:flex;flex-direction:column;gap:14px}
.bec{background:rgba(10,10,12,.88);border:1px solid #2a2a30;border-radius:16px;padding:14px 26px;width:max-content}.bec span{display:block;font-size:18px;color:var(--pulse);letter-spacing:.12em}.bec b{font-size:34px}
.tag{position:absolute;left:110px;bottom:110px;font-size:54px;line-height:1.3;color:#fff;background:rgba(10,10,12,.88);border:1px solid #2a2a30;border-radius:20px;padding:18px 30px}.tag b{color:#fff;font-weight:500;background:var(--deep);padding:0 14px;border-radius:10px}
.chap{position:absolute;left:110px;top:110px;display:flex;align-items:center;gap:16px;background:rgba(10,10,12,.88);border:1px solid #2a2a30;border-radius:16px;padding:14px 26px}.chap span{font-size:22px;color:var(--pulse)}.chap b{font-size:34px}
.dchap{z-index:20;top:60px;left:60px}
.fseg{position:absolute;left:110px;bottom:120px;display:flex;gap:6px;background:rgba(10,10,12,.9);border:1px solid #2a2a30;border-radius:999px;padding:8px}.fseg span{font-family:"JetBrains Mono";font-weight:700;font-size:30px;color:#8b8b93;padding:12px 28px;border-radius:999px}
.errs{position:absolute;left:110px;bottom:110px;display:flex;flex-direction:column;gap:12px}
.err{position:relative;font-weight:600;font-size:32px;background:rgba(10,10,12,.88);border:1px solid #2a2a30;border-radius:14px;padding:10px 24px;width:max-content}.err i{position:absolute;left:14px;right:14px;top:50%;height:5px;background:var(--short);border-radius:3px;transform-origin:left center}
.end{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:110px}
.endc{display:flex;flex-direction:column;align-items:center;gap:12px;background:rgba(10,10,12,.9);border:1px solid #2a2a30;border-radius:28px;padding:30px 56px}.endc svg{width:64px;height:64px}
.ebig{font-weight:800;font-size:54px}.eurl{font-size:22px;color:var(--pulse)}.eapp{font-weight:600;font-size:22px;background:#f2f1ec;color:#0d0d0f;padding:10px 22px;border-radius:12px}
.legal{margin-top:16px;font-size:16px;color:#ffffffaa}
/* hook */
.sp{position:absolute;left:0;top:0;bottom:0;width:820px;background:radial-gradient(circle at 20% 30%,#3b1260 0%,#14051f 55%,#050208 100%);box-shadow:30px 0 60px rgba(0,0,0,.5)}
.spk{position:absolute;left:90px;right:60px;top:190px;opacity:0}
.spn{font-size:26px;letter-spacing:.22em;color:#c4b5fd}
.spt{position:relative;display:inline-block;font-weight:600;font-size:78px;line-height:1.05;margin:18px 0 40px}.spt i{position:absolute;left:-8px;right:-8px;top:76%;height:10px;background:#fb7185;border-radius:5px;transform-origin:left center;box-shadow:0 0 24px #fb718588}
.spc{position:relative;width:640px;height:360px;border-radius:26px;overflow:hidden;box-shadow:0 30px 60px rgba(0,0,0,.6),0 0 0 2px #ffffff18}.spc img{width:100%;height:100%;object-fit:cover}
.spx{position:absolute;right:18px;top:18px;width:64px;height:64px;border-radius:50%;background:#fb7185;color:#fff;display:grid;place-items:center;font-size:34px;font-weight:800;box-shadow:0 0 0 6px #ffffff33}

.hk1{position:absolute;left:0;right:0;bottom:90px;display:flex;flex-direction:column;align-items:center;gap:10px}
.hkl1{display:flex;align-items:center;gap:18px;font-weight:800;font-size:60px;text-transform:uppercase;letter-spacing:.04em;background:#f2f1ec;color:#0d0d0f;border-radius:18px;padding:10px 34px 10px 24px;box-shadow:0 20px 50px -12px rgba(0,0,0,.55)}.hkl1 img{width:64px;height:64px}
.hkl2{position:relative;font-family:"JetBrains Mono";font-weight:700;font-size:118px;letter-spacing:.06em;background:var(--deep);color:#fff;border-radius:20px;padding:4px 38px;box-shadow:0 30px 80px -20px #7c3aedcc}.hkl2 span{color:#fff}
.hkl2 i{position:absolute;left:20px;right:20px;top:50%;height:12px;margin-top:-6px;background:var(--short);border-radius:6px;transform-origin:left center}
.hkfl{position:absolute;inset:0;background:#fff;opacity:0}
.broll{background:transparent!important}
.hkv{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 55%,rgba(0,0,0,.25) 0%,rgba(0,0,0,.72) 100%),linear-gradient(180deg,transparent 40%,rgba(0,0,0,.55) 100%)}
.hkrows{position:absolute;inset:0}
.hkr{position:absolute;left:0;right:0;bottom:150px;display:flex;justify-content:center;opacity:0}.hkr>div{position:relative;text-align:center}
.hka{display:block;font-family:"JetBrains Mono";font-weight:700;font-size:44px;letter-spacing:.18em;text-transform:uppercase;color:var(--pulse);text-shadow:0 4px 30px #000}
.hkb{display:block;font-weight:800;font-size:120px;line-height:1.05;color:#fff;text-shadow:0 10px 60px rgba(0,0,0,.85)}
.hkr i{position:absolute;left:-20px;right:-20px;bottom:56px;height:14px;background:var(--short);border-radius:7px;transform-origin:left center;box-shadow:0 0 30px #fb718588}
.hk3{position:absolute;right:90px;top:110px;width:780px;height:330px}.hk3 .ai2{position:absolute}
.hk3c{position:absolute;left:230px;top:200px;display:flex;align-items:center;gap:16px;background:rgba(10,10,12,.92);border:1px solid #a855f7;border-radius:22px;padding:16px 32px;box-shadow:0 20px 60px -10px #7c3aedaa;opacity:0}.hk3c svg{width:62px;height:62px}.hk3c b{font-size:56px;font-weight:600}
.hyp{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#000;opacity:0}.hyp .hcube svg{width:64px;height:64px;margin-bottom:26px}
.hyp .pbox{width:1300px;padding:40px 40px 84px}.hyl{display:inline-block;font-size:44px;color:var(--pulse);border-radius:10px;padding:6px 12px}
.hych{margin-top:28px;justify-content:center}.hych .chip{font-size:28px;padding:12px 22px}
.hyx{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:50px;background:radial-gradient(circle at 50% 50%,#1a1030 0%,#000 72%);perspective:1600px;opacity:0}
.hyc{width:700px;opacity:0}.hyart{position:relative;height:400px;border-radius:30px;overflow:hidden;display:grid;place-items:center}.hye{font-size:150px;position:relative;z-index:2}
.night .hyart{background:linear-gradient(180deg,#0b1030 0%,#1b1550 60%,#2a1a5e 100%)}.moon{position:absolute;right:90px;top:60px;width:110px;height:110px;border-radius:50%;background:#f5f0dc;box-shadow:0 0 60px #f5f0dc88,inset -26px -8px 0 #d8d0b0}
.hst{position:absolute;width:6px;height:6px;border-radius:50%;background:#fff}.hst.h1{left:80px;top:70px}.hst.h2{left:200px;top:140px}.hst.h3{left:330px;top:50px}.hst.h4{left:120px;top:250px}
.sun .hyart{background:linear-gradient(180deg,#ff9a5a 0%,#ff6f91 45%,#7c3aed 100%)}.sunb{position:absolute;left:50%;top:150px;width:200px;height:200px;margin-left:-100px;border-radius:50%;background:#ffd27a;box-shadow:0 0 80px #ffd27aaa}.sea{position:absolute;left:0;right:0;bottom:0;height:130px;background:linear-gradient(180deg,#3b2a8a,#1a1450)}
.hyt{font-family:"JetBrains Mono";font-size:26px;color:var(--ash);margin:22px 4px 2px}.hylb{font-family:Lora,serif;font-size:50px;margin:0 4px 18px}
.hyn{display:flex;gap:14px;background:rgba(18,18,22,.96);border:1px solid #2a2a30;border-radius:22px;padding:18px 20px}.hyn .nti{width:52px;height:52px;border-radius:14px;background:#0d0d0f;display:grid;place-items:center;flex:none}.hyn .nti svg{width:34px;height:34px}.hyn .ntt{font-size:17px;color:var(--ash);display:flex;justify-content:space-between}.hyn .ntm{font-weight:600;font-size:23px;margin-top:2px}.hyn .nts{font-family:"JetBrains Mono";font-size:16px;color:var(--ash);margin-top:4px}
.hk5{position:absolute;left:0;right:0;bottom:110px;margin:0 auto;width:max-content;font-size:40px;font-weight:700;background:var(--deep);color:#fff;border-radius:16px;padding:14px 34px}
/* app shell */
.app{position:absolute;inset:0;transform-origin:50% 50%}
.side{position:absolute;left:0;top:0;bottom:0;width:330px;border-right:1px solid var(--seam);background:#050506;padding:30px 22px;box-sizing:border-box}
.brand{display:flex;align-items:center;gap:12px;font-weight:600;font-size:26px;margin-bottom:34px}.brand svg{width:30px;height:30px}.brand b{color:var(--neon);font-weight:600}
.nav{display:flex;align-items:center;justify-content:space-between;font-size:21px;color:#d6d5cf;padding:12px 14px;border-radius:12px}.nav.on{background:#141417}.nav.sm{font-size:18px;color:#a7a6a0}
.pinned{font-size:14px;color:var(--ash);margin:26px 14px 6px;letter-spacing:.1em}
.me{position:absolute;left:22px;bottom:24px;display:flex;align-items:center;gap:12px;font-size:19px;color:#d6d5cf}.av2{width:34px;height:34px;border-radius:50%;background:#1f1f24;display:grid;place-items:center;font-size:16px}
.badge{font-family:"JetBrains Mono";font-size:15px;color:var(--ash);border:1px solid var(--seam2);border-radius:999px;padding:2px 10px}.badge.g{color:var(--long)}
.top{position:absolute;left:330px;right:0;top:0;height:76px;border-bottom:1px solid var(--seam);display:flex;align-items:center;justify-content:center}.ttl{font-weight:600;font-size:22px}
.tog{display:flex;background:#0d0d0f;border:1px solid var(--seam2);border-radius:999px;padding:5px}.tog span{padding:8px 26px;border-radius:999px;font-size:19px;color:var(--ash)}.tog .on{background:#1f1f24;color:var(--bone)}
.main{position:absolute;left:330px;right:0;top:76px;bottom:0}
.col{position:absolute;left:50%;width:1060px;margin-left:-530px;top:70px}.col.wide{width:1300px;margin-left:-650px;top:50px}
.h2x{font-family:Lora,serif;font-size:52px}.sub2{color:var(--ash);font-size:22px;margin:8px 0 26px}
.ubub{margin-left:auto;width:max-content;max-width:780px;background:#0d0d0f;border:1px solid var(--seam2);border-radius:18px;padding:18px 24px;font-size:23px;line-height:1.5}
.ai{display:flex;gap:18px;margin-top:28px}.ai .av{width:40px;height:40px;flex:none}.ai .av svg{width:40px;height:40px}
.chips{display:flex;flex-wrap:wrap;gap:10px}.chip{font-family:"JetBrains Mono";font-size:18px;color:var(--ash);border:1px solid var(--seam2);border-radius:10px;padding:7px 14px}.chip i{color:var(--long);font-style:normal;margin-right:8px}
.say{font-size:26px;line-height:1.6;color:var(--bone)}
.card{margin-top:22px;background:var(--carbon);border:1px solid var(--seam);border-radius:20px;padding:26px 30px;box-sizing:border-box;box-shadow:0 30px 80px -30px #a855f766}
.ch1{display:flex;align-items:center;gap:14px}.dot{width:12px;height:12px;border-radius:50%;background:var(--neon);box-shadow:0 0 14px var(--neon);flex:none}
.cn{font-weight:600;font-size:30px}.bro{display:flex;align-items:center;gap:8px;font-size:17px;color:#d6d5cf;border:1px solid var(--seam2);border-radius:8px;padding:3px 10px}.bro img{width:20px;height:20px;object-fit:contain}
.sw{margin-left:auto;display:flex;align-items:center;gap:12px;font-size:19px;color:#d6d5cf}.swt{width:58px;height:32px;border-radius:999px;background:#2a2a30;position:relative}.swt b{position:absolute;top:4px;left:4px;width:24px;height:24px;border-radius:50%;background:#f2f1ec}.swt.on{background:var(--neon)}.swt.on b{left:30px}
.run{font-family:"JetBrains Mono";font-size:19px;color:var(--ash);margin-top:8px}
.runs{margin-top:18px;border-top:1px solid var(--seam);padding-top:14px;display:flex;flex-direction:column;gap:10px}.rl{font-size:19px;color:#d6d5cf}.rl span{color:var(--ash);margin-right:14px}
.toast{position:absolute;right:40px;top:96px;width:580px;background:rgba(18,18,22,.97);border:1px solid #2a2a30;border-radius:22px;padding:20px 22px;display:flex;gap:16px;box-shadow:0 30px 70px -20px #000;z-index:5}
.toast .ti{width:52px;height:52px;border-radius:14px;background:#0d0d0f;display:grid;place-items:center;flex:none}.toast .ti svg{width:34px;height:34px}.tt{display:flex;justify-content:space-between;font-size:17px;color:var(--ash)}.tm{font-weight:600;font-size:22px;margin-top:4px}.ts{font-family:"JetBrains Mono";font-size:16px;color:var(--ash);margin-top:6px}
/* signup */
.auth{position:absolute;left:50%;top:90px;width:600px;margin-left:-300px;display:flex;flex-direction:column;align-items:center}
.acube svg{width:70px;height:70px;filter:drop-shadow(0 0 30px #a855f788)}.ah{font-weight:600;font-size:40px;margin-top:20px}.asub{color:var(--ash);font-size:20px;margin:8px 0 40px}
.flab{align-self:flex-start;font-size:17px;color:var(--ash);margin-bottom:8px}.field{width:100%;box-sizing:border-box;height:64px;border:1px solid #2a2a30;background:#0d0d0f;border-radius:14px;display:flex;align-items:center;padding:0 20px;font-size:22px}.caret{width:2px;height:28px;background:var(--bone);margin-left:2px}
.chk{display:flex;gap:14px;align-items:flex-start;font-size:16px;color:var(--ash);margin:20px 0}.box{width:24px;height:24px;border:1px solid #3a3a40;border-radius:6px;display:grid;place-items:center;flex:none}.box b{color:#fff;font-size:15px}
.btn{width:100%;box-sizing:border-box;height:60px;border-radius:14px;display:grid;place-items:center;font-weight:600;font-size:20px;background:#2a2a30;color:#bdbcb6;margin-top:10px}.btn.b2{background:transparent;border:1px solid #2a2a30;color:var(--bone)}.or{font-size:15px;color:var(--ash);margin:10px 0 0}
.code{position:absolute;top:290px;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:20px;opacity:0}.ch2{font-size:22px;color:var(--ash)}.digits{display:flex;gap:14px}.dg{width:72px;height:88px;border:1px solid #a855f7;border-radius:14px;display:grid;place-items:center;font-family:"JetBrains Mono";font-size:44px;background:#0d0d0f}
.home{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0}.hcube svg{width:60px;height:60px}.hh{font-size:58px;margin:18px 0 30px}
.hbox{width:1000px;box-sizing:border-box;border:1px solid #2a2a30;background:#0d0d0f;border-radius:22px;padding:26px 30px 70px;font-size:22px;color:var(--ash);position:relative}.mdl{position:absolute;right:26px;bottom:20px;font-size:17px;color:var(--ash)}.mdl b{color:var(--bone);font-weight:500}
.plan{display:flex;gap:14px;margin-top:30px}.pp2{font-family:"JetBrains Mono";font-size:20px;border:1px solid #2a2a30;border-radius:999px;padding:10px 22px;background:#0d0d0f}.pp2.q0{border-color:#a855f7;color:var(--pulse)}
/* brokers */
.bgrid{display:grid;grid-template-columns:repeat(6,1fr);gap:16px}.btx{border-style:dashed!important;border-color:#a855f788!important}.btx b{font-size:34px;color:var(--neon);font-weight:400;line-height:1}.btx span{text-align:center;font-size:16px!important;color:var(--pulse)!important}.bt{height:120px;border:1px solid #2a2a30;background:#0d0d0f;border-radius:18px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;font-size:17px;color:#d6d5cf}.bt img{height:42px;max-width:120px;object-fit:contain}
.modal{position:absolute;left:50%;top:300px;width:620px;margin-left:-310px;background:#101013;border:1px solid #2a2a30;border-radius:24px;padding:28px;box-shadow:0 40px 100px -20px #000;opacity:0}
.mh{display:flex;align-items:center;gap:14px;font-weight:600;font-size:26px;margin-bottom:18px}.mh img{width:34px;height:34px;object-fit:contain}
.opt{border:1px solid #2a2a30;border-radius:14px;padding:16px 20px;margin-top:10px}.opt b{display:block;font-size:21px}.opt span{font-size:17px;color:var(--ash)}
.prog{height:6px;background:#1f1f24;border-radius:3px;margin-top:22px;overflow:hidden}.prog i{display:block;height:100%;background:var(--neon);transform-origin:left center}
.ok2{margin-top:18px;font-family:"JetBrains Mono";font-size:19px;color:var(--long)}
/* prompt */
.pwrap{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.pbox{width:1100px;box-sizing:border-box;border:1px solid #2a2a30;background:#0d0d0f;border-radius:22px;padding:28px 30px 74px;position:relative}.ptxt{font-size:28px;line-height:1.55;min-height:130px}.pfoot .mdl{left:30px;right:auto}.caret2{display:inline-block;width:3px;height:1.05em;background:var(--neon);vertical-align:-.15em;margin-left:2px}.pfoot .send{position:absolute;right:22px;bottom:18px;width:44px;height:44px;border-radius:50%;background:#2a2a30;display:grid;place-items:center;font-size:22px}
.parsed{display:flex;flex-wrap:wrap;gap:12px;margin-top:26px;width:1100px}.pc{font-family:"JetBrains Mono";font-size:20px;border:1px solid #a855f7;color:var(--pulse);border-radius:10px;padding:8px 16px;background:#a855f714}
/* agent */
.qs{display:flex;flex-direction:column;gap:12px;margin-top:14px}.q{display:flex;align-items:center;gap:10px;font-size:20px;color:#d6d5cf}.qc{border:1px solid #2a2a30;border-radius:10px;padding:6px 14px;font-size:18px;color:var(--ash)}.qc.on{background:#7c3aed;color:#fff;border-color:#7c3aed}
.jevr{margin-left:auto;display:flex;align-items:center;gap:10px;position:relative}.jevr svg{width:64px;height:64px}.jn{position:absolute;left:0;width:64px;text-align:center;font-family:"JetBrains Mono";font-size:22px}.jevr span{font-size:15px;color:var(--ash)}
.bt2{margin-top:20px}.bth{font-size:15px;color:var(--ash);letter-spacing:.06em;margin-bottom:10px}.bt2 svg{width:100%;height:200px}
.stats2{display:flex;gap:40px;margin-top:10px}.st span{display:block;font-family:"JetBrains Mono";font-size:14px;color:var(--ash);letter-spacing:.06em}.st b{font-size:32px;font-weight:600}
/* approve */
.big2{margin-top:120px}.m2{top:330px;opacity:1}.ml{font-family:"JetBrains Mono";font-size:18px;color:var(--ash);margin-bottom:22px}.mb{display:flex;gap:14px;justify-content:flex-end}.btn3{padding:14px 28px;border-radius:12px;border:1px solid #2a2a30;font-weight:600;font-size:20px}.btn3.go{background:var(--long);color:#0d0d0f;border:0}
.okline{margin-top:200px;text-align:center;font-size:44px}
/* library */
.tabs{display:flex;gap:6px;background:#0d0d0f;border:1px solid var(--seam2);border-radius:999px;padding:5px;width:max-content;margin-bottom:22px}.tb{padding:8px 22px;border-radius:999px;font-size:18px;color:var(--ash)}.tb.on{background:#1f1f24;color:var(--bone)}
.lgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.lc{border:1px solid #2a2a30;background:#0d0d0f;border-radius:18px;padding:20px 22px}.ln{font-weight:600;font-size:24px}.lm{font-size:15px;color:var(--ash);margin-top:4px}.lc svg{width:100%;height:60px;margin:10px 0}
.lr{display:flex;align-items:center;gap:16px;font-size:17px;color:#d6d5cf}.cp{margin-left:auto;border:1px solid #2a2a30;border-radius:10px;padding:6px 16px;font-weight:600}
/* youtube */
.ytw{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#0f0f0f}
.vcard2{width:880px;background:#181818;border-radius:22px;overflow:hidden;position:relative}.vthumb{position:relative}.vthumb img{width:100%;display:block}.vplay{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}.vplay img{width:110px}.vdur{position:absolute;right:14px;bottom:14px;background:#000c;padding:4px 10px;border-radius:6px;font-size:18px}
.vt{font-weight:600;font-size:28px;padding:18px 22px 4px}.vm{font-size:18px;color:#aaa;padding:0 22px}.vbar{display:flex;gap:12px;padding:16px 22px 22px}.vbar span{background:#272727;border-radius:999px;padding:8px 18px;font-size:18px;color:#ddd}.copied{position:absolute;right:22px;bottom:80px;background:#000;border:1px solid #333;border-radius:10px;padding:8px 14px;font-size:16px;opacity:0}
.linkb{margin-left:auto;width:max-content;display:flex;gap:16px;align-items:center;background:#0d0d0f;border:1px solid var(--seam2);border-radius:18px;padding:12px 18px 12px 12px}.linkb img{width:140px;border-radius:10px}.lt2{font-size:20px;font-weight:600}.lu{font-size:15px;color:var(--ash);margin-top:4px}
.anh{display:flex;align-items:center;gap:12px;font-size:20px;color:#d6d5cf;position:relative}.spin{width:18px;height:18px;border-radius:50%;border:3px solid #a855f7;border-right-color:transparent}.and{position:absolute;left:30px;color:var(--long);opacity:0}
.vprog{height:5px;background:#1f1f24;border-radius:3px;margin:12px 0 16px;overflow:hidden;width:700px}.vprog i{display:block;height:100%;background:var(--neon);transform-origin:left center}
.rules{display:grid;grid-template-columns:1fr 1fr;gap:10px;width:820px}.rr{border:1px solid #2a2a30;border-radius:12px;padding:12px 16px;font-size:19px}.rr span{display:block;font-size:13px;color:var(--pulse);letter-spacing:.1em;margin-bottom:4px}
.miss{font-size:24px;margin-top:20px}.on2{}
.made{display:flex;align-items:center;gap:12px;margin-top:20px;font-weight:600;font-size:22px;border:1px solid #a855f7;border-radius:14px;padding:14px 20px;width:max-content;background:#a855f714}
/* tradingview */
.tvw{position:absolute;inset:0;background:#000}
.tvchart{position:absolute;left:120px;top:100px;width:1080px;height:560px;background:#131722;border:1px solid #2a2e39;border-radius:18px;overflow:hidden}
.tvh{display:flex;align-items:center;gap:14px;padding:16px 20px;border-bottom:1px solid #2a2e39;font-size:20px}.tvh img{width:30px;height:30px}.pine{margin-left:auto;font-size:15px;color:#b2b5be}
.tvchart svg{width:100%;height:400px;margin-top:40px}
.alrt{position:absolute;right:24px;font-size:18px;background:#1e222d;border:1px solid #2a2e39;border-radius:12px;padding:10px 16px}.al0{top:90px}.al1{top:146px}
.tvdlg{position:absolute;right:120px;top:220px;width:620px;background:#1e222d;border:1px solid #363a45;border-radius:18px;padding:24px;box-shadow:0 40px 100px -20px #000;opacity:0}
.tdh{font-weight:600;font-size:24px;margin-bottom:16px}.tdr{display:flex;flex-direction:column;gap:6px;margin-top:12px;font-size:16px;color:#b2b5be}.tdr b{font-weight:500;font-size:19px;color:#e0e3eb;background:#131722;border:1px solid #363a45;border-radius:10px;padding:10px 14px}.hook{color:#c4b5fd!important}.unch{color:var(--long)!important;width:max-content}
.tdb{margin-top:18px;background:#2a2e39;border-radius:10px;padding:12px;text-align:center;font-weight:600;font-size:19px}
.flow{position:absolute;left:0;right:0;top:330px;display:flex;align-items:center;justify-content:center;gap:0;opacity:0}
.fn{display:flex;align-items:center;gap:14px;background:#0d0d0f;border:1px solid #2a2a30;border-radius:18px;padding:22px 28px;font-weight:600;font-size:26px}.fn img,.fn svg{width:40px;height:40px;object-fit:contain}.fn.f2{border-color:var(--long);color:var(--long)}
.fl{display:block;width:120px;height:4px;background:linear-gradient(90deg,#a855f7,#34d399);transform-origin:left center}
.guard{position:absolute;left:0;right:0;top:560px;display:flex;justify-content:center;gap:16px}.gd{font-family:"JetBrains Mono";font-size:20px;border:1px solid #2a2a30;border-radius:999px;padding:10px 22px;color:var(--long);background:#0d0d0f}
/* iphone */
.phw{position:absolute;inset:0;background:radial-gradient(circle at 50% 40%,#1a1030 0%,#000 70%)}
.phone{position:absolute;left:50%;top:60px;width:440px;height:900px;margin-left:-220px;background:#000;border:12px solid #1c1c21;border-radius:70px;box-shadow:0 0 0 2px #333,0 60px 120px -30px #a855f766;overflow:hidden}
.notch{position:absolute;left:50%;top:14px;width:130px;height:36px;margin-left:-65px;background:#000;border-radius:20px;z-index:3}
.scr{position:absolute;inset:0;background:#0a0a0c}
.pa{position:absolute;inset:0;padding:70px 22px 0}.pah{display:flex;justify-content:space-between;font-weight:600;font-size:20px;margin-bottom:22px}
.pr{display:flex;align-items:center;gap:12px;background:#141417;border:1px solid #1f1f24;border-radius:18px;padding:16px;margin-bottom:12px}.pr b{display:block;font-size:18px}.pr span{font-size:14px;color:var(--ash)}.prr{margin-left:auto;text-align:right}.prr span{display:block;font-size:12px}.prr b{font-size:17px}
.pos2{font-size:13px;color:var(--ash);margin:18px 4px 10px;letter-spacing:.08em}
.lock{position:absolute;inset:0;background:linear-gradient(180deg,#2a1a4a,#0a0a0c);padding:90px 18px 0;opacity:0}.lt4{text-align:center;font-weight:600;font-size:86px}.ld{text-align:center;font-size:15px;color:#ddd;margin-bottom:26px}
.nt{display:flex;gap:12px;background:rgba(40,40,46,.85);border-radius:22px;padding:14px;margin-bottom:10px}.nti{width:42px;height:42px;border-radius:11px;background:#0d0d0f;display:grid;place-items:center;flex:none}.nti svg{width:28px;height:28px}
.ntt{display:flex;justify-content:space-between;font-size:14px;color:#ccc}.ntt b{color:#fff}.ntm{font-weight:600;font-size:16px;margin-top:2px}.nts{font-size:13px;color:#bbb;margin-top:2px}
.store{position:absolute;left:50%;bottom:46px;transform:translateX(-50%);background:#f2f1ec;color:#0d0d0f;font-weight:600;font-size:22px;padding:12px 26px;border-radius:14px}
/* iphone v2 */
.ipw{position:absolute;inset:0;background:radial-gradient(circle at 68% 45%,#2a1450 0%,#0b0614 45%,#000 75%);perspective:2200px}
.ipglow{position:absolute;left:1040px;top:180px;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,#7c3aed55,transparent 65%);filter:blur(30px)}
.ipcopy{position:absolute;left:190px;top:250px;width:760px}.ipk{font-size:22px;letter-spacing:.2em;color:var(--pulse)}.iph{font-size:76px;line-height:1.12;margin:18px 0 40px}
.ipf{display:flex;align-items:center;gap:16px;font-size:32px;font-weight:500;margin:14px 0;opacity:0}.ipf i{font-style:normal;width:40px;height:40px;border-radius:50%;background:#34d39922;color:var(--long);display:grid;place-items:center;font-size:22px}
.ipstore{position:static;transform:none;display:inline-block;margin-top:34px;opacity:0}
.iph3d{position:absolute;left:1130px;top:52px;width:476px;height:976px;transform-style:preserve-3d}
.phone2{position:absolute;inset:0;border-radius:84px;padding:5px;background:linear-gradient(145deg,#9b9ba3 0%,#4a4a52 22%,#c8c8cf 48%,#3a3a41 74%,#8d8d95 100%);box-shadow:0 80px 140px -40px #000,0 0 120px -20px #7c3aed88}
.ipb{position:absolute;width:5px;background:linear-gradient(90deg,#55555c,#a5a5ad);border-radius:3px}.ipb.b1{left:-4px;top:190px;height:46px}.ipb.b2{left:-4px;top:270px;height:84px}.ipb.b3{left:-4px;top:370px;height:84px}.ipb.b4{right:-4px;left:auto;top:300px;height:130px}
.ipgl{position:absolute;inset:5px;border-radius:79px;background:#000;padding:13px}
.ipscr{position:relative;width:100%;height:100%;border-radius:66px;overflow:hidden;background:#0a0a0c}
.ipisl{position:absolute;left:50%;top:14px;width:136px;height:40px;margin-left:-68px;border-radius:22px;background:#000;z-index:9}
.iphome{position:absolute;left:50%;bottom:10px;width:150px;height:6px;margin-left:-75px;border-radius:3px;background:#fff;opacity:.85;z-index:9}
.ipglare{position:absolute;top:-20%;left:0;width:160px;height:140%;background:linear-gradient(90deg,transparent,#ffffff22,transparent);transform:rotate(18deg);z-index:10;pointer-events:none}
.ipsb{position:absolute;left:0;right:0;top:0;height:60px;display:flex;align-items:center;justify-content:space-between;padding:6px 38px 0 46px;font-weight:600;font-size:19px;z-index:8;box-sizing:border-box}.ipsi{display:flex;gap:7px;align-items:center}.ipsi svg{height:13px;fill:#fff}
.ipapp{position:absolute;inset:0;padding:74px 20px 0}.ipt{font-weight:700;font-size:40px;margin:6px 6px 0}.ipst{font-size:16px;color:var(--ash);margin:2px 6px 16px}
.iphero{display:flex;align-items:center;justify-content:space-between;background:linear-gradient(135deg,#1d1236,#141417);border:1px solid #2a2140;border-radius:22px;padding:16px 18px;margin-bottom:12px}.iphero span{display:block;font-size:12px;color:var(--ash);letter-spacing:.1em}.iphero b{font-size:30px;font-weight:600}.iphero svg{width:130px;height:40px}
.ipr{display:flex;align-items:center;gap:12px;background:#141417;border:1px solid #1f1f24;border-radius:18px;padding:14px 16px;margin-bottom:10px}.iprn{flex:1}.iprn b{display:block;font-size:17px;font-weight:600}.iprn span{font-size:13px;color:var(--ash)}.ipr>b{font-size:16px}
.ipsec{font-size:12px;color:var(--ash);letter-spacing:.1em;margin:16px 6px 8px}
.iptab{position:absolute;left:0;right:0;bottom:0;height:96px;display:flex;justify-content:space-around;padding-top:12px;background:rgba(18,18,22,.92);border-top:1px solid #1f1f24}.iptab span{display:flex;flex-direction:column;align-items:center;gap:6px;font-size:12px;color:var(--ash)}.iptab i{width:24px;height:24px;border-radius:7px;background:#2a2a30}.iptab .on{color:var(--neon)}.iptab .on i{background:var(--neon)}
.ipsheet{position:absolute;left:0;right:0;bottom:0;height:440px;background:#17171b;border-radius:30px 30px 0 0;padding:14px 22px;box-sizing:border-box;z-index:7;box-shadow:0 -20px 50px #000a}.ipgrab{width:44px;height:5px;border-radius:3px;background:#3a3a40;margin:0 auto 16px}.ipsheet>b{font-size:19px;display:block;margin-bottom:10px}
.iprun{display:flex;gap:14px;font-size:15px;padding:12px 0;border-top:1px solid #24242a}.iprun span:first-child{color:var(--ash);width:44px;flex:none}.iprun .ash{color:var(--ash)}
.iplock{position:absolute;inset:0;background:radial-gradient(circle at 30% 20%,#7c3aed 0%,transparent 45%),radial-gradient(circle at 80% 75%,#c026d3 0%,transparent 40%),linear-gradient(180deg,#241046,#08050f);opacity:0;z-index:8}
.iplk{text-align:center;margin-top:74px;font-size:18px}.ipdate{text-align:center;font-weight:500;font-size:21px;color:#ffffffd9;margin-top:6px}.ipclock{text-align:center;font-weight:600;font-size:112px;line-height:1;letter-spacing:-.02em;margin-bottom:30px}
.ipn{display:flex;gap:12px;margin:0 12px 10px;background:rgba(255,255,255,.16);backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.12);border-radius:24px;padding:14px}.ipbot{position:absolute;left:44px;right:44px;bottom:40px;display:flex;justify-content:space-between}.ipbot span{width:52px;height:52px;border-radius:50%;background:rgba(0,0,0,.35);display:grid;place-items:center;font-size:20px}
/* analytics */
.anr{display:flex;align-items:flex-end;justify-content:space-between}.xs2{font-size:15px;color:var(--ash);letter-spacing:.08em}.res{font-weight:600;font-size:64px;color:var(--long);margin:6px 0}
.anchart{width:100%;height:240px;margin:20px 0}
.anrow{display:flex;gap:30px}.says{flex:1;border:1px solid #2a2a30;border-radius:18px;padding:22px;background:#0d0d0f}.says p{font-size:24px;line-height:1.55;margin:12px 0 0}
.recs{flex:1;border:1px solid #2a2a30;border-radius:18px;padding:22px;background:#0d0d0f}.rec{display:flex;align-items:center;gap:14px;border-top:1px solid var(--seam);padding:14px 0}.rec b{display:block;font-size:20px}.rec span{font-size:16px;color:var(--ash)}
.ap2{margin-left:auto;background:var(--neon);color:#fff!important;font-weight:600;font-size:17px!important;padding:8px 18px;border-radius:10px;white-space:nowrap}
.wm2{position:absolute;right:0;bottom:-60px;font-size:15px;color:#ffffff55}
/* safety */
.saf{position:absolute;inset:0;background:radial-gradient(circle at 50% 30%,#1a1030 0%,#000 70%);display:flex;align-items:center;justify-content:center;gap:28px;perspective:1200px}
.sc{width:460px;height:380px;box-sizing:border-box;border:1px solid #2a2a30;background:#0d0d0f;border-radius:26px;padding:36px;display:flex;flex-direction:column;gap:16px}.si{font-size:56px}.sc b{font-size:32px}.sc span{font-size:21px;color:var(--ash);line-height:1.5}
.fund{position:absolute;top:150px;left:0;right:0;text-align:center;font-size:26px;letter-spacing:.14em;color:var(--pulse)}
${BT.CSS}
</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="${TOTAL}" data-width="1920" data-height="1080">
${html}
${aud.join("\n")}
</div>
<script>
const tl=gsap.timeline({paused:true});
// helpers: word-by-word typing, character typing, counters, camera moves on the app shell
// realistic typing: characters appear one by one with a human rhythm (pauses after punctuation and between words), caret follows
function typeReal(sel,a,b){const ks=[...document.querySelectorAll(sel+" .k")];const w=ks.map((k,i)=>{const c=k.textContent;let x=1+((i*37)%7)/10;if(c===" ")x+=.6;if(/[,.:;]/.test(c))x+=2.4;return x;});const tot=w.reduce((p,q)=>p+q,0);let t=a;ks.forEach((k,i)=>{tl.set(k,{display:"none"},0);tl.set(k,{display:"inline"},t);t+=(b-a)*w[i]/tot;});const c=document.querySelector(sel+" .caret2");if(c){for(let x=a;x<b+3;x+=.5){tl.set(c,{opacity:x>b?((Math.round(x*2)%2)?0:1):1},x);}}}
function typeIn(sel,a,b){const ws=document.querySelectorAll(sel+" .w");ws.forEach((w,i)=>tl.fromTo(w,{opacity:0},{opacity:1,duration:.04},a+(b-a)*i/ws.length));}
function typeChars(sel,a,b){const cs=document.querySelectorAll(sel);cs.forEach((c,i)=>tl.fromTo(c,{opacity:0},{opacity:1,duration:.01},a+(b-a)*i/cs.length));}
function count(sel,from,to,at,dur,pre=""){const o={v:from},el=document.querySelector(sel);tl.to(o,{v:to,duration:dur,ease:"power2.out",onUpdate:()=>{el.textContent=pre+Math.round(o.v).toLocaleString("en-US");}},at);}
function cam(S,at,sc,x,y,dur){const el=document.querySelector(S+" .app");if(el)tl.to(el,{scale:sc,x:x,y:y,duration:dur,ease:"power2.inOut"},at);}
${js}
window.__timelines=window.__timelines||{};window.__timelines["main"]=tl;
</script></body></html>`;
fs.mkdirSync(path.join(ROOT, "battle"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "battle/index.html"), page);
console.log(`full: ${SEG.length} segments, ${TOTAL}s (${(TOTAL / 60).toFixed(2)} min)`);
