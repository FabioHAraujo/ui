<script lang="ts">
  import Collapsible from './Collapsible.svelte';

  let {
    open = $bindable(false),
    disabled = false,
  }: { open?: boolean; disabled?: boolean } = $props();
</script>

<Collapsible title="Detalhes" bind:open {disabled}>Conteúdo recolhível</Collapsible>

<output data-testid="open">{String(open)}</output>
