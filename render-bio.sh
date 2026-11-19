#!/bin/zsh
# Renders every reel of the "lien en bio" series (lib/bio-specs.mjs) without Claude.
cd "$(dirname "$0")"
for e in $(node -e 'import("./lib/bio-specs.mjs").then(m=>console.log(m.SPECS.map(s=>s.id).join(" ")))'); do
  [ -n "$SKIP_DONE" ] && [ -f renders/cubrik-$e-fr.mp4 ] && [ renders/cubrik-$e-fr.mp4 -nt lib/bio-specs.mjs ] && continue
  echo "=== $e"; REEL_NOCLAUDE=1 ./produce.sh $e fr 2>&1 | grep -E "fr:|Check|done"
done
