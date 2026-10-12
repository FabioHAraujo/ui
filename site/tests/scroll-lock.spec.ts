import { expect, gotoReady, test } from "./fixtures";

/**
 * bits-ui locks body scroll with `overflow: hidden` (+ a document touchmove guard on iOS). These
 * checks assert the page behind an open overlay does not scroll when the user wheels over the
 * scrim, and that closing restores a stable scroll position.
 * Run on WebKit: `bunx playwright test --project=webkit scroll-lock`.
 *
 * The baseline is read AFTER the trigger click: Playwright scrolls the trigger into view before
 * clicking, which is not a leak.
 */
test.describe("overlay scroll lock", () => {
	test("wheel on the Sheet scrim does not scroll the page", async ({ page }) => {
		await gotoReady(page, "/docs/feedback/sheet/");
		await page.setViewportSize({ width: 390, height: 700 });

		await page.getByRole("button", { name: "Open sheet" }).click();
		await expect(page.getByRole("dialog")).toBeVisible();
		await page.evaluate(
			() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
		);
		const before = await page.evaluate(() => window.scrollY);

		// Scrim region above the panel (panel is anchored to the bottom).
		await page.mouse.move(195, 20);
		await page.mouse.wheel(0, 600);
		await page.mouse.wheel(0, -300);
		await page.evaluate(
			() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
		);

		expect(await page.evaluate(() => window.scrollY)).toBe(before);
		const overlay = await page.evaluate(() => {
			const el = document.querySelector(".ca-sheet__overlay") as HTMLElement;
			const cs = getComputedStyle(el);
			return { touchAction: cs.touchAction, overscroll: cs.overscrollBehaviorY };
		});
		expect(overlay.touchAction).toBe("none");
		expect(overlay.overscroll).toBe("contain");
	});

	test("wheel over the Sheet body does not chain to the page", async ({ page }) => {
		await gotoReady(page, "/docs/feedback/sheet/");
		await page.setViewportSize({ width: 390, height: 360 });

		await page.getByRole("button", { name: "Open sheet" }).click();
		await expect(page.getByRole("dialog")).toBeVisible();
		await page.evaluate(
			() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
		);
		const before = await page.evaluate(() => window.scrollY);

		const body = page.locator(".ca-sheet__body");
		const box = await body.boundingBox();
		if (!box) throw new Error("sheet body not laid out");
		await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
		// Far past the end of the body's own scroll range: must not chain to the page.
		for (let i = 0; i < 5; i++) await page.mouse.wheel(0, 800);
		await page.evaluate(
			() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
		);

		expect(await page.evaluate(() => window.scrollY)).toBe(before);
	});

	test("body styles are fully restored after the Sheet closes", async ({ page }) => {
		await gotoReady(page, "/docs/feedback/sheet/");
		await page.setViewportSize({ width: 390, height: 700 });
		const styleBefore = await page.evaluate(() => document.body.getAttribute("style") ?? "");

		await page.getByRole("button", { name: "Open sheet" }).click();
		await expect(page.getByRole("dialog")).toBeVisible();
		await page.evaluate(
			() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
		);
		const afterOpen = await page.evaluate(() => window.scrollY);
		await page.keyboard.press("Escape");
		await expect(page.getByRole("dialog")).toBeHidden();

		await expect
			.poll(() => page.evaluate(() => document.body.getAttribute("style") ?? ""))
			.toBe(styleBefore);
		expect(await page.evaluate(() => window.scrollY)).toBe(afterOpen);
	});
});
