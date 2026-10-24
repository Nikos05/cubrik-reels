// Persona reel: Total beginners: no knowledge needed, demo first. Voice: Gacrux. See .claude/skills/cubrik-reels/references/audiences.md
import { hookTV, hookNotifs, hookChat, hookSafe, hookCode, hookVs, hookLoss, hookFeed, brokerGrid, connect, describe, backtest, analytics, library, broker, guardrails, confirm, live, endCard } from "../lib/scenes.mjs";
import { LANG, BLOGO } from "../lib/core.mjs";

export default {
  id: "beginner",
  voice: "Gacrux",
  vo: {
    en: [
      "You know nothing about trading? Perfect. You don't need to.",
      "You connect cubrik to Claude.",
      "You write what you want, in your own words. Claude asks the right questions.",
      "Or you copy a strategy that's already been tested.",
      "You see how it would have done, before risking a cent.",
      "And you start on a free demo account.",
      "It explains your results, simply.",
      "Comment START, and I'll send you the setup."
    ],
    fr: [
      "Tu ne connais rien au trading ? Parfait, tu n'en as pas besoin.",
      "Tu connectes cubrik à Claude.",
      "Tu écris ce que tu veux, avec tes mots. Claude te pose les bonnes questions.",
      "Ou tu copies une stratégie déjà testée.",
      "Tu vois comment elle aurait marché, avant de risquer un euro.",
      "Et tu commences sur un compte démo, gratuit.",
      "Il t'explique tes résultats, simplement.",
      "Commente DÉBUTANT, et je t'envoie le setup."
    ],
  },
  trans: [null, "zoom", "whipL", "stripes", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    hookChat(1, { l1: "KNOW NOTHING?", l2: "PERFECT", ask: "I know nothing about trading, help me start", lines: ["✓ No code, no jargon", "✓ Questions on what's missing", "✓ Demo account first · free"] }),
    connect(2),
    describe(3, { name: "BTC WEEKLY DCA", l1: "YOUR OWN WORDS", l2: "THAT'S ENOUGH", msg: "buy 100 € of bitcoin every Thursday morning", rules: [["MARKET", "BTC/USD · weekly"], ["ENTRY", "Every Thursday at 8 am"], ["EXIT", "No exit · long term"], ["RISK", "100 € per buy"]] }),
    library(4, { l1: "OR COPY", l2: "A TESTED STRATEGY" }),
    backtest(5, { l1: "SEE THE RESULT", l2: "BEFORE ANY RISK" }),
    confirm(6, { l1: "START ON", l2: "A FREE DEMO", title: "Start on a demo account?", line1: "Demo account · no real money", line2: "Recommended: 14 days and 20 trades first" }),
    analytics(7, { l1: "IT EXPLAINS", l2: "SIMPLY" }),
    endCard(8, { word: LANG === "fr" ? "DÉBUTANT" : "START" }),
  ],
  coverCss: `#cv .hcStage{top:30px;transform:scale(.8);transform-origin:50% 0}#cv .hero{top:690px;gap:14px}#cv .hl1,#cv .hl2,#cv .uBubble,#cv .reply,#cv .hcL{opacity:1}#cv .ch{display:inline!important}#cv .cursor{display:none}`,
  fr: {"KNOW NOTHING?": "TU N'Y CONNAIS RIEN ?", "PERFECT": "PARFAIT", "I know nothing about trading, help me start": "je n'y connais rien, aide-moi à commencer", "✓ No code, no jargon": "✓ Pas de code, pas de jargon", "✓ Questions on what's missing": "✓ Il te demande ce qui manque", "✓ Demo account first · free": "✓ Compte démo d'abord · gratuit", "YOUR OWN WORDS": "AVEC TES MOTS", "THAT'S ENOUGH": "ÇA SUFFIT", "buy 100 € of bitcoin every Thursday morning": "achète 100 € de bitcoin chaque jeudi matin", "OR COPY": "OU COPIE", "A TESTED STRATEGY": "UNE STRATÉGIE TESTÉE", "SEE THE RESULT": "VOIS LE RÉSULTAT", "BEFORE ANY RISK": "AVANT TOUT RISQUE", "IT EXPLAINS": "IL T'EXPLIQUE", "SIMPLY": "SIMPLEMENT", "BTC/USD · weekly": "BTC/USD · chaque semaine", "Every Thursday at 8 am": "Chaque jeudi à 8 h", "No exit · long term": "Pas de sortie · long terme", "100 € per buy": "100 € par achat", "Start on a demo account?": "Démarrer sur un compte démo ?", "Demo account · no real money": "Compte démo · zéro argent réel", "Recommended: 14 days and 20 trades first": "Conseillé : 14 jours et 20 trades d'abord", "START ON": "COMMENCE SUR", "A FREE DEMO": "UNE DÉMO GRATUITE", "NOTHING GOES LIVE": "RIEN NE PASSE EN LIVE", "WITHOUT YOUR OK": "SANS TON ACCORD"},
};
