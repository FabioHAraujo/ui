// ─── Canvas area-fill gradient ─────────────────────────────────────────────────
// Must run after echarts is loaded (needs echarts.graphic.LinearGradient).
// Color must be hex/rgba, not oklch — see palette.ts.

import { withAlpha } from "./palette.js";

type EchartsGraphicModule = {
	graphic: { LinearGradient: new (...a: unknown[]) => unknown };
};

export function chartGradient(
	echarts: EchartsGraphicModule,
	color: string,
	alphaTop = 0.28,
	alphaBottom = 0.01
): unknown {
	return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
		{ offset: 0, color: withAlpha(color, alphaTop) },
		{ offset: 1, color: withAlpha(color, alphaBottom) },
	]);
}
