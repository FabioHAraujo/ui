<script lang="ts">
  import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, IconButton } from '@codeatlasdev/ui';
  import { MoreHorizontal, Copy, Share2 } from '@lucide/svelte';
</script>

<DropdownMenu align="end">
  {#snippet triggerChild(props)}
    <IconButton aria-label="More options" {...props}><MoreHorizontal size={18} /></IconButton>
  {/snippet}
  <DropdownMenuLabel>Actions</DropdownMenuLabel>
  <DropdownMenuItem>
    {#snippet children()}<Share2 size={14} /> Share{/snippet}
  </DropdownMenuItem>
  <DropdownMenuItem>
    {#snippet children()}<Copy size={14} /> Copy link{/snippet}
  </DropdownMenuItem>
</DropdownMenu>
