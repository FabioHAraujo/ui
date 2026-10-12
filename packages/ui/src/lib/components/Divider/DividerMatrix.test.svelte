<script lang="ts">
	import Divider from "./Divider.svelte";
</script>

<div data-testid="matrix" style="display:grid;gap:16px;padding:16px;width:320px">
	<span>Acima</span>
	<Divider />
	<span>Abaixo</span>
	<div style="display:flex;gap:12px;align-items:center;height:32px">
		<span>A</span>
		<Divider orientation="vertical" />
		<span>B</span>
		<Divider orientation="vertical" />
		<span>C</span>
	</div>
</div>
