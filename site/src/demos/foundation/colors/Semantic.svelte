<script lang="ts">
	import Swatches from "./Swatches.svelte";
	const tokens = ["--ca-semantic-success", "--ca-semantic-warning", "--ca-semantic-error", "--ca-semantic-info"];
</script>

<Swatches {tokens} bordered={false} />
