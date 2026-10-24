// Persona reel: Anyone asking 'does it work with my broker?': 10 brokers. Voice: Algenib. See .claude/skills/cubrik-reels/references/audiences.md
import { hookTV, hookNotifs, hookChat, hookSafe, hookCode, hookVs, hookLoss, hookFeed, brokerGrid, connect, describe, backtest, analytics, library, broker, guardrails, confirm, live, endCard } from "../lib/scenes.mjs";
import { LANG } from "../lib/core.mjs";

export default {
  id: "brokers",
  voice: "Algenib",
  vo: {
    en: [
      "Wondering if it works with your broker? Chances are, it does.",
      "cubrik connects to Claude, and to ten brokers.",
      "Binance, MetaTrader, Interactive Brokers, and seven more.",
      "Trading-only access, no withdrawal rights.",
      "Then you describe your strategy.",
      "It backtests it.",
      "And you approve it with one tap.",
      "Comment BROKER, and I'll send you the setup."
    ],
    fr: [
      "Tu te demandes si ça marche avec ton broker ? Il y a de fortes chances.",
      "cubrik se connecte à Claude, et à dix brokers.",
      "Binance, MetaTrader, Interactive Brokers, et sept autres.",
      "Accès trading seulement, aucun droit de retrait.",
      "Ensuite, tu décris ta stratégie.",
      "Il la backteste.",
      "Et tu valides en un tap.",
      "Commente BROKER, et je t'envoie le setup."
    ],
  },
  trans: [null, "zoom", "whipL", "stripes", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    brokerGrid(1, { hero: true, l1: "YOUR BROKER?", l2: "PROBABLY COMPATIBLE" }),
    connect(2, { l1: "CLAUDE", l2: "+ 10 BROKERS" }),
    broker(3),
    hookSafe(4, { hero: false, l1: "TRADING-ONLY", l2: "NO WITHDRAWALS" }),
    describe(5, { l1: "DESCRIBE", l2: "YOUR STRATEGY" }),
    backtest(6, { l1: "BACKTESTED", l2: "BEFORE ANY RISK" }),
    confirm(7, { l1: "ONE TAP", l2: "AND IT RUNS" }),
    endCard(8, { word: "BROKER" }),
  ],
  coverCss: `#cv .bgHookWrap{top:-20px;transform:scale(.72);transform-origin:50% 0}#cv .hero{top:700px;gap:14px}#cv .hl1,#cv .hl2,#cv .bgCell{opacity:1}`,
  fr: {"YOUR BROKER?": "TON BROKER ?", "PROBABLY COMPATIBLE": "SÛREMENT COMPATIBLE", "CLAUDE": "CLAUDE", "+ 10 BROKERS": "+ 10 BROKERS", "TRADING-ONLY": "ACCÈS TRADING", "NO WITHDRAWALS": "SANS RETRAIT", "DESCRIBE": "DÉCRIS", "YOUR STRATEGY": "TA STRATÉGIE", "BACKTESTED": "BACKTESTÉE", "BEFORE ANY RISK": "AVANT TOUT RISQUE", "ONE TAP": "UN TAP", "AND IT RUNS": "ET ÇA TOURNE", "buy gold when RSI drops under 30 on the 1h, 1% risk": "achète l'or quand le RSI passe sous 30 en 1h, 1 % de risque"},
};
