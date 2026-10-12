<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Thickness } from '../../tokens/materials.js';
  import LiquidGlass from '../LiquidGlass/LiquidGlass.svelte';
  import { GLASS_OPTICS } from '../../tokens/materials.js';

  interface Props {
    thickness?: Thickness;
    tinted?: boolean;
    glowing?: boolean;
    refraction?: boolean;
    class?: string;
    style?: string;
    children?: Snippet;
    [key: string]: unknown;
  }

  let {
    thickness = 'regular',
    tinted = false,
    glowing = false,
    refraction = true,
    class: className = '',
    style = '',
    children,
    ...rest
  }: Props = $props();

  let cls = $derived(
    `glass glass-${thickness}${tinted ? ' glass-tinted' : ''}${glowing ? ' glass-glow' : ''} ${className}`
  );
</script>

<div class={cls} {style} {...rest}>
  {#if refraction}
    <LiquidGlass optics={GLASS_OPTICS[thickness]} />
  {/if}
  {@render children?.()}
</div>
