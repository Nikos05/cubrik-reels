// Result-first series: the gain first, then how it happened (precise prompt → price back in the zone →
// order with SL/TP set automatically → take profit hit), then the account recap, then the CTA.
// Every amount is a demo-account illustration (labelled on screen); no promise of results.
import { hookWin, connect, describe, chartTrade, recap, endCard } from "./scenes.mjs";
import { LANG } from "./core.mjs";

// French strings shared by the whole series; each episode adds its own in c.fr (keyed by the English text).
const WIN_FR = {
  "HERE'S HOW:": "VOILÀ COMMENT :", "ONE PRECISE": "UNE STRATÉGIE", "STRATEGY": "PRÉCISE",
  "CLOSED": "CLÔTURÉ", "BALANCE": "SOLDE", "MY ZONE": "MA ZONE", "SET AUTOMATICALLY": "PLACÉS AUTO",
  "TAKE PROFIT HIT": "TAKE PROFIT ATTEINT", "ORDER PLACED BY AI": "ORDRE PLACÉ PAR L'IA",
  "WATCHING MY ZONE": "JE SURVEILLE MA ZONE", "TRADE CLOSED": "TRADE CLÔTURÉ",
  "Executed by the AI": "Exécuté par l'IA", "0 clicks from me": "0 clic de ma part",
  "READY TO BACKTEST": "PRÊT POUR LE BACKTEST", "&amp; I'll send you the setup": "&amp; je t'envoie le setup",
  "This week": "Cette semaine", "This month": "Ce mois-ci", "THIS WEEK": "CETTE SEMAINE", "THIS MONTH": "CE MOIS-CI",
};

export function winEpisode(c) {
  return {
    id: c.id,
    vo: { en: c.vo, fr: c.voFr },
    trans: [null, "zoom", "stripes", "whipL", "whipU", "zoom", "whipL", "zoom"],
    scenes: () => [
      hookWin(1, { l1: c.hook[0], l2: c.hook[1], amount: c.pnl, pair: c.pair, side: c.side, acct: `${LANG === "fr" ? "COMPTE DÉMO" : "DEMO ACCOUNT"} · ${c.broker}`, main: `✅ ${LANG === "fr" ? "Take profit atteint" : "Take profit hit"} · +$${c.pnlTxt}`, nsub: c.nsub, when: c.when }),
      connect(2, { l1: c.connect?.[0] || "HERE'S HOW:", l2: c.connect?.[1] || "CUBRIK + CLAUDE" }),
      describe(3, { l1: "ONE PRECISE", l2: "STRATEGY", msg: c.prompt, rules: c.rules, name: c.name }),
      chartTrade(4, { phase: "zone", l1: c.zone[0], l2: c.zone[1], pair: c.pair, tf: c.tf, broker: c.broker, entry: c.entry, sl: c.sl, tp: c.tp }),
      chartTrade(5, { phase: "order", l1: c.order[0], l2: c.order[1], pair: c.pair, tf: c.tf, broker: c.broker, entry: c.entry, sl: c.sl, tp: c.tp }),
      chartTrade(6, { phase: "hit", l1: c.hit[0], l2: c.hit[1], pair: c.pair, tf: c.tf, broker: c.broker, entry: c.entry, sl: c.sl, tp: c.tp, pnl: c.pnlTxt }),
      recap(7, { l1: c.recap.l1, l2: c.recap.l2, title: c.recap.title, acct: `${LANG === "fr" ? "COMPTE DÉMO" : "DEMO ACCOUNT"} · ${c.broker}`, from: c.recap.from, to: c.recap.to, trades: c.recap.trades }),
      endCard(8, { word: c.word, sub: "&amp; I'll send you the setup" }),
    ],
    coverCss: "",
    fr: { ...WIN_FR, ...(c.fr || {}) },
  };
}
