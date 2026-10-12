<script lang="ts">
  import { GlassSurface } from '@codeatlasdev/ui';
  import type { Thickness } from '@codeatlasdev/ui';

  const tiers: Thickness[] = ['ultra-thin', 'thin', 'regular', 'thick', 'chrome'];
  let thickness = $state<Thickness>('regular');
  let tinted = $state(false);
  let glowing = $state(false);
</script>

<div class="controls">
  <div class="group" role="group" aria-label="Thickness">
    <span class="label">Thickness</span>
    {#each tiers as t}
      <button
        type="button"
        class="chip"
        class:chip--active={thickness === t}
        aria-pressed={thickness === t}
        onclick={() => (thickness = t)}
      >{t}</button>
    {/each}
  </div>
  <div class="group">
    <label class="label"><input type="checkbox" bind:checked={tinted} /> Tinted</label>
    <label class="label"><input type="checkbox" bind:checked={glowing} /> Glowing</label>
  </div>

  <div class="backdrop">
    <GlassSurface {thickness} {tinted} {glowing} refraction={false} class="preview">
      <p class="name">{thickness}{tinted ? ' · tinted' : ''}{glowing ? ' · glowing' : ''}</p>
      <p class="sub">GlassSurface</p>
    </GlassSurface>
  </div>
</div>

<style>
  .controls { display: flex; flex-direction: column; gap: var(--ca-space-3); width: 100%; }
  .group { display: flex; align-items: center; gap: var(--ca-space-2); flex-wrap: wrap; }
  .label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: var(--ca-font-size-caption);
    font-weight: 500;
    color: var(--ca-text-secondary);
    cursor: pointer;
  }
  .chip {
    padding: 4px 12px;
    border-radius: var(--ca-radius-pill);
    font: inherit;
    font-size: var(--ca-font-size-caption);
    font-weight: 500;
    border: 1px solid var(--ca-outline-default);
    background: transparent;
    color: var(--ca-text-secondary);
    cursor: pointer;
  }
  .chip--active { background: var(--ca-brand-fill); border-color: var(--ca-brand-main); color: var(--ca-brand-contrast); }
  .backdrop {
    background: linear-gradient(135deg, var(--ca-brand-main) 0%, var(--ca-semantic-info) 100%);
    border-radius: var(--ca-radius-lg);
    padding: var(--ca-space-10);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  :global(.preview) { padding: 32px 48px; border-radius: var(--ca-radius-lg); text-align: center; min-width: 200px; }
  .name { margin: 0 0 4px; font-family: var(--ca-font-mono); font-size: var(--ca-font-size-body1); font-weight: 600; color: var(--ca-text-primary); }
  .sub { margin: 0; font-size: var(--ca-font-size-caption); color: var(--ca-text-secondary); }
</style>
