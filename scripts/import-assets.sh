#!/usr/bin/env bash
# Copies the brand files and app screenshots from the sibling repos into this one.
# The copies are snapshots: re-run when a motif changes. Paths are overridable via env.
set -euo pipefail
cd "$(dirname "$0")/.."
IOS_REPO="${IOS_REPO:-../Hissi-iOS}"
ANDROID_REPO="${ANDROID_REPO:-../Hissi-Android}"
ART_REPO="${ART_REPO:-../../Kobe/LiftBoy/artwork}"
for d in "$IOS_REPO" "$ANDROID_REPO" "$ART_REPO"; do
  [ -d "$d" ] || { echo "missing: $d (set IOS_REPO / ANDROID_REPO / ART_REPO)" >&2; exit 1; }
done

mkdir -p src/assets/brand src/assets/screens public
for f in hissi-klein-hell hissi-klein-dunkel hissi-lockup-creme hissi-lockup-dunkel; do
  node scripts/strip-c2pa.mjs "$ART_REPO/website/$f.svg" "src/assets/brand/$f.svg"
done

IPHONE="$IOS_REPO/screenshots/de/iPhone-18-Pro-Max"
WATCH="$IOS_REPO/screenshots/de/Apple-Watch-Series-12-46mm"
cp "$IPHONE/04-favorites.jpg" src/assets/screens/ios-favorites.jpg
cp "$IPHONE/02-search.jpg"    src/assets/screens/ios-search.jpg
cp "$IPHONE/06-nearby.jpg"    src/assets/screens/ios-nearby.jpg
cp "$WATCH/01-list.jpg"       src/assets/screens/watch-list.jpg
cp "$ANDROID_REPO/play/screenshots/01-favoriten.png" src/assets/screens/android-favorites.png

echo "assets copied — snapshots of $IOS_REPO, $ANDROID_REPO and $ART_REPO; re-run when a motif changes."
