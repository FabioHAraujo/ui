<script lang="ts">
  import { Chip } from '@codeatlasdev/ui';

  let a = $state(false);
  let b = $state(true);
</script>

<Chip label="Filter A" selected={a} onclick={() => (a = !a)} />
<Chip label="Filter B" selected={b} onclick={() => (b = !b)} />
