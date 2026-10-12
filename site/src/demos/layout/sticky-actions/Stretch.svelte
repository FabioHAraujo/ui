<script lang="ts">
  import { StickyActions, Button } from '@codeatlasdev/ui';
</script>

<div class="scroller">
  <div class="filler">Long content…</div>
  <StickyActions align="stretch">
    <Button variant="ghost">Back</Button>
    <Button variant="filled">Continue</Button>
  </StickyActions>
</div>

<style>
  .scroller { width: 100%; max-height: 280px; overflow-y: auto; padding: 0 var(--ca-space-4); }
  .filler { height: 320px; color: var(--ca-text-secondary); }
</style>
