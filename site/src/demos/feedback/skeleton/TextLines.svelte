<script lang="ts">
  import { Skeleton, GlassCard, Stack } from '@codeatlasdev/ui';
</script>

<GlassCard padding="20px" full>
  <Stack gap={12}>
    <Skeleton height="20px" width="60%" />
    <Skeleton rows={3} height="14px" />
  </Stack>
</GlassCard>
