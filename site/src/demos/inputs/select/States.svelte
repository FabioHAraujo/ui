<script lang="ts">
  import { Select } from '@codeatlasdev/ui';

  let size = $state('md');
  let plan = $state('free');

  const sizes = [
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
  ];

  const plans = [
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise', disabled: true },
  ];
</script>

<div class="col">
  <Select label="Plan" description="Enterprise is disabled." options={plans} bind:value={plan} />
  <Select label="Region" options={sizes} error="Pick a region to continue." />
  <Select label="Size" options={sizes} bind:value={size} disabled />
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
