<script lang="ts">
	import Button from "../Button/Button.svelte";
	import Lightbox from "./Lightbox.svelte";

	interface Props {
		onclose?: () => void;
	}
	let { onclose }: Props = $props();
	let open = $state(false);
	// 1x1 transparent gif keeps the test offline.
	const src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
</script>

<Button onclick={() => (open = true)}>Ver foto</Button>
<Lightbox bind:open {src} alt="Foto enviada por Maria" {onclose} />
