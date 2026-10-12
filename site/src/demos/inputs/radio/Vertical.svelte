<script lang="ts">
  import { RadioGroup } from '@codeatlasdev/ui';

  let fruit = $state('apple');

  const fruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];
</script>

<RadioGroup items={fruits} bind:value={fruit} />
<p class="out">Selected: <code>{fruit}</code></p>

<style>
  .out {
    flex-basis: 100%;
    margin: 0;
    font-size: var(--ca-font-size-caption);
    color: var(--ca-text-secondary);
  }
</style>
