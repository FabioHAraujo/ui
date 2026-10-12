<script lang="ts">
  import { Progress } from '@codeatlasdev/ui';
</script>

<div class="col">
  <div class="row">
    <span class="label">Loading</span>
    <Progress indeterminate label="Loading content" />
  </div>
  <div class="row">
    <span class="label">Syncing</span>
    <Progress indeterminate label="Syncing data" />
  </div>
</div>

<style>
  .col { display: flex; flex-direction: column; gap: 16px; width: 100%; max-width: 480px; }
  .row { display: flex; align-items: center; gap: 14px; }
  .label {
    font-size: var(--ca-font-size-caption);
    font-family: var(--ca-font-mono);
    color: var(--ca-text-secondary);
    min-width: 64px;
    flex-shrink: 0;
    text-align: right;
  }
</style>
