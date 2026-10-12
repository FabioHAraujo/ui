import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import { setLocale } from "../../i18n/index.js";
import DocsHarness from "./DocsHarness.test.svelte";

// These tests assert the Portuguese wording of the catalog.
beforeAll(() => setLocale("pt-BR"));
afterAll(() => setLocale("en"));

describe("Steps", () => {
	it("wraps an ordered list and exposes its items; passes axe", async () => {
		const screen = await render(DocsHarness, { kind: "steps" });
		await expect.element(screen.getByRole("list")).toBeVisible();
		expect(screen.getByRole("listitem").elements()).toHaveLength(2);
		await expect.element(screen.getByText("Crie uma sessão")).toBeVisible();
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});
});

describe("Callout", () => {
	it.each([
		["note", "Nota"],
		["tip", "Dica"],
		["caution", "Atenção"],
		["danger", "Perigo"],
	] as const)("type %s shows the default title %s and its content", async (type, title) => {
		const screen = await render(DocsHarness, { kind: "callout", type });
		await expect.element(screen.getByText(title, { exact: true })).toBeVisible();
		await expect.element(screen.getByText("Conteúdo do aviso")).toBeVisible();
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("custom title overrides the default", async () => {
		const screen = await render(DocsHarness, { kind: "callout", title: "Cuidado!" });
		await expect.element(screen.getByText("Cuidado!", { exact: true })).toBeVisible();
		await expect.element(screen.getByText("Nota", { exact: true })).not.toBeInTheDocument();
	});
});

describe("CardGrid / LinkCard", () => {
	it("renders each card as a whole-card link with title and description; passes axe", async () => {
		const screen = await render(DocsHarness, { kind: "cardgrid" });
		const guia = screen.getByRole("link", { name: /Guia/ });
		await expect.element(guia).toHaveAttribute("href", "/guia");
		await expect.element(guia).toMatchTextContent("Comece aqui");
		await expect.element(screen.getByRole("link", { name: /API/ })).toHaveAttribute("href", "/api");
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("link cards are at least 44px tall (touch target)", async () => {
		const screen = await render(DocsHarness, { kind: "cardgrid" });
		for (const a of screen.getByRole("link").elements()) {
			expect(a.getBoundingClientRect().height).toBeGreaterThanOrEqual(44);
		}
	});
});
