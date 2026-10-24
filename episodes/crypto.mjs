// Persona reel: Crypto night owls: agent on Binance/OKX/Bitget/Kraken/Coinbase 24/7. Voice: Gacrux. See .claude/skills/cubrik-reels/references/audiences.md
import { hookTV, hookNotifs, hookChat, hookSafe, hookCode, hookVs, hookLoss, hookFeed, brokerGrid, connect, describe, backtest, analytics, library, broker, guardrails, confirm, live, endCard } from "../lib/scenes.mjs";
import { LANG, BLOGO } from "../lib/core.mjs";

export default {
  id: "crypto",
  voice: "Gacrux",
  vo: {
    en: [
      "Crypto never sleeps. You should.",
      "Connect cubrik to Claude.",
      "Link Binance, OKX, Bitget, Kraken or Coinbase.",
      "Describe your strategy, on as many pairs as you want.",
      "Backtest first.",
      "Max loss per day, stops at the exchange.",
      "And it watches the market for you, at three in the morning.",
      "Comment CRYPTO, and I'll send you the setup."
    ],
    fr: [
      "La crypto ne dort jamais. Toi, tu devrais.",
      "Tu connectes cubrik à Claude.",
      "Relie Binance, OKX, Bitget, Kraken ou Coinbase.",
      "Décris ta stratégie, sur autant de paires que tu veux.",
      "Backtest d'abord.",
      "Perte max par jour, stops chez l'exchange.",
      "Et il surveille le marché à ta place, à trois heures du matin.",
      "Commente CRYPTO, et je t'envoie le setup."
    ],
  },
  trans: [null, "zoom", "whipL", "stripes", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    hookNotifs(1, { l1: "CRYPTO NEVER SLEEPS", l2: "YOU SHOULD", time: "7:04", items: [["🛡", "Skipped · BTC funding spike", "03:12"], ["↗", "Stop to breakeven · ETH", "04:47"], ["✅", "Take profit hit · ETH +2R", "06:05"]] }),
    connect(2),
    broker(3, { l1: "YOUR EXCHANGE", l2: "IN 30 SECONDS", brokers: [[BLOGO("binance"), "Binance", "#fff"], [BLOGO("okx"), "OKX", "#fff"], [BLOGO("coinbase"), "Coinbase", "#fff"]] }),
    describe(4, { name: "BTC BREAKOUT", l1: "AS MANY PAIRS", l2: "AS YOU WANT", msg: "buy BTC and ETH when the daily high breaks with volume, 1% risk", rules: [["MARKET", "BTC, ETH · 1 hour"], ["ENTRY", "Break of the daily high with volume"], ["EXIT", "Stop under the range · target 2R"], ["RISK", "1% per trade"]] }),
    backtest(5, { l1: "BACKTEST", l2: "FIRST" }),
    guardrails(6, { l1: "STOPS AT", l2: "THE EXCHANGE" }),
    live(7, { l1: "3 AM?", l2: "IT'S WATCHING", title: "BTC Breakout", sub: "RUNS 24/7 ON BINANCE", foot: "BTC/USDT", main: "✅ Take profit hit · BTC +2R", nsub: "BTC Breakout closed BTC/USDT", pnl: "+2R", notif: 1.6 }),
    endCard(8, { word: "CRYPTO" }),
  ],
  coverCss: `#cv .hnWrap{top:20px;transform:scale(.78);transform-origin:50% 0}#cv .hero{top:700px;gap:14px}#cv .hl1,#cv .hl2,#cv .hnN,#cv .hnTime,#cv .hnDate{opacity:1}#cv .mHN{display:none}`,
  fr: {"CRYPTO NEVER SLEEPS": "LA CRYPTO NE DORT JAMAIS", "YOU SHOULD": "TOI, SI", "Skipped · BTC funding spike": "Évité · pic de funding BTC", "Stop to breakeven · ETH": "Stop au point mort · ETH", "Take profit hit · ETH +2R": "Take profit touché · ETH +2R", "YOUR EXCHANGE": "TON EXCHANGE", "IN 30 SECONDS": "EN 30 SECONDES", "AS MANY PAIRS": "AUTANT DE PAIRES", "AS YOU WANT": "QUE TU VEUX", "buy BTC and ETH when the daily high breaks with volume, 1% risk": "achète BTC et ETH quand le plus haut du jour casse avec du volume, 1 % de risque", "BACKTEST": "BACKTEST", "FIRST": "D'ABORD", "STOPS AT": "STOPS CHEZ", "THE EXCHANGE": "L'EXCHANGE", "3 AM?": "3 H DU MATIN ?", "IT'S WATCHING": "IL SURVEILLE", "RUNS 24/7 ON BINANCE": "TOURNE 24H/24 SUR BINANCE", "✅ Take profit hit · BTC +2R": "✅ Take profit touché · BTC +2R", "BTC Breakout closed BTC/USDT": "BTC Breakout a clôturé BTC/USDT", "BTC, ETH · 1 hour": "BTC, ETH · 1 heure", "Break of the daily high with volume": "Cassure du plus haut du jour avec volume", "Stop under the range · target 2R": "Stop sous le range · objectif 2R"},
};
