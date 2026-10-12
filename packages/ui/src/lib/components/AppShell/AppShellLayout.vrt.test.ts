import { afterEach, describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-svelte";
import { settled } from "../../../../tests/settled";
import { VIEWPORTS } from "../../../../tests/viewports";
import { applyTheme, SCHEMES, STYLES, vrtReady } from "../../../../tests/vrt";
import Matrix from "./AppShellLayoutMatrix.test.svelte";
import { PANEL_WIDTH } from "./types";

describe("AppShellLayout (vrt)", () => {
	afterEach(async () => {
		await page.viewport(...VIEWPORTS.desktop);
	});

	for (const scheme of SCHEMES) {
		for (const style of STYLES) {
			it(`desktop ${scheme} / ${style}`, async () => {
				await page.viewport(...VIEWPORTS.desktop);
				applyTheme({ scheme, style });
				await render(Matrix);
				// The panel width is spring-driven (JS); wait for it to reach its final value.
				const panel = page.getByRole("complementary", { name: "Section navigation" });
				await expect
					.poll(() => panel.element().getBoundingClientRect().width)
					.toBeCloseTo(PANEL_WIDTH, 0);
				await settled();
				await vrtReady();
				await expect
					.element(page.getByTestId("matrix"))
					.toMatchScreenshot(`AppShellLayout-${scheme}-${style}`);
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
				.toMatchScreenshot(`AppShellLayout-mobile-${scheme}-glass`);
		});
	}
});
