<script lang="ts">
	import Button from "../Button/Button.svelte";
	import AlertDialog from "./AlertDialog.svelte";

	interface Props {
		destructive?: boolean;
		pending?: boolean;
		onconfirm?: () => void | Promise<void>;
		oncancel?: () => void;
	}
	let { destructive = false, pending = false, onconfirm = () => {}, oncancel }: Props = $props();
	let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Excluir item</Button>
<AlertDialog
	bind:open
	title="Excluir item?"
	description="Esta ação não pode ser desfeita."
	confirmLabel="Excluir"
	{destructive}
	{pending}
	{onconfirm}
	{oncancel}
/>
