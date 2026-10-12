<script lang="ts">
	import Badge from "./Badge.svelte";

	const colors = ["brand", "success", "error", "warning"] as const;
	const counts = [1, 9, 42, 99, 150] as const;
</script>

<div data-testid="matrix" style="display:grid;gap:24px;padding:24px;width:max-content">
	{#each colors as color (color)}
		<div style="display:flex;gap:24px;align-items:center">
			{#each counts as count (count)}
				<Badge {count} {color}>
					<span style="display:block;width:32px;height:32px;border-radius:8px;background:#888"></span>
				</Badge>
			{/each}
			<Badge dot {color}>
				<span style="display:block;width:32px;height:32px;border-radius:8px;background:#888"></span>
			</Badge>
			<Badge count={0} {color}>
				<span style="display:block;width:32px;height:32px;border-radius:8px;background:#888"></span>
			</Badge>
		</div>
	{/each}
</div>
