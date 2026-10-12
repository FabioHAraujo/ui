<script lang="ts">
  import { clickOutside } from '@codeatlasdev/ui/actions';

  let count = $state(0);
</script>

<div use:clickOutside={() => count++} class="box">
  <p>Click inside this area, then click outside.</p>
</div>
<p class="hint">Outside clicks: {count}</p>

<style>
  .box {
    padding: 24px;
    border-radius: var(--ca-radius-md);
    box-shadow: inset 0 0 0 1px var(--ca-outline-subtle);
    display: inline-block;
  }
  .box p, .hint { margin: 0; font-size: var(--ca-font-size-body2); }
  .hint { color: var(--ca-text-secondary); align-self: center; }
</style>
