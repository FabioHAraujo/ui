<script lang="ts">
  import { Switch } from '@codeatlasdev/ui';

  let analytics = $state(false);
</script>

<Switch bind:checked={analytics} aria-label="Analytics" />
<Switch checked aria-label="Always on" />
