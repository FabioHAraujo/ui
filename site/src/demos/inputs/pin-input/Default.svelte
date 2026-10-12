<script lang="ts">
  import { PinInput } from '@codeatlasdev/ui';

  let code = $state('');
  let done = $state('');
  let pin = $state('');
</script>

<div class="col">
  <div>
    <PinInput label="Verification code" bind:value={code} oncomplete={(v) => (done = v)} />
    <p class="out">value: {code || '–'} · completed: {done || '–'}</p>
  </div>
  <PinInput label="PIN" length={4} mask bind:value={pin} />
</div>

<style>
  .col {
    display: flex;
    flex-direction: column;
    gap: var(--ca-space-5);
  }

  .out {
    margin: var(--ca-space-3) 0 0;
    font-size: var(--ca-font-size-caption);
    color: var(--ca-text-secondary);
  }
</style>
