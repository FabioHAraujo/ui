<script lang="ts">
  import { Progress } from '@codeatlasdev/ui';
</script>

<div class="col">
  {#each [25, 50, 75, 100] as v}
    <div class="row">
      <span class="label">{v}%</span>
      <Progress value={v} label="{v} percent" />
    </div>
  {/each}
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
