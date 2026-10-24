// Persona reel: Cautious / 50+: funds stay at the broker, three safeguards, demo first. Voice: Algenib. See .claude/skills/cubrik-reels/references/audiences.md
import { hookTV, hookNotifs, hookChat, hookSafe, hookCode, hookVs, hookLoss, hookFeed, brokerGrid, connect, describe, backtest, analytics, library, broker, guardrails, confirm, live, endCard } from "../lib/scenes.mjs";
import { LANG } from "../lib/core.mjs";

export default {
  id: "safety",
  voice: "Algenib",
  vo: {
    en: [
      "Hand my money to an AI? No. And that's exactly not how it works.",
      "cubrik connects to Claude and to your broker, with trading-only access.",
      "No withdrawals possible. You revoke access in one tap.",
      "Three independent safeguards, even if the AI stops.",
      "You test on past prices first.",
      "Then on a free demo account.",
      "And your stops stay at your broker, even if cubrik is offline.",
      "Comment SAFE, and I'll send you the setup."
    ],
    fr: [
      "Confier mon argent à une IA ? Non. Et justement, ça ne marche pas comme ça.",
      "Connecte cubrik à Claude.",
      "Aucun retrait possible. Tu révoques l'accès en un tap.",
      "Trois sécurités indépendantes, même si l'IA s'arrête.",
      "Tu testes d'abord sur le passé.",
      "Puis sur un compte démo, gratuit.",
      "Et tes stops restent chez ton broker, même si cubrik est hors ligne.",
      "Commente SÉCURITÉ, et je t'envoie le setup."
    ],
  },
  trans: [null, "zoom", "whipL", "stripes", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    hookSafe(1, { l1: "YOUR MONEY", l2: "NEVER MOVES" }),
    connect(2, { l1: "TRADING-ONLY", l2: "ACCESS" }),
    broker(3, { l1: "NO WITHDRAWALS", l2: "REVOKE IN ONE TAP" }),
    guardrails(4, { l1: "3 SAFEGUARDS", l2: "INDEPENDENT", title: "3 safeguards", rows: [["Max daily loss per agent", "−3%"], ["Hourly risk alert", "−5%"], ["Stops at the broker", "ALWAYS"]], foot: "NONE DEPENDS ON THE AI OR ON CREDITS" }),
    backtest(5, { l1: "TESTED", l2: "ON PAST PRICES" }),
    confirm(6, { l1: "START ON", l2: "A FREE DEMO", title: "Start on a demo account?", line1: "Demo account · no real money", line2: "Recommended: 14 days and 20 trades first" }),
    live(7, { l1: "STOPS AT THE BROKER", l2: "EVEN OFFLINE", main: "🛡 Stop placed at the broker · XAU/USD", nsub: "Holds even if cubrik is offline", title: "Gold London sweep", pnl: "SL ✓", notif: 1.6 }),
    endCard(8, { word: LANG === "fr" ? "SÉCURITÉ" : "SAFE" }),
  ],
  coverCss: `#cv .sfWrap{top:0;transform:scale(.82);transform-origin:50% 0}#cv .hero{top:690px;gap:14px}#cv .hl1,#cv .hl2,#cv .sfRow{opacity:1}`,
  fr: {"YOUR MONEY": "TON ARGENT", "NEVER MOVES": "NE BOUGE PAS", "TRADING-ONLY": "ACCÈS TRADING", "ACCESS": "SEULEMENT", "NO WITHDRAWALS": "AUCUN RETRAIT", "REVOKE IN ONE TAP": "RÉVOCABLE EN UN TAP", "3 SAFEGUARDS": "3 SÉCURITÉS", "INDEPENDENT": "INDÉPENDANTES", "3 safeguards": "3 sécurités", "Max daily loss per agent": "Perte max par jour, par agent", "Hourly risk alert": "Alerte de risque toutes les heures", "Stops at the broker": "Stops chez le broker", "ALWAYS": "TOUJOURS", "NONE DEPENDS ON THE AI OR ON CREDITS": "AUCUNE NE DÉPEND DE L'IA NI DES CRÉDITS", "TESTED": "TESTÉE", "ON PAST PRICES": "SUR LE PASSÉ", "STOPS AT THE BROKER": "STOPS CHEZ LE BROKER", "EVEN OFFLINE": "MÊME HORS LIGNE", "🛡 Stop placed at the broker · XAU/USD": "🛡 Stop posé chez le broker · XAU/USD", "Holds even if cubrik is offline": "Tient même si cubrik est hors ligne", "SL ✓": "SL ✓", "Start on a demo account?": "Démarrer sur un compte démo ?", "Demo account · no real money": "Compte démo · zéro argent réel", "Recommended: 14 days and 20 trades first": "Conseillé : 14 jours et 20 trades d'abord", "START ON": "COMMENCE SUR", "A FREE DEMO": "UNE DÉMO GRATUITE", "NOTHING GOES LIVE": "RIEN NE PASSE EN LIVE", "WITHOUT YOUR OK": "SANS TON ACCORD"},
};
