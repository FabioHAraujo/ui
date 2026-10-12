/** `container.querySelector` that fails the test with the selector instead of returning null. */
export function q<T extends Element = HTMLElement>(root: ParentNode, selector: string): T {
	const el = root.querySelector<T>(selector);
	if (!el) throw new Error(`No element matches "${selector}"`);
	return el;
}
