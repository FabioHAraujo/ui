<script lang="ts">
  import { DateField } from 'bits-ui';
  import type { DateValue } from '@internationalized/date';
  import { uid } from '../../utils/index.js';
  import './date.css';

  interface Props {
    label?:        string;
    description?:  string;
    error?:        string;
    disabled?:     boolean;
    required?:     boolean;
    readonly?:     boolean;
    /** Selected date. Bindable. */
    value?:        DateValue;
    /** Starting point of an empty field (decides the segment format). Bindable. */
    placeholder?:  DateValue;
    minValue?:     DateValue;
    maxValue?:     DateValue;
    locale?:       string;
    /** Adds hour/minute(/second) segments. Default 'day'. */
    granularity?:  'day' | 'hour' | 'minute' | 'second';
    hourCycle?:    12 | 24;
    size?:         'sm' | 'md';
    /** Name for the hidden input (ISO string) in native forms. */
    name?:         string;
    onchange?:     (value: DateValue | undefined) => void;
    class?:        string;
  }

  let {
    label,
    description,
    error,
    disabled    = false,
    required    = false,
    readonly    = false,
    value       = $bindable(),
    placeholder = $bindable(),
    minValue,
    maxValue,
    locale      = 'pt-BR',
    granularity = 'day',
    hourCycle,
    size        = 'md',
    name,
    onchange,
    class: className = '',
  }: Props = $props();

  const id = uid('df');
  const describedBy = $derived(error ? `${id}-err` : description ? `${id}-hint` : undefined);
</script>

<DateField.Root
  bind:value
  bind:placeholder
  {disabled}
  {required}
  {readonly}
  {minValue}
  {maxValue}
  {locale}
  {granularity}
  {hourCycle}
  errorMessageId={error ? `${id}-err` : undefined}
  onValueChange={(v) => onchange?.(v)}
>
  <div class="ca-date {className}" class:ca-date--sm={size === 'sm'} class:ca-date--error={!!error} class:ca-date--disabled={disabled}>
    {#if label}
      <DateField.Label class="ca-date__label">
        {label}{#if required}<span class="ca-date__req" aria-hidden="true"> *</span>{/if}
      </DateField.Label>
    {/if}

    <DateField.Input
      {name}
      class="ca-date__wrap"
      aria-describedby={describedBy}
    >
      {#snippet children({ segments })}
        <span class="ca-date__input">
          {#each segments as { part, value: segValue }, i (i)}
            <DateField.Segment {part} class="ca-date__segment">{segValue}</DateField.Segment>
          {/each}
        </span>
      {/snippet}
    </DateField.Input>

    {#if error}
      <p id="{id}-err" class="ca-date__hint ca-date__hint--error" role="alert">{error}</p>
    {:else if description}
      <p id="{id}-hint" class="ca-date__hint">{description}</p>
    {/if}
  </div>
</DateField.Root>
