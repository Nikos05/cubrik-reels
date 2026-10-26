// Result-first series #2: Bitcoin breakout retest, one trade, zero clicks (Binance, demo account).
import { winEpisode } from "../lib/win-episode.mjs";
export default winEpisode({
  id: "btcwin", pair: "BTC/USDT", side: "LONG", tf: "15M", broker: "BINANCE", when: "now",
  pnl: 860, pnlTxt: "860.00", nsub: "BTC Breakout Retest closed BTC/USDT long",
  hook: ["ONE TRADE.", "ZERO CLICKS"],
  prompt: "buy Bitcoin on the retest of a 4h breakout, 15 minute entry, 1% risk, 2R target",
  rules: [["MARKET", "BTC/USDT · 15m"], ["ENTRY", "Retest of the 4h breakout"], ["EXIT", "TP 2R · SL under the retest"], ["RISK", "1% per trade"]],
  name: "BTC BREAKOUT RETEST",
  entry: "98,240", sl: "97,610", tp: "99,500",
  zone: ["BREAKOUT, THEN", "THE RETEST"], order: ["ENTRY + SL + TP", "PLACED BY THE AI"], hit: ["90 MINUTES LATER", "TARGET HIT"],
  recap: { title: "This month", l1: "THIS MONTH", l2: "+$2,100 · ON AUTOPILOT", from: 5000, to: 7100,
    trades: [["BTC/USDT", "LONG · TP", "+$860.00"], ["ETH/USDT", "LONG · TP", "+$742.20"], ["SOL/USDT", "LONG · TP", "+$905.80"], ["ETH/USDT", "SHORT · SL", "−$408.00"]] },
  word: "BITCOIN",
  vo: [
    "Plus eight hundred sixty dollars on Bitcoin. I didn't click once.",
    "Here's how it happened. cubrik is connected to Claude.",
    "I told it: buy the retest of the breakout, with one percent risk.",
    "Bitcoin broke out, then came right back to retest the level.",
    "The AI entered on the retest. Stop and target, placed for me.",
    "Ninety minutes later, Bitcoin ripped straight into the take profit.",
    "That's plus twenty-one hundred this month, all executed by the AI.",
    "Comment bitcoin, and I'll send you the setup.",
  ],
});
