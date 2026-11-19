import { hookNotifs, feedCard } from "../lib/scenes.mjs";
import { badge, cubeIc, ON, tail, step1, vo } from "./_adcommon.mjs";
const leo = badge("L", "linear-gradient(140deg,#f5c451,#a8750b)");
export default {
  id: "adx",
  vo: { en: vo("Your favorite trader posts a call. AI trades it before you even see it.", "Add any X account you trust.", "When they post a call, cubrik reads it, and copies the trade.") },
  trans: [null, "stripes", "whipL", "whipU", "whipL", "stripes", "whipU", "zoom"],
  scenes: () => [
    hookNotifs(1, { l1: "AI COPIES", l2: "THEIR X CALLS", time: "09:41", date: "WHILE YOU SCROLL", items: [["𝕏", "@GoldLeo: gold looks ready, long here", "09:41"], ["⚡", "Bullish call · XAU/USD", "09:41"], ["✅", "Long XAU/USD placed · 1% risk", "09:41"]] }),
    step1(),
    feedCard(3, { l1: "STEP 2", l2: "ADD ANY X ACCOUNT", msg: "copy @GoldLeo's calls", rows: [[leo, "Leo · Gold Trader", "@GoldLeo · 214K followers", "Added ✓", ON], [cubeIc, "38 calls found", "61% hit on real candles", "Tested", ON]] }),
    feedCard(4, { l1: "STEP 3", l2: "IT COPIES THE CALL", head: "NEW POST · NOW", rows: [[leo, "“Gold looks ready, long above 2,410”", "@GoldLeo · now", "Bullish", ON], [cubeIc, "Trigger met", "Bullish post on XAU/USD", "Met ✓", ON]], hi: 0, bar: ["Long XAU/USD placed", "1% RISK · STOP SET AT THE BROKER"] }),
    ...tail("XAU/USD", "Leo's Calls"),
  ],
};
