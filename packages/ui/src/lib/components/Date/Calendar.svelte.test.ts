import { CalendarDate } from "@internationalized/date";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import { setLocale } from "../../i18n/index.js";
import DateHarness from "./DateHarness.test.svelte";

// These tests assert the Portuguese wording of the catalog.
beforeAll(() => setLocale("pt-BR"));
afterAll(() => setLocale("en"));

describe("Calendar", () => {
	it("renders pt-BR month, weekday names and Portuguese nav labels; passes axe", async () => {
		const screen = await render(DateHarness, { kind: "calendar" });
		await expect
			.element(screen.getByRole("application", { name: "Data março de 2026" }))
			.toBeVisible();
		await expect.element(screen.getByRole("button", { name: "Mês anterior" })).toBeVisible();
		await expect.element(screen.getByRole("button", { name: "Próximo mês" })).toBeVisible();
		await expect.element(screen.getByRole("gridcell", { name: "seg.", exact: true })).toBeVisible();
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("week starts on Monday by default and on Sunday when configured", async () => {
		const mon = await render(DateHarness, { kind: "calendar" });
		const first =
			mon.container.querySelector(".ca-cal__head-cell")?.textContent?.toLowerCase() ?? "";
		expect(first.startsWith("seg")).toBe(true);
		mon.unmount();
		const sun = await render(DateHarness, { kind: "calendar", weekStartsOn: 0 });
		expect(
			sun.container
				.querySelector(".ca-cal__head-cell")
				?.textContent?.toLowerCase()
				.startsWith("dom")
		).toBe(true);
	});

	it("clicking a day selects it", async () => {
		const screen = await render(DateHarness, { kind: "calendar" });
		await screen.getByRole("button", { name: /, 15 de março/ }).click();
		await expect.element(screen.getByTestId("date")).toHaveTextContent("2026-03-15");
	});

	it("arrow keys move focus and Enter selects", async () => {
		const onchange = vi.fn();
		const screen = await render(DateHarness, {
			kind: "calendar",
			onchange,
			date: new CalendarDate(2026, 3, 10),
		});
		const ten = screen.getByRole("button", { name: /, 10 de março/ });
		(ten.element() as HTMLElement).focus();
		await userEvent.keyboard("{ArrowRight}");
		await expect.element(screen.getByRole("button", { name: /, 11 de março/ })).toHaveFocus();
		await userEvent.keyboard("{ArrowDown}");
		await expect.element(screen.getByRole("button", { name: /, 18 de março/ })).toHaveFocus();
		await userEvent.keyboard("{Enter}");
		await expect.element(screen.getByTestId("date")).toHaveTextContent("2026-03-18");
		expect(onchange).toHaveBeenCalledOnce();
	});

	it("selected day is exposed via aria-selected / data-selected", async () => {
		const screen = await render(DateHarness, {
			kind: "calendar",
			date: new CalendarDate(2026, 3, 12),
		});
		const cell = screen.getByRole("gridcell", { name: /, 12 de março/ });
		await expect.element(cell).toHaveAttribute("aria-selected", "true");
	});

	it("next/previous month buttons change the visible month", async () => {
		const screen = await render(DateHarness, { kind: "calendar" });
		await screen.getByRole("button", { name: "Próximo mês" }).click();
		await expect
			.element(screen.getByRole("application", { name: "Data abril de 2026" }))
			.toBeVisible();
		await screen.getByRole("button", { name: "Mês anterior" }).click();
		await screen.getByRole("button", { name: "Mês anterior" }).click();
		await expect
			.element(screen.getByRole("application", { name: "Data fevereiro de 2026" }))
			.toBeVisible();
	});

	it("minValue blocks earlier days", async () => {
		const screen = await render(DateHarness, {
			kind: "calendar",
			minValue: new CalendarDate(2026, 3, 10),
		});
		const before = screen.getByRole("button", { name: /, 5 de março/ });
		await expect.element(before).toHaveAttribute("aria-disabled", "true");
		await before.click({ force: true });
		await expect.element(screen.getByTestId("date")).toHaveTextContent("");
		await screen.getByRole("button", { name: /, 10 de março/ }).click();
		await expect.element(screen.getByTestId("date")).toHaveTextContent("2026-03-10");
	});

	it("minValue disables the previous-month button at the boundary", async () => {
		const screen = await render(DateHarness, {
			kind: "calendar",
			minValue: new CalendarDate(2026, 3, 1),
		});
		await expect
			.element(screen.getByRole("button", { name: "Mês anterior" }))
			.toHaveAttribute("aria-disabled", "true");
	});

	it("isDateUnavailable marks days unavailable and blocks selection", async () => {
		const screen = await render(DateHarness, {
			kind: "calendar",
			isDateUnavailable: (d: CalendarDate) => d.day === 20,
		});
		const day = screen.getByRole("button", { name: /, 20 de março/ });
		await expect.element(day).toHaveAttribute("data-unavailable");
		await day.click({ force: true });
		await expect.element(screen.getByTestId("date")).toHaveTextContent("");
	});

	it("disabled calendar ignores clicks", async () => {
		const screen = await render(DateHarness, { kind: "calendar", disabled: true });
		await screen.getByRole("button", { name: /, 15 de março/ }).click({ force: true });
		await expect.element(screen.getByTestId("date")).toHaveTextContent("");
	});
});
