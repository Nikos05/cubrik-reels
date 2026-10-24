// US series: "Claude can now trade for you" -> step-by-step setup.
import { hookChat, connect, broker, skills, backtest, confirm, live, endCard } from "../lib/scenes.mjs";

export default {
  id: "claude",
  vo: {
    en: [
      "Claude can now run a trading agent for you. Here's how.",
      "First, connect cubrik to Claude.",
      "Then link your broker. Binance, MetaTrader, or Hyperliquid.",
      "Pick a strategy, or bring your own skill.",
      "Claude backtests it on years of TradingView data.",
      "You approve it with one tap.",
      "And your agent trades it around the clock.",
      "Comment CLAUDE, and I'll send you the setup.",
    ],
    fr: [
      "Claude peut maintenant gérer un agent de trading pour toi. Voilà comment.",
      "D'abord, connecte cubrik à Claude.",
      "Ensuite, relie ton broker. Binance, MetaTrader ou Hyperliquid.",
      "Choisis une stratégie, ou apporte ton propre skill.",
      "Claude la backteste sur des années de données TradingView.",
      "Tu la valides en un tap.",
      "Et ton agent la trade jour et nuit.",
      "Commente CLAUDE, et je t'envoie le setup.",
    ],
  },
  trans: [null, "zoom", "stripes", "whipL", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    hookChat(1, { l1: "CLAUDE CAN NOW", l2: "TRADE FOR YOU" }),
    connect(2, { l1: "STEP 1", l2: "CONNECT CUBRIK" }),
    broker(3, { l1: "STEP 2", l2: "LINK YOUR BROKER" }),
    skills(4, { l1: "STEP 3", l2: "PICK A STRATEGY", pick: 0 }),
    backtest(5, { l1: "STEP 4", l2: "BACKTEST IT" }),
    confirm(6, { l1: "STEP 5", l2: "APPROVE IT" }),
    live(7, { l1: "THEN IT RUNS", l2: "24/7", main: "✅ Take profit hit · +2R", nsub: "Gold RSI Scalper closed XAU/USD", pnl: "+2R", notif: 1.6 }),
    endCard(8, { word: "CLAUDE" }),
  ],
  coverCss: `#cv .hcStage{top:30px;transform:scale(.8);transform-origin:50% 0}#cv .hero{top:690px;gap:14px}#cv .hl1,#cv .hl2,#cv .uBubble,#cv .reply,#cv .hcL{opacity:1}#cv .ch{display:inline!important}#cv .cursor{display:none}`,
  fr: {"CLAUDE CAN NOW": "CLAUDE PEUT MAINTENANT", "TRADE FOR YOU": "TRADER POUR TOI", "STEP 1": "ÉTAPE 1", "STEP 2": "ÉTAPE 2", "STEP 3": "ÉTAPE 3", "STEP 4": "ÉTAPE 4", "STEP 5": "ÉTAPE 5", "LINK YOUR BROKER": "RELIE TON BROKER", "PICK A STRATEGY": "CHOISIS UNE STRATÉGIE", "BACKTEST IT": "BACKTESTE-LA", "APPROVE IT": "VALIDE-LA", "THEN IT RUNS": "ET ÇA TOURNE", "24/7": "24H/24", "✅ Take profit hit · +2R": "✅ Take profit touché · +2R", "Gold RSI Scalper closed XAU/USD": "Gold RSI Scalper a clôturé XAU/USD"},
};
