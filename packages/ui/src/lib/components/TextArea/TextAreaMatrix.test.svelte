<script lang="ts">
	import TextArea from "./TextArea.svelte";
</script>

<div
	data-testid="matrix"
	style="display:grid;gap:16px;padding:16px;width:720px;grid-template-columns:repeat(2,1fr)"
>
	<TextArea label="Vazio" placeholder="Escreva algo" rows={3} />
	<TextArea label="Preenchido" rows={3} value={"Primeira linha\nSegunda linha\nTerceira linha"} />
	<TextArea label="Descrição" description="Texto de ajuda" rows={2} placeholder="Escreva algo" />
	<TextArea label="Erro" error="Campo inválido" rows={2} value="abc" />
	<TextArea label="Obrigatório" required rows={2} placeholder="Escreva algo" />
	<TextArea label="Desabilitado" disabled rows={2} value="Não editável" />
	<TextArea label="Somente leitura" readonly rows={2} value="Apenas leitura" />
	<TextArea label="Sem resize" resize="none" rows={2} value="Resize none" />
	<TextArea label="Resize both" resize="both" rows={2} value="Resize both" />
	<TextArea
		label="Texto longo"
		rows={3}
		value="Um texto bem longo que precisa quebrar em várias linhas dentro da área de texto para validar o comportamento de wrap e o espaçamento interno do componente."
	/>
</div>
