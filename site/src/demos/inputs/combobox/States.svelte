<script lang="ts">
  import { Combobox } from '@codeatlasdev/ui';

  const frameworks = [
    { value: 'svelte', label: 'Svelte' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'astro', label: 'Astro', disabled: true },
  ];

  let value = $state('');
</script>

<div class="col">
  <Combobox
    label="Framework"
    options={frameworks}
    bind:value
    description="Astro is disabled."
    searchPlaceholder="Filter frameworks…"
    emptyText="No framework matches."
  />
  <Combobox label="Framework" options={frameworks} error="Pick a framework." required />
  <Combobox label="Framework" options={frameworks} disabled placeholder="Unavailable" />
</div>

<style>
  .col {
    display: flex;
    flex-direction: column;
    gap: var(--ca-space-4);
    width: 100%;
    max-width: 320px;
  }
</style>
