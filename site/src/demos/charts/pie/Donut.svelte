<script lang="ts">
  import { GlassCard } from '@codeatlasdev/ui';
  import { PieChart } from '@codeatlasdev/ui/charts';

  const marketData = [
    { value: 38, name: 'Cloud Services' },
    { value: 24, name: 'Enterprise SW' },
    { value: 18, name: 'SaaS Tools' },
    { value: 12, name: 'Infrastructure' },
    { value: 8, name: 'Other' },
  ];
</script>

<GlassCard full><PieChart data={marketData} donut height="300px" /></GlassCard>
