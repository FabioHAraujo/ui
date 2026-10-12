<script lang="ts">
	// Charts and data: real subpath components. Data only; no ECharts options, colors or fonts are passed.
	// Charts re-theme on their own when the preset, scheme or surface style changes.
	import { Tabs, TabsContent, TabsList, TabsTrigger } from "@codeatlasdev/ui";
	import { BarChart, LineChart, PieChart } from "@codeatlasdev/ui/charts";
	import { createCaColumnHelper, DataTable } from "@codeatlasdev/ui/table";

	interface Order {
		id: string;
		customer: string;
		plan: string;
		amount: string;
		status: string;
	}

	const orders: Order[] = [
		{ id: "ORD-1042", customer: "Lumen Labs", plan: "Team", amount: "$480", status: "Paid" },
		{ id: "ORD-1043", customer: "Fjord Studio", plan: "Solo", amount: "$96", status: "Paid" },
		{ id: "ORD-1044", customer: "Kiln & Co", plan: "Business", amount: "$1,920", status: "Pending" },
		{ id: "ORD-1045", customer: "Tern Systems", plan: "Team", amount: "$480", status: "Paid" },
		{ id: "ORD-1046", customer: "Basalt", plan: "Solo", amount: "$96", status: "Refunded" },
		{ id: "ORD-1047", customer: "Marlow Health", plan: "Business", amount: "$1,920", status: "Paid" },
		{ id: "ORD-1048", customer: "Ostrava IO", plan: "Team", amount: "$480", status: "Pending" },
	];

	const col = createCaColumnHelper<Order>();
	const columns = col.columns([
		col.accessor("id", { header: "Order", meta: { label: "Order" } }),
		col.accessor("customer", { header: "Customer", meta: { label: "Customer" } }),
		col.accessor("plan", { header: "Plan", meta: { label: "Plan" } }),
		col.accessor("amount", { header: "Amount", meta: { label: "Amount" } }),
		col.accessor("status", { header: "Status", meta: { label: "Status" } }),
	]);

	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
</script>

<Tabs value="line" class="data__tabs">
	<TabsList>
		<TabsTrigger value="line">Line</TabsTrigger>
		<TabsTrigger value="bar">Bar</TabsTrigger>
		<TabsTrigger value="pie">Donut</TabsTrigger>
		<TabsTrigger value="table">Table</TabsTrigger>
	</TabsList>
	<TabsContent value="line">
		<LineChart
			area
			height="300px"
			categories={months}
			series={[
				{ name: "Signups", data: [120, 180, 150, 240, 310, 290, 380, 450] },
				{ name: "Activated", data: [60, 100, 90, 170, 210, 220, 290, 360] },
			]}
		/>
	</TabsContent>
	<TabsContent value="bar">
		<BarChart
			height="300px"
			categories={months}
			series={[
				{ name: "Solo", data: [30, 40, 35, 50, 60, 58, 72, 80] },
				{ name: "Team", data: [20, 32, 30, 48, 62, 64, 80, 96] },
			]}
		/>
	</TabsContent>
	<TabsContent value="pie">
		<PieChart
			donut
			height="300px"
			centerLabel={{ value: "8", label: "presets" }}
			data={[
				{ name: "Solo", value: 46 },
				{ name: "Team", value: 38 },
				{ name: "Business", value: 16 },
			]}
		/>
	</TabsContent>
	<TabsContent value="table">
		<DataTable {columns} data={orders} />
	</TabsContent>
</Tabs>
