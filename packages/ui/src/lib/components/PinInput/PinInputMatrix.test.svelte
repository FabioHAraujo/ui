<script lang="ts">
	import PinInput from "./PinInput.svelte";
</script>

<div
	data-testid="matrix"
	style="display:grid;gap:24px;padding:16px;width:max-content;grid-template-columns:repeat(2,max-content)"
>
	<PinInput label="Vazio" />
	<PinInput label="Parcial" value="123" />
	<PinInput label="Completo" value="123456" />
	<PinInput label="Mascarado" value="1234" mask />
	<PinInput label="Quatro dígitos" length={4} value="12" />
	<PinInput label="Texto" type="text" length={5} value="AB1" />
	<PinInput label="Descrição" description="Código enviado por SMS" value="12" />
	<PinInput label="Erro" error="Código inválido" value="123456" />
	<PinInput label="Desabilitado" disabled value="123" />
</div>
