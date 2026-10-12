<script lang="ts">
  import { untrack } from 'svelte';
  import Select from './Select.svelte';

  let { initial = undefined, ...rest }: { initial?: string; [key: string]: unknown } = $props();
  let value = $state<string | undefined>(untrack(() => initial));
</script>

<Select bind:value {...rest} options={[
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
]} />
<output data-testid="bound">{value ?? ''}</output>
