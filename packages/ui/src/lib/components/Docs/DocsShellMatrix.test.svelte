<script lang="ts">
	import DocsShell from "./DocsShell.svelte";
	import type { DocsHeading, DocsNavGroup, DocsSearchEntry, DocsSection } from "./types.js";

	const sections: DocsSection[] = [
		{ id: "guia", label: "Guia", href: "/guia" },
		{ id: "api", label: "API", href: "/api" },
	];
	const groups: DocsNavGroup[] = [
		{
			label: "Começando",
			items: [
				{ href: "/guia/intro", title: "Introdução" },
				{ href: "/guia/instalacao", title: "Instalação" },
			],
		},
		{ label: "API", items: [{ href: "/api/sessoes", title: "Listar sessões", badge: "GET" }] },
	];
	const headings: DocsHeading[] = [
		{ id: "intro", text: "Introdução", depth: 2 },
		{ id: "requisitos", text: "Requisitos", depth: 3 },
		{ id: "uso", text: "Uso básico", depth: 2 },
	];
	const searchIndex: DocsSearchEntry[] = [];
</script>

<!-- `transform` makes the shell's fixed/sticky descendants resolve against this box. -->
<div
	data-testid="matrix"
	style="transform:translateZ(0);height:640px;overflow:hidden;width:100%;position:relative"
>
	<DocsShell
		{sections}
		active="guia"
		{groups}
		pathname="/guia/intro"
		{headings}
		{searchIndex}
		onnavigate={() => {}}
	>
		{#snippet brand()}<strong>Acme API</strong> <span>Docs</span>{/snippet}
		{#snippet children()}
			<article>
				<h1>Introdução</h1>
				<p>Conteúdo fixo da página de documentação para o teste visual.</p>
				<h2 id="intro">Visão geral</h2>
				<p>Segundo parágrafo com texto determinístico.</p>
			</article>
		{/snippet}
	</DocsShell>
</div>
