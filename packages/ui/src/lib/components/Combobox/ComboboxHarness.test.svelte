<script lang="ts">
  import { untrack } from 'svelte';
  import Combobox from './Combobox.svelte';

  let { initial = '', ...rest }: { initial?: string; [key: string]: unknown } = $props();
  let value = $state(untrack(() => initial));
</script>

<Combobox bind:value {...rest} options={[
  { value: 'sp', label: 'São Paulo' },
  { value: 'rj', label: 'Rio de Janeiro' },
  { value: 'mg', label: 'Minas Gerais' },
]} />
<output data-testid="bound">{value}</output>
