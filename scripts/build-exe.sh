#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$ROOT/dist"
WEB_DIR="$ROOT/launcher/web"

echo "Building control panel frontend..."
cd "$ROOT/control-panel"
npm run build

echo "Copying static files..."
rm -rf "$WEB_DIR"
mkdir -p "$WEB_DIR"
cp -r dist/* "$WEB_DIR/"

echo "Building Windows executable..."
mkdir -p "$OUT_DIR"
cd "$ROOT/launcher"
GOOS=windows GOARCH=amd64 go build -ldflags="-s -w" -o "$OUT_DIR/ControlPanel.exe" .

echo "Building Linux binary..."
GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o "$OUT_DIR/control-panel" .

echo ""
echo "Done!"
echo "  Windows: $OUT_DIR/ControlPanel.exe"
echo "  Linux:   $OUT_DIR/control-panel"
