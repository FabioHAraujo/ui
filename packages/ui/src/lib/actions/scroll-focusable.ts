import type { Action } from "svelte/action";

/**
 * Makes a scroll container keyboard-reachable only while it actually overflows
 * (WCAG 2.1.1, axe `scrollable-region-focusable`): `tabindex="0"` when content is
 * wider/taller than the box, removed otherwise so non-scrolling tables add no tab stop.
 * @example `<div class="wrap" use:scrollFocusable>…</div>`
 */
export const scrollFocusable: Action<HTMLElement> = (node) => {
	const update = () => {
		const overflows =
			node.scrollWidth > node.clientWidth + 1 || node.scrollHeight > node.clientHeight + 1;
		if (overflows) node.tabIndex = 0;
		else node.removeAttribute("tabindex");
	};
	const ro = new ResizeObserver(update);
	ro.observe(node);
	for (const child of node.children) ro.observe(child);
	update();
	return { destroy: () => ro.disconnect() };
};
