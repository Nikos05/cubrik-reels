# cubrik art direction

Format 1080×1920 (9:16), 30 fps. Cover 1080×1080. All of this is already encoded in `lib/base-css.mjs` —
reuse its classes instead of re-declaring values.

| Token | Value |
|---|---|
| Background | paper `#F3EEE5` + thin grid + soft peach / lavender washes |
| Cards | `#FFFDF9`, rounded 28–36 px, warm soft shadow |
| Ink | `#161514` (text), muted `#5c564d` / `#8B8579` |
| Accent | violet `#7C3AED` (keyword label, highlights, buttons) — lavender `#C4B5FD` for fills |
| Positive / negative | green `#16A34A` / red `#DC2626` (use red only for "blocked" moments, never for results) |
| Headlines | Poppins 800, very large (hook ≥ 150 px), 2 lines max |
| Body / chat text | Poppins 500–600; Lora italic for the occasional human aside |
| Labels | JetBrains Mono, UPPERCASE, letter-spaced: black main label + violet keyword label, top of every scene (`labels(l1, l2)`) |

## Layout rules
- **Safe area:** the engine wraps every full-screen scene in `.safe` (scale .84): tall phones crop ~90 px per side on
  TikTok/Reels, plus the right-side buttons. Never design to the canvas edge; keep cards ≤ 960 px wide.
- **Bottom 350 px stay clear** of anything important (Instagram UI). Top ~200 px holds the labels.
- **Pixel cube mascot in every scene** (`mascot()`), small, reacting (bounce / look / jump).
- Real logos only (`assets/logos/`: claude, binance, mt5, hyperliquid, youtube, tradingview). Use the real
  Claude logo; never invent one, never stretch one.
- Chat moments look like Claude: `chatHead()` (Claude tile + "cubrik connected" pill), user bubble right,
  answer left, typing done with `chars()`.
- Clean: one idea per scene, max ~3 elements on screen, lots of paper around cards.

## Motion
- Camera push-in on `.cam` during each scene, so nothing is ever static.
- Transitions between scenes (`trans` array in the episode, index = scene): `zoom` (zoom + white flash + bass
  impact), `whipL` / `whipU` (velocity-matched whip with RGB-split blur), `stripes` (diagonal violet wipe).
  Alternate them; `zoom` into the CTA.
- Elements enter fast (0.25–0.45 s, `back.out` / `expo.out`), every pop gets a click/pop SFX (the engine
  adds whooshes on transitions automatically; scenes declare their own `sfx`).
- Scene length = its voice line + ~0.15 s. No gaps.
