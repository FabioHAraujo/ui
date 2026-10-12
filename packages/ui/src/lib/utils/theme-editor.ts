/**
 * @codeatlas/ui — Theme Editor Token Generator
 *
 * editorTokensToCSS  — full CSS for export (includes color/surface tokens)
 * editorPreviewCSS   — structural-only CSS for live preview (no color overrides)
 *                      Use this to avoid overriding dark-mode surface tokens.
 */

import type { SurfaceStyle } from "../stores/color-scheme.svelte.js";
import { generatePreset, tokensToCSS } from "./palette-generator.js";

export type { SurfaceStyle };

export interface ThemeConfig {
	hue: number;
	chroma: number;
	lightL: number;

	radiusBase: number;
	spacingBase: number;
	fontSans: string;
	fontMono: string;
	fontScale: number;
	shadowIntensity: number;
	blurBase: number;
	surfaceStyle: SurfaceStyle;
	pagePx: number;
	pagePt: number;
	cardPadding: number;
}

export const DEFAULT_CONFIG: ThemeConfig = {
	hue: 55,
	chroma: 0.21,
	lightL: 0.54,

	radiusBase: 10,
	spacingBase: 4,
	fontSans: "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
	fontMono: '"JetBrains Mono", "Fira Code", Consolas, monospace',
	fontScale: 1.0,
	shadowIntensity: 1.0,
	blurBase: 14,
	surfaceStyle: "glass",
	pagePx: 24,
	pagePt: 20,
	cardPadding: 20,
};

function scaleRadius(base: number, defaultBase = 10, value: number): number {
	return Math.round((base / defaultBase) * value);
}

function scaleFontSize(scale: number, rem: number): string {
	return `${Math.round(rem * scale * 1000) / 1000}rem`;
}

function scaleShadowOpacity(intensity: number, base: number): number {
	return Math.round(base * intensity * 1000) / 1000;
}

function makeHelpers(cfg: ThemeConfig) {
	return {
		r: (v: number) => scaleRadius(cfg.radiusBase, 10, v),
		sp: (n: number) => `${cfg.spacingBase * n}px`,
		fs: (rem: number) => scaleFontSize(cfg.fontScale, rem),
		si: (v: number) => scaleShadowOpacity(cfg.shadowIntensity, v),
		blur: {
			ultraThin: `blur(${Math.round(cfg.blurBase * 0.57)}px) saturate(160%)`,
			thin: `blur(${cfg.blurBase}px) saturate(175%)`,
			regular: `blur(${Math.round(cfg.blurBase * 1.57)}px) saturate(190%)`,
			thick: `blur(${Math.round(cfg.blurBase * 2.28)}px) saturate(200%)`,
			chrome: `blur(${Math.round(cfg.blurBase * 3.14)}px) saturate(210%)`,
		},
	};
}

/** Structural tokens only — radius, spacing, typography, shadows, blur.
 *  NO color/surface/text tokens so dark mode stays intact. */
function structuralBlock(cfg: ThemeConfig): string {
	const { r, sp, fs, si, blur } = makeHelpers(cfg);

	return `
/* ── Border radius ─────────────────────────────────────────────────────── */
:root {
  --ca-radius-xs:   ${r(4)}px;
  --ca-radius-sm:   ${r(6)}px;
  --ca-radius-md:   ${r(10)}px;
  --ca-radius-lg:   ${r(14)}px;
  --ca-radius-xl:   ${r(20)}px;
  --ca-radius-pill: 999px;

  /* ── Spacing (base ${cfg.spacingBase}px) ──────────────────────────────────── */
  --ca-space-1:  ${sp(1)};
  --ca-space-2:  ${sp(2)};
  --ca-space-3:  ${sp(3)};
  --ca-space-4:  ${sp(4)};
  --ca-space-5:  ${sp(5)};
  --ca-space-6:  ${sp(6)};
  --ca-space-7:  ${sp(7)};
  --ca-space-8:  ${sp(8)};
  --ca-space-10: ${sp(10)};
  --ca-space-12: ${sp(12)};
  --ca-space-16: ${sp(16)};

  /* ── Page layout ──────────────────────────────────────────────────────── */
  --ca-page-px:      ${cfg.pagePx}px;
  --ca-page-px-sm:   ${Math.round(cfg.pagePx * 0.67)}px;
  --ca-page-pt:      ${cfg.pagePt}px;
  --ca-page-gap:     ${cfg.pagePt}px;
  --ca-card-padding: ${cfg.cardPadding}px;

  /* ── Typography ───────────────────────────────────────────────────────── */
  --ca-font-sans: ${cfg.fontSans};
  --ca-font-mono: ${cfg.fontMono};

  --ca-font-size-h1:      ${fs(2.25)};
  --ca-font-size-h2:      ${fs(1.875)};
  --ca-font-size-h3:      ${fs(1.5)};
  --ca-font-size-h4:      ${fs(1.25)};
  --ca-font-size-h5:      ${fs(1.0625)};
  --ca-font-size-h6:      ${fs(0.9375)};
  --ca-font-size-body1:   ${fs(0.9375)};
  --ca-font-size-body2:   ${fs(0.8125)};
  --ca-font-size-caption: ${fs(0.75)};
  --ca-font-size-label:   ${fs(0.8125)};
  --ca-font-size-button:  ${fs(0.875)};
  --ca-font-size-micro:   ${fs(0.6875)};
  --ca-font-size-dialog:  ${fs(1)};

  /* ── Shadows (light) ──────────────────────────────────────────────────── */
  --ca-shadow-xs: 0 1px 2px  oklch(0.25 0.008 70 / ${si(0.07)});
  --ca-shadow-sm: 0 2px 4px  oklch(0.25 0.008 70 / ${si(0.09)});
  --ca-shadow-md: 0 4px 16px oklch(0.25 0.008 70 / ${si(0.12)});
  --ca-shadow-lg: 0 8px 32px oklch(0.25 0.008 70 / ${si(0.15)});
  --ca-shadow-xl: 0 16px 48px oklch(0.25 0.008 70 / ${si(0.19)});

  /* ── Blur scale ───────────────────────────────────────────────────────── */
  --ca-blur-ultra-thin: ${blur.ultraThin};
  --ca-blur-thin:       ${blur.thin};
  --ca-blur-regular:    ${blur.regular};
  --ca-blur-thick:      ${blur.thick};
  --ca-blur-chrome:     ${blur.chrome};
}

.dark {
  /* ── Shadows (dark — stronger) ──────────────────────────────────────── */
  --ca-shadow-xs: 0 1px 3px  oklch(0 0 0 / ${si(0.3)});
  --ca-shadow-sm: 0 2px 6px  oklch(0 0 0 / ${si(0.35)});
  --ca-shadow-md: 0 4px 20px oklch(0 0 0 / ${si(0.4)});
  --ca-shadow-lg: 0 8px 36px oklch(0 0 0 / ${si(0.45)});
  --ca-shadow-xl: 0 16px 56px oklch(0 0 0 / ${si(0.5)});
}`;
}

function surfaceOverride(cfg: ThemeConfig): string {
	if (cfg.surfaceStyle === "glass") return "";

	const isSolid = cfg.surfaceStyle === "solid";
	const isFlat = cfg.surfaceStyle === "flat";
	const isFrosted = cfg.surfaceStyle === "frosted";

	const frostedBlur = {
		ut: "blur(5px) saturate(140%)",
		th: "blur(8px) saturate(155%)",
		re: "blur(12px) saturate(165%)",
		tk: "blur(18px) saturate(175%)",
		ch: "blur(24px) saturate(185%)",
	};

	return `

/* ── Surface style: ${cfg.surfaceStyle} ────────────────────────────────────── */
:root {${
		isSolid || isFrosted
			? `
  --ca-blur-ultra-thin: ${isSolid ? "none" : frostedBlur.ut};
  --ca-blur-thin:       ${isSolid ? "none" : frostedBlur.th};
  --ca-blur-regular:    ${isSolid ? "none" : frostedBlur.re};
  --ca-blur-thick:      ${isSolid ? "none" : frostedBlur.tk};
  --ca-blur-chrome:     ${isSolid ? "none" : frostedBlur.ch};`
			: ""
	}${
		isSolid || isFlat
			? `
  --ca-overlay-bg:   var(--ca-surface-overlay);
  --ca-overlay-blur: none;
  --ca-panel-bg:     var(--ca-surface-overlay);
  --ca-panel-blur:   none;
  --ca-chrome-bg:    var(--ca-surface-raised);
  --ca-chrome-blur:  none;`
			: ""
	}${
		isFlat
			? `
  --ca-blur-ultra-thin: none;
  --ca-blur-thin:       none;
  --ca-blur-regular:    none;
  --ca-blur-thick:      none;
  --ca-blur-chrome:     none;
  --ca-shadow-xs: none;
  --ca-shadow-sm: none;
  --ca-shadow-md: 0 0 0 1px var(--ca-outline-subtle);
  --ca-shadow-lg: 0 0 0 1px var(--ca-outline-subtle);
  --ca-shadow-xl: 0 0 0 1px var(--ca-outline-default);`
			: ""
	}
}`;
}

/**
 * Full CSS for export — includes color tokens from palette generator.
 * Paste into app.css after the global.css import.
 */
export function editorTokensToCSS(cfg: ThemeConfig): string {
	const palette = generatePreset(cfg.hue, cfg.chroma, cfg.lightL);
	const paletteCSS = tokensToCSS(palette, null);

	return `/* ── CodeAtlas UI — Custom Theme ──────────────────────────────────────────
 * Generated by Theme Editor.
 * Paste into your app.css after the @import of global.css.
 * ─────────────────────────────────────────────────────────────────────── */

${paletteCSS}
${structuralBlock(cfg)}${surfaceOverride(cfg)}`;
}

/**
 * Preview CSS — uses :root:root (higher specificity than :root) so the
 * injected <style> tag always overrides the theme CSS regardless of DOM order.
 */
export function editorPreviewCSS(cfg: ThemeConfig): string {
	const palette = generatePreset(cfg.hue, cfg.chroma, cfg.lightL);
	// Scope tokens to .te__preview-body only — never affects topbar/controls
	const paletteCSS = tokensToCSS(palette, null, ".te__preview-body", ".dark .te__preview-body");

	const structural = structuralBlock(cfg)
		.replace(/:root \{/g, ".te__preview-body {")
		.replace(/^\.dark \{/gm, ".dark .te__preview-body {");

	const override = surfaceOverride(cfg).replace(/:root \{/g, ".te__preview-body {");

	return `${paletteCSS}
${structural}${override}`;
}
