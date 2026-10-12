<script lang="ts">
  import { centsToDisplay, parseInputToCents } from '@codeatlasdev/ui/forms';
</script>

<div class="col">
  <p class="out">centsToDisplay(123456) = {centsToDisplay(123456)}</p>
  <p class="out">parseInputToCents("R$ 1.234,56") = {parseInputToCents('R$ 1.234,56')}</p>
</div>

<style>
  .col {
    display: flex;
    flex-direction: column;
    gap: var(--ca-space-2);
  }

  .out {
    margin: 0;
    font-family: var(--ca-font-mono);
    font-size: var(--ca-font-size-caption);
    color: var(--ca-text-secondary);
  }
</style>
