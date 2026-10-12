<script lang="ts">
	import { FileText, Home, Settings, Users } from "@lucide/svelte";
	import Button from "../Button/Button.svelte";
	import type { NavModule } from "../AppShell/types.js";
	import CommandPalette from "./CommandPalette.svelte";

	const modules: NavModule[] = [
		{
			id: "app",
			label: "Aplicativo",
			icon: Home,
			basePath: "/app",
			items: [
				{ id: "dash", label: "Painel", icon: Home, path: "/app/dashboard" },
				{ id: "docs", label: "Documentos", icon: FileText, path: "/app/docs" },
				{ id: "usr", label: "Usuários", icon: Users, path: "/app/users" },
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

	let open = $state(false);
</script>

<div data-testid="matrix" style="padding:24px">
	<Button onclick={() => (open = true)}>Abrir</Button>
</div>

<CommandPalette {modules} bind:open onNavigate={() => {}} />
