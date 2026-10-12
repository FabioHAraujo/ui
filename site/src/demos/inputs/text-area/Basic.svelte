<script lang="ts">
  import { TextArea } from '@codeatlasdev/ui';

  let message = $state('');
  let notes = $state('');
  let description = $state('Some initial content here.');
</script>

<div class="col">
  <TextArea label="Message" bind:value={message} />
  <TextArea label="Notes" placeholder="Write something…" bind:value={notes} />
  <TextArea label="Description" bind:value={description} />
</div>

<style>
  .col {
    display: flex;
    flex-direction: column;
    gap: var(--ca-space-4);
    width: 100%;
    max-width: 480px;
  }
</style>
