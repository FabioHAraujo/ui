<script lang="ts">
	import Callout from "./Callout.svelte";

	const types = ["note", "tip", "caution", "danger"] as const;
</script>

<div
	data-testid="matrix"
	style="display:grid;grid-template-columns:repeat(2,420px);gap:16px;padding:16px;width:max-content"
>
	{#each types as type (type)}
		<Callout {type}>
			{#snippet children()}<p>Conteúdo do callout {type}.</p>{/snippet}
		</Callout>
		<Callout {type} title="Título custom">
			{#snippet children()}<p>Primeiro parágrafo.</p><p>Segundo parágrafo com <code>código</code>.</p>{/snippet}
		</Callout>
	{/each}
</div>
