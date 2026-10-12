import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import { checkA11y } from "../../../../tests/a11y";
import { GLASS_OPTICS } from "../../tokens/materials.js";
import LiquidGlass from "./LiquidGlass.svelte";

const svgOf = (c: HTMLElement) => c.querySelector("svg") as SVGSVGElement;

describe("LiquidGlass", () => {
	it("is a decorative, non-interactive overlay hidden from assistive tech", async () => {
		const screen = await render(LiquidGlass, { optics: GLASS_OPTICS.regular });
		const svg = svgOf(screen.container);
		expect(svg.getAttribute("aria-hidden")).toBe("true");
		const cs = getComputedStyle(svg);
		expect(cs.pointerEvents).toBe("none");
		expect(cs.position).toBe("absolute");
		expect(await checkA11y(screen.container)).toHaveNoViolations();
	});

	it("maps optics onto the turbulence and displacement filter", async () => {
		const screen = await render(LiquidGlass, { optics: GLASS_OPTICS.thick });
		const svg = svgOf(screen.container);
		const turbulence = svg.querySelector("feTurbulence") as SVGElement;
		const displacement = svg.querySelector("feDisplacementMap") as SVGElement;
		expect(Number(turbulence.getAttribute("baseFrequency"))).toBeCloseTo(
			GLASS_OPTICS.thick.bend * 0.02
		);
		expect(Number(displacement.getAttribute("scale"))).toBe(GLASS_OPTICS.thick.frost);
	});

	it("the rect references the filter defined in the same SVG", async () => {
		const screen = await render(LiquidGlass, { optics: GLASS_OPTICS.thin });
		const svg = svgOf(screen.container);
		const id = svg.querySelector("filter")?.id;
		expect(id).toBeTruthy();
		expect(svg.querySelector("rect")?.getAttribute("filter")).toBe(`url(#${id})`);
	});

	it("each instance gets a unique filter id", async () => {
		const a = await render(LiquidGlass, { optics: GLASS_OPTICS.regular });
		const b = await render(LiquidGlass, { optics: GLASS_OPTICS.regular });
		expect(svgOf(a.container).querySelector("filter")?.id).not.toBe(
			svgOf(b.container).querySelector("filter")?.id
		);
	});

	it("fills its positioned parent", async () => {
		const screen = await render(LiquidGlass, { optics: GLASS_OPTICS.regular });
		const svg = svgOf(screen.container);
		const cs = getComputedStyle(svg);
		expect(cs.top).toBe("0px");
		expect(cs.left).toBe("0px");
	});
});
