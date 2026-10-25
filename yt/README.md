# cubrik — official YouTube video (EN, 16:9, 4K)

An AI presenter speaks for cubrik ("we built…") in a bright studio, cut between two cameras, with full-screen
recreations of app.cubrik.ai between the presenter lines. Script: `SCRIPT.md`. Lines, in order: `takes.mjs`.

## Files

| File | Role |
| --- | --- |
| `takes.mjs` | Every line: `cam` A (front) / B (45°, eyes on the main camera) / D (demo voice-over) / P (iPhone), `scene` for demos |
| `build-full.mjs` | Builds `index.html` (transparent graphics overlay + all audio) and `assets/full/timeline.json` |
| `produce-full.py` | Renders the overlay (ProRes 4444, 4K), builds the frame-exact base track, composites, mixes music, loudness |
| `check-sync.py` | After a render: checks every voice sits where its lips are (0 ms expected), `python3 check-sync.py [file]` |
| `preview-hook.py` | Fast 1080p preview of the hook (up to h5) for validation before the full render |
| `thumb/`, `thumb2/` | YouTube thumbnails (A-D, then Higgsfield-style E-G), snapshot at 0.5 s steps then exported 1280x720 |
| `build.mjs`, `produce.sh` | The original 10 s test pipeline |

## Presenter takes (cam A / B)

1. Voice: Flora `t2a-gemini-3-1-flash-tts`, voice Algenib, en-US. Trim silence; hook lines are sped up ×1.20 (`atempo`).
2. Take mp3 = voice + `adelay=400` + `apad=0.3`, uploaded to Higgsfield.
3. Seedance 2.5 `omni_reference`, 1080p, `bitrate_mode` high, no audio, start image A or B, take mp3 as audio reference.
   Calm prompt: "real unedited footage from a static tripod camera… understated delivery".
4. Flora `av2v-lipsync-2-pro` (video + take mp3): raw Seedance lips lag and drop syllables, this pass fixes it.
5. Import to Higgsfield, Topaz 2160p → `assets/ugc/yt/full/ls<id>-4k.mp4`.
6. `assets/full/take<id>.wav` = take mp3 read from 0.3 s; the footage is also read from 0.3 s.

Demo lines (cam D / P) only need the voice: `assets/full/vo<id>.wav`.

## Render

```bash
python3 produce-full.py            # full render, ~25 min
python3 produce-full.py --skip-overlay   # reuse ../renders/yt-full-overlay.mov
```

Output: `../renders/cubrik-youtube-full.mp4` (4K, -14 LUFS). The body plays x1.20 (`SPEED`), the hook lines are voiced
x1.20 already and play at native speed (`HOOK`). Always finish with `python3 check-sync.py`.

## Lessons

- The presenter never goes through the browser capture (it softens the picture): HyperFrames renders graphics only,
  ffmpeg lays them over the footage.
- Base segment boundaries come from the absolute timeline (`round(start * 30)`), so rounding never drifts.
- The overlay audio has timestamp holes where nothing plays. `aresample=async=1` fills them; without it players skip
  the hole and the voice runs ahead of the lips until the next seek.
- Picture and sound never share an ffmpeg graph: with an audio branch next to the 4K video branch, ffmpeg shifted the
  sound by ~3 s at the first cut. Voice is decoded alone, sped and mixed alone, AAC-encoded alone, then muxed with `-c copy`.
- A voice must never outlive its segment on the same track: HyperFrames drops the next voice when two overlap
  (v9 lost "No more hours…"). Voices are capped to their segment and alternate tracks 19/20.
- Presenter segments cut the 0.3 s tail padding of the take, so lines follow each other without a blank.
- Music is mixed only in `produce-full.py` (once), ducked under the voice.
- Hook b-roll (night trader / student / trading floor) goes in the base track through `BROLL`, cut on the voice beats.
- Prefix new CSS classes per scene: a generic class (`.st`, `.seg`) silently restyles another scene.
- Jev is not a cubrik model: never say "our own model". Logos: `assets/ai/`.
- Disclose the AI presenter and tick "Altered or synthetic content" on YouTube.
