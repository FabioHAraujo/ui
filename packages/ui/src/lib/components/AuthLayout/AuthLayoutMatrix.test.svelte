<script lang="ts">
	import Button from "../Button/Button.svelte";
	import TextField from "../TextField/TextField.svelte";
	import AuthCard from "./AuthCard.svelte";
	import AuthLayout from "./AuthLayout.svelte";
</script>

<div data-testid="matrix" style="position:relative;width:100vw;height:100vh;overflow:hidden">
	<AuthLayout logoMark="CA" logoName="CodeAtlas UI">
		{#snippet panel()}
			<blockquote style="margin:0;color:var(--panel-text-primary)">
				Construa interfaces consistentes em minutos.
			</blockquote>
		{/snippet}
		<AuthCard title="Bem-vindo de volta" subtitle="Entre para continuar">
			<TextField label="E-mail" type="email" value="ana@example.com" />
			<TextField label="Senha" type="password" value="segredo123" />
			<Button fullWidth>Entrar</Button>
			{#snippet footer()}
				Não tem conta? <a href="/sign-up">Cadastre-se</a>
			{/snippet}
		</AuthCard>
	</AuthLayout>
</div>
