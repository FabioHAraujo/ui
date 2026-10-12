<script lang="ts">
	import AuthCard from "./AuthCard.svelte";

	const field = "height:40px;border:1px solid #888;border-radius:8px;padding:10px;box-sizing:border-box";
</script>

<div
	data-testid="matrix"
	style="display:grid;grid-template-columns:repeat(2,400px);gap:24px;padding:24px;width:max-content;align-items:start"
>
	<AuthCard title="Bem-vindo de volta" subtitle="Entre para continuar">
		{#snippet children()}
			<div style={field}>E-mail</div>
			<div style={field}>Senha</div>
		{/snippet}
		{#snippet footer()}Não tem conta? <a href="#entrar">Cadastre-se</a>{/snippet}
	</AuthCard>
	<AuthCard title="Somente título">
		{#snippet children()}<div style={field}>Campo</div>{/snippet}
	</AuthCard>
	<AuthCard subtitle="Somente subtítulo">
		{#snippet children()}<div style={field}>Campo</div>{/snippet}
	</AuthCard>
	<AuthCard>
		{#snippet children()}<div style={field}>Sem cabeçalho nem rodapé</div>{/snippet}
	</AuthCard>
</div>
