// ─── Scatter series builder ─────────────────────────────────────────────────
// Scale up hovered point, no blur. Bubble mode: symbolSize derived from a
// per-point size value when points carry a third dimension.

export function scatterSeries(s: Record<string, unknown> = {}): Record<string, unknown> {
	return {
		type: "scatter",
		symbolSize: 9,
		emphasis: {
			disabled: false,
			scale: true,
			scaleSize: 5,
			itemStyle: { shadowBlur: 10, shadowColor: "rgba(0,0,0,0.22)" },
		},
		animationDuration: 600,
		animationEasing: "cubicOut" as const,
		...s,
	};
}

/** symbolSize callback that scales the 3rd tuple value (bubble size) into a px radius range. */
export function bubbleSymbolSize(minPx: number, maxPx: number, maxValue: number) {
	return (value: number[]): number => {
		const size = value[2] ?? 0;
		if (maxValue <= 0) return minPx;
		return minPx + (maxPx - minPx) * Math.sqrt(size / maxValue);
	};
}
