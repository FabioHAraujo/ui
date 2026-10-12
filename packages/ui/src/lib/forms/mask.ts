import type { Action } from "svelte/action";

/** Index in `formatted` right after the `count`-th digit (0 → 0). */
function caretAfterDigits(formatted: string, count: number): number {
	if (count <= 0) return 0;
	let seen = 0;
	for (let i = 0; i < formatted.length; i++) {
		if (/\d/.test(formatted[i])) seen++;
		if (seen === count) return i + 1;
	}
	return formatted.length;
}

/**
 * Formats an `<input>` live with a pure mask function, keeping the caret at the same
 * digit position. When the masked text differs from what the browser produced, the
 * original `input` event is swallowed and a fresh one is dispatched, so `bind:value` /
 * `oninput` listeners see the masked value exactly once (never the raw text).
 * @example `<input use:mask={maskCPF} />`
 */
export const mask: Action<HTMLInputElement, (raw: string) => string> = (node, fn) => {
	let current = fn;

	function apply(e?: Event): void {
		const raw = node.value;
		const masked = current(raw);
		if (masked === raw) return;
		e?.stopImmediatePropagation();
		const caret = node.selectionStart ?? raw.length;
		const digitsBefore = raw.slice(0, caret).replace(/\D/g, "").length;
		node.value = masked;
		// Caret at end stays at end (typing forward); otherwise map by digit count.
		const pos = caret >= raw.length ? masked.length : caretAfterDigits(masked, digitsBefore);
		node.setSelectionRange(pos, pos);
		node.dispatchEvent(new Event("input", { bubbles: true }));
	}

	node.addEventListener("input", apply);
	apply();

	return {
		update(next) {
			current = next;
			apply();
		},
		destroy() {
			node.removeEventListener("input", apply);
		},
	};
};
