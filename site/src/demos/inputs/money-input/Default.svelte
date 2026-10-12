<script lang="ts">
  import { MoneyInput, centsToDisplay } from '@codeatlasdev/ui/forms';

  let price = $state(123456);
</script>

<div class="col">
  <MoneyInput label="Price" bind:value={price} />
  <p class="out">value = {price} cents → {centsToDisplay(price)}</p>
</div>

<style>
  .col {
    display: flex;
    flex-direction: column;
    gap: var(--ca-space-3);
    width: 100%;
    max-width: 400px;
  }

  .out {
    margin: 0;
    font-family: var(--ca-font-mono);
    font-size: var(--ca-font-size-caption);
    color: var(--ca-text-secondary);
  }
</style>
