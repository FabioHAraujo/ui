<script lang="ts">
	import Swatches from "./Swatches.svelte";
	const tokens = ["--ca-outline-subtle", "--ca-outline-default", "--ca-outline-strong"];
</script>

<Swatches {tokens} bordered={true} />
