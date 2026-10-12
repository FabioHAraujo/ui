<script lang="ts">
  import Tabs from './Tabs.svelte';
  import TabsList from './TabsList.svelte';
  import TabsTrigger from './TabsTrigger.svelte';
  import TabsContent from './TabsContent.svelte';

  let { value = $bindable('a'), onchange }: { value?: string; onchange?: (v: string) => void } = $props();
</script>

<Tabs bind:value {onchange}>
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

<output data-testid="value">{value}</output>
