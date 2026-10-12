<script lang="ts">
  import { Alert } from '@codeatlasdev/ui';
</script>

<div class="col">
  <Alert severity="success" title="Changes saved">
    All your edits have been persisted to the database.
  </Alert>
  <Alert severity="error" title="Authentication failed">
    The provided credentials are incorrect. Try again or reset your password.
  </Alert>
</div>

<style>
  .col { display: flex; flex-direction: column; gap: var(--ca-space-3); width: 100%; max-width: 560px; }
</style>
