<script lang="ts">
	import { createRawSnippet } from "svelte";
	import { Inbox, SearchX } from "@lucide/svelte";
	import EmptyState from "./EmptyState.svelte";

	const actions = createRawSnippet(() => ({
		render: () =>
			`<span style="display:inline-block;padding:8px 16px;border-radius:8px;background:#888;color:#fff">Criar item</span>`,
	}));
	const body = createRawSnippet(() => ({ render: () => `<span>Texto via children</span>` }));
</script>

<div
	data-testid="matrix"
	style="display:grid;grid-template-columns:repeat(2,420px);gap:24px;padding:16px;width:max-content"
>
	<EmptyState title="Nada por aqui" />
	<EmptyState icon={Inbox} title="Caixa vazia" description="Você não tem mensagens." />
	<EmptyState icon={SearchX} title="Sem resultados" {actions}>
		{#snippet children()}Tente outro termo.{/snippet}
	</EmptyState>
	<EmptyState icon={Inbox} title="Com children" {actions} children={body} />
	<EmptyState
		variant="hero"
		icon={Inbox}
		title="Comece seu primeiro projeto"
		description="Crie um projeto para organizar suas tarefas e convidar a equipe."
		{actions}
	/>
	<EmptyState variant="hero" title="Hero sem ícone" description="Sem ícone nem ações." />
</div>
