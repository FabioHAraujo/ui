<script lang="ts">
  export interface TimelineItem {
    label: string;
    description?: string;
    date?: string;
    variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  }

  interface Props {
    items: TimelineItem[];
    class?: string;
  }

  let { items, class: className = '' }: Props = $props();
</script>

<ol class="ca-timeline {className}">
  {#each items as item, i}
    <li class="ca-timeline__item">
      <div class="ca-timeline__track">
        <div class="ca-timeline__dot ca-timeline__dot--{item.variant ?? 'default'}"></div>
        {#if i < items.length - 1}
          <div class="ca-timeline__connector"></div>
        {/if}
      </div>
      <div class="ca-timeline__content">
        <div class="ca-timeline__header">
          <span class="ca-timeline__label">{item.label}</span>
          {#if item.date}
            <time class="ca-timeline__date">{item.date}</time>
          {/if}
        </div>
        {#if item.description}
          <p class="ca-timeline__desc">{item.description}</p>
        {/if}
      </div>
    </li>
  {/each}
</ol>

<style>
  .ca-timeline {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .ca-timeline__item {
    display: flex;
    gap: 16px;
    min-height: 48px;
  }

  .ca-timeline__track {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    width: 20px;
  }

  .ca-timeline__dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
    border: 2px solid var(--ca-outline-default);
    background: var(--ca-surface-base);
    margin-top: 4px;
  }

  .ca-timeline__dot--default { border-color: var(--ca-outline-default); }
  .ca-timeline__dot--success { border-color: var(--ca-semantic-success); background: var(--ca-semantic-success); }
  .ca-timeline__dot--error   { border-color: var(--ca-semantic-error);   background: var(--ca-semantic-error); }
  .ca-timeline__dot--warning { border-color: var(--ca-semantic-warning); background: var(--ca-semantic-warning); }
  .ca-timeline__dot--info    { border-color: var(--ca-semantic-info);    background: var(--ca-semantic-info); }

  .ca-timeline__connector {
    flex: 1;
    width: 2px;
    background: var(--ca-outline-subtle);
    margin-block: 4px;
  }

  .ca-timeline__content {
    flex: 1;
    padding-bottom: 24px;
  }

  .ca-timeline__header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .ca-timeline__label {
    font-size: var(--ca-font-size-body2);
    font-weight: 500;
    color: var(--ca-text-primary);
  }

  .ca-timeline__date {
    font-size: var(--ca-font-size-caption);
    color: var(--ca-text-hint);
    flex-shrink: 0;
  }

  .ca-timeline__desc {
    margin: 4px 0 0;
    font-size: var(--ca-font-size-body2);
    color: var(--ca-text-secondary);
    line-height: 1.5;
  }
</style>
