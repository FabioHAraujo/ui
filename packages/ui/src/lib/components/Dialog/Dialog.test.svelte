<script lang="ts">
	import Button from "../Button/Button.svelte";
	import Dialog from "./Dialog.svelte";

	interface Props {
		size?: "sm" | "md" | "lg" | "xl" | "split";
		chromeless?: boolean;
		onOpenChange?: (open: boolean) => void;
	}
	let { size = "md", chromeless = false, onOpenChange }: Props = $props();
	let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Abrir</Button>
<Dialog bind:open title="Editar perfil" description="Atualize seus dados." {size} {chromeless} {onOpenChange}>
	<div data-testid="col-a"><input aria-label="Nome" /></div>
	<div data-testid="col-b"><input aria-label="Email" /></div>
	{#snippet actions()}
		<Button variant="outlined" onclick={() => (open = false)}>Cancelar</Button>
		<Button>Salvar</Button>
	{/snippet}
</Dialog>
