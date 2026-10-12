import { expectNoViolations, gotoReady, makeAxe, settle, test } from "./fixtures";

for (const scheme of ["dark", "light"] as const) {
	test.describe(`overlays a11y ${scheme}`, () => {
		test.use({ theme: { scheme } });

		const cases: {
			route: string;
			trigger: string;
			overlay: "dialog" | "alertdialog" | "menu" | "listbox" | "grid";
			name: string;
		}[] = [
			{
				route: "/docs/feedback/dialog/",
				trigger: "Delete item",
				overlay: "dialog",
				name: "Dialog",
			},
			{
				route: "/docs/feedback/alert-dialog/",
				trigger: "Sign out",
				overlay: "alertdialog",
				name: "AlertDialog",
			},
			{ route: "/docs/feedback/sheet/", trigger: "Open sheet", overlay: "dialog", name: "Sheet" },
			{
				route: "/docs/navigation/drawer/",
				trigger: "Open left drawer",
				overlay: "dialog",
				name: "Drawer",
			},
			{
				route: "/docs/navigation/menu/",
				trigger: "Open menu",
				overlay: "menu",
				name: "DropdownMenu",
			},
			{
				route: "/docs/navigation/command-palette/",
				trigger: "Open command palette",
				overlay: "dialog",
				name: "CommandPalette",
			},
		];

		for (const c of cases) {
			test(`${c.name} open`, async ({ page }, testInfo) => {
				await gotoReady(page, c.route);
				await page.getByRole("button", { name: c.trigger }).first().click();
				await page.getByRole(c.overlay).first().waitFor();
				await settle(page);
				await expectNoViolations(await makeAxe(page).analyze(), testInfo);
			});
		}

		test("DatePicker calendar open", async ({ page }, testInfo) => {
			await gotoReady(page, "/docs/inputs/date-picker/");
			await page.getByRole("button", { name: "Open calendar" }).first().click();
			await page.getByRole("dialog").first().waitFor();
			await settle(page);
			await expectNoViolations(await makeAxe(page).analyze(), testInfo);
		});
	});
}
