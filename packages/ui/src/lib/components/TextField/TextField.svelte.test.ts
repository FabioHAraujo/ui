import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import TextField from "./TextField.svelte";

describe("TextField", () => {
	it("associates the label with the input", async () => {
		const screen = await render(TextField, { label: "E-mail" });
		const input = screen.getByLabelText("E-mail");
		await expect.element(input).toBeVisible();
		await input.fill("a@b.co");
		await expect.element(input).toHaveValue("a@b.co");
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("required keeps the accessible name free of the decorative asterisk", async () => {
		const screen = await render(TextField, { label: "Nome", required: true });
		await expect.element(screen.getByRole("textbox", { name: "Nome" })).toBeRequired();
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("description is linked through aria-describedby", async () => {
		const screen = await render(TextField, { label: "Usuário", description: "Mínimo 3 letras" });
		const input = screen.getByLabelText("Usuário");
		await expect.element(input).toHaveAccessibleDescription("Mínimo 3 letras");
		await expect.element(input).not.toHaveAttribute("aria-invalid");
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("error sets aria-invalid, role=alert and becomes the accessible description", async () => {
		const screen = await render(TextField, {
			label: "Senha",
			description: "Dica",
			error: "Muito curta",
		});
		const input = screen.getByLabelText("Senha");
		await expect.element(input).toHaveAttribute("aria-invalid", "true");
		await expect.element(screen.getByRole("alert")).toHaveTextContent("Muito curta");
		await expect.element(input).toHaveAccessibleDescription("Muito curta");
		const describedBy = input.element().getAttribute("aria-describedby");
		expect(describedBy).toBe(screen.getByRole("alert").element().id);
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("fires oninput on every keystroke and onchange on commit", async () => {
		const oninput = vi.fn();
		const onchange = vi.fn();
		const screen = await render(TextField, { label: "Campo", oninput, onchange });
		const input = screen.getByLabelText("Campo");
		await input.fill("abc");
		expect(oninput).toHaveBeenLastCalledWith("abc");
		await input.element().blur();
		expect(onchange).toHaveBeenCalledWith("abc");
	});

	it("disabled input is not editable", async () => {
		const screen = await render(TextField, { label: "Bloqueado", disabled: true });
		await expect.element(screen.getByLabelText("Bloqueado")).toBeDisabled();
	});
});
