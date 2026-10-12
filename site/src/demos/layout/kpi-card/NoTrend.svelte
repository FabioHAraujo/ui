<script lang="ts">
  import { KpiCard } from '@codeatlasdev/ui';
  import { ShoppingCart } from '@lucide/svelte';
</script>

<div class="kpi-grid">
  <KpiCard title="Orders Today" value="124" icon={ShoppingCart} />
  <KpiCard title="Avg. Session" value="3m 42s" />
  <KpiCard title="Error Rate" value="0.03" unit="%" />
</div>

<style>
  .kpi-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: var(--ca-space-3); width: 100%; }
</style>
