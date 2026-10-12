<script lang="ts">
	import Button from "../Button/Button.svelte";
	import Drawer from "./Drawer.svelte";

	interface Props {
		side?: "left" | "right" | "bottom";
		onOpenChange?: (open: boolean) => void;
	}
	let { side = "right", onOpenChange }: Props = $props();
	let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Abrir filtros</Button>
<Drawer bind:open title="Filtros" {side} {onOpenChange}>
	<label>Status <input /></label>
	{#snippet actions()}
		<Button variant="outlined" onclick={() => (open = false)}>Limpar</Button>
		<Button>Aplicar</Button>
	{/snippet}
</Drawer>
