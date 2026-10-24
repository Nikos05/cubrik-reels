// Engine shared by every cubrik reel: language, helpers, timeline core, assembly.
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { BASE_CSS } from "./base-css.mjs";
import { SCENE_CSS } from "./scene-css.mjs";

export const LANG = process.env.REEL_LANG === "fr" ? "fr" : "en";
export const FR = {}; // episode + library translations, filled before scenes are built
export const tr = (s) => (LANG === "fr" && FR[s] !== undefined ? FR[s] : s);
export const localize = (html) =>
  LANG !== "fr"
    ? html
    : html.replace(/>([^<>]+)</g, (m, t) => {
        const k = t.trim();
        return FR[k] !== undefined ? ">" + t.replace(k, FR[k]) + "<" : m;
      });

export const probe = (f) =>
  parseFloat(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString());

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
export const chars = (s) =>
  [...tr(s)].map((c) => (c === " " ? `<span class="ch">&nbsp;</span><wbr>` : `<span class="ch">${esc(c)}</span>`)).join("");

export function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

// pixel mascot 14x15
const PAL = { T: "#C4B5FD", L: "#7C3AED", R: "#A855F7", W: "#FFFFFF", K: "#1E1033", D: "#3B1580" };
const BODY = [
  "......TT......", "....TTTTTT....", "..TTTTTTTTTT..", "TTTTTTTTTTTTTT", "LLTTTTTTTTTTRR",
  "LLLLTTTTTTRRRR", "LLLLLLTTRRRRRR", "LLLLLLLRRRRRRR", "LLLLLWLRWRRRRR", "LLLLLKLRKRRRRR",
  "LLLLLLLRRRRRRR", "..LLLLLRRRRR..", "....LLLRRR....",
];
const LEGS_A = ["....D....D....", "...DD....DD..."];
const LEGS_B = [".....D..D.....", ".....DD.DD...."];
const rects = (rows, y0) =>
  rows
    .map((row, y) =>
      [...row]
        .map((c, x) => (c === "." ? "" : `<rect x="${x}" y="${y + y0}" width="1.02" height="1.02" fill="${PAL[c]}"/>`))
        .join(""),
    )
    .join("");
const MASCOT_SVG = `<svg viewBox="0 0 14 15" shape-rendering="crispEdges">${rects(BODY, 0)}<g class="mA">${rects(LEGS_A, 13)}</g><g class="mB" style="opacity:0">${rects(LEGS_B, 13)}</g></svg>`;
export const mascot = (cls = "") =>
  `<div class="mascot ${cls}"><div class="mBody">${MASCOT_SVG}</div><div class="mShadow"></div></div>`;

export const CUBE = `<svg viewBox="0 0 100 104"><polygon points="50,6 92,30 50,54 8,30" fill="#C4B5FD"/><polygon points="8,30 50,54 50,100 8,76" fill="#7C3AED"/><polygon points="50,54 92,30 92,76 50,100" fill="#A855F7"/></svg>`;
export const LOGO = (name, ext = "svg", cls = "") => `<img class="lg ${cls}" src="assets/logos/${name}.${ext}" alt="">`;
export const claudeTile = (cls = "") =>
  `<div class="tile tClaude ${cls}"><div class="tIcon">${LOGO("claude")}</div><div class="tName serif">Claude</div></div>`;
export const cubrikTile = (cls = "") =>
  `<div class="tile tCubrik ${cls}"><div class="tIcon">${CUBE}</div><div class="tName">cubrik</div></div>`;
export const labels = (a, b) =>
  `<div class="labels"><div class="lab lab1">${tr(a)}</div><div class="lab lab2 key">${tr(b)}</div></div>`;
export const chatHead = () =>
  `<div class="chatHead">${LOGO("claude")}<span class="chName serif">Claude</span><span class="conn"><i>${CUBE}</i>cubrik connected</span></div>`;

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
export const CSS = BASE_CSS(fontFaces) + SCENE_CSS;

// shared FR strings for library scenes
Object.assign(FR, {
  "CONNECTORS": "CONNECTEURS", "✓ Connected": "✓ Connecté", "cubrik connected": "cubrik connecté",
  "Reply to Claude…": "Répondre à Claude…", "Comment": "Commente", "&amp; I'll send you the setup": "&amp; je t'envoie le setup",
  "CUBRIK WORKS WITH CLAUDE": "CUBRIK FONCTIONNE AVEC CLAUDE", "now": "maintenant", "Cancel": "Annuler",
  "Confirm": "Confirmer", "Live ✓": "En live ✓", "CONNECT CUBRIK": "CONNECTE CUBRIK", "TO CLAUDE": "À CLAUDE",
});

// ---------- timeline core (helpers, camera push, velocity-matched transitions) ----------
const JS_CORE = (S, D, TRANS) => `
const S=${JSON.stringify(S)}, D=${JSON.stringify(D)}, TRANS=${JSON.stringify(TRANS)}, LAB=[0.06,0.3];
const tl=gsap.timeline({paused:true});
const at=(i,t)=>S[i]+t;
const q=(s)=>document.querySelector(s), qa=(s)=>Array.from(document.querySelectorAll(s));
function pop(sel,i,t,d){tl.fromTo(sel,{scale:.5,opacity:0},{scale:1,opacity:1,duration:d||.24,ease:"back.out(3)"},at(i,t));}
function bounce(sel,i,t){tl.fromTo(sel,{scale:.6,opacity:0},{scale:1,opacity:1,duration:.38,ease:"back.out(2.6)"},at(i,t));}
function rise(sel,i,t,y){tl.fromTo(sel,{y:y||170,scale:.94,opacity:0},{y:0,scale:1,opacity:1,duration:.4,ease:"back.out(2.1)"},at(i,t));}
function slideIn(sel,i,t,x){tl.fromTo(sel,{x:x||-60,opacity:0},{x:0,opacity:1,duration:.28,ease:"back.out(2.2)"},at(i,t));}
function labels(n){LAB.forEach((t,k)=>{const el="#s"+n+" .lab"+(k+1);
  tl.fromTo(el,{scale:k?1.5:.5,opacity:0,rotation:k?-4:0},{scale:1,opacity:1,rotation:0,duration:.24,ease:"back.out(3.2)"},at(n-1,t));});}
function type(sel,i,t,cps){const c=qa(sel+" .ch");c.forEach((x,k)=>tl.set(x,{display:"inline"},at(i,t+k/cps)));return t+c.length/cps;}
function blink(sel,i,t0,t1){const n=Math.max(1,Math.floor((t1-t0)/.4));for(let k=0;k<n;k++){tl.set(sel,{opacity:0},at(i,t0+k*.4+.2));tl.set(sel,{opacity:1},at(i,t0+k*.4+.4));}}
function walk(el,i,t0,t1,step){step=step||.13;const A=el.querySelector(".mA"),B=el.querySelector(".mB");let k=0;
  for(let t=t0;t<t1;t+=step,k++){tl.set(A,{opacity:k%2?0:1},at(i,t));tl.set(B,{opacity:k%2?1:0},at(i,t));}
  const n=Math.max(1,Math.floor((t1-t0)/step));
  tl.fromTo(el.querySelector(".mBody"),{y:0},{y:-9,duration:step,ease:"sine.out",yoyo:true,repeat:n-1},at(i,t0));}
function mascotOnCard(i,t){const el=q("#s"+(i+1)+" .onCard");if(!el)return;
  tl.fromTo(el,{scale:0,rotation:-25,opacity:0},{scale:1,rotation:0,opacity:1,duration:.35,ease:"back.out(3)"},at(i,t));walk(el,i,0,D[i]);}
function shake(sel,t,amp,n){for(let k=0;k<n;k++)tl.to(sel,{x:(k%2?-1:1)*amp*(1-k/n),y:(k%3-1)*amp*.5*(1-k/n),duration:.035,ease:"none"},t+k*.035);tl.to(sel,{x:0,y:0,duration:.035},t+n*.035);}
function tap(hand,target,i,t){tl.fromTo(hand,{x:300,y:300,opacity:0},{x:0,y:0,opacity:1,duration:.42,ease:"power3.out"},at(i,t-.5));
  tl.to(hand,{scale:.82,duration:.07,yoyo:true,repeat:1},at(i,t-.04));
  if(target)tl.to(target,{scale:.93,duration:.06,yoyo:true,repeat:1},at(i,t));
  tl.to(hand,{x:140,y:140,opacity:0,duration:.3,ease:"power2.in"},at(i,t+.42));}
function draw(sel,i,t,d){const p=q(sel),L=p.getTotalLength();tl.fromTo(p,{strokeDasharray:L+5,strokeDashoffset:L+5},{strokeDashoffset:0,duration:d||.4,ease:"power2.inOut"},at(i,t));}

for(let i=0;i<S.length;i++)tl.fromTo("#s"+(i+1)+" .cam",{scale:1},{scale:1.045,duration:D[i],ease:"none"},at(i,0));
tl.set("#wipe .bar",{xPercent:-135},0);
const CH=(b,c)=>"blur("+b+"px) drop-shadow("+c+"px 0 0 rgba(255,40,100,.6)) drop-shadow("+(-c)+"px 0 0 rgba(40,190,255,.6))";
for(let k=1;k<S.length;k++){const c=S[k],o="#s"+k+" .sIn",n="#s"+(k+1)+" .sIn",T=TRANS[k];
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
`;

// ---------- build one episode ----------
// ep: { id, vo: {en:[...], fr:[...]}, fr: {...}, trans: [...], scenes: () => [{html, js, sfx, min, card, labels}], cover: () => html, coverCss }
export function build(ep) {
  Object.assign(FR, ep.fr || {});
  const VO_OFFSET = 0.06, GAP = 0.1, HOLD_END = 1.5;
  const voDir = `assets/vo-${ep.id}-${LANG}`;
  const voFile = (i) => `${voDir}/vo${String(i + 1).padStart(2, "0")}.wav`;
  const scenes = ep.scenes();
  const N = scenes.length;
  const VO = scenes.map((_, i) => probe(voFile(i)));
  const D = VO.map((v, i) => {
    const need = i === N - 1 ? VO_OFFSET + v + HOLD_END + 0.3 : VO_OFFSET + v + GAP;
    return +Math.max(scenes[i].min || 1.8, need).toFixed(3);
  });
  const S = [];
  D.reduce((acc, d, i) => ((S[i] = +acc.toFixed(3)), acc + d), 0);
  const TOTAL = +(S[N - 1] + D[N - 1]).toFixed(3);

  // audio
  const audio = [];
  let aid = 0;
  const LEN = {};
  const sfxAt = (file, at, vol, track, dur) => {
    LEN[file] ??= probe(`assets/sfx/${file}.wav`);
    const d = Math.min(dur ?? LEN[file], TOTAL - at);
    audio.push(
      `<audio id="sfx${++aid}" src="assets/sfx/${file}.wav" data-start="${Math.max(0, at).toFixed(3)}" data-duration="${d.toFixed(3)}" data-track-index="${track}" data-volume="${vol}"></audio>`,
    );
  };
  VO.forEach((v, i) =>
    audio.push(
      `<audio id="vo${i + 1}" src="${voFile(i)}" data-start="${(S[i] + VO_OFFSET).toFixed(3)}" data-duration="${v.toFixed(3)}" data-track-index="2" data-volume="1"></audio>`,
    ),
  );
  for (let k = 1; k < N; k++) {
    sfxAt("whoosh", S[k] - 0.16, ep.trans[k] === "zoom" ? 0.55 : 0.5, 3 + (k % 2));
    if (ep.trans[k] === "zoom") sfxAt("impact-bass-1", S[k] - 0.05, k === N - 1 ? 0.6 : 0.38, 5, 1.6);
  }
  scenes.forEach((sc, i) => {
    if (sc.labels !== false && i > 0 && i < N - 1)
      [0.06, 0.3].forEach((t, k) => sfxAt("click-soft", S[i] + t + 0.02, k ? 0.34 : 0.26, 8 + k, 0.3));
    if (sc.card !== false && i > 0 && i < N - 1) sfxAt("pop", S[i] + 0.03, 0.3, 10, 0.5);
    let tr = 11;
    (sc.sfx || []).forEach(([file, t, vol, dur]) => sfxAt(file, S[i] + t, vol, tr++, dur));
  });

  // split screen: scene content in the top half, talking UGC clip in the bottom half
  const UGC = (ep.ugc && ep.ugc[LANG]) || {};
  const ugcVideos = Object.entries(UGC)
    .map(([n, src]) => {
      const i = +n - 1, len = probe(src);
      return `<video id="ugc${n}" class="clip ugc" src="${src}" muted playsinline data-start="${S[i]}" data-duration="${Math.min(D[i], len).toFixed(3)}" data-track-index="13"></video>`;
    })
    .join("\n");
  const JS = JS_CORE(S, D, ep.trans) + scenes.map((s) => s.js).join("\n") + `\nwindow.__timelines["main"]=tl;\n`;
  const sceneDivs = scenes
    .map(
      (s, i) =>
        UGC[i + 1]
          ? `<div id="s${i + 1}" class="clip scene split" data-start="${S[i]}" data-duration="${D[i]}" data-track-index="1"><div class="sIn"><div class="cam"><div class="fit">${s.html}</div></div></div></div>`
          : `<div id="s${i + 1}" class="clip scene" data-start="${S[i]}" data-duration="${D[i]}" data-track-index="1"><div class="sIn"><div class="cam">${s.html}</div></div></div>`,
    )
    .join("\n");
  const extra = (ep.css || "") + (LANG === "fr" ? ep.cssFr || "" : "");
  const html = `<!doctype html>
<html lang="${LANG}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=1080, height=1920" />
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<style>${CSS}${extra}</style>
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-duration="${TOTAL}" data-width="1080" data-height="1920">
<div id="bg" class="clip" data-start="0" data-duration="${TOTAL}" data-track-index="0"><div class="wash peach"></div><div class="wash lav"></div><div class="grid"></div></div>
${sceneDivs}
${ugcVideos}
<div id="wipe" data-layout-allow-occlusion class="clip" data-start="0" data-duration="${TOTAL}" data-track-index="14"><div class="bar b1" data-layout-allow-occlusion></div><div class="bar b2" data-layout-allow-occlusion></div><div class="bar b3" data-layout-allow-occlusion></div></div>
<div id="flash" data-layout-allow-occlusion class="clip" data-start="0" data-duration="${TOTAL}" data-track-index="15"></div>
${audio.join("\n")}
</div>
<script>${JS}</script>
</body>
</html>
`;
  fs.writeFileSync("index.html", localize(html));

  const cover = `<!doctype html>
<html lang="${LANG}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=1080, height=1080" />
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<style>${CSS}${extra}
html,body{width:1080px;height:1080px}
${ep.coverCss || ""}
</style>
</head>
<body>
<div id="root" data-composition-id="cover" data-start="0" data-duration="0.5" data-width="1080" data-height="1080">
<div id="bg" class="clip" data-start="0" data-duration="0.5" data-track-index="0"><div class="wash peach"></div><div class="wash lav"></div><div class="grid"></div></div>
<div id="cv" class="clip" data-start="0" data-duration="0.5" data-track-index="1">${scenes[0].html}</div>
</div>
<script>const tl=gsap.timeline({paused:true});window.__timelines["cover"]=tl;</script>
</body>
</html>
`;
  fs.mkdirSync("cover/assets", { recursive: true });
  for (const d of ["fonts", "logos", "img"]) if (fs.existsSync(`assets/${d}`)) fs.cpSync(`assets/${d}`, `cover/assets/${d}`, { recursive: true });
  fs.writeFileSync("cover/index.html", localize(cover));
  console.log(`${ep.id}/${LANG}:`, D.map((d, i) => `${i + 1}:${S[i]}+${d}`).join("  "), "total", TOTAL);
}
