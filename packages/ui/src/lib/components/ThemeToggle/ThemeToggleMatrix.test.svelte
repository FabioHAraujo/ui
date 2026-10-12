<script lang="ts">
	import ThemeToggle from "./ThemeToggle.svelte";
</script>

<div data-testid="matrix" style="display:flex;gap:16px;align-items:center;padding:16px;width:max-content">
	<ThemeToggle size={14} />
	<ThemeToggle />
	<ThemeToggle size={28} />
	<ThemeToggle label="Alternar tema" />
</div>
