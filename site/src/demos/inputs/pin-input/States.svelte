<script lang="ts">
  import { PinInput } from '@codeatlasdev/ui';

  let hinted = $state('123');
</script>

<div class="col">
  <PinInput label="Code" description="Check your email." bind:value={hinted} />
  <PinInput label="Code" error="Invalid or expired code." value="123456" />
  <PinInput label="Code" disabled value="12" />
  <PinInput label="Access key" type="text" length={5} value="" />
</div>

<style>
  .col {
    display: flex;
    flex-direction: column;
    gap: var(--ca-space-5);
  }
</style>
