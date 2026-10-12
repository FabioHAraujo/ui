import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import { q } from "../../../../tests/dom";
import Divider from "./Divider.svelte";

describe("Divider", () => {
	it("defaults to a horizontal separator", async () => {
		const screen = await render(Divider, {});
		const sep = screen.getByRole("separator");
		await expect.element(sep).toHaveAttribute("aria-orientation", "horizontal");
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("vertical orientation is exposed and passes axe", async () => {
		const screen = await render(Divider, { orientation: "vertical" });
		await expect
			.element(screen.getByRole("separator"))
			.toHaveAttribute("aria-orientation", "vertical");
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("horizontal is a 1px-tall line; vertical is a 1px-wide line", async () => {
		const h = await render(Divider, { orientation: "horizontal" });
		const hb = q(h.container, ".ca-divider").getBoundingClientRect();
		expect(hb.height).toBe(1);
		expect(hb.width).toBeGreaterThan(1);
		const v = await render(Divider, { orientation: "vertical" });
		const vs = getComputedStyle(q(v.container, ".ca-divider"));
		expect(vs.width).toBe("1px");
		expect(vs.height).not.toBe("1px");
	});

	it("merges a custom class", async () => {
		const screen = await render(Divider, { class: "custom" });
		await expect.element(screen.getByRole("separator")).toHaveClass("custom");
	});
});
