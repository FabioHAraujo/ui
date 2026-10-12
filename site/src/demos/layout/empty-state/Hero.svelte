<script lang="ts">
  import { EmptyState, Button } from '@codeatlasdev/ui';
  import { Inbox } from '@lucide/svelte';
</script>

<EmptyState variant="hero" icon={Inbox} title="Start your first project" description="Projects keep your sessions, contacts and settings in one place.">
  {#snippet actions()}
    <Button variant="filled">Create project</Button>
    <Button variant="ghost">Import</Button>
  {/snippet}
</EmptyState>
