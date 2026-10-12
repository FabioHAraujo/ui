<script lang="ts">
  import { EmptyState, Button } from '@codeatlasdev/ui';
  import { WifiOff } from '@lucide/svelte';
</script>

<EmptyState icon={WifiOff} title="Couldn't load data" description="Check your connection and try again.">
  {#snippet actions()}
    <Button variant="outlined" size="sm">Retry</Button>
    <Button variant="ghost" size="sm">Contact support</Button>
  {/snippet}
</EmptyState>
