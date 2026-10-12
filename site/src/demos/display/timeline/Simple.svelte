<script lang="ts">
  import { Timeline } from '@codeatlasdev/ui';

  const items = [
    { label: 'Project started', date: 'Jan 2025' },
    { label: 'Alpha released', date: 'Mar 2025' },
    { label: 'Public beta', date: 'Jun 2025' },
    { label: 'v1.0 stable', date: 'Sep 2025' },
  ];
</script>

<div class="wrap"><Timeline {items} /></div>

<style>
  .wrap { max-width: 440px; width: 100%; }
</style>
