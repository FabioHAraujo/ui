<script lang="ts">
  import { Divider, GlassCard, Row } from '@codeatlasdev/ui';
</script>

<GlassCard padding="24px" full>
  <Row gap={24} align="center">
    <p>Left</p>
    <Divider orientation="vertical" />
    <p>Center</p>
    <Divider orientation="vertical" />
    <p>Right</p>
  </Row>
</GlassCard>

<style>
  p { margin: 0; font-size: var(--ca-font-size-body1); color: var(--ca-text-secondary); }
</style>
