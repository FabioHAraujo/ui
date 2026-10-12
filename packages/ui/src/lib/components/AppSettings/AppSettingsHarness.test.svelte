<script lang="ts">
  import { untrack } from 'svelte';
	import { Settings } from "@lucide/svelte";
	import AppSettings from "./AppSettings.svelte";

	interface Props {
		defaultTab?: string;
		/** When set, the harness controls the tab externally via bind:activeTab. */
		controlled?: string;
		onTabChange?: (v: string) => void;
	}

	let { defaultTab, controlled, onTabChange }: Props = $props();

	let external = $state(untrack(() => controlled ?? ""));

	const tabs = [
		{ value: "general", label: "Geral", icon: Settings },
		{ value: "members", label: "Membros", badge: 4 },
		{ value: "danger", label: "Zona de perigo", danger: true },
	];
</script>

{#snippet actions()}
	<button type="button">Salvar</button>
{/snippet}
{#snippet content(tab: string)}
	<p>Conteúdo: {tab}</p>
{/snippet}

<main>
	{#if controlled !== undefined}
		<AppSettings
			title="Configurações"
			description="Gerencie o workspace"
			{tabs}
			bind:activeTab={external}
			{onTabChange}
			{actions}
			children={content}
		/>
		<output data-testid="external">{external}</output>
	{:else}
		<AppSettings
			title="Configurações"
			description="Gerencie o workspace"
			{tabs}
			{defaultTab}
			{onTabChange}
			{actions}
			children={content}
		/>
	{/if}
</main>
