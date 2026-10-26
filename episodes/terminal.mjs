// Price anchor: what Wall Street pays for a pro market terminal (~$30k a year per seat) vs cubrik in Claude.
// No competitor name or logo on screen; the comparison is the category, not a product.
import { hookPrice, connect, describe, backtest, analytics, chartTrade, confirm, endCard } from "../lib/scenes.mjs";

export default {
  id: "terminal",
  vo: {
    en: [
      "Wall Street pays thirty thousand dollars a year for this.",
      "I just connected cubrik to Claude.",
      "Scan gold for me. News, calendar, indicators, in seconds.",
      "Backtest this idea on five years of data.",
      "It even shows me which session loses money.",
      "Then an agent trades it. Stop loss and take profit, set automatically.",
      "Nothing goes live without your OK. Demo account first.",
      "Comment terminal, and I'll send you the setup.",
    ],
  },
  trans: [null, "zoom", "whipL", "stripes", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    hookPrice(1, { l1: "WALL STREET PAYS", l2: "$30K A YEAR" }),
    connect(2),
    describe(3, {
      l1: "SCAN GOLD", l2: "IN SECONDS",
      msg: "scan gold for me",
      rules: [["NEWS", "No big gold headline · last 12h"], ["EVENTS", "Fed rate decision · Wednesday"], ["SIGNALS", "RSI 52 · ADX 38 · bands squeezed"], ["READ", "1h compression · watch the breakout"]],
      barT: "Market read in 4 s", barS: "PRICES · NEWS · CALENDAR · INDICATORS", barBtn: "Alert",
    }),
    backtest(4, { l1: "BACKTESTED", l2: "ON 5 YEARS", stats: [["WIN RATE", "54%"], ["PROFIT FACTOR", "1.4"], ["NET PROFIT", "+22.6%", "pos"]] }),
    analytics(5, { l1: "WHICH SESSION", l2: "LOSES MONEY" }),
    chartTrade(6, { phase: "order", l1: "SL + TP SET", l2: "AUTOMATICALLY", pair: "XAU/USD", tf: "1H", broker: "METATRADER 5", entry: "4,172", sl: "4,151", tp: "4,214" }),
    confirm(7, { l1: "NOTHING GOES LIVE", l2: "WITHOUT YOUR OK", title: "Launch on MetaTrader?", line1: "Demo account · 1% risk per trade" }),
    endCard(8, { word: "TERMINAL" }),
  ],
  coverCss: `#cv .hpWrap{top:40px;transform:scale(.8);transform-origin:50% 0}#cv .hero{top:720px;gap:14px}#cv .hl1,#cv .hl2,#cv .hpF,#cv .hpNow{opacity:1}#cv .hpNum{font-size:0}#cv .hpNum::after{content:"$30,000";font-size:150px}#cv .hpStrike{transform:rotate(-4deg)}#cv .hpPrice{opacity:.5}`,
  fr: {},
};
