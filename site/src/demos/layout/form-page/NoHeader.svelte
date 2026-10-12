<script lang="ts">
  import { AppForm, FormSection, TextField, Button } from '@codeatlasdev/ui';
</script>

<div class="frame">
  <AppForm>
    <FormSection title="Quick update">
      <TextField label="Name" placeholder="Enter name…" />
      <TextField label="Email" type="email" placeholder="email@example.com" />
    </FormSection>
    {#snippet footer()}
      <Button variant="ghost">Cancel</Button>
      <Button variant="filled">Save</Button>
    {/snippet}
  </AppForm>
</div>

<style>
  .frame {
    width: 100%;
    height: 360px;
    border-radius: var(--ca-radius-lg);
    box-shadow: inset 0 0 0 1px var(--ca-outline-subtle);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
</style>
