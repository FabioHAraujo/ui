<script lang="ts">
  import { FileUpload } from '@codeatlasdev/ui';
</script>

<div class="wrap">
  <FileUpload accept="image/*" label="Drop images here" hint="PNG, JPG, GIF, WebP" />
  <FileUpload disabled label="Upload unavailable" />
</div>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
    gap: var(--ca-space-4);
    width: 100%;
    max-width: 480px;
  }
</style>
