<script lang="ts">
  import { untrack } from 'svelte';
  import PhoneField from './PhoneField.svelte';

  let { initial = '' }: { initial?: string } = $props();
  let value = $state(untrack(() => initial));
</script>

<PhoneField label="Telefone" bind:value />
<output data-testid="bound">{value}</output>
<button type="button" onclick={() => (value = '+5521987654321')}>definir externo</button>
