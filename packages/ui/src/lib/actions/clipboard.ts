import type { Action } from "svelte/action";

/**
 * Copies `text` to clipboard on click; fires 'copy' custom event.
 * @example `<button use:clipboard={'some text'}>`
 */
export const clipboard: Action<
	HTMLElement,
	string,
	{ oncopy: (e: CustomEvent<string>) => void }
> = (node, text) => {
	let currentText = text;

	async function handleClick() {
		try {
			await navigator.clipboard.writeText(currentText);
			node.dispatchEvent(new CustomEvent("copy", { detail: currentText }));
		} catch {
			// clipboard API not available (e.g. non-HTTPS)
		}
	}

	node.addEventListener("click", handleClick);

	return {
		update(newText: string) {
			currentText = newText;
		},
		destroy() {
			node.removeEventListener("click", handleClick);
		},
	};
};
