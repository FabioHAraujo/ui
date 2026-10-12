<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    children?: Snippet;
    leading?: Snippet;
    trailing?: Snippet;
  }

  let { class: className = '', children, leading, trailing }: Props = $props();
</script>

<header class="ca-app-bar glass-nav-layer {className}">
  <div class="ca-app-bar__leading">
    {@render leading?.()}
  </div>
  <div class="ca-app-bar__content">
    {@render children?.()}
  </div>
  <div class="ca-app-bar__trailing">
    {@render trailing?.()}
  </div>
</header>

<style>
  .ca-app-bar {
    position: sticky;
    top: 0;
    height: 56px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 0 16px;
    z-index: var(--ca-z-nav);
    width: 100%;
  }

  .ca-app-bar__leading,
  .ca-app-bar__trailing {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .ca-app-bar__content {
    flex: 1;
    display: flex;
    align-items: center;
    min-width: 0;
  }
</style>
