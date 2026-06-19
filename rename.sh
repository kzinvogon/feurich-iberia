#!/bin/zsh
cd /Users/davidhamilton/dev/furichspain
mkdir -p images
COUNT=1
for f in "WhatsApp Image"*.jpeg(n); do
  printf -v NUM "%02d" $COUNT
  cp "$f" "images/piano-${NUM}.jpeg"
  echo "piano-${NUM}.jpeg <- $f"
  ((COUNT++))
done
echo ""
echo "Done. $(ls images/piano-*.jpeg | wc -l | tr -d ' ') images created."
