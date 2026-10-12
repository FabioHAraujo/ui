import { CalendarDate } from "@internationalized/date";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import { setLocale } from "../../i18n/index.js";
import DateHarness from "./DateHarness.test.svelte";

// These tests assert the Portuguese wording of the catalog.
beforeAll(() => setLocale("pt-BR"));
afterAll(() => setLocale("en"));

describe("RangeCalendar", () => {
	it("renders pt-BR heading and passes axe", async () => {
		const screen = await render(DateHarness, { kind: "range" });
		await expect
			.element(screen.getByRole("application", { name: "Período março de 2026" }))
			.toBeVisible();
		await expect.element(screen.getByRole("button", { name: "Próximo mês" })).toBeVisible();
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("two clicks set start and end (value is emitted once the range completes)", async () => {
		const screen = await render(DateHarness, { kind: "range" });
		await screen.getByRole("button", { name: /, 5 de março/ }).click();
		await expect
			.element(screen.getByRole("gridcell", { name: /, 5 de março/ }))
			.toHaveAttribute("data-selection-start");
		await expect.element(screen.getByTestId("end")).toHaveTextContent("");
		await screen.getByRole("button", { name: /, 12 de março/ }).click();
		await expect.element(screen.getByTestId("start")).toHaveTextContent("2026-03-05");
		await expect.element(screen.getByTestId("end")).toHaveTextContent("2026-03-12");
	});

	it("picking an earlier second day swaps the ends", async () => {
		const screen = await render(DateHarness, { kind: "range" });
		await screen.getByRole("button", { name: /, 20 de março/ }).click();
		await screen.getByRole("button", { name: /, 8 de março/ }).click();
		await expect.element(screen.getByTestId("start")).toHaveTextContent("2026-03-08");
		await expect.element(screen.getByTestId("end")).toHaveTextContent("2026-03-20");
	});

	it("keyboard: arrows + Enter choose start and end", async () => {
		const screen = await render(DateHarness, { kind: "range" });
		(screen.getByRole("button", { name: /, 10 de março/ }).element() as HTMLElement).focus();
		await userEvent.keyboard("{Enter}");
		await expect
			.element(screen.getByRole("gridcell", { name: /, 10 de março/ }))
			.toHaveAttribute("data-selection-start");
		await userEvent.keyboard("{ArrowRight}{ArrowRight}{ArrowRight}");
		await userEvent.keyboard("{Enter}");
		await expect.element(screen.getByTestId("start")).toHaveTextContent("2026-03-10");
		await expect.element(screen.getByTestId("end")).toHaveTextContent("2026-03-13");
	});

	it("initial range marks start and end cells as selected", async () => {
		const screen = await render(DateHarness, {
			kind: "range",
			range: { start: new CalendarDate(2026, 3, 4), end: new CalendarDate(2026, 3, 6) },
		});
		for (const d of [/, 4 de março/, /, 5 de março/, /, 6 de março/]) {
			await expect
				.element(screen.getByRole("gridcell", { name: d }))
				.toHaveAttribute("aria-selected", "true");
		}
		await expect
			.element(screen.getByRole("gridcell", { name: /, 4 de março/ }))
			.toHaveAttribute("data-selection-start");
		await expect
			.element(screen.getByRole("gridcell", { name: /, 6 de março/ }))
			.toHaveAttribute("data-selection-end");
	});

	it("minValue blocks earlier days", async () => {
		const screen = await render(DateHarness, {
			kind: "range",
			minValue: new CalendarDate(2026, 3, 10),
		});
		const before = screen.getByRole("button", { name: /, 3 de março/ });
		await expect.element(before).toHaveAttribute("aria-disabled", "true");
		await before.click({ force: true });
		await expect.element(screen.getByTestId("start")).toHaveTextContent("");
	});
});
