import { expectNoViolations, makeAxe, settle, test, waitIslands } from "./fixtures";
import { ROUTES } from "./routes";

/**
 * Known package bugs (axe `scrollable-region-focusable`, serious). `test.fail` keeps the suite
 * green while still asserting the violation exists: the test turns red once the bug is fixed,
 * which is the cue to delete the entry.
 *  - SimpleTable: `packages/ui/src/lib/components/Table/Table.svelte:15` reuses `.ca-table-wrap`,
 *    which `styles/prose.css:146` makes a horizontal scroller (global, not scoped to `.ca-prose`)
 *    without the `tabindex="0"` it documents.
 *  - ScrollArea: `components/ScrollArea/ScrollArea.svelte:35` renders a scrollable
 *    `BitsScrollArea.Viewport` with no `tabindex="0"`.
 */

for (const scheme of ["dark", "light"] as const) {
	test.describe(`a11y ${scheme}`, () => {
		test.use({ theme: { scheme } });

		for (const route of ROUTES) {
			test(route, async ({ page }, testInfo) => {
				await page.goto(route);
				await page.waitForLoadState("networkidle");
				await waitIslands(page);
				await settle(page);
				await expectNoViolations(await makeAxe(page).analyze(), testInfo);
			});
		}
	});
}
