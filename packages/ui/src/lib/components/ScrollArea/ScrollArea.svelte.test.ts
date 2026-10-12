import { createRawSnippet } from "svelte";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import ScrollArea from "./ScrollArea.svelte";

const tall = createRawSnippet(() => ({
	render: () =>
		`<div data-testid="content" style="height:600px;width:800px"><button type="button">Item</button></div>`,
}));

describe("ScrollArea", () => {
	it("renders children inside the viewport", async () => {
		const screen = await render(ScrollArea, { children: tall, maxHeight: "100px" });
		const viewport = screen.container.querySelector<HTMLElement>("[data-scroll-area-viewport]");
		expect(viewport).not.toBeNull();
		expect(viewport?.contains(screen.getByTestId("content").element())).toBe(true);
		await expect.element(screen.getByRole("button", { name: "Item" })).toBeVisible();
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("maxHeight / maxWidth constrain the root and the content scrolls", async () => {
		const screen = await render(ScrollArea, {
			children: tall,
			maxHeight: "100px",
			maxWidth: "200px",
			orientation: "both",
		});
		const root = screen.container.querySelector<HTMLElement>(
			"[data-scroll-area-root]"
		) as HTMLElement;
		const rect = root.getBoundingClientRect();
		expect(rect.height).toBeLessThanOrEqual(100);
		expect(rect.width).toBeLessThanOrEqual(200);
		const viewport = screen.container.querySelector<HTMLElement>(
			"[data-scroll-area-viewport]"
		) as HTMLElement;
		expect(viewport.scrollHeight).toBeGreaterThan(viewport.clientHeight);
		expect(viewport.scrollWidth).toBeGreaterThan(viewport.clientWidth);
		viewport.scrollTop = 50;
		expect(viewport.scrollTop).toBe(50);
	});

	it("keeps content keyboard-reachable inside the scrolled region", async () => {
		const screen = await render(ScrollArea, { children: tall, maxHeight: "100px", type: "always" });
		const btn = screen.getByRole("button", { name: "Item" }).element() as HTMLElement;
		btn.focus();
		expect(document.activeElement).toBe(btn);
	});

	it.each([
		["vertical", 1, 0],
		["horizontal", 0, 1],
		["both", 1, 1],
	] as const)(
		"orientation %s renders matching scrollbars (type=always)",
		async (orientation, v, h) => {
			const screen = await render(ScrollArea, {
				children: tall,
				maxHeight: "100px",
				maxWidth: "200px",
				type: "always",
				orientation,
			});
			await expect
				.poll(
					() =>
						screen.container.querySelectorAll(
							'[data-orientation="vertical"][data-scroll-area-scrollbar]'
						).length
				)
				.toBe(v);
			expect(
				screen.container.querySelectorAll(
					'[data-orientation="horizontal"][data-scroll-area-scrollbar]'
				)
			).toHaveLength(h);
			expect(await checkA11y(screen.container)).toHaveNoViolations();
		}
	);
});
