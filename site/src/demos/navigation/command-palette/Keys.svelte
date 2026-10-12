<script lang="ts">
  import { Kbd } from '@codeatlasdev/ui';

  const keys = [
    { key: 'Type', desc: 'Filter by label or module name' },
    { key: '↑ ↓', desc: 'Move through the results' },
    { key: '↵', desc: 'Navigate to the selected item' },
    { key: 'ESC', desc: 'Close the palette' },
  ];
</script>

<ul class="list">
  {#each keys as k}
    <li><Kbd>{k.key}</Kbd><span>{k.desc}</span></li>
  {/each}
</ul>

<style>
  .list { list-style: none; margin: 0; padding: 0; display: grid; gap: 4px; width: 100%; max-width: 480px; }
  li { display: flex; align-items: center; gap: 16px; padding: 8px 4px; }
  span { font-size: var(--ca-font-size-body2); color: var(--ca-text-secondary); }
</style>
