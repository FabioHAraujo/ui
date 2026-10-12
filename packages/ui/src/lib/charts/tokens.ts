// ─── Chart design tokens — CSS var snapshot ───────────────────────────────────
// Reads the live design system (dark/light + 8 presets) at call time so every
// chart option is always in sync with the current theme. Internal only.

import { colorScheme } from "../stores/color-scheme.svelte.js";

/**
 * CSS vars aren't reactive. Reading the scheme here makes any `$derived` that builds a chart
 * option re-run on theme/preset/style changes (the store updates the DOM synchronously first).
 */
export function trackTheme(): void {
	void colorScheme.resolved;
	void colorScheme.preset;
	void colorScheme.style;
}

function v(name: string, fallback = ""): string {
	if (typeof document === "undefined") return fallback;
	trackTheme();
	return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

export interface ChartTokens {
	brand: string;
	brandLight: string;
	textPrimary: string;
	textSecondary: string;
	textDisabled: string;
	success: string;
	error: string;
	warning: string;
	info: string;
	glassBg: string;
	glassBorder: string;
	glassShadow: string;
	blur: string;
	outlineSubtle: string;
	actionHover: string;
	radiusMd: string;
	radiusLg: string;
	fontSans: string;
}

export function chartTokens(): ChartTokens {
	return {
		brand: v("--ca-brand-main", "#f59e0b"),
		brandLight: v("--ca-brand-light", "#fcd34d"),
		textPrimary: v("--ca-text-primary", "#0f172a"),
		textSecondary: v("--ca-text-secondary", "#475569"),
		textDisabled: v("--ca-text-disabled", "#94a3b8"),
		success: v("--ca-semantic-success", "#22c55e"),
		error: v("--ca-semantic-error", "#ef4444"),
		warning: v("--ca-semantic-warning", "#f59e0b"),
		info: v("--ca-semantic-info", "#3b82f6"),
		glassBg: v("--ca-glass-bg", "rgba(255,255,255,0.55)"),
		glassBorder: v("--ca-glass-border", "rgba(255,255,255,0.25)"),
		glassShadow: v("--ca-glass-shadow", "0 8px 32px rgba(0,0,0,0.12)"),
		blur: v("--ca-blur-regular", "blur(16px)"),
		outlineSubtle: v("--ca-outline-subtle", "rgba(0,0,0,0.07)"),
		actionHover: v("--ca-action-hover", "rgba(0,0,0,0.04)"),
		radiusMd: v("--ca-radius-md", "12px"),
		radiusLg: v("--ca-radius-lg", "16px"),
		fontSans: v("--ca-font-sans", "Inter,system-ui,-apple-system,BlinkMacSystemFont,sans-serif"),
	};
}

/** Resolve a semantic zone color name (or pass-through a raw CSS color). */
export function resolveZoneColor(name: string, t: ChartTokens = chartTokens()): string {
	switch (name) {
		case "success":
			return t.success;
		case "warning":
			return t.warning;
		case "error":
			return t.error;
		case "info":
			return t.info;
		case "brand":
			return t.brand;
		default:
			return name;
	}
}
