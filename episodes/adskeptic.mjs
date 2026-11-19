import { hookVs, describe, feedCard } from "../lib/scenes.mjs";
import { cubeIc, ON, tail, step1, vo } from "./_adcommon.mjs";
export default {
  id: "adskeptic",
  vo: { en: vo("An AI that trades for me? Honestly, I didn't believe it.", "So I tested it on a demo account, with my own strategy.", "It showed me every trade, and every reason, before risking a cent.") },
  trans: [null, "stripes", "whipL", "whipU", "whipL", "stripes", "whipU", "zoom"],
  scenes: () => [
    hookVs(1, { l1: "AN AI THAT TRADES?", l2: "I DIDN'T BELIEVE IT", rows: [["Widens the stop", "Stop never moves"], ["Doubles size after a loss", "Same size every trade"], ["Trades at 11 pm, bored", "Trades only its rules"], ["Forgets the plan", "Logs every reason"]] }),
    step1(),
    describe(3, { l1: "STEP 2", l2: "TEST YOUR OWN IDEA", name: "BTC DAILY BREAKOUT", msg: "test my strategy: buy BTC on the daily breakout with volume, 1% risk", rules: [["MARKET", "BTC/USD · 1 hour"], ["ENTRY", "Break of the daily high with volume"], ["EXIT", "Stop under the range · target 2R"], ["RISK", "1% per trade"]] }),
    feedCard(4, { l1: "STEP 3", l2: "SEE EVERY DECISION", head: "WHY IT ACTED", rows: [[cubeIc, "Entry: daily high broken", "Volume 1.8× the average", "Met ✓", ON], [cubeIc, "Skipped: CPI in 10 minutes", "News filter", "Skip"], [cubeIc, "Stop set at the broker", "Holds even offline", "Safe", ON]], bar: ["Every decision explained", "DEMO ACCOUNT · NOTHING LIVE YET"] }),
    ...tail("BTC/USD", "BTC Daily Breakout"),
  ],
};
