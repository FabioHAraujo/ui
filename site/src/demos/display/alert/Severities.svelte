<script lang="ts">
  import { Alert } from '@codeatlasdev/ui';
</script>

<div class="col">
  <Alert severity="success">Your changes have been saved successfully.</Alert>
  <Alert severity="warning">Your trial expires in 3 days. Upgrade to keep access.</Alert>
  <Alert severity="error">Failed to connect. Check your network and try again.</Alert>
  <Alert severity="info">A new version of CodeAtlas UI is available.</Alert>
</div>

<style>
  .col { display: flex; flex-direction: column; gap: var(--ca-space-3); width: 100%; max-width: 560px; }
</style>
