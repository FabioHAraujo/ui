<script lang="ts">
	import Alert from "./Alert.svelte";

	const severities = ["info", "success", "warning", "error"] as const;
</script>

<div
	data-testid="matrix"
	style="display:grid;grid-template-columns:repeat(2,420px);gap:16px;padding:16px;width:max-content"
>
	{#each severities as severity (severity)}
		<Alert {severity}>Mensagem de {severity}</Alert>
		<Alert {severity} title="Título de {severity}" closable>
			Descrição com título e botão de fechar.
		</Alert>
	{/each}
	<Alert severity="warning" title="Texto longo">
		Esta é uma mensagem bem longa para validar a quebra de linha dentro do alerta, garantindo que o
		ícone e a barra lateral acompanhem a altura do conteúdo sem desalinhar.
	</Alert>
	<Alert severity="info" title="Somente título" />
</div>
