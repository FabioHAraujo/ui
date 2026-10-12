import type { Action } from "svelte/action";

/**
 * Fires 'longpress' custom event after `duration` ms of pointer held.
 * @example `<button use:longpress={500} onlongpress={handler}>`
 */
export const longpress: Action<HTMLElement, number, { onlongpress?: (e: CustomEvent) => void }> = (
	node,
	duration = 500
) => {
	let currentDuration = duration;
	let timer: ReturnType<typeof setTimeout>;

	function start() {
		timer = setTimeout(() => {
			node.dispatchEvent(new CustomEvent("longpress"));
		}, currentDuration);
	}

	function cancel() {
		clearTimeout(timer);
	}

	node.addEventListener("pointerdown", start);
	node.addEventListener("pointerup", cancel);
	node.addEventListener("pointerleave", cancel);

	return {
		update(d: number) {
			currentDuration = d;
		},
		destroy() {
			cancel();
			node.removeEventListener("pointerdown", start);
			node.removeEventListener("pointerup", cancel);
			node.removeEventListener("pointerleave", cancel);
		},
	};
};
