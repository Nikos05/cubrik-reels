// Price anchor: what Wall Street pays for a pro market terminal (~$30k a year per seat) vs cubrik in Claude.
// No competitor name or logo on screen; the comparison is the category, not a product.
import { hookPrice, connect, describe, backtest, analytics, chartTrade, confirm, endCard } from "../lib/scenes.mjs";

export default {
  id: "terminal",
  vo: {
    en: [
      "Wall Street pays thirty thousand dollars a year for this.",
      "I just connected cubrik to Claude.",
      "Scan gold for me. News, calendar, indicators, in seconds.",
      "Backtest this idea on five years of data.",
      "It even shows me which session loses money.",
      "Then an agent trades it. Stop loss and take profit, set automatically.",
      "Nothing goes live without your OK. Demo account first.",
      "Comment terminal, and I'll send you the setup.",
    ],
    fr: ["Wall Street paie trente mille dollars par an pour ça.", "Je viens de connecter cubrik à Claude.", "Scanne l'or pour moi. News, calendrier, indicateurs, en quelques secondes.", "Je fais un backtest de cette idée sur cinq années de données.", "Il me montre même quelle session me fait perdre de l'argent.", "Ensuite, un agent exécute la stratégie. Stop loss et take profit, placés automatiquement.", "Rien ne passe en live sans ton accord. Et on commence toujours en démo.", "Commente terminal, et je t'envoie le setup."],
  },
  trans: [null, "zoom", "whipL", "stripes", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    hookPrice(1, { l1: "WALL STREET PAYS", l2: "$30K A YEAR" }),
    connect(2),
    describe(3, {
      l1: "SCAN GOLD", l2: "IN SECONDS",
      msg: "scan gold for me",
      rules: [["NEWS", "No big gold headline · last 12h"], ["EVENTS", "Fed rate decision · Wednesday"], ["SIGNALS", "RSI 52 · ADX 38 · bands squeezed"], ["READ", "1h compression · watch the breakout"]],
      barT: "Market read in 4 s", barS: "PRICES · NEWS · CALENDAR · INDICATORS", barBtn: "Alert",
    }),
    backtest(4, { l1: "BACKTESTED", l2: "ON 5 YEARS", stats: [["WIN RATE", "54%"], ["PROFIT FACTOR", "1.4"], ["NET PROFIT", "+22.6%", "pos"]] }),
    analytics(5, { l1: "WHICH SESSION", l2: "LOSES MONEY" }),
    chartTrade(6, { phase: "order", l1: "SL + TP SET", l2: "AUTOMATICALLY", pair: "XAU/USD", tf: "1H", broker: "METATRADER 5", entry: "4,172", sl: "4,151", tp: "4,214" }),
    confirm(7, { l1: "NOTHING GOES LIVE", l2: "WITHOUT YOUR OK", title: "Launch on MetaTrader?", line1: "Demo account · 1% risk per trade" }),
    endCard(8, { word: "TERMINAL" }),
  ],
  cssFr: `.hpNow{gap:16px}.hpNowT{font-size:30px;white-space:nowrap}`,
  coverCss: `#cv .hpWrap{top:40px;transform:scale(.8);transform-origin:50% 0}#cv .hero{top:720px;gap:14px}#cv .hl1,#cv .hl2,#cv .hpF,#cv .hpNow{opacity:1}#cv .hpNum{font-size:0}#cv .hpNum::after{content:"${process.env.REEL_LANG === "fr" ? "30 000 $" : "$30,000"}";font-size:150px}#cv .hpStrike{transform:rotate(-4deg)}#cv .hpPrice{opacity:.5}`,
  fr: {"WALL STREET PAYS": "WALL STREET PAIE", "$30K A YEAR": "30 000 $ PAR AN", "Pro market terminal": "Terminal de marché pro", "PER SEAT · PER YEAR": "PAR POSTE · PAR AN", "Market data": "Données de marché", "Analytics": "Analyses", "/ year": "/ an", "Now inside Claude": "Maintenant dans Claude", "DEMO ACCOUNT · FREE": "COMPTE DÉMO · GRATUIT", "SCAN GOLD": "SCANNE L'OR", "IN SECONDS": "EN QUELQUES SECONDES", "scan gold for me": "scanne l'or pour moi", "EVENTS": "AGENDA", "SIGNALS": "SIGNAUX", "READ": "LECTURE", "No big gold headline · last 12h": "Pas de grosse news sur l'or · 12 h", "Fed rate decision · Wednesday": "Décision de taux de la Fed · mercredi", "RSI 52 · ADX 38 · bands squeezed": "RSI 52 · ADX 38 · bandes resserrées", "1h compression · watch the breakout": "Compression en 1h · guette la cassure", "Market read in 4 s": "Marché lu en 4 s", "PRICES · NEWS · CALENDAR · INDICATORS": "PRIX · NEWS · CALENDRIER · INDICATEURS", "Alert": "Alerte", "BACKTESTED": "BACKTESTÉE", "ON 5 YEARS": "SUR 5 ANS", "54%": "54 %", "+22.6%": "+22,6 %", "1.4": "1,4", "WHICH SESSION": "QUELLE SESSION", "LOSES MONEY": "PERD DE L'ARGENT", "SL + TP SET": "SL + TP PLACÉS", "AUTOMATICALLY": "AUTOMATIQUEMENT", "MY ZONE": "MA ZONE", "SET AUTOMATICALLY": "PLACÉS AUTO", "ORDER PLACED BY AI": "ORDRE PLACÉ PAR L'IA", "Demo account · 1% risk per trade": "Compte démo · 1 % de risque par trade", "&amp; I'll send you the setup": "&amp; je t'envoie le setup"},
};
