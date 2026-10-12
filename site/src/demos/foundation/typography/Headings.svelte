<script lang="ts">
	import TypeRows from "./TypeRows.svelte";
	const rows = [1, 2, 3, 4, 5, 6].map((n) => ({ label: `Heading ${n}`, token: `--ca-font-size-h${n}` }));
</script>

<TypeRows {rows} heading />
