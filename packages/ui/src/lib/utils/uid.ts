// ─── uid utility ──────────────────────────────────────────────────────────────
export function uid(prefix = "ca"): string {
	return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
