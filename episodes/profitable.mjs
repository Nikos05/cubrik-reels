// Persona reel: Already profitable traders: same strategy, without the screen. Voice: Algenib. See .claude/skills/cubrik-reels/references/audiences.md
import { hookTV, hookNotifs, hookChat, hookSafe, hookCode, hookVs, hookLoss, hookFeed, brokerGrid, connect, describe, backtest, analytics, library, broker, guardrails, confirm, live, endCard } from "../lib/scenes.mjs";
import { LANG } from "../lib/core.mjs";

export default {
  id: "profitable",
  voice: "Algenib",
  vo: {
    en: [
      "Already profitable? Then why are you still watching every candle?",
      "Connect cubrik to Claude.",
      "Give it your strategy, exactly the way you trade it.",
      "It tests it on years of data.",
      "It runs on several accounts and several markets.",
      "And every week, it tells you what to adjust.",
      "You get your time back.",
      "Comment SCALE, and I'll send you the setup."
    ],
    fr: [
      "Tu gagnes déjà en trading ? Alors pourquoi tu regardes encore chaque bougie ?",
      "Connecte cubrik à Claude.",
      "Donne-lui ta stratégie, exactement comme tu la trades.",
      "Il la teste sur des années de données.",
      "Elle tourne sur plusieurs comptes et plusieurs marchés.",
      "Et chaque semaine, il te dit quoi ajuster.",
      "Toi, tu récupères ton temps.",
      "Commente SCALE, et je t'envoie le setup."
    ],
  },
  trans: [null, "zoom", "whipL", "stripes", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    hookNotifs(1, { l1: "ALREADY PROFITABLE?", l2: "LET GO OF THE SCREEN" }),
    connect(2),
    describe(3, { name: "GOLD LONDON SWEEP", l1: "YOUR STRATEGY", l2: "EXACTLY AS YOU TRADE IT", msg: "gold 1h, London only: buy the sweep of the last low on reclaim, stop under the swing, 2R, 1% risk", rules: [["MARKET", "XAU/USD · 1 hour"], ["ENTRY", "London sweep of the last low, then reclaim"], ["EXIT", "Stop under the swing · target 2R"], ["RISK", "1% per trade"]] }),
    backtest(4, { l1: "BACKTESTED", l2: "ON YEARS OF DATA" }),
    brokerGrid(5, { l1: "SEVERAL ACCOUNTS", l2: "SEVERAL MARKETS" }),
    analytics(6, { l1: "EVERY WEEK", l2: "WHAT TO ADJUST" }),
    live(7, { l1: "YOU GET", l2: "YOUR TIME BACK", main: "✅ Take profit hit · +2R", nsub: "Gold London sweep closed XAU/USD", title: "Gold London sweep", pnl: "+2R", notif: 1.5 }),
    endCard(8, { word: "SCALE" }),
  ],
  coverCss: `#cv .hnWrap{top:20px;transform:scale(.78);transform-origin:50% 0}#cv .hero{top:700px;gap:14px}#cv .hl1,#cv .hl2,#cv .hnN,#cv .hnTime,#cv .hnDate{opacity:1}#cv .mHN{display:none}`,
  fr: {"ALREADY PROFITABLE?": "TU GAGNES DÉJÀ ?", "LET GO OF THE SCREEN": "LÂCHE L'ÉCRAN", "YOUR STRATEGY": "TA STRATÉGIE", "EXACTLY AS YOU TRADE IT": "COMME TU LA TRADES", "gold 1h, London only: buy the sweep of the last low on reclaim, stop under the swing, 2R, 1% risk": "or 1h, Londres seulement : achète le sweep du dernier plus bas à la reprise, stop sous le swing, 2R, 1 % de risque", "BACKTESTED": "BACKTESTÉE", "ON YEARS OF DATA": "SUR DES ANNÉES DE DONNÉES", "SEVERAL ACCOUNTS": "PLUSIEURS COMPTES", "SEVERAL MARKETS": "PLUSIEURS MARCHÉS", "EVERY WEEK": "CHAQUE SEMAINE", "WHAT TO ADJUST": "QUOI AJUSTER", "YOU GET": "TU RÉCUPÈRES", "YOUR TIME BACK": "TON TEMPS", "✅ Take profit hit · +2R": "✅ Take profit touché · +2R", "Gold London sweep closed XAU/USD": "Gold London sweep a clôturé XAU/USD", "London sweep of the last low, then reclaim": "Sweep du dernier plus bas à Londres, puis reprise", "Stop under the swing · target 2R": "Stop sous le swing · objectif 2R"},
};
