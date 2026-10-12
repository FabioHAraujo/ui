<script lang="ts">
	import { FileText, Home, Settings, Users } from "@lucide/svelte";
	import SiteHeader from "../SiteHeader/SiteHeader.svelte";
	import AppShellLayout from "./AppShellLayout.svelte";
	import type { NavModule } from "./types.js";

	const modules: NavModule[] = [
		{
			id: "app",
			label: "Aplicativo",
			icon: Home,
			basePath: "/app",
			items: [
				{ id: "dash", label: "Painel", icon: Home, path: "/app/dashboard" },
				{ id: "docs", label: "Documentos", icon: FileText, path: "/app/docs", badge: 3 },
				{
					label: "Admin",
					items: [{ id: "usr", label: "Usuários", icon: Users, path: "/app/users", isNew: true }],
				},
			],
		},
		{
			id: "cfg",
			label: "Ajustes",
			icon: Settings,
			basePath: "/settings",
			items: [
				{ id: "gen", label: "Geral", icon: Settings, path: "/settings/general" },
				{ id: "sec", label: "Segurança", icon: Settings, path: "/settings/security" },
			],
		},
	];
</script>

<!-- transform creates the containing block for the shell's position:fixed sidebar / bottom nav. -->
<div
	data-testid="matrix"
	style="position:relative;width:100vw;height:100vh;overflow:hidden;transform:translateZ(0)"
>
	<AppShellLayout {modules} pathname="/app/dashboard" persistPanel={false}>
		{#snippet header()}
			<SiteHeader />
		{/snippet}
		{#snippet brand()}
			<span style="font-weight:700">CA</span>
		{/snippet}
		<main style="padding:24px">
			<h1 style="margin:0 0 8px">Painel</h1>
			<p style="margin:0">Conteúdo da página.</p>
		</main>
	</AppShellLayout>
</div>
