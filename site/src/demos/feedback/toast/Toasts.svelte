<script lang="ts">
  import { Button, Toaster, toast } from '@codeatlasdev/ui';
</script>

<Toaster />

<div class="group">
  <p class="label">Variants</p>
  <div class="row">
    <Button variant="outlined" onclick={() => toast.show('This is a default notification.')}>Default</Button>
    <Button variant="outlined" onclick={() => toast.success('Changes saved successfully.')}>Success</Button>
    <Button variant="outlined" onclick={() => toast.error('Something went wrong. Please try again.')}>Error</Button>
    <Button variant="outlined" onclick={() => toast.warning('Your session expires in 5 minutes.')}>Warning</Button>
    <Button variant="outlined" onclick={() => toast.info('A new version is available.')}>Info</Button>
  </div>
</div>

<div class="group">
  <p class="label">Duration</p>
  <div class="row">
    <Button variant="outlined" onclick={() => toast.show('This will not auto-dismiss.', { variant: 'info', duration: 0 })}>
      Persistent (duration 0)
    </Button>
    <Button variant="outlined" onclick={() => toast.success('Gone in 1 second.', 1000)}>1 s</Button>
    <Button variant="outlined" onclick={() => toast.info('Stays for 8 seconds.', 8000)}>8 s</Button>
  </div>
</div>

<style>
  .group { flex-basis: 100%; display: grid; gap: 8px; }
  .label {
    margin: 0;
    font-size: 12px;
    font-weight: 500;
    color: var(--ca-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .row { display: flex; flex-wrap: wrap; gap: 8px; }
</style>
