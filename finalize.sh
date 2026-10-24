#!/bin/zsh
# Loudness-normalize the rendered reel (-14 LUFS, -1.5 dBTP), AAC 192k, and export the cover PNG.
set -e
export PATH="$HOME/.local/bin:$PATH"
cd "$(dirname "$0")/renders"
M=$(ffmpeg -hide_banner -i raw.mp4 -af loudnorm=I=-14:TP=-2.0:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
v() { echo "$M" | grep "\"$1\"" | sed -E 's/.*: "([^"]+)".*/\1/'; }
ffmpeg -y -v error -i raw.mp4 -c:v copy \
  -af "loudnorm=I=-14:TP=-2.0:LRA=11:measured_I=$(v input_i):measured_TP=$(v input_tp):measured_LRA=$(v input_lra):measured_thresh=$(v input_thresh):offset=$(v target_offset):linear=true,aresample=48000" \
  -c:a aac -b:a 192k -ar 48000 -movflags +faststart cubrik-reel${SUFFIX}.mp4
ffmpeg -y -v error -ss 0.2 -i cover-raw.mp4 -frames:v 1 cubrik-cover${SUFFIX}.png
ffmpeg -hide_banner -i cubrik-reel${SUFFIX}.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+(I:|Peak:)"
