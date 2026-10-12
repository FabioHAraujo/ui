<script lang="ts">
	import Accordion from "./Accordion.svelte";
	import AccordionItem from "./AccordionItem.svelte";
</script>

<div data-testid="matrix" style="display:grid;gap:24px;padding:16px;width:480px">
	<Accordion type="single" value="one">
		<AccordionItem value="one" title="Primeiro">Conteúdo um</AccordionItem>
		<AccordionItem value="two" title="Segundo">Conteúdo dois</AccordionItem>
		<AccordionItem value="three" title="Terceiro">Conteúdo três</AccordionItem>
	</Accordion>
	<Accordion type="multiple" value={["a", "c"]}>
		<AccordionItem value="a" title="Item A">Conteúdo A</AccordionItem>
		<AccordionItem value="b" title="Item B">Conteúdo B</AccordionItem>
		<AccordionItem value="c" title="Item C com um título bastante longo para testar quebra">
			Conteúdo C
		</AccordionItem>
	</Accordion>
</div>
