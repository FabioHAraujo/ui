import type { CalendarDateTime, DateValue, Time, ZonedDateTime } from "@internationalized/date";

/** Value of RangeCalendar / DateRangePicker. Both ends are undefined until picked. */
export interface DateRange {
	start: DateValue | undefined;
	end: DateValue | undefined;
}

/** Accepted by TimeField `placeholder` / `minValue` / `maxValue`. */
export type TimeValue = Time | CalendarDateTime | ZonedDateTime;
