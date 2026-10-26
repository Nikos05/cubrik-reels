// Result-first series #1: gold, London sweep, take profit while asleep (MetaTrader 5, demo account).
import { winEpisode } from "../lib/win-episode.mjs";
export default winEpisode({
  id: "goldwin", pair: "XAU/USD", side: "LONG", tf: "1H", broker: "METATRADER 5", when: "03:58",
  pnl: 1240, pnlTxt: "1,240.00", nsub: "Gold London Sweep closed XAU/USD long",
  hook: ["WHILE I WAS", "ASLEEP"],
  prompt: "buy gold when London sweeps the Asian low and reclaims it, 1% risk, 2R target",
  rules: [["MARKET", "XAU/USD · 1h"], ["ENTRY", "Sweep of Asian low + reclaim"], ["EXIT", "TP 2R · SL under the swing"], ["RISK", "1% per trade"]],
  name: "GOLD LONDON SWEEP",
  entry: "4,172", sl: "4,151", tp: "4,214",
  zone: ["3 AM: PRICE BACK", "IN MY ZONE"], order: ["SL + TP SET", "AUTOMATICALLY"], hit: ["2 HOURS LATER", "TAKE PROFIT HIT"],
  recap: { title: "This week", l1: "THIS WEEK", l2: "+$3,480 · 0 CLICKS", from: 10000, to: 13480,
    trades: [["XAU/USD", "LONG · TP", "+$1,240.00"], ["EUR/USD", "SHORT · TP", "+$1,612.50"], ["XAU/USD", "LONG · SL", "−$412.00"], ["GBP/USD", "LONG · TP", "+$1,039.50"]] },
  word: "GOLD",
  fr: {"WHILE I WAS": "PENDANT QUE", "ASLEEP": "JE DORMAIS", "buy gold when London sweeps the Asian low and reclaims it, 1% risk, 2R target": "achète l'or quand Londres balaie le plus bas asiatique puis le reprend, 1 % de risque, objectif 2R", "Sweep of Asian low + reclaim": "Sweep du plus bas asiatique + reprise", "TP 2R · SL under the swing": "TP 2R · SL sous le swing", "3 AM: PRICE BACK": "3 H DU MATIN : RETOUR", "IN MY ZONE": "DANS MA ZONE", "SL + TP SET": "SL + TP PLACÉS", "AUTOMATICALLY": "AUTOMATIQUEMENT", "2 HOURS LATER": "2 HEURES PLUS TARD", "+$3,480 · 0 CLICKS": "+3 480 $ · 0 CLIC", "Gold London Sweep closed XAU/USD long": "Gold London Sweep a clôturé le long XAU/USD"},
  voFr: [
    "Plus mille deux cent quarante dollars. Pendant que je dormais.",
    "Voilà exactement comment. J'ai connecté cubrik à Claude.",
    "Je lui ai donné une stratégie précise sur l'or, en une phrase.",
    "À trois heures du matin, le prix est revenu pile dans ma zone.",
    "L'IA a acheté aussitôt. Stop loss et take profit, placés automatiquement.",
    "Deux heures plus tard, le prix a touché mon objectif. Take profit.",
    "Cette semaine : plus trois mille quatre cent quatre-vingts dollars. L'IA a tout exécuté.",
    "Commente gold, et je t'envoie la stratégie."
  ],
  vo: [
    "Plus twelve hundred forty dollars. While I was asleep.",
    "Here's exactly how. I connected cubrik to Claude.",
    "I gave it one precise gold strategy, in plain English.",
    "At three AM, the price came back right into my zone.",
    "The AI bought instantly. Stop loss and take profit, set automatically.",
    "Two hours later, the price hit my target. Take profit.",
    "This week: plus thirty-four hundred dollars. The AI executed everything.",
    "Comment gold, and I'll send you the strategy.",
  ],
});
