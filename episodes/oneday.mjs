// US series (feature coming soon): one bad day kills the challenge -> prop firm mode.
import { hookProp, connect, propRules, propGauges, propBlocked, backtest, confirm, endCard } from "../lib/scenes.mjs";

export default {
  id: "oneday",
  vo: {
    en: [
      "One bad day, and your whole prop firm challenge is gone.",
      "So I connected cubrik to Claude.",
      "Told Claude my challenge rules, in one message.",
      "Now every limit is tracked live.",
      "Any trade that would break a rule never gets placed.",
      "Strategies get tested on my exact rules first.",
      "And nothing goes live without my OK.",
      "Comment CHALLENGE for early access.",
    ],
    fr: [
      "Une mauvaise journée, et tout ton challenge prop firm part en fumée.",
      "Alors j'ai connecté cubrik à Claude.",
      "J'ai donné mes règles de challenge à Claude, en un message.",
      "Maintenant, chaque limite est suivie en direct.",
      "Tout trade qui casserait une règle n'est jamais passé.",
      "Les stratégies sont d'abord testées sur mes règles exactes.",
      "Et rien ne passe en live sans mon accord.",
      "Commente CHALLENGE pour l'accès en avant-première.",
    ],
  },
  trans: [null, "zoom", "stripes", "whipL", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    hookProp(1, { l1: "ONE BAD DAY", l2: "CHALLENGE OVER" }),
    connect(2),
    propRules(3, { l1: "TELL CLAUDE", l2: "YOUR CHALLENGE" }),
    propGauges(4, { l1: "EVERY LIMIT", l2: "TRACKED LIVE" }),
    propBlocked(5, { l1: "BREAKS A RULE?", l2: "NEVER PLACED" }),
    backtest(6, {
      l1: "TESTED ON", l2: "YOUR RULES", sub: "5 YEARS · CHALLENGE RULES ON",
      stats: [["WIN RATE", "58%"], ["MAX DRAWDOWN", "4.1%"], ["RULES BROKEN", "0", "pos"]],
    }),
    confirm(7, { l1: "NOTHING GOES LIVE", l2: "WITHOUT YOUR OK", title: "Start challenge mode?", line1: "Max daily loss 5% · Max drawdown 10%", line2: "Enforced on every agent" }),
    endCard(8, { word: "CHALLENGE", sub: "&amp; get early access" }),
  ],
  coverCss: `#cv .propHookStage{top:-170px;transform:scale(.85);transform-origin:50% 50%}#cv .hero{top:690px;gap:14px}#cv .hl2,#cv .stamp{opacity:1}#cv .stamp{transform:rotate(-12deg)}#cv .phFill{transform:scaleX(.78)}`,
  fr: {"ONE BAD DAY": "UNE MAUVAISE JOURNÉE", "CHALLENGE OVER": "CHALLENGE TERMINÉ"},
};
