<script lang="ts">
  import { Divider, GlassCard, Stack } from '@codeatlasdev/ui';
</script>

<GlassCard padding="24px" full>
  <Stack gap={16}>
    <p>Section A content</p>
    <Divider />
    <p>Section B content</p>
    <Divider />
    <p>Section C content</p>
  </Stack>
</GlassCard>

<style>
  p { margin: 0; font-size: var(--ca-font-size-body1); color: var(--ca-text-secondary); }
</style>
