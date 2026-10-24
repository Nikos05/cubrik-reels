// US series: "it's not your strategy, it's your emotions" -> rules-first agent.
import { hookDesk, connect, skills, guardrails, backtest, confirm, live, endCard } from "../lib/scenes.mjs";

export default {
  id: "emotions",
  vo: {
    en: [
      "You're not losing because of your strategy. You're losing because of your emotions.",
      "So I let an AI agent trade for me, right from Claude.",
      "I picked my strategy from Claude skills.",
      "Wrote my rules once. Stop loss on every trade, max loss per day.",
      "It backtested everything before risking a single dollar.",
      "Nothing goes live without my OK.",
      "And now? No revenge trades. No FOMO. Just the rules.",
      "Comment RULES, and I'll send you the setup.",
    ],
  },
  trans: [null, "zoom", "whipU", "stripes", "whipL", "zoom", "whipU", "zoom"],
  scenes: () => [
    hookDesk(1, { l1: "IT'S NOT YOUR STRATEGY", l2: "IT'S YOUR EMOTIONS" }),
    connect(2, { l1: "LET AN AGENT", l2: "EXECUTE IT" }),
    skills(3, { l1: "PICK YOUR", l2: "STRATEGY", pick: 5 }),
    guardrails(4, { l1: "WRITE YOUR RULES", l2: "ONCE" }),
    backtest(5, { l1: "BACKTESTED", l2: "BEFORE ANY RISK" }),
    confirm(6, { l1: "NOTHING GOES LIVE", l2: "WITHOUT YOUR OK" }),
    live(7, { l1: "NO REVENGE TRADES", l2: "NO FOMO", title: "Gold Session Agent", main: "🛡 Trade skipped · daily loss limit", nsub: "Your rule: max −3% per day", pnl: "✓ RULES", notif: 1.6 }),
    endCard(8, { word: "RULES" }),
  ],
  coverCss: `#cv .s1wrap{top:-120px;transform:scale(.85);transform-origin:50% 0}#cv .hero{top:690px;gap:14px}#cv .hl1,#cv .hl2{opacity:1}#cv .m1{display:none}`,
  fr: {},
};
