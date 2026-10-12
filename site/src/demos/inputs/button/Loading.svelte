<script lang="ts">
  import { Button } from '@codeatlasdev/ui';

  let saving = $state(false);

  function save() {
    saving = true;
    setTimeout(() => (saving = false), 2000);
  }
</script>

<Button variant="filled" loading>Saving</Button>
<Button variant="outlined" loading>Outlined</Button>
<Button variant="filled" loading={saving} onclick={save}>
  {saving ? 'Saving…' : 'Save (2s)'}
</Button>
