// Persona reel: Busy professionals / wealthy: two minutes, funds never move. Voice: Algenib. See .claude/skills/cubrik-reels/references/audiences.md
import { hookTV, hookNotifs, hookChat, hookSafe, hookCode, hookVs, hookLoss, hookFeed, brokerGrid, connect, describe, backtest, analytics, library, broker, guardrails, confirm, live, endCard } from "../lib/scenes.mjs";
import { LANG } from "../lib/core.mjs";

export default {
  id: "busy",
  voice: "Algenib",
  vo: {
    en: [
      "No time to trade? Your agent has all the time in the world.",
      "I connect cubrik to Claude, in two minutes.",
      "I copy a strategy that comes with its backtest.",
      "I link my broker in thirty seconds.",
      "My money stays at my broker. cubrik can't withdraw anything.",
      "I approve it with one tap.",
      "And I get a notification on every trade.",
      "Comment TIME, and I'll send you the setup."
    ],
    fr: [
      "Tu n'as pas le temps de trader ? Ton agent, lui, a tout son temps.",
      "Je connecte cubrik à Claude, en deux minutes.",
      "Je copie une stratégie qui a déjà son backtest.",
      "Je relie mon broker en trente secondes.",
      "Mon argent reste chez mon broker. cubrik ne peut rien retirer.",
      "Je valide en un tap.",
      "Et je reçois une notification à chaque trade.",
      "Commente TEMPS, et je t'envoie le setup."
    ],
  },
  trans: [null, "zoom", "whipL", "stripes", "whipU", "zoom", "whipL", "zoom"],
  scenes: () => [
    hookChat(1, { l1: "NO TIME?", l2: "YOUR AGENT HAS", ask: "run my trading while I am in meetings" }),
    connect(2, { l1: "2 MINUTES", l2: "FROM CLAUDE" }),
    library(3),
    broker(4, { l1: "YOUR BROKER", l2: "IN 30 SECONDS" }),
    hookSafe(5, { hero: false, l1: "YOUR MONEY", l2: "NEVER MOVES" }),
    confirm(6, { l1: "ONE TAP", l2: "AND IT RUNS" }),
    live(7, { l1: "ONE NOTIFICATION", l2: "PER TRADE", main: "✅ Take profit hit · +2R", nsub: "Gold London sweep closed XAU/USD", title: "Gold London sweep", pnl: "+2R", notif: 1.5 }),
    endCard(8, { word: LANG === "fr" ? "TEMPS" : "TIME" }),
  ],
  coverCss: `#cv .hcStage{top:30px;transform:scale(.8);transform-origin:50% 0}#cv .hero{top:690px;gap:14px}#cv .hl1,#cv .hl2,#cv .uBubble,#cv .reply,#cv .hcL{opacity:1}#cv .ch{display:inline!important}#cv .cursor{display:none}`,
  fr: {"NO TIME?": "PAS LE TEMPS ?", "YOUR AGENT HAS": "TON AGENT, SI", "run my trading while I am in meetings": "gère mon trading pendant mes réunions", "2 MINUTES": "2 MINUTES", "FROM CLAUDE": "DEPUIS CLAUDE", "YOUR BROKER": "TON BROKER", "IN 30 SECONDS": "EN 30 SECONDES", "YOUR MONEY": "TON ARGENT", "NEVER MOVES": "NE BOUGE PAS", "ONE TAP": "UN TAP", "AND IT RUNS": "ET ÇA TOURNE", "ONE NOTIFICATION": "UNE NOTIFICATION", "PER TRADE": "PAR TRADE", "✅ Take profit hit · +2R": "✅ Take profit touché · +2R", "Gold London sweep closed XAU/USD": "Gold London sweep a clôturé XAU/USD"},
};
