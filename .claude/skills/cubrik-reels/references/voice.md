# Voice (Flora → Gemini TTS)

Two house voices, same register (calm, warm, trustworthy, controlled emotion):
- **Algenib** — male, default (`voice: "Algenib"` in the episode).
- **Gacrux** — female, chosen by the team on 2026-10-24 after testing Sulafat, Gacrux, Kore, Despina
  (`voice: "Gacrux"`). Use it for empathy-led personas (lost money, beginners, small budget, 18–24, crypto)
  and to alternate on the feed. Prompt: replace "a French man in his thirties with a deep, warm, grounded voice"
  by **"a French woman in her thirties with a warm, grounded, slightly low voice"**, rest identical.

Flora call (`flora_create_generations`), one generation per line:
- model: `t2a-gemini-3-1-flash-tts`
- `voice_name: "Algenib"`, `language_code: "en-US"` or `"fr-FR"`
- prompt (keep it exactly, change only "French"/"American" and the line):

> Say this like a French man in his thirties with a deep, warm, grounded voice. Calm confidence, serious and
> trustworthy, controlled excitement and real emotion. Steady natural pace, no long pauses: <LINE>

Write "cubrik" in the line; if the model says "Qubric/Cubric" badly, retry once before rewording.

Known pronunciation traps (seen in QA, fix by rewording rather than instructing):
- "Avec cubrik connecté à Claude" → often "QRIC … Cloud". Use "Tu connectes cubrik à Claude" / "Connecte cubrik à Claude".
- "trading IA" → heard as "trading I". Say "trading avec une IA".
- CTA words in capitals get spelled out ("B-O-T"): write them lowercase in the spoken line ("Commente bot").
- "skills Claude" → "skills Cloud": say "les skills de Claude".
- Batch at most 20 generations per call; download URL is predictable:
  `https://media.flora.ai/node-inputs/<date>/<workspace-folder>/gen-<run id without run_>-0.wav`.

## Save + QA
1. Download each result to `assets/raw-<episode>-<lang>/vo01.wav … vo08.wav` (order = scene order).
2. Transcribe each line:
   `npx hyperframes@0.8.191 transcribe assets/raw-<ep>-<lang>/vo03.wav --language fr --json`
   and compare with the script. Regenerate any take with a repeated phrase, an extra word at the start
   ("on cap…"), a wrong brand name ("Cloud", "Qubric") or a cut ending.
3. Don't speed it up yourself: `produce.sh` trims silences, tightens pauses and applies ×1.25 (EN) / ×1.28 (FR).

Flora is queued: launch all lines, then poll `flora_list_generations` one call at a time, ≥15 s apart.
Prices are quoted in USD — tell the person the cost before launching a batch.
