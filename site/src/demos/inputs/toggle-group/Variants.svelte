<script lang="ts">
  import { ToggleGroup } from '@codeatlasdev/ui';

  let view = $state('list');
</script>

<ToggleGroup
  variant="outlined"
  size="md"
  aria-label="Outlined"
  bind:value={view}
  items={[
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
    { value: 'board', label: 'Board', disabled: true },
  ]}
/>
<ToggleGroup
  variant="ghost"
  size="sm"
  aria-label="Ghost"
  bind:value={view}
  items={[
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
  ]}
/>
<ToggleGroup
  orientation="vertical"
  aria-label="Vertical"
  bind:value={view}
  items={[
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
  ]}
/>
