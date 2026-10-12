// ─── Pie/donut series builder ───────────────────────────────────────────────
// Border gap, scale-out on hover, no blur.

import { type ChartTokens, chartTokens } from "../tokens.js";

export function pieSeries(
	s: Record<string, unknown> = {},
	t: ChartTokens = chartTokens()
): Record<string, unknown> {
	return {
		type: "pie",
		radius: ["45%", "70%"],
		itemStyle: { borderRadius: 8, borderColor: "transparent", borderWidth: 3 },
		label: { show: false, fontFamily: t.fontSans },
		emphasis: {
			disabled: false,
			scale: true,
			scaleSize: 7,
			label: { show: true, fontFamily: t.fontSans, fontWeight: "bold" as const, fontSize: 13 },
			itemStyle: { shadowBlur: 16, shadowColor: "rgba(0,0,0,0.18)" },
		},
		animationType: "expansion" as const,
		animationDuration: 900,
		animationEasing: "cubicOut" as const,
		...s,
	};
}
