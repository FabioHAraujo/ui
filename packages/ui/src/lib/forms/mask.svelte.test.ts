import { describe, expect, it } from "vitest";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../tests/a11y";
import Harness from "./MaskAction.test.svelte";
import { mask } from "./mask";
import { maskCEP, maskCPF } from "./masks";

describe("use:mask action", () => {
	it("formats on input and bind:value sees the masked text", async () => {
		const screen = await render(Harness);
		const input = screen.getByLabelText("Documento");
		await input.fill("12345678909");
		await expect.element(input).toHaveValue("123.456.789-09");
		await expect.element(screen.getByTestId("bound")).toHaveTextContent("123.456.789-09");
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("typing forward keeps the caret at the end across separators", async () => {
		const screen = await render(Harness);
		const input = screen.getByLabelText("Documento");
		const el = input.element() as HTMLInputElement;
		await input.click();
		await userEvent.keyboard("1234");
		await expect.element(input).toHaveValue("123.4");
		expect(el.selectionStart).toBe(el.value.length);
	});

	it("mid-string insert maps the caret by digit count", async () => {
		const screen = await render(Harness);
		const input = screen.getByLabelText("Documento");
		const el = input.element() as HTMLInputElement;
		await input.fill("123456");
		await expect.element(input).toHaveValue("123.456");
		el.focus();
		el.setSelectionRange(2, 2);
		await userEvent.keyboard("9");
		await expect.element(input).toHaveValue("129.345.6");
		expect(el.selectionStart).toBe(3);
	});

	it("listeners never observe the unmasked text, and fire once per keystroke", async () => {
		const screen = await render(Harness);
		const el = screen.getByLabelText("Documento").element() as HTMLInputElement;
		const seen: string[] = [];
		el.addEventListener("input", () => seen.push(el.value));
		el.focus();
		await userEvent.keyboard("1234");
		expect(seen).toEqual(["1", "12", "123", "123.4"]);
	});

	it("applies the mask to a pre-filled value on mount", () => {
		const input = document.createElement("input");
		input.value = "01310100";
		document.body.append(input);
		const action = mask(input, maskCEP);
		expect(input.value).toBe("01310-100");
		action?.destroy?.();
		input.remove();
	});

	it("update() swaps the formatter and re-masks immediately", () => {
		const input = document.createElement("input");
		input.value = "12345678";
		document.body.append(input);
		const action = mask(input, maskCEP);
		expect(input.value).toBe("12345-678");
		action?.update?.(maskCPF);
		expect(input.value).toBe("123.456.78");
		action?.destroy?.();
		input.remove();
	});

	it("destroy() detaches the listener", () => {
		const input = document.createElement("input");
		document.body.append(input);
		const action = mask(input, maskCEP);
		action?.destroy?.();
		input.value = "12345678";
		input.dispatchEvent(new Event("input", { bubbles: true }));
		expect(input.value).toBe("12345678");
		input.remove();
	});

	it("swapping the formatter through a reactive prop re-masks the live input", async () => {
		const screen = await render(Harness, { fn: "cep" });
		const input = screen.getByLabelText("Documento");
		await input.fill("12345678");
		await expect.element(input).toHaveValue("12345-678");
		await screen.rerender({ fn: "cpf" });
		await expect.element(input).toHaveValue("123.456.78");
	});
});
