<script lang="ts">
  import { EmptyState, Button } from '@codeatlasdev/ui';
  import { Inbox } from '@lucide/svelte';
</script>

<EmptyState icon={Inbox} title="No messages yet" description="Your inbox is empty. New messages will appear here.">
  {#snippet actions()}
    <Button variant="filled" size="sm">Compose message</Button>
  {/snippet}
</EmptyState>
