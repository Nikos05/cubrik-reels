import { hookNotifs, feedCard } from "../lib/scenes.mjs";
import { badge, cubeIc, xIc, ON, RED, tail, step1, vo } from "./_adcommon.mjs";
export default {
  id: "adnews",
  vo: { en: vo("AI now trades the news, in two seconds flat.", "Pick the news it should watch: the Fed, earnings, or any headline.", "The second it breaks, cubrik reads it, and places the trade.") },
  trans: [null, "stripes", "whipL", "whipU", "whipL", "stripes", "whipU", "zoom"],
  scenes: () => [
    hookNotifs(1, { l1: "AI TRADES THE NEWS", l2: "IN 2 SECONDS", time: "14:00", date: "FED DECISION DAY", items: [["📰", "Fed holds rates · reading the statement", "14:00:00"], ["⚡", "Hawkish tone · signal on NAS100", "14:00:01"], ["✅", "Short NAS100 placed · 1% risk", "14:00:02"]] }),
    step1(),
    feedCard(3, { l1: "STEP 2", l2: "PICK YOUR NEWS", head: "WATCHING FOR YOU", rows: [[badge("🏛", "#1E3A8A"), "Federal Reserve", "Rate decisions · speeches", "ON", ON], [badge("B", "#111"), "Bloomberg", "Markets · earnings", "ON", ON], [badge("R", "#F97316"), "Reuters", "Breaking headlines", "ON", ON], [xIc, "Headlines on X", "The fastest accounts", "ON", ON]] }),
    feedCard(4, { l1: "STEP 3", l2: "IT TRADES THE HEADLINE", head: "BREAKING · 14:00:00", rows: [[badge("🏛", "#1E3A8A"), "Fed holds rates, signals fewer cuts", "Federal Reserve · now", "Hawkish", RED], [cubeIc, "Signal on NAS100", "Bearish · read in 1.2 s", "Met ✓", ON]], hi: 0, bar: ["Order placed in 2 seconds", "SHORT NAS100 · 1% RISK · STOP SET"] }),
    ...tail("NAS100", "Fed News Fader"),
  ],
};
