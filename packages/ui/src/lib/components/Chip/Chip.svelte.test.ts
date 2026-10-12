import { Star } from "@lucide/svelte";
import { describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import { q } from "../../../../tests/dom";
import Chip from "./Chip.svelte";

describe("Chip", () => {
	it("static chip renders its label with no button role", async () => {
		const screen = await render(Chip, { label: "Design" });
		await expect.element(screen.getByText("Design")).toBeVisible();
		await expect.element(screen.getByRole("button")).not.toBeInTheDocument();
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("onclick makes it a focusable toggle button with aria-pressed", async () => {
		const onclick = vi.fn();
		const screen = await render(Chip, { label: "Design", onclick });
		const chip = screen.getByRole("button", { name: "Design" });
		await expect.element(chip).toHaveAttribute("tabindex", "0");
		await expect.element(chip).toHaveAttribute("aria-pressed", "false");
		expect(await checkA11y(screen.container)).toHaveNoViolations();
		await chip.click();
		expect(onclick).toHaveBeenCalledOnce();
	});

	it("selected reflects aria-pressed=true", async () => {
		const screen = await render(Chip, { label: "Design", onclick: () => {}, selected: true });
		await expect
			.element(screen.getByRole("button", { name: "Design" }))
			.toHaveAttribute("aria-pressed", "true");
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("Enter and Space activate an interactive chip", async () => {
		const onclick = vi.fn();
		const screen = await render(Chip, { label: "Design", onclick });
		(screen.getByRole("button", { name: "Design" }).element() as HTMLElement).focus();
		await userEvent.keyboard("{Enter}");
		expect(onclick).toHaveBeenCalledTimes(1);
		await userEvent.keyboard(" ");
		expect(onclick).toHaveBeenCalledTimes(2);
		await userEvent.keyboard("a");
		expect(onclick).toHaveBeenCalledTimes(2);
	});

	it("deletable renders a labelled remove button that calls ondelete only", async () => {
		const ondelete = vi.fn();
		const onclick = vi.fn();
		const screen = await render(Chip, { label: "Design", deletable: true, ondelete, onclick });
		const remove = screen.getByRole("button", { name: "Remove Design" });
		await expect.element(remove).toBeVisible();
		await remove.click();
		expect(ondelete).toHaveBeenCalledOnce();
		expect(onclick).not.toHaveBeenCalled();
	});

	it("deletable non-interactive chip passes axe and the delete is keyboard reachable", async () => {
		const ondelete = vi.fn();
		const screen = await render(Chip, { label: "Design", deletable: true, ondelete });
		expect(await checkA11y(screen.container)).toHaveNoViolations();
		await userEvent.tab();
		await expect.element(screen.getByRole("button", { name: "Remove Design" })).toHaveFocus();
		await userEvent.keyboard("{Enter}");
		expect(ondelete).toHaveBeenCalledOnce();
	});

	it("does not render a remove button unless deletable", async () => {
		const screen = await render(Chip, { label: "Design", ondelete: () => {} });
		await expect.element(screen.getByRole("button")).not.toBeInTheDocument();
	});

	it("renders a decorative icon", async () => {
		const screen = await render(Chip, { label: "Fav", icon: Star });
		const icon = screen.container.querySelector(".ca-chip__icon");
		expect(icon?.getAttribute("aria-hidden")).toBe("true");
		expect(icon?.querySelector("svg")).not.toBeNull();
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it.each(["default", "success", "error", "warning", "info", "brand"] as const)(
		"variant %s passes axe",
		async (variant) => {
			const screen = await render(Chip, { label: "Tag", variant });
			expect(await checkA11y(screen.container)).toHaveNoViolations();
		}
	);

	it("size sm is smaller than md", async () => {
		const sm = await render(Chip, { label: "Tag", size: "sm" });
		const md = await render(Chip, { label: "Tag", size: "md" });
		const h = (c: HTMLElement) => q(c, ".ca-chip").getBoundingClientRect().height;
		expect(h(sm.container)).toBeLessThan(h(md.container));
	});
});
