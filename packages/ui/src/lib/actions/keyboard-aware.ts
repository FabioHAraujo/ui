import { viewport } from "../stores/viewport.svelte.js";

/**
 * Keeps an element (composer, sticky action bar, full-screen pane) above the
 * on-screen keyboard: pads its bottom by `--ca-kb-inset` and, when the keyboard
 * resizes the viewport, scrolls the focused field inside it back into view.
 * Starts the viewport store if nobody did.
 *
 *   <form use:keyboardAware>…</form>
 */
export function keyboardAware(node: HTMLElement) {
	viewport.init();
	node.style.paddingBottom = "var(--ca-kb-inset, 0px)";
	const vv = window.visualViewport;
	const reveal = () => {
		const el = document.activeElement;
		if (el instanceof HTMLElement && node.contains(el)) el.scrollIntoView({ block: "nearest" });
	};
	vv?.addEventListener("resize", reveal);
	node.addEventListener("focusin", reveal);
	return {
		destroy() {
			vv?.removeEventListener("resize", reveal);
			node.removeEventListener("focusin", reveal);
			node.style.removeProperty("padding-bottom");
		},
	};
}
