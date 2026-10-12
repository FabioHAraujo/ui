<script lang="ts">
  import { Button } from '@codeatlasdev/ui';
  import { focusTrap } from '@codeatlasdev/ui/actions';

  let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open trap</Button>
{#if open}
  <div use:focusTrap={open} class="trap">
    <span>Tab stays inside this box:</span>
    <Button variant="outlined">Button A</Button>
    <Button variant="outlined">Button B</Button>
    <Button variant="outlined" onclick={() => (open = false)}>Close</Button>
  </div>
{/if}

<style>
  .trap {
    flex-basis: 100%;
    padding: 20px;
    border-radius: var(--ca-radius-md);
    box-shadow: inset 0 0 0 1px var(--ca-brand-main);
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    font-size: var(--ca-font-size-body2);
  }
</style>
