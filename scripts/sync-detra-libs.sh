#!/bin/bash
set -e

DEST_DIR="$(cd "$(dirname "$0")/../node_modules/@detrasoft.com" && pwd)"
LIBS_DIR="$(cd "$(dirname "$0")/../../../../detrasoft/detra-libs" && pwd)"
DETRA_NG_DIR="$(cd "$(dirname "$0")/../../../../detrasoft/detra-ng" && pwd)"

echo "=== Syncing DetraSoft libs to note-ui node_modules ==="
mkdir -p "$DEST_DIR"

if [ -d "$DETRA_NG_DIR/dist/detra-ng" ]; then
  rm -rf "$DEST_DIR/detra-ng"
  cp -r "$DETRA_NG_DIR/dist/detra-ng" "$DEST_DIR/detra-ng"
  echo "✔ detra-ng"
fi

for pkg in web-auth billing storage doc-signing support mob-auth; do
  if [ -d "$LIBS_DIR/$pkg/dist" ]; then
    rm -rf "$DEST_DIR/$pkg"
    cp -r "$LIBS_DIR/$pkg/dist" "$DEST_DIR/$pkg"
    echo "✔ @detrasoft.com/$pkg"
  else
    echo "⚠ Dist not found for $pkg. Run build in $LIBS_DIR/$pkg first."
  fi
done

# Invalida o cache do Vite/Angular para que novas exportações sejam detectadas imediatamente
CACHE_DIR="$(cd "$(dirname "$0")/.." && pwd)/.angular/cache"
if [ -d "$CACHE_DIR" ]; then
  rm -rf "$CACHE_DIR"
  echo "✔ .angular/cache limpo para re-otimização do Vite"
fi

echo "=== Sync completed successfully ==="
