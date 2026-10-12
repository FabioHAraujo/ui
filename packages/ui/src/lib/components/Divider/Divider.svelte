<script lang="ts">
  interface Props {
    orientation?: 'horizontal' | 'vertical';
    class?: string;
  }
  let { orientation = 'horizontal', class: className = '' }: Props = $props();
</script>

<div
  role="separator"
  aria-orientation={orientation}
  class="ca-divider ca-divider--{orientation} {className}"
></div>

<style>
  .ca-divider {
    flex-shrink: 0;
    background: var(--ca-outline-subtle);
  }
  .ca-divider--horizontal {
    width: 100%;
    height: 1px;
    margin-block: 8px;
  }
  .ca-divider--vertical {
    height: 100%;
    width: 1px;
    margin-inline: 8px;
  }
</style>
