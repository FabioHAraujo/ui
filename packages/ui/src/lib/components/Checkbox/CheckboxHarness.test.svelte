<script lang="ts">
  import { untrack } from 'svelte';
  import Checkbox from './Checkbox.svelte';

  let { initial = false, ...rest }: { initial?: boolean; [key: string]: unknown } = $props();
  let checked = $state(untrack(() => initial));
</script>

<Checkbox bind:checked {...rest} />
<output data-testid="bound">{String(checked)}</output>
