import { describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import FilterGroup from "./FilterGroup.svelte";

const options = [
	{ value: "Admin", label: "Admin" },
	{ value: "Editor", label: "Editor" },
	{ value: "Viewer", label: "Viewer" },
];

describe("FilterGroup", () => {
	it("is a labelled group of toggle buttons, none pressed by default", async () => {
		const screen = await render(FilterGroup, { label: "Role", options });
		await expect.element(screen.getByRole("group", { name: "Role" })).toBeVisible();
		for (const o of options) {
			await expect
				.element(screen.getByRole("button", { name: o.label }))
				.toHaveAttribute("aria-pressed", "false");
		}
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("selecting an option presses it and calls onchange", async () => {
		const onchange = vi.fn();
		const screen = await render(FilterGroup, { label: "Role", options, onchange });
		await screen.getByRole("button", { name: "Editor" }).click();
		await expect
			.element(screen.getByRole("button", { name: "Editor" }))
			.toHaveAttribute("aria-pressed", "true");
		await expect
			.element(screen.getByRole("button", { name: "Admin" }))
			.toHaveAttribute("aria-pressed", "false");
		expect(onchange).toHaveBeenCalledExactlyOnceWith("Editor");
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("selecting another option moves the pressed state", async () => {
		const onchange = vi.fn();
		const screen = await render(FilterGroup, { options, onchange });
		await screen.getByRole("button", { name: "Admin" }).click();
		await screen.getByRole("button", { name: "Viewer" }).click();
		await expect
			.element(screen.getByRole("button", { name: "Admin" }))
			.toHaveAttribute("aria-pressed", "false");
		await expect
			.element(screen.getByRole("button", { name: "Viewer" }))
			.toHaveAttribute("aria-pressed", "true");
		expect(onchange).toHaveBeenLastCalledWith("Viewer");
	});

	it("clicking the active option deselects back to 'all'", async () => {
		const onchange = vi.fn();
		const screen = await render(FilterGroup, { options, value: "Admin", onchange });
		await expect
			.element(screen.getByRole("button", { name: "Admin" }))
			.toHaveAttribute("aria-pressed", "true");
		await screen.getByRole("button", { name: "Admin" }).click();
		await expect
			.element(screen.getByRole("button", { name: "Admin" }))
			.toHaveAttribute("aria-pressed", "false");
		expect(onchange).toHaveBeenCalledExactlyOnceWith("all");
	});

	it("initial value presses the matching option", async () => {
		const screen = await render(FilterGroup, { options, value: "Viewer" });
		await expect
			.element(screen.getByRole("button", { name: "Viewer" }))
			.toHaveAttribute("aria-pressed", "true");
	});

	it("is operable by keyboard (Tab, Enter, Space)", async () => {
		const onchange = vi.fn();
		const screen = await render(FilterGroup, { options, onchange });
		await userEvent.tab();
		await expect.element(screen.getByRole("button", { name: "Admin" })).toHaveFocus();
		await userEvent.keyboard("{Enter}");
		expect(onchange).toHaveBeenLastCalledWith("Admin");
		await userEvent.tab();
		await expect.element(screen.getByRole("button", { name: "Editor" })).toHaveFocus();
		await userEvent.keyboard(" ");
		expect(onchange).toHaveBeenLastCalledWith("Editor");
		await expect
			.element(screen.getByRole("button", { name: "Editor" }))
			.toHaveAttribute("aria-pressed", "true");
		expect(onchange).toHaveBeenCalledTimes(2);
	});
});
