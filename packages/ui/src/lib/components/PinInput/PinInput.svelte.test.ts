import { describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import PinInput from "./PinInput.svelte";

describe("PinInput", () => {
	it("label names the input and axe passes", async () => {
		const screen = await render(PinInput, { label: "Código", description: "Enviado por SMS" });
		const input = screen.getByLabelText("Código");
		await expect.element(input).toBeInTheDocument();
		await expect.element(input).toHaveAccessibleDescription("Enviado por SMS");
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("typing 6 digits calls oncomplete exactly once with the code", async () => {
		const oncomplete = vi.fn();
		const screen = await render(PinInput, { label: "Código", oncomplete });
		screen.getByLabelText("Código").element().focus();
		await userEvent.keyboard("12345");
		expect(oncomplete).not.toHaveBeenCalled();
		await userEvent.keyboard("6");
		await vi.waitFor(() => expect(oncomplete).toHaveBeenCalledOnce());
		expect(oncomplete).toHaveBeenCalledWith("123456");
		await expect.element(screen.getByLabelText("Código")).toHaveValue("123456");
	});

	it("honours a custom length", async () => {
		const oncomplete = vi.fn();
		const screen = await render(PinInput, { label: "PIN", length: 4, oncomplete });
		screen.getByLabelText("PIN").element().focus();
		await userEvent.keyboard("9876");
		await vi.waitFor(() => expect(oncomplete).toHaveBeenCalledWith("9876"));
	});

	it("numeric type rejects letters", async () => {
		const screen = await render(PinInput, { label: "Código" });
		const input = screen.getByLabelText("Código");
		input.element().focus();
		await userEvent.keyboard("a1b2");
		await expect.element(input).toHaveValue("12");
	});

	it("paste fills every cell and completes", async () => {
		const oncomplete = vi.fn();
		const screen = await render(PinInput, { label: "Código", oncomplete });
		const input = screen.getByLabelText("Código");
		// Real clipboard round-trip: type the code, select it, copy, clear, paste.
		input.element().focus();
		await userEvent.keyboard("654321");
		await vi.waitFor(() => expect(oncomplete).toHaveBeenCalledOnce());
		await userEvent.keyboard("{ControlOrMeta>}a{/ControlOrMeta}");
		await userEvent.copy();
		await userEvent.keyboard("{Backspace}");
		await expect.element(input).toHaveValue("");
		await userEvent.paste();
		await expect.element(input).toHaveValue("654321");
		await vi.waitFor(() => expect(oncomplete).toHaveBeenCalledTimes(2));
		expect(oncomplete).toHaveBeenLastCalledWith("654321");
	});

	it("error sets aria-invalid, role=alert and describes the input", async () => {
		const screen = await render(PinInput, {
			label: "Código",
			error: "Código inválido",
			description: "Dica",
		});
		const input = screen.getByLabelText("Código");
		await expect.element(input).toHaveAttribute("aria-invalid", "true");
		await expect.element(screen.getByRole("alert")).toHaveTextContent("Código inválido");
		expect(input.element().getAttribute("aria-describedby")).toBe(
			screen.getByRole("alert").element().id
		);
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("disabled input cannot be focused for typing", async () => {
		const screen = await render(PinInput, { label: "Código", disabled: true });
		await expect.element(screen.getByLabelText("Código")).toBeDisabled();
	});
});
