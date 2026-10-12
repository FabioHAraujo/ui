<script lang="ts">
  import { Tooltip, IconButton } from '@codeatlasdev/ui';
  import { Info, Star, Heart, Zap } from '@lucide/svelte';
</script>

<Tooltip content="Info">
  {#snippet triggerChild(props)}<IconButton aria-label="Info" {...props}><Info size={20} /></IconButton>{/snippet}
</Tooltip>
<Tooltip content="Add to favourites">
  {#snippet triggerChild(props)}<IconButton aria-label="Favourite" {...props}><Heart size={20} /></IconButton>{/snippet}
</Tooltip>
<Tooltip content="Boost performance">
  {#snippet triggerChild(props)}<IconButton aria-label="Boost" {...props}><Zap size={20} /></IconButton>{/snippet}
</Tooltip>
<Tooltip content="Rate this component">
  {#snippet triggerChild(props)}<IconButton aria-label="Rate" {...props}><Star size={20} /></IconButton>{/snippet}
</Tooltip>
