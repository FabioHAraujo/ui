<script lang="ts">
  import { KpiCard } from '@codeatlasdev/ui';
  import { Users, DollarSign, TrendingUp } from '@lucide/svelte';
</script>

<div class="kpi-grid">
  <KpiCard title="Monthly Revenue" value="$48,200" trend={12.4} icon={DollarSign} />
  <KpiCard title="Active Users" value="3,847" trend={-2.1} icon={Users} />
  <KpiCard title="Conversion" value="4.8" unit="%" trend={0.6} icon={TrendingUp} />
</div>

<style>
  .kpi-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: var(--ca-space-3); width: 100%; }
</style>
