import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import { setLocale } from "../../i18n/index.js";
import DocsHarness from "./DocsHarness.test.svelte";

afterEach(() => {
	vi.useRealTimers();
	vi.restoreAllMocks();
	localStorage.removeItem("ca-codetabs");
});

// These tests assert the Portuguese wording of the catalog.
beforeAll(() => setLocale("pt-BR"));
afterAll(() => setLocale("en"));

describe("CodeTabs", () => {
	it("renders a tablist with the first tab selected and only its panel visible; passes axe", async () => {
		const screen = await render(DocsHarness, { kind: "codetabs", sync: "" });
		await expect.element(screen.getByRole("tablist", { name: "Linguagem" })).toBeVisible();
		await expect
			.element(screen.getByRole("tab", { name: "cURL" }))
			.toHaveAttribute("aria-selected", "true");
		await expect
			.element(screen.getByRole("tab", { name: "Node.js" }))
			.toHaveAttribute("aria-selected", "false");
		await expect.element(screen.getByRole("tabpanel")).toMatchTextContent("curl https://api");
		expect(screen.getByRole("tabpanel").elements()).toHaveLength(1);
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("roving tabindex: only the selected tab is tabbable", async () => {
		const screen = await render(DocsHarness, { kind: "codetabs", sync: "" });
		await expect
			.element(screen.getByRole("tab", { name: "cURL" }))
			.toHaveAttribute("tabindex", "0");
		await expect
			.element(screen.getByRole("tab", { name: "Node.js" }))
			.toHaveAttribute("tabindex", "-1");
	});

	it("clicking a tab switches the visible panel and aria-controls matches the panel", async () => {
		const screen = await render(DocsHarness, { kind: "codetabs", sync: "" });
		const tab = screen.getByRole("tab", { name: "Node.js" });
		await tab.click();
		await expect.element(tab).toHaveAttribute("aria-selected", "true");
		const panel = screen.getByRole("tabpanel");
		await expect.element(panel).toMatchTextContent('fetch("https://api")');
		expect(tab.element().getAttribute("aria-controls")).toBe(panel.element().id);
		expect(panel.element().getAttribute("aria-labelledby")).toBe(tab.element().id);
	});

	it("arrow keys wrap, Home/End jump, and focus follows selection", async () => {
		const screen = await render(DocsHarness, { kind: "codetabs", sync: "" });
		(screen.getByRole("tab", { name: "cURL" }).element() as HTMLElement).focus();
		await userEvent.keyboard("{ArrowRight}");
		await expect.element(screen.getByRole("tab", { name: "Node.js" })).toHaveFocus();
		await expect
			.element(screen.getByRole("tab", { name: "Node.js" }))
			.toHaveAttribute("aria-selected", "true");
		await userEvent.keyboard("{End}");
		await expect.element(screen.getByRole("tab", { name: "Python" })).toHaveFocus();
		await userEvent.keyboard("{ArrowRight}");
		await expect.element(screen.getByRole("tab", { name: "cURL" })).toHaveFocus();
		await userEvent.keyboard("{ArrowLeft}");
		await expect.element(screen.getByRole("tab", { name: "Python" })).toHaveFocus();
		await userEvent.keyboard("{Home}");
		await expect.element(screen.getByRole("tab", { name: "cURL" })).toHaveFocus();
	});

	it("groups sharing a sync key follow each other and persist the choice", async () => {
		const screen = await render(DocsHarness, { kind: "codetabs-pair" });
		const nodeTabs = screen.getByRole("tab", { name: "Node.js" });
		await nodeTabs.first().click();
		await expect
			.poll(() =>
				screen
					.getByRole("tab", { name: "Node.js" })
					.elements()
					.map((e) => e.getAttribute("aria-selected"))
			)
			.toEqual(["true", "true"]);
		expect(JSON.parse(localStorage.getItem("ca-codetabs") ?? "{}")).toMatchObject({
			pair: "Node.js",
		});
	});

	it("copy button writes the active panel's code and flips its label for 2s", async () => {
		const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
		const screen = await render(DocsHarness, { kind: "codetabs", sync: "" });
		await screen.getByRole("tab", { name: "Python" }).click();
		await screen.getByRole("button", { name: "Copiar código" }).click();
		await expect.poll(() => writeText.mock.calls.length).toBe(1);
		expect(writeText).toHaveBeenCalledWith('requests.get("https://api")');
		await expect.element(screen.getByRole("button", { name: "Copiado" })).toBeVisible();
		await expect
			.poll(() => screen.getByRole("button", { name: "Copiar código" }).elements().length, {
				timeout: 4000,
			})
			.toBe(1);
	});
});
