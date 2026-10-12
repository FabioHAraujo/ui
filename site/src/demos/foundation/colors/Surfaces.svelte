<script lang="ts">
	import Swatches from "./Swatches.svelte";
	const tokens = ["--ca-surface-sunken", "--ca-surface-base", "--ca-surface-raised", "--ca-surface-overlay"];
</script>

<Swatches {tokens} bordered={true} />
