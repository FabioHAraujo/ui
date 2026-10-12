<script lang="ts">
  import { mask } from './mask.js';
  import { maskCEP, maskCPF } from './masks.js';

  let { fn = 'cpf' }: { fn?: 'cpf' | 'cep' } = $props();
  let value = $state('');
  const formatter = $derived(fn === 'cpf' ? maskCPF : maskCEP);
</script>

<label for="raw">Documento</label>
<input id="raw" use:mask={formatter} bind:value />
<output data-testid="bound">{value}</output>
