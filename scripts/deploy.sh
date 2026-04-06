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

# Usage: ./deploy.sh           → production deploy
#        ./deploy.sh preview   → preview deploy (won't update al-si.com)
#        ./deploy.sh <branch>  → named preview branch
MODE="${1:-production}"

echo "Building..."
npm run build

if [ "$MODE" = "production" ]; then
  echo "Deploying to PRODUCTION on Cloudflare Pages (project: $PROJECT)..."
  npx wrangler pages deploy dist --project-name="$PROJECT" --branch=main --commit-dirty=true
  echo "Done. Remember to purge the Cloudflare cache."
else
  echo "Deploying PREVIEW '$MODE' on Cloudflare Pages (project: $PROJECT)..."
  npx wrangler pages deploy dist --project-name="$PROJECT" --branch="$MODE" --commit-dirty=true
  echo "Done. Preview URL above. Production (al-si.com) is untouched."
fi
