<script lang="ts">
  import { Button } from '@codeatlasdev/ui';
</script>

<div class="col">
  <Button fullWidth>Continue</Button>
  <Button fullWidth variant="outlined">Cancel</Button>
</div>

<style>
  .col {
    display: flex;
    flex-direction: column;
    gap: var(--ca-space-2);
    width: 100%;
    max-width: 320px;
  }
</style>
