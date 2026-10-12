<script lang="ts">
  import { Collapsible } from '@codeatlasdev/ui';

  let open = $state(true);
</script>

<div class="wrap">
  <Collapsible title="Expanded on mount" bind:open>
    <p>This panel starts open. The user can collapse it.</p>
  </Collapsible>
  <p class="state">open = {open}</p>
</div>

<style>
  .wrap { width: 100%; max-width: 560px; display: flex; flex-direction: column; gap: var(--ca-space-2); }
  p { margin: 0; font-size: var(--ca-font-size-body2); color: var(--ca-text-secondary); line-height: 1.6; }
  .state { font-family: var(--ca-font-mono); font-size: var(--ca-font-size-caption); }
</style>
