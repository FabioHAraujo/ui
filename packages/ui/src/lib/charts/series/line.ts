// ─── Line series builder ────────────────────────────────────────────────────
// Smooth curve, dot grows on hover, no blur — see theme.ts hover design rules.

export function lineSeries(s: Record<string, unknown> = {}): Record<string, unknown> {
	return {
		type: "line",
		smooth: true,
		symbolSize: 5,
		showSymbol: false,
		emphasis: {
			disabled: false,
			scale: false,
			itemStyle: { shadowBlur: 10, shadowColor: "rgba(0,0,0,0.25)" },
			lineStyle: { width: 3 },
		},
		animationDuration: 1000,
		animationEasing: "cubicOut" as const,
		...s,
	};
}
