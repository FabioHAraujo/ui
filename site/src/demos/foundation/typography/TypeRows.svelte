<script lang="ts">
	interface Props {
		rows: { label: string; token: string }[];
		/** Headings render bold, body styles regular. */
		heading?: boolean;
	}
	let { rows, heading = false }: Props = $props();
</script>

<div class="stack">
	{#each rows as row (row.token)}
		<div class="row">
			<span class="meta">{row.token}</span>
			<span class="sample" class:sample--heading={heading} style="--type-size: var({row.token})">
				{row.label}: The quick brown fox{heading ? "" : " jumps over the lazy dog"}
			</span>
		</div>
	{/each}
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--ca-space-3);
		width: 100%;
	}
	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: var(--ca-space-1) var(--ca-space-4);
		padding-bottom: var(--ca-space-2);
		border-bottom: 1px solid var(--ca-outline-subtle);
	}
	.meta {
		flex: 0 0 11rem;
		font-family: var(--ca-font-mono);
		font-size: var(--ca-font-size-micro);
		color: var(--ca-text-hint);
	}
	.sample {
		min-width: 0;
		font-size: var(--type-size);
		line-height: 1.3;
		color: var(--ca-text-primary);
	}
	.sample--heading { font-weight: 700; }
</style>
