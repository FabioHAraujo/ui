<script lang="ts">
  interface Props {
    status: 'success' | 'warning' | 'error' | 'info' | 'neutral';
    label: string;
    class?: string;
  }

  let { status, label, class: className = '' }: Props = $props();
</script>

<span class="ca-status-chip ca-status-chip--{status} {className}" role="status">
  {label}
</span>

<style>
  .ca-status-chip {
    display: inline-flex;
    align-items: center;
    height: 22px;
    border-radius: var(--ca-radius-pill);
    padding: 0 8px;
    font-size: var(--ca-font-size-caption);
    font-weight: 500;
    line-height: 1;
  }

  .ca-status-chip--success {
    color: var(--ca-semantic-success);
    background: color-mix(in oklab, var(--ca-semantic-success) 8%, transparent);
  }

  .ca-status-chip--warning {
    color: var(--ca-semantic-warning);
    background: color-mix(in oklab, var(--ca-semantic-warning) 8%, transparent);
  }

  .ca-status-chip--error {
    color: var(--ca-semantic-error);
    background: color-mix(in oklab, var(--ca-semantic-error) 8%, transparent);
  }

  .ca-status-chip--info {
    color: var(--ca-semantic-info);
    background: color-mix(in oklab, var(--ca-semantic-info) 8%, transparent);
  }

  .ca-status-chip--neutral {
    color: var(--ca-text-secondary);
    background: var(--ca-action-hover);
  }
</style>
