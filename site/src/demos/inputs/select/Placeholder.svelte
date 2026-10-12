<script lang="ts">
  import { Select } from '@codeatlasdev/ui';

  let country = $state('');

  const countries = [
    { value: 'br', label: 'Brazil' },
    { value: 'us', label: 'United States' },
    { value: 'de', label: 'Germany' },
    { value: 'jp', label: 'Japan' },
    { value: 'au', label: 'Australia' },
  ];
</script>

<div class="col">
  <Select label="Country" placeholder="Choose a country…" options={countries} bind:value={country} />
</div>

<style>
  .col {
    width: 100%;
    max-width: 320px;
  }
</style>
