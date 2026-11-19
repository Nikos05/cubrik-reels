import { hookTV, feedCard, chartTrade } from "../lib/scenes.mjs";
import { cubeIc, ON, tail, step1, vo } from "./_adcommon.mjs";
const C = [[50,52,54,49],[52,51,53,50],[51,55,56,50],[55,54,57,53],[54,58,59,53],[58,57,60,56],[57,61,62,56],[61,60,63,59],[60,64,65,59],[64,63,66,62],[63,67,69,62],[67,70,71,66]];
const chart = `<svg viewBox="0 0 360 150" style="display:block;width:100%;height:150px;background:#0f1115">${C.map(([o, c, h, l], k) => { const x = 18 + k * 28, Y = (v) => 140 - (v - 46) * 5, col = c >= o ? "#22c55e" : "#ef4444"; return `<line x1="${x}" x2="${x}" y1="${Y(h)}" y2="${Y(l)}" stroke="${col}" stroke-width="2"/><rect x="${x - 7}" y="${Y(Math.max(o, c))}" width="14" height="${Math.max(3, Math.abs(Y(o) - Y(c)))}" fill="${col}"/>`; }).join("")}<line x1="0" x2="360" y1="${140 - 15 * 5}" y2="${140 - 15 * 5}" stroke="#a78bfa" stroke-dasharray="6 5"/></svg>`;
export default {
  id: "adchart",
  vo: { en: vo("Send AI a chart, and it trades the setup for you.", "Screenshot any chart, and send it to cubrik.", "cubrik spots the pattern, then sets the entry, the stop, and the target.") },
  trans: [null, "stripes", "whipL", "whipU", "whipL", "stripes", "whipU", "zoom"],
  scenes: () => [
    hookTV(1, { l1: "SEND AI A CHART", l2: "IT TRADES IT" }),
    step1(),
    feedCard(3, { l1: "STEP 2", l2: "SEND ANY CHART", msg: "trade this setup for me", img: chart, speed: 45, rows: [[cubeIc, "Reading your chart", "XAU/USD · 1H detected", "✓", ON], [cubeIc, "Ascending triangle", "Breakout above 2,412", "Found", ON]] }),
    chartTrade(4, { l1: "STEP 3", l2: "ENTRY · STOP · TARGET", phase: "order", pair: "XAU/USD", tf: "1H", broker: "METATRADER 5", entry: "2,412", sl: "2,396", tp: "2,444" }),
    ...tail("XAU/USD", "Triangle Breakout"),
  ],
};
