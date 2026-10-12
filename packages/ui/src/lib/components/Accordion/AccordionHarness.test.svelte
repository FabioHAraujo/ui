<script lang="ts">
  import Accordion from './Accordion.svelte';
  import AccordionItem from './AccordionItem.svelte';

  let {
    type = 'single',
    value = $bindable(),
  }: { type?: 'single' | 'multiple'; value?: string | string[] } = $props();
</script>

<Accordion {type} bind:value>
  <AccordionItem value="one" title="Primeiro">Conteúdo um</AccordionItem>
  <AccordionItem value="two" title="Segundo">Conteúdo dois</AccordionItem>
  <AccordionItem value="three" title="Terceiro">Conteúdo três</AccordionItem>
</Accordion>

<output data-testid="value">{JSON.stringify(value ?? null)}</output>
