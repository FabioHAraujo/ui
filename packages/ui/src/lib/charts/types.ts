// ─── Chart data contracts ─────────────────────────────────────────────────────
// Every chart component takes ONLY these data shapes — never raw ECharts
// options, styles, or colors. Theming (fonts, palette, glass tooltip, hover
// behavior, dark/light + preset reactivity) is handled internally.

/** One named series of numeric values, aligned to a shared `categories` axis. */
export interface ChartSeries {
	name: string;
	data: number[];
	/** Override the auto-assigned palette color for this series (CSS color or token). */
	color?: string;
}

/** name/value pair — pie, donut, and rose charts. */
export interface ChartSlice {
	name: string;
	value: number;
}

/** x/y point, optionally with a third dimension for bubble sizing. */
export type ScatterPoint = [x: number, y: number] | [x: number, y: number, size: number];

export interface ScatterSeries {
	name: string;
	data: ScatterPoint[];
	color?: string;
}

export interface RadarIndicator {
	name: string;
	max: number;
}

export interface RadarSeries {
	name: string;
	values: number[];
	color?: string;
}

/** [date (YYYY-MM-DD), value] — calendar heatmap. */
export type CalendarHeatmapPoint = [date: string, value: number];

/** [xIndex, yIndex, value] — matrix heatmap. */
export type MatrixHeatmapPoint = [x: number, y: number, value: number];

export type GaugeZoneColor = "success" | "warning" | "error" | "info" | "brand" | (string & {});

export interface GaugeZone {
	/** Upper bound of this zone, 0–1 as a fraction of min–max. */
	until: number;
	color: GaugeZoneColor;
}

export type SparklineTrend = "up" | "down" | "neutral";
