<script lang="ts">
	import Popover from "./Popover.svelte";
</script>

<Popover>
	{#snippet trigger()}Detalhes{/snippet}
	<p>Conteúdo do popover</p>
	<button type="button">Ação interna</button>
</Popover>
