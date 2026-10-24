// Launch reel ("Claude just killed day traders") rebuilt on the episode engine, so it can run split-screen
// with an AI avatar. FR voice: Gacrux (female), to match the Pauline avatar.
import { hookDesk, connect, broker, ytCopy, chatAnalyze, skills, backtest, live, confirm, endCard } from "../lib/scenes.mjs";

export default {
  id: "launch",
  vo: {
    en: [
      "Claude just killed day traders.",
      "You can now connect cubrik to Claude.",
      "Link your broker in one message. Binance, MetaTrader, Interactive Brokers.",
      "Paste any YouTube strategy video.",
      "cubrik watches it, pulls out every rule, and builds your agent.",
      "Or create it from your own Claude skills.",
      "It backtests on TradingView data before risking a single dollar.",
      "Then your AI agent trades it twenty four seven. Even while you sleep.",
      "And nothing goes live without your OK.",
      "Comment CLAUDE, and I'll send you the setup.",
    ],
    fr: [
      "Claude vient de tuer les day traders.",
      "Tu peux maintenant connecter cubrik à Claude.",
      "Connecte ton broker en un seul message. Binance, MetaTrader, Interactive Brokers.",
      "Colle n'importe quelle vidéo de stratégie YouTube.",
      "cubrik la regarde, extrait chaque règle, et crée ton agent.",
      "Ou crée-le à partir de tes propres skills Claude.",
      "Il backteste sur les données TradingView avant de risquer le moindre euro.",
      "Ensuite ton agent IA trade vingt-quatre heures sur vingt-quatre. Même pendant que tu dors.",
      "Et rien ne passe en live sans ton accord.",
      "Commente CLAUDE, et je t'envoie le setup.",
    ],
  },
  trans: [null, "zoom", "stripes", "whipL", "whipU", "zoom", "whipL", "stripes", "whipU", "zoom"],
  // Pauline (AI avatar) talks in the bottom half; hook, YouTube, live and end card stay full screen
  ugc: process.env.REEL_UGC ? {
    en: { 2: "assets/ugc/launch-en/clip02.mp4", 3: "assets/ugc/launch-en/clip03.mp4", 5: "assets/ugc/launch-en/clip05.mp4", 6: "assets/ugc/launch-en/clip06.mp4", 7: "assets/ugc/launch-en/clip07.mp4", 9: "assets/ugc/launch-en/clip09.mp4" },
    fr: { 2: "assets/ugc/launch-fr/clip02.mp4", 3: "assets/ugc/launch-fr/clip03.mp4", 5: "assets/ugc/launch-fr/clip05.mp4", 6: "assets/ugc/launch-fr/clip06.mp4", 7: "assets/ugc/launch-fr/clip07.mp4", 9: "assets/ugc/launch-fr/clip09.mp4" },
  } : null,
  scenes: () => [
    hookDesk(1, { l1: "CLAUDE JUST KILLED", l2: "DAY TRADERS", strike: true }),
    connect(2, { l1: "CONNECT CUBRIK", l2: "TO CLAUDE" }),
    broker(3, { l1: "LINK YOUR BROKER", l2: "IN ONE MESSAGE" }),
    ytCopy(4, { l1: "PASTE ANY", l2: "YOUTUBE STRATEGY" }),
    chatAnalyze(5, { l1: "CUBRIK PULLS", l2: "EVERY RULE" }),
    skills(6, { l1: "OR USE", l2: "YOUR CLAUDE SKILLS" }),
    backtest(7, { l1: "BACKTESTED ON", l2: "TRADINGVIEW DATA" }),
    live(8, { l1: "TRADES 24/7", l2: "WHILE YOU SLEEP", main: "✅ Take profit hit · +2R", nsub: "Gold RSI Scalper closed XAU/USD", pnl: "+2R", notif: 1.6 }),
    confirm(9, { l1: "NOTHING GOES LIVE", l2: "WITHOUT YOUR OK" }),
    endCard(10, { word: "CLAUDE" }),
  ],
  fr: { "✅ Take profit hit · +2R": "✅ Take profit touché · +2R", "Gold RSI Scalper closed XAU/USD": "Gold RSI Scalper a clôturé XAU/USD" },
};
