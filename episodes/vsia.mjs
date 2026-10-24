// Series: manual trading vs AI trading (discipline and time, never returns).
import { hookVs, connect, skills, backtest, guardrails, confirm, live, endCard } from "../lib/scenes.mjs";
import { LANG } from "../lib/core.mjs";

export default {
  id: "vsia",
  vo: {
    en: [
      "Manual trading or AI trading? Here's the real difference.",
      "With cubrik connected to Claude, you switch to AI mode.",
      "You pick your strategy.",
      "You test it on years of data before risking a dollar.",
      "The agent applies your rules on every trade. No emotions.",
      "Nothing goes live without your OK.",
      "And it watches the market day and night, even while you sleep.",
      "Comment AI, and I'll send you the setup.",
    ],
    fr: [
      "Trading à la main ou trading avec une IA ? Voilà la vraie différence.",
      "Tu connectes cubrik à Claude, et tu passes en mode IA.",
      "Tu choisis ta stratégie.",
      "Tu la testes sur des années de données avant de risquer un euro.",
      "L'agent applique tes règles à chaque trade. Sans émotion.",
      "Rien ne passe en live sans ton accord.",
      "Et il surveille le marché jour et nuit, même quand tu dors.",
      "Commente IA, et je t'envoie le setup.",
    ],
  },
  trans: [null, "zoom", "stripes", "whipL", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    hookVs(1, { l1: "MANUAL TRADING", l2: "VS AI TRADING" }),
    connect(2, { l1: "SWITCH TO", l2: "AI MODE" }),
    skills(3, { l1: "PICK YOUR", l2: "STRATEGY", pick: 2 }),
    backtest(4, { l1: "BACKTESTED", l2: "BEFORE ANY RISK" }),
    guardrails(5, { l1: "YOUR RULES", l2: "ON EVERY TRADE" }),
    confirm(6, { l1: "NOTHING GOES LIVE", l2: "WITHOUT YOUR OK" }),
    live(7, { l1: "WATCHES THE MARKET", l2: "DAY AND NIGHT", main: "✅ Take profit hit · +2R", nsub: "Gold RSI Scalper closed XAU/USD", pnl: "+2R", notif: 1.8 }),
    endCard(8, { word: LANG === "fr" ? "IA" : "AI" }),
  ],
  coverCss: `#cv .vsWrap{top:-30px;transform:scale(.82);transform-origin:50% 0}#cv .hero{top:690px;gap:14px}#cv .hl1,#cv .hl2,#cv .vsC,#cv .vsMid{opacity:1}#cv .mHN{display:none}`,
  fr: {
    "MANUAL TRADING": "TRADING MANUEL", "VS AI TRADING": "VS TRADING IA", "MANUAL": "MANUEL", "AI · cubrik": "IA · cubrik",
    "8h in front of charts": "8 h devant les graphiques", "Watches 24/7": "Surveille 24h/24",
    "Emotions decide": "Les émotions décident", "Rules decide": "Les règles décident",
    "Missed setups": "Setups ratés", "Never misses an alert": "Aucune alerte ratée",
    "Stop moved \"just once\"": "Stop déplacé « juste une fois »", "Stop always on": "Stop toujours actif",
    "SWITCH TO": "PASSE EN", "AI MODE": "MODE IA", "PICK YOUR": "CHOISIS TA", "STRATEGY": "STRATÉGIE",
    "BACKTESTED": "BACKTESTÉE", "BEFORE ANY RISK": "AVANT TOUT RISQUE",
    "WATCHES THE MARKET": "SURVEILLE LE MARCHÉ", "DAY AND NIGHT": "JOUR ET NUIT",
    "✅ Take profit hit · +2R": "✅ Take profit touché · +2R", "Gold RSI Scalper closed XAU/USD": "Gold RSI Scalper a clôturé XAU/USD",
  },
};
