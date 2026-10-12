<script lang="ts">
  import { EmptyState, Button } from '@codeatlasdev/ui';
  import { Search } from '@lucide/svelte';
</script>

<EmptyState icon={Search} title="No results found" description="Try adjusting your search terms or filters.">
  {#snippet actions()}
    <Button variant="outlined" size="sm">Clear filters</Button>
  {/snippet}
</EmptyState>
