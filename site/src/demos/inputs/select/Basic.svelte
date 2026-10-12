<script lang="ts">
  import { Select } from '@codeatlasdev/ui';

  let framework = $state('svelte');

  const frameworks = [
    { value: 'svelte', label: 'Svelte 5' },
    { value: 'react', label: 'React 19' },
    { value: 'vue', label: 'Vue 3' },
    { value: 'solid', label: 'SolidJS' },
    { value: 'astro', label: 'Astro' },
  ];
</script>

<div class="col">
  <Select label="Framework" options={frameworks} bind:value={framework} />
  <p class="out">Selected: <strong>{framework}</strong></p>
</div>

<style>
  .col {
    display: flex;
    flex-direction: column;
    gap: var(--ca-space-3);
    width: 100%;
    max-width: 320px;
  }

  .out {
    margin: 0;
    font-size: var(--ca-font-size-body2);
    color: var(--ca-text-secondary);
  }

  .out strong {
    color: var(--ca-brand-text);
    font-family: var(--ca-font-mono);
  }
</style>
