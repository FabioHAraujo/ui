<script lang="ts" module>
  export type AppPage =
    | 'dashboard' | 'users' | 'users-new' | 'products' | 'reports' | 'activity' | 'settings' | 'billing' | 'profile';
</script>

<script lang="ts">
  // App template island: same shell as the admin template, no auth, English demo data.
  import TemplateShell from '../_shared/TemplateShell.svelte';
  import Activity from './Activity.svelte';
  import Billing from './Billing.svelte';
  import Dashboard from './Dashboard.svelte';
  import NewUser from './NewUser.svelte';
  import Products from './Products.svelte';
  import Profile from './Profile.svelte';
  import Reports from './Reports.svelte';
  import Settings from './Settings.svelte';
  import Users from './Users.svelte';

  interface Props {
    page: AppPage;
    pathname: string;
  }
  let { page, pathname }: Props = $props();

  const user = { name: 'Ana Lima', role: 'Admin' };
</script>

<TemplateShell base="/templates/app" {pathname} {user} products>
  {#if page === 'dashboard'}<Dashboard />
  {:else if page === 'users'}<Users />
  {:else if page === 'users-new'}<NewUser />
  {:else if page === 'products'}<Products />
  {:else if page === 'reports'}<Reports />
  {:else if page === 'activity'}<Activity />
  {:else if page === 'settings'}<Settings />
  {:else if page === 'billing'}<Billing />
  {:else if page === 'profile'}<Profile />
  {/if}
</TemplateShell>
