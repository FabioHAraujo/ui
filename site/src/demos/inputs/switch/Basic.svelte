<script lang="ts">
  import { Switch } from '@codeatlasdev/ui';

  let notifications = $state(true);
  let darkMode = $state(false);
</script>

<Switch label="Off by default" bind:checked={darkMode} />
<Switch label="On by default" bind:checked={notifications} />
