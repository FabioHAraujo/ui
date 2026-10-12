<script lang="ts">
  import { AlertDialog, Button } from '@codeatlasdev/ui';

  let open = $state(false);
  let pending = $state(false);

  async function publish() {
    pending = true;
    await new Promise<void>((r) => setTimeout(r, 1500));
    pending = false;
    open = false;
  }
</script>

<Button variant="outlined" onclick={() => (open = true)}>Open controlled</Button>

<AlertDialog bind:open title="Publish changes?" confirmLabel="Publish" {pending} onconfirm={publish} />
