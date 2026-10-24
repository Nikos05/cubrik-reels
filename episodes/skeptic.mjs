// Persona reel: AI skeptics: AI doesn't remove risk, it removes your errors. Voice: Algenib. See .claude/skills/cubrik-reels/references/audiences.md
import { hookTV, hookNotifs, hookChat, hookSafe, hookCode, hookVs, hookLoss, hookFeed, brokerGrid, connect, describe, backtest, analytics, library, broker, guardrails, confirm, live, endCard } from "../lib/scenes.mjs";
import { LANG } from "../lib/core.mjs";

export default {
  id: "skeptic",
  voice: "Algenib",
  vo: {
    en: [
      "An AI that trades for me? I didn't believe it either.",
      "Then I got it: AI doesn't remove risk. It removes my mistakes.",
      "I give it my rules.",
      "I test them on years of data.",
      "I start on a free demo account.",
      "And it explains every decision.",
      "Now it applies the plan. Not my emotions.",
      "Comment PROOF, and I'll send you the setup."
    ],
    fr: [
      "Une IA qui trade à ma place ? Je n'y croyais pas non plus.",
      "Puis j'ai compris : l'IA ne supprime pas le risque. Elle supprime mes erreurs.",
      "Je lui donne mes règles.",
      "Je les teste sur des années de données.",
      "Je commence sur un compte démo, gratuit.",
      "Et il m'explique chaque décision.",
      "Maintenant, c'est lui qui applique le plan. Pas mes émotions.",
      "Commente PREUVE, et je t'envoie le setup."
    ],
  },
  trans: [null, "zoom", "whipL", "stripes", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    hookVs(1, { l1: "AN AI THAT TRADES?", l2: "I DIDN'T BELIEVE IT", rows: [["Widens the stop", "Stop never moves"], ["Doubles size after a loss", "Same size every trade"], ["Trades at 11 pm, bored", "Trades only its rules"], ["Forgets the plan", "Logs every reason"]] }),
    connect(2, { l1: "NOT THE RISK", l2: "YOUR MISTAKES" }),
    describe(3, { name: "GOLD LONDON SWEEP", l1: "MY RULES", l2: "IN PLAIN WORDS", msg: "gold 1h, London only: buy the sweep of the last low on reclaim, stop under the swing, 2R, 1% risk", rules: [["MARKET", "XAU/USD · 1 hour"], ["ENTRY", "London sweep of the last low, then reclaim"], ["EXIT", "Stop under the swing · target 2R"], ["RISK", "1% per trade"]] }),
    backtest(4, { l1: "BACKTESTED", l2: "ON YEARS OF DATA" }),
    confirm(5, { l1: "START ON", l2: "A FREE DEMO", title: "Start on a demo account?", line1: "Demo account · no real money", line2: "Recommended: 14 days and 20 trades first" }),
    analytics(6, { l1: "IT EXPLAINS", l2: "EVERY DECISION" }),
    live(7, { l1: "THE PLAN DECIDES", l2: "NOT EMOTIONS", title: "Gold London sweep", main: "🛡 Trade skipped · conditions not met", nsub: "Waiting for the London sweep", pnl: "✓ PLAN", notif: 1.6 }),
    endCard(8, { word: LANG === "fr" ? "PREUVE" : "PROOF" }),
  ],
  coverCss: `#cv .vsWrap{top:-30px;transform:scale(.82);transform-origin:50% 0}#cv .hero{top:690px;gap:14px}#cv .hl1,#cv .hl2,#cv .vsC,#cv .vsMid{opacity:1}#cv .mHN{display:none}`,
  fr: {"AN AI THAT TRADES?": "UNE IA QUI TRADE ?", "I DIDN'T BELIEVE IT": "J'Y CROYAIS PAS", "Widens the stop": "Élargit le stop", "Stop never moves": "Stop qui ne bouge jamais", "Doubles size after a loss": "Double la taille après une perte", "Same size every trade": "Même taille à chaque trade", "Trades at 11 pm, bored": "Trade à 23 h par ennui", "Trades only its rules": "Ne trade que ses règles", "Forgets the plan": "Oublie le plan", "Logs every reason": "Note chaque raison", "NOT THE RISK": "PAS LE RISQUE", "YOUR MISTAKES": "TES ERREURS", "MY RULES": "MES RÈGLES", "IN PLAIN WORDS": "AVEC MES MOTS", "gold 1h, London only: buy the sweep of the last low on reclaim, stop under the swing, 2R, 1% risk": "or 1h, Londres seulement : achète le sweep du dernier plus bas à la reprise, stop sous le swing, 2R, 1 % de risque", "BACKTESTED": "BACKTESTÉE", "ON YEARS OF DATA": "SUR DES ANNÉES DE DONNÉES", "IT EXPLAINS": "IL EXPLIQUE", "EVERY DECISION": "CHAQUE DÉCISION", "THE PLAN DECIDES": "LE PLAN DÉCIDE", "NOT EMOTIONS": "PAS LES ÉMOTIONS", "🛡 Trade skipped · conditions not met": "🛡 Trade évité · conditions non remplies", "Waiting for the London sweep": "En attente du sweep de Londres", "✓ PLAN": "✓ PLAN", "Start on a demo account?": "Démarrer sur un compte démo ?", "Demo account · no real money": "Compte démo · zéro argent réel", "Recommended: 14 days and 20 trades first": "Conseillé : 14 jours et 20 trades d'abord", "START ON": "COMMENCE SUR", "A FREE DEMO": "UNE DÉMO GRATUITE", "NOTHING GOES LIVE": "RIEN NE PASSE EN LIVE", "WITHOUT YOUR OK": "SANS TON ACCORD", "London sweep of the last low, then reclaim": "Sweep du dernier plus bas à Londres, puis reprise", "Stop under the swing · target 2R": "Stop sous le swing · objectif 2R"},
};
