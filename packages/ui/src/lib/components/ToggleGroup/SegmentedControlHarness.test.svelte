<script lang="ts">
  import { untrack } from 'svelte';
  import SegmentedControl from './SegmentedControl.svelte';

  let { initial = undefined, ...rest }: { initial?: string; [key: string]: unknown } = $props();
  let value = $state<string | undefined>(untrack(() => initial));
</script>

<SegmentedControl bind:value {...rest} items={[
  { value: 'day', label: 'Dia' },
  { value: 'week', label: 'Semana' },
  { value: 'month', label: 'Mês' },
]} />
<output data-testid="bound">{value ?? ''}</output>
