<script lang="ts">
  import { Chip } from '@codeatlasdev/ui';
  import { Tag, Star, Zap } from '@lucide/svelte';
</script>

<Chip label="Featured" icon={Star} />
<Chip label="Boosted" icon={Zap} />
<Chip label="Tagged" icon={Tag} />
