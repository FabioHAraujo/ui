<script lang="ts">
	import Timeline from "./Timeline.svelte";
	import type { TimelineItem } from "./Timeline.svelte";

	const items: TimelineItem[] = [
		{ label: "Padrão", description: "Evento padrão", date: "01/01/2025" },
		{ label: "Sucesso", description: "Concluído com êxito", date: "02/01/2025", variant: "success" },
		{ label: "Info", date: "03/01/2025", variant: "info" },
		{ label: "Aviso", description: "Requer atenção", variant: "warning" },
		{
			label: "Erro",
			description:
				"Descrição longa para validar a quebra de linha dentro do conteúdo da linha do tempo.",
			date: "05/01/2025",
			variant: "error",
		},
	];
</script>

<div data-testid="matrix" style="display:grid;gap:24px;padding:16px;width:360px">
	<Timeline {items} />
	<Timeline items={[{ label: "Único item", date: "10/02/2025" }]} />
</div>
