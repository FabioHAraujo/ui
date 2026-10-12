<script lang="ts">
  import { Tooltip } from '@codeatlasdev/ui';
</script>

<p>
  Static text can be a trigger too:
  <Tooltip content="Wrapped in the tooltip's own button">hover or focus this text</Tooltip>
</p>

<style>
  p { margin: 0; font-size: var(--ca-font-size-body2); color: var(--ca-text-secondary); }
</style>
