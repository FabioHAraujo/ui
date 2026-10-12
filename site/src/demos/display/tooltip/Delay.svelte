<script lang="ts">
  import { Tooltip, Button } from '@codeatlasdev/ui';
</script>

<Tooltip content="No delay (delay=0)" delay={0}>
  {#snippet triggerChild(props)}<Button variant="glass" {...props}>Instant</Button>{/snippet}
</Tooltip>
<Tooltip content="Default delay (500ms)">
  {#snippet triggerChild(props)}<Button variant="glass" {...props}>Default</Button>{/snippet}
</Tooltip>
<Tooltip content="Long delay (1000ms)" delay={1000}>
  {#snippet triggerChild(props)}<Button variant="glass" {...props}>Slow</Button>{/snippet}
</Tooltip>
