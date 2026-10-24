// US series: morning lock screen hook -> the full released flow (broker, skills, backtest, confirm, live).
import { hookNotifs, connect, broker, skills, backtest, confirm, live, endCard } from "../lib/scenes.mjs";

export default {
  id: "sleep",
  vo: {
    en: [
      "This is what my phone looks like every morning now.",
      "I connected cubrik to Claude.",
      "Linked my broker in one message.",
      "Picked a strategy straight from my Claude skills.",
      "It backtested it on TradingView data first.",
      "I approved it with one tap.",
      "Now it watches the market all night, so I don't have to.",
      "Comment AGENT, and I'll send you the setup.",
    ],
    fr: [
      "Voilà à quoi ressemble mon téléphone chaque matin maintenant.",
      "J'ai connecté cubrik à Claude.",
      "J'ai relié mon broker en un message.",
      "J'ai choisi une stratégie direct dans mes skills Claude.",
      "Il l'a d'abord backtestée sur les données TradingView.",
      "Je l'ai validée en un tap.",
      "Maintenant, il surveille le marché toute la nuit, à ma place.",
      "Commente AGENT, et je t'envoie le setup.",
    ],
  },
  trans: [null, "zoom", "whipL", "stripes", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    hookNotifs(1, { l1: "WHILE YOU SLEPT", l2: "YOUR AGENT TRADED" }),
    connect(2),
    broker(3),
    skills(4, { l1: "PICK A STRATEGY", l2: "FROM CLAUDE SKILLS" }),
    backtest(5, { l1: "TESTED FIRST", l2: "ON TRADINGVIEW DATA" }),
    confirm(6, { l1: "NOTHING GOES LIVE", l2: "WITHOUT YOUR OK" }),
    live(7, { l1: "WATCHES THE MARKET", l2: "ALL NIGHT", main: "✅ Take profit hit · +2R", nsub: "Gold RSI Scalper closed XAU/USD", pnl: "+2R", notif: 1.8 }),
    endCard(8, { word: "AGENT" }),
  ],
  coverCss: `#cv .hnWrap{top:20px;transform:scale(.78);transform-origin:50% 0}#cv .hero{top:700px;gap:14px}#cv .hl1,#cv .hl2,#cv .hnN,#cv .hnTime,#cv .hnDate{opacity:1}#cv .mHN{display:none}`,
  fr: {"WHILE YOU SLEPT": "PENDANT TA NUIT", "YOUR AGENT TRADED": "TON AGENT A TRADÉ", "PICK A STRATEGY": "CHOISIS UNE STRATÉGIE", "FROM CLAUDE SKILLS": "DANS TES SKILLS CLAUDE", "TESTED FIRST": "TESTÉE D'ABORD", "ON TRADINGVIEW DATA": "SUR LES DONNÉES TRADINGVIEW", "WATCHES THE MARKET": "SURVEILLE LE MARCHÉ", "ALL NIGHT": "TOUTE LA NUIT", "✅ Take profit hit · +2R": "✅ Take profit touché · +2R", "Gold RSI Scalper closed XAU/USD": "Gold RSI Scalper a clôturé XAU/USD"},
};
