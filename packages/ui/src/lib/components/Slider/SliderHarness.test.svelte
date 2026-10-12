<script lang="ts">
  import { untrack } from 'svelte';
  import Slider from './Slider.svelte';

  let { initial = 50, ...rest }: { initial?: number; [key: string]: unknown } = $props();
  let value = $state(untrack(() => initial));
</script>

<Slider bind:value {...rest} />
<output data-testid="bound">{value}</output>
