<script lang="ts">
  import { t } from '../../i18n/state.svelte.js';
  import type { NavModule } from './types.js';
  import { isNavSection } from './types.js';
  import PanelNavItem from './PanelNavItem.svelte';
  import SectionGroup from './SectionGroup.svelte';

  interface Props {
    modules:           NavModule[];
    activeModuleIndex: number;
    pathname:          string;
    show:              boolean;
    panelW:            number;
    class?:            string;
  }

  let { modules, activeModuleIndex, pathname, show, panelW, class: className = '' }: Props = $props();

  let activeModule = $derived(modules[activeModuleIndex]);
</script>

{#if show || panelW > 1}
  <aside
    class="ca-panel {className}"
    aria-label={t().appShell.sectionNavigation}
    style="--panel-w:{panelW}px; --panel-opacity:{panelW < 20 ? panelW / 20 : 1}"
  >
    <!-- Module header -->
    <div class="ca-panel__header">
      <span class="ca-panel__title">{activeModule?.label ?? ''}</span>
    </div>

    <!-- Nav items with top/bottom fade mask -->
    <nav class="ca-panel__nav">
      {#if activeModule}
        {#each activeModule.items as item}
          {#if isNavSection(item)}
            <SectionGroup section={item} {pathname} />
          {:else}
            <PanelNavItem
              {item}
              isActive={pathname === item.path || pathname.startsWith(item.path + '/')}
              href={item.path}
            />
          {/if}
        {/each}
      {/if}
    </nav>
  </aside>
{/if}

<style>
  .ca-panel {
    height: 100%;
    flex-shrink: 0;
    overflow: hidden; /* clip while animating */
    display: flex;
    flex-direction: column;
    width: var(--panel-w, 192px);
    opacity: var(--panel-opacity, 1);
    background: var(--ca-glass-bg, oklch(0.14 0 0 / 0.80));
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    backdrop-filter: blur(24px) saturate(180%);
    box-shadow: var(--ca-glass-separator, inset -1px 0 0 oklch(1 0 0 / 0.05),
      inset 0 1px 0 oklch(1 0 0 / 0.14), 0 8px 40px oklch(0 0 0 / 0.50));
  }

  .ca-panel__header {
    height: 52px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    padding: 0 12px;
    box-shadow: inset 0 -1px 0 var(--ca-outline-subtle);
  }

  .ca-panel__title {
    font-size: var(--ca-font-size-label);
    font-weight: 600;
    letter-spacing: -0.008em;
    color: var(--ca-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ca-panel__nav {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 6px 8px 16px;
    -webkit-mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      black 8px,
      black calc(100% - 16px),
      transparent 100%
    );
    mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      black 8px,
      black calc(100% - 16px),
      transparent 100%
    );
  }
  .ca-panel__nav::-webkit-scrollbar { display: none; }
</style>
