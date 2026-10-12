<script lang="ts">
	import { FileText, Home, Settings } from "@lucide/svelte";
	import Button from "../Button/Button.svelte";
	import type { NavModule } from "../AppShell/types.js";
	import CommandPalette from "./CommandPalette.svelte";

	interface Props {
		onNavigate?: (path: string) => void;
		minQueryLength?: number;
	}
	let { onNavigate = () => {}, minQueryLength }: Props = $props();
	let open = $state(false);

	const modules: NavModule[] = [
		{
			id: "geral",
			label: "Geral",
			icon: Home,
			basePath: "/",
			items: [
				{ id: "inicio", label: "Início", icon: Home, path: "/" },
				{ id: "relatorios", label: "Relatórios", icon: FileText, path: "/relatorios" },
			],
		},
		{
			id: "conta",
			label: "Conta",
			icon: Settings,
			basePath: "/conta",
			items: [{ id: "perfil", label: "Perfil", icon: Settings, path: "/conta/perfil" }],
		},
	];
</script>

<Button onclick={() => (open = true)}>Abrir paleta</Button>
<CommandPalette bind:open {modules} {onNavigate} {minQueryLength} />
