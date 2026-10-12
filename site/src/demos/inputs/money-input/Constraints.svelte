<script lang="ts">
  import { MoneyInput } from '@codeatlasdev/ui/forms';

  let deposit = $state(5000);
  let adjustment = $state(-2500);
</script>

<div class="col">
  <MoneyInput
    label="Deposit"
    bind:value={deposit}
    min={1000}
    max={10000}
    description="Between R$ 10,00 and R$ 100,00."
  />
  <MoneyInput label="Adjustment" bind:value={adjustment} allowNegative />
  <MoneyInput label="Amount" value={0} error="Amount must be greater than zero." />
  <MoneyInput label="Locked" value={99900} disabled />
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
