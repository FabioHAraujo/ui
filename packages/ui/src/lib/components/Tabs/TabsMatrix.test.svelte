<script lang="ts">
	import Tabs from "./Tabs.svelte";
	import TabsContent from "./TabsContent.svelte";
	import TabsList from "./TabsList.svelte";
	import TabsTrigger from "./TabsTrigger.svelte";
</script>

<div data-testid="matrix" style="display:grid;gap:24px;padding:16px;width:520px">
	<Tabs value="a">
		<TabsList>
			<TabsTrigger value="a">Conta</TabsTrigger>
			<TabsTrigger value="b">Senha</TabsTrigger>
			<TabsTrigger value="c" disabled>Faturas</TabsTrigger>
			<TabsTrigger value="d">Equipe</TabsTrigger>
		</TabsList>
		<TabsContent value="a">Painel conta</TabsContent>
		<TabsContent value="b">Painel senha</TabsContent>
		<TabsContent value="c">Painel faturas</TabsContent>
		<TabsContent value="d">Painel equipe</TabsContent>
	</Tabs>
	<Tabs value="b">
		<TabsList>
			<TabsTrigger value="a">Visão geral</TabsTrigger>
			<TabsTrigger value="b">Configurações avançadas</TabsTrigger>
		</TabsList>
		<TabsContent value="a">Painel visão geral</TabsContent>
		<TabsContent value="b">Painel avançadas</TabsContent>
	</Tabs>
</div>
