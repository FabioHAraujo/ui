<script lang="ts">
  import { untrack } from 'svelte';
  import ToggleGroup from './ToggleGroup.svelte';

  let {
    type = 'single',
    initial = undefined,
    ...rest
  }: { type?: 'single' | 'multiple'; initial?: string | string[]; [key: string]: unknown } = $props();
  let value = $state<string | string[] | undefined>(untrack(() => initial));
  const single = [
    { value: 'left', label: 'Esquerda' },
    { value: 'center', label: 'Centro' },
    { value: 'right', label: 'Direita', disabled: true },
  ];
  const multi = [
    { value: 'bold', label: 'Negrito' },
    { value: 'italic', label: 'Itálico' },
    { value: 'underline', label: 'Sublinhado' },
  ];
</script>

<ToggleGroup {type} bind:value items={type === 'multiple' ? multi : single} {...rest} />
<output data-testid="bound">{Array.isArray(value) ? value.join(',') : (value ?? '')}</output>
