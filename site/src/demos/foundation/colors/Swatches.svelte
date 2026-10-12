<script lang="ts">
	interface Props {
		tokens: string[];
		/** Draw a border so near-background swatches stay visible. */
		bordered?: boolean;
	}
	let { tokens, bordered = false }: Props = $props();
</script>

<div class="swatches">
	{#each tokens as token (token)}
		<div class="swatch">
			<div class="swatch__color" class:swatch__color--bordered={bordered} style="--swatch-bg: var({token})"></div>
			<p class="swatch__label">{token.replace("--ca-", "")}</p>
			<p class="swatch__var">{token}</p>
		</div>
	{/each}
</div>

<style>
	.swatches {
		display: flex;
		flex-wrap: wrap;
		gap: var(--ca-space-4);
	}
	.swatch {
		display: flex;
		flex-direction: column;
		gap: var(--ca-space-1);
		width: 120px;
	}
	.swatch__color {
		height: 56px;
		border-radius: var(--ca-radius-md);
		background: var(--swatch-bg);
	}
	.swatch__color--bordered {
		border: 1px solid var(--ca-outline-default);
	}
	.swatch__label {
		margin: 0;
		font-size: var(--ca-font-size-caption);
		font-weight: 600;
		color: var(--ca-text-primary);
	}
	.swatch__var {
		margin: 0;
		font-family: var(--ca-font-mono);
		font-size: var(--ca-font-size-nano);
		color: var(--ca-text-hint);
		word-break: break-all;
	}
</style>
