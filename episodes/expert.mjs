// Persona reel: Expert traders: your edge, executed by an agent. Voice: Algenib. See .claude/skills/cubrik-reels/references/audiences.md
import { hookTV, hookNotifs, hookChat, hookSafe, hookCode, hookVs, hookLoss, hookFeed, brokerGrid, connect, describe, backtest, analytics, library, broker, guardrails, confirm, live, endCard } from "../lib/scenes.mjs";
import { LANG } from "../lib/core.mjs";

export default {
  id: "expert",
  voice: "Algenib",
  vo: {
    en: [
      "You've traded for five years, and you still spend your nights on the charts?",
      "Your edge is fine. Let an agent execute it, from Claude.",
      "You describe your strategy with your real rules.",
      "Five-year backtest, fees and slippage included.",
      "It reads your trades and shows you where the money goes.",
      "All your brokers, a scan every five minutes.",
      "And nothing goes live without your OK.",
      "Comment EXPERT, and I'll send you the setup."
    ],
    fr: [
      "Tu trades depuis cinq ans, et tu passes encore tes nuits devant les graphiques ?",
      "Ton edge est bon. Laisse un agent l'exécuter, depuis Claude.",
      "Tu décris ta stratégie avec tes vraies règles.",
      "Backtest sur cinq ans, frais et slippage inclus.",
      "Il lit tes trades et te montre où part l'argent.",
      "Tous tes brokers, un scan toutes les cinq minutes.",
      "Et rien ne passe en live sans ton accord.",
      "Commente EXPERT, et je t'envoie le setup."
    ],
  },
  trans: [null, "zoom", "whipL", "stripes", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    hookTV(1, { l1: "5 YEARS OF TRADING", l2: "STILL ON THE CHARTS?" }),
    connect(2, { l1: "YOUR EDGE", l2: "EXECUTED BY AN AGENT" }),
    describe(3, { name: "GOLD LONDON SWEEP", l1: "YOUR REAL RULES", l2: "IN PLAIN WORDS", msg: "gold 1h, London only: buy the sweep of the last low on reclaim, stop under the swing, 2R, 1% risk", rules: [["MARKET", "XAU/USD · 1 hour"], ["ENTRY", "London sweep of the last low, then reclaim"], ["EXIT", "Stop under the swing · target 2R"], ["RISK", "1% per trade"]] }),
    backtest(4, { l1: "5-YEAR BACKTEST", l2: "FEES INCLUDED", sub: "5 YEARS · FEES + SLIPPAGE" }),
    analytics(5),
    brokerGrid(6, { l1: "EVERY BROKER", l2: "SCAN EVERY 5 MIN" }),
    confirm(7, { l1: "NOTHING GOES LIVE", l2: "WITHOUT YOUR OK" }),
    endCard(8, { word: "EXPERT" }),
  ],
  coverCss: `#cv .tvWrap{top:-120px;transform:scale(.85);transform-origin:50% 0}#cv .hero{top:690px;gap:14px}#cv .hl1,#cv .hl2,#cv .tvAl,#cv .tvChart{opacity:1}#cv .mTV{display:none}`,
  fr: {"5 YEARS OF TRADING": "5 ANS DE TRADING", "STILL ON THE CHARTS?": "TOUJOURS DEVANT L'ÉCRAN ?", "YOUR EDGE": "TON EDGE", "EXECUTED BY AN AGENT": "EXÉCUTÉ PAR UN AGENT", "YOUR REAL RULES": "TES VRAIES RÈGLES", "IN PLAIN WORDS": "AVEC TES MOTS", "gold 1h, London only: buy the sweep of the last low on reclaim, stop under the swing, 2R, 1% risk": "or 1h, Londres seulement : achète le sweep du dernier plus bas à la reprise, stop sous le swing, 2R, 1 % de risque", "5-YEAR BACKTEST": "BACKTEST SUR 5 ANS", "FEES INCLUDED": "FRAIS INCLUS", "5 YEARS · FEES + SLIPPAGE": "5 ANS · FRAIS + SLIPPAGE", "EVERY BROKER": "TOUS TES BROKERS", "SCAN EVERY 5 MIN": "SCAN TOUTES LES 5 MIN", "London sweep of the last low, then reclaim": "Sweep du dernier plus bas à Londres, puis reprise", "Stop under the swing · target 2R": "Stop sous le swing · objectif 2R"},
};
