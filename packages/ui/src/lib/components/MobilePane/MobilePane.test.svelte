<script lang="ts">
	import Button from "../Button/Button.svelte";
	import MobilePane from "./MobilePane.svelte";

	interface Props {
		onback?: () => void;
	}
	let { onback }: Props = $props();
	let open = $state(false);
</script>

<main>
<Button onclick={() => (open = true)}>Abrir pane</Button>
</main>
<MobilePane bind:open title="Conversa" {onback}>
	<input aria-label="Mensagem" />
	{#snippet actions()}
		<Button size="sm">Ação</Button>
	{/snippet}
</MobilePane>
