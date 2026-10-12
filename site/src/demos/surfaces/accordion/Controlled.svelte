<script lang="ts">
  import { Accordion, AccordionItem } from '@codeatlasdev/ui';

  let value = $state<string | string[] | undefined>('c1');
</script>

<div class="wrap">
  <Accordion type="single" bind:value>
    <AccordionItem value="c1" title="First section">Opened from the bound value.</AccordionItem>
    <AccordionItem value="c2" title="Second section">Opening this one closes the first.</AccordionItem>
  </Accordion>
  <p>Open item: {Array.isArray(value) ? value.join(', ') : (value ?? 'none')}</p>
</div>

<style>
  .wrap { width: 100%; max-width: 560px; display: flex; flex-direction: column; gap: var(--ca-space-3); }
  p { margin: 0; font-size: var(--ca-font-size-body2); color: var(--ca-text-secondary); }
</style>
