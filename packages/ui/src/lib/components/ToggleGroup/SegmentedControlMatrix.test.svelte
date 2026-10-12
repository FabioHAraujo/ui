<script lang="ts">
	import { LayoutGrid, List } from "@lucide/svelte";
	import SegmentedControl from "./SegmentedControl.svelte";

	const items = [
		{ value: "a", label: "Diário" },
		{ value: "b", label: "Semanal" },
		{ value: "c", label: "Mensal" },
	];
	const withDisabled = [
		{ value: "a", label: "Diário" },
		{ value: "b", label: "Semanal", disabled: true },
		{ value: "c", label: "Mensal" },
	];
	const icons = [
		{ value: "grid", icon: LayoutGrid, label: "Grade" },
		{ value: "list", icon: List, label: "Lista" },
	];
</script>

<div
	data-testid="matrix"
	style="display:grid;gap:16px;padding:16px;width:560px;justify-items:start"
>
	<SegmentedControl {items} value="a" aria-label="Primeiro" />
	<SegmentedControl {items} value="b" aria-label="Segundo" />
	<SegmentedControl {items} value="c" aria-label="Terceiro" />
	<SegmentedControl {items} size="sm" value="b" aria-label="Pequeno" />
	<SegmentedControl items={withDisabled} value="a" aria-label="Item desabilitado" />
	<SegmentedControl items={icons} value="list" aria-label="Com ícones" />
	<SegmentedControl {items} value="b" fullWidth aria-label="Largura total" />
	<SegmentedControl {items} value="a" disabled aria-label="Desabilitado" />
</div>
