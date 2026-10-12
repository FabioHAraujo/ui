<script lang="ts">
  import { GlassCard, Row, Chip } from '@codeatlasdev/ui';
  import { PieChart } from '@codeatlasdev/ui/charts';

  type Quarter = 'Q1' | 'Q2' | 'Q3';
  const quarters: Quarter[] = ['Q1', 'Q2', 'Q3'];
  const qData: Record<Quarter, { value: number; name: string }[]> = {
    Q1: [{ value: 42, name: 'Cloud' }, { value: 28, name: 'Enterprise' }, { value: 18, name: 'SaaS' }, { value: 12, name: 'Other' }],
    Q2: [{ value: 35, name: 'Cloud' }, { value: 31, name: 'Enterprise' }, { value: 22, name: 'SaaS' }, { value: 12, name: 'Other' }],
    Q3: [{ value: 38, name: 'Cloud' }, { value: 26, name: 'Enterprise' }, { value: 24, name: 'SaaS' }, { value: 12, name: 'Other' }],
  };

  let selected = $state<Quarter>('Q1');
  const data = $derived(qData[selected]);
</script>

<div class="wrap">
  <Row gap={8}>
    {#each quarters as q}
      <Chip label={q} selected={selected === q} onclick={() => (selected = q)} variant="brand" size="sm" />
    {/each}
  </Row>
  <GlassCard full><PieChart {data} donut height="300px" /></GlassCard>
</div>

<style>
  .wrap { width: 100%; display: flex; flex-direction: column; gap: var(--ca-space-3); }
</style>
