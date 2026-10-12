<script lang="ts">
  import { AlertDialog, Button } from '@codeatlasdev/ui';

  let open = $state(false);
  let done = $state(false);
  const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

  async function removeItem() {
    await wait(1500);
    done = true;
  }
</script>

<Button variant="destructive" onclick={() => ((done = false), (open = true))}>Remove item (1.5s)</Button>

<AlertDialog
  bind:open
  title="Remove item?"
  description="The request takes 1.5 seconds."
  confirmLabel="Remove"
  destructive
  onconfirm={removeItem}
/>

{#if done}<span class="note" aria-live="polite">Item removed (async onconfirm resolved).</span>{/if}

<style>
  .note { font-size: 13px; color: var(--ca-text-secondary); }
</style>
