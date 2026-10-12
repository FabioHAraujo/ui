<script lang="ts">
  import { Button } from '@codeatlasdev/ui';
  import { ArrowRight, Download, Star } from '@lucide/svelte';
</script>

<Button variant="filled">
  {#snippet leading()}<Star size={15} />{/snippet}
  Starred
</Button>
<Button variant="outlined">
  Continue
  {#snippet trailing()}<ArrowRight size={15} />{/snippet}
</Button>
<Button variant="ghost">
  {#snippet leading()}<Download size={15} />{/snippet}
  Download
</Button>
