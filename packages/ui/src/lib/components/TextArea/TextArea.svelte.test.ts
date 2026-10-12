import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import TextArea from "./TextArea.svelte";

describe("TextArea", () => {
	it("associates the label with the textarea", async () => {
		const screen = await render(TextArea, { label: "Mensagem" });
		const field = screen.getByLabelText("Mensagem");
		await field.fill("Olá\nmundo");
		await expect.element(field).toHaveValue("Olá\nmundo");
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("description is the accessible description", async () => {
		const screen = await render(TextArea, { label: "Bio", description: "Até 200 caracteres" });
		await expect
			.element(screen.getByLabelText("Bio"))
			.toHaveAccessibleDescription("Até 200 caracteres");
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("error sets aria-invalid, role=alert and describes the field", async () => {
		const screen = await render(TextArea, {
			label: "Bio",
			description: "Dica",
			error: "Obrigatório",
		});
		const field = screen.getByLabelText("Bio");
		await expect.element(field).toHaveAttribute("aria-invalid", "true");
		await expect.element(screen.getByRole("alert")).toHaveTextContent("Obrigatório");
		await expect.element(field).toHaveAccessibleDescription("Obrigatório");
		expect(field.element().getAttribute("aria-describedby")).toBe(
			screen.getByRole("alert").element().id
		);
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("reports typed value through oninput", async () => {
		const oninput = vi.fn();
		const screen = await render(TextArea, { label: "Nota", oninput });
		await screen.getByLabelText("Nota").fill("abc");
		expect(oninput).toHaveBeenLastCalledWith("abc");
	});

	it("readonly and disabled states are exposed", async () => {
		const ro = await render(TextArea, { label: "Leitura", readonly: true, value: "x" });
		await expect.element(ro.getByLabelText("Leitura")).toHaveAttribute("readonly");
		const dis = await render(TextArea, { label: "Off", disabled: true });
		await expect.element(dis.getByLabelText("Off")).toBeDisabled();
	});
});
