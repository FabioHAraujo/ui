<script lang="ts">
	import Button from "../Button/Button.svelte";
	import Dialog from "./Dialog.svelte";

	interface Props {
		size?: "sm" | "md" | "lg" | "xl" | "split";
		chromeless?: boolean;
		/** Opens on mount (used by the responsive split screenshots). */
		open?: boolean;
	}

	let { size = "md", chromeless = false, open = $bindable(false) }: Props = $props();
</script>

<div data-testid="matrix" style="padding:24px">
	<Button onclick={() => (open = true)}>Abrir</Button>
</div>

<Dialog
	bind:open
	{size}
	{chromeless}
	title="Convidar membro"
	description="Envie um convite por e-mail para o workspace."
>
	{#if size === "split"}
		<div style="padding:24px">
			<h3 style="margin:0 0 8px">Detalhes</h3>
			<p style="margin:0">Coluna da esquerda com informações do convite.</p>
		</div>
		<div style="padding:24px;background:var(--ca-surface-base)">
			<h3 style="margin:0 0 8px">Pré-visualização</h3>
			<p style="margin:0">Coluna da direita com o resumo.</p>
		</div>
	{:else if chromeless}
		<div style="padding:24px">
			<p style="margin:0">Conteúdo sem cabeçalho nem ações.</p>
		</div>
	{:else}
		<p style="margin:0">Conteúdo do diálogo com texto de exemplo para medir o espaçamento.</p>
	{/if}
	{#snippet actions()}
		<Button variant="ghost" onclick={() => (open = false)}>Cancelar</Button>
		<Button onclick={() => (open = false)}>Convidar</Button>
	{/snippet}
</Dialog>
