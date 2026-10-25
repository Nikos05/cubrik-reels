// YouTube test (16:9): AI presenter on two cameras, then a full-screen cubrik app demo.
// Design tokens come from app.cubrik.ai (dark UI, Poppins / Lora / JetBrains Mono, violet accents).
// Usage: node build.mjs   (expects assets/shotA.mp4 + shotB.mp4 = two angles of ONE take, assets/take.wav = that take, assets/vo3.wav)
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
// OVERLAY=1: graphics only on a transparent background; the presenter footage is composited by ffmpeg (keeps it sharp)
const OVERLAY = !!process.env.OVERLAY;
const probe = (f) => +execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path.join(ROOT, f)]).toString().trim();

const A = probe("assets/shotA.mp4"), B = probe("assets/shotB.mp4"), V3 = probe("assets/vo3.wav"), TK = probe("assets/take.wav");
const tA = 0, tB = +A.toFixed(3), tD = +(A + B).toFixed(3);
const D = +(V3 + 0.9).toFixed(3), TOTAL = +(tD + D).toFixed(3);
const CUBE = `<svg viewBox="0 0 100 104"><polygon points="50,6 92,30 50,54 8,30" fill="#c4b5fd"/><polygon points="8,30 50,54 50,100 8,76" fill="#7c3aed"/><polygon points="50,54 92,30 92,76 50,100" fill="#a855f7"/></svg>`;
const EQ = (() => { let y = 120, d = "M0 120"; for (let x = 16; x <= 560; x += 16) { y -= 1.9 + Math.sin(x * 0.05) * 5; d += ` L${x} ${y.toFixed(1)}`; } return d; })();
const PROMPT = "Trade gold in London: buy the reclaim after a sweep of the last low. Stop under the swing, 2R target, 1% risk.";
const chars = (s) => s.split(" ").map((w) => `<span class="ch">${w}</span>`).join(" ");
const chips = [["claude", "read strategy"], ["cubrik", "build agent"], ["backtest", "5 years · fees in"], ["metatrader", "connect account"]];

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=1920, height=1080" />
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<style>
@font-face{font-family:Poppins;font-weight:400;src:url(assets/fonts/poppins-latin-400-normal.woff2)}
@font-face{font-family:Poppins;font-weight:500;src:url(assets/fonts/poppins-latin-500-normal.woff2)}
@font-face{font-family:Poppins;font-weight:600;src:url(assets/fonts/poppins-latin-600-normal.woff2)}
@font-face{font-family:Poppins;font-weight:800;src:url(assets/fonts/poppins-latin-800-normal.woff2)}
@font-face{font-family:Lora;font-weight:500;src:url(assets/fonts/lora-latin-500-normal.woff2)}
@font-face{font-family:"JetBrains Mono";font-weight:500;src:url(assets/fonts/jetbrains-mono-latin-500-normal.woff2)}
@font-face{font-family:"JetBrains Mono";font-weight:700;src:url(assets/fonts/jetbrains-mono-latin-700-normal.woff2)}
:root{--void:#000;--carbon:#0a0a0c;--seam:#ffffff14;--seam2:#1c1c21;--bone:#f2f1ec;--ash:#8b8b93;--neon:#a855f7;--deep:#7c3aed;--pulse:#c4b5fd;--long:#34d399}
html,body{margin:0;width:1920px;height:1080px;overflow:hidden;background:${OVERLAY ? "transparent" : "#000"}}
#root{position:relative;width:1920px;height:1080px;overflow:hidden;font-family:Poppins,sans-serif;color:var(--bone)}
.shot{position:absolute;inset:0;width:1920px;height:1080px;object-fit:cover}
.lt{position:absolute;left:110px;bottom:120px;display:flex;flex-direction:column;align-items:flex-start;gap:12px}
.pill{font-family:"JetBrains Mono",monospace;font-weight:700;text-transform:uppercase;letter-spacing:.1em;padding:12px 26px;border-radius:12px;font-size:40px;box-shadow:0 18px 40px -14px rgba(0,0,0,.7)}
.p1{background:#0d0d0f;color:var(--bone);border:1px solid #2a2a30}.p2{background:var(--deep);color:#fff;font-size:58px}
.strike{position:absolute;left:-8px;right:-8px;top:50%;height:8px;background:#fb7185;border-radius:4px;transform-origin:left center}
.duo{position:absolute;left:110px;bottom:120px;display:flex;align-items:center;gap:18px;background:rgba(10,10,12,.82);border:1px solid var(--seam);border-radius:20px;padding:16px 26px;backdrop-filter:blur(8px)}
.duo .ic{width:58px;height:58px;border-radius:14px;display:grid;place-items:center}
.duo .ic svg,.duo .ic img{width:40px;height:40px}.duo .x{font-family:"JetBrains Mono";color:var(--ash);font-size:28px}
.duo .t{font-weight:600;font-size:30px}
/* ---------- app demo (app.cubrik.ai look) ---------- */
#demo{position:absolute;inset:0;background:#000;overflow:hidden}
#app{position:absolute;inset:0;transform-origin:50% 50%}
.side{position:absolute;left:0;top:0;bottom:0;width:330px;border-right:1px solid var(--seam);background:#050506;padding:30px 22px;box-sizing:border-box}
.brand{display:flex;align-items:center;gap:12px;font-weight:600;font-size:26px;margin-bottom:34px}.brand svg{width:30px;height:30px}.brand b{color:var(--neon);font-weight:600}
.nav{display:flex;align-items:center;justify-content:space-between;font-size:21px;color:#d6d5cf;padding:12px 14px;border-radius:12px}
.nav.on{background:#141417}.badge{font-family:"JetBrains Mono";font-size:15px;color:var(--ash);border:1px solid var(--seam2);border-radius:999px;padding:2px 10px}
.badge.g{color:var(--long)}
.top{position:absolute;left:330px;right:0;top:0;height:76px;border-bottom:1px solid var(--seam);display:flex;align-items:center;justify-content:center}
.tog{display:flex;background:#0d0d0f;border:1px solid var(--seam2);border-radius:999px;padding:5px}.tog span{padding:8px 26px;border-radius:999px;font-size:19px;color:var(--ash)}.tog .on{background:#1f1f24;color:var(--bone)}
.main{position:absolute;left:330px;right:0;top:76px;bottom:0}
.col{position:absolute;left:50%;width:1060px;margin-left:-530px;top:90px}
.ubub{margin-left:auto;width:max-content;max-width:760px;background:#0d0d0f;border:1px solid var(--seam2);border-radius:18px;padding:18px 24px;font-size:23px;line-height:1.5}
.ai{display:flex;gap:18px;margin-top:28px}.ai .av{width:40px;height:40px;flex:none}.ai .av svg{width:40px;height:40px}
.chips{display:flex;flex-wrap:wrap;gap:10px}
.chip{font-family:"JetBrains Mono",monospace;font-size:18px;color:var(--ash);border:1px solid var(--seam2);border-radius:10px;padding:7px 14px}.chip i{color:var(--long);font-style:normal;margin-right:8px}
.say{font-family:Lora,serif;font-size:26px;line-height:1.6;margin-top:16px;color:var(--bone)}
.card{margin-top:22px;background:var(--carbon);border:1px solid var(--seam);border-radius:20px;padding:26px 30px;width:960px;box-sizing:border-box;box-shadow:0 0 0 1px #a855f700,0 30px 80px -30px #a855f766}
.ch1{display:flex;align-items:center;gap:14px}.dot{width:12px;height:12px;border-radius:50%;background:var(--neon);box-shadow:0 0 14px var(--neon)}
.cn{font-weight:600;font-size:30px}.bro{display:flex;align-items:center;gap:8px;font-size:17px;color:#d6d5cf;border:1px solid var(--seam2);border-radius:8px;padding:3px 10px}.bro img{width:20px;height:20px}
.sw{margin-left:auto;display:flex;align-items:center;gap:12px;font-size:19px;color:#d6d5cf}
.swt{width:58px;height:32px;border-radius:999px;background:#2a2a30;position:relative}.swt b{position:absolute;top:4px;left:4px;width:24px;height:24px;border-radius:50%;background:#f2f1ec}
.run{font-family:"JetBrains Mono";font-size:19px;color:var(--ash);margin-top:8px}
.jev{display:inline-flex;align-items:center;gap:10px;margin-top:16px;font-size:18px;color:#d6d5cf;border:1px solid var(--seam2);border-radius:999px;padding:6px 16px}.jev b{color:var(--pulse);font-family:"JetBrains Mono";font-size:20px}
.bt{display:flex;gap:28px;align-items:flex-end;margin-top:18px}
.bt svg{width:560px;height:130px}
.stats{display:flex;flex-direction:column;gap:10px}
.st{font-family:"JetBrains Mono";font-size:15px;color:var(--ash);letter-spacing:.06em}.st b{display:block;font-family:Poppins;font-size:30px;color:var(--bone);letter-spacing:0;font-weight:600}
.toast{position:absolute;right:40px;top:12px;width:560px;background:rgba(18,18,22,.96);border:1px solid #2a2a30;border-radius:22px;padding:20px 22px;display:flex;gap:16px;box-shadow:0 30px 70px -20px #000}
.toast .ti{width:52px;height:52px;border-radius:14px;background:#0d0d0f;display:grid;place-items:center;flex:none}.toast .ti svg{width:34px;height:34px}
.tt{display:flex;justify-content:space-between;font-size:17px;color:var(--ash)}.tm{font-weight:600;font-size:22px;margin-top:4px}.ts{font-family:"JetBrains Mono";font-size:16px;color:var(--ash);margin-top:6px}
.clock{position:absolute;left:50%;bottom:70px;transform:translateX(-50%);display:flex;align-items:center;gap:14px;font-family:"JetBrains Mono";font-size:24px;color:var(--bone);background:#0d0d0f;border:1px solid var(--seam2);border-radius:999px;padding:12px 26px}
.ring{width:16px;height:16px;border-radius:50%;background:var(--long);box-shadow:0 0 0 0 #34d39988}
.cursor{position:absolute;width:34px;height:34px;left:0;top:0}
.flash{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none}
.wm{position:absolute;right:40px;bottom:30px;font-family:"JetBrains Mono";font-size:16px;color:#ffffff55}
</style>
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-duration="${TOTAL}" data-width="1920" data-height="1080">
${OVERLAY ? "" : `<video id="vA" class="clip shot" src="assets/shotA.mp4" muted playsinline data-start="${tA}" data-duration="${(tB - tA).toFixed(3)}" data-track-index="1"></video>
<video id="vB" class="clip shot" src="assets/shotB.mp4" muted playsinline data-start="${tB}" data-duration="${(tD - tB).toFixed(3)}" data-track-index="2"></video>`}
<div id="hook" class="clip" data-start="${tA}" data-duration="${(tB - tA).toFixed(3)}" data-track-index="3" style="position:absolute;inset:0">
  <div class="lt"><div class="pill p1">Claude just killed</div><div class="pill p2" style="position:relative">day traders<div class="strike"></div></div></div>
</div>
<div id="duo" class="clip" data-start="${tB}" data-duration="${(tD - tB).toFixed(3)}" data-track-index="4" style="position:absolute;inset:0">
  <div class="duo"><div class="ic" style="background:#0d0d0f">${CUBE}</div><div class="x">×</div><div class="ic" style="background:#F6F2EA"><img src="assets/claude.svg" alt=""></div><div class="t">cubrik connects to Claude</div></div>
</div>
<div id="demo" class="clip" data-start="${tD}" data-duration="${D}" data-track-index="5">
 <div id="app">
  <div class="side">
    <div class="brand">${CUBE}<span>cubrik<b>.ai</b></span></div>
    <div class="nav">＋&nbsp; New chat</div>
    <div class="nav on">AI agents <span class="badge g">● 3 running</span></div>
    <div class="nav">Market</div><div class="nav">Analytics</div>
    <div class="nav">Library <span class="badge">13,353</span></div><div class="nav">Brokers <span class="badge">3</span></div>
  </div>
  <div class="top"><div class="tog"><span class="on">Trading</span><span>Chat</span></div></div>
  <div class="main"><div class="col">
    <div class="ubub">${chars(PROMPT)}</div>
    <div class="ai"><div class="av">${CUBE}</div><div style="flex:1">
      <div class="chips">${chips.map(([a, b], k) => `<span class="chip c${k}"><i>✓</i>${a} · ${b}</span>`).join("")}</div>
      <div class="say">Your agent is ready. I tested it first, here's what it does.</div>
      <div class="card">
        <div class="ch1"><span class="dot"></span><span class="cn">Gold London sweep</span><span class="bro"><img src="assets/mt5.png" alt="">MetaTrader</span>
          <span class="sw"><span class="swt"><b></b></span><span class="swl">Paused</span></span></div>
        <div class="run">Every 5 min · XAU/USD · 1h</div>
        <span class="jev">Jev score <b>86</b></span>
        <div class="bt"><svg viewBox="0 0 560 130"><path class="eqf" d="${EQ} L560 130 L0 130 Z" fill="rgba(168,85,247,.16)"/><path class="eql" d="${EQ}" fill="none" stroke="#a855f7" stroke-width="4" stroke-linejoin="round"/></svg>
          <div class="stats"><div class="st">BACKTEST<b>5 years</b></div><div class="st">WIN RATE<b>61%</b></div></div>
          <div class="stats"><div class="st">PROFIT FACTOR<b>1.8</b></div><div class="st">LIVE<b style="color:#c4b5fd">Your OK</b></div></div></div>
      </div>
    </div></div>
  </div></div>
  <div class="toast"><div class="ti">${CUBE}</div><div style="flex:1"><div class="tt"><span>cubrik · Gold London sweep</span><span>now</span></div>
    <div class="tm">Order placed · XAU/USD long</div><div class="ts">at 4,172 · SL 4,151 · TP 4,214 · on your broker</div></div></div>
  <div class="clock"><span class="ring"></span>Running 24/7 · next run in 5 min</div>
 </div>
 <svg class="cursor" viewBox="0 0 24 24"><path d="M4 2l16 9-7 2-3 7z" fill="#fff" stroke="#000" stroke-width="1.2"/></svg>
 <div class="wm">Demo account · illustration</div>
</div>
<div id="fx" class="clip" data-start="0" data-duration="${TOTAL}" data-track-index="9" style="position:absolute;inset:0;pointer-events:none"><div class="flash"></div></div>
<audio id="take" src="assets/take.wav" data-start="0" data-duration="${Math.min(TK, tD).toFixed(3)}" data-track-index="8" data-volume="1"></audio>
<audio id="vo3" src="assets/vo3.wav" data-start="${(tD + 0.15).toFixed(3)}" data-duration="${V3.toFixed(3)}" data-track-index="10" data-volume="1"></audio>
${[["impact-bass-1", 0.02, 0.3], ["whoosh", tD - 0.25, 0.5], ["pop", tD + 0.45, 0.3], ["click-soft", tD + 0.75, 0.25], ["click-soft", tD + 0.9, 0.25], ["click-soft", tD + 1.05, 0.25], ["click-soft", tD + 1.2, 0.25], ["sparkle", tD + 1.55, 0.3], ["notification", tD + 2.75, 0.4], ["ping", tD + 3.55, 0.25]]
  .map(([f, t, v], k) => `<audio id="s${k}" src="assets/sfx/${f}.wav" data-start="${Math.max(0, t).toFixed(3)}" data-duration="1.2" data-track-index="${11 + k}" data-volume="${v}"></audio>`).join("\n")}
</div>
<script>
const tl=gsap.timeline({paused:true});const A=${tA},B=${tB},T=${tD};
// presenter shots: slow push-in, lower thirds


tl.fromTo("#hook .p1",{x:-80,opacity:0},{x:0,opacity:1,duration:.3,ease:"expo.out"},A+.15);
tl.fromTo("#hook .p2",{scale:1.6,opacity:0},{scale:1,opacity:1,duration:.3,ease:"expo.out",transformOrigin:"left center"},A+.35);
tl.fromTo("#hook .strike",{scaleX:0},{scaleX:1,duration:.25,ease:"power3.out"},A+1.0);
tl.to("#hook .lt",{opacity:0,duration:.2},B-.25);
tl.fromTo("#duo .duo",{y:40,opacity:0},{y:0,opacity:1,duration:.35,ease:"back.out(2)"},B+.25);
tl.to("#duo .duo",{opacity:0,duration:.2},T-.3);
// transition into the demo: zoom punch + flash
tl.fromTo("#app",{scale:1.25,filter:"blur(14px)"},{scale:1,filter:"blur(0px)",duration:.45,ease:"expo.out"},T);
tl.fromTo(".flash",{opacity:.55},{opacity:0,duration:.3,immediateRender:false},T);
const d=(x)=>T+x;
// prompt types in fast, then the agent answers
const ch=document.querySelectorAll(".ubub .ch");tl.fromTo(".ubub",{y:30,opacity:0},{y:0,opacity:1,duration:.25,ease:"back.out(2)"},d(.1));
ch.forEach((c,i)=>tl.fromTo(c,{opacity:0},{opacity:1,duration:.02},d(.15+i*.018)));
tl.fromTo(".ai",{opacity:0},{opacity:1,duration:.2},d(.6));
[0,1,2,3].forEach(k=>tl.fromTo(".c"+k,{y:16,opacity:0,scale:.9},{y:0,opacity:1,scale:1,duration:.22,ease:"back.out(2.5)"},d(.7+k*.15)));
tl.fromTo(".say",{opacity:0,y:10},{opacity:1,y:0,duration:.25},d(1.25));
tl.fromTo(".card",{y:60,opacity:0,scale:.96},{y:0,opacity:1,scale:1,duration:.4,ease:"expo.out"},d(1.1));
// switch turns on
tl.to(".swt",{backgroundColor:"#a855f7",duration:.15},d(1.55));tl.to(".swt b",{x:26,duration:.18,ease:"back.out(2)"},d(1.55));
tl.set(".swl",{textContent:"Running"},d(1.6));
tl.fromTo(".card",{boxShadow:"0 0 0 1px #a855f700,0 30px 80px -30px #a855f766"},{boxShadow:"0 0 0 2px #a855f7cc,0 30px 80px -30px #a855f7aa",duration:.25,yoyo:true,repeat:1},d(1.55));
// backtest draws
const L=document.querySelector(".eql").getTotalLength();tl.fromTo(".eql",{strokeDasharray:L,strokeDashoffset:L},{strokeDashoffset:0,duration:.7,ease:"power2.out"},d(1.75));
tl.fromTo(".eqf",{opacity:0},{opacity:1,duration:.5},d(2.0));
tl.fromTo(".stats",{opacity:0,y:10},{opacity:1,y:0,duration:.25,stagger:.1},d(1.9));
// camera: push toward the card, then toward the order toast
tl.to("#app",{scale:1.14,x:-60,y:-170,duration:1.2,ease:"power2.inOut"},d(1.2));
tl.fromTo(".toast",{x:640},{x:0,duration:.45,ease:"back.out(1.6)"},d(2.75));
tl.to("#app",{scale:1.16,x:-300,y:120,duration:.8,ease:"power2.inOut"},d(2.7));
tl.fromTo(".clock",{y:80,opacity:0},{y:0,opacity:1,duration:.35,ease:"back.out(2)"},d(3.45));
tl.to("#app",{scale:1,x:0,y:0,duration:.8,ease:"power2.inOut"},d(3.4));
tl.fromTo(".ring",{boxShadow:"0 0 0 0 #34d39988"},{boxShadow:"0 0 0 18px #34d39900",duration:.8,repeat:2},d(3.6));
// cursor taps send, then the switch
tl.fromTo(".cursor",{x:1700,y:900,opacity:0},{x:1580,y:330,opacity:1,duration:.4,ease:"power2.out"},d(.25));
tl.to(".cursor",{scale:.8,duration:.06,yoyo:true,repeat:1},d(.62));
tl.to(".cursor",{opacity:0,duration:.2},d(1.0));
window.__timelines=window.__timelines||{};window.__timelines["main"]=tl;
</script>
</body>
</html>
`;
fs.writeFileSync(path.join(ROOT, "index.html"), html);
console.log(`yt: A ${A.toFixed(2)} B ${B.toFixed(2)} demo ${D.toFixed(2)} total ${TOTAL}`);
