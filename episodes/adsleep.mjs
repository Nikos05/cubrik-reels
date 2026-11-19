import { hookNotifs, describe, feedCard } from "../lib/scenes.mjs";
import { badge, cubeIc, ON, tail, step1, vo } from "./_adcommon.mjs";
export default {
  id: "adsleep",
  vo: { en: vo("My AI trades while I sleep. Here's what it did last night.", "I just wrote my rules once, in plain words.", "It watches the market all night, and follows them exactly.") },
  trans: [null, "stripes", "whipL", "whipU", "whipL", "stripes", "whipU", "zoom"],
  scenes: () => [
    hookNotifs(1, { l1: "MY AI TRADES", l2: "WHILE I SLEEP", time: "7:02", date: "WHILE YOU WERE ASLEEP" }),
    step1(),
    describe(3, { l1: "STEP 2", l2: "WRITE YOUR RULES ONCE", name: "ASIA HIGH BREAKOUT", msg: "buy gold when it breaks the Asia high, stop under the Asia low, 2R, 1% risk", rules: [["MARKET", "XAU/USD · 15 min"], ["ENTRY", "Break of the Asia high"], ["EXIT", "Stop under the Asia low · 2R"], ["RISK", "1% per trade"]] }),
    feedCard(4, { l1: "STEP 3", l2: "IT NEVER SLEEPS", head: "LAST NIGHT", rows: [[badge("🌙", "#1E1B4B"), "23:41 · Checked XAU/USD", "Asia session · nothing to do", "Skip"], [cubeIc, "02:17 · Entry triggered", "Long XAU/USD · 1% risk", "Met ✓", ON], [cubeIc, "04:55 · Stop to break-even", "This trade can't lose anymore", "Safe", ON]], bar: ["Take profit hit at 06:58", "+2R · DEMO ACCOUNT"] }),
    ...tail("XAU/USD", "Asia High Breakout"),
  ],
};
