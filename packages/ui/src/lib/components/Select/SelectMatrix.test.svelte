<script lang="ts">
	import Select from "./Select.svelte";

	const options = [
		{ value: "a", label: "Alpha" },
		{ value: "b", label: "Beta" },
		{ value: "c", label: "Gamma", disabled: true },
		{ value: "d", label: "Delta" },
	];
</script>

<div
	data-testid="matrix"
	style="display:grid;gap:16px;padding:16px;width:720px;grid-template-columns:repeat(2,1fr)"
>
	<Select label="Placeholder" {options} placeholder="Escolha uma opção" />
	<Select label="Selecionado" {options} value="b" />
	<Select label="Pequeno" size="sm" {options} value="a" />
	<Select label="Descrição" description="Texto de ajuda" {options} value="a" />
	<Select label="Erro" error="Seleção inválida" {options} />
	<Select label="Obrigatório" required {options} placeholder="Escolha uma opção" />
	<Select label="Desabilitado" disabled {options} value="a" />
	<Select
		label="Rótulo longo"
		options={[{ value: "x", label: "Uma opção com um rótulo extremamente longo para testar truncamento" }]}
		value="x"
	/>
</div>
