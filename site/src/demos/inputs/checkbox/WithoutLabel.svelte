<script lang="ts">
  import { Checkbox } from '@codeatlasdev/ui';

  let value = $state(false);
</script>

<Checkbox bind:checked={value} aria-label="Unlabelled checkbox" />
<Checkbox checked aria-label="Unlabelled checked checkbox" />
<Checkbox indeterminate aria-label="Unlabelled indeterminate checkbox" />
