<script lang="ts">
  import { SegmentedControl } from '@codeatlasdev/ui';

  let size = $state('b');
</script>

<div class="wide">
  <SegmentedControl
    size="sm"
    fullWidth
    aria-label="Size"
    bind:value={size}
    items={[
      { value: 'a', label: 'Alpha' },
      { value: 'b', label: 'Beta' },
      { value: 'c', label: 'Gamma', disabled: true },
      { value: 'd', label: 'Delta' },
    ]}
  />
</div>

<style>
  .wide {
    width: 100%;
    max-width: 420px;
  }
</style>
