<script lang="ts">
  import { GlassCard } from '@codeatlasdev/ui';
</script>

<GlassCard flush full>
  <div class="media">Edge-to-edge content</div>
  <p class="text">With <code>flush</code> the card drops its padding. Use it for tables, images and code.</p>
</GlassCard>

<style>
  .media {
    height: 96px;
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, var(--ca-brand-main), var(--ca-semantic-info));
    color: var(--ca-brand-contrast);
    font-weight: 600;
  }
  .text { margin: 0; padding: var(--ca-space-4); font-size: var(--ca-font-size-body2); color: var(--ca-text-secondary); }
</style>
