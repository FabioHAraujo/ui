import { describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import { settled } from "../../../../tests/settled";
import Harness from "./DropdownMenu.test.svelte";

const openByKeyboard = async (props = {}, key = "{Enter}") => {
	const screen = await render(Harness, props);
	const trigger = screen.getByRole("button", { name: "Ações" });
	await expect.element(trigger).toHaveAttribute("aria-expanded", "false");
	(trigger.element() as HTMLElement).focus();
	await userEvent.keyboard(key);
	const menu = page.getByRole("menu");
	await expect.element(menu).toBeVisible();
	return { screen, trigger, menu };
};

describe("DropdownMenu", () => {
	it.each(["{Enter}", " ", "{ArrowDown}"])(
		"opens from the trigger with %j and exposes menuitems",
		async (key) => {
			const { trigger } = await openByKeyboard({}, key);
			await expect.element(trigger).toHaveAttribute("aria-expanded", "true");
			await expect.element(page.getByRole("menuitem", { name: "Editar" })).toBeVisible();
			await expect.element(page.getByRole("menuitem", { name: "Excluir" })).toBeVisible();
		}
	);

	it("has no axe violations while open", async () => {
		await openByKeyboard();
		await settled();
		expect(
			await checkA11y(document.querySelector('[role="menu"]') as HTMLElement)
		).toHaveNoViolations();
	});

	it("keyboard open focuses first item; arrows skip disabled", async () => {
		await openByKeyboard();
		const edit = page.getByRole("menuitem", { name: "Editar" });
		const del = page.getByRole("menuitem", { name: "Excluir" });
		await expect.element(edit).toHaveFocus();
		await userEvent.keyboard("{ArrowDown}");
		await expect.element(del).toHaveFocus();
		await userEvent.keyboard("{ArrowUp}");
		await expect.element(edit).toHaveFocus();
	});

	it("Enter on an item fires its onclick and closes the menu", async () => {
		const onedit = vi.fn();
		const { trigger } = await openByKeyboard({ onedit });
		await expect.element(page.getByRole("menuitem", { name: "Editar" })).toHaveFocus();
		await userEvent.keyboard("{Enter}");
		expect(onedit).toHaveBeenCalledOnce();
		await expect.element(page.getByRole("menu")).not.toBeInTheDocument();
		await expect.element(trigger).toHaveFocus();
	});

	it("disabled item is aria-disabled and does not fire", async () => {
		await openByKeyboard();
		await expect
			.element(page.getByRole("menuitem", { name: "Duplicar" }))
			.toHaveAttribute("aria-disabled", "true");
	});

	it("Escape closes and returns focus to the trigger", async () => {
		const { trigger } = await openByKeyboard();
		await userEvent.keyboard("{Escape}");
		await expect.element(page.getByRole("menu")).not.toBeInTheDocument();
		await expect.element(trigger).toHaveFocus();
		await expect.element(trigger).toHaveAttribute("aria-expanded", "false");
	});

	it("click opens and clicking an item runs it", async () => {
		const ondelete = vi.fn();
		const screen = await render(Harness, { ondelete });
		await screen.getByRole("button", { name: "Ações" }).click();
		await page.getByRole("menuitem", { name: "Excluir" }).click();
		expect(ondelete).toHaveBeenCalledOnce();
	});
});
