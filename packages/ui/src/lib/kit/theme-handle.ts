// ─── caThemeHandle — SvelteKit handle hook for FOUC prevention ───────────────
// Injects the theme init script (and brand preset styles) into every SSR or
// prerendered page via transformPageChunk. Works with every adapter because it
// runs inside SvelteKit's render pipeline, not Vite's transformIndexHtml.
//
//   import { sequence } from '@sveltejs/kit/hooks';
//   import { caThemeHandle } from '@codeatlasdev/ui/kit';
//
//   export const handle = sequence(
//     caThemeHandle({
//       presets: [{ id: 'brand', color: '#2563eb' }],
//       defaultPreset: 'brand',
//       defaultScheme: 'system',
//     }),
//   );

import type { sequence } from "@sveltejs/kit/hooks";
import { CA_THEME_MARKER, type ThemeOptions, themeHead } from "../theme-script.js";

// `Handle` lives in "@sveltejs/kit" on Kit 2 and in "@sveltejs/kit/hooks" on Kit 3;
// `sequence` is in "/hooks" on both, so derive the type from it.
type Handle = ReturnType<typeof sequence>;

/**
 * SvelteKit `Handle` that puts the theme head (brand presets + init script)
 * right after `<head>`, before any stylesheet or script, so the first paint
 * already has the right preset and scheme.
 *
 * Idempotent: skips pages that already contain the init script.
 */
export function caThemeHandle(options: ThemeOptions = {}): Handle {
	const head = themeHead(options);
	return ({ event, resolve }) =>
		resolve(event, {
			transformPageChunk: ({ html, done }) => {
				if (!done || html.includes(CA_THEME_MARKER)) return html;
				return html.replace("<head>", `<head>${head}`);
			},
		});
}
