<script lang="ts">
	import SimpleTable from "./Table.svelte";
	import UserCell from "./UserCell.svelte";

	let { responsive = "scroll" }: { responsive?: "scroll" | "cards" } = $props();
</script>

<SimpleTable {responsive}>
	<thead>
		<tr>
			<th scope="col">Usuário</th>
			<th scope="col">Função</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td data-label="Usuário"><UserCell name="Ana Souza" email="ana@example.com" /></td>
			<td data-label="Função">Admin</td>
		</tr>
		<tr>
			<td data-label="Usuário"><UserCell name="Bruno Lima" /></td>
			<td data-label="Função">Developer</td>
		</tr>
	</tbody>
</SimpleTable>
