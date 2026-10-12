<script lang="ts">
	import Tooltip from "./Tooltip.svelte";

	interface Props {
		delay?: number;
	}
	let { delay = 0 }: Props = $props();
</script>

<Tooltip content="Salvar alterações" {delay}>Salvar</Tooltip>
<button type="button">Depois</button>
