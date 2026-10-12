<script lang="ts">
	import Steps from "./Steps.svelte";
</script>

<div data-testid="matrix" style="padding:16px;width:520px">
	<Steps>
		{#snippet children()}
			<ol>
				<li>
					<strong>Crie uma sessão</strong>
					<p>Acesse o painel e crie uma nova sessão.</p>
				</li>
				<li>
					<strong>Conecte via QR Code</strong>
					<p>Escaneie o código com o aplicativo.</p>
				</li>
				<li>
					<strong>Envie a primeira mensagem</strong>
				</li>
			</ol>
		{/snippet}
	</Steps>
</div>
