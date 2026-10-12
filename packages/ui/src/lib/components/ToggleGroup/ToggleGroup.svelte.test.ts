import { describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import ToggleGroupHarness from "./ToggleGroupHarness.test.svelte";

describe("ToggleGroup", () => {
	it("single: one pressed item at a time, aria-checked on radios, bound value follows", async () => {
		const onchange = vi.fn();
		const screen = await render(ToggleGroupHarness, {
			type: "single",
			onchange,
			"aria-label": "Alinhamento",
		});
		await expect.element(screen.getByRole("group", { name: "Alinhamento" })).toBeVisible();
		const left = screen.getByRole("radio", { name: "Esquerda" });
		const center = screen.getByRole("radio", { name: "Centro" });
		await left.click();
		await expect.element(left).toHaveAttribute("aria-checked", "true");
		await center.click();
		await expect.element(center).toHaveAttribute("aria-checked", "true");
		await expect.element(left).toHaveAttribute("aria-checked", "false");
		await expect.element(screen.getByTestId("bound")).toHaveTextContent("center");
		expect(onchange).toHaveBeenLastCalledWith("center");
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("single: arrows move focus (roving tabindex) and Space selects", async () => {
		const screen = await render(ToggleGroupHarness, {
			type: "single",
			initial: "left",
			"aria-label": "Alinhamento",
		});
		const left = screen.getByRole("radio", { name: "Esquerda" });
		left.element().focus();
		await userEvent.keyboard("{ArrowRight}");
		const center = screen.getByRole("radio", { name: "Centro" });
		expect(document.activeElement).toBe(center.element());
		await userEvent.keyboard(" ");
		await expect.element(center).toHaveAttribute("aria-checked", "true");
		await expect.element(screen.getByTestId("bound")).toHaveTextContent("center");
	});

	it("multiple: several items can be pressed at once", async () => {
		const onchange = vi.fn();
		const screen = await render(ToggleGroupHarness, {
			type: "multiple",
			onchange,
			"aria-label": "Formatação",
		});
		const bold = screen.getByRole("button", { name: "Negrito" });
		const italic = screen.getByRole("button", { name: "Itálico" });
		await bold.click();
		await italic.click();
		await expect.element(bold).toHaveAttribute("aria-pressed", "true");
		await expect.element(italic).toHaveAttribute("aria-pressed", "true");
		expect(onchange).toHaveBeenLastCalledWith(["bold", "italic"]);
		await bold.click();
		await expect.element(bold).toHaveAttribute("aria-pressed", "false");
		await expect.element(screen.getByTestId("bound")).toHaveTextContent("italic");
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("disabled items cannot be selected", async () => {
		const onchange = vi.fn();
		const screen = await render(ToggleGroupHarness, {
			type: "single",
			onchange,
			"aria-label": "Alinhamento",
		});
		const right = screen.getByRole("radio", { name: "Direita" });
		await expect.element(right).toBeDisabled();
		await right.click({ force: true });
		expect(onchange).not.toHaveBeenCalled();
	});
});
