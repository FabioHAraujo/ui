<script lang="ts">
	import Swatches from "./Swatches.svelte";
	const tokens = [
		"--ca-brand-main",
		"--ca-brand-light",
		"--ca-brand-dark",
		"--ca-brand-contrast",
		"--ca-brand-fill",
		"--ca-brand-text",
	];
</script>

<Swatches {tokens} />
