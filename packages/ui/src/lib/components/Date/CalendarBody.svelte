<script lang="ts">
  import { t } from '../../i18n/state.svelte.js';
  /**
   * Internal: header + month grids shared by Calendar, RangeCalendar, DatePicker and
   * DateRangePicker. Must render inside a bits-ui Calendar / RangeCalendar root
   * (the Calendar parts read the root context). Not exported from the package.
   */
  import { Calendar, RangeCalendar } from 'bits-ui';
  import { ChevronLeft, ChevronRight } from '@lucide/svelte';
  import type { DateValue } from '@internationalized/date';

  interface Month {
    value: DateValue;
    weeks: DateValue[][];
  }

  interface Props {
    months: Month[];
    weekdays: string[];
    range?: boolean;
    prevLabel?: string;
    nextLabel?: string;
  }

  let {
    months,
    weekdays,
    range = false,
    prevLabel,
    nextLabel,
  }: Props = $props();

  // Calendar and RangeCalendar share Grid/Header parts; only Cell/Day differ.
  const Cell = $derived(range ? RangeCalendar.Cell : Calendar.Cell);
  const Day  = $derived(range ? RangeCalendar.Day : Calendar.Day);
</script>

<Calendar.Header class="ca-cal__header">
  {#snippet child({ props })}
    <!-- bits-ui renders a <header>, which axe reads as a banner landmark nested in the calendar. -->
    <div {...props}>
      <Calendar.PrevButton class="ca-cal__nav">
        {#snippet child({ props })}
          <!-- bits-ui merges its English aria-label over ours; override it after the merge. -->
          <button {...props} aria-label={prevLabel ?? t().calendar.previousMonth}>
            <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        {/snippet}
      </Calendar.PrevButton>
      <Calendar.Heading class="ca-cal__heading" />
      <Calendar.NextButton class="ca-cal__nav">
        {#snippet child({ props })}
          <button {...props} aria-label={nextLabel ?? t().calendar.nextMonth}>
            <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        {/snippet}
      </Calendar.NextButton>
    </div>
  {/snippet}
</Calendar.Header>

<div class="ca-cal__months">
  {#each months as month (month.value.toString())}
    <Calendar.Grid class="ca-cal__grid">
      <Calendar.GridHead>
        <Calendar.GridRow>
          {#each weekdays as day (day)}
            <Calendar.HeadCell class="ca-cal__head-cell">{day}</Calendar.HeadCell>
          {/each}
        </Calendar.GridRow>
      </Calendar.GridHead>
      <Calendar.GridBody>
        {#each month.weeks as week, i (i)}
          <Calendar.GridRow>
            {#each week as date (date.toString())}
              <Cell {date} month={month.value} class="ca-cal__cell">
                <Day class="ca-cal__day" />
              </Cell>
            {/each}
          </Calendar.GridRow>
        {/each}
      </Calendar.GridBody>
    </Calendar.Grid>
  {/each}
</div>
