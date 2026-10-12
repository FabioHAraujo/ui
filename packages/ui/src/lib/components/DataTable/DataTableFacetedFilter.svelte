<script lang="ts">
  import { t } from '../../i18n/state.svelte.js';
  import { Popover } from 'bits-ui';
  import { PlusCircle, Check } from '@lucide/svelte';
  import Badge from '../Badge/Badge.svelte';

  interface Props {
    title:             string;
    /** facets: raw key → count, from server */
    facets?:           Record<string, number>;
    /** maps raw keys → display labels */
    labelMap?:         Record<string, string>;
    selected?:         string[];
    onSelectionChange: (values: string[]) => void;
  }

  let {
    title,
    facets = {},
    labelMap = {},
    selected = [],
    onSelectionChange,
  }: Props = $props();

  const options = $derived(Object.entries(facets).sort((a, b) => b[1] - a[1]));

  function toggle(value: string) {
    const next = selected.includes(value)
      ? selected.filter(v => v !== value)
      : [...selected, value];
    onSelectionChange(next);
  }
</script>

<Popover.Root>
  <Popover.Trigger class="ca-facet__trigger">
    <PlusCircle size={13} stroke-width={2} />
    {title}
    {#if selected.length > 0}
      <span class="ca-facet__sep" aria-hidden="true"></span>
      {#if selected.length > 2}
        <span class="ca-facet__badge">{selected.length} selected</span>
      {:else}
        {#each selected as v}
          <span class="ca-facet__badge">{labelMap[v] ?? v}</span>
        {/each}
      {/if}
    {/if}
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Content class="ca-facet__content" sideOffset={6} align="start">
      <div class="ca-facet__list" role="listbox" aria-label={title} aria-multiselectable="true">
        {#each options as [value, count]}
          {@const label     = labelMap[value] ?? value}
          {@const isSelected = selected.includes(value)}
          <button
            class="ca-facet__item"
            class:ca-facet__item--active={isSelected}
            role="option"
            aria-selected={isSelected}
            type="button"
            onclick={() => toggle(value)}
          >
            <span class="ca-facet__check" aria-hidden="true">
              {#if isSelected}<Check size={11} stroke-width={3} />{/if}
            </span>
            <span class="ca-facet__item-label">{label}</span>
            <span class="ca-facet__count">{count}</span>
          </button>
        {/each}
        {#if options.length === 0}
          <span class="ca-facet__empty">{t().dataTable.noOptions}</span>
        {/if}
      </div>
      {#if selected.length > 0}
        <div class="ca-facet__footer">
          <button class="ca-facet__clear" onclick={() => onSelectionChange([])} type="button">
            {t().dataTable.clearFilter}
          </button>
        </div>
      {/if}
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>

<style>
  :global(.ca-facet__trigger) {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    height: 32px;
    padding: 0 10px;
    border: 1px dashed var(--ca-outline-default);
    border-radius: var(--ca-radius-md);
    background: transparent;
    cursor: pointer;
    font-size: var(--ca-font-size-body2);
    font-weight: 500;
    color: var(--ca-text-secondary);
    transition: background var(--ca-duration-fast) var(--ca-ease-standard),
                border-color var(--ca-duration-fast) var(--ca-ease-standard);
    white-space: nowrap;
  }

  :global(.ca-facet__trigger:hover) {
    background: var(--ca-action-hover);
    border-color: var(--ca-outline-strong);
  }

  :global(.ca-facet__sep) {
    display: inline-block;
    width: 1px;
    height: 14px;
    background: var(--ca-outline-default);
    flex-shrink: 0;
  }

  :global(.ca-facet__badge) {
    display: inline-flex;
    align-items: center;
    padding: 1px 6px;
    border-radius: var(--ca-radius-xs);
    background: color-mix(in oklab, var(--ca-brand-main) 12%, transparent);
    color: var(--ca-brand-text);
    font-size: var(--ca-font-size-caption);
    font-weight: 600;
  }

  :global(.ca-facet__content) {
    min-width: 180px;
    max-width: 260px;
    border-radius: var(--ca-radius-lg);
    border: 1px solid var(--ca-overlay-border);
    background-color: var(--ca-overlay-bg);
    -webkit-backdrop-filter: var(--ca-overlay-blur);
    backdrop-filter: var(--ca-overlay-blur);
    box-shadow: var(--ca-shadow-lg);
    z-index: var(--ca-z-dropdown);
    overflow: hidden;
  }

  :global(.ca-facet__list) {
    padding: 4px;
    display: flex;
    flex-direction: column;
    gap: 1px;
    max-height: 280px;
    overflow-y: auto;
  }

  :global(.ca-facet__item) {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 6px 10px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: var(--ca-font-size-body2);
    color: var(--ca-text-primary);
    border-radius: var(--ca-radius-sm);
    transition: background var(--ca-duration-fast) var(--ca-ease-standard);
    text-align: left;
  }

  :global(.ca-facet__item:hover),
  :global(.ca-facet__item--active) {
    background: var(--ca-action-hover);
  }

  :global(.ca-facet__check) {
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ca-brand-text);
    flex-shrink: 0;
  }

  :global(.ca-facet__item-label) {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :global(.ca-facet__count) {
    font-size: var(--ca-font-size-caption);
    color: var(--ca-text-hint);
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  }

  :global(.ca-facet__empty) {
    padding: 12px 10px;
    font-size: var(--ca-font-size-body2);
    color: var(--ca-text-hint);
    text-align: center;
  }

  :global(.ca-facet__footer) {
    padding: 4px 8px 6px;
    border-top: 1px solid var(--ca-outline-subtle);
  }

  :global(.ca-facet__clear) {
    width: 100%;
    padding: 4px 8px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: var(--ca-font-size-caption);
    color: var(--ca-text-secondary);
    text-align: center;
    border-radius: var(--ca-radius-sm);
    transition: background var(--ca-duration-fast) var(--ca-ease-standard);
  }

  :global(.ca-facet__clear:hover) {
    background: var(--ca-action-hover);
  }
</style>
