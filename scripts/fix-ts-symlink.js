#!/usr/bin/env node
/**
 * Fixes a bun symlink issue where @sveltejs/package cannot find typescript
 * because it resolves from the bun global cache, not the workspace.
 * Runs automatically as the root postinstall, so `bun install` always leaves
 * build:pkg working. Idempotent; never fails the install.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

try {
	const svpReal = fs.realpathSync(
		path.join(__dirname, "../packages/ui/node_modules/@sveltejs/package/package.json")
	);
	const svpNM = path.join(path.dirname(svpReal), "../..");
	const tsReal = path.dirname(
		fs.realpathSync(path.join(__dirname, "../node_modules/typescript/package.json"))
	);
	const target = path.join(svpNM, "typescript");
	if (!fs.existsSync(target)) {
		fs.symlinkSync(tsReal, target);
		console.log("Fixed: linked typescript into svelte-package cache at", target);
	} else {
		console.log("Already fixed: typescript symlink exists");
	}
} catch (e) {
	console.warn("Warning: could not apply typescript fix:", e.message);
	console.warn("If build:pkg fails, run: bun install && node scripts/fix-ts-symlink.js");
}
