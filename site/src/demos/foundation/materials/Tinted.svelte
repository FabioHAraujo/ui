<script lang="ts">
	import { GlassSurface } from "@codeatlasdev/ui";
</script>

<div class="backdrop">
	<GlassSurface thickness="regular" tinted refraction={false} class="chip">
		<p>Tinted</p>
	</GlassSurface>
	<GlassSurface thickness="regular" glowing refraction={false} class="chip">
		<p>Glowing</p>
	</GlassSurface>
	<GlassSurface thickness="regular" tinted glowing refraction={false} class="chip">
		<p>Tinted + glowing</p>
	</GlassSurface>
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
	.backdrop :global(.chip) {
		flex: 1;
		min-width: 8.5rem;
		padding: var(--ca-space-5) var(--ca-space-6);
		border-radius: var(--ca-radius-md);
	}
	p {
		margin: 0;
		font-weight: 600;
		color: var(--ca-text-primary);
	}
</style>
