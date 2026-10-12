<script lang="ts">
	import Grid from "./Grid.svelte";

	const colors = ["#e11d48", "#2563eb", "#16a34a", "#f59e0b", "#7c3aed", "#0891b2"];
	const cell = (c: string, h = 32) => `height:${h}px;border-radius:6px;background:${c}`;
	const frame = "border:1px dashed #888;width:360px";
</script>

{#snippet cells()}
	{#each colors as c (c)}<div style={cell(c)}></div>{/each}
{/snippet}

<div data-testid="matrix" style="display:grid;gap:16px;padding:16px;width:max-content">
	<div style={frame}><Grid>{#snippet children()}{@render cells()}{/snippet}</Grid></div>
	<div style={frame}><Grid cols={3} gap={8}>{#snippet children()}{@render cells()}{/snippet}</Grid></div>
	<div style={frame}><Grid cols="2fr 1fr" gap={12}>{#snippet children()}{@render cells()}{/snippet}</Grid></div>
	<div style={frame}>
		<Grid cols="repeat(auto-fill, minmax(100px, 1fr))" gap="1rem">
			{#snippet children()}{@render cells()}{/snippet}
		</Grid>
	</div>
	<div style={frame}>
		<Grid cols={3} rowGap={4} colGap={24}>{#snippet children()}{@render cells()}{/snippet}</Grid>
	</div>
	<div style={frame}>
		<Grid cols={3} gap={8} align="center" justify="center">
			{#snippet children()}
				<div style="height:16px;width:40px;background:#e11d48"></div>
				<div style="height:40px;width:40px;background:#2563eb"></div>
				<div style="height:24px;width:40px;background:#16a34a"></div>
			{/snippet}
		</Grid>
	</div>
</div>
