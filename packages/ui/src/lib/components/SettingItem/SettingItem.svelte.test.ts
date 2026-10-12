import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import Harness from "./SettingItem.test.svelte";

describe("SettingItem", () => {
	it("renders label and description", async () => {
		const screen = await render(Harness, {
			label: "Notificações",
			description: "Receber avisos por email",
		});
		await expect.element(screen.getByText("Notificações")).toBeVisible();
		await expect.element(screen.getByText("Receber avisos por email")).toBeVisible();
	});

	it("omits the description element when not provided", async () => {
		const screen = await render(Harness, {});
		expect(screen.container.querySelector(".ca-setting-item__desc")).toBeNull();
	});

	it("the switch control is named by the setting label", async () => {
		const screen = await render(Harness, { label: "Notificações" });
		await expect.element(screen.getByRole("switch", { name: "Notificações" })).toBeVisible();
	});

	it("the description is part of the switch's accessible name", async () => {
		const screen = await render(Harness, { label: "Notificações", description: "Receber avisos" });
		await expect
			.element(screen.getByRole("switch", { name: "Notificações Receber avisos" }))
			.toBeVisible();
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("clicking the label text toggles the control", async () => {
		const screen = await render(Harness, { label: "Notificações" });
		await screen.getByText("Notificações").click();
		await expect.element(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
	});

	it("the control stays interactive inside the item", async () => {
		const screen = await render(Harness, { label: "Notificações" });
		const sw = screen.getByRole("switch", { name: "Notificações" });
		await expect.element(sw).toHaveAttribute("aria-checked", "false");
		await sw.click();
		await expect.element(sw).toHaveAttribute("aria-checked", "true");
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});
});
