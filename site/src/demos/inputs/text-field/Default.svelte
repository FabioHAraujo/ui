<script lang="ts">
  import { TextField } from '@codeatlasdev/ui';

  let name = $state('');
  let email = $state('');
</script>

<div class="col">
  <TextField label="Full name" placeholder="Jane Smith" bind:value={name} />
  <TextField label="Email" placeholder="you@example.com" type="email" bind:value={email} />
</div>

<style>
  .col {
    display: flex;
    flex-direction: column;
    gap: var(--ca-space-4);
    width: 100%;
    max-width: 400px;
  }
</style>
