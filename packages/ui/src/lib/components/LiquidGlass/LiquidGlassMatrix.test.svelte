<script lang="ts">
	import LiquidGlass from "./LiquidGlass.svelte";

	const presets = [
		{ frost: 0, bend: 0, depth: 0, curvature: 0, sheen: 0, dispersion: 0 },
		{ frost: 4, bend: 1, depth: 1, curvature: 1, sheen: 1, dispersion: 0 },
		{ frost: 12, bend: 2, depth: 2, curvature: 2, sheen: 2, dispersion: 1 },
		{ frost: 24, bend: 4, depth: 3, curvature: 3, sheen: 3, dispersion: 2 },
	];
	const stripes =
		"background:repeating-linear-gradient(45deg,#e11d48 0 12px,#2563eb 12px 24px);";
</script>

<div
	data-testid="matrix"
	style="display:grid;grid-template-columns:repeat(2,200px);gap:16px;padding:16px;width:max-content"
>
	{#each presets as optics, i (i)}
		<div style="position:relative;height:120px;border-radius:16px;overflow:hidden;{stripes}">
			<LiquidGlass {optics} />
		</div>
	{/each}
</div>
