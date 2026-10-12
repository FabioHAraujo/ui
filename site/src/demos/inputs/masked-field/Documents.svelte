<script lang="ts">
  import {
    MaskedField,
    isValidCNPJ,
    isValidCPF,
    isValidDateBR,
    maskCNPJ,
    maskCPF,
    maskCPFCNPJ,
    maskDateBR,
    maskRG,
  } from '@codeatlasdev/ui/forms';

  let cpf = $state('');
  let cnpj = $state('');
  let doc = $state('');
  let birth = $state('');
  let rg = $state('');
</script>

<div class="col">
  <MaskedField
    label="CPF"
    placeholder="000.000.000-00"
    mask={maskCPF}
    validate={(v) => (isValidCPF(v) ? undefined : 'Invalid CPF')}
    bind:value={cpf}
  />
  <MaskedField
    label="CNPJ"
    placeholder="00.000.000/0000-00"
    mask={maskCNPJ}
    validate={(v) => (isValidCNPJ(v) ? undefined : 'Invalid CNPJ')}
    bind:value={cnpj}
  />
  <MaskedField label="CPF or CNPJ" description="Switches mask after 11 digits." mask={maskCPFCNPJ} bind:value={doc} />
  <MaskedField
    label="Birth date"
    placeholder="dd/mm/yyyy"
    mask={maskDateBR}
    validate={(v) => (isValidDateBR(v) ? undefined : 'Invalid date')}
    bind:value={birth}
  />
  <MaskedField label="RG" placeholder="00.000.000-0" mask={maskRG} bind:value={rg} />
</div>

<style>
  .col {
    display: flex;
    flex-direction: column;
    gap: var(--ca-space-4);
    width: 100%;
    max-width: 400px;
  }
</style>
