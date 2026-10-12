<script lang="ts">
	import ErrorPage from "./ErrorPage.svelte";

	let { status = 404 }: { status?: number } = $props();
</script>

<div data-testid="matrix" style="width:100vw;height:100vh;overflow:hidden">
	<ErrorPage {status} />
</div>
