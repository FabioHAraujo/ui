<script lang="ts">
	import MethodBadge from "./MethodBadge.svelte";

	const methods = ["GET", "POST", "PUT", "PATCH", "DELETE", "head", "OPTIONS"];
</script>

<div data-testid="matrix" style="display:grid;gap:12px;padding:16px;width:max-content">
	<div style="display:flex;gap:8px;align-items:center">
		{#each methods as method (method)}
			<MethodBadge {method} />
		{/each}
	</div>
	<div style="display:flex;gap:8px;align-items:center">
		{#each methods as method (method)}
			<MethodBadge {method} variant="plain" />
		{/each}
	</div>
</div>
