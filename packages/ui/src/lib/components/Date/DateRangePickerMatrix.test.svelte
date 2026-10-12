<script lang="ts">
	import { CalendarDate } from "@internationalized/date";
	import DateRangePicker from "./DateRangePicker.svelte";

	const date = new CalendarDate(2026, 1, 15);
	const range = { start: new CalendarDate(2026, 1, 12), end: new CalendarDate(2026, 1, 18) };
</script>

<div
	data-testid="matrix"
	style="display:grid;gap:16px;padding:16px;width:960px;grid-template-columns:repeat(2,1fr)"
>
	<DateRangePicker label="Vazio" placeholder={date} />
	<DateRangePicker label="Preenchido" value={range} />
	<DateRangePicker label="Pequeno" size="sm" value={range} />
	<DateRangePicker label="Descrição" description="Período do relatório" value={range} />
	<DateRangePicker label="Erro" error="Período inválido" value={range} />
	<DateRangePicker label="Obrigatório" required placeholder={date} />
	<DateRangePicker label="Desabilitado" disabled value={range} />
	<DateRangePicker label="Somente leitura" readonly value={range} />
</div>
