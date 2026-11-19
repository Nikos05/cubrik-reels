import { hookPrice, feedCard, describe } from "../lib/scenes.mjs";
import { badge, cubeIc, ON, tail, step1, vo } from "./_adcommon.mjs";
export default {
  id: "adwallst",
  vo: { en: vo("Wall Street pays thirty thousand dollars a year for this.", "Live prices, news, and AI analysis on every market. Just ask.", "Then turn any setup into an agent that trades it for you.") },
  trans: [null, "stripes", "whipL", "whipU", "whipL", "stripes", "whipU", "zoom"],
  scenes: () => [
    hookPrice(1, { l1: "WALL STREET PAYS", l2: "$30K A YEAR", now: "Now in one app", nowSub: "FREE ON A DEMO ACCOUNT" }),
    step1(),
    feedCard(3, { l1: "STEP 2", l2: "ASK THE MARKET", msg: "how does gold look before the Fed?", rows: [[badge("Au", "#B8860B"), "XAU/USD · 2,412.6", "+0.4% today", "Bullish", ON], [badge("🏛", "#1E3A8A"), "Fed decision · tomorrow 14:00", "Market expects a hold", "Event"], [cubeIc, "Setup forming", "Breakout above 2,415", "Watch"]] }),
    describe(4, { l1: "STEP 3", l2: "TURN IT INTO AN AGENT", name: "GOLD FED BREAKOUT", msg: "trade that breakout for me, 1% risk", rules: [["MARKET", "XAU/USD · 15 min"], ["ENTRY", "Close above 2,415"], ["EXIT", "Stop under 2,398 · target 2R"], ["RISK", "1% per trade"]] }),
    ...tail("XAU/USD", "Gold Fed Breakout"),
  ],
};
