import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import { colorScheme } from "../../stores/color-scheme.svelte.js";
import ThemeToggle from "./ThemeToggle.svelte";

const html = document.documentElement;

beforeEach(() => {
	localStorage.removeItem("ca-scheme");
	colorScheme.setPreference("light");
});

afterEach(() => {
	localStorage.removeItem("ca-scheme");
	colorScheme.setPreference("light");
	html.classList.remove("dark");
	localStorage.removeItem("ca-scheme");
});

describe("ThemeToggle", () => {
	it("is a button named by the default label, with matching title", async () => {
		const screen = await render(ThemeToggle, {});
		const btn = screen.getByRole("button", { name: "Toggle color scheme" });
		await expect.element(btn).toHaveAttribute("title", "Toggle color scheme");
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("custom label becomes name and title", async () => {
		const screen = await render(ThemeToggle, { label: "Alternar tema" });
		await expect
			.element(screen.getByRole("button", { name: "Alternar tema" }))
			.toHaveAttribute("title", "Alternar tema");
	});

	it("click toggles .dark on <html> and persists ca-scheme", async () => {
		const screen = await render(ThemeToggle, {});
		const btn = screen.getByRole("button", { name: "Toggle color scheme" });

		await btn.click();
		expect(html.classList.contains("dark")).toBe(true);
		expect(JSON.parse(localStorage.getItem("ca-scheme") as string)).toBe("dark");

		await btn.click();
		expect(html.classList.contains("dark")).toBe(false);
		expect(JSON.parse(localStorage.getItem("ca-scheme") as string)).toBe("light");
	});

	it("is operable by keyboard", async () => {
		const screen = await render(ThemeToggle, {});
		await userEvent.tab();
		await expect.element(screen.getByRole("button", { name: "Toggle color scheme" })).toHaveFocus();
		await userEvent.keyboard("{Enter}");
		expect(html.classList.contains("dark")).toBe(true);
		await userEvent.keyboard(" ");
		expect(html.classList.contains("dark")).toBe(false);
	});

	it("shows only the icon for the opposite scheme (follows .dark)", async () => {
		const screen = await render(ThemeToggle, {});
		const light = screen.container.querySelector(".ca-theme-toggle__icon--light") as HTMLElement;
		const dark = screen.container.querySelector(".ca-theme-toggle__icon--dark") as HTMLElement;
		expect(getComputedStyle(light).display).not.toBe("none");
		expect(getComputedStyle(dark).display).toBe("none");

		await screen.getByRole("button").click();
		expect(getComputedStyle(light).display).toBe("none");
		expect(getComputedStyle(dark).display).not.toBe("none");
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("size prop sizes the icon", async () => {
		const screen = await render(ThemeToggle, { size: 32 });
		const svg = screen.container.querySelector(".ca-theme-toggle__icon--light svg") as SVGElement;
		expect(svg.getAttribute("width")).toBe("32");
	});
});
