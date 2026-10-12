import { createRawSnippet } from "svelte";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import Badge from "./Badge.svelte";

const child = createRawSnippet(() => ({ render: () => `<button type="button">Inbox</button>` }));

describe("Badge", () => {
	it("renders the count as a status next to its children", async () => {
		const screen = await render(Badge, { count: 5, children: child });
		await expect.element(screen.getByRole("button", { name: "Inbox" })).toBeVisible();
		const status = screen.getByRole("status", { name: "5 notifications" });
		await expect.element(status).toHaveTextContent("5");
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("hides the badge when count is 0", async () => {
		const screen = await render(Badge, { count: 0, children: child });
		await expect.element(screen.getByRole("status")).not.toBeInTheDocument();
	});

	it("hides the badge when neither count nor dot is set", async () => {
		const screen = await render(Badge, { children: child });
		await expect.element(screen.getByRole("status")).not.toBeInTheDocument();
	});

	it("caps counts above 99 at '99+' but keeps the real count in the label", async () => {
		const screen = await render(Badge, { count: 150, children: child });
		const status = screen.getByRole("status", { name: "150 notifications" });
		await expect.element(status).toHaveTextContent("99+");
	});

	it("shows 99 as-is", async () => {
		const screen = await render(Badge, { count: 99, children: child });
		await expect.element(screen.getByRole("status")).toHaveTextContent("99");
	});

	it("dot renders an empty 'New' status even without a count", async () => {
		const screen = await render(Badge, { dot: true, children: child });
		const status = screen.getByRole("status", { name: "New" });
		await expect.element(status).toBeInTheDocument();
		await expect.element(status).toBeEmptyDOMElement();
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("dot wins over count (no number rendered)", async () => {
		const screen = await render(Badge, { dot: true, count: 7, children: child });
		await expect.element(screen.getByRole("status", { name: "New" })).toBeEmptyDOMElement();
	});

	it.each(["brand", "success", "error", "warning"] as const)(
		"color %s passes axe",
		async (color) => {
			const screen = await render(Badge, { count: 3, color, children: child });
			await expect.element(screen.getByRole("status")).toHaveClass(`ca-badge--${color}`);
			expect(await checkA11y(screen.container)).toHaveNoViolations();
		}
	);
});
