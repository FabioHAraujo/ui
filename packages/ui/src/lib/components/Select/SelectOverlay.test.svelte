<script lang="ts">
	import Select from "./Select.svelte";
</script>

<Select
	label="Aberto"
	value="b"
	options={[
		{ value: "a", label: "Alpha" },
		{ value: "b", label: "Beta" },
		{ value: "c", label: "Gamma", disabled: true },
		{ value: "d", label: "Delta" },
	]}
/>
