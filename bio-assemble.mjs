// Builds assets/raw-<id>-fr/vo01..08.wav for the "lien en bio" series from the voice bank (lib/bio-specs.mjs).
import { SPECS, TEMPLATES } from "./lib/bio-specs.mjs";
import fs from "fs";
const B = "assets/vo-bank-fr";
for (const s of SPECS) {
  const d = `assets/raw-${s.id}-fr`; fs.rmSync(d, { recursive: true, force: true }); fs.mkdirSync(d, { recursive: true });
  const v = s.tpl === "WIN" ? "M" : s.voice;
  const keys = s.tpl === "WIN" ? TEMPLATES.WIN : [...TEMPLATES[s.tpl], "CTA"];
  fs.copyFileSync(`${B}/hooks/${s.id}.wav`, `${d}/vo01.wav`);
  keys.forEach((k, i) => fs.copyFileSync(`${B}/${v}/${k}.wav`, `${d}/vo0${i + 2}.wav`));
}
console.log("assembled", SPECS.length);
