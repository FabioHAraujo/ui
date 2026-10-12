<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className = '', children }: Props = $props();
</script>

<div class="ca-dropdown-label {className}">
  {@render children?.()}
</div>

<style>
  .ca-dropdown-label {
    padding: 4px 12px 2px;
    font-size: var(--ca-font-size-caption);
    font-weight: 600;
    color: var(--ca-text-hint);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
</style>
