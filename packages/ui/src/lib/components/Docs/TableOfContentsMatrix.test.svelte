<script lang="ts">
	import TableOfContents from "./TableOfContents.svelte";
	import type { DocsHeading } from "./types.js";

	const headings: DocsHeading[] = [
		{ id: "intro", text: "Introdução", depth: 2 },
		{ id: "instalacao", text: "Instalação", depth: 2 },
		{ id: "requisitos", text: "Requisitos", depth: 3 },
		{ id: "uso", text: "Uso básico", depth: 2 },
		{ id: "avancado", text: "Configuração avançada de ambientes", depth: 3 },
	];
</script>

<div
	data-testid="matrix"
	style="display:grid;grid-template-columns:repeat(2,280px);gap:24px;padding:16px;width:max-content;align-items:start"
>
	<TableOfContents {headings} />
	<TableOfContents {headings} variant="inline" />
	<TableOfContents headings={[headings[0]]} />
	<TableOfContents {headings} label="On this page" />
</div>
