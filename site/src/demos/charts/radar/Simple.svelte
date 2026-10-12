<script lang="ts">
  import { GlassCard } from '@codeatlasdev/ui';
  import { RadarChart } from '@codeatlasdev/ui/charts';

  const indicators = ['Speed', 'Quality', 'Reliability', 'Innovation', 'Support', 'Coverage'].map((name) => ({ name, max: 100 }));
</script>

<GlassCard full>
  <RadarChart {indicators} series={[{ name: 'Team Alpha', values: [88, 92, 76, 85, 94, 79] }]} height="340px" />
</GlassCard>
