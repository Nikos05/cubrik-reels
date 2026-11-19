// TikTok FR (Paulito) — reprise du hook « Tu gagnes déjà ? Lâche l'écran », CTA lien en bio.
import vsia from "./vsia.mjs";
import { hookVs, connect, describe, backtest, broker, guardrails, live, endCard } from "../lib/scenes.mjs";
export default {
  id: "lacheecran",
  vo: {
    en: ["Already profitable? Then get off the screen.", "", "", "", "", "", "", ""],
    fr: [
      "Tu gagnes déjà en trading ? Alors lâche l'écran.",
      "Tu connectes cubrik à Claude.",
      "Donne-lui ta stratégie, exactement comme tu la trades.",
      "Il la teste sur des années de données.",
      "Il la fait tourner sur tous tes comptes, sans fatigue.",
      "Tes règles de risque, appliquées à chaque trade.",
      "Toi, tu récupères ton temps.",
      "Le lien est dans ma bio. Teste-le gratuitement."
    ],
  },
  trans: [null, "zoom", "stripes", "whipL", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    hookVs(1, { l1: "ALREADY PROFITABLE?", l2: "GET OFF THE SCREEN" }),
    connect(2, { l1: "CONNECT CUBRIK", l2: "TO CLAUDE" }),
    describe(3, { l1: "YOUR STRATEGY", l2: "EXACTLY AS IS", name: "NAS100 OPEN DRIVE", msg: "buy NAS100 when the first 15 min candle breaks up at the open, stop under it, 2R", rules: [["MARKET", "NAS100 · 5 min"], ["ENTRY", "Break of the first 15 min candle"], ["EXIT", "Stop under the candle · 2R"], ["RISK", "0.5% per trade"]] }),
    backtest(4, { l1: "TESTED ON", l2: "YEARS OF DATA" }),
    broker(5, { l1: "ALL YOUR ACCOUNTS", l2: "NO FATIGUE", msg: "run it on all my accounts" }),
    guardrails(6, { l1: "YOUR RISK RULES", l2: "ON EVERY TRADE" }),
    live(7, { l1: "YOU GET", l2: "YOUR TIME BACK", title: "NAS100 Open Drive", sub: "RUNS 24/7 ON ALL YOUR ACCOUNTS", foot: "NAS100", main: "✅ Take profit hit · +2R", nsub: "NAS100 Open Drive closed NAS100", pnl: "+2R", notif: 1.6 }),
    endCard(8, { bio: true }),
  ],
  coverCss: "",
  fr: { ...vsia.fr, "RUNS 24/7 ON ALL YOUR ACCOUNTS": "TOURNE 24H/24 SUR TOUS TES COMPTES", "ALREADY PROFITABLE?": "TU GAGNES DÉJÀ ?", "GET OFF THE SCREEN": "LÂCHE L'ÉCRAN", "YOUR STRATEGY": "TA STRATÉGIE", "EXACTLY AS IS": "TELLE QUELLE", "buy NAS100 when the first 15 min candle breaks up at the open, stop under it, 2R": "achète le NAS100 quand la première bougie de 15 min casse à la hausse à l'ouverture, stop dessous, 2R", "NAS100 · 5 min": "NAS100 · 5 min", "Break of the first 15 min candle": "Cassure de la 1re bougie de 15 min", "Stop under the candle · 2R": "Stop sous la bougie · 2R", "0.5% per trade": "0,5 % par trade", "TESTED ON": "TESTÉE SUR", "YEARS OF DATA": "DES ANNÉES DE DONNÉES", "ALL YOUR ACCOUNTS": "TOUS TES COMPTES", "NO FATIGUE": "SANS FATIGUE", "run it on all my accounts": "fais-la tourner sur tous mes comptes", "YOUR RISK RULES": "TES RÈGLES DE RISQUE", "ON EVERY TRADE": "SUR CHAQUE TRADE", "YOU GET": "TOI, TU RÉCUPÈRES", "YOUR TIME BACK": "TON TEMPS", "NAS100 Open Drive closed NAS100": "NAS100 Open Drive a clôturé NAS100" },
};
