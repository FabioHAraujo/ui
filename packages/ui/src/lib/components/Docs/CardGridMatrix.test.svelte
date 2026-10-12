<script lang="ts">
	import CardGrid from "./CardGrid.svelte";
	import LinkCard from "./LinkCard.svelte";
</script>

<div data-testid="matrix" style="padding:16px;width:900px">
	<CardGrid>
		{#snippet children()}
			<LinkCard title="Começando" description="Instale e configure em minutos." href="#a" />
			<LinkCard title="Autenticação" description="Tokens, escopos e boas práticas de segurança." href="#b" />
			<LinkCard title="Sem descrição" href="#c" />
			<LinkCard
				title="Título bem longo para validar quebra de linha no card"
				description="Descrição também longa para verificar a altura mínima e o alinhamento da seta ao final do título."
				href="#d"
			/>
		{/snippet}
	</CardGrid>
</div>
