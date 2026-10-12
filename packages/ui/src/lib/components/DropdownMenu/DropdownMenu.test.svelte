<script lang="ts">
	import DropdownMenu from "./DropdownMenu.svelte";
	import DropdownMenuItem from "./DropdownMenuItem.svelte";
	import DropdownMenuLabel from "./DropdownMenuLabel.svelte";
	import DropdownMenuSeparator from "./DropdownMenuSeparator.svelte";

	interface Props {
		onedit?: () => void;
		ondelete?: () => void;
	}
	let { onedit, ondelete }: Props = $props();
</script>

<DropdownMenu>
	{#snippet trigger()}Ações{/snippet}
	<DropdownMenuLabel>Item</DropdownMenuLabel>
	<DropdownMenuItem onclick={onedit}>Editar</DropdownMenuItem>
	<DropdownMenuItem disabled>Duplicar</DropdownMenuItem>
	<DropdownMenuSeparator />
	<DropdownMenuItem variant="destructive" onclick={ondelete}>Excluir</DropdownMenuItem>
</DropdownMenu>
