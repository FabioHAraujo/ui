<script lang="ts">
	import Button from "../Button/Button.svelte";
	import TextField from "../TextField/TextField.svelte";
	import FormSection from "../templates/FormSection.svelte";
	import AppForm from "./AppForm.svelte";
</script>

<div
	data-testid="matrix"
	style="display:flex;flex-direction:column;width:100vw;height:100vh;overflow:hidden"
>
	<AppForm title="Novo usuário" description="Preencha os dados abaixo." backHref="/users">
		<FormSection title="Conta" description="Informações de acesso.">
			<TextField label="Nome" value="Ana Souza" />
			<TextField label="E-mail" type="email" value="ana@example.com" />
		</FormSection>
		{#snippet footer()}
			<Button variant="ghost">Cancelar</Button>
			<Button>Salvar</Button>
		{/snippet}
	</AppForm>
</div>
