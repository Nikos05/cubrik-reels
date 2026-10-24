// US series (feature coming soon): missed TradingView alert -> alerts place orders.
import { hookTV, connect, tvWebhook, tvAlert, tvFlow, guardrails, live, endCard } from "../lib/scenes.mjs";

export default {
  id: "missedalert",
  vo: {
    en: [
      "You built the perfect TradingView strategy. Then you missed the alert.",
      "Now cubrik connects to Claude.",
      "Ask Claude for a webhook.",
      "Paste it in your alert. Your Pine script stays the same.",
      "Every alert becomes a real order in seconds.",
      "With your stops and daily limits on every trade.",
      "Even when you're nowhere near your screen.",
      "Comment ALERTS for early access.",
    ],
  },
  trans: [null, "zoom", "whipU", "stripes", "whipL", "zoom", "whipU", "zoom"],
  scenes: () => [
    hookTV(1, { l1: "YOU MISSED", l2: "THE ALERT. AGAIN." }),
    connect(2),
    tvWebhook(3, { l1: "ASK CLAUDE", l2: "FOR A WEBHOOK" }),
    tvAlert(4, { l1: "PASTE IT", l2: "IN YOUR ALERT" }),
    tvFlow(5, { l1: "ALERT → ORDER", l2: "IN SECONDS" }),
    guardrails(6, { l1: "YOUR RULES", l2: "ON EVERY TRADE" }),
    live(7, {
      l1: "AWAY FROM", l2: "YOUR SCREEN", title: "Gold RSI Strategy", sub: "TRIGGERED BY TRADINGVIEW · METATRADER 5",
      main: "✅ Order filled: XAU/USD Long", nsub: "From your TradingView alert", pnl: "+2R", notif: 1.4,
    }),
    endCard(8, { word: "ALERTS", sub: "&amp; get early access" }),
  ],
  coverCss: `#cv .tvWrap{top:-120px;transform:scale(.85);transform-origin:50% 0}#cv .hero{top:690px;gap:14px}#cv .hl2{opacity:1}#cv .tvAl{opacity:1}#cv .mTV{display:none}`,
  fr: {},
};
