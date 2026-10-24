// Persona reel: Small budgets / students: free demo, learn with backtests, never 'get rich'. Voice: Gacrux. See .claude/skills/cubrik-reels/references/audiences.md
import { hookTV, hookNotifs, hookChat, hookSafe, hookCode, hookVs, hookLoss, hookFeed, brokerGrid, connect, describe, backtest, analytics, library, broker, guardrails, confirm, live, endCard } from "../lib/scenes.mjs";
import { LANG, BLOGO } from "../lib/core.mjs";

export default {
  id: "smallbudget",
  voice: "Gacrux",
  vo: {
    en: [
      "Someone told you trading was only for rich people?",
      "Connect cubrik to Claude. The demo plan is free.",
      "Pick a shared strategy, with its backtest.",
      "See how it would have behaved.",
      "Test it on a demo account, without a single euro.",
      "And the day you go live, your limits are already set.",
      "You learn with every trade.",
      "Comment DEMO, and I'll send you the setup."
    ],
    fr: [
      "On t'a dit que le trading, c'était pour les riches ?",
      "Tu connectes cubrik à Claude. Le plan démo est gratuit.",
      "Prends une stratégie partagée, avec son backtest.",
      "Regarde comment elle se serait comportée.",
      "Teste-la sur un compte démo, sans dépenser d'argent.",
      "Et le jour où tu passes en réel, tes limites sont déjà posées.",
      "Tu apprends à chaque trade.",
      "Commente DÉMO, et je t'envoie le setup."
    ],
  },
  trans: [null, "zoom", "whipL", "stripes", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    hookChat(1, { l1: "ONLY FOR THE RICH?", l2: "NOT ANYMORE", ask: "can I start without money?", lines: ["✓ Demo plan · free, no card", "✓ 12-month backtests", "✓ Go live only when you're ready"] }),
    connect(2, { l1: "DEMO PLAN", l2: "FREE" }),
    library(3),
    backtest(4, { l1: "SEE HOW", l2: "IT WOULD HAVE DONE" }),
    confirm(5, { l1: "ZERO EUROS", l2: "ON DEMO", title: "Start on a demo account?", line1: "Demo account · no real money", line2: "Recommended: 14 days and 20 trades first" }),
    guardrails(6, { l1: "YOUR LIMITS", l2: "ALREADY SET" }),
    analytics(7, { l1: "YOU LEARN", l2: "EVERY TRADE" }),
    endCard(8, { word: LANG === "fr" ? "DÉMO" : "DEMO" }),
  ],
  coverCss: `#cv .hcStage{top:30px;transform:scale(.8);transform-origin:50% 0}#cv .hero{top:690px;gap:14px}#cv .hl1,#cv .hl2,#cv .uBubble,#cv .reply,#cv .hcL{opacity:1}#cv .ch{display:inline!important}#cv .cursor{display:none}`,
  fr: {"ONLY FOR THE RICH?": "C'EST POUR LES RICHES ?", "NOT ANYMORE": "FAUX", "can I start without money?": "je peux commencer sans argent ?", "✓ Demo plan · free, no card": "✓ Plan démo · gratuit, sans carte", "✓ 12-month backtests": "✓ Backtests sur 12 mois", "✓ Go live only when you're ready": "✓ Réel seulement quand tu es prêt", "DEMO PLAN": "PLAN DÉMO", "FREE": "GRATUIT", "SEE HOW": "REGARDE COMMENT", "IT WOULD HAVE DONE": "ELLE AURAIT MARCHÉ", "ZERO EUROS": "ZÉRO EURO", "ON DEMO": "EN DÉMO", "YOUR LIMITS": "TES LIMITES", "ALREADY SET": "DÉJÀ POSÉES", "YOU LEARN": "TU APPRENDS", "EVERY TRADE": "À CHAQUE TRADE", "Start on a demo account?": "Démarrer sur un compte démo ?", "Demo account · no real money": "Compte démo · zéro argent réel", "Recommended: 14 days and 20 trades first": "Conseillé : 14 jours et 20 trades d'abord", "START ON": "COMMENCE SUR", "A FREE DEMO": "UNE DÉMO GRATUITE", "NOTHING GOES LIVE": "RIEN NE PASSE EN LIVE", "WITHOUT YOUR OK": "SANS TON ACCORD"},
};
