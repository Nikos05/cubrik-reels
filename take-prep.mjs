// Turn one talking-head take (a person reading the episode script) into a split-screen-ready folder:
// transcribe it, align the words to the 8 script lines, cut the scene boundaries on the real speech,
// and export the voice track + one square face clip per split scene.
// Usage: node take-prep.mjs <episode> <en|fr> <video> [--tempo 1.1] [--full 1,8] [--focus 0.35] [--out assets/takes/<name>]
// Then: REEL_TAKE=<out> ./produce.sh <episode> <lang>
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const [id, lang, src, ...rest] = process.argv.slice(2);
if (!id || !lang || !src) throw new Error("usage: node take-prep.mjs <episode> <en|fr> <video> [--tempo 1.1] [--full 1,8] [--focus 0.35] [--out dir]");
const opt = (k, d) => (rest.includes(k) ? rest[rest.indexOf(k) + 1] : d);
const TEMPO = +opt("--tempo", 1);
const FOCUS = +opt("--focus", 0.35); // vertical position of the face in the source, 0 = top, 1 = bottom
const OUT = opt("--out", `assets/takes/${id}-${lang}`);
const LEAD = 0.08; // cut this long before the first word of a line

const ep = (await import(`./episodes/${id}.mjs`)).default;
const lines = ep.vo[lang];
if (!lines) throw new Error(`episode ${id} has no ${lang} script`);
const N = lines.length;
const FULL = opt("--full", `1,${N}`).split(",").filter(Boolean).map(Number);

const sh = (cmd, args) => execFileSync(cmd, args, { stdio: ["ignore", "pipe", "pipe"] }).toString();
const probe = (f) => parseFloat(sh("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]));
fs.mkdirSync(OUT, { recursive: true });

// 1. normalized take (speed applied to picture and voice together, so lips stay in sync)
const take = path.join(OUT, "take.mp4");
sh("ffmpeg", ["-y", "-v", "error", "-i", src, "-filter_complex",
  `[0:v]setpts=PTS/${TEMPO},scale=1080:-2[v];[0:a]atempo=${TEMPO},aresample=48000[a]`,
  "-map", "[v]", "-map", "[a]", "-r", "30", "-c:v", "libx264", "-crf", "17", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", take]);

// 2. word-level transcript
const wav = path.join(OUT, "full.wav");
sh("ffmpeg", ["-y", "-v", "error", "-i", take, "-vn", "-ac", "1", "-ar", "16000", wav]);
sh("npx", ["--yes", "hyperframes@0.8.191", "transcribe", wav, "--language", lang, "--json"]);
const words = JSON.parse(fs.readFileSync(path.join(OUT, "transcript.json"), "utf8"));

// 3. align spoken words to script words (LCS), so each script line gets the time span it was said in
const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
const script = lines.flatMap((l, li) => l.split(/\s+/).map((w) => ({ w: norm(w), li }))).filter((x) => x.w);
const heard = words.map((w) => ({ w: norm(w.text), start: w.start, end: w.end })).filter((x) => x.w);
const similar = (a, b) => a === b || (a.length > 3 && b.length > 3 && (a.startsWith(b.slice(0, 4)) || b.startsWith(a.slice(0, 4))));
const A = script.length, B = heard.length;
const dp = Array.from({ length: A + 1 }, () => new Int32Array(B + 1));
for (let i = A - 1; i >= 0; i--)
  for (let j = B - 1; j >= 0; j--)
    dp[i][j] = similar(script[i].w, heard[j].w) ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
const span = lines.map(() => ({ start: Infinity, end: -Infinity, hits: 0 }));
for (let i = 0, j = 0; i < A && j < B; ) {
  if (similar(script[i].w, heard[j].w)) {
    const s = span[script[i].li];
    s.start = Math.min(s.start, heard[j].start); s.end = Math.max(s.end, heard[j].end); s.hits++;
    i++; j++;
  } else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
  else j++;
}
// lines nobody matched (skipped or fully improvised): place them between their neighbours
span.forEach((s, k) => {
  if (s.hits) return;
  const prev = span.slice(0, k).reverse().find((x) => x.hits), next = span.slice(k + 1).find((x) => x.hits);
  s.start = prev ? prev.end : 0; s.end = next ? next.start : (heard.at(-1)?.end ?? s.start + 2);
  console.warn(`! line ${k + 1} not found in the take: "${lines[k]}"`);
});

// 4. scene cuts on the speech, take trimmed so scene 1 starts just before the first word
const t0 = Math.max(0, span[0].start - LEAD);
const cuts = span.map((s, k) => (k === 0 ? 0 : +(Math.max(s.start - LEAD - t0, 0)).toFixed(3)));
for (let k = 1; k < N; k++) if (cuts[k] <= cuts[k - 1] + 0.6) cuts[k] = +(cuts[k - 1] + 0.6).toFixed(3);
const speechEnd = +(span[N - 1].end - t0).toFixed(3);
const voice = path.join(OUT, "voice.wav");
sh("ffmpeg", ["-y", "-v", "error", "-ss", String(t0), "-i", take, "-vn", "-ac", "1", "-ar", "48000", voice]);

// 5. one square face clip per split scene (the engine shows it in the bottom 1080x960 panel)
const vlen = probe(take);
const ends = cuts.map((c, k) => (k < N - 1 ? cuts[k + 1] : Math.min(vlen - t0, speechEnd + 0.4)));
const clips = {};
for (let k = 0; k < N; k++) {
  if (FULL.includes(k + 1)) continue;
  const f = path.join(OUT, `clip${String(k + 1).padStart(2, "0")}.mp4`);
  sh("ffmpeg", ["-y", "-v", "error", "-ss", (t0 + cuts[k]).toFixed(3), "-i", take, "-t", (ends[k] - cuts[k]).toFixed(3), "-an",
    "-vf", `scale=1080:-2,crop=1080:min(ih\\,1080):0:max(0\\,min(ih-1080\\,ih*${FOCUS}-540))`, "-r", "30", "-c:v", "libx264", "-crf", "17", "-pix_fmt", "yuv420p", f]);
  clips[k + 1] = f;
}

const timing = { episode: id, lang, tempo: TEMPO, t0: +t0.toFixed(3), cuts, speechEnd, clips, voice, matched: span.map((s) => s.hits) };
fs.writeFileSync(path.join(OUT, "timing.json"), JSON.stringify(timing, null, 2));
lines.forEach((l, k) => console.log(`${String(k + 1).padStart(2)} ${cuts[k].toFixed(2)}s ${clips[k + 1] ? "split" : "full "} ${span[k].hits ? "✓" : "?"} ${l}`));
console.log(`speech ends at ${speechEnd}s → ${OUT}/timing.json`);
