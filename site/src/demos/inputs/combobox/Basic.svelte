<script lang="ts">
  import { Combobox } from '@codeatlasdev/ui';

  const frameworks = [
    { value: 'svelte', label: 'Svelte' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'solid', label: 'SolidJS' },
    { value: 'astro', label: 'Astro' },
    { value: 'nuxt', label: 'Nuxt' },
    { value: 'sveltekit', label: 'SvelteKit' },
  ];

  let selected = $state('');
</script>

<div class="col">
  <Combobox label="Framework" options={frameworks} bind:value={selected} />
  {#if selected}
    <p class="out">Selected: <code>{selected}</code></p>
  {/if}
</div>

<style>
  .col {
    width: 100%;
    max-width: 320px;
  }

  .out {
    margin: var(--ca-space-3) 0 0;
    font-size: var(--ca-font-size-body2);
    color: var(--ca-text-secondary);
  }
</style>
