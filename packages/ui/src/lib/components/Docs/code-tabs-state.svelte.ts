import { storageGet, storageSet } from "../../utils/local-storage.js";

/**
 * Shared preferred-language state for CodeTabs groups with the same `sync` key.
 * Picking "Node.js" in one group flips every other group on the page that has a tab
 * with that label, and the choice survives reloads (localStorage).
 *
 * `init()` runs after mount (never during SSR/hydration) so the first paint always
 * matches the server-rendered first tab.
 */
const KEY = "ca-codetabs";

let prefs = $state<Record<string, string>>({});
let ready = $state(false);

export const codeTabsPrefs = {
	get ready() {
		return ready;
	},
	init() {
		if (ready || typeof window === "undefined") return;
		prefs = storageGet<Record<string, string>>(KEY, {});
		ready = true;
	},
	get(sync: string): string | undefined {
		return prefs[sync];
	},
	set(sync: string, label: string) {
		prefs = { ...prefs, [sync]: label };
		storageSet(KEY, prefs);
	},
};
