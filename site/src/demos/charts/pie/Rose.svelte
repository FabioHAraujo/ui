<script lang="ts">
  import { GlassCard } from '@codeatlasdev/ui';
  import { PieChart } from '@codeatlasdev/ui/charts';

  const roseData = [
    { value: 72, name: 'Analytics' },
    { value: 58, name: 'Automation' },
    { value: 45, name: 'Security' },
    { value: 38, name: 'Integrations' },
    { value: 30, name: 'Storage' },
    { value: 22, name: 'Support' },
  ];
</script>

<GlassCard full><PieChart data={roseData} rose height="340px" /></GlassCard>
