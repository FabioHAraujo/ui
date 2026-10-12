<script lang="ts">
	import Button from "../Button/Button.svelte";
	import Drawer from "./Drawer.svelte";

	let { side = "right" }: { side?: "left" | "right" | "bottom" } = $props();
	let open = $state(false);
</script>

<div data-testid="matrix" style="padding:24px">
	<Button onclick={() => (open = true)}>Abrir</Button>
</div>

<Drawer bind:open {side} title="Filtros">
	<p style="margin:0">Conteúdo do painel lateral com filtros de exemplo.</p>
	{#snippet actions()}
		<Button variant="ghost" onclick={() => (open = false)}>Limpar</Button>
		<Button onclick={() => (open = false)}>Aplicar</Button>
	{/snippet}
</Drawer>
