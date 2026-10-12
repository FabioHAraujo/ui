<script lang="ts">
	import Button from "../Button/Button.svelte";
	import Sheet from "./Sheet.svelte";

	interface Props {
		title?: string;
		description?: string;
		onclose?: () => void;
		swipeToDismiss?: boolean;
	}
	let { title = "Trocar sessão", description = "Escolha a conta ativa", onclose, swipeToDismiss = true }: Props = $props();
	let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Abrir sheet</Button>
<Sheet bind:open {title} {description} {onclose} {swipeToDismiss}>
	<ul>
		<li><button type="button">Conta A</button></li>
		<li><button type="button">Conta B</button></li>
	</ul>
	{#snippet footer()}
		<Button>Nova sessão</Button>
	{/snippet}
</Sheet>
