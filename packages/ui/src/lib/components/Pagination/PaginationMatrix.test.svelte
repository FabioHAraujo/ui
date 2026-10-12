<script lang="ts">
	import Pagination from "./Pagination.svelte";
</script>

<div data-testid="matrix" style="display:grid;gap:16px;padding:16px;width:max-content">
	<Pagination count={30} perPage={10} page={1} />
	<Pagination count={30} perPage={10} page={3} />
	<Pagination count={200} perPage={10} page={1} />
	<Pagination count={200} perPage={10} page={10} />
	<Pagination count={200} perPage={10} page={20} />
	<Pagination count={200} perPage={10} page={10} siblingCount={2} />
	<Pagination count={5} perPage={10} />
</div>
