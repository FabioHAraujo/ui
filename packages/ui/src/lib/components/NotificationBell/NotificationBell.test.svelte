<script lang="ts">
	import NotificationBell, { type NotificationItem } from "./NotificationBell.svelte";

	interface Props {
		items?: NotificationItem[];
		onRead?: (id: string) => void;
		onReadAll?: () => void;
		onClear?: () => void;
	}
	let { items = [], onRead, onReadAll, onClear }: Props = $props();
</script>

<NotificationBell notifications={items} {onRead} {onReadAll} {onClear} />
