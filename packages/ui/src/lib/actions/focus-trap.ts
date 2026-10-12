import type { Action } from "svelte/action";

const FOCUSABLE =
	'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Traps keyboard focus inside the element when `enabled` is true.
 * @example `<div use:focusTrap={open}>`
 */
export const focusTrap: Action<HTMLElement, boolean> = (node, enabled) => {
	function handleKeydown(e: KeyboardEvent) {
		if (e.key !== "Tab") return;
		const focusable = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE));
		if (!focusable.length) return;
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		if (e.shiftKey) {
			if (document.activeElement === first) {
				e.preventDefault();
				last.focus();
			}
		} else {
			if (document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		}
	}

	if (enabled) node.addEventListener("keydown", handleKeydown);

	return {
		update(newEnabled: boolean) {
			node.removeEventListener("keydown", handleKeydown);
			if (newEnabled) node.addEventListener("keydown", handleKeydown);
		},
		destroy() {
			node.removeEventListener("keydown", handleKeydown);
		},
	};
};
