// Registers only what the chart components use; importing "echarts" pulls ~1.1 MB.
// Adding a series type or option component to a chart? Register it here.
import {
	BarChart,
	GaugeChart,
	HeatmapChart,
	LineChart,
	PieChart,
	RadarChart,
	ScatterChart,
} from "echarts/charts";
import {
	AxisPointerComponent,
	CalendarComponent,
	GridComponent,
	LegendComponent,
	RadarComponent,
	TooltipComponent,
	VisualMapComponent,
} from "echarts/components";
import * as echarts from "echarts/core";
import { LegacyGridContainLabel } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
	BarChart,
	GaugeChart,
	HeatmapChart,
	LineChart,
	PieChart,
	RadarChart,
	ScatterChart,
	AxisPointerComponent,
	CalendarComponent,
	GridComponent,
	LegendComponent,
	RadarComponent,
	TooltipComponent,
	VisualMapComponent,
	CanvasRenderer,
	LegacyGridContainLabel,
]);

export default echarts;
