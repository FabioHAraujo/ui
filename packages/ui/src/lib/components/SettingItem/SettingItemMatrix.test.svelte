<script lang="ts">
	import Button from "../Button/Button.svelte";
	import Switch from "../Switch/Switch.svelte";
	import SettingItem from "./SettingItem.svelte";
</script>

{#snippet toggle()}<Switch checked />{/snippet}
{#snippet toggleOff()}<Switch />{/snippet}
{#snippet action()}<Button variant="outlined" size="sm">Alterar</Button>{/snippet}

<div data-testid="matrix" style="display:grid;gap:8px;padding:16px;width:560px">
	<SettingItem label="Somente rótulo" />
	<SettingItem label="Notificações" description="Receber avisos por e-mail" children={toggle} />
	<SettingItem label="Modo compacto" description="Reduz o espaçamento das listas" children={toggleOff} />
	<SettingItem label="Senha" description="Última alteração há 3 meses" children={action} />
	<SettingItem
		label="Rótulo muito longo para testar a quebra de linha dentro do item de configuração"
		description="Uma descrição igualmente longa que precisa quebrar em múltiplas linhas para validar o alinhamento do controle à direita do texto."
		children={toggle}
	/>
</div>
