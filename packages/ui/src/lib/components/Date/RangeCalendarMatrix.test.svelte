<script lang="ts">
	import { CalendarDate } from "@internationalized/date";
	import RangeCalendar from "./RangeCalendar.svelte";

	const placeholder = new CalendarDate(2026, 1, 1);
	const range = { start: new CalendarDate(2026, 1, 12), end: new CalendarDate(2026, 1, 18) };
	const crossMonth = { start: new CalendarDate(2026, 1, 28), end: new CalendarDate(2026, 2, 4) };
	const blocked = (d: { day: number }) => d.day === 10;
</script>

<div
	data-testid="matrix"
	style="display:grid;gap:16px;padding:16px;width:max-content;grid-template-columns:max-content;align-items:start"
>
	<RangeCalendar value={range} {placeholder} />
	<RangeCalendar {placeholder} />
	<RangeCalendar value={crossMonth} {placeholder} />
	<RangeCalendar value={range} {placeholder} numberOfMonths={1} isDateDisabled={blocked} />
	<RangeCalendar value={range} {placeholder} numberOfMonths={1} disabled />
</div>
