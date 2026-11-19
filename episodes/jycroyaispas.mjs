// TikTok FR (Paulito) — reprise du hook « Une IA qui trade, j'y croyais pas », CTA lien en bio.
import { hookChat, connect, describe, backtest, confirm, live, guardrails, endCard } from "../lib/scenes.mjs";
export default {
  id: "jycroyaispas",
  vo: {
    en: ["An AI that trades for me? I didn't believe it.", "", "", "", "", "", "", ""],
    fr: [
      "Une IA qui trade à ma place ? J'y croyais pas.",
      "Alors j'ai testé. J'ai connecté cubrik à Claude.",
      "Je lui ai donné mes propres règles.",
      "Il les a testées sur cinq ans de données.",
      "J'ai commencé sur un compte démo, gratuit.",
      "Il suit le plan à la lettre. Zéro émotion.",
      "Et il m'explique chaque trade qu'il prend.",
      "Le lien est dans ma bio. Teste-le gratuitement."
    ],
  },
  trans: [null, "zoom", "stripes", "whipL", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    hookChat(1, { l1: "AN AI THAT TRADES?", l2: "I DIDN'T BELIEVE IT", ask: "trade my strategy for me, I don't believe you" }),
    connect(2, { l1: "SO I TESTED IT", l2: "CUBRIK + CLAUDE" }),
    describe(3, { l1: "MY OWN", l2: "RULES", name: "EUR/USD LONDON FADE", msg: "sell EUR/USD when London spikes above the Asia high and closes back inside, 1% risk", rules: [["MARKET", "EUR/USD · 15 min"], ["ENTRY", "Fake break of the Asia high"], ["EXIT", "Stop above the wick · 2R"], ["RISK", "1% per trade"]] }),
    backtest(4, { l1: "TESTED ON", l2: "5 YEARS OF DATA" }),
    confirm(5, { l1: "STARTED ON", l2: "A FREE DEMO", title: "Launch on demo?", line1: "Demo account · free · 1% risk per trade" }),
    guardrails(6, { l1: "THE PLAN", l2: "ZERO EMOTION" }),
    live(7, { l1: "IT EXPLAINS", l2: "EVERY TRADE", title: "EUR/USD London Fade", foot: "EUR/USD", main: "✅ Take profit hit · +2R", nsub: "Fake break of the Asia high · rule met", pnl: "+2R", notif: 1.6 }),
    endCard(8, { bio: true }),
  ],
  coverCss: "",
  fr: { "AN AI THAT TRADES?": "UNE IA QUI TRADE ?", "I DIDN'T BELIEVE IT": "J'Y CROYAIS PAS", "trade my strategy for me, I don't believe you": "trade ma stratégie à ma place, j'y crois pas", "SO I TESTED IT": "ALORS J'AI TESTÉ", "CUBRIK + CLAUDE": "CUBRIK + CLAUDE", "MY OWN": "MES PROPRES", "RULES": "RÈGLES", "sell EUR/USD when London spikes above the Asia high and closes back inside, 1% risk": "vends EUR/USD quand Londres dépasse le plus haut asiatique puis réintègre, 1 % de risque", "Fake break of the Asia high": "Fausse cassure du plus haut asiatique", "Stop above the wick · 2R": "Stop au-dessus de la mèche · 2R", "TESTED ON": "TESTÉ SUR", "5 YEARS OF DATA": "5 ANS DE DONNÉES", "STARTED ON": "COMMENCÉ SUR", "A FREE DEMO": "UNE DÉMO GRATUITE", "THE PLAN": "LE PLAN", "ZERO EMOTION": "ZÉRO ÉMOTION", "Launch on demo?": "Lancer en démo ?", "Demo account · free · 1% risk per trade": "Compte démo · gratuit · 1 % de risque par trade", "IT EXPLAINS": "IL EXPLIQUE", "EVERY TRADE": "CHAQUE TRADE", "Fake break of the Asia high · rule met": "Fausse cassure du plus haut asiatique · règle validée" },
};
