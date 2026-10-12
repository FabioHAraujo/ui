#!/usr/bin/env sh
# Visual baselines are Linux-only. On any OS, this runs VRT inside the pinned Playwright image.
set -e
if ! command -v docker >/dev/null 2>&1; then
	echo "Docker is required for VRT (baselines are generated on Linux). Install Docker Desktop and retry." >&2
	exit 1
fi
IMG=mcr.microsoft.com/playwright:v1.64.0-noble
UPDATE=""; UPDATE_PW=""
if [ "$1" = "--update" ]; then UPDATE="--update"; UPDATE_PW="--update-snapshots"; fi
docker run --rm --init --ipc=host -v "$PWD":/work -v /work/node_modules -v /work/packages/ui/node_modules -v /work/site/node_modules -w /work "$IMG" sh -c "\
	npm i -g bun >/dev/null && bun install --frozen-lockfile && \
	bun run --cwd packages/ui test:vrt $UPDATE && bun run build:pkg && \
	bun run --cwd site test:e2e --project=visual-desktop --project=visual-mobile $UPDATE_PW"
