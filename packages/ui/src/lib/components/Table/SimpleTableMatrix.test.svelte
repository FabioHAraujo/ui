<script lang="ts">
	import SimpleTable from "./Table.svelte";
	import UserCell from "./UserCell.svelte";

	let { responsive = "scroll" }: { responsive?: "scroll" | "cards" } = $props();

	const rows = [
		{ name: "Ana Souza", email: "ana@example.com", role: "Admin", status: "Ativo" },
		{ name: "Bruno Lima", email: "bruno@example.com", role: "Developer", status: "Ativo" },
		{ name: "Carla Dias", email: undefined, role: "Designer", status: "Convidado" },
		{ name: "Diego Alves de Albuquerque Nogueira", email: "diego.alves@example.com", role: "Viewer", status: "Inativo" },
	];
</script>

<div data-testid="matrix" style="width:100vw;padding:16px;box-sizing:border-box">
	<SimpleTable {responsive}>
		<thead>
			<tr><th>Usuário</th><th>Função</th><th>Status</th></tr>
		</thead>
		<tbody>
			{#each rows as r (r.name)}
				<tr>
					<td data-label="Usuário"><UserCell name={r.name} email={r.email} /></td>
					<td data-label="Função">{r.role}</td>
					<td data-label="Status">{r.status}</td>
				</tr>
			{/each}
		</tbody>
	</SimpleTable>
</div>
