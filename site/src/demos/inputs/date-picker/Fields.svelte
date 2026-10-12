<script lang="ts">
  import { CalendarDate, DateField, Time, TimeField, type DateValue } from '@codeatlasdev/ui';

  let birthday = $state<DateValue | undefined>(new CalendarDate(2026, 10, 10));
  let time = $state<Time | undefined>(new Time(14, 30));
</script>

<div class="col">
  <DateField label="Birthday" locale="en-US" bind:value={birthday} />
  <DateField label="Starts at" locale="en-US" granularity="minute" />
  <p class="out">value: <code>{birthday ? birthday.toString() : '–'}</code></p>
  <TimeField label="Time (24h)" locale="en-US" hourCycle={24} bind:value={time} />
  <TimeField label="Time (12h)" locale="en-US" hourCycle={12} />
  <p class="out">value: <code>{time ? time.toString() : '–'}</code></p>
</div>

<style>
  .col {
    display: flex;
    flex-direction: column;
    gap: var(--ca-space-4);
    width: 100%;
    max-width: 400px;
  }

  .out {
    margin: 0;
    font-size: var(--ca-font-size-caption);
    color: var(--ca-text-secondary);
  }
</style>
