<script lang="ts">
	import { Bell, Settings, Shield, Trash2 } from "@lucide/svelte";
	import Button from "../Button/Button.svelte";
	import TextField from "../TextField/TextField.svelte";
	import FormSection from "../templates/FormSection.svelte";
	import AppSettings from "./AppSettings.svelte";

	const tabs = [
		{ value: "general", label: "Geral", icon: Settings },
		{ value: "notifications", label: "Notificações", icon: Bell, badge: 2 },
		{ value: "security", label: "Segurança", icon: Shield },
		{ value: "danger", label: "Zona de perigo", icon: Trash2, danger: true },
	];
</script>

<div
	data-testid="matrix"
	style="display:flex;flex-direction:column;width:100vw;height:100vh;overflow:hidden"
>
	<AppSettings title="Configurações" description="Gerencie o workspace." {tabs} defaultTab="general">
		{#snippet actions()}
			<Button>Salvar</Button>
		{/snippet}
		{#snippet children()}
			<FormSection title="Workspace" description="Nome e identificador.">
				<TextField label="Nome" value="CodeAtlas" />
				<TextField label="Slug" value="codeatlas" />
			</FormSection>
		{/snippet}
	</AppSettings>
</div>
