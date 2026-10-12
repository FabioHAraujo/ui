<script lang="ts">
  import { GlassCard, Grid } from '@codeatlasdev/ui';
  import { GaugeChart, type GaugeZone } from '@codeatlasdev/ui/charts';

  // `until` is a fraction of min..max; `color` is a semantic name or any CSS color.
  const zones: GaugeZone[] = [
    { until: 0.5, color: 'success' },
    { until: 0.8, color: 'warning' },
    { until: 1, color: 'error' },
  ];
  const metrics = [
    { label: 'CPU', value: 67 },
    { label: 'Memory', value: 82 },
    { label: 'Disk', value: 45 },
  ];
</script>

<Grid cols="repeat(auto-fit,minmax(200px,1fr))" gap={16}>
  {#each metrics as m}
    <GlassCard>
      <p class="label">{m.label}</p>
      <GaugeChart value={m.value} {zones} height="200px" />
    </GlassCard>
  {/each}
</Grid>

<style>
  .label {
    text-align: center;
    font-size: var(--ca-font-size-caption);
    color: var(--ca-text-secondary);
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin: 0 0 var(--ca-space-1);
  }
</style>
