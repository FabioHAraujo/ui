import { afterEach, describe, expect, it, vi } from "vitest";
import { focusTextField, primeKeyboard } from "./autofocus.js";

const realMatchMedia = window.matchMedia;
function pointer(coarse: boolean) {
	window.matchMedia = ((q: string) => ({
		...realMatchMedia(q),
		matches: q.includes("coarse") ? coarse : realMatchMedia(q).matches,
	})) as typeof window.matchMedia;
}

afterEach(() => {
	window.matchMedia = realMatchMedia;
	(document.activeElement as HTMLElement | null)?.blur();
	document.body.innerHTML = "";
	vi.useRealTimers();
});

function field() {
	const input = document.createElement("input");
	document.body.appendChild(input);
	return input;
}

describe("touch focus policy", () => {
	it("focuses directly with a fine pointer", () => {
		pointer(false);
		const input = field();
		expect(focusTextField(input)).toBe(true);
		expect(document.activeElement).toBe(input);
	});

	it("on touch, skips focus unless the keyboard was primed in the gesture", () => {
		pointer(true);
		const input = field();
		expect(focusTextField(input)).toBe(false);
		expect(document.activeElement).not.toBe(input);

		primeKeyboard();
		const proxy = document.activeElement as HTMLInputElement;
		expect(proxy.tagName).toBe("INPUT");
		expect(Number.parseFloat(getComputedStyle(proxy).fontSize)).toBeGreaterThanOrEqual(16);
		expect(focusTextField(input)).toBe(true);
		expect(document.activeElement).toBe(input);
	});

	it("releases the primed keyboard when nothing claims it", () => {
		vi.useFakeTimers();
		pointer(true);
		primeKeyboard();
		const proxy = document.activeElement;
		vi.advanceTimersByTime(1000);
		expect(document.activeElement).not.toBe(proxy);
	});

	it("priming is a no-op with a fine pointer", () => {
		pointer(false);
		primeKeyboard();
		expect(document.activeElement).toBe(document.body);
	});
});
