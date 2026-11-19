import { hookCode, describe, clarify } from "../lib/scenes.mjs";
import { tail, step1, vo } from "./_adcommon.mjs";
export default {
  id: "adwords",
  vo: { en: vo("You don't need to code to automate your trading anymore.", "Just describe your strategy, in plain words.", "If something's missing, cubrik asks you, then builds the agent.") },
  trans: [null, "stripes", "whipL", "whipU", "whipL", "stripes", "whipU", "zoom"],
  scenes: () => [
    hookCode(1, { l1: "NO CODE.", l2: "JUST YOUR WORDS." }),
    step1(),
    describe(3, { l1: "STEP 2", l2: "DESCRIBE IT", name: "LONDON GOLD BREAKOUT", msg: "buy gold when it breaks the London high, stop under the range, 2R, 1% risk", rules: [["MARKET", "XAU/USD · 15 min"], ["ENTRY", "Break of the London high"], ["EXIT", "Stop under the range · target 2R"], ["RISK", "1% per trade"]] }),
    clarify(4, { l1: "STEP 3", l2: "IT ASKS WHAT'S MISSING", intro: "3 quick questions before I build it:" }),
    ...tail("XAU/USD", "London Gold Breakout"),
  ],
};
