// ─── localStorage helpers ─────────────────────────────────────────────────────

export function storageGet<T>(key: string, fallback: T): T {
	if (typeof localStorage === "undefined") return fallback;
	try {
		const raw = localStorage.getItem(key);
		return raw !== null ? (JSON.parse(raw) as T) : fallback;
	} catch {
		return fallback;
	}
}

export function storageSet<T>(key: string, value: T): void {
	if (typeof localStorage !== "undefined") {
		localStorage.setItem(key, JSON.stringify(value));
	}
}

export function storageRemove(key: string): void {
	if (typeof localStorage !== "undefined") {
		localStorage.removeItem(key);
	}
}
