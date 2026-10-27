#!/usr/bin/env python3
"""Fast 1080p preview of the battle video hook (h1..h4): presenter clips assets/ugc/yt/battle/ls<id>.mp4 under
../renders/battle-hook-overlay.mov (PREVIEW=hook node build-battle.mjs, then a HyperFrames render in battle/)."""
import json, subprocess, os
from pathlib import Path

ROOT = Path(__file__).resolve().parent
FULL = ROOT.parent / "assets/ugc/yt/battle"
MUSIC = ROOT.parent / "assets/ugc/yt/full/music-src.mp3"
OUT = ROOT.parent / "renders"
FF = os.path.expanduser("~/.local/bin/ffmpeg")
FPS = 30
SPLIT = {}
BROLL = {}
zout = lambda n: f",scale=w='1920*(1+0.045*max(0,n-{n - 9}))':h=-2:eval=frame,crop=1920:1080,setsar=1,gblur=sigma=9:enable='gte(n,{n - 5})'"
ZIN = ",scale=w='1920*(1+0.045*max(0,8-n))':h=-2:eval=frame,crop=1920:1080,setsar=1,gblur=sigma=9:enable='lte(n,4)'"
V = "scale=1920:1080:flags=lanczos:force_original_aspect_ratio=increase,crop=1920:1080,fps=30,setsar=1"
run = lambda *a: subprocess.run(a, check=True)

tl = json.loads((ROOT / "assets/battle/timeline.json").read_text())
seg = [s for s in tl if s["id"].startswith("h")]
end = seg[-1]["start"] + seg[-1]["d"]
parts = []
for i, s in enumerate(seg):
    n = round((s["start"] + s["d"]) * FPS) - round(s["start"] * FPS)
    p = FULL / f"prev{s['id']}.mp4"
    if s["id"] in BROLL:
        cuts = BROLL[s["id"]] + [(None, s["d"])]
        ins, fc = [], []
        for k, (f, at) in enumerate(cuts[:-1]):
            m = round((cuts[k + 1][1] - at) * FPS) if k < len(cuts) - 2 else n - sum(round((cuts[j + 1][1] - cuts[j][1]) * FPS) for j in range(k))
            ins += ["-i", str(FULL / f)]
            fc.append(f"[{k}:v]{V},tpad=stop_mode=clone:stop_duration=2,trim=end_frame={m},setpts=PTS-STARTPTS{ZIN if k == 0 else ''}[v{k}]")
        fc.append("".join(f"[v{k}]" for k in range(len(cuts) - 1)) + f"concat=n={len(cuts) - 1}:v=1:a=0[o]")
        run(FF, "-y", "-v", "error", *ins, "-filter_complex", ";".join(fc), "-map", "[o]", "-frames:v", str(n), "-c:v", "libx264", "-crf", "16", "-preset", "veryfast", "-pix_fmt", "yuv420p", str(p))
    elif s["cam"] in "AB":
        run(FF, "-y", "-v", "error", "-ss", "0.3", "-i", str(FULL / f"ls{s['id']}.mp4"), "-an", "-vf",
            f"{V},tpad=stop_mode=clone:stop_duration=2,trim=end_frame={n}" + (zout(n) if i + 1 < len(seg) and seg[i + 1]["id"] in BROLL else "") + SPLIT.get(s["id"], ""), "-frames:v", str(n), "-c:v", "libx264", "-crf", "16", "-preset", "veryfast", "-pix_fmt", "yuv420p", str(p))
    else:
        run(FF, "-y", "-v", "error", "-f", "lavfi", "-i", "color=c=black:s=1920x1080:r=30", "-frames:v", str(n), "-c:v", "libx264", "-crf", "16", "-pix_fmt", "yuv420p", str(p))
    parts.append(p)
(FULL / "prev.txt").write_text("".join(f"file '{p}'\n" for p in parts))
run(FF, "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", str(FULL / "prev.txt"), "-c", "copy", str(FULL / "prev-base.mp4"))
music = MUSIC
# picture and sound in separate ffmpeg runs (sharing one graph shifted the sound by seconds at the first cut)
voice = FULL / "prev-voice.wav"
run(FF, "-y", "-v", "error", "-t", f"{end:.3f}", "-i", str(OUT / "battle-hook-overlay.mov"), "-vn", "-af", "aresample=48000:async=1:first_pts=0", "-c:a", "pcm_s16le", str(voice))
pic = FULL / "prev-pic.mp4"
run(FF, "-y", "-v", "error", "-i", str(FULL / "prev-base.mp4"), "-t", f"{end:.3f}", "-i", str(OUT / "battle-hook-overlay.mov"),
    "-filter_complex", "[1:v]scale=1920:1080[o];[0:v][o]overlay=0:0:format=auto,format=yuv420p[v]", "-map", "[v]", "-an", "-t", f"{end:.3f}",
    "-c:v", "libx264", "-crf", "20", "-preset", "fast", str(pic))
mix = FULL / "prev-mix.wav"
run(FF, "-y", "-v", "error", "-i", str(voice), "-stream_loop", "-1", "-i", str(music), "-filter_complex",
    f"[1:a]atrim=0:{end:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=1.5,volume=0.11[m];[0:a]asplit[voice][key];"
    "[m][key]sidechaincompress=threshold=0.02:ratio=10:attack=20:release=400[duck];[voice][duck]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-2:linear=true[a]",
    "-map", "[a]", "-t", f"{end:.3f}", "-ar", "48000", "-c:a", "pcm_s16le", str(mix))
run(FF, "-y", "-v", "error", "-i", str(pic), "-i", str(mix), "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", str(OUT / "battle-preview-hook.mp4"))
print("preview:", OUT / "battle-preview-hook.mp4", round(end, 2), "s")
