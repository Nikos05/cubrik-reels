// Shared pieces for the paid-ad series (English only, built with REEL_NOCLAUDE=1)
import { CUBE, LOGO } from "../lib/core.mjs";
import { brokerGrid, backtest, live, confirm, endCard } from "../lib/scenes.mjs";
export const badge = (t, bg) => `<span style="width:100%;height:100%;display:grid;place-items:center;background:${bg};color:#fff;font-size:30px">${t}</span>`;
export const cubeIc = `<span style="width:100%;height:100%;display:grid;place-items:center;background:#F3EEFF;padding:8px">${CUBE}</span>`;
export const xIc = `<span style="width:100%;height:100%;display:grid;place-items:center;background:#111"><svg viewBox="0 0 24 24" style="width:30px;height:30px"><path fill="#fff" d="M18.9 1.2h3.7l-8 9.2L24 22.8h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9Zm-1.3 19.4h2L6.5 3.2H4.3Z"/></svg></span>`;
export const ytIc = `<span style="width:100%;height:100%;display:grid;place-items:center;background:#fff;padding:6px">${LOGO("youtube")}</span>`;
export const ON = "background:#DCFCE7;color:#15803D";
export const RED = "background:#FEE2E2;color:#B91C1C";
// the shared voice lines live in assets/raw-launchai-en (02 broker, 05 backtest, 06 live, 07 confirm, 08 link)
export const SHARED = [2, 5, 6, 7, 8];
export const tail = (pair, name) => [
  backtest(5, { l1: "STEP 4", l2: "BACKTESTED FIRST" }),
  live(6, { l1: "TRADES 24/7", l2: "WHILE YOU SLEEP", main: "✅ Take profit hit · +2R", nsub: `${name} closed ${pair}`, pnl: "+2R", notif: 1.6 }),
  confirm(7, { l1: "NOTHING GOES LIVE", l2: "WITHOUT YOUR OK" }),
  endCard(8, { ad: true }),
];
export const step1 = () => brokerGrid(2, { link: true, l1: "STEP 1", l2: "CONNECT ANY BROKER" });
export const VO_SHARED = {
  2: "First step: connect cubrik to any broker you already use.",
  5: "It backtests on TradingView data before risking a single dollar.",
  6: "Then your AI agent trades it twenty four seven. Even while you sleep.",
  7: "And nothing goes live without your OK.",
  8: "Tap the link on this video, and try it free.",
};
export const vo = (l1, l3, l4) => [l1, VO_SHARED[2], l3, l4, VO_SHARED[5], VO_SHARED[6], VO_SHARED[7], VO_SHARED[8]];
