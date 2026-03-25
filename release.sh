#!/bin/bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
SOURCE_DIR="$ROOT_DIR/source"
DOCS_DIR="$ROOT_DIR/docs"
EN_DIR="$DOCS_DIR/en"

cd "$SOURCE_DIR"

# Build production output into /docs with relative paths.
ng build --configuration production --output-path ../docs --base-href ./

# Angular application builder may emit files inside docs/browser.
if [ -d "$DOCS_DIR/browser" ]; then
  shopt -s dotglob nullglob
  mv "$DOCS_DIR/browser"/* "$DOCS_DIR/"
  rm -rf "$DOCS_DIR/browser"
  shopt -u dotglob nullglob
fi

# Prepare English path with a full copy of the generated site.
rm -rf "$EN_DIR"
mkdir -p "$EN_DIR"

for entry in "$DOCS_DIR"/*; do
  name="$(basename "$entry")"
  if [ "$name" = "en" ] || [ "$name" = ".nojekyll" ]; then
    continue
  fi
  cp -R "$entry" "$EN_DIR/"
done

EN_INDEX="$EN_DIR/index.html"

# Rewrite static metadata for /en/ entrypoint.
perl -0pi -e 's|<html lang="es">|<html lang="en">|g' "$EN_INDEX"
perl -0pi -e 's|<title>[^<]*</title>|<title>Rocio A. Mori Balsamo - Cabin Crew Member & Educational Psychologist</title>|g' "$EN_INDEX"
perl -0pi -e 's|<meta name="description" content="[^"]*">|<meta name="description" content="Portfolio of Rocio A. Mori Balsamo, Cabin Crew Member and Educational Psychologist specialized in Occupational and Social Educational Psychology. Experience in aviation, passenger service, training, and people management.">|g' "$EN_INDEX"
perl -0pi -e 's|<meta property="og:title" content="[^"]*">|<meta property="og:title" content="Rocio A. Mori Balsamo - Cabin Crew Member & Educational Psychologist">|g' "$EN_INDEX"
perl -0pi -e 's|<meta property="og:description" content="[^"]*">|<meta property="og:description" content="Cabin Crew Member and Educational Psychologist with strong communication skills, aviation experience, and specialization in Occupational and Social Educational Psychology.">|g' "$EN_INDEX"
perl -0pi -e 's|<meta property="og:url" content="[^"]*">|<meta property="og:url" content="https://rociomori.github.io/en/">|g' "$EN_INDEX"
perl -0pi -e 's|<meta name="twitter:title" content="[^"]*">|<meta name="twitter:title" content="Rocio A. Mori Balsamo - Cabin Crew Member & Educational Psychologist">|g' "$EN_INDEX"
perl -0pi -e 's|<meta name="twitter:description" content="[^"]*">|<meta name="twitter:description" content="Cabin Crew Member and Educational Psychologist with strong communication skills, aviation experience, and specialization in Occupational and Social Educational Psychology.">|g' "$EN_INDEX"
perl -0pi -e 's|<link rel="canonical" href="[^"]*">|<link rel="canonical" href="https://rociomori.github.io/en/">|g' "$EN_INDEX"

touch "$DOCS_DIR/.nojekyll"

echo "Build completado con versiones ES y EN en /docs"
