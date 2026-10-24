# Split-screen with a person (UGC)

Top half = the usual cubrik scene (scaled to fit), bottom half = a person talking (1080×960 panel).
Hook and end card stay full screen by default; the person is never shown full screen.
Pick the case from what the employee gives you:

| They give you | Case | Voice comes from |
|---|---|---|
| A video of themselves (or a colleague) reading the script | **A. Filmed take** | their real voice |
| A photo of an AI avatar | **B. AI avatar** | Flora Algenib lines |
| Nothing | Full motion (normal workflow) | Flora Algenib lines |

## A. Filmed take (human)

1. The script is the episode's `vo.<lang>` (8 lines). Write the episode first, then give the person the
   8 lines to read **in one take**, face camera, phone is fine (vertical or square), quiet room,
   short pause between lines. Small improvisations are fine: alignment is word-based.
2. Put the file anywhere (e.g. `assets/takes/raw/<name>.mp4`) and run:
   ```bash
   node take-prep.mjs <episode> <en|fr> <video> [--tempo 1.1] [--full 1,8] [--focus 0.35]
   ```
   - transcribes the take, aligns the words to the 8 lines, cuts each scene ~0.08 s before its first word;
   - `--tempo` speeds picture + voice together (1.0–1.15 for humans; lips stay in sync);
   - `--full` = scenes shown full screen (voice continues, face hidden), default hook + end card;
   - `--focus` = where the face is vertically in the source (0 top … 1 bottom) for the square crop.
   It prints one line per scene with ✓, or `?` + a warning when a line was not found (skipped or rephrased):
   if a `?` appears, either re-record that line or edit `vo.<lang>` to what was actually said and rerun.
3. Render: `REEL_TAKE=assets/takes/<episode>-<lang> ./produce.sh <episode> <lang>` →
   `renders/cubrik-<episode>-<lang>-take.mp4`.
4. Check frames (face well framed in the bottom panel, no scene cut mid-word) before handing it over.

Consent: only footage of people who filmed themselves for this and agreed to appear. Keep raw takes out of
git (`assets/takes/` is ignored).

## B. AI avatar

The avatar must be AI-generated (never a photo of a real person without their consent) and **disclosed**:
Instagram "AI info" label on every post + a line in the bio.

1. Generate the Algenib lines as usual but keep them at **natural speed**, and add **0.5 s of silence at the
   start** of each line (fixes the first word's lip sync).
2. For each split scene, make a talking clip with Higgsfield **Wan 2.7** (audio-driven talking video) from a
   **square** photo of the avatar (outpaint the photo first if the face is too tight — "too zoomed" was the
   feedback). Save as `assets/ugc/<ep>-<lang>/rawNN.mp4` (NN = scene number).
3. `./ugc-prep.sh assets/ugc/<ep>-<lang> 1.28` (EN: 1.25) cuts the lead-in and speeds picture + voice by the
   same factor as the voiceover → `clipNN.mp4`.
4. Map them in the episode: `ugc: process.env.REEL_UGC ? { fr: { 2: "assets/ugc/<ep>-fr/clip02.mp4", … } } : null`
   (see `episodes/youtube.mjs`), then `UGC=1 ./produce.sh <episode> <lang>` → `…-ugc.mp4`.

Alternative for B: generate one long avatar video of the whole script and treat it as a filmed take (case A),
if the avatar tool supports clips that long.

## Pauline (AI avatar, English, Instagram paulinee.ia)

- Voice: Flora `Gacrux` (`en-US` / `fr-FR`), same acting prompt as Algenib but female. Raw lines in `assets/raw-<ep>-<lang>/`
  (the older Algenib takes of tradingview/propfirm EN are kept in `assets/raw-<ep>-en-algenib/`).
- Start image: Higgsfield job `83ba8e9f-b665-4b3e-9e79-aed50cdcd8e5` (square, waist-up, buttoned white shirt, orange wall).
  Reuse it as `start_image` for every Wan 2.7 clip so she always looks the same.
- Lesson: Higgsfield flags revealing photos as NSFW (outpaint and Wan both refuse). Crop to the face, then regenerate a
  zoomed-out, brand-safe start image with `gpt_image_2_5` + the crop as reference ("same woman, keep face/glasses/hair").
- Episodes wired for her: `launch` (fr + en, 6 split scenes), `nocode`, `tradingview`, `propfirm` (en, 5 split scenes).
  Render: `./ugc-prep.sh assets/ugc/<ep>-<lang> 1.25` (fr: 1.28) then `UGC=1 ./produce.sh <ep> <lang>`.
- TradingView / prop firm EN use "Comment X for early access" + end card "& get early access" (features not live yet).
