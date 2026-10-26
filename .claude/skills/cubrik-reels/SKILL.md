---
name: cubrik-reels
description: Produce cubrik.ai Instagram/TikTok Reels (9:16) in the house style — paper background, pixel cube mascot, Claude chat cards, mono labels, velocity-matched transitions — always framed as "connect cubrik to Claude and run everything from Claude". Use whenever someone asks for a cubrik reel, a new feature video, a new hook, an FR/EN version, a split-screen version with their own filmed take or an AI avatar, captions for a cubrik reel, or scheduling cubrik reels on Ravenpost.
---

# cubrik reels

This repo is a video factory. Every reel is an **episode file** (`episodes/<id>.mjs`) built from a
**scene library** (`lib/scenes.mjs`) by a shared **engine** (`lib/core.mjs`), rendered with HyperFrames.
Never hand-edit `index.html` — it is generated. Change the episode, the library or the engine.

Read `references/product.md` (facts, brokers, pricing — the only claims allowed) and `references/audiences.md`
(personas, angles, hook bank) before writing a script, `references/style.md` before writing anything visual, `references/scenes.md` before picking scenes,
`references/voice.md` before generating audio, `references/captions.md` before writing a caption,
and `references/ugc.md` whenever a person should appear (an employee's filmed take or an AI avatar).

## Non-negotiable rules

1. **The story is always: connect cubrik to Claude → do everything from a Claude chat.** Scene 2 is almost
   always `connect`. Feature steps happen inside Claude chat cards (`chatHead()` + `cubrik connected` pill).
2. **Same art direction every time** (see `references/style.md`). Reuse library scenes; when a new scene is
   needed, build it with the existing tokens, card style, label system and mascot — never a new look.
3. **Structure:** 8 scenes, ~24–33 s. Hook (full screen, huge 2-line headline) → connect → 3–4 feature
   beats → proof (backtest / guardrails / live notification) → "nothing goes live without your OK" →
   end card `Comment "WORD"`. One voice line per scene, cut on every line, no dead air.
4. **Compliance:** no profit promises; demo numbers only; "Not financial advice" in every caption;
   unreleased features (prop firm mode — YouTube → agent and TradingView alerts are live) say **"coming soon / bientôt"** and the CTA promises early access, not a setup guide;
   a person on screen (UGC) only with their consent, an AI avatar always disclosed (Instagram "AI info" + bio),
   never a real person's photo animated without consent; never imply
   Anthropic endorses cubrik ("cubrik works with Claude", never "partner/official").
5. **Never publish without the owner's explicit OK.** Ravenpost: create **drafts**; schedule only when asked.

## Workflow for a new reel

1. **Brief → script.** Pick the persona + angle from `audiences.md`, then the feature, language(s), voice and CTA word. Write 8 lines, short and
   spoken (one idea each, 4–14 words). Hook formulas that work: "X just killed Y", "Millions of people
   watch X and never Y", "Your X can now do Y", "Most X fail for one reason: Y".
2. **Pick scenes** from `references/scenes.md`. Add a new factory to `lib/scenes.mjs` (+ CSS in
   `lib/scene-css.mjs`) only if nothing fits. Copy an existing episode (`episodes/youtube.mjs`) as template:
   `vo.en`, `vo.fr`, `trans`, `scenes()`, `coverCss`, `fr`. Shared French UI strings live in `lib/fr-common.mjs`;
   the episode's `fr` only adds its own labels/texts. CTA word per language: `word: LANG === "fr" ? "RÈGLES" : "RULES"`.
3. **Voice** (Flora, voice Algenib, Gemini TTS) — exact settings in `references/voice.md`. Save each line as
   `assets/raw-<id>-<lang>/vo01.wav … vo08.wav`. Transcribe every line and regenerate any line with a
   repeated phrase, missing word or garbled start before going further.
4. **Build + render:** `./produce.sh <id> <en|fr>` (tightens pauses, speeds voice ×1.25 EN / ×1.28 FR, builds,
   runs `hyperframes check`, renders, normalizes to −14 LUFS, exports the 1080×1080 cover) →
   `renders/cubrik-<id>-<lang>.mp4` + `-cover.png`.
5. **Look at it.** `npx hyperframes snapshot --at <t1>,<t2>,… -o snaps` at the late moment of each scene, and
   read the contact sheet. Fix overflow (long FR strings!), overlaps and empty frames, then re-run produce.
   `check` warnings about the fanned hook cards are expected; anything else gets fixed.
   Someone filmed themselves, or wants an AI avatar? Follow `references/ugc.md` instead of step 3–4.
6. **Caption** with `references/captions.md`.
7. **Ravenpost** (if asked): upload with `create_media_upload` + `curl PUT` + `attach_media`, then
   `create_post` with `type: "REEL"`, `action: "draft"`, `reelCover: {offsetMs: 1700}`. Schedule only on request.

## Commands

```bash
./produce.sh youtube en          # one finished reel
node take-prep.mjs youtube fr me.mp4 && REEL_TAKE=assets/takes/youtube-fr ./produce.sh youtube fr   # with a filmed take
UGC=1 ./produce.sh youtube fr    # with AI-avatar clips (references/ugc.md)
YT=1 ./produce.sh youtube en     # YouTube Shorts version: last line + end card point to the bio and cubrik.ai (no comment-to-DM there)
REEL_LANG=fr node make.mjs youtube && npx hyperframes@0.8.191 preview   # live preview while editing
npx hyperframes@0.8.191 snapshot --at 2,6,10 -o snaps                   # frames to review
```

`build.mjs` is the original launch reel ("Claude just killed day traders"); it predates the engine and is
built with `REEL_LANG=fr node build.mjs` + `./finalize.sh`. New work always goes through the engine.

## Known pitfalls (all hit before)

- zsh: write `${T}` not `$T` before `[`…`]` (`$T[a]` is an array subscript); `${=HF}` to split a command variable.
- Never give a scene element a class that already exists in `lib/base-css.mjs` (`.hl`, `.chip`, `.st`…):
  it inherits that style. Prefix new classes per scene.
- French strings are ~30 % longer: check bubbles, labels and buttons in FR; `chars()` inserts `<wbr>` so typed
  bubbles can wrap when the bubble is `display:block` with a `max-width`.
- Flora runs are queued: poll `flora_list_generations` sequentially (one call at a time, ≥15 s apart), or
  download the predictable result URL in a background loop.
- GSAP `fromTo` renders its "from" state immediately: overlays that start hidden need `immediateRender:false`.
