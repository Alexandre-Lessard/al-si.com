#!/usr/bin/env bash
set -euo pipefail

# Load environment variables
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

if [ -z "${CLOUDFLARE_ACCOUNT_ID:-}" ]; then
  echo "Error: CLOUDFLARE_ACCOUNT_ID is not set. Create a .env file with it."
  exit 1
fi

PROJECT="${CLOUDFLARE_PROJECT_NAME:-al-si-com}"

echo "Building..."
npm run build

echo "Deploying to Cloudflare Pages (project: $PROJECT)..."
npx wrangler pages deploy dist --project-name="$PROJECT" --commit-dirty=true

echo "Done. Remember to purge the Cloudflare cache."
