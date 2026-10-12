import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import { settled } from "../../../../tests/settled";
import { setLocale } from "../../i18n/index.js";
import Harness from "./Lightbox.test.svelte";

const open = async (props = {}) => {
	const screen = await render(Harness, props);
	const trigger = screen.getByRole("button", { name: "Ver foto" });
	(trigger.element() as HTMLElement).focus();
	await userEvent.keyboard("{Enter}");
	const dialog = page.getByRole("dialog", { name: "Foto enviada por Maria" });
	await expect.element(dialog).toBeVisible();
	return { screen, trigger, dialog };
};

// These tests assert the Portuguese wording of the catalog.
beforeAll(() => setLocale("pt-BR"));
afterAll(() => setLocale("en"));

describe("Lightbox", () => {
	it("opens from the keyboard showing the image with its alt; no axe violations", async () => {
		await open();
		await expect.element(page.getByRole("img", { name: "Foto enviada por Maria" })).toBeVisible();
		await settled();
		expect(await checkA11y(document.body)).toHaveNoViolations();
	});

	it("Escape closes, calls onclose and returns focus to the trigger", async () => {
		const onclose = vi.fn();
		const { trigger } = await open({ onclose });
		await userEvent.keyboard("{Escape}");
		await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
		expect(onclose).toHaveBeenCalledOnce();
		await expect.element(trigger).toHaveFocus();
	});

	it("close button (keyboard-reachable) dismisses", async () => {
		const onclose = vi.fn();
		await open({ onclose });
		const close = page.getByRole("button", { name: "Fechar" });
		await expect.element(close).toBeVisible();
		(close.element() as HTMLElement).focus();
		await userEvent.keyboard("{Enter}");
		await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
		expect(onclose).toHaveBeenCalled();
	});

	it("clicking the backdrop area dismisses but clicking the image does not", async () => {
		const onclose = vi.fn();
		await open({ onclose });
		await page.getByRole("img", { name: "Foto enviada por Maria" }).click();
		await expect.element(page.getByRole("dialog")).toBeVisible();
		expect(onclose).not.toHaveBeenCalled();

		await page.getByRole("dialog").click({ position: { x: 5, y: 5 } });
		await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
		expect(onclose).toHaveBeenCalled();
	});
});
