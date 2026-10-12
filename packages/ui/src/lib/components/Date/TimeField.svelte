<script lang="ts">
  import { TimeField } from 'bits-ui';
  import type { Time } from '@internationalized/date';
  import { uid } from '../../utils/index.js';
  import type { TimeValue } from './types.js';
  import './date.css';

  interface Props {
    label?:        string;
    description?:  string;
    error?:        string;
    disabled?:     boolean;
    required?:     boolean;
    readonly?:     boolean;
    /** Selected time. Bindable. Use `new Time(h, m)` from `@internationalized/date`. */
    value?:        Time;
    /** Starting point of an empty field. Bindable. */
    placeholder?:  TimeValue;
    minValue?:     TimeValue;
    maxValue?:     TimeValue;
    locale?:       string;
    /** Default 'minute'. */
    granularity?:  'hour' | 'minute' | 'second';
    /** Default follows the locale (pt-BR → 24h). */
    hourCycle?:    12 | 24;
    size?:         'sm' | 'md';
    /** Name for the hidden input (ISO string) in native forms. */
    name?:         string;
    onchange?:     (value: Time | undefined) => void;
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
    granularity = 'minute',
    hourCycle,
    size        = 'md',
    name,
    onchange,
    class: className = '',
  }: Props = $props();

  const id = uid('tmf');
  const describedBy = $derived(error ? `${id}-err` : description ? `${id}-hint` : undefined);
</script>

<TimeField.Root
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
      <TimeField.Label class="ca-date__label">
        {label}{#if required}<span class="ca-date__req" aria-hidden="true"> *</span>{/if}
      </TimeField.Label>
    {/if}

    <TimeField.Input
      {name}
      class="ca-date__wrap"
      aria-describedby={describedBy}
    >
      {#snippet children({ segments })}
        <span class="ca-date__input">
          {#each segments as { part, value: segValue }, i (i)}
            <TimeField.Segment {part} class="ca-date__segment">{segValue}</TimeField.Segment>
          {/each}
        </span>
      {/snippet}
    </TimeField.Input>

    {#if error}
      <p id="{id}-err" class="ca-date__hint ca-date__hint--error" role="alert">{error}</p>
    {:else if description}
      <p id="{id}-hint" class="ca-date__hint">{description}</p>
    {/if}
  </div>
</TimeField.Root>
