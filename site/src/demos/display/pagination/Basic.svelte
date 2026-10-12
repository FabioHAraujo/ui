<script lang="ts">
  import { Pagination } from '@codeatlasdev/ui';

  let page = $state(1);
</script>

<div class="wrap">
  <Pagination count={100} perPage={10} bind:page />
  <p>Current page: {page}</p>
</div>

<style>
  .wrap { display: flex; flex-direction: column; gap: var(--ca-space-3); }
  p { margin: 0; font-size: var(--ca-font-size-body2); color: var(--ca-text-secondary); }
</style>
