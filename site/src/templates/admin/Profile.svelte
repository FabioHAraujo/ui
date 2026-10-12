<script lang="ts">
  import {
    AppForm, FormSection, TextField, Select, Switch, Button, Avatar, Divider,
  } from '@codeatlasdev/ui';

  let { user }: { user: { name: string; email: string; role: string } | null } = $props();

  let name     = $state('');
  let email    = $state('');
  let bio      = $state('Product designer & front-end engineer.');
  let timezone = $state('america-sao-paulo');
  let emailN   = $state(true);
  let pushN    = $state(false);
  let mfa      = $state(false);
  let saving   = $state(false);

  $effect(() => { if (user) { name = user.name; email = user.email; } });

  const tzOpts = [
    { value: 'america-sao-paulo', label: 'America/Sao_Paulo (UTC-3)' },
    { value: 'america-new-york',  label: 'America/New_York (UTC-4)'  },
    { value: 'europe-london',     label: 'Europe/London (UTC+1)'     },
    { value: 'asia-tokyo',        label: 'Asia/Tokyo (UTC+9)'        },
  ];

  function save() { saving = true; setTimeout(() => (saving = false), 1000); }
</script>

<AppForm title="Profile & Settings" description="Manage your personal information and preferences.">

  <FormSection title="Your profile" description="How you appear on the platform." layout="stack">
    <div class="ca-avatar-row">
      <Avatar alt={name || '?'} size="lg" />
      <div class="ca-avatar-meta">
        <Button variant="outlined" size="sm">Change avatar</Button>
        <p class="ca-avatar-hint">JPG, GIF or PNG. Max 2MB.</p>
      </div>
    </div>

    <FormSection layout="grid">
      <TextField label="Name"         bind:value={name}     />
      <TextField label="Email"        bind:value={email}    type="email" />
      <TextField label="Bio"          bind:value={bio}      />
      <Select    label="Time zone" bind:value={timezone} options={tzOpts} />
    </FormSection>
  </FormSection>

  <FormSection title="Notifications" description="Choose what you want to be notified about." layout="list">
    <Switch label="Email notifications" bind:checked={emailN} />
    <Divider />
    <Switch label="Push notifications"      bind:checked={pushN}  />
  </FormSection>

  <FormSection title="Security" description="Protect your account." layout="stack">
    <Switch label="Two-factor authentication" bind:checked={mfa} />
    <Button variant="outlined" size="sm">Change password</Button>
  </FormSection>

  {#snippet footer()}
    <Button variant="ghost">Discard</Button>
    <Button variant="filled" onclick={save} disabled={saving}>
      {saving ? 'Saving…' : 'Save changes'}
    </Button>
  {/snippet}
</AppForm>

