<script lang="ts">
	import RadioGroup from "./RadioGroup.svelte";

	const items = [
		{ value: "a", label: "Alpha" },
		{ value: "b", label: "Beta" },
		{ value: "c", label: "Gamma", disabled: true },
	];
</script>

<div
	data-testid="matrix"
	style="display:grid;gap:24px;padding:16px;width:720px;grid-template-columns:repeat(2,1fr)"
>
	<RadioGroup {items} value="b" />
	<RadioGroup {items} orientation="horizontal" value="a" />
	<RadioGroup {items} />
	<RadioGroup {items} disabled value="a" />
</div>
