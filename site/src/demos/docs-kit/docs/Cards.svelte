<script lang="ts">
  import { CardGrid, LinkCard, MethodBadge } from '@codeatlasdev/ui';
</script>

<div class="wrap">
  <CardGrid>
    <LinkCard title="Quick start" description="From install to your first request in two minutes." href="#top" />
    <LinkCard title="Webhooks" description="Real-time events with retries and signatures." href="#top" />
  </CardGrid>
  <div class="methods">
    <MethodBadge method="GET" />
    <MethodBadge method="POST" />
    <MethodBadge method="PUT" />
    <MethodBadge method="PATCH" />
    <MethodBadge method="DELETE" />
  </div>
</div>

<style>
  .wrap { width: 100%; display: grid; gap: 16px; }
  .methods { display: flex; flex-wrap: wrap; gap: 12px; }
</style>
