<script lang="ts">
  import { Skeleton, GlassCard, Stack, Row } from '@codeatlasdev/ui';
</script>

<GlassCard padding="20px" full>
  <Row gap={16} align="start">
    <Skeleton variant="circular" width="48px" height="48px" />
    <Stack gap={8}>
      <Skeleton height="16px" width="40%" />
      <Skeleton height="13px" width="70%" />
      <Skeleton height="13px" width="55%" />
    </Stack>
  </Row>
</GlassCard>
