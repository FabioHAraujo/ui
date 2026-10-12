<script lang="ts">
  import DocsSearch from './DocsSearch.svelte';
  import type { DocsSearchEntry } from './types.js';

  let {
    index,
    open = $bindable(false),
    onselect = () => {},
  }: {
    index: DocsSearchEntry[] | (() => Promise<DocsSearchEntry[]>);
    open?: boolean;
    onselect?: (href: string) => void;
  } = $props();
</script>

<DocsSearch bind:open {index} {onselect} />
