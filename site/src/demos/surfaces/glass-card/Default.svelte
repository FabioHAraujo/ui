<script lang="ts">
  import { GlassCard } from '@codeatlasdev/ui';
</script>

<div class="backdrop">
  <GlassCard class="demo">
    <p class="title">Glass Card</p>
    <p class="text">Regular thickness, default settings.</p>
  </GlassCard>
</div>

<style>
  .backdrop {
    background: linear-gradient(135deg, var(--ca-brand-main) 0%, var(--ca-semantic-info) 100%);
    border-radius: var(--ca-radius-lg);
    padding: var(--ca-space-8);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  :global(.demo) { min-width: 220px; max-width: 320px; }
  .title { margin: 0 0 4px; font-size: var(--ca-font-size-body1); font-weight: 600; color: var(--ca-text-primary); }
  .text { margin: 0; font-size: var(--ca-font-size-body2); color: var(--ca-text-secondary); }
</style>
