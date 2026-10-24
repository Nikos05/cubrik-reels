// Build one episode into index.html + cover/index.html.
// Usage: REEL_LANG=fr node make.mjs youtube   (VO files in assets/vo-<episode>-<lang>/voNN.wav)
import { build } from "./lib/core.mjs";

const id = process.argv[2];
if (!id) throw new Error("usage: node make.mjs <episode>");
const ep = (await import(`./episodes/${id}.mjs`)).default;
build(ep);
