<script lang="ts">
  import { t } from '../../i18n/state.svelte.js';
  import { toast } from '../../stores/toast.svelte.js';
  import ToastItem from './ToastItem.svelte';
</script>

<div class="ca-toaster" role="region" aria-live="polite" aria-label={t().toast.region}>
  {#each toast.items as item (item.id)}
    <ToastItem {item} onclose={() => toast.remove(item.id)} />
  {/each}
</div>

<style>
  .ca-toaster {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: var(--ca-z-snackbar);
    display: flex;
    flex-direction: column;
    gap: 8px;
    pointer-events: none;
    max-width: 380px;
    width: calc(100vw - 48px);
  }
</style>
