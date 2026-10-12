<script lang="ts">
  import {
    CalendarDate,
    DateField,
    DatePicker,
    Time,
    TimeField,
    getLocalTimeZone,
    today,
    type DateValue,
  } from '@codeatlasdev/ui';

  const tz = getLocalTimeZone();
  const min = today(tz);
  const max = today(tz).add({ days: 30 });

  let bounded = $state<DateValue | undefined>();
  let required = $state<DateValue | undefined>();
  const requiredError = $derived(required ? undefined : 'Enter your date of birth.');
</script>

<div class="col">
  <DatePicker label="Schedule for" description="Only the next 30 days." locale="en-US" weekStartsOn={0} minValue={min} maxValue={max} bind:value={bounded} />
  <DatePicker label="Date of birth" locale="en-US" weekStartsOn={0} required error={requiredError} bind:value={required} />
  <DateField label="Disabled" locale="en-US" disabled value={new CalendarDate(2026, 1, 15)} />
  <TimeField label="Read-only" locale="en-US" readonly value={new Time(9, 0)} />
</div>

<style>
  .col {
    display: flex;
    flex-direction: column;
    gap: var(--ca-space-4);
    width: 100%;
    max-width: 400px;
  }
</style>
