// ─── defineTheme: typed theme object → deterministic CSS ─────────────────────
// MUI-style: `defineTheme()` resolves a partial definition once; `themeCSS()`
// compiles it to one CSS string (same input → same output), injected by
// themeHead before any stylesheet. No runtime style insertion per render.

import {
	cssBlock,
	generatePreset,
	hexToOklch,
	oklchToHex,
	presetVars,
	type TokenMap,
} from "../utils/palette-generator.js";
import { BUILTIN_PRESETS, type BuiltinPresetSource } from "./builtins.js";

export type ColorScheme = "light" | "dark" | "system";
export type SurfaceStyle = "glass" | "frosted" | "solid" | "flat";

export const SCHEMES: readonly ColorScheme[] = ["light", "dark", "system"];
export const STYLES: readonly SurfaceStyle[] = ["glass", "frosted", "solid", "flat"];
/** Deps that must be bundled for SSR (extensionless .svelte imports, ESM-only). */
export const SSR_NO_EXTERNAL = ["@tanstack/svelte-table", "@tanstack/table-core", "shiki"];

export const BUILTIN_IDS: readonly string[] = BUILTIN_PRESETS.map((p) => p.id);

/** A preset generated from one sRGB hex color (e.g. the logo color). */
export interface PresetDefinition {
	/** Value for `data-preset`. Must not clash with a built-in preset id. */
	id: string;
	/** Brand color as `#rrggbb`. Hue, chroma and lightness are derived from it. */
	color: `#${string}`;
	label?: string;
}

export interface ThemeDefinition {
	/** Brand presets, emitted inline so they paint with the first frame. Built-ins are always available. */
	presets: PresetDefinition[];
	/** Preset applied until the user picks one. @default "amber" */
	defaultPreset: string;
	/** Scheme applied until the user picks one. @default "dark" */
	defaultScheme: ColorScheme;
	/** Surface style applied until the user picks one. @default "glass" */
	defaultStyle: SurfaceStyle;
	/** Font stacks for --ca-font-sans / --ca-font-mono / --ca-font-display. */
	fonts: { display?: string; body?: string; mono?: string };
	/** Radius multiplier. @default 1 */
	radius: number;
	/** @default "comfortable" */
	density: "compact" | "comfortable";
	/** Raw token overrides per scheme. */
	overrides: { light?: TokenMap; dark?: TokenMap };
}

export interface ResolvedTheme extends ThemeDefinition {
	/** Every valid `data-preset` value: built-ins + brand presets. */
	known: string[];
	/** Hex of --ca-surface-base per preset and scheme, for `<meta name="theme-color">`. */
	themeColor: Record<string, { light: string; dark: string }>;
}

const HEX = /^#[0-9a-f]{6}$/i;

/** Light/dark token maps (with `color-scheme`) for a built-in or brand preset. */
function presetTokens(src: BuiltinPresetSource | PresetDefinition) {
	let vars: { light: TokenMap; dark: TokenMap };
	if ("hue" in src) {
		const g = presetVars(generatePreset(src.hue, src.chroma, src.lightL));
		vars = {
			light: { ...g.light, ...src.overrides.light },
			dark: { ...g.dark, ...src.overrides.dark },
		};
	} else {
		if (!HEX.test(src.color))
			throw new Error(`[codeatlasdev/ui] preset "${src.id}": color must be #rrggbb`);
		const { l, c, h } = hexToOklch(src.color);
		const g = presetVars(generatePreset(h, c, l));
		vars = { light: { "--ca-chart-brand": src.color, ...g.light }, dark: g.dark };
	}
	const light: Record<string, string> = { "color-scheme": "light", ...vars.light };
	const dark: Record<string, string> = { "color-scheme": "dark", ...vars.dark };
	return { light, dark };
}

/**
 * CSS for one preset. A preset applies on `<html>` or on any element (`data-preset`
 * islands), and `[data-theme-scope="light"|"dark"]` re-applies a scheme inside it.
 * Covered contexts, nearest wins:
 * - `html.dark` around a preset island → dark;
 * - scope on the same element as the preset, or a scope inside the preset;
 * - a preset island inside a scope island.
 * Selectors cannot express proximity, so three or more alternating scope levels
 * around one preset are not supported.
 * - root: also the default (amber) tokens for `:root`, `.dark` and bare scopes.
 * - brand: emitted unlayered by themeHead, so it wins over the layered built-ins.
 */
export function presetCSS(
	src: BuiltinPresetSource | PresetDefinition,
	kind: "root" | "builtin" | "brand"
): string {
	const { light, dark } = presetTokens(src);
	const P = `[data-preset="${src.id}"]`;
	const L = '[data-theme-scope="light"]';
	const D = '[data-theme-scope="dark"]';
	const lightSel = [
		...(kind === "root" ? [":root", L] : []),
		P,
		`${P} ${L}`,
		// Doubled attributes: beat `.dark ${P}` (0,2,0) when the light scope is closer.
		`${P}${L}${L}`,
		`${L}${L} ${P}`,
	];
	const darkSel = [
		...(kind === "root" ? [".dark", D] : []),
		`.dark${P}`,
		`.dark ${P}`,
		`${P} ${D}`,
		`${P}${D}${D}`,
		`${D} ${P}`,
	];
	return `${cssBlock(lightSel.join(",\n"), light)}\n${cssBlock(darkSel.join(",\n"), dark)}`;
}

/** Resolve a partial definition: fills defaults, validates ids, precomputes theme-color hexes. */
export function defineTheme(def: Partial<ThemeDefinition> = {}): ResolvedTheme {
	const presets = def.presets ?? [];
	for (const p of presets) {
		if (BUILTIN_IDS.includes(p.id))
			throw new Error(`[codeatlasdev/ui] preset "${p.id}" clashes with a built-in preset`);
		if (!HEX.test(p.color))
			throw new Error(`[codeatlasdev/ui] preset "${p.id}": color must be #rrggbb`);
	}
	const known = [...BUILTIN_IDS, ...presets.map((p) => p.id)];
	const defaultPreset = def.defaultPreset ?? "amber";
	if (!known.includes(defaultPreset))
		throw new Error(`[codeatlasdev/ui] defaultPreset "${defaultPreset}" is not a known preset`);
	const themeColor: ResolvedTheme["themeColor"] = {};
	for (const src of [...BUILTIN_PRESETS, ...presets]) {
		const { light, dark } = presetTokens(src);
		themeColor[src.id] = {
			light: oklchToHex(light["--ca-surface-base"]),
			dark: oklchToHex(dark["--ca-surface-base"]),
		};
	}
	return {
		presets,
		defaultPreset,
		defaultScheme: def.defaultScheme ?? "dark",
		defaultStyle: def.defaultStyle ?? "glass",
		fonts: def.fonts ?? {},
		radius: def.radius ?? 1,
		density: def.density ?? "comfortable",
		overrides: def.overrides ?? {},
		known,
		themeColor,
	};
}

const RADII = { xs: 4, sm: 6, md: 10, lg: 14, xl: 20 } as const;

/**
 * Compile a resolved theme to CSS: brand presets, then structural tokens
 * (fonts, radius, density) and raw overrides. Deterministic: same theme → same string.
 * Empty string when the theme only uses built-in defaults.
 */
export function themeCSS(t: ResolvedTheme): string {
	const out = t.presets.map((p) => presetCSS(p, "brand"));
	const root: Record<string, string> = {};
	if (t.fonts.body) root["--ca-font-sans"] = t.fonts.body;
	if (t.fonts.mono) root["--ca-font-mono"] = t.fonts.mono;
	if (t.fonts.display) root["--ca-font-display"] = t.fonts.display;
	if (t.radius !== 1)
		for (const [k, v] of Object.entries(RADII))
			root[`--ca-radius-${k}`] = `${+(v * t.radius).toFixed(2)}px`;
	if (t.density === "compact") {
		root["--ca-card-padding"] = "14px";
		root["--ca-page-gap"] = "14px";
		root["--ca-page-pt"] = "14px";
		root["--ca-page-px"] = "16px";
	}
	Object.assign(root, t.overrides.light);
	if (Object.keys(root).length) out.push(cssBlock(':root,\n[data-theme-scope="light"]', root));
	if (t.overrides.dark && Object.keys(t.overrides.dark).length)
		out.push(cssBlock(':root.dark,\n:root [data-theme-scope="dark"]', t.overrides.dark));
	return out.join("\n");
}
