<script lang="ts">
	import Skeleton from "./Skeleton.svelte";
</script>

<div
	data-testid="matrix"
	style="display:grid;grid-template-columns:repeat(2,280px);gap:24px;padding:16px;width:max-content"
>
	<Skeleton variant="text" />
	<Skeleton variant="text" rows={3} />
	<Skeleton variant="circular" width={48} height={48} />
	<Skeleton variant="rectangular" width="100%" height={64} />
	<Skeleton variant="rounded" width="100%" height={64} />
	<Skeleton variant="text" width="60%" />
</div>
