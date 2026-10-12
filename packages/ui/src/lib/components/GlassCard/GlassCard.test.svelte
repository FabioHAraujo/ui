<script lang="ts">
  import { createRawSnippet } from 'svelte';
  import GlassCard from './GlassCard.svelte';

  let {
    actionLabel = 'Ação',
    ...rest
  }: { actionLabel?: string; [key: string]: unknown } = $props();

  const body = createRawSnippet(() => ({ render: () => `<p>Conteúdo</p>` }));
  const actions = $derived(
    createRawSnippet(() => ({ render: () => `<button type="button">${actionLabel}</button>` }))
  );
</script>

<GlassCard {...rest} headerActions={actions} children={body} />
