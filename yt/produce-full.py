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
SPEED = 1.2  # playback speed of the body (hook excluded, see HOOK)
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
# split-screen presenter segments: crop around him and push him to the right, the overlay panel fills the left
SPLIT = {}  # e.g. {"h2": ",crop=2240:2160:800:0,pad=3840:2160:1600:0:black"}
V = "scale=3840:2160:flags=lanczos:force_original_aspect_ratio=increase,crop=3840:2160,unsharp=5:5:0.4:5:5:0,fps=30,setsar=1"
# zoom-blur handoff from the presenter into the b-roll: the last frames push in and blur, the first b-roll frames settle
# (per-frame scale + centred crop: zoompan barely moves on video input)
zout = lambda n: (f",scale=w='3840*(1+0.045*max(0,n-{n - 9}))':h=-2:eval=frame,crop=3840:2160,setsar=1,"
                  f"gblur=sigma=18:enable='gte(n,{n - 5})'")
ZIN = ",scale=w='3840*(1+0.045*max(0,8-n))':h=-2:eval=frame,crop=3840:2160,setsar=1,gblur=sigma=18:enable='lte(n,4)'"
parts = []
for i, s in enumerate(tl):
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
            fc.append(f"[{k}:v]{V},tpad=stop_mode=clone:stop_duration=2,trim=end_frame={m},setpts=PTS-STARTPTS{ZIN if k == 0 else ''}[v{k}]")
        fc.append("".join(f"[v{k}]" for k in range(len(cuts) - 1)) + f"concat=n={len(cuts) - 1}:v=1:a=0[o]")
        run(FF, "-y", "-v", "error", *ins, "-filter_complex", ";".join(fc), "-map", "[o]", "-frames:v", str(n), "-an",
            "-c:v", "libx264", "-crf", "12", "-preset", "fast", "-pix_fmt", "yuv420p", str(p))
    elif s["cam"] in "AB":
        into_broll = i + 1 < len(tl) and tl[i + 1]["id"] in BROLL
        run(FF, "-y", "-v", "error", "-ss", "0.3", "-i", str(FULL / f"ls{s['id']}-4k.mp4"), "-an", "-vf", f"{V},tpad=stop_mode=clone:stop_duration=2,trim=end_frame={n}" + (zout(n) if into_broll else "") + SPLIT.get(s["id"], ""),
            "-frames:v", str(n), "-c:v", "libx264", "-crf", "12", "-preset", "fast", "-pix_fmt", "yuv420p", str(p))
    else:
        run(FF, "-y", "-v", "error", "-f", "lavfi", "-i", "color=c=black:s=3840x2160:r=30", "-frames:v", str(n), "-c:v", "libx264", "-crf", "12", "-pix_fmt", "yuv420p", str(p))
    parts.append(p)
(FULL / "concat.txt").write_text("".join(f"file '{p}'\n" for p in parts))
run(FF, "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", str(FULL / "concat.txt"), "-c", "copy", str(OUT / "yt-full-base.mp4"))

# Picture and sound never share an ffmpeg graph: with an audio branch next to the 4K video branch, ffmpeg shifted the
# sound by seconds at the first cut (v9/v10). Each is processed on its own, then muxed without re-encoding.

# sound 1: the overlay's voice + sfx, holes in its timestamps filled with silence (audio-only graph, sample-exact)
voice = OUT / "yt-full-voice.wav"
run(FF, "-y", "-v", "error", "-i", str(OUT / "yt-full-overlay.mov"), "-vn", "-af", "aresample=48000:async=1:first_pts=0", "-c:a", "pcm_s16le", str(voice))

# picture 1: base + graphics + grain at native speed
raw = OUT / "yt-full-raw.mp4"
run(FF, "-y", "-v", "error", "-i", str(OUT / "yt-full-base.mp4"), "-i", str(OUT / "yt-full-overlay.mov"),
    "-filter_complex", "[0:v][1:v]overlay=0:0:format=auto,noise=alls=2:allf=t,format=yuv420p[v]",
    "-map", "[v]", "-an", "-t", str(total), "-c:v", "libx264", "-crf", "14", "-preset", "fast", str(raw))

# the body plays x1.20 (picture and voice with the same cuts, so lips stay in sync); the hook lines were already voiced x1.20
HOOK = {"h1", "h2", "h3", "h4", "h5"}
groups = []
for sg in tl:
    sp = 1.0 if sg["id"] in HOOK else SPEED
    if groups and groups[-1][2] == sp:
        groups[-1][1] = sg["start"] + sg["d"]
    else:
        groups.append([sg["start"], sg["start"] + sg["d"], sp])
G = len(groups)
total = round(sum((g1 - g0) / sp for g0, g1, sp in groups), 3)

# picture 2: speed groups
ins, fc = [], []
for k, (g0, g1, sp) in enumerate(groups):
    ins += ["-ss", f"{g0:.3f}", "-t", f"{g1 - g0:.3f}", "-i", str(raw)]
    fc.append(f"[{k}:v]setpts=(PTS-STARTPTS)/{sp}[v{k}]")
fc.append("".join(f"[v{k}]" for k in range(G)) + f"concat=n={G}:v=1:a=0,fps=30[v]")
pic = OUT / "yt-full-pic.mp4"
run(FF, "-y", "-v", "error", *ins, "-filter_complex", ";".join(fc), "-map", "[v]", "-t", str(total),
    "-c:v", "libx264", "-crf", "19", "-preset", "slow", "-tune", "film", "-movflags", "+faststart", str(pic))

# sound 2: same speed groups on the voice, then the music bed (Lyria, own tempo) ducked under it
fc = [f"[0:a]atrim={g0:.4f}:{g1:.4f},asetpts=PTS-STARTPTS" + (f",atempo={sp}" if sp != 1 else "") + f"[a{k}]" for k, (g0, g1, sp) in enumerate(groups)]
fc.append("".join(f"[a{k}]" for k in range(G)) + f"concat=n={G}:v=0:a=1,asplit[voice][key]")
fc.append(f"[1:a]atrim=0:{total},asetpts=PTS-STARTPTS,afade=t=in:d=1.5,afade=t=out:st={total - 3}:d=3,volume=0.11[m]")
fc.append("[m][key]sidechaincompress=threshold=0.02:ratio=10:attack=20:release=400[duck];[voice][duck]amix=inputs=2:normalize=0[a]")
mix = OUT / "yt-full-mix.wav"
run(FF, "-y", "-v", "error", "-i", str(voice), "-stream_loop", "-1", "-i", str(FULL / "music-src.mp3"), "-filter_complex", ";".join(fc),
    "-map", "[a]", "-t", str(total), "-ar", "48000", "-c:a", "pcm_s16le", str(mix))

# loudness -14 LUFS (two-pass, linear) and mux with the picture untouched
m = subprocess.run([FF, "-hide_banner", "-i", str(mix), "-af", "loudnorm=I=-14:TP=-2.0:LRA=11:print_format=json", "-f", "null", "-"], capture_output=True, text=True, env=env).stderr
j = json.loads(m[m.rindex("{"): m.rindex("}") + 1])
final = OUT / "cubrik-youtube-full.mp4"
aac = OUT / "yt-full-audio.m4a"  # encoded on its own (encoding it during the mux left a 95 ms hole near the end)
run(FF, "-y", "-v", "error", "-i", str(mix), "-af",
    f"loudnorm=I=-14:TP=-2.0:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true,aresample=48000:async=1:first_pts=0",
    "-c:a", "aac", "-b:a", "192k", "-ar", "48000", str(aac))
run(FF, "-y", "-v", "error", "-i", str(pic), "-i", str(aac), "-map", "0:v", "-map", "1:a", "-c", "copy", "-shortest", "-movflags", "+faststart", str(final))
print("done:", final, total, "s")
