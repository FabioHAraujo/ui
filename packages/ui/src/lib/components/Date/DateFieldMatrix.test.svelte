<script lang="ts">
	import { CalendarDate, CalendarDateTime } from "@internationalized/date";
	import DateField from "./DateField.svelte";

	const date = new CalendarDate(2026, 1, 15);
	const dateTime = new CalendarDateTime(2026, 1, 15, 14, 30);
</script>

<div
	data-testid="matrix"
	style="display:grid;gap:16px;padding:16px;width:720px;grid-template-columns:repeat(2,1fr)"
>
	<DateField label="Vazio" placeholder={date} />
	<DateField label="Preenchido" value={date} />
	<DateField label="Pequeno" size="sm" value={date} />
	<DateField label="Descrição" description="Data de nascimento" value={date} />
	<DateField label="Erro" error="Data inválida" value={date} />
	<DateField label="Obrigatório" required placeholder={date} />
	<DateField label="Desabilitado" disabled value={date} />
	<DateField label="Somente leitura" readonly value={date} />
	<DateField label="Minuto" granularity="minute" value={dateTime} />
	<DateField label="12h" granularity="minute" hourCycle={12} value={dateTime} />
	<DateField label="Locale en-US" locale="en-US" value={date} />
</div>
