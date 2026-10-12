// ─── usePageTitle — SvelteKit-aware page title from NavModule config ──────────────

import { toStore } from "svelte/store";
// $app/state works on Kit >=2.12 and Kit 3 ($app/stores was removed in Kit 3).
import { page } from "$app/state";
import type { NavItem, NavModule } from "../components/AppShell/types.js";
import { isNavSection } from "../components/AppShell/types.js";

/**
 * Returns a reactive string with the current page title resolved from
 * a NavModule[] config. Falls back to the last URL segment capitalized.
 *
 * @example
 * ```svelte
 * <script>
 *   import { usePageTitle } from '@codeatlasdev/ui/kit';
 *   import { NAV } from '$lib/nav';
 *   const title = usePageTitle(NAV);
 * </script>
 * <title>{$title}</title>
 * ```
 */
export function usePageTitle(modules: NavModule[]) {
	return toStore(() => {
		const pathname = page.url.pathname;
		for (const mod of modules) {
			for (const entry of mod.items) {
				if (isNavSection(entry)) {
					const hit = entry.items.find((i) => i.path === pathname);
					if (hit) return hit.label;
				} else if ((entry as NavItem).path === pathname) {
					return (entry as NavItem).label;
				}
			}
		}
		// fallback: last URL segment
		const last = pathname.split("/").filter(Boolean).pop() ?? "";
		return last.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
	});
}
