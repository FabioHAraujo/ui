<script lang="ts">
  import { Breadcrumb } from '@codeatlasdev/ui';
</script>

<div class="stack">
  <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Components' }]} />
  <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Navigation', href: '/docs/navigation/' }, { label: 'Breadcrumb' }]} />
  <Breadcrumb
    items={[
      { label: 'Home', href: '/' },
      { label: 'Settings', href: '/settings' },
      { label: 'Account', href: '/settings/account' },
      { label: 'Security', href: '/settings/account/security' },
      { label: 'Two-Factor Auth' },
    ]}
  />
  <Breadcrumb items={[{ label: 'Home' }]} />
</div>

<style>
  .stack { display: grid; gap: 18px; }
</style>
