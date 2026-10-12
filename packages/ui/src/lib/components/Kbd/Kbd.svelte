<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className = '', children }: Props = $props();
</script>

<kbd class="ca-kbd {className}">{@render children?.()}</kbd>

<style>
  .ca-kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 2px 6px;
    border-radius: var(--ca-radius-xs);
    border: 0.5px solid var(--ca-outline-subtle);
    border-bottom-width: 1.5px;
    background: color-mix(in oklab, var(--ca-text-primary) 6%, transparent);
    font-family: var(--ca-font-mono);
    font-size: var(--ca-font-size-micro);
    color: var(--ca-text-secondary);
    line-height: 1.4;
    white-space: nowrap;
    user-select: none;
  }
</style>
