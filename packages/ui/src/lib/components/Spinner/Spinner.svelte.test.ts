import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import Spinner from "./Spinner.svelte";

describe("Spinner", () => {
	it("is a status with a default accessible label", async () => {
		const screen = await render(Spinner, {});
		await expect.element(screen.getByRole("status", { name: "Loading…" })).toBeInTheDocument();
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("custom label becomes the accessible name", async () => {
		const screen = await render(Spinner, { label: "Salvando" });
		await expect.element(screen.getByRole("status", { name: "Salvando" })).toBeInTheDocument();
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("numeric size renders at that many px", async () => {
		const screen = await render(Spinner, { size: 40 });
		const el = screen.getByRole("status").element() as unknown as SVGElement;
		expect(el.style.getPropertyValue("--spinner-size")).toBe("40px");
		expect(Number.parseFloat(getComputedStyle(el).width)).toBe(40);
		expect(Number.parseFloat(getComputedStyle(el).height)).toBe(40);
	});

	it("string size is passed through as a CSS length", async () => {
		const screen = await render(Spinner, { size: "2rem" });
		const el = screen.getByRole("status").element();
		const rem = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
		expect(Number.parseFloat(getComputedStyle(el).width)).toBe(2 * rem);
	});

	it("defaults to 24px", async () => {
		const screen = await render(Spinner, {});
		expect(Number.parseFloat(getComputedStyle(screen.getByRole("status").element()).width)).toBe(
			24
		);
	});
});
