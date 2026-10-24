#!/bin/zsh
# Turn raw talking clips (generated from natural-speed lines with a 0.5 s lead-in)
# into scene-ready clips: cut the lead-in (keeping the engine's 0.06 s VO offset),
# then speed image + sound by the same factor as the voiceover so the lips stay in sync.
# Usage: ./ugc-prep.sh <dir> <tempo>   e.g. ./ugc-prep.sh assets/ugc/yt-fr 1.28
set -e
DIR=$1; T=${2:-1.28}
export PATH="$HOME/.local/bin:$PATH"
CUT=$(python3 -c "print(round(0.5 - 0.06*$T, 4))")
for f in $DIR/raw*.mp4; do
  n=${${f:t:r}#raw}
  ffmpeg -y -v error -ss $CUT -i $f -filter_complex "[0:v]setpts=PTS/${T},scale=1080:1080:force_original_aspect_ratio=increase,crop=1080:1080[v];[0:a]atempo=${T}[a]" \
    -map "[v]" -map "[a]" -r 30 -c:v libx264 -crf 17 -pix_fmt yuv420p -c:a aac -b:a 160k $DIR/clip$n.mp4
  printf "%s %.2fs\n" clip$n.mp4 $(ffprobe -v error -show_entries format=duration -of csv=p=0 $DIR/clip$n.mp4)
done
