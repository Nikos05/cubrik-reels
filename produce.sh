#!/bin/zsh
# One command per video: VO prep -> build -> check -> render -> loudness -> cover.
# Usage: ./produce.sh <episode> <en|fr>
# Expects raw Flora voice lines in assets/raw-<episode>-<lang>/voNN.wav
set -e
EP=$1; LANG_=$2
[ -z "$EP" -o -z "$LANG_" ] && { echo "usage: ./produce.sh <episode> <en|fr>"; exit 1; }
cd "$(dirname "$0")"
export PATH="$HOME/.local/bin:$HOME/.nvm/versions/node/v24.22.0/bin:$PATH"
HF="npx --yes hyperframes@0.8.191"
TEMPO=1.25; [ "$LANG_" = fr ] && TEMPO=1.28
SFX=""; [ -n "$UGC" ] && SFX="-ugc"   # UGC=1 ./produce.sh ... builds the split-screen version

# 1. voice: trim edges, tighten pauses, speed up (pitch preserved)
RAW=assets/raw-$EP-$LANG_; OUT=assets/vo-$EP-$LANG_
mkdir -p $OUT
A="silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.02:stop_periods=-1:stop_threshold=-42dB:stop_duration=0.15:stop_silence=0.07"
R="areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.06,areverse"
for f in $RAW/vo*.wav; do
  ffmpeg -y -v error -i $f -af "${A},${R},atempo=${TEMPO}" -ar 48000 -ac 1 $OUT/$(basename $f)
done

# 2. build + check
REEL_UGC=$UGC REEL_LANG=$LANG_ node make.mjs $EP
${=HF} check 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "Check (passed|failed)" || true

# 3. render reel + cover
${=HF} render --crf 18 -o renders/raw.mp4 --quiet >/dev/null 2>&1
(cd cover && ${=HF} render -o ../renders/cover-raw.mp4 --quiet >/dev/null 2>&1)

# 4. loudness -14 LUFS / -2 dBTP, AAC 192k, cover PNG
cd renders
M=$(ffmpeg -hide_banner -i raw.mp4 -af loudnorm=I=-14:TP=-2.0:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
v() { echo "$M" | grep "\"$1\"" | sed -E 's/.*: "([^"]+)".*/\1/'; }
ffmpeg -y -v error -i raw.mp4 -c:v copy \
  -af "loudnorm=I=-14:TP=-2.0:LRA=11:measured_I=$(v input_i):measured_TP=$(v input_tp):measured_LRA=$(v input_lra):measured_thresh=$(v input_thresh):offset=$(v target_offset):linear=true,aresample=48000" \
  -c:a aac -b:a 192k -ar 48000 -movflags +faststart cubrik-$EP-$LANG_$SFX.mp4
ffmpeg -y -v error -ss 0.2 -i cover-raw.mp4 -frames:v 1 cubrik-$EP-$LANG_$SFX-cover.png
echo "done: renders/cubrik-$EP-$LANG_$SFX.mp4 ($(ffprobe -v error -show_entries format=duration -of csv=p=0 cubrik-$EP-$LANG_$SFX.mp4)s)"
