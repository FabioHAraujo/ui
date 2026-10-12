<script lang="ts">
	import Checkbox from "./Checkbox.svelte";
</script>

<div
	data-testid="matrix"
	style="display:grid;gap:16px;padding:16px;width:max-content;grid-template-columns:repeat(2,max-content)"
>
	<Checkbox label="Desmarcado" />
	<Checkbox label="Marcado" checked />
	<Checkbox label="Indeterminado" indeterminate />
	<Checkbox label="Desabilitado" disabled />
	<Checkbox label="Marcado desabilitado" checked disabled />
	<Checkbox label="Indeterminado desabilitado" indeterminate disabled />
	<Checkbox label="Um rótulo bastante longo para validar o alinhamento com a caixa" checked />
	<Checkbox checked />
</div>
