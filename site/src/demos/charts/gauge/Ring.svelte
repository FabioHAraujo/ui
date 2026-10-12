<script lang="ts">
  import { GlassCard, Stack, Slider } from '@codeatlasdev/ui';
  import { GaugeChart } from '@codeatlasdev/ui/charts';

  let value = $state(65);
</script>

<GlassCard full>
  <Stack gap={20}>
    <GaugeChart {value} variant="ring" height="260px" />
    <div class="slider"><Slider bind:value min={0} max={100} step={1} /></div>
  </Stack>
</GlassCard>

<style>
  .slider { padding: 0 var(--ca-space-3); }
</style>
