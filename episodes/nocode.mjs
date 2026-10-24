// Series: "you don't need to code" -> describe the strategy in words, Claude builds the agent.
import { hookCode, connect, describe, skills, backtest, broker, confirm, endCard } from "../lib/scenes.mjs";
import { LANG } from "../lib/core.mjs";

export default {
  id: "nocode",
  vo: {
    en: [
      "Building a trading bot used to mean hundreds of lines of code. Not anymore.",
      "You connect cubrik to Claude.",
      "You describe your strategy in plain English, and Claude turns it into an agent.",
      "Or you start from a ready-made Claude skill.",
      "It backtests it on years of TradingView data.",
      "You link your broker in one message.",
      "And nothing goes live without your OK.",
      "Comment BOT, and I'll send you the setup.",
    ],
    fr: [
      "Avant, créer un bot de trading, c'était des centaines de lignes de code. C'est fini.",
      "Tu connectes cubrik à Claude.",
      "Tu décris ta stratégie en français, et Claude en fait un agent.",
      "Ou tu pars d'un skill de Claude déjà prêt.",
      "Il la backteste sur des années de données TradingView.",
      "Tu relies ton broker en un message.",
      "Et rien ne passe en live sans ton accord.",
      "Commente bot, et je t'envoie le setup.",
    ],
  },
  trans: [null, "zoom", "whipL", "stripes", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    hookCode(1, { l1: "NO NEED TO", l2: "KNOW HOW TO CODE" }),
    connect(2),
    describe(3, { l1: "JUST DESCRIBE IT", l2: "IN PLAIN WORDS" }),
    skills(4, { l1: "OR START FROM", l2: "A CLAUDE SKILL" }),
    backtest(5, { l1: "BACKTESTED", l2: "ON YEARS OF DATA" }),
    broker(6),
    confirm(7, { l1: "NOTHING GOES LIVE", l2: "WITHOUT YOUR OK" }),
    endCard(8, { word: "BOT" }),
  ],
  coverCss: `#cv .hcodeWrap{top:-40px;transform:scale(.8);transform-origin:50% 0}#cv .hero{top:690px;gap:14px}#cv .hl1,#cv .hl2,#cv .hcLn,#cv .hcStamp{opacity:1}#cv .hcBody{opacity:.25}#cv .hcStamp{transform:rotate(-8deg)}#cv .mHN{display:none}`,
  fr: {
    "NO NEED TO": "PAS BESOIN DE", "KNOW HOW TO CODE": "SAVOIR CODER", "0 LINES OF CODE": "0 LIGNE DE CODE",
    "JUST DESCRIBE IT": "DÉCRIS-LA", "IN PLAIN WORDS": "EN FRANÇAIS",
    "buy gold when RSI drops under 30 on the 1h, 1% risk": "achète l'or quand le RSI passe sous 30 en 1h, 1 % de risque",
    "OR START FROM": "OU PARS D'UN", "A CLAUDE SKILL": "SKILL CLAUDE",
    "BACKTESTED": "BACKTESTÉE", "ON YEARS OF DATA": "SUR DES ANNÉES DE DONNÉES",
  },
};
