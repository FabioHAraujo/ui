<script lang="ts">
  import { Button } from '@codeatlasdev/ui';
  import { Trash2 } from '@lucide/svelte';
</script>

<Button variant="filled" disabled>Filled</Button>
<Button variant="outlined" disabled>Outlined</Button>
<Button variant="glass" disabled>Glass</Button>
<Button variant="destructive">
  {#snippet leading()}<Trash2 size={15} stroke-width={2} />{/snippet}
  Delete account
</Button>
<Button variant="outlined" href="https://github.com/codeatlasdev/ui" target="_blank">Link button</Button>
