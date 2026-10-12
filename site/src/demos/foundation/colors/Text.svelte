<script lang="ts">
	import Swatches from "./Swatches.svelte";
	const tokens = ["--ca-text-primary", "--ca-text-secondary", "--ca-text-hint", "--ca-text-disabled"];
</script>

<Swatches {tokens} bordered={true} />
