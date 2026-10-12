import { describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import Pagination from "./Pagination.svelte";

describe("Pagination", () => {
	it("marks the current page with aria-current and passes axe", async () => {
		const screen = await render(Pagination, { count: 50, perPage: 10, page: 2 });
		await expect
			.element(screen.getByRole("button", { name: "Page 2" }))
			.toHaveAttribute("aria-current", "page");
		await expect
			.element(screen.getByRole("button", { name: "Page 3" }))
			.not.toHaveAttribute("aria-current");
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("clicking a page fires onPageChange", async () => {
		const onPageChange = vi.fn();
		const screen = await render(Pagination, { count: 50, perPage: 10, page: 1, onPageChange });
		await screen.getByRole("button", { name: "Page 4" }).click();
		expect(onPageChange).toHaveBeenCalledWith(4);
		await expect
			.element(screen.getByRole("button", { name: "Page 4" }))
			.toHaveAttribute("aria-current", "page");
	});

	it("next/previous buttons step through pages", async () => {
		const onPageChange = vi.fn();
		const screen = await render(Pagination, { count: 50, perPage: 10, page: 2, onPageChange });
		await screen.getByRole("button", { name: "Next page" }).click();
		expect(onPageChange).toHaveBeenLastCalledWith(3);
		await screen.getByRole("button", { name: "Previous page" }).click();
		expect(onPageChange).toHaveBeenLastCalledWith(2);
	});

	it("disables previous on the first page and next on the last", async () => {
		const first = await render(Pagination, { count: 30, perPage: 10, page: 1 });
		await expect.element(first.getByRole("button", { name: "Previous page" })).toBeDisabled();
		await expect.element(first.getByRole("button", { name: "Next page" })).toBeEnabled();
		first.unmount();

		const last = await render(Pagination, { count: 30, perPage: 10, page: 3 });
		await expect.element(last.getByRole("button", { name: "Next page" })).toBeDisabled();
		await expect.element(last.getByRole("button", { name: "Previous page" })).toBeEnabled();
	});

	it("collapses long ranges with an ellipsis", async () => {
		const screen = await render(Pagination, { count: 200, perPage: 10, page: 1, siblingCount: 1 });
		await expect.element(screen.getByText("…")).toBeInTheDocument();
		await expect.element(screen.getByRole("button", { name: "Page 20" })).toBeVisible();
		await expect.element(screen.getByRole("button", { name: "Page 10" })).not.toBeInTheDocument();
	});

	it("is operable with the keyboard", async () => {
		const onPageChange = vi.fn();
		const screen = await render(Pagination, { count: 30, perPage: 10, page: 1, onPageChange });
		(screen.getByRole("button", { name: "Page 2" }).element() as HTMLElement).focus();
		await userEvent.keyboard("{Enter}");
		expect(onPageChange).toHaveBeenCalledWith(2);
	});
});
