#!/usr/bin/env python3
"""Checks that every presenter voice sits where its lips are in ../renders/cubrik-youtube-full.mp4.

For each presenter segment (cam A/B) the take audio is the reference: its loudness envelope is cross-correlated with
the final mix at the place the segment lands after the x1.20 speed-up. A dropped voice gives a weak correlation, an
offset gives a lag. Pure Python (no numpy): envelopes at 100 Hz.
"""
import json, subprocess, os, sys, array
FINAL_ARG = sys.argv[1] if len(sys.argv) > 1 else None
from pathlib import Path

ROOT = Path(__file__).resolve().parent
FF = os.path.expanduser("~/.local/bin/ffmpeg")
FINAL = Path(FINAL_ARG) if FINAL_ARG else ROOT.parent / "renders/cubrik-youtube-full.mp4"
SPEED, HOOK = 1.2, {"h1", "h2", "h3", "h4", "h5"}
RATE, HOP = 8000, 80  # 10 ms hops


def envelope(path, start=0.0, dur=None, tempo=1.0):
    af = f"atempo={tempo}," if tempo != 1 else ""
    cmd = [FF, "-v", "error", "-ss", f"{start:.3f}"] + (["-t", f"{dur:.3f}"] if dur else []) + ["-i", str(path), "-af", f"{af}aresample={RATE}", "-ac", "1", "-f", "s16le", "-"]
    pcm = array.array("h", subprocess.run(cmd, capture_output=True, check=True).stdout)
    env = [sum(abs(x) for x in pcm[i:i + HOP]) / HOP for i in range(0, len(pcm) - HOP, HOP)]
    m = sum(env) / max(len(env), 1)
    return [e - m for e in env]


def xcorr(a, b, max_lag):
    """Best normalised correlation of a fully inside b, for lags 0..max_lag (b starts max_lag/2 hops early)."""
    best = (-2, 0)
    for lag in range(0, min(max_lag, len(b) - len(a)) + 1):
        num = sa = sb = 0.0
        for i, x in enumerate(a):
            y = b[lag + i]; num += x * y; sa += x * x; sb += y * y
        if sa and sb:
            c = num / (sa * sb) ** 0.5
            if c > best[0]:
                best = (c, lag)
    return best


tl = json.loads((ROOT / "assets/full/timeline.json").read_text())
if FINAL_ARG and "preview" in FINAL_ARG:  # hook preview: native speed, stops after h5
    SPEED = 1.0; tl = tl[: [s["id"] for s in tl].index("h5") + 1]
out, bad = 0.0, 0
for s in tl:
    sp = 1.0 if s["id"] in HOOK else SPEED
    if True:  # every voice: presenter takes and demo voice-overs (which start 0.2 s into their segment)
        demo = s["cam"] not in "AB"
        ref = envelope(ROOT / (f"assets/full/vo{s['id']}.wav" if demo else f"assets/full/take{s['id']}.wav"), 0, s["d"] - (0.5 if demo else 0), sp)
        pre = min(out, 0.3)  # search +-300 ms around the expected spot (sfx and music can echo further away)
        got = envelope(FINAL, out + (0.2 / sp if demo else 0) - pre, s["d"] / sp + 0.6)
        c, lag = xcorr(ref, got, round(pre * 100) + 30)
        lag_ms = (lag - round(pre * 100)) * 10
        ok = c > 0.4 and abs(lag_ms) <= 60
        bad += not ok
        print(f"{s['id']:>3} at {out:7.2f}s  corr {c:.2f}  offset {lag_ms:+4d} ms  {'ok' if ok else 'CHECK'}")
    out += s["d"] / sp
print("all presenter voices in sync" if not bad else f"{bad} segment(s) to check")
sys.exit(1 if bad else 0)
