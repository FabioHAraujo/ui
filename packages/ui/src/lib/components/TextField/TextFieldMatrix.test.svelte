<script lang="ts">
	import { Search } from "@lucide/svelte";
	import TextField from "./TextField.svelte";
</script>

{#snippet lead()}<Search size={16} />{/snippet}
{#snippet trail()}<span>kg</span>{/snippet}

<div
	data-testid="matrix"
	style="display:grid;gap:16px;padding:16px;width:720px;grid-template-columns:repeat(2,1fr)"
>
	<TextField label="Vazio" placeholder="Digite aqui" />
	<TextField label="Preenchido" value="Maria da Silva" />
	<TextField label="Pequeno" size="sm" value="Maria da Silva" />
	<TextField label="Descrição" description="Texto de ajuda" placeholder="Digite aqui" />
	<TextField label="Erro" error="Campo inválido" value="abc" />
	<TextField label="Obrigatório" required placeholder="Digite aqui" />
	<TextField label="Desabilitado" disabled value="Não editável" />
	<TextField label="Somente leitura" readonly value="Apenas leitura" />
	<TextField label="Leading" leading={lead} placeholder="Buscar" />
	<TextField label="Trailing" trailing={trail} value="72" />
	<TextField label="Senha" type="password" value="segredo123" />
	<TextField
		label="Texto longo"
		value="Um valor extremamente longo que precisa ser truncado ou rolar dentro do campo de texto"
	/>
</div>
