// Result-first series #1: gold, London sweep, take profit while asleep (MetaTrader 5, demo account).
import { winEpisode } from "../lib/win-episode.mjs";
export default winEpisode({
  id: "goldwin", pair: "XAU/USD", side: "LONG", tf: "1H", broker: "METATRADER 5", when: "03:58",
  pnl: 1240, pnlTxt: "1,240.00", nsub: "Gold London Sweep closed XAU/USD long",
  hook: ["WHILE I WAS", "ASLEEP"],
  prompt: "buy gold when London sweeps the Asian low and reclaims it, 1% risk, 2R target",
  rules: [["MARKET", "XAU/USD · 1h"], ["ENTRY", "Sweep of Asian low + reclaim"], ["EXIT", "TP 2R · SL under the swing"], ["RISK", "1% per trade"]],
  name: "GOLD LONDON SWEEP",
  entry: "4,172", sl: "4,151", tp: "4,214",
  zone: ["3 AM: PRICE BACK", "IN MY ZONE"], order: ["SL + TP SET", "AUTOMATICALLY"], hit: ["2 HOURS LATER", "TAKE PROFIT HIT"],
  recap: { title: "This week", l1: "THIS WEEK", l2: "+$3,480 · 0 CLICKS", from: 10000, to: 13480,
    trades: [["XAU/USD", "LONG · TP", "+$1,240.00"], ["EUR/USD", "SHORT · TP", "+$1,612.50"], ["XAU/USD", "LONG · SL", "−$412.00"], ["GBP/USD", "LONG · TP", "+$1,039.50"]] },
  word: "GOLD",
  vo: [
    "Plus twelve hundred forty dollars. While I was asleep.",
    "Here's exactly how. I connected cubrik to Claude.",
    "I gave it one precise gold strategy, in plain English.",
    "At three AM, the price came back right into my zone.",
    "The AI bought instantly. Stop loss and take profit, set automatically.",
    "Two hours later, the price hit my target. Take profit.",
    "This week: plus thirty-four hundred dollars. The AI executed everything.",
    "Comment gold, and I'll send you the strategy.",
  ],
});
