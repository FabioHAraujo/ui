<script lang="ts">
	import { CalendarDate } from "@internationalized/date";
	import DatePicker from "./DatePicker.svelte";

	const date = new CalendarDate(2026, 1, 15);
</script>

<div
	data-testid="matrix"
	style="display:grid;gap:16px;padding:16px;width:720px;grid-template-columns:repeat(2,1fr)"
>
	<DatePicker label="Vazio" placeholder={date} />
	<DatePicker label="Preenchido" value={date} />
	<DatePicker label="Pequeno" size="sm" value={date} />
	<DatePicker label="Descrição" description="Data de nascimento" value={date} />
	<DatePicker label="Erro" error="Data inválida" value={date} />
	<DatePicker label="Obrigatório" required placeholder={date} />
	<DatePicker label="Desabilitado" disabled value={date} />
	<DatePicker label="Somente leitura" readonly value={date} />
	<DatePicker label="Granularidade minuto" granularity="minute" value={date} />
	<DatePicker label="Locale en-US" locale="en-US" value={date} />
</div>
