<script lang="ts">
  import { GlassCard } from '@codeatlasdev/ui';
</script>

<div class="backdrop">
  {#each ['ultra-thin', 'thin', 'regular', 'thick', 'chrome'] as const as t}
    <GlassCard thickness={t} class="tier">
      <p class="title">{t}</p>
    </GlassCard>
  {/each}
</div>

<style>
  .backdrop {
    background: linear-gradient(135deg, var(--ca-brand-main) 0%, var(--ca-semantic-info) 100%);
    border-radius: var(--ca-radius-lg);
    padding: var(--ca-space-8);
    display: flex;
    flex-wrap: wrap;
    gap: var(--ca-space-3);
    width: 100%;
  }
  :global(.tier) { flex: 1; min-width: 100px; }
  .title { margin: 0; font-size: var(--ca-font-size-body1); font-weight: 600; color: var(--ca-text-primary); }
</style>
