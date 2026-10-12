<script lang="ts">
	import DropdownMenu from "./DropdownMenu.svelte";
	import DropdownMenuItem from "./DropdownMenuItem.svelte";
	import DropdownMenuLabel from "./DropdownMenuLabel.svelte";
	import DropdownMenuSeparator from "./DropdownMenuSeparator.svelte";
</script>

<div data-testid="matrix" style="padding:24px">
	<DropdownMenu>
		{#snippet trigger()}Opções{/snippet}
		<DropdownMenuLabel>Conta</DropdownMenuLabel>
		<DropdownMenuItem>Perfil</DropdownMenuItem>
		<DropdownMenuItem disabled>Faturamento</DropdownMenuItem>
		<DropdownMenuSeparator />
		<DropdownMenuItem variant="destructive">Sair</DropdownMenuItem>
	</DropdownMenu>
</div>
