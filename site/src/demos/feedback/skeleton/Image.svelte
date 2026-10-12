<script lang="ts">
  import { Skeleton, GlassCard, Stack } from '@codeatlasdev/ui';
</script>

<GlassCard flush full>
  <Skeleton variant="rectangular" height="180px" />
  <div class="caption">
    <Stack gap={8}>
      <Skeleton height="16px" width="50%" />
      <Skeleton height="13px" width="80%" />
    </Stack>
  </div>
</GlassCard>

<style>
  .caption { padding: 16px; }
</style>
