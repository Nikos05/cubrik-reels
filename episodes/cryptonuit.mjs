// TikTok FR (Paulito) — reprise du hook « La crypto ne dort jamais, toi si », CTA lien en bio. Voix Gacrux comme l'original.
import { hookNotifs, connect, broker, describe, backtest, guardrails, live, endCard } from "../lib/scenes.mjs";
import { BLOGO } from "../lib/core.mjs";
export default {
  id: "cryptonuit",
  voice: "Gacrux",
  vo: {
    en: ["Crypto never sleeps. You do.", "", "", "", "", "", "", ""],
    fr: [
      "La crypto ne dort jamais. Toi, si.",
      "Alors tu connectes cubrik à Claude.",
      "Tu relies Binance, OKX ou Coinbase en trente secondes.",
      "Tu décris ta stratégie, avec tes mots.",
      "Il la backteste avant de risquer un centime.",
      "Stop loss chez l'exchange, perte max par jour.",
      "Et à trois heures du matin, c'est lui qui surveille le marché.",
      "Le lien est dans ma bio. Teste-le gratuitement."
    ],
  },
  trans: [null, "zoom", "whipL", "stripes", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    hookNotifs(1, { l1: "CRYPTO NEVER SLEEPS", l2: "YOU DO", time: "7:12", items: [["🛡", "Skipped · BTC funding spike", "02:38"], ["↗", "Stop to breakeven · SOL", "04:11"], ["✅", "Take profit hit · BTC +2R", "06:20"]] }),
    connect(2),
    broker(3, { l1: "YOUR EXCHANGE", l2: "IN 30 SECONDS", brokers: [[BLOGO("binance"), "Binance", "#fff"], [BLOGO("okx"), "OKX", "#fff"], [BLOGO("coinbase"), "Coinbase", "#fff"]] }),
    describe(4, { name: "SOL TREND RIDER", l1: "YOUR STRATEGY", l2: "IN YOUR WORDS", msg: "buy SOL when it closes above the 4h EMA 50 after a pullback, 1% risk", rules: [["MARKET", "SOL/USDT · 4 hours"], ["ENTRY", "Close above EMA 50 after a pullback"], ["EXIT", "Stop under the swing · target 2R"], ["RISK", "1% per trade"]] }),
    backtest(5, { l1: "BACKTEST", l2: "FIRST" }),
    guardrails(6, { l1: "STOPS AT", l2: "THE EXCHANGE" }),
    live(7, { l1: "3 AM?", l2: "IT'S WATCHING", title: "SOL Trend Rider", sub: "RUNS 24/7 ON BINANCE", foot: "SOL/USDT", main: "✅ Take profit hit · SOL +2R", nsub: "SOL Trend Rider closed SOL/USDT", pnl: "+2R", notif: 1.6 }),
    endCard(8, { bio: true }),
  ],
  coverCss: "",
  fr: { "CRYPTO NEVER SLEEPS": "LA CRYPTO NE DORT JAMAIS", "YOU DO": "TOI, SI", "Skipped · BTC funding spike": "Évité · pic de funding BTC", "Stop to breakeven · SOL": "Stop au point mort · SOL", "Take profit hit · BTC +2R": "Take profit touché · BTC +2R", "YOUR EXCHANGE": "TON EXCHANGE", "IN 30 SECONDS": "EN 30 SECONDES", "YOUR STRATEGY": "TA STRATÉGIE", "IN YOUR WORDS": "AVEC TES MOTS", "buy SOL when it closes above the 4h EMA 50 after a pullback, 1% risk": "achète SOL quand il clôture au-dessus de l'EMA 50 en 4h après un repli, 1 % de risque", "SOL/USDT · 4 hours": "SOL/USDT · 4 heures", "Close above EMA 50 after a pullback": "Clôture au-dessus de l'EMA 50 après un repli", "Stop under the swing · target 2R": "Stop sous le swing · objectif 2R", "BACKTEST": "BACKTEST", "FIRST": "D'ABORD", "STOPS AT": "STOPS CHEZ", "THE EXCHANGE": "L'EXCHANGE", "3 AM?": "3 H DU MATIN ?", "IT'S WATCHING": "IL SURVEILLE", "RUNS 24/7 ON BINANCE": "TOURNE 24H/24 SUR BINANCE", "✅ Take profit hit · SOL +2R": "✅ Take profit touché · SOL +2R", "SOL Trend Rider closed SOL/USDT": "SOL Trend Rider a clôturé SOL/USDT" },
};
