// TikTok FR (Paulito) — reprise du hook n°1 « Claude vient de tuer les day traders », CTA lien en bio.
import { hookDesk, connect, describe, backtest, guardrails, confirm, live, endCard } from "../lib/scenes.mjs";
export default {
  id: "tuedt",
  vo: {
    en: ["Claude just killed day traders.", "", "", "", "", "", "", ""],
    fr: [
      "Claude vient de tuer les day traders.",
      "Tu connectes cubrik à Claude.",
      "Tu écris ta stratégie en une phrase. Il crée ton agent.",
      "Il la teste sur des années de données avant de risquer un euro.",
      "Stop loss sur chaque trade. Perte max par jour.",
      "Rien ne passe en live sans ton accord.",
      "Et ton agent trade à ta place, vingt-quatre heures sur vingt-quatre.",
      "Le lien est dans ma bio. Teste-le gratuitement."
    ],
  },
  trans: [null, "zoom", "whipL", "stripes", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    hookDesk(1, { l1: "CLAUDE JUST KILLED", l2: "DAY TRADERS", strike: true }),
    connect(2, { l1: "CONNECT CUBRIK", l2: "TO CLAUDE" }),
    describe(3, { l1: "ONE SENTENCE", l2: "ONE AGENT", name: "GOLD NY BREAKOUT", msg: "buy gold when New York breaks the morning high, 1% risk, 2R target", rules: [["MARKET", "XAU/USD · 15 min"], ["ENTRY", "Break of the morning high"], ["EXIT", "Stop under the range · 2R"], ["RISK", "1% per trade"]] }),
    backtest(4, { l1: "BACKTESTED", l2: "BEFORE ANY RISK" }),
    guardrails(5, { l1: "YOUR RULES", l2: "ON EVERY TRADE" }),
    confirm(6, { l1: "NOTHING GOES LIVE", l2: "WITHOUT YOUR OK" }),
    live(7, { l1: "TRADES 24/7", l2: "IN YOUR PLACE", title: "Gold NY Breakout", foot: "XAU/USD · GOLD", main: "✅ Take profit hit · +2R", nsub: "Gold NY Breakout closed XAU/USD", pnl: "+2R", notif: 1.6 }),
    endCard(8, { bio: true }),
  ],
  coverCss: "",
  fr: { "ONE SENTENCE": "UNE PHRASE", "ONE AGENT": "UN AGENT", "buy gold when New York breaks the morning high, 1% risk, 2R target": "achète l'or quand New York casse le plus haut du matin, 1 % de risque, objectif 2R", "Break of the morning high": "Cassure du plus haut du matin", "Stop under the range · 2R": "Stop sous le range · 2R", "BACKTESTED": "BACKTESTÉ", "BEFORE ANY RISK": "AVANT TOUT RISQUE", "YOUR RULES": "TES RÈGLES", "ON EVERY TRADE": "SUR CHAQUE TRADE", "TRADES 24/7": "TRADE 24H/24", "IN YOUR PLACE": "À TA PLACE", "Gold NY Breakout closed XAU/USD": "Gold NY Breakout a clôturé XAU/USD", "XAU/USD · 15 min": "XAU/USD · 15 min" },
};
