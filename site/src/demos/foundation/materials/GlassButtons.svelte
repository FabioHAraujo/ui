<div class="backdrop">
	<button type="button" class="glass-btn">glass-btn</button>
	<button type="button" class="glass-btn-prominent">glass-btn-prominent</button>
	<button type="button" class="glass-btn-clear">glass-btn-clear</button>
</div>

<style>
	.backdrop {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--ca-space-3);
		width: 100%;
		padding: var(--ca-space-8) var(--ca-space-6);
		border-radius: var(--ca-radius-lg);
		background: linear-gradient(135deg, var(--ca-brand-main), var(--ca-semantic-info));
	}
	.backdrop button {
		padding: 10px 22px;
		border: none;
		border-radius: var(--ca-radius-md);
		font: 500 var(--ca-font-size-button) var(--ca-font-sans);
		cursor: pointer;
	}
</style>
