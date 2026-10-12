// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vitest";
import { defineTheme, themeCSS } from "../src/lib/theme/define.js";
import { type ThemeOptions, themeScript } from "../src/lib/theme-script.js";

const acme: ThemeOptions = { defaultPreset: "acme", presets: [{ id: "acme", color: "#2563EB" }] };
const html = document.documentElement;
let dark = false;
const listeners: Array<() => void> = [];

function run(opts: ThemeOptions = acme) {
	new Function(themeScript(opts))();
}

beforeEach(() => {
	localStorage.clear();
	html.className = "";
	for (const a of [...html.attributes]) html.removeAttribute(a.name);
	document.head.innerHTML = "";
	dark = false;
	listeners.length = 0;
	window.matchMedia = ((q: string) => ({
		get matches() {
			return q.includes("dark") && dark;
		},
		addEventListener: (_: string, fn: () => void) => listeners.push(fn),
	})) as unknown as typeof window.matchMedia;
});

describe("theme init script", () => {
	it("discards a stored preset this app does not know", () => {
		localStorage.setItem("ca-preset", '"amber-old"');
		run();
		expect(html.getAttribute("data-preset")).toBe("acme");
		expect(localStorage.getItem("ca-preset")).toBeNull();
	});

	it("keeps valid stored preset, scheme and style", () => {
		localStorage.setItem("ca-preset", '"violet"');
		localStorage.setItem("ca-scheme", '"light"');
		localStorage.setItem("ca-style", '"solid"');
		run();
		expect(html.getAttribute("data-preset")).toBe("violet");
		expect(html.getAttribute("data-style")).toBe("solid");
		expect(html.classList.contains("dark")).toBe(false);
	});

	it("discards invalid scheme/style and unparsable values", () => {
		localStorage.setItem("ca-scheme", '"sepia"');
		localStorage.setItem("ca-style", "{not json");
		run({ ...acme, defaultScheme: "dark", defaultStyle: "flat" });
		expect(html.classList.contains("dark")).toBe(true);
		expect(html.getAttribute("data-style")).toBe("flat");
		expect(localStorage.getItem("ca-scheme")).toBeNull();
		expect(localStorage.getItem("ca-style")).toBeNull();
	});

	it("sets theme-color to the preset surface hex and follows the OS under `system`", () => {
		run({ ...acme, defaultScheme: "system" });
		const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
		const colors = defineTheme(acme).themeColor.acme;
		expect(meta?.content).toBe(colors.light);
		dark = true;
		for (const fn of listeners) fn();
		expect(html.classList.contains("dark")).toBe(true);
		expect(meta?.content).toBe(colors.dark);
	});

	it("replays persisted runtime tokens and drops unsafe entries", () => {
		localStorage.setItem(
			"ca-runtime-tokens",
			JSON.stringify({ "--ca-brand-main": "#ff0000", color: "red", "--ca-x": "}body{" })
		);
		run();
		expect(document.getElementById("ca-runtime-tokens")?.textContent).toBe(
			":root{--ca-brand-main:#ff0000;}"
		);
	});
});

describe("themeCSS", () => {
	it("is deterministic and empty for built-in defaults", () => {
		const t = { ...acme, radius: 1.5, density: "compact" as const, fonts: { body: "Geist" } };
		expect(themeCSS(defineTheme(t))).toBe(themeCSS(defineTheme(t)));
		expect(themeCSS(defineTheme())).toBe("");
		expect(themeCSS(defineTheme(t))).toContain("--ca-radius-md: 15px;");
	});
});
