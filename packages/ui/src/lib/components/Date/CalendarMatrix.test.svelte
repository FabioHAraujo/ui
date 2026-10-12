<script lang="ts">
	import { CalendarDate } from "@internationalized/date";
	import Calendar from "./Calendar.svelte";

	const selected = new CalendarDate(2026, 1, 15);
	const placeholder = new CalendarDate(2026, 1, 1);
	const blocked = (d: { day: number }) => d.day === 10 || d.day === 11;
	const unavailable = (d: { day: number }) => d.day === 20;
</script>

<div
	data-testid="matrix"
	style="display:grid;gap:16px;padding:16px;width:max-content;grid-template-columns:repeat(2,max-content);align-items:start"
>
	<Calendar value={selected} {placeholder} />
	<Calendar {placeholder} />
	<Calendar
		value={selected}
		{placeholder}
		minValue={new CalendarDate(2026, 1, 8)}
		maxValue={new CalendarDate(2026, 1, 25)}
	/>
	<Calendar value={selected} {placeholder} isDateDisabled={blocked} isDateUnavailable={unavailable} />
	<Calendar value={selected} {placeholder} weekStartsOn={0} locale="en-US" fixedWeeks />
	<Calendar value={selected} {placeholder} disabled />
	<Calendar value={selected} {placeholder} readonly />
</div>
