<script lang="ts">
  import { Avatar } from '@codeatlasdev/ui';

  const people = [
    { src: 'https://i.pravatar.cc/150?img=1', alt: 'Alice' },
    { src: 'https://i.pravatar.cc/150?img=12', alt: 'Bob' },
    { src: 'https://i.pravatar.cc/150?img=32', alt: 'Clara' },
    { alt: '+4' },
  ];
</script>

<div class="stack">
  {#each people as p, i}
    <div class="item" style="--z:{people.length - i}">
      <Avatar src={p.src} alt={p.alt} size="md" />
    </div>
  {/each}
</div>

<style>
  .stack { display: flex; align-items: center; }
  .item { margin-left: -10px; position: relative; z-index: var(--z, 0); }
  .item:first-child { margin-left: 0; }
</style>
