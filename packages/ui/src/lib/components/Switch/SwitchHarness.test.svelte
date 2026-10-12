<script lang="ts">
  import { untrack } from 'svelte';
  import Switch from './Switch.svelte';

  let { initial = false, ...rest }: { initial?: boolean; [key: string]: unknown } = $props();
  let checked = $state(untrack(() => initial));
</script>

<Switch bind:checked {...rest} />
<output data-testid="bound">{String(checked)}</output>
