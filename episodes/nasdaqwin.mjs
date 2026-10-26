// Result-first series #3: Nasdaq New York open range, take profit during a meeting (MetaTrader 5, demo account).
import { winEpisode } from "../lib/win-episode.mjs";
export default winEpisode({
  id: "nasdaqwin", pair: "NAS100", side: "LONG", tf: "5M", broker: "METATRADER 5", when: "11:02",
  pnl: 1575, pnlTxt: "1,575.00", nsub: "NY Open Range closed NAS100 long",
  hook: ["WHILE I WAS", "IN A MEETING"],
  prompt: "trade the New York opening range breakout on the Nasdaq, 5 minute chart, 1% risk",
  rules: [["MARKET", "NAS100 · 5m"], ["ENTRY", "Opening range breakout"], ["EXIT", "TP 2.5R · SL under the range"], ["RISK", "1% per trade"]],
  name: "NY OPEN RANGE",
  entry: "21,480", sl: "21,431", tp: "21,612",
  zone: ["9:45 AM: BACK", "IN THE RANGE"], order: ["STOP + TARGET", "ALREADY SET"], hit: ["BY 11 AM", "TAKE PROFIT HIT"],
  recap: { title: "This week", l1: "THIS WEEK", l2: "+$4,200 · BY THE AI", from: 20000, to: 24200,
    trades: [["NAS100", "LONG · TP", "+$1,575.00"], ["NAS100", "LONG · TP", "+$1,320.50"], ["NAS100", "SHORT · SL", "−$640.00"], ["US30", "LONG · TP", "+$1,944.50"]] },
  word: "NASDAQ",
  vo: [
    "Plus fifteen hundred seventy-five dollars on the Nasdaq. I was in a meeting.",
    "Here's how. I connected cubrik to Claude, once.",
    "My rule: trade the New York opening range breakout. Nothing else.",
    "At nine forty-five, the Nasdaq pulled back into the range.",
    "The AI bought it, with the stop and the target already set.",
    "By eleven, the take profit was hit. I didn't even look.",
    "Plus forty-two hundred this week. Every trade, executed by the AI.",
    "Comment nasdaq, and I'll send you the strategy.",
  ],
});
