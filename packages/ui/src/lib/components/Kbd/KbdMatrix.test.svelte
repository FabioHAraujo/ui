<script lang="ts">
	import Kbd from "./Kbd.svelte";
</script>

<div data-testid="matrix" style="display:flex;gap:12px;align-items:center;padding:16px;width:max-content">
	<Kbd>⌘</Kbd>
	<Kbd>K</Kbd>
	<Kbd>Ctrl</Kbd>
	<Kbd>Esc</Kbd>
	<Kbd>Enter</Kbd>
	<span style="display:inline-flex;gap:4px;align-items:center">
		<Kbd>Ctrl</Kbd>+<Kbd>Shift</Kbd>+<Kbd>P</Kbd>
	</span>
	<p style="margin:0">Pressione <Kbd>/</Kbd> para buscar</p>
</div>
