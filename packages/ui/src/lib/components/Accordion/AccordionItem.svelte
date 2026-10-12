<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Accordion } from 'bits-ui';
  import { ChevronDown } from '@lucide/svelte';

  interface Props {
    value: string;
    title: string;
    class?: string;
    children?: Snippet;
  }

  let { value, title, class: className = '', children }: Props = $props();
</script>

<Accordion.Item {value} class="ca-accordion-item {className}">
  <Accordion.Header class="ca-accordion-item__header">
    <Accordion.Trigger class="ca-accordion-item__trigger">
      <span class="ca-accordion-item__title">{title}</span>
      <span class="ca-accordion-item__chevron" aria-hidden="true">
        <ChevronDown size={16} stroke-width={2} />
      </span>
    </Accordion.Trigger>
  </Accordion.Header>
  <Accordion.Content class="ca-accordion-item__content">
    <div class="ca-accordion-item__body">
      {@render children?.()}
    </div>
  </Accordion.Content>
</Accordion.Item>

<style>
  :global(.ca-accordion-item) {
    background: var(--ca-glass-tint-ultra-thin);
    backdrop-filter: var(--ca-blur-ultra-thin);
    border: 1px solid var(--ca-glass-border);
    border-radius: var(--ca-radius-lg);
    overflow: hidden;
  }

  :global(.ca-accordion-item__header) {
    margin: 0;
    padding: 0;
  }

  :global(.ca-accordion-item__trigger) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 48px;
    padding: 0 16px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: var(--ca-font-sans);
    font-size: var(--ca-font-size-body1);
    font-weight: 500;
    color: var(--ca-text-primary);
    text-align: left;
    transition: background var(--ca-duration-fast) var(--ca-ease-standard);
  }

  :global(.ca-accordion-item__trigger:hover) {
    background: var(--ca-action-hover);
  }

  :global(.ca-accordion-item__trigger:focus-visible) {
    outline: 2px solid var(--ca-brand-main);
    outline-offset: -2px;
  }

  :global(.ca-accordion-item__trigger[data-state='open'] .ca-accordion-item__chevron) {
    transform: rotate(180deg);
  }

  :global(.ca-accordion-item__title) {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :global(.ca-accordion-item__chevron) {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    color: var(--ca-text-secondary);
    transition: transform var(--ca-duration-base) var(--ca-ease-spring);
  }

  :global(.ca-accordion-item__content) {
    overflow: hidden;
  }

  :global(.ca-accordion-item__content[data-state='closed']) {
    animation: ca-accordion-up var(--ca-duration-base) var(--ca-ease-standard);
  }

  :global(.ca-accordion-item__content[data-state='open']) {
    animation: ca-accordion-down var(--ca-duration-base) var(--ca-ease-standard);
  }

  :global(.ca-accordion-item__body) {
    padding: 0 16px 16px;
    font-size: var(--ca-font-size-body2);
    color: var(--ca-text-secondary);
    line-height: 1.6;
  }

  @keyframes ca-accordion-down {
    from { height: 0; opacity: 0; }
    to { height: var(--bits-accordion-content-height); opacity: 1; }
  }

  @keyframes ca-accordion-up {
    from { height: var(--bits-accordion-content-height); opacity: 1; }
    to { height: 0; opacity: 0; }
  }
</style>
