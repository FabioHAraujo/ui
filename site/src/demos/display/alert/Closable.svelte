<script lang="ts">
  import { Alert } from '@codeatlasdev/ui';

  let closedInfo = $state(false);
  let closedWarn = $state(false);
</script>

<div class="col">
  {#if !closedInfo}
    <Alert severity="info" title="Heads up" closable onclose={() => (closedInfo = true)}>
      This feature is in beta. Some behavior may change.
    </Alert>
  {:else}
    <p class="dismissed">Info alert dismissed.</p>
  {/if}
  {#if !closedWarn}
    <Alert severity="warning" closable onclose={() => (closedWarn = true)}>
      Storage is 85% full. Consider cleaning up old files.
    </Alert>
  {:else}
    <p class="dismissed">Warning alert dismissed.</p>
  {/if}
</div>

<style>
  .col { display: flex; flex-direction: column; gap: var(--ca-space-3); width: 100%; max-width: 560px; }
  .dismissed { margin: 0; font-size: var(--ca-font-size-caption); color: var(--ca-text-hint); font-style: italic; }
</style>
