<script lang="ts">
  import { Spinner, GlassCard, Stack } from '@codeatlasdev/ui';
</script>

<GlassCard padding="40px" full>
  <Stack align="center" gap={12}>
    <Spinner size={40} />
    <span class="text">Loading data…</span>
  </Stack>
</GlassCard>

<style>
  .text { font-size: var(--ca-font-size-body2); color: var(--ca-text-secondary); }
</style>
