import { describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import TabsHarness from "./TabsHarness.test.svelte";

describe("Tabs", () => {
	it("marks the active tab and shows only its panel", async () => {
		const screen = await render(TabsHarness, {});
		const conta = screen.getByRole("tab", { name: "Conta" });
		const senha = screen.getByRole("tab", { name: "Senha" });
		await expect.element(conta).toHaveAttribute("aria-selected", "true");
		await expect.element(senha).toHaveAttribute("aria-selected", "false");
		await expect.element(screen.getByRole("tabpanel")).toMatchTextContent("Painel conta");
		await expect.element(screen.getByText("Painel senha")).not.toBeVisible();
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("uses roving tabindex: only the active tab is tabbable", async () => {
		const screen = await render(TabsHarness, {});
		await expect
			.element(screen.getByRole("tab", { name: "Conta" }))
			.toHaveAttribute("tabindex", "0");
		await expect
			.element(screen.getByRole("tab", { name: "Senha" }))
			.toHaveAttribute("tabindex", "-1");
		await expect
			.element(screen.getByRole("tab", { name: "Equipe" }))
			.toHaveAttribute("tabindex", "-1");
	});

	it("clicking a tab switches content, bound value and fires onchange", async () => {
		const onchange = vi.fn();
		const screen = await render(TabsHarness, { onchange });
		await screen.getByRole("tab", { name: "Senha" }).click();
		await expect
			.element(screen.getByRole("tab", { name: "Senha" }))
			.toHaveAttribute("aria-selected", "true");
		await expect.element(screen.getByRole("tabpanel")).toMatchTextContent("Painel senha");
		await expect.element(screen.getByTestId("value")).toHaveTextContent("b");
		expect(onchange).toHaveBeenCalledWith("b");
	});

	it("arrow keys move focus (skipping disabled) and wrap around", async () => {
		const screen = await render(TabsHarness, {});
		const conta = screen.getByRole("tab", { name: "Conta" });
		(conta.element() as HTMLElement).focus();
		await userEvent.keyboard("{ArrowRight}");
		await expect.element(screen.getByRole("tab", { name: "Senha" })).toHaveFocus();
		// Faturas is disabled → next stop is Equipe
		await userEvent.keyboard("{ArrowRight}");
		await expect.element(screen.getByRole("tab", { name: "Equipe" })).toHaveFocus();
		await userEvent.keyboard("{ArrowRight}");
		await expect.element(conta).toHaveFocus();
		await userEvent.keyboard("{ArrowLeft}");
		await expect.element(screen.getByRole("tab", { name: "Equipe" })).toHaveFocus();
	});

	it("keyboard activation selects the focused tab", async () => {
		const screen = await render(TabsHarness, {});
		(screen.getByRole("tab", { name: "Conta" }).element() as HTMLElement).focus();
		await userEvent.keyboard("{ArrowRight}");
		await userEvent.keyboard("{Enter}");
		await expect
			.element(screen.getByRole("tab", { name: "Senha" }))
			.toHaveAttribute("aria-selected", "true");
		await expect.element(screen.getByRole("tabpanel")).toMatchTextContent("Painel senha");
	});

	it("disabled tab cannot be selected", async () => {
		const screen = await render(TabsHarness, {});
		const faturas = screen.getByRole("tab", { name: "Faturas" });
		await expect.element(faturas).toBeDisabled();
		await faturas.click({ force: true });
		await expect.element(screen.getByTestId("value")).toHaveTextContent("a");
	});

	it("tab and panel reference each other", async () => {
		const screen = await render(TabsHarness, {});
		const tab = screen.getByRole("tab", { name: "Conta" }).element();
		const panel = screen.getByRole("tabpanel").element();
		expect(tab.getAttribute("aria-controls")).toBe(panel.id);
		expect(panel.getAttribute("aria-labelledby")).toBe(tab.id);
	});
});
