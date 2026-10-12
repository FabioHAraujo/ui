<script lang="ts">
	import TypeRows from "./TypeRows.svelte";
	const rows = [
		{ label: "Body 1", token: "--ca-font-size-body1" },
		{ label: "Body 2", token: "--ca-font-size-body2" },
		{ label: "Caption", token: "--ca-font-size-caption" },
		{ label: "Label", token: "--ca-font-size-label" },
		{ label: "Button", token: "--ca-font-size-button" },
		{ label: "Micro", token: "--ca-font-size-micro" },
		{ label: "Nano", token: "--ca-font-size-nano" },
	];
</script>

<TypeRows {rows} />
