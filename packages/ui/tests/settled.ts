import { expect } from "vitest";

/** Resolves once no CSS animation/transition is running (overlays fade in; axe must see final colours). Polls playState: `Animation.finished` can hang on already-finished animations. */
export async function settled(): Promise<void> {
	await new Promise((r) => requestAnimationFrame(() => r(null)));
	await expect
		.poll(() => document.getAnimations().filter((a) => a.playState === "running").length)
		.toBe(0);
}
