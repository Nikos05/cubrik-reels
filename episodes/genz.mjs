// Persona reel: 18-24: stop copying trading TikToks, backtest first. Voice: Gacrux. See .claude/skills/cubrik-reels/references/audiences.md
import { hookTV, hookNotifs, hookChat, hookSafe, hookCode, hookVs, hookLoss, hookFeed, brokerGrid, connect, describe, backtest, analytics, library, broker, guardrails, confirm, live, endCard } from "../lib/scenes.mjs";
import { LANG, BLOGO } from "../lib/core.mjs";

export default {
  id: "genz",
  voice: "Gacrux",
  vo: {
    en: [
      "Stop copying TikTok trading strategies. Test them first.",
      "Connect cubrik to Claude.",
      "Describe the strategy you saw.",
      "It backtests it on five years. You instantly see if it holds.",
      "Or compare it with thousands of strategies already tested.",
      "Then demo first.",
      "And if it holds, an agent applies it for you.",
      "Comment TEST, and I'll send you the setup."
    ],
    fr: [
      "Arrête de copier les stratégies TikTok. Teste-les d'abord.",
      "Connecte cubrik à Claude.",
      "Décris la stratégie que tu as vue.",
      "Il la backteste sur cinq ans. Tu vois tout de suite si elle tient.",
      "Ou compare-la à des milliers de stratégies déjà testées.",
      "Puis démo d'abord.",
      "Et si elle tient, un agent l'applique pour toi.",
      "Commente TEST, et je t'envoie le setup."
    ],
  },
  trans: [null, "zoom", "whipL", "stripes", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    hookFeed(1, { l1: "STOP COPYING", l2: "TEST FIRST", strike: false }),
    connect(2),
    describe(3, { l1: "THE STRATEGY", l2: "YOU SAW", msg: "test the TikTok guy's strategy: RSI under 30 on gold, 1h" }),
    backtest(4, { l1: "5 YEARS", l2: "DOES IT HOLD?" }),
    library(5, { l1: "COMPARE WITH", l2: "13,353 STRATEGIES" }),
    confirm(6, { l1: "DEMO", l2: "FIRST", title: "Start on a demo account?", line1: "Demo account · no real money", line2: "Recommended: 14 days and 20 trades first" }),
    live(7, { l1: "IF IT HOLDS", l2: "AN AGENT RUNS IT", main: "✅ Take profit hit · +2R", nsub: "Gold RSI Scalper closed XAU/USD", pnl: "+2R", notif: 1.6 }),
    endCard(8, { word: "TEST" }),
  ],
  coverCss: `#cv .feed{top:-60px;transform:scale(.8);transform-origin:50% 0}#cv .hero{top:690px;gap:14px}#cv .hl1,#cv .hl2{opacity:1}#cv .mFeed{display:none}`,
  fr: {"STOP COPYING": "ARRÊTE DE COPIER", "TEST FIRST": "TESTE D'ABORD", "THE STRATEGY": "LA STRATÉGIE", "YOU SAW": "QUE TU AS VUE", "test the TikTok guy's strategy: RSI under 30 on gold, 1h": "teste la stratégie du gars sur TikTok : RSI sous 30 sur l'or, en 1h", "5 YEARS": "5 ANS", "DOES IT HOLD?": "ELLE TIENT ?", "COMPARE WITH": "COMPARE AVEC", "13,353 STRATEGIES": "13 353 STRATÉGIES", "DEMO": "DÉMO", "FIRST": "D'ABORD", "IF IT HOLDS": "SI ELLE TIENT", "AN AGENT RUNS IT": "UN AGENT L'APPLIQUE", "✅ Take profit hit · +2R": "✅ Take profit touché · +2R", "Gold RSI Scalper closed XAU/USD": "Gold RSI Scalper a clôturé XAU/USD", "Start on a demo account?": "Démarrer sur un compte démo ?", "Demo account · no real money": "Compte démo · zéro argent réel", "Recommended: 14 days and 20 trades first": "Conseillé : 14 jours et 20 trades d'abord", "START ON": "COMMENCE SUR", "A FREE DEMO": "UNE DÉMO GRATUITE", "NOTHING GOES LIVE": "RIEN NE PASSE EN LIVE", "WITHOUT YOUR OK": "SANS TON ACCORD"},
};
