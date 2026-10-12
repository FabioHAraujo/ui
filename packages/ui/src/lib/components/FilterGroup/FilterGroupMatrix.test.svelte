<script lang="ts">
	import FilterGroup from "./FilterGroup.svelte";

	const options = [
		{ value: "all", label: "Todos" },
		{ value: "admin", label: "Admin" },
		{ value: "editor", label: "Editor" },
		{ value: "viewer", label: "Leitor" },
	];
</script>

<div data-testid="matrix" style="display:grid;gap:16px;padding:16px;width:720px">
	<FilterGroup label="Papel" {options} />
	<FilterGroup label="Papel" {options} value="editor" />
	<FilterGroup {options} value="admin" />
	<FilterGroup
		label="Status"
		options={[
			{ value: "a", label: "Aguardando aprovação" },
			{ value: "b", label: "Em andamento" },
			{ value: "c", label: "Concluído com sucesso" },
			{ value: "d", label: "Cancelado pelo usuário" },
			{ value: "e", label: "Arquivado" },
		]}
		value="c"
	/>
</div>
