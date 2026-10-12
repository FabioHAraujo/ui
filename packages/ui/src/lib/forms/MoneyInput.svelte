<script lang="ts">
  import { untrack, type Snippet } from 'svelte';
  import TextField from '../components/TextField/TextField.svelte';
  import { centsToDisplay, parseInputToCents } from './money.js';

  interface Props {
    label?:         string;
    placeholder?:   string;
    /** Amount in integer cents (BRL). `123456` = R$ 1.234,56. */
    value?:         number;
    min?:           number;
    max?:           number;
    allowNegative?: boolean;
    error?:         string;
    description?:   string;
    disabled?:      boolean;
    required?:      boolean;
    readonly?:      boolean;
    size?:          'sm' | 'md';
    class?:         string;
    name?:          string;
    leading?:       Snippet;
    trailing?:      Snippet;
    onchange?:      (cents: number) => void;
    onblur?:        (e: FocusEvent) => void;
  }

  let {
    value = $bindable(0),
    min,
    max,
    allowNegative = false,
    placeholder = centsToDisplay(0),
    onchange,
    ...rest
  }: Props = $props();

  function clamp(cents: number): number {
    let v = allowNegative ? cents : Math.abs(cents);
    if (min !== undefined && v < min) v = min;
    if (max !== undefined && v > max) v = max;
    return v;
  }

  let text = $state(centsToDisplay(clamp(value)));

  // External value changes (reset, programmatic set) refresh the display; an out-of-bounds
  // value is clamped back into `value`. `text` is read untracked: bind:value overwrites it
  // with the raw DOM string before `onInput` has updated `value`, and reacting to that
  // transient mismatch would reset what was typed.
  $effect(() => {
    const v = clamp(value);
    if (v !== value) value = v;
    if (untrack(() => parseInputToCents(text)) !== v) text = centsToDisplay(v);
  });

  function onInput(raw: string) {
    // Type-to-fill: digits shift in from the right. A "-" anywhere toggles negative.
    const digits = raw.replace(/\D/g, '');
    const negative = allowNegative && raw.includes('-');
    const cents = clamp((negative ? -1 : 1) * Number(digits || 0));
    value = cents;
    text = digits === '' && !negative ? '' : centsToDisplay(cents);
    onchange?.(cents);
  }

  function onBlur(e: FocusEvent) {
    text = centsToDisplay(value);
    rest.onblur?.(e);
  }
</script>

<TextField
  {...rest}
  {placeholder}
  bind:value={text}
  oninput={onInput}
  onblur={onBlur}
/>
