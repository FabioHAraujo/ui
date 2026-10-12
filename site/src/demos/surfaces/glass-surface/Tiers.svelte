<script lang="ts">
  import { GlassSurface } from '@codeatlasdev/ui';
  import type { Thickness } from '@codeatlasdev/ui';

  const tiers: Thickness[] = ['ultra-thin', 'thin', 'regular', 'thick', 'chrome'];
</script>

<div class="backdrop">
  {#each tiers as t}
    <GlassSurface thickness={t} refraction={false} class="tier">
      <p>{t}</p>
    </GlassSurface>
  {/each}
</div>

<style>
  .backdrop {
    background: linear-gradient(135deg, var(--ca-brand-dark), var(--ca-semantic-info), var(--ca-semantic-success));
    border-radius: var(--ca-radius-lg);
    padding: var(--ca-space-6);
    display: flex;
    flex-wrap: wrap;
    gap: var(--ca-space-3);
    width: 100%;
  }
  :global(.tier) { flex: 1; min-width: 100px; padding: 20px; border-radius: var(--ca-radius-md); text-align: center; }
  p { margin: 0; font-family: var(--ca-font-mono); font-size: var(--ca-font-size-caption); font-weight: 600; color: var(--ca-text-primary); }
</style>
