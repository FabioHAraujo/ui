import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-svelte";
import { applyTheme, SCHEMES, STYLES, vrtReady } from "../../../../tests/vrt";
import Matrix from "./PopoverMatrix.test.svelte";

// bits-ui Popover.Content has no ARIA role (only the trigger carries aria-haspopup="dialog"),
// so the shared `overlayVrt` role lookup cannot be used; capture the content by its class instead.
describe("Popover (vrt)", () => {
	for (const scheme of SCHEMES) {
		for (const style of STYLES) {
			it(`${scheme} / ${style}`, async () => {
				applyTheme({ scheme, style });
				await render(Matrix);
				await page.getByRole("button", { name: "Detalhes" }).click();
				await expect.element(page.getByText("Resumo do pedido")).toBeVisible();
				const content = page.elementLocator(
					document.querySelector(".ca-popover-content") as HTMLElement
				);
				await vrtReady();
				await expect.element(content).toMatchScreenshot(`Popover-${scheme}-${style}`);
			});
		}
	}
});
