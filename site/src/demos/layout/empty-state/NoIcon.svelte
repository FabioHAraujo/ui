<script lang="ts">
  import { EmptyState, Button } from '@codeatlasdev/ui';
  import { Plus } from '@lucide/svelte';
</script>

<EmptyState title="Nothing here yet" description="Create your first item to get started.">
  {#snippet actions()}
    <Button variant="filled" size="sm">
      {#snippet leading()}<Plus size={14} />{/snippet}
      Create item
    </Button>
  {/snippet}
</EmptyState>
