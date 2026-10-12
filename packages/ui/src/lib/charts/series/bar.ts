// ─── Bar series builder ─────────────────────────────────────────────────────
// Rounded tops, shadow lift on hover, no blur.

export function barSeries(s: Record<string, unknown> = {}): Record<string, unknown> {
	return {
		type: "bar",
		barMaxWidth: 56,
		itemStyle: { borderRadius: [6, 6, 0, 0] },
		emphasis: {
			disabled: false,
			itemStyle: {
				shadowBlur: 14,
				shadowOffsetY: -3,
				shadowColor: "rgba(0,0,0,0.22)",
				opacity: 1,
			},
		},
		animationDuration: 800,
		animationEasing: "cubicOut" as const,
		animationDelay: (i: number) => i * 60,
		...s,
	};
}
