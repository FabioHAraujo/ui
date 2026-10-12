<script lang="ts">
	import Button from "../Button/Button.svelte";
	import StickyActions from "./StickyActions.svelte";

	interface Props {
		align?: "end" | "stretch";
		show?: boolean;
	}
	let { align = "end", show = true }: Props = $props();
</script>

<div style="height: 200px; overflow: auto;" data-testid="scroller">
	<div style="height: 600px;">conteúdo</div>
	<StickyActions {align} {show}>
		<Button variant="ghost">Cancelar</Button>
		<Button variant="filled">Salvar</Button>
	</StickyActions>
</div>
