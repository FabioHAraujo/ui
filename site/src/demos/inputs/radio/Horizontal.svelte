<script lang="ts">
  import { RadioGroup } from '@codeatlasdev/ui';

  let size = $state('md');

  const sizes = [
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
  ];
</script>

<RadioGroup items={sizes} bind:value={size} orientation="horizontal" />
