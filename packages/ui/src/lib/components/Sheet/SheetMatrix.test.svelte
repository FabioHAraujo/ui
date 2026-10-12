<script lang="ts">
	import Button from "../Button/Button.svelte";
	import Sheet from "./Sheet.svelte";

	let open = $state(false);
</script>

<div data-testid="matrix" style="padding:24px">
	<Button onclick={() => (open = true)}>Abrir</Button>
</div>

<Sheet bind:open title="Trocar sessão" description="Escolha a conta ativa">
	<ul style="margin:0;padding:0;list-style:none;display:grid;gap:8px">
		<li>Conta pessoal</li>
		<li>Workspace da equipe</li>
		<li>Workspace de testes</li>
	</ul>
	{#snippet footer()}
		<Button fullWidth>Nova sessão</Button>
	{/snippet}
</Sheet>
