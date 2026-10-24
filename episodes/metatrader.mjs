// Persona reel: Forex / gold traders on MetaTrader: no more EAs. Voice: Algenib. See .claude/skills/cubrik-reels/references/audiences.md
import { hookTV, hookNotifs, hookChat, hookSafe, hookCode, hookVs, hookLoss, hookFeed, brokerGrid, connect, describe, backtest, analytics, library, broker, guardrails, confirm, live, endCard } from "../lib/scenes.mjs";
import { LANG } from "../lib/core.mjs";

export default {
  id: "metatrader",
  voice: "Algenib",
  vo: {
    en: [
      "Your MetaTrader EA crashed again last night?",
      "Connect cubrik to Claude.",
      "Link your MetaTrader 4 or 5 account in thirty seconds.",
      "Describe your strategy, without a single line of MQL.",
      "Backtest before the first order.",
      "Stops are placed on the broker's server.",
      "And it watches the market day and night.",
      "Comment MT5, and I'll send you the setup."
    ],
    fr: [
      "Ton EA MetaTrader a encore planté cette nuit ?",
      "Connecte cubrik à Claude.",
      "Relie ton compte MetaTrader 4 ou 5 en trente secondes.",
      "Décris ta stratégie, sans une ligne de MQL.",
      "Backtest avant le premier ordre.",
      "Les stops sont posés sur le serveur du broker.",
      "Et il surveille le marché jour et nuit.",
      "Commente MT5, et je t'envoie le setup."
    ],
  },
  trans: [null, "zoom", "whipL", "stripes", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    hookCode(1, { l1: "YOUR EA CRASHED?", l2: "AGAIN", stamp: "NO MORE EA" }),
    connect(2),
    broker(3, { l1: "METATRADER 4 & 5", l2: "IN 30 SECONDS" }),
    describe(4, { name: "GOLD LONDON SWEEP", l1: "ZERO LINES", l2: "OF MQL", msg: "gold 1h, London only: buy the sweep of the last low on reclaim, stop under the swing, 2R, 1% risk", rules: [["MARKET", "XAU/USD · 1 hour"], ["ENTRY", "London sweep of the last low, then reclaim"], ["EXIT", "Stop under the swing · target 2R"], ["RISK", "1% per trade"]] }),
    backtest(5, { l1: "BACKTESTED", l2: "BEFORE THE FIRST ORDER" }),
    guardrails(6, { l1: "STOPS ON", l2: "THE BROKER SERVER" }),
    live(7, { l1: "WATCHES THE MARKET", l2: "DAY AND NIGHT", title: "Gold London sweep", main: "✅ Take profit hit · +2R", nsub: "Gold London sweep closed XAU/USD", pnl: "+2R", notif: 1.6 }),
    endCard(8, { word: "MT5" }),
  ],
  coverCss: `#cv .hcodeWrap{top:-40px;transform:scale(.8);transform-origin:50% 0}#cv .hero{top:690px;gap:14px}#cv .hl1,#cv .hl2,#cv .hcLn,#cv .hcStamp{opacity:1}#cv .hcBody{opacity:.25}#cv .hcStamp{transform:rotate(-8deg)}#cv .mHN{display:none}`,
  fr: {"YOUR EA CRASHED?": "TON EA A PLANTÉ ?", "AGAIN": "ENCORE", "NO MORE EA": "FINI LES EA", "METATRADER 4 & 5": "METATRADER 4 ET 5", "IN 30 SECONDS": "EN 30 SECONDES", "ZERO LINES": "ZÉRO LIGNE", "OF MQL": "DE MQL", "gold 1h, London only: buy the sweep of the last low on reclaim, stop under the swing, 2R, 1% risk": "or 1h, Londres seulement : achète le sweep du dernier plus bas à la reprise, stop sous le swing, 2R, 1 % de risque", "BACKTESTED": "BACKTESTÉE", "BEFORE THE FIRST ORDER": "AVANT LE PREMIER ORDRE", "STOPS ON": "STOPS SUR", "THE BROKER SERVER": "LE SERVEUR DU BROKER", "WATCHES THE MARKET": "SURVEILLE LE MARCHÉ", "DAY AND NIGHT": "JOUR ET NUIT", "✅ Take profit hit · +2R": "✅ Take profit touché · +2R", "Gold London sweep closed XAU/USD": "Gold London sweep a clôturé XAU/USD", "London sweep of the last low, then reclaim": "Sweep du dernier plus bas à Londres, puis reprise", "Stop under the swing · target 2R": "Stop sous le swing · objectif 2R"},
};
