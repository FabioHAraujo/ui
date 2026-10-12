<script lang="ts">
	import NumberField from "./NumberField.svelte";
</script>

<div
	data-testid="matrix"
	style="display:grid;gap:16px;padding:16px;width:720px;grid-template-columns:repeat(2,1fr)"
>
	<NumberField label="Padrão" value={5} />
	<NumberField label="Pequeno" size="sm" value={5} />
	<NumberField label="No mínimo" value={0} min={0} max={10} />
	<NumberField label="No máximo" value={10} min={0} max={10} />
	<NumberField label="Descrição" description="Quantidade de itens" value={3} />
	<NumberField label="Erro" error="Valor inválido" value={42} />
	<NumberField label="Obrigatório" required value={1} />
	<NumberField label="Desabilitado" disabled value={7} />
	<NumberField label="Passo decimal" step={0.5} value={2.5} />
	<NumberField label="Valor grande" value={123456789} />
</div>
