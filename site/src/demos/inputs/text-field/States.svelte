<script lang="ts">
  import { TextField } from '@codeatlasdev/ui';

  let wrong = $state('wrong@');
</script>

<div class="col">
  <TextField label="Username" placeholder="john_doe" description="3–20 characters, letters and underscores only." />
  <TextField label="Email" bind:value={wrong} error="Please enter a valid email address." />
  <TextField label="Company" required />
  <TextField label="Read-only field" value="Cannot edit this" readonly />
  <TextField label="Disabled field" value="Cannot edit this" disabled />
  <TextField label="Small" size="sm" placeholder="Compact height" />
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
