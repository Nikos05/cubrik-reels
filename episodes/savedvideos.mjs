// US series (feature coming soon): saved YouTube strategy videos -> agents.
import { hookFeed, connect, ytCopy, chatAnalyze, clarify, backtest, live, endCard } from "../lib/scenes.mjs";

export default {
  id: "savedvideos",
  vo: {
    en: [
      "That trading video you saved and never used? It's about to trade for you.",
      "Connect cubrik to Claude.",
      "Copy the link of any strategy video.",
      "Paste it in Claude, and cubrik turns it into clear rules.",
      "It asks about anything the video left out.",
      "Then it backtests it before risking a dollar.",
      "And an agent trades it while you sleep.",
      "Comment VIDEO for early access.",
    ],
  },
  trans: [null, "zoom", "whipL", "stripes", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    hookFeed(1, { l1: "YOUR SAVED VIDEOS", l2: "ARE NOW AGENTS", strike: false }),
    connect(2),
    ytCopy(3, { l1: "COPY THE LINK", l2: "OF ANY STRATEGY" }),
    chatAnalyze(4, { l1: "PASTE IT", l2: "IN CLAUDE" }),
    clarify(5, { l1: "IT FILLS", l2: "THE GAPS" }),
    backtest(6, { l1: "BACKTESTED", l2: "BEFORE ANY RISK" }),
    live(7, { l1: "TRADES IT", l2: "WHILE YOU SLEEP", main: "✅ Take profit hit · +2R", nsub: "Gold 1H Strategy closed XAU/USD", pnl: "+2R", notif: 1.6 }),
    endCard(8, { word: "VIDEO", sub: "&amp; get early access" }),
  ],
  coverCss: `#cv .feed{top:-60px;transform:scale(.8);transform-origin:50% 0}#cv .hero{top:690px;gap:14px}#cv .hl1,#cv .hl2{opacity:1}#cv .mFeed{display:none}`,
  fr: {},
};
