#!/bin/zsh
# YouTube test: two camera angles of ONE take + graphics, composited losslessly by ffmpeg -> ../renders/cubrik-yt-test.mp4
# Usage: ./produce.sh <rawA.mp4> <rawB.mp4> <cut_s>
#   rawA/rawB = the same audio take generated on the front and the 3/4 angle (audio ref = assets/ugc/yt/take.mp3),
#               ideally Seedance bitrate_mode=high and/or Topaz-upscaled to 2160p
#   cut_s     = where the edit switches from A to B, in take time (pick the start of a phrase)
# The presenter footage never goes through the browser capture (that softened it): HyperFrames only renders the
# graphics + demo as a transparent ProRes 4444 overlay, ffmpeg lays it over the footage.
set -e
cd "$(dirname "$0")"
export PATH="$HOME/.local/bin:$HOME/.nvm/versions/node/v24.22.0/bin:$PATH"
RA=$1; RB=$2; CUT=${3:-5.15}; S0=0.2
# Raw Seedance lip motion runs ~0.2 s behind its audio reference and drops syllables, so each angle goes through
# Flora "Lipsync 2 Pro" (av2v-lipsync-2-pro, video + take.mp3) and then Topaz 2160p. Lipsynced clips start exactly
# on the audio: pass 0 as 4th arg. Only raw Seedance clips need the 0.2 s offset.
OFF=${4:-0}
TK=../assets/ugc/yt/take.mp3
END=$(python3 -c "print(round($(ffprobe -v error -show_entries format=duration -of csv=p=0 $TK) - 0.05, 3))")
vt() { python3 -c "print(round($1 + $OFF, 3))"; }
# delivered in 4K: YouTube gives 4K uploads a much higher bitrate, so even 1080p viewers get a sharper picture
V="scale=3840:2160:flags=lanczos:force_original_aspect_ratio=increase,crop=3840:2160,unsharp=5:5:0.4:5:5:0,fps=30"
ffmpeg -y -v error -ss $(vt $S0) -to $(vt $CUT) -i $RA -an -vf $V -c:v libx264 -crf 12 -preset slow -pix_fmt yuv420p assets/shotA.mp4
ffmpeg -y -v error -ss $(vt $CUT) -to $(vt $END) -i $RB -an -vf $V -c:v libx264 -crf 12 -preset slow -pix_fmt yuv420p assets/shotB.mp4
ffmpeg -y -v error -ss $S0 -to $END -i $TK -ar 48000 -ac 1 assets/take.wav
A="silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.02:stop_periods=-1:stop_threshold=-42dB:stop_duration=0.15:stop_silence=0.07"
R="areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.06,areverse"
ffmpeg -y -v error -i ../assets/ugc/yt/raw03.wav -af "$A,$R" -ar 48000 -ac 1 assets/vo3.wav
OVERLAY=1 node build.mjs
TOTAL=$(grep -o 'data-duration="[0-9.]*"' index.html | head -1 | grep -o '[0-9.]*')
npx --yes hyperframes@0.8.191 render --format mov --resolution 4k -o ../renders/yt-overlay.mov --quiet >/dev/null 2>&1
cd ../renders
DA=$(ffprobe -v error -show_entries format=duration -of csv=p=0 ../yt/assets/shotA.mp4)
DB=$(ffprobe -v error -show_entries format=duration -of csv=p=0 ../yt/assets/shotB.mp4)
DD=$(python3 -c "print(round($TOTAL - $DA - $DB, 3))")
ffmpeg -y -v error -i ../yt/assets/shotA.mp4 -i ../yt/assets/shotB.mp4 -f lavfi -t $DD -i "color=c=black:s=3840x2160:r=30" -i yt-overlay.mov \
  -filter_complex "[0:v][1:v][2:v]concat=n=3:v=1:a=0,format=yuv420p[base];[base][3:v]overlay=0:0:format=auto,noise=alls=2:allf=t,format=yuv420p[v]" \
  -map "[v]" -map 3:a -c:v libx264 -crf 19 -preset slow -tune film -c:a aac -b:a 192k -shortest yt-test-comp.mp4
M=$(ffmpeg -hide_banner -i yt-test-comp.mp4 -af loudnorm=I=-14:TP=-2.0:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
v() { echo "$M" | grep "\"$1\"" | sed -E 's/.*: "([^"]+)".*/\1/'; }
ffmpeg -y -v error -i yt-test-comp.mp4 -c:v copy \
  -af "loudnorm=I=-14:TP=-2.0:LRA=11:measured_I=$(v input_i):measured_TP=$(v input_tp):measured_LRA=$(v input_lra):measured_thresh=$(v input_thresh):offset=$(v target_offset):linear=true,aresample=48000" \
  -c:a aac -b:a 192k -ar 48000 -movflags +faststart cubrik-yt-test.mp4
echo "done: renders/cubrik-yt-test.mp4 ($(ffprobe -v error -show_entries format=duration -of csv=p=0 cubrik-yt-test.mp4)s)"
