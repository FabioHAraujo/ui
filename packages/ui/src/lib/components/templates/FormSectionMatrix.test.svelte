<script lang="ts">
	import FormSection from "./FormSection.svelte";
</script>

<div data-testid="matrix" style="display:grid;gap:32px;padding:16px;width:640px">
	<FormSection title="Conta" description="Informações básicas do usuário.">
		{#snippet children()}
			<div>Nome</div><div>E-mail</div><div>Telefone</div><div>Cargo</div>
		{/snippet}
	</FormSection>
	<FormSection label="Notificações" description="Escolha como ser avisado." layout="list">
		{#snippet children()}
			<div style="padding:12px 0">E-mail</div>
			<div style="padding:12px 0">Push</div>
		{/snippet}
	</FormSection>
	<FormSection title="Perfil" layout="stack">
		{#snippet children()}
			<div style="height:48px;border:1px solid #888;border-radius:8px">Avatar</div>
			<div style="height:48px;border:1px solid #888;border-radius:8px">Bio</div>
		{/snippet}
	</FormSection>
	<FormSection>
		{#snippet children()}<div>Sem cabeçalho</div><div>Campos soltos</div>{/snippet}
	</FormSection>
</div>
