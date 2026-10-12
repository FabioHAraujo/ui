<script lang="ts">
  import { Dialog, Button } from '@codeatlasdev/ui';

  let open = $state(false);
</script>

<Button variant="outlined" onclick={() => (open = true)}>Open chromeless</Button>

<Dialog bind:open title="Preview" size="md" chromeless>
  <div class="media">
    <p>Edge-to-edge content. Close with Esc or by clicking outside.</p>
    <Button variant="filled" onclick={() => (open = false)}>Close</Button>
  </div>
</Dialog>

<style>
  .media {
    display: grid;
    gap: 12px;
    padding: 24px;
    justify-items: start;
    color: var(--ca-text-secondary);
    font-size: var(--ca-font-size-body2);
  }
  .media p { margin: 0; }
</style>
