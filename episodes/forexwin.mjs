// Result-first series #4: EUR/USD pullback to the 50 EMA, take profit at the gym (MetaTrader 5, demo account).
import { winEpisode } from "../lib/win-episode.mjs";
export default winEpisode({
  id: "forexwin", pair: "EUR/USD", side: "LONG", tf: "1H", broker: "METATRADER 5", when: "18:41",
  pnl: 612, pnlTxt: "612.00", nsub: "EUR/USD EMA Pullback closed EUR/USD long",
  hook: ["WHILE I WAS", "AT THE GYM"],
  prompt: "buy EUR/USD pullbacks to the 50 EMA on the 1h, only with the trend, 1% risk",
  rules: [["MARKET", "EUR/USD · 1h"], ["ENTRY", "Pullback to the 50 EMA"], ["EXIT", "TP 2R · SL under the swing"], ["RISK", "1% per trade"]],
  name: "EUR/USD EMA PULLBACK",
  entry: "1.0842", sl: "1.0821", tp: "1.0884",
  zone: ["PRICE DIPS ONTO", "MY 50 EMA"], order: ["SL + TP", "PLACED BY THE AI"], hit: ["40 MINUTES LATER", "TAKE PROFIT HIT"],
  recap: { title: "This month", l1: "THIS MONTH", l2: "+13% · ZERO TRADES BY ME", from: 10000, to: 11300,
    trades: [["EUR/USD", "LONG · TP", "+$612.00"], ["GBP/USD", "LONG · TP", "+$488.40"], ["EUR/USD", "LONG · SL", "−$251.00"], ["USD/JPY", "SHORT · TP", "+$450.60"]] },
  word: "FOREX",
  vo: [
    "Plus six hundred twelve dollars. I was at the gym.",
    "Here's what actually happened. cubrik runs inside Claude.",
    "I asked for one thing: buy euro dollar pullbacks to the fifty EMA.",
    "The price dipped right onto my moving average.",
    "The AI entered, and placed my stop and take profit by itself.",
    "Forty minutes later: take profit hit. Plus six hundred twelve.",
    "My account is up thirteen percent this month. And I never placed a single trade.",
    "Comment forex, and I'll send you the setup.",
  ],
});
