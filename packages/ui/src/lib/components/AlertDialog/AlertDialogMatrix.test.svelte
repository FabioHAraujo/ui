<script lang="ts">
	import Button from "../Button/Button.svelte";
	import AlertDialog from "./AlertDialog.svelte";

	let { destructive = false }: { destructive?: boolean } = $props();
	let open = $state(false);
</script>

<div data-testid="matrix" style="padding:24px">
	<Button onclick={() => (open = true)}>Abrir</Button>
</div>

<AlertDialog
	bind:open
	{destructive}
	title="Excluir item?"
	description="Esta ação não pode ser desfeita."
	confirmLabel={destructive ? "Excluir" : "Confirmar"}
	onconfirm={() => {}}
/>
