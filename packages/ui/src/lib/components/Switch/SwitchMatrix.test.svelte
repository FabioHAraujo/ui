<script lang="ts">
	import Switch from "./Switch.svelte";
</script>

<div
	data-testid="matrix"
	style="display:grid;gap:16px;padding:16px;width:max-content;grid-template-columns:repeat(2,max-content)"
>
	<Switch label="Desligado" />
	<Switch label="Ligado" checked />
	<Switch label="Desabilitado" disabled />
	<Switch label="Ligado desabilitado" checked disabled />
	<Switch label="Um rótulo bastante longo para validar o alinhamento com o controle" checked />
	<Switch checked />
</div>
