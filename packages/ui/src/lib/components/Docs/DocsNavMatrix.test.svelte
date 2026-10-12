<script lang="ts">
	import DocsNav from "./DocsNav.svelte";
	import type { DocsNavGroup } from "./types.js";

	const groups: DocsNavGroup[] = [
		{
			label: "Começando",
			items: [
				{ href: "/guia/intro", title: "Introdução" },
				{ href: "/guia/instalacao", title: "Instalação" },
			],
		},
		{
			label: "API",
			items: [
				{ href: "/api/sessoes", title: "Listar sessões", badge: "GET" },
				{ href: "/api/sessoes/criar", title: "Criar sessão", badge: "POST" },
				{ href: "/api/sessoes/atualizar", title: "Atualizar sessão", badge: "PATCH" },
				{ href: "/api/sessoes/remover", title: "Remover sessão", badge: "DELETE" },
			],
		},
		{ items: [{ href: "/changelog", title: "Changelog sem rótulo de grupo" }] },
		{ label: "Vazio", items: [] },
	];
</script>

<div data-testid="matrix" style="padding:16px;width:272px">
	<DocsNav {groups} pathname="/api/sessoes/criar" />
</div>
