// Result-first series #5: Solana support retest, fully automatic (Hyperliquid, demo account).
import { winEpisode } from "../lib/win-episode.mjs";
export default winEpisode({
  id: "solwin", pair: "SOL/USDC", side: "LONG", tf: "1H", broker: "HYPERLIQUID", when: "now",
  pnl: 980, pnlTxt: "980.00", nsub: "SOL Support Retest closed SOL long",
  hook: ["FULLY", "AUTOMATIC"],
  prompt: "buy Solana when it retests support on the 1h, stop under support, 2R target",
  rules: [["MARKET", "SOL/USDC · 1h"], ["ENTRY", "Retest of support"], ["EXIT", "TP 2R · SL under support"], ["RISK", "1% per trade"]],
  name: "SOL SUPPORT RETEST",
  entry: "182.40", sl: "178.90", tp: "189.60",
  zone: ["STRAIGHT BACK", "TO SUPPORT"], order: ["SL + TP", "SET AUTOMATICALLY"], hit: ["THEN THE SQUEEZE", "TAKE PROFIT HIT"],
  recap: { title: "This week", l1: "THIS WEEK", l2: "+$4,920 · ALL BY THE AI", from: 25000, to: 29920,
    trades: [["SOL", "LONG · TP", "+$980.00"], ["BTC", "LONG · TP", "+$2,140.00"], ["ETH", "SHORT · SL", "−$560.00"], ["HYPE", "LONG · TP", "+$2,360.00"]] },
  word: "AGENT",
  vo: [
    "Plus nine hundred and eighty dollars on Solana. Fully automatic.",
    "Here's how. I plugged cubrik into Claude.",
    "I wrote my strategy in one sentence: buy support retests on Solana.",
    "Solana dropped straight back to support. Exactly my zone.",
    "The AI bought the bounce. Stop and take profit, set automatically.",
    "Then Solana squeezed into the target. Take profit hit.",
    "Plus four thousand nine hundred twenty this week. The AI did every trade.",
    "Comment agent, and I'll send you the setup.",
  ],
});
