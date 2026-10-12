<script lang="ts">
	import { GlassSurface, type Thickness } from "@codeatlasdev/ui";

	const tiers: { thickness: Thickness; label: string; desc: string }[] = [
		{ thickness: "ultra-thin", label: "Ultra thin", desc: "Subtle background hint" },
		{ thickness: "thin", label: "Thin", desc: "Light translucency" },
		{ thickness: "regular", label: "Regular", desc: "Standard glass surface" },
		{ thickness: "thick", label: "Thick", desc: "Strong frosted effect" },
		{ thickness: "chrome", label: "Chrome", desc: "Opaque chrome bar" },
	];
</script>

<div class="backdrop">
	{#each tiers as tier (tier.thickness)}
		<GlassSurface thickness={tier.thickness} class="tier" refraction={false}>
			<p class="label">{tier.label}</p>
			<p class="desc">{tier.desc}</p>
		</GlassSurface>
	{/each}
</div>

<style>
	.backdrop {
		display: flex;
		flex-wrap: wrap;
		gap: var(--ca-space-3);
		width: 100%;
		padding: var(--ca-space-6);
		border-radius: var(--ca-radius-lg);
		background: linear-gradient(135deg, var(--ca-brand-main) 0%, var(--ca-semantic-info) 50%, var(--ca-semantic-success) 100%);
	}
	.backdrop :global(.tier) {
		flex: 1;
		min-width: 8.5rem;
		padding: var(--ca-space-5) var(--ca-space-6);
		border-radius: var(--ca-radius-md);
	}
	.label {
		margin: 0 0 var(--ca-space-1);
		font-weight: 600;
		color: var(--ca-text-primary);
	}
	.desc {
		margin: 0;
		font-size: var(--ca-font-size-caption);
		color: var(--ca-text-secondary);
	}
</style>
