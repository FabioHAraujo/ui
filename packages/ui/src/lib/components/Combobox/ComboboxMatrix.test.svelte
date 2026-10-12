<script lang="ts">
	import Combobox from "./Combobox.svelte";

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
	<Combobox label="Placeholder" {options} placeholder="Escolha uma opção" />
	<Combobox label="Selecionado" {options} value="b" />
	<Combobox label="Pequeno" size="sm" {options} value="a" />
	<Combobox label="Descrição" description="Texto de ajuda" {options} value="a" />
	<Combobox label="Erro" error="Seleção inválida" {options} />
	<Combobox label="Obrigatório" required {options} placeholder="Escolha uma opção" />
	<Combobox label="Desabilitado" disabled {options} value="a" />
	<Combobox
		label="Rótulo longo"
		options={[{ value: "x", label: "Uma opção com um rótulo extremamente longo para testar truncamento" }]}
		value="x"
	/>
</div>
