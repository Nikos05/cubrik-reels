// TikTok FR (Paulito) — reprise du hook « Wall Street paie 30k pour ça », CTA lien en bio.
import { hookPrice, connect, feedCard, describe, backtest, confirm, live, endCard } from "../lib/scenes.mjs";
import { badge, cubeIc, ON } from "./_adcommon.mjs";
export default {
  id: "wallstfr",
  vo: {
    en: ["Wall Street pays thirty thousand dollars a year for this.", "", "", "", "", "", "", ""],
    fr: [
      "Wall Street paie trente mille dollars par an pour ça.",
      "Toi, tu connectes cubrik à Claude.",
      "Prix en direct, news, analyse avec une IA. Tu demandes, il répond.",
      "Puis tu transformes n'importe quel setup en agent.",
      "Il le backteste avant de risquer un centime.",
      "Rien ne passe en live sans ton accord.",
      "Et il trade ton plan, jour et nuit.",
      "Le lien est dans ma bio. Teste-le gratuitement."
    ],
  },
  trans: [null, "zoom", "whipL", "stripes", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    hookPrice(1, { l1: "WALL STREET PAYS", l2: "$30K A YEAR" }),
    connect(2, { l1: "YOU: CONNECT", l2: "CUBRIK TO CLAUDE" }),
    feedCard(3, { l1: "JUST", l2: "ASK THE MARKET", msg: "how does gold look before the Fed?", rows: [[badge("Au", "#B8860B"), "XAU/USD · 4,212.6", "+0.4% today", "Bullish", ON], [badge("🏛", "#1E3A8A"), "Fed decision · tomorrow 20:00", "Market expects a hold", "Event"], [cubeIc, "Setup forming", "Breakout above 4,220", "Watch"]] }),
    describe(4, { l1: "ANY SETUP", l2: "BECOMES AN AGENT", name: "GOLD FED BREAKOUT", msg: "trade that breakout for me, 1% risk", rules: [["MARKET", "XAU/USD · 15 min"], ["ENTRY", "Close above 4,220"], ["EXIT", "Stop under 4,198 · target 2R"], ["RISK", "1% per trade"]] }),
    backtest(5, { l1: "BACKTESTED", l2: "BEFORE ANY RISK" }),
    confirm(6, { l1: "NOTHING GOES LIVE", l2: "WITHOUT YOUR OK" }),
    live(7, { l1: "TRADES YOUR PLAN", l2: "DAY AND NIGHT", title: "Gold Fed Breakout", main: "✅ Take profit hit · +2R", nsub: "Gold Fed Breakout closed XAU/USD", pnl: "+2R", notif: 1.6 }),
    endCard(8, { bio: true }),
  ],
  coverCss: "",
  fr: { "WALL STREET PAYS": "WALL STREET PAIE", "$30K A YEAR": "30 000 $ PAR AN", "Pro market terminal": "Terminal de marché pro", "PER SEAT · PER YEAR": "PAR POSTE · PAR AN", "/ year": "/ an", "Market data": "Données de marché", "News": "News", "Analytics": "Analyses", "Screeners": "Screeners", "Now inside Claude": "Maintenant dans Claude", "DEMO ACCOUNT · FREE": "DÉMO GRATUITE", "YOU: CONNECT": "TOI : CONNECTE", "CUBRIK TO CLAUDE": "CUBRIK À CLAUDE", "JUST": "TU DEMANDES", "ASK THE MARKET": "IL RÉPOND", "how does gold look before the Fed?": "l'or, ça donne quoi avant la Fed ?", "+0.4% today": "+0,4 % aujourd'hui", "Bullish": "Haussier", "Fed decision · tomorrow 20:00": "Décision de la Fed · demain 20:00", "Market expects a hold": "Le marché attend un statu quo", "Event": "Événement", "Setup forming": "Setup en formation", "Breakout above 4,220": "Cassure au-dessus de 4 220", "Watch": "À suivre", "ANY SETUP": "N'IMPORTE QUEL SETUP", "BECOMES AN AGENT": "DEVIENT UN AGENT", "trade that breakout for me, 1% risk": "trade cette cassure pour moi, 1 % de risque", "Close above 4,220": "Clôture au-dessus de 4 220", "Stop under 4,198 · target 2R": "Stop sous 4 198 · objectif 2R", "BACKTESTED": "BACKTESTÉ", "BEFORE ANY RISK": "AVANT TOUT RISQUE", "TRADES YOUR PLAN": "IL TRADE TON PLAN", "DAY AND NIGHT": "JOUR ET NUIT", "Gold Fed Breakout closed XAU/USD": "Gold Fed Breakout a clôturé XAU/USD" },
};
