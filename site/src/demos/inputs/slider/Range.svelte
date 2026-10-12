<script lang="ts">
  import { Slider } from '@codeatlasdev/ui';

  let range = $state<[number, number]>([20, 75]);
</script>

<div class="row">
  <span class="label">Price</span>
  <Slider bind:values={range} min={0} max={100} />
  <span class="val">${range[0]} – ${range[1]}</span>
</div>

<style>
  .row {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    max-width: 480px;
  }

  .label {
    flex-shrink: 0;
    min-width: 76px;
    font-size: var(--ca-font-size-body2);
    color: var(--ca-text-secondary);
  }

  .val {
    flex-shrink: 0;
    min-width: 88px;
    text-align: right;
    font-family: var(--ca-font-mono);
    font-size: var(--ca-font-size-body2);
    font-weight: 600;
    color: var(--ca-brand-text);
  }
</style>
