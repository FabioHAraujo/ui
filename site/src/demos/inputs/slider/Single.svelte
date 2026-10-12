<script lang="ts">
  import { Slider } from '@codeatlasdev/ui';

  let volume = $state(60);
  let brightness = $state(40);
</script>

<div class="col">
  <div class="row">
    <span class="label">Volume</span>
    <Slider bind:value={volume} min={0} max={100} />
    <span class="val">{volume}</span>
  </div>
  <div class="row">
    <span class="label">Brightness</span>
    <Slider bind:value={brightness} min={0} max={100} />
    <span class="val">{brightness}%</span>
  </div>
</div>

<style>
  .col {
    display: flex;
    flex-direction: column;
    gap: var(--ca-space-5);
    width: 100%;
    max-width: 480px;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .label {
    flex-shrink: 0;
    min-width: 76px;
    font-size: var(--ca-font-size-body2);
    color: var(--ca-text-secondary);
  }

  .val {
    flex-shrink: 0;
    min-width: 64px;
    text-align: right;
    font-family: var(--ca-font-mono);
    font-size: var(--ca-font-size-body2);
    font-weight: 600;
    color: var(--ca-brand-text);
  }
</style>
