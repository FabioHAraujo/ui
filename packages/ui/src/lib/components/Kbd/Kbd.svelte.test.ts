import { createRawSnippet } from "svelte";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import { q } from "../../../../tests/dom";
import Kbd from "./Kbd.svelte";

const text = (t: string) => createRawSnippet(() => ({ render: () => `<span>${t}</span>` }));

describe("Kbd", () => {
	it("renders a <kbd> element with its content", async () => {
		const screen = await render(Kbd, { children: text("⌘K") });
		const kbd = q(screen.container, "kbd");
		expect(kbd).not.toBeNull();
		expect(kbd.textContent).toBe("⌘K");
		await expect.element(screen.getByText("⌘K")).toBeVisible();
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("renders an empty kbd without children", async () => {
		const screen = await render(Kbd, {});
		expect(q(screen.container, "kbd").textContent).toBe("");
	});

	it("merges a custom class", async () => {
		const screen = await render(Kbd, { children: text("Esc"), class: "custom" });
		expect(q(screen.container, "kbd").classList.contains("custom")).toBe(true);
	});
});
