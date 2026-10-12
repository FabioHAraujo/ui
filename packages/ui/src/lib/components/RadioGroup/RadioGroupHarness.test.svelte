<script lang="ts">
  import { untrack } from 'svelte';
  import RadioGroup from './RadioGroup.svelte';

  let { initial = '', ...rest }: { initial?: string; [key: string]: unknown } = $props();
  let value = $state(untrack(() => initial));
</script>

<RadioGroup bind:value {...rest} items={[
  { value: 'free', label: 'Grátis' },
  { value: 'pro', label: 'Pro' },
  { value: 'team', label: 'Equipe' },
]} />
<output data-testid="bound">{value}</output>
