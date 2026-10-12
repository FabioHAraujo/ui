// ─── BRL money helpers (integer cents) ────────────────────────────────────────

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** `123456` → `"R$ 1.234,56"` (NBSP normalised to a regular space). */
export function centsToDisplay(cents: number): string {
	return brl.format(cents / 100).replace(/[\u00a0\u202f]/g, " ");
}

/**
 * Parse user text into integer cents.
 * - Text with a `,` is read as a pt-BR decimal (`"R$ 1.234,56"` → 123456, `"10,5"` → 1050).
 * - Text without `,` is read as a plain digit stream where the last two digits are cents
 *   (`"123456"` → 123456), which is what a type-to-fill money input produces.
 * A leading `-` yields a negative value.
 */
export function parseInputToCents(text: string): number {
	const negative = text.includes("-");
	let cents: number;
	if (text.includes(",")) {
		const [int, frac = ""] = text.split(",");
		const i = int.replace(/\D/g, "") || "0";
		const f = frac.replace(/\D/g, "").slice(0, 2).padEnd(2, "0");
		cents = Number(i) * 100 + Number(f);
	} else {
		const d = text.replace(/\D/g, "");
		cents = d ? Number(d) : 0;
	}
	return negative && cents !== 0 ? -cents : cents;
}
