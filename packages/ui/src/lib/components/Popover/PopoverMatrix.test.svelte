<script lang="ts">
	import Popover from "./Popover.svelte";
</script>

<div data-testid="matrix" style="padding:24px">
	<Popover>
		{#snippet trigger()}Detalhes{/snippet}
		<p style="margin:0 0 8px;font-weight:600">Resumo do pedido</p>
		<p style="margin:0">Três itens, entrega prevista em cinco dias úteis.</p>
	</Popover>
</div>
