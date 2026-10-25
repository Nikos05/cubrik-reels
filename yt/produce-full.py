#!/usr/bin/env python3
"""Full YouTube video: presenter footage + transparent graphics overlay -> ../renders/cubrik-youtube-full.mp4 (4K).

Inputs (in ../assets/ugc/yt/full/): lsNN-4k.mp4 = Seedance clip of take NN, lip-synced (Flora Lipsync 2 Pro on
takeNN.mp3) then Topaz 2160p. Each clip starts exactly on its take audio, which itself has a 0.4 s lead-in; the
composition plays the take from 0.3 s, so the footage is read from 0.3 s too.
Steps: build-full.mjs (overlay + timeline) -> HyperFrames ProRes 4444 overlay in 4K -> frame-exact base track
(presenter clips / black under demos) -> composite + light grain + loudness -14 LUFS.
"""
import json, subprocess, sys, os
from pathlib import Path

ROOT = Path(__file__).resolve().parent
FULL = ROOT.parent / "assets/ugc/yt/full"
OUT = ROOT.parent / "renders"
FF = os.path.expanduser("~/.local/bin/ffmpeg")
FPS = 30
env = {**os.environ, "PATH": f"{os.path.expanduser('~/.local/bin')}:{os.path.expanduser('~/.nvm/versions/node/v24.22.0/bin')}:{os.environ['PATH']}"}
run = lambda *a, **k: subprocess.run(a, check=True, env=env, **k)

skip_overlay = "--skip-overlay" in sys.argv
run("node", "build-full.mjs", cwd=ROOT)
tl = json.loads((ROOT / "assets/full/timeline.json").read_text())
total = round(tl[-1]["start"] + tl[-1]["d"], 3)

if not skip_overlay:
    run("npx", "--yes", "hyperframes@0.8.191", "render", "--format", "mov", "--resolution", "4k", "-o", str(OUT / "yt-full-overlay.mov"), "--quiet", cwd=ROOT)

# frame-exact base: boundaries come from the absolute timeline, so rounding never accumulates
# hook b-roll: segment id -> [(clip in FULL, start time inside the segment)]
BROLL = {"h2": [("hk-night.mp4", 0), ("hk-study.mp4", 2.45), ("hk-wall.mp4", 4.3)]}
V = "scale=3840:2160:flags=lanczos:force_original_aspect_ratio=increase,crop=3840:2160,unsharp=5:5:0.4:5:5:0,fps=30"
parts = []
for s in tl:
    f0, f1 = round(s["start"] * FPS), round((s["start"] + s["d"]) * FPS)
    n = f1 - f0
    p = FULL / f"base{s['id']}.mp4"
    if s["id"] in BROLL:
        # full-screen b-roll clips cut at fixed times inside the segment (each clip read from its start)
        cuts = BROLL[s["id"]] + [(None, s["d"])]
        ins, fc = [], []
        for k, (f, at) in enumerate(cuts[:-1]):
            m = round((cuts[k + 1][1] - at) * FPS) if k < len(cuts) - 2 else n - sum(round((cuts[j + 1][1] - cuts[j][1]) * FPS) for j in range(k))
            ins += ["-i", str(FULL / f)]
            fc.append(f"[{k}:v]{V},tpad=stop_mode=clone:stop_duration=2,trim=end_frame={m},setpts=PTS-STARTPTS[v{k}]")
        fc.append("".join(f"[v{k}]" for k in range(len(cuts) - 1)) + f"concat=n={len(cuts) - 1}:v=1:a=0[o]")
        run(FF, "-y", "-v", "error", *ins, "-filter_complex", ";".join(fc), "-map", "[o]", "-frames:v", str(n), "-an",
            "-c:v", "libx264", "-crf", "12", "-preset", "fast", "-pix_fmt", "yuv420p", str(p))
    elif s["cam"] in "AB":
        run(FF, "-y", "-v", "error", "-ss", "0.3", "-i", str(FULL / f"ls{s['id']}-4k.mp4"), "-an", "-vf", f"{V},tpad=stop_mode=clone:stop_duration=2",
            "-frames:v", str(n), "-c:v", "libx264", "-crf", "12", "-preset", "fast", "-pix_fmt", "yuv420p", str(p))
    else:
        run(FF, "-y", "-v", "error", "-f", "lavfi", "-i", "color=c=black:s=3840x2160:r=30", "-frames:v", str(n), "-c:v", "libx264", "-crf", "12", "-pix_fmt", "yuv420p", str(p))
    parts.append(p)
(FULL / "concat.txt").write_text("".join(f"file '{p}'\n" for p in parts))
run(FF, "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", str(FULL / "concat.txt"), "-c", "copy", str(OUT / "yt-full-base.mp4"))

comp = OUT / "yt-full-comp.mp4"
# music bed (Lyria) looped under everything, ducked by the voice + sfx track.
# The overlay audio has timestamp holes where nothing plays: aresample async fills them with silence, otherwise players
# skip the hole and the sound runs ahead of the lips until the next seek.
music = FULL / "music-src.mp3"
af = (f"[2:a]aresample=48000:async=1:first_pts=0,atrim=0:{total},afade=t=in:d=1.5,afade=t=out:st={total - 3}:d=3,volume=0.11[m];"
      "[1:a]aresample=48000:async=1:first_pts=0,asplit[voice][key];[m][key]sidechaincompress=threshold=0.02:ratio=10:attack=20:release=400[duck];"
      "[voice][duck]amix=inputs=2:normalize=0[a]")
run(FF, "-y", "-v", "error", "-i", str(OUT / "yt-full-base.mp4"), "-i", str(OUT / "yt-full-overlay.mov"), "-stream_loop", "-1", "-i", str(music),
    "-filter_complex", "[0:v][1:v]overlay=0:0:format=auto,noise=alls=2:allf=t,format=yuv420p[v];" + af,
    "-map", "[v]", "-map", "[a]", "-t", str(total), "-c:v", "libx264", "-crf", "19", "-preset", "slow", "-tune", "film", "-c:a", "aac", "-b:a", "192k", str(comp))
m = subprocess.run([FF, "-hide_banner", "-i", str(comp), "-af", "loudnorm=I=-14:TP=-2.0:LRA=11:print_format=json", "-f", "null", "-"], capture_output=True, text=True, env=env).stderr
j = json.loads(m[m.rindex("{"): m.rindex("}") + 1])
final = OUT / "cubrik-youtube-full.mp4"
run(FF, "-y", "-v", "error", "-i", str(comp), "-c:v", "copy", "-af",
    f"loudnorm=I=-14:TP=-2.0:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true,aresample=48000:async=1:first_pts=0",
    "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-movflags", "+faststart", str(final))
print("done:", final, total, "s")
