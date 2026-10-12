<script lang="ts">
	import Button from "../Button/Button.svelte";
	import GlassCard from "../GlassCard/GlassCard.svelte";
	import PageShell from "./PageShell.svelte";
</script>

<div
	data-testid="matrix"
	style="display:flex;flex-direction:column;width:100vw;height:100vh;overflow:hidden"
>
	<PageShell title="Painel" description="Visão geral do workspace.">
		{#snippet actions()}
			<Button>Exportar</Button>
		{/snippet}
		<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px">
			<GlassCard><p style="margin:0">Receita</p></GlassCard>
			<GlassCard><p style="margin:0">Usuários</p></GlassCard>
			<GlassCard><p style="margin:0">Conversão</p></GlassCard>
		</div>
	</PageShell>
</div>
