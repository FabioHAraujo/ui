import { describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import DocsNav from "./DocsNav.svelte";

const groups = [
	{
		label: "Começando",
		items: [
			{ href: "/guia/inicio", title: "Primeiros passos" },
			{ href: "/guia/config", title: "Configuração" },
		],
	},
	{ label: "Referência", items: [{ href: "/api/send", title: "Enviar", badge: "POST" }] },
	{ label: "Vazio", items: [] },
];

describe("DocsNav", () => {
	it("renders a labelled nav with group labels and links; passes axe", async () => {
		const screen = await render(DocsNav, { groups, pathname: "/guia/inicio", label: "Guia" });
		await expect.element(screen.getByRole("navigation", { name: "Guia" })).toBeVisible();
		await expect.element(screen.getByText("Começando")).toBeVisible();
		await expect.element(screen.getByText("Referência")).toBeVisible();
		expect(screen.getByRole("link").elements()).toHaveLength(3);
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("omits groups without items", async () => {
		const screen = await render(DocsNav, { groups, pathname: "/" });
		await expect.element(screen.getByText("Vazio")).not.toBeInTheDocument();
	});

	it("marks only the current pathname with aria-current=page", async () => {
		const screen = await render(DocsNav, { groups, pathname: "/guia/config" });
		await expect
			.element(screen.getByRole("link", { name: "Configuração" }))
			.toHaveAttribute("aria-current", "page");
		await expect
			.element(screen.getByRole("link", { name: "Primeiros passos" }))
			.not.toHaveAttribute("aria-current");
	});

	it("renders the method badge next to the title", async () => {
		const screen = await render(DocsNav, { groups, pathname: "/" });
		await expect.element(screen.getByRole("link", { name: /Enviar/ })).toMatchTextContent("POST");
	});

	it("Tab walks the links in order and onNavigate fires on activation", async () => {
		const onNavigate = vi.fn();
		const screen = await render(DocsNav, { groups, pathname: "/", onNavigate });
		await userEvent.tab();
		await expect.element(screen.getByRole("link", { name: "Primeiros passos" })).toHaveFocus();
		await userEvent.tab();
		await expect.element(screen.getByRole("link", { name: "Configuração" })).toHaveFocus();
		// Prevent the real navigation so the test page stays put.
		screen.container.addEventListener("click", (e) => e.preventDefault());
		await userEvent.keyboard("{Enter}");
		expect(onNavigate).toHaveBeenCalledOnce();
	});
});
