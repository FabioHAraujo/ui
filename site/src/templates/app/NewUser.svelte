<script lang="ts">
  import { AppForm, FormSection, TextField, Select, Switch, Button } from '@codeatlasdev/ui';
  
  let name   = $state('');
  let email  = $state('');
  let role   = $state('viewer');
  let plan   = $state('free');
  let notify = $state(true);
  let saving = $state(false);

  const roleOpts = [{ value:'admin',label:'Admin' },{ value:'editor',label:'Editor' },{ value:'viewer',label:'Viewer' }];
  const planOpts = [{ value:'free',label:'Free' },{ value:'pro',label:'Pro' },{ value:'team',label:'Team' }];

  function save() { saving = true; setTimeout(() => location.assign('/templates/app/users/'), 1200); }
</script>

<AppForm title="New User" description="Fill in the details to create a new user." backHref="/templates/app/users/">
  <FormSection title="Account details" description="Basic information for the new user.">
    <TextField label="Full name"  bind:value={name}  placeholder="Ada Lovelace" />
    <TextField label="Work email" bind:value={email} placeholder="ada@company.com" type="email" />
    <Select    label="Role"       bind:value={role}  options={roleOpts} />
    <Select    label="Plan"       bind:value={plan}  options={planOpts} />
  </FormSection>

  <FormSection title="Notifications" description="Email alerts for this user." layout="list">
    <Switch label="Send welcome email" bind:checked={notify} />
  </FormSection>

  {#snippet footer()}
    <Button variant="ghost" href="/templates/app/users/">Cancel</Button>
    <Button variant="filled" onclick={save} disabled={saving || !name || !email}>
      {saving ? 'Creating…' : 'Create user'}
    </Button>
  {/snippet}
</AppForm>
