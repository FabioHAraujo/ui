/// <reference types="vitest/browser" />
import "vitest-browser-svelte";
import "../src/lib/styles/global.css";
import "./a11y";
import { beforeEach, expect } from "vitest";

// Overlays (bits-ui Dialog/Sheet/…) lock <body> with `pointer-events: none` while open and release
// it asynchronously after unmount. A test that starts before the release can't click anything
// ("<html> intercepts pointer events"). Wait for it; if it never clears, the previous test leaked.
beforeEach(async () => {
	await expect
		.poll(() => document.body.style.pointerEvents, {
			timeout: 3_000,
			message: "<body> is still pointer-locked: the previous test left an overlay lock behind",
		})
		.not.toBe("none");
});
