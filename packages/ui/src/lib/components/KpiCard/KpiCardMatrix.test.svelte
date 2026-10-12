<script lang="ts">
	import { DollarSign, Users } from "@lucide/svelte";
	import KpiCard from "./KpiCard.svelte";
</script>

<div
	data-testid="matrix"
	style="display:grid;grid-template-columns:repeat(3,240px);gap:16px;padding:16px;width:max-content"
>
	<KpiCard title="Receita" value="12.450" unit="BRL" trend={12.5} icon={DollarSign} />
	<KpiCard title="Usuários" value={1280} trend={-3.2} icon={Users} />
	<KpiCard title="Conversão" value="4,2" unit="%" trend={0} />
	<KpiCard title="Sem tendência" value={87} />
	<KpiCard title="Com ícone" value={87} icon={Users} />
	<KpiCard title="Título bem longo para validar quebra de linha" value="1.234.567" unit="un" trend={100} />
</div>
