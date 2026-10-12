<script lang="ts">
  import { t } from '../../i18n/state.svelte.js';
  import { RangeCalendar } from 'bits-ui';
  import type { DateValue } from '@internationalized/date';
  import CalendarBody from './CalendarBody.svelte';
  import type { DateRange } from './types.js';
  import './date.css';

  interface Props {
    /** Selected range. Bindable. `start`/`end` are undefined until chosen. */
    value?:         DateRange;
    placeholder?:   DateValue;
    minValue?:      DateValue;
    maxValue?:      DateValue;
    disabled?:      boolean;
    readonly?:      boolean;
    locale?:        string;
    /** 0 = Sunday … 6 = Saturday. Default 1 (Monday). */
    weekStartsOn?:  0 | 1 | 2 | 3 | 4 | 5 | 6;
    numberOfMonths?: number;
    fixedWeeks?:    boolean;
    isDateDisabled?:    (date: DateValue) => boolean;
    isDateUnavailable?: (date: DateValue) => boolean;
    /** Screen-reader label; the visible month/year is appended automatically. */
    label?:         string;
    onchange?:      (value: DateRange) => void;
    class?:         string;
  }

  let {
    value        = $bindable({ start: undefined, end: undefined }),
    placeholder  = $bindable(),
    minValue,
    maxValue,
    disabled     = false,
    readonly     = false,
    locale       = 'pt-BR',
    weekStartsOn = 1,
    numberOfMonths = 2,
    fixedWeeks   = false,
    isDateDisabled,
    isDateUnavailable,
    label,
    onchange,
    class: className = '',
  }: Props = $props();
</script>

<RangeCalendar.Root
  bind:value
  bind:placeholder
  {minValue}
  {maxValue}
  {disabled}
  {readonly}
  {locale}
  {weekStartsOn}
  {numberOfMonths}
  {fixedWeeks}
  {isDateDisabled}
  {isDateUnavailable}
  calendarLabel={label ?? t().calendar.rangeLabel}
  weekdayFormat="short"
  onValueChange={(v) => onchange?.(v)}
  class="ca-cal ca-cal--standalone {className}"
>
  {#snippet children({ months, weekdays })}
    <CalendarBody {months} {weekdays} range />
  {/snippet}
</RangeCalendar.Root>
