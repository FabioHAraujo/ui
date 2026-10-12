import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import Breadcrumb from "./Breadcrumb.svelte";

const items = [
	{ label: "Início", href: "/" },
	{ label: "Projetos", href: "/projetos" },
	{ label: "Atlas", href: "/projetos/atlas" },
];

describe("Breadcrumb", () => {
	it("renders a labelled nav with an ordered list", async () => {
		const screen = await render(Breadcrumb, { items });
		await expect.element(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
		await expect.element(screen.getByRole("list")).toBeVisible();
		await expect.element(screen.getByRole("listitem").first()).toBeVisible();
		expect(screen.getByRole("listitem").elements()).toHaveLength(3);
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("links ancestors but renders the last item as the current page", async () => {
		const screen = await render(Breadcrumb, { items });
		await expect.element(screen.getByRole("link", { name: "Início" })).toHaveAttribute("href", "/");
		await expect
			.element(screen.getByRole("link", { name: "Projetos" }))
			.toHaveAttribute("href", "/projetos");
		await expect.element(screen.getByRole("link", { name: "Atlas" })).not.toBeInTheDocument();
		await expect.element(screen.getByText("Atlas")).toHaveAttribute("aria-current", "page");
	});

	it("hides separators from assistive tech and honours a custom separator", async () => {
		const screen = await render(Breadcrumb, { items, separator: ">" });
		const seps = screen.container.querySelectorAll(".ca-breadcrumb__sep");
		expect(seps).toHaveLength(2);
		for (const s of seps) {
			expect(s.getAttribute("aria-hidden")).toBe("true");
			expect(s.textContent).toBe(">");
		}
	});

	it("an item without href is plain text", async () => {
		const screen = await render(Breadcrumb, { items: [{ label: "Raiz" }, { label: "Folha" }] });
		await expect.element(screen.getByRole("link")).not.toBeInTheDocument();
		await expect.element(screen.getByText("Raiz")).not.toHaveAttribute("aria-current");
		await expect.element(screen.getByText("Folha")).toHaveAttribute("aria-current", "page");
	});
});
