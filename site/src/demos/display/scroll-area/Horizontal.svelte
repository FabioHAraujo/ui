<script lang="ts">
  import { ScrollArea, GlassCard, Chip } from '@codeatlasdev/ui';

  const tags = Array.from({ length: 24 }, (_, i) => `Tag ${i + 1}`);
</script>

<GlassCard padding="8px" full>
  <ScrollArea orientation="horizontal" type="always">
    <div class="row">
      {#each tags as tag}<Chip label={tag} />{/each}
    </div>
  </ScrollArea>
</GlassCard>

<style>
  .row { display: flex; gap: var(--ca-space-2); padding: var(--ca-space-2) var(--ca-space-2) var(--ca-space-4); width: max-content; }
</style>
