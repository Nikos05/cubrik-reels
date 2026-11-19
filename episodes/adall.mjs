import { hookDesk, feedCard, describe } from "../lib/scenes.mjs";
import { badge, cubeIc, xIc, ytIc, tail, step1, vo } from "./_adcommon.mjs";
export default {
  id: "adall",
  vo: { en: vo("AI just killed day traders.", "Paste a YouTube video, an X account, a chart, the news, or just your own words.", "cubrik turns it into clear rules, and builds your agent.") },
  trans: [null, "stripes", "whipL", "whipU", "whipL", "stripes", "whipU", "zoom"],
  scenes: () => [
    hookDesk(1, { l1: "AI JUST KILLED", l2: "DAY TRADERS", strike: true }),
    step1(),
    feedCard(3, { l1: "STEP 2", l2: "BRING ANY IDEA", head: "START FROM", dr: 0.28, rows: [[ytIc, "A YouTube video", "Paste the link"], [xIc, "An X account", "Copy their calls"], [badge("📈", "#0f1115"), "A chart screenshot", "Send the image"], [badge("📰", "#1E3A8A"), "The news", "Fed · earnings · headlines"], [cubeIc, "Your own words", "Just describe it"]] }),
    describe(4, { l1: "STEP 3", l2: "IT BUILDS YOUR AGENT", msg: "turn this into an agent, 1% risk" }),
    ...tail("XAU/USD", "Gold RSI Scalper"),
  ],
};
