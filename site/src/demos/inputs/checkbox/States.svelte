<script lang="ts">
  import { Checkbox } from '@codeatlasdev/ui';

  let basic = $state(false);
  let checked = $state(true);
</script>

<Checkbox bind:checked={basic} label="Unchecked (click me)" />
<Checkbox bind:checked label="Pre-checked" />
<Checkbox indeterminate label="Indeterminate" />
