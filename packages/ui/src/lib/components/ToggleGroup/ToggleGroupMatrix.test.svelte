<script lang="ts">
	import { AlignCenter, AlignLeft, AlignRight } from "@lucide/svelte";
	import ToggleGroup from "./ToggleGroup.svelte";

	const textItems = [
		{ value: "a", label: "Dia" },
		{ value: "b", label: "Semana" },
		{ value: "c", label: "Mês", disabled: true },
	];
	const iconItems = [
		{ value: "left", icon: AlignLeft, "aria-label": "Esquerda" },
		{ value: "center", icon: AlignCenter, "aria-label": "Centro" },
		{ value: "right", icon: AlignRight, "aria-label": "Direita" },
	];
	const mixedItems = [
		{ value: "left", icon: AlignLeft, label: "Esquerda" },
		{ value: "center", icon: AlignCenter, label: "Centro" },
		{ value: "right", icon: AlignRight, label: "Direita" },
	];
</script>

<div
	data-testid="matrix"
	style="display:grid;gap:16px;padding:16px;width:720px;grid-template-columns:repeat(2,max-content);align-items:start"
>
	<ToggleGroup items={textItems} value="a" aria-label="Outlined single" />
	<ToggleGroup items={textItems} variant="ghost" value="b" aria-label="Ghost single" />
	<ToggleGroup items={textItems} size="sm" value="a" aria-label="Small" />
	<ToggleGroup items={textItems} aria-label="Sem seleção" />
	<ToggleGroup items={iconItems} type="multiple" value={["left", "right"]} aria-label="Multiple" />
	<ToggleGroup items={iconItems} type="multiple" variant="ghost" value={["center"]} aria-label="Multiple ghost" />
	<ToggleGroup items={mixedItems} value="center" aria-label="Ícone e rótulo" />
	<ToggleGroup items={mixedItems} size="sm" variant="ghost" value="left" aria-label="Ícone e rótulo pequeno" />
	<ToggleGroup items={textItems} orientation="vertical" value="a" aria-label="Vertical" />
	<ToggleGroup items={textItems} disabled value="a" aria-label="Desabilitado" />
</div>
