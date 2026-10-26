// Result-first series: the gain first, then how it happened (precise prompt → price back in the zone →
// order with SL/TP set automatically → take profit hit), then the account recap, then the CTA.
// Every amount is a demo-account illustration (labelled on screen); no promise of results.
import { hookWin, connect, describe, chartTrade, recap, endCard } from "./scenes.mjs";

export function winEpisode(c) {
  return {
    id: c.id,
    vo: { en: c.vo },
    trans: [null, "zoom", "stripes", "whipL", "whipU", "zoom", "whipL", "zoom"],
    scenes: () => [
      hookWin(1, { l1: c.hook[0], l2: c.hook[1], amount: c.pnl, pair: c.pair, side: c.side, acct: `DEMO ACCOUNT · ${c.broker}`, main: `✅ Take profit hit · +$${c.pnlTxt}`, nsub: c.nsub, when: c.when }),
      connect(2, { l1: c.connect?.[0] || "HERE'S HOW:", l2: c.connect?.[1] || "CUBRIK + CLAUDE" }),
      describe(3, { l1: "ONE PRECISE", l2: "STRATEGY", msg: c.prompt, rules: c.rules, name: c.name }),
      chartTrade(4, { phase: "zone", l1: c.zone[0], l2: c.zone[1], pair: c.pair, tf: c.tf, broker: c.broker, entry: c.entry, sl: c.sl, tp: c.tp }),
      chartTrade(5, { phase: "order", l1: c.order[0], l2: c.order[1], pair: c.pair, tf: c.tf, broker: c.broker, entry: c.entry, sl: c.sl, tp: c.tp }),
      chartTrade(6, { phase: "hit", l1: c.hit[0], l2: c.hit[1], pair: c.pair, tf: c.tf, broker: c.broker, entry: c.entry, sl: c.sl, tp: c.tp, pnl: c.pnlTxt }),
      recap(7, { l1: c.recap.l1, l2: c.recap.l2, title: c.recap.title, acct: `DEMO ACCOUNT · ${c.broker}`, from: c.recap.from, to: c.recap.to, trades: c.recap.trades }),
      endCard(8, { word: c.word, sub: "&amp; I'll send you the setup" }),
    ],
    coverCss: "",
    fr: {},
  };
}
