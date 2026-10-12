import { describe, expect, it } from "vitest";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import Stepper from "./Stepper.svelte";

const steps = [
	{ label: "Conta", description: "Dados básicos" },
	{ label: "Endereço" },
	{ label: "Revisão" },
];

describe("Stepper", () => {
	it("exposes a Progress landmark and marks only the current step", async () => {
		const screen = await render(Stepper, { steps, current: 1 });
		await expect.element(screen.getByRole("navigation", { name: "Progress" })).toBeVisible();
		await expect
			.element(screen.getByRole("button", { name: "Step 2: Endereço" }))
			.toHaveAttribute("aria-current", "step");
		await expect
			.element(screen.getByRole("button", { name: "Step 3: Revisão" }))
			.not.toHaveAttribute("aria-current");
		await expect.element(screen.getByText("Dados básicos")).toBeVisible();
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("labels completed steps as done", async () => {
		const screen = await render(Stepper, { steps, current: 2 });
		await expect
			.element(screen.getByRole("button", { name: "Step 1: Conta (done)" }))
			.toBeVisible();
		await expect
			.element(screen.getByRole("button", { name: "Step 2: Endereço (done)" }))
			.toBeVisible();
		await expect.element(screen.getByRole("button", { name: "Step 3: Revisão" })).toBeVisible();
	});

	it("clicking a step moves the current marker", async () => {
		const screen = await render(Stepper, { steps, current: 0 });
		await screen.getByRole("button", { name: "Step 3: Revisão" }).click();
		await expect
			.element(screen.getByRole("button", { name: "Step 3: Revisão" }))
			.toHaveAttribute("aria-current", "step");
		await expect
			.element(screen.getByRole("button", { name: "Step 1: Conta (done)" }))
			.toBeVisible();
	});

	it("steps are reachable and activatable by keyboard", async () => {
		const screen = await render(Stepper, { steps, current: 0 });
		await userEvent.tab();
		await expect.element(screen.getByRole("button", { name: "Step 1: Conta" })).toHaveFocus();
		await userEvent.tab();
		await expect.element(screen.getByRole("button", { name: "Step 2: Endereço" })).toHaveFocus();
		await userEvent.keyboard("{Enter}");
		await expect
			.element(screen.getByRole("button", { name: "Step 2: Endereço" }))
			.toHaveAttribute("aria-current", "step");
	});
});
