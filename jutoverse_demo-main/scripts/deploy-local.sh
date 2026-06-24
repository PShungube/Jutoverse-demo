#!/usr/bin/env bash

set -euo pipefail

MODE="preview"
HOST="${HOST:-127.0.0.1}"
PORT="${PORT:-4173}"
OPEN_BROWSER="false"

usage() {
  cat <<'EOF'
Usage: bash scripts/deploy-local.sh [options]

Options:
  --dev             Start the Vite dev server for live debugging.
  --preview         Build first, then start the Vite preview server. This is the default.
  --host <host>     Host to bind. Default: 127.0.0.1
  --port <port>     Port to bind. Default: 4173
  --open            Open the app in the default browser after startup.
  --help            Show this help message.

Environment overrides:
  HOST              Same as --host
  PORT              Same as --port

Examples:
  bash scripts/deploy-local.sh
  bash scripts/deploy-local.sh --dev --port 3000
  npm run deploy:local -- --open
EOF
}

require_command() {
  local cmd="$1"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "Missing required command: $cmd" >&2
    exit 1
  fi
}

port_in_use() {
  local port="$1"
  lsof -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1
}

open_url() {
  local url="$1"

  if [[ "$OPEN_BROWSER" != "true" ]]; then
    return 0
  fi

  if command -v open >/dev/null 2>&1; then
    open "$url" >/dev/null 2>&1 || true
    return 0
  fi

  if command -v xdg-open >/dev/null 2>&1; then
    xdg-open "$url" >/dev/null 2>&1 || true
    return 0
  fi

  echo "Browser auto-open requested, but no supported opener was found." >&2
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dev)
      MODE="dev"
      shift
      ;;
    --preview)
      MODE="preview"
      shift
      ;;
    --host)
      HOST="${2:-}"
      shift 2
      ;;
    --port)
      PORT="${2:-}"
      shift 2
      ;;
    --open)
      OPEN_BROWSER="true"
      shift
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

if [[ -z "$HOST" || -z "$PORT" ]]; then
  echo "Host and port must both be set." >&2
  exit 1
fi

require_command npm
require_command lsof

if [[ ! -d node_modules ]]; then
  echo "node_modules not found. Installing dependencies..."
  npm install
fi

if port_in_use "$PORT"; then
  echo "Port $PORT is already in use. Stop the existing process or choose another port." >&2
  echo "Example: PORT=4174 bash scripts/deploy-local.sh --$MODE" >&2
  exit 1
fi

URL="http://${HOST}:${PORT}"

if [[ "$MODE" == "preview" ]]; then
  echo "Building the app for local preview..."
  npm run build
  echo "Starting preview server at ${URL}"
  open_url "$URL"
  exec npm run preview -- --host "$HOST" --port "$PORT" --strictPort
fi

echo "Starting dev server at ${URL}"
open_url "$URL"
exec npm run dev -- --host "$HOST" --port "$PORT" --strictPort
