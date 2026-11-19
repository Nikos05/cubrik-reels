// TikTok FR (Paulito) — reprise du hook « J'ai gagné X pendant que je dormais » (compte démo, montant illustratif), CTA lien en bio.
import { winEpisode } from "../lib/win-episode.mjs";
export default winEpisode({
  id: "dodowin", pair: "XAU/USD", side: "LONG", tf: "1H", broker: "METATRADER 5", when: "04:52",
  pnl: 347, pnlTxt: "347.00", nsub: "Gold Asia Reclaim closed XAU/USD long",
  hook: ["WHILE I WAS", "ASLEEP"], bio: true,
  prompt: "buy gold when it dips under the Asia low and closes back above it, 1% risk, 2R target",
  rules: [["MARKET", "XAU/USD · 1h"], ["ENTRY", "Dip under Asia low + close back above"], ["EXIT", "TP 2R · SL under the wick"], ["RISK", "1% per trade"]],
  name: "GOLD ASIA RECLAIM",
  entry: "4,186", sl: "4,177", tp: "4,204",
  zone: ["4 AM: PRICE BACK", "IN MY ZONE"], order: ["SL + TP SET", "AUTOMATICALLY"], hit: ["1 HOUR LATER", "TAKE PROFIT HIT"],
  recap: { title: "This week", l1: "AND ME?", l2: "I WAS ASLEEP · 0 CLICKS", from: 10000, to: 10913,
    trades: [["XAU/USD", "LONG · TP", "+$347.00"], ["XAU/USD", "SHORT · SL", "−$174.00"], ["XAU/USD", "LONG · TP", "+$396.00"], ["XAU/USD", "LONG · TP", "+$344.00"]] },
  word: "BIO",
  fr: {"WHILE I WAS": "PENDANT QUE", "ASLEEP": "JE DORMAIS", "buy gold when it dips under the Asia low and closes back above it, 1% risk, 2R target": "achète l'or quand il passe sous le plus bas asiatique puis reclôture au-dessus, 1 % de risque, objectif 2R", "Dip under Asia low + close back above": "Passage sous le plus bas asiatique + reprise", "TP 2R · SL under the wick": "TP 2R · SL sous la mèche", "4 AM: PRICE BACK": "4 H DU MATIN : RETOUR", "IN MY ZONE": "DANS MA ZONE", "SL + TP SET": "SL + TP PLACÉS", "AUTOMATICALLY": "AUTOMATIQUEMENT", "1 HOUR LATER": "1 HEURE PLUS TARD", "AND ME?": "ET MOI ?", "I WAS ASLEEP · 0 CLICKS": "JE DORMAIS · 0 CLIC", "Gold Asia Reclaim closed XAU/USD long": "Gold Asia Reclaim a clôturé le long XAU/USD"},
  voFr: [
    "J'ai gagné trois cent quarante-sept dollars pendant que je dormais. Sur mon compte démo.",
    "Voilà exactement comment. J'ai connecté cubrik à Claude.",
    "Je lui ai donné ma stratégie sur l'or, en une phrase.",
    "À quatre heures du matin, le prix revient pile dans ma zone.",
    "L'IA achète. Stop loss et take profit, placés tout seuls.",
    "Une heure plus tard, take profit.",
    "Et moi ? Je dormais. Zéro clic.",
    "Le lien est dans ma bio. Teste-le gratuitement."
  ],
  vo: ["", "", "", "", "", "", "", ""],
});
