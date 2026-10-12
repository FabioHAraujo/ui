<script lang="ts">
	import Spinner from "./Spinner.svelte";
</script>

<div data-testid="matrix" style="display:flex;gap:24px;align-items:center;padding:16px;width:max-content">
	<Spinner size={12} />
	<Spinner size={16} />
	<Spinner />
	<Spinner size={32} />
	<Spinner size={48} />
	<Spinner size="2rem" />
</div>
