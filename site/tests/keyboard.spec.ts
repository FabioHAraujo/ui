import { expect, gotoReady, test } from "./fixtures";

test.describe("keyboard flows", () => {
	test("AlertDialog: focus trapped, Escape closes, focus returns to trigger", async ({ page }) => {
		await gotoReady(page, "/docs/feedback/alert-dialog/");
		const trigger = page.getByRole("button", { name: "Sign out" }).first();
		await trigger.focus();
		await page.keyboard.press("Enter");
		const dialog = page.getByRole("alertdialog");
		await expect(dialog).toBeVisible();
		for (let i = 0; i < 6; i++) {
			await page.keyboard.press("Tab");
			await expect(dialog.locator(":focus")).toHaveCount(1);
		}
		await page.keyboard.press("Escape");
		await expect(dialog).toBeHidden();
		await expect(trigger).toBeFocused();
	});

	test("DatePicker: arrows + Enter select a date", async ({ page }) => {
		await gotoReady(page, "/docs/inputs/date-picker/");
		const out = page.locator(".col .out code").first();
		await expect(out).toHaveText("–");
		await page.getByRole("button", { name: "Open calendar" }).first().click();
		const grid = page.getByRole("grid").first();
		await expect(grid).toBeVisible();
		await page.keyboard.press("ArrowRight");
		await page.keyboard.press("Enter");
		await expect(out).toHaveText(/^\d{4}-\d{2}-\d{2}$/);
	});

	test("CommandPalette: Mod+K, type, Enter picks the command", async ({ page }) => {
		await gotoReady(page, "/docs/navigation/command-palette/");
		// Mod+K also opens the docs search; the demo palette is the dialog named "Command palette".
		await page.keyboard.press("ControlOrMeta+k");
		const palette = page.getByRole("dialog", { name: "Command palette" });
		await expect(palette).toBeVisible();
		await page.keyboard.type("Users");
		await expect(palette.getByRole("option").first()).toContainText("Users");
		await page.keyboard.press("Enter");
		await expect(palette).toBeHidden();
		await expect(page.locator(".picked code").first()).toHaveText("/app/users");
	});

	test("CommandPalette demo: button opens, Escape closes and restores focus", async ({ page }) => {
		await gotoReady(page, "/docs/navigation/command-palette/");
		const trigger = page.getByRole("button", { name: "Open command palette" }).first();
		await trigger.click();
		const palette = page.getByRole("dialog", { name: "Command palette" });
		await expect(palette).toBeVisible();
		await page.keyboard.press("Escape");
		await expect(palette).toBeHidden();
		await expect(trigger).toBeFocused();
	});

	test("Docs search (Mod+K in the docs shell): type, Enter navigates", async ({
		page,
		isMobile,
	}) => {
		await gotoReady(page, "/docs/");
		if (isMobile)
			await page
				.getByRole("button", { name: /search/i })
				.first()
				.click();
		else await page.keyboard.press("ControlOrMeta+k");
		await expect(page.getByRole("dialog", { name: /search/i })).toBeVisible();
		const input = page.getByRole("combobox", { name: /search/i });
		if (isMobile) await input.click();
		await page.keyboard.type("Alert Dialog");
		await expect(page.getByRole("option").first()).toBeVisible();
		await page.keyboard.press("Enter");
		await expect(page).toHaveURL(/\/docs\/feedback\/alert-dialog\/(#.*)?$/);
	});

	test("DropdownMenu: opens by keyboard, arrows move, Escape closes", async ({ page }) => {
		await gotoReady(page, "/docs/navigation/menu/");
		const trigger = page.getByRole("button", { name: "Open menu" }).first();
		await trigger.focus();
		await page.keyboard.press("Enter");
		const menu = page.getByRole("menu");
		await expect(menu).toBeVisible();
		const items = menu.getByRole("menuitem");
		await expect(items.first()).toBeFocused();
		await page.keyboard.press("ArrowDown");
		await expect(items.nth(1)).toBeFocused();
		await page.keyboard.press("ArrowUp");
		await expect(items.first()).toBeFocused();
		await page.keyboard.press("Escape");
		await expect(menu).toBeHidden();
		await expect(trigger).toBeFocused();
	});

	test("Select: keyboard opens listbox, arrows + Enter pick an option", async ({ page }) => {
		await gotoReady(page, "/docs/inputs/select/");
		const trigger = page.locator("button.ca-sel__trigger").first();
		const before = (await trigger.textContent())?.trim();
		await trigger.focus();
		await page.keyboard.press("Enter");
		const listbox = page.getByRole("listbox");
		await expect(listbox).toBeVisible();
		await page.keyboard.press("ArrowDown");
		await page.keyboard.press("Enter");
		await expect(listbox).toBeHidden();
		await expect(trigger).not.toHaveText(before as string);
	});

	test("SegmentedControl: arrows move focus, Space selects and moves --seg-index", async ({
		page,
	}) => {
		await gotoReady(page, "/docs/inputs/segmented-control/");
		const group = page.locator(".ca-seg").first();
		const radios = group.getByRole("radio");
		const segIndex = () =>
			group.evaluate((el) => (el as HTMLElement).style.getPropertyValue("--seg-index"));
		const start = Number(await segIndex());
		await radios.nth(start).focus();
		await page.keyboard.press("ArrowRight");
		await expect(radios.nth(start + 1)).toBeFocused();
		await page.keyboard.press("Space");
		await expect.poll(async () => Number(await segIndex())).toBe(start + 1);
		await expect(radios.nth(start + 1)).toHaveAttribute("aria-checked", "true");
	});
});
