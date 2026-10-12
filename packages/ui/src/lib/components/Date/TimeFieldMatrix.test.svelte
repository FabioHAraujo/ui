<script lang="ts">
	import { Time } from "@internationalized/date";
	import TimeField from "./TimeField.svelte";

	const time = new Time(14, 30);
</script>

<div
	data-testid="matrix"
	style="display:grid;gap:16px;padding:16px;width:720px;grid-template-columns:repeat(2,1fr)"
>
	<TimeField label="Vazio" placeholder={new Time(9, 0)} />
	<TimeField label="Preenchido" value={time} />
	<TimeField label="Pequeno" size="sm" value={time} />
	<TimeField label="Descrição" description="Horário de início" value={time} />
	<TimeField label="Erro" error="Horário inválido" value={time} />
	<TimeField label="Obrigatório" required placeholder={new Time(9, 0)} />
	<TimeField label="Desabilitado" disabled value={time} />
	<TimeField label="Somente leitura" readonly value={time} />
	<TimeField label="Segundos" granularity="second" value={new Time(14, 30, 45)} />
	<TimeField label="Hora" granularity="hour" value={time} />
	<TimeField label="12h" hourCycle={12} value={time} />
</div>
