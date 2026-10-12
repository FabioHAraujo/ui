<script lang="ts">
	import { createRawSnippet } from "svelte";
	import NotificationBell from "./NotificationBell.svelte";
	import type { NotificationItem } from "./NotificationBell.svelte";

	const notifications: NotificationItem[] = [
		{ id: "1", title: "Deploy concluído", body: "Versão 1.2.0 publicada.", time: "há 5 min", variant: "success" },
		{ id: "2", title: "Falha no build", body: "Verifique os logs.", time: "há 1 h", variant: "error" },
		{ id: "3", title: "Comentário novo", time: "ontem", read: true },
	];
	const custom = createRawSnippet(() => ({
		render: () => `<span style="padding:6px 12px">Trigger custom</span>`,
	}));
</script>

<div data-testid="matrix" style="display:flex;gap:32px;align-items:center;padding:24px;width:max-content">
	<NotificationBell />
	<NotificationBell {notifications} />
	<NotificationBell notifications={notifications.map((n) => ({ ...n, read: true }))} />
	<NotificationBell notifications={Array.from({ length: 120 }, (_, i) => ({ id: String(i), title: `n${i}` }))} />
	<NotificationBell {notifications} children={custom} />
</div>
