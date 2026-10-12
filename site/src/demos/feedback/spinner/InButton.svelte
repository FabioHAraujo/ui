<script lang="ts">
  import { Button } from '@codeatlasdev/ui';

  let loading = $state(false);
  function simulate() {
    loading = true;
    setTimeout(() => (loading = false), 2000);
  }
</script>

<Button onclick={simulate} {loading}>{loading ? 'Saving…' : 'Save changes'}</Button>
