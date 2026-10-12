#!/usr/bin/env sh
# Build the package and the docs site, then deploy site/dist to Cloudflare Pages
# (project codeatlas-ui → https://ui.codeatlas.com.br).
#   bun run site:deploy                 production (branch main)
#   bun run site:deploy --branch pr-12  preview at https://pr-12.codeatlas-ui.pages.dev
# Needs CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID in the environment (never commit them).
set -e
BRANCH=main
if [ "$1" = "--branch" ] && [ -n "$2" ]; then BRANCH="$2"; fi
if [ -z "$CLOUDFLARE_API_TOKEN" ] || [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
	echo "CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID must be set (Pages: Edit permission)." >&2
	exit 1
fi
bun run build:pkg
bun run --cwd site build
cd site && bunx wrangler pages deploy dist --project-name codeatlas-ui --branch "$BRANCH" --commit-dirty=true
