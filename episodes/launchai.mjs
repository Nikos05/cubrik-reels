// Paid-ad cut of the launch reel: "AI just killed day traders" (no Claude), ends on the link of the ad.
// Build with REEL_NOCLAUDE=1 so the chat cards are cubrik's own.
import { hookDesk, brokerGrid, ytCopy, chatAnalyze, backtest, live, confirm, endCard } from "../lib/scenes.mjs";

export default {
  id: "launchai",
  vo: {
    en: [
      "AI just killed day traders.",
      "First step: connect cubrik to any broker you already use.",
      "Paste any YouTube strategy video.",
      "cubrik watches it, pulls out every rule, and builds your agent.",
      "It backtests on TradingView data before risking a single dollar.",
      "Then your AI agent trades it twenty four seven. Even while you sleep.",
      "And nothing goes live without your OK.",
      "Tap the link on this video, and try it free.",
    ],
    fr: [
      "L'intelligence artificielle vient de tuer les day traders.",
      "Connecte ton broker en un seul message. Binance, MetaTrader, Interactive Brokers.",
      "Colle n'importe quelle vidéo de stratégie YouTube.",
      "cubrik la regarde, extrait chaque règle, et crée ton agent.",
      "Il backteste sur les données TradingView avant de risquer le moindre euro.",
      "Ensuite ton agent trade vingt-quatre heures sur vingt-quatre. Même pendant que tu dors.",
      "Et rien ne passe en live sans ton accord.",
      "Clique sur le lien de cette vidéo, et essaie gratuitement.",
    ],
  },
  trans: [null, "stripes", "whipL", "whipU", "whipL", "stripes", "whipU", "zoom"],
  scenes: () => [
    hookDesk(1, { l1: "AI JUST KILLED", l2: "DAY TRADERS", strike: true }),
    brokerGrid(2, { link: true, l1: "STEP 1", l2: "CONNECT ANY BROKER" }),
    ytCopy(3, { l1: "PASTE ANY", l2: "YOUTUBE STRATEGY" }),
    chatAnalyze(4, { l1: "CUBRIK PULLS", l2: "EVERY RULE" }),
    backtest(5, { l1: "BACKTESTED ON", l2: "TRADINGVIEW DATA" }),
    live(6, { l1: "TRADES 24/7", l2: "WHILE YOU SLEEP", main: "✅ Take profit hit · +2R", nsub: "Gold RSI Scalper closed XAU/USD", pnl: "+2R", notif: 1.6 }),
    confirm(7, { l1: "NOTHING GOES LIVE", l2: "WITHOUT YOUR OK" }),
    endCard(8, { ad: true }),
  ],
  fr: {
    "AI JUST KILLED": "L'IA VIENT DE TUER", "✅ Take profit hit · +2R": "✅ Take profit touché · +2R",
    "Gold RSI Scalper closed XAU/USD": "Gold RSI Scalper a clôturé XAU/USD", "AI agent": "agent IA",
    "Reply to cubrik…": "Répondre à cubrik…", "Tap the link": "Clique sur le lien",
    "Try it free · demo account": "Essai gratuit · compte démo", "AI TRADING AGENTS": "AGENTS DE TRADING IA",
  },
};
