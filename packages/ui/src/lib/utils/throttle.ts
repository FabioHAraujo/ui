// ─── Throttle utility ─────────────────────────────────────────────────────────
export function throttle<T extends (...args: unknown[]) => unknown>(
	fn: T,
	limit: number
): (...args: Parameters<T>) => void {
	let inThrottle = false;
	return (...args: Parameters<T>) => {
		if (inThrottle) return;
		inThrottle = true;
		fn(...args);
		setTimeout(() => {
			inThrottle = false;
		}, limit);
	};
}
