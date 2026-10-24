// Persona reel: People who already lost money: AI removes human error, demo first. Voice: Gacrux. See .claude/skills/cubrik-reels/references/audiences.md
import { hookTV, hookNotifs, hookChat, hookSafe, hookCode, hookVs, hookLoss, hookFeed, brokerGrid, connect, describe, backtest, analytics, library, broker, guardrails, confirm, live, endCard } from "../lib/scenes.mjs";
import { LANG, BLOGO } from "../lib/core.mjs";

export default {
  id: "lostmoney",
  voice: "Gacrux",
  vo: {
    en: [
      "Have you ever lost money trading? Me too.",
      "So I connected cubrik to Claude.",
      "I wrote my rules once.",
      "A stop on every trade, a max loss per day. No more exceptions.",
      "Tested on years of data before risking a cent.",
      "And on a demo account first.",
      "Now my rules decide. Not my emotions.",
      "Comment RULES, and I'll send you the setup."
    ],
    fr: [
      "Tu as déjà perdu de l'argent en trading ? Moi aussi.",
      "Alors j'ai connecté cubrik à Claude.",
      "J'ai écrit mes règles une fois.",
      "Un stop sur chaque trade, une perte max par jour. Plus d'exceptions.",
      "Testé sur des années de données avant de risquer un euro.",
      "Et d'abord sur un compte démo.",
      "Maintenant, mes règles décident. Pas mes émotions.",
      "Commente RÈGLES, et je t'envoie le setup."
    ],
  },
  trans: [null, "zoom", "whipL", "stripes", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    hookLoss(1, { l1: "EVER LOST MONEY?", l2: "ME TOO" }),
    connect(2),
    describe(3, { name: "GOLD LONDON SWEEP", l1: "MY RULES", l2: "WRITTEN ONCE", msg: "gold 1h, London only: buy the sweep of the last low on reclaim, stop under the swing, 2R, 1% risk", rules: [["MARKET", "XAU/USD · 1 hour"], ["ENTRY", "London sweep of the last low, then reclaim"], ["EXIT", "Stop under the swing · target 2R"], ["RISK", "1% per trade"]] }),
    guardrails(4, { l1: "NO MORE", l2: "EXCEPTIONS" }),
    backtest(5, { l1: "BACKTESTED", l2: "BEFORE ANY RISK" }),
    confirm(6, { l1: "DEMO", l2: "FIRST", title: "Start on a demo account?", line1: "Demo account · no real money", line2: "Recommended: 14 days and 20 trades first" }),
    live(7, { l1: "MY RULES DECIDE", l2: "NOT MY EMOTIONS", title: "Gold London sweep", main: "🛡 Trade skipped · daily loss limit", nsub: "Your rule: max −3% per day", pnl: "✓ RULES", notif: 1.6 }),
    endCard(8, { word: LANG === "fr" ? "RÈGLES" : "RULES" }),
  ],
  coverCss: `#cv .lsWrap{top:-10px;transform:scale(.8);transform-origin:50% 0}#cv .hero{top:690px;gap:14px}#cv .hl1,#cv .hl2,#cv .lsRow,#cv .lsWhy{opacity:1}`,
  fr: {"EVER LOST MONEY?": "TU AS DÉJÀ PERDU ?", "ME TOO": "MOI AUSSI", "MY RULES": "MES RÈGLES", "WRITTEN ONCE": "ÉCRITES UNE FOIS", "gold 1h, London only: buy the sweep of the last low on reclaim, stop under the swing, 2R, 1% risk": "or 1h, Londres seulement : achète le sweep du dernier plus bas à la reprise, stop sous le swing, 2R, 1 % de risque", "NO MORE": "PLUS", "EXCEPTIONS": "D'EXCEPTIONS", "BACKTESTED": "BACKTESTÉE", "BEFORE ANY RISK": "AVANT TOUT RISQUE", "DEMO": "DÉMO", "FIRST": "D'ABORD", "MY RULES DECIDE": "MES RÈGLES DÉCIDENT", "NOT MY EMOTIONS": "PAS MES ÉMOTIONS", "🛡 Trade skipped · daily loss limit": "🛡 Trade évité · limite de perte du jour", "Your rule: max −3% per day": "Ta règle : max −3 % par jour", "✓ RULES": "✓ RÈGLES", "London sweep of the last low, then reclaim": "Sweep du dernier plus bas à Londres, puis reprise", "Stop under the swing · target 2R": "Stop sous le swing · objectif 2R", "Start on a demo account?": "Démarrer sur un compte démo ?", "Demo account · no real money": "Compte démo · zéro argent réel", "Recommended: 14 days and 20 trades first": "Conseillé : 14 jours et 20 trades d'abord", "START ON": "COMMENCE SUR", "A FREE DEMO": "UNE DÉMO GRATUITE", "NOTHING GOES LIVE": "RIEN NE PASSE EN LIVE", "WITHOUT YOUR OK": "SANS TON ACCORD"},
};
