import type { Action } from "svelte/action";

/**
 * Dispatches 'clickoutside' when user clicks outside the element.
 * @example `<div use:clickOutside={handler}>`
 */
export const clickOutside: Action<HTMLElement, () => void> = (node, handler) => {
	let currentHandler = handler;

	function handleClick(event: MouseEvent) {
		if (!node.contains(event.target as Node)) {
			currentHandler?.();
		}
	}

	document.addEventListener("click", handleClick, true);

	return {
		update(newHandler: () => void) {
			currentHandler = newHandler;
		},
		destroy() {
			document.removeEventListener("click", handleClick, true);
		},
	};
};
