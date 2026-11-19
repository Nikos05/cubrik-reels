// Captions + posting slots for the "lien en bio" series → bio-schedule.json (no Claude mention).
import { SPECS } from "./lib/bio-specs.mjs";
import fs from "fs";
const BODY = {
  T1: "Tu relies ton broker, tu écris ta stratégie avec tes mots, cubrik la backteste puis en fait un agent qui trade pour toi.\nStop loss sur chaque trade. Rien ne passe en live sans ton accord.",
  T2: "Colle une vidéo YouTube de stratégie : cubrik en extrait chaque règle, la teste sur des années de données et la fait tourner sur un compte démo gratuit.",
  T3: "Choisis une stratégie déjà testée dans la bibliothèque cubrik, regarde son backtest, puis reçois chaque semaine l'analyse de tes trades.",
  WIN: "Une stratégie précise, écrite en une phrase. Le prix revient dans ma zone, l'IA entre avec stop loss et take profit déjà placés.",
};
const TAGS = { GOLD: "#or #xauusd", BTC: "#bitcoin #crypto", SOL: "#solana #crypto", ETH: "#ethereum #crypto", EUR: "#forex #eurusd", NAS: "#nasdaq #bourse" };
const slots = ["12:30", "18:30", "21:30"];
const out = SPECS.map((s, i) => {
  const day = 18 + Math.floor(i / 3), market = s.tpl === "WIN" ? s.pair : s.strat;
  const emoji = s.tpl === "WIN" ? "😴" : s.voice === "F" ? "🌙" : "🧡";
  const disc = s.tpl === "WIN" ? "Compte démo, montants illustratifs. Pas un conseil financier. Les performances passées ne préjugent pas des résultats futurs." : "Pas un conseil financier. Le trading comporte un risque de perte.";
  const first = s.tpl === "WIN" ? `+${s.pnl} $ ${s.hook.join(" ").toLowerCase()} (compte démo)` : s.line;
  const caption = `${first} ${emoji}\n\n${BODY[s.tpl]}\n\nLien en bio pour tester gratuitement en démo 👆\n\n${disc}\n\n#trading ${TAGS[market]} #ia #tradingauto #cubrik`;
  return { id: s.id, scheduledAt: `2026-11-${day}T${slots[i % 3]}:00+01:00`, caption };
});
fs.writeFileSync("bio-schedule.json", JSON.stringify(out, null, 1));
console.log(out.length, out[0].scheduledAt, out.at(-1).scheduledAt); console.log(out[1].caption);
