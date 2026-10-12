<script lang="ts">
	import GlassAppBar from "./GlassAppBar.svelte";
</script>

<div
	data-testid="matrix"
	style="display:grid;gap:16px;padding:16px;width:720px;background:repeating-linear-gradient(45deg,#e11d48 0 24px,#2563eb 24px 48px)"
>
	<GlassAppBar>
		{#snippet children()}<strong>Somente conteúdo</strong>{/snippet}
	</GlassAppBar>
	<GlassAppBar>
		{#snippet leading()}<span>◀ Voltar</span>{/snippet}
		{#snippet children()}<strong>Título</strong>{/snippet}
		{#snippet trailing()}<span>Ação</span>{/snippet}
	</GlassAppBar>
	<GlassAppBar>
		{#snippet leading()}<span>Menu</span>{/snippet}
		{#snippet children()}<strong>Sem trailing</strong>{/snippet}
	</GlassAppBar>
	<GlassAppBar>
		{#snippet children()}<strong>Sem leading</strong>{/snippet}
		{#snippet trailing()}<span>Perfil</span>{/snippet}
	</GlassAppBar>
</div>
