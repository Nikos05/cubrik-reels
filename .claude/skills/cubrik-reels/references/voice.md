# Voice (Flora → Gemini TTS, voice "Algenib")

The house voice is **Algenib** for both English and French: deep, warm, calm, trustworthy man.

Flora call (`flora_create_generations`), one generation per line:
- model: `t2a-gemini-3-1-flash-tts`
- `voice_name: "Algenib"`, `language_code: "en-US"` or `"fr-FR"`
- prompt (keep it exactly, change only "French"/"American" and the line):

> Say this like a French man in his thirties with a deep, warm, grounded voice. Calm confidence, serious and
> trustworthy, controlled excitement and real emotion. Steady natural pace, no long pauses: <LINE>

Write "cubrik" in the line; if the model says "Qubric/Cubric" badly, retry once before rewording.

## Save + QA
1. Download each result to `assets/raw-<episode>-<lang>/vo01.wav … vo08.wav` (order = scene order).
2. Transcribe each line:
   `npx hyperframes@0.8.191 transcribe assets/raw-<ep>-<lang>/vo03.wav --language fr --json`
   and compare with the script. Regenerate any take with a repeated phrase, an extra word at the start
   ("on cap…"), a wrong brand name ("Cloud", "Qubric") or a cut ending.
3. Don't speed it up yourself: `produce.sh` trims silences, tightens pauses and applies ×1.25 (EN) / ×1.28 (FR).

Flora is queued: launch all lines, then poll `flora_list_generations` one call at a time, ≥15 s apart.
Prices are quoted in USD — tell the person the cost before launching a batch.
