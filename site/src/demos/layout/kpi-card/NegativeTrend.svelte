<script lang="ts">
  import { KpiCard } from '@codeatlasdev/ui';
  import { Activity } from '@lucide/svelte';
</script>

<div class="kpi-grid">
  <KpiCard title="Churn Rate" value="5.2" unit="%" trend={-1.8} icon={Activity} />
  <KpiCard title="Response Time" value="1.4" unit="s" trend={-12.3} />
</div>

<style>
  .kpi-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: var(--ca-space-3); width: 100%; }
</style>
