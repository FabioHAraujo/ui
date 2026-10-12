<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Tabs } from 'bits-ui';

  interface Props {
    value?:    string;
    onchange?: (v: string) => void;
    class?:    string;
    children?: Snippet;
  }

  let { value = $bindable(), onchange, class: className = '', children }: Props = $props();
</script>

<Tabs.Root bind:value onValueChange={onchange} class="ca-tabs {className}">
  {@render children?.()}
</Tabs.Root>

<style>
  :global(.ca-tabs) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
