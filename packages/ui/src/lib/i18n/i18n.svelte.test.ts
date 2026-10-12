import { afterEach, describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-svelte";
import TableOfContents from "../components/Docs/TableOfContents.svelte";
import { locale, setLocale, t } from "./index.js";

const headings = [
	{ id: "a", text: "Alpha", depth: 2 as const },
	{ id: "b", text: "Beta", depth: 2 as const },
];

afterEach(() => setLocale("en"));

describe("i18n", () => {
	it("defaults to English", () => {
		expect(locale.value).toBe("en");
		expect(t().docs.toc).toBe("On this page");
	});

	it("re-renders component labels when the locale changes", async () => {
		render(TableOfContents, { headings });
		await expect.element(page.getByRole("navigation", { name: "On this page" })).toBeVisible();

		setLocale("pt-BR");
		await expect.element(page.getByRole("navigation", { name: "Nesta página" })).toBeVisible();
	});

	it("deep-merges overrides over the active locale", async () => {
		setLocale("en", { docs: { toc: "In this article" } });
		render(TableOfContents, { headings });
		await expect.element(page.getByRole("navigation", { name: "In this article" })).toBeVisible();
		expect(t().docs.nav).toBe("Pages");
	});

	it("explicit props win over the catalog", async () => {
		setLocale("pt-BR");
		render(TableOfContents, { headings, label: "Contents" });
		await expect.element(page.getByRole("navigation", { name: "Contents" })).toBeVisible();
	});
});
