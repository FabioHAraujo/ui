<script lang="ts">
	import Breadcrumb from "./Breadcrumb.svelte";
</script>

<div data-testid="matrix" style="display:grid;gap:16px;padding:16px;width:520px">
	<Breadcrumb items={[{ label: "Início", href: "/" }]} />
	<Breadcrumb
		items={[
			{ label: "Início", href: "/" },
			{ label: "Projetos", href: "/projetos" },
			{ label: "Detalhes" },
		]}
	/>
	<Breadcrumb
		separator=">"
		items={[
			{ label: "Início", href: "/" },
			{ label: "Configurações", href: "/config" },
			{ label: "Perfil", href: "/config/perfil" },
			{ label: "Segurança" },
		]}
	/>
	<Breadcrumb
		items={[
			{ label: "Sem link" },
			{ label: "Também sem link" },
			{ label: "Atual" },
		]}
	/>
</div>
