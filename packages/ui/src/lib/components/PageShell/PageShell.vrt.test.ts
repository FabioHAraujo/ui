import { afterEach, describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-svelte";
import { settled } from "../../../../tests/settled";
import { VIEWPORTS } from "../../../../tests/viewports";
import { applyTheme, SCHEMES, STYLES, vrtReady } from "../../../../tests/vrt";
import Matrix from "./PageShellMatrix.test.svelte";

describe("PageShell (vrt)", () => {
	afterEach(async () => {
		await page.viewport(...VIEWPORTS.desktop);
	});

	for (const scheme of SCHEMES) {
		for (const style of STYLES) {
			it(`desktop ${scheme} / ${style}`, async () => {
				await page.viewport(...VIEWPORTS.desktop);
				applyTheme({ scheme, style });
				await render(Matrix);
				await settled();
				await vrtReady();
				await expect
					.element(page.getByTestId("matrix"))
					.toMatchScreenshot(`PageShell-${scheme}-${style}`);
			});
		}
	}

	for (const scheme of SCHEMES) {
		it(`mobile ${scheme} / glass`, async () => {
			await page.viewport(...VIEWPORTS.mobile);
			applyTheme({ scheme, style: "glass" });
			await render(Matrix);
			await settled();
			await vrtReady();
			await expect
				.element(page.getByTestId("matrix"))
				.toMatchScreenshot(`PageShell-mobile-${scheme}-glass`);
		});
	}
});
