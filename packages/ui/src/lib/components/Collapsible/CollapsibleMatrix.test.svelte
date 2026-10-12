<script lang="ts">
	import Collapsible from "./Collapsible.svelte";
</script>

<div data-testid="matrix" style="display:grid;gap:16px;padding:16px;width:480px">
	<Collapsible title="Fechado">Conteúdo oculto</Collapsible>
	<Collapsible title="Aberto" open>
		Conteúdo visível com algum texto para validar o espaçamento interno do corpo.
	</Collapsible>
	<Collapsible title="Desabilitado" disabled>Conteúdo oculto</Collapsible>
	<Collapsible title="Título muito longo para testar a quebra de linha dentro do gatilho do collapsible" open>
		Corpo curto
	</Collapsible>
</div>
