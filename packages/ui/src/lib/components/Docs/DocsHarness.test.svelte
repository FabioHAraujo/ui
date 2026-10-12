<script lang="ts">
  import { createRawSnippet } from 'svelte';
  import DocsShell from './DocsShell.svelte';
  import CodeTabs from './CodeTabs.svelte';
  import CodeTab from './CodeTab.svelte';
  import Steps from './Steps.svelte';
  import Callout from './Callout.svelte';
  import CardGrid from './CardGrid.svelte';
  import LinkCard from './LinkCard.svelte';
  import type { DocsSearchEntry } from './types.js';

  let {
    kind,
    onnavigate = () => {},
    searchIndex,
    ...rest
  }: {
    kind: 'shell' | 'codetabs' | 'codetabs-pair' | 'steps' | 'callout' | 'cardgrid';
    onnavigate?: (href: string) => void;
    searchIndex?: DocsSearchEntry[] | (() => Promise<DocsSearchEntry[]>);
    [k: string]: unknown;
  } = $props();

  const index: DocsSearchEntry[] = [
    { href: '/guia/inicio', title: 'Primeiros passos', section: 'Guia', description: 'Comece aqui', headings: [{ text: 'Instalação', id: 'instalacao' }], text: 'instale o pacote' },
    { href: '/api/mensagens', title: 'Enviar mensagem', section: 'API', description: 'Endpoint de envio', headings: [], text: 'webhook e QR code' },
  ];

  const brand = createRawSnippet(() => ({ render: () => `<span>Atlas Docs</span>` }));
</script>

{#if kind === 'shell'}
  <DocsShell
    sections={[{ id: 'guia', label: 'Guia', href: '/guia' }, { id: 'api', label: 'API', href: '/api' }]}
    active="guia"
    groups={[{ label: 'Começando', items: [{ href: '/guia/inicio', title: 'Primeiros passos' }, { href: '/guia/config', title: 'Configuração' }] }]}
    pathname="/guia/inicio"
    headings={[{ id: 'a', text: 'Introdução', depth: 2 }, { id: 'b', text: 'Instalação', depth: 2 }]}
    searchIndex={searchIndex ?? index}
    {onnavigate}
    {brand}
    {...rest}
  >
    <article>
      <h2 id="a">Introdução</h2>
      <h2 id="b">Instalação</h2>
    </article>
  </DocsShell>
{:else if kind === 'codetabs'}
  <CodeTabs {...rest}>
    <CodeTab label="cURL"><pre>curl https://api</pre></CodeTab>
    <CodeTab label="Node.js"><pre>fetch("https://api")</pre></CodeTab>
    <CodeTab label="Python"><pre>requests.get("https://api")</pre></CodeTab>
  </CodeTabs>
{:else if kind === 'codetabs-pair'}
  <CodeTabs sync="pair">
    <CodeTab label="cURL"><pre>curl A</pre></CodeTab>
    <CodeTab label="Node.js"><pre>node A</pre></CodeTab>
  </CodeTabs>
  <CodeTabs sync="pair">
    <CodeTab label="cURL"><pre>curl B</pre></CodeTab>
    <CodeTab label="Node.js"><pre>node B</pre></CodeTab>
  </CodeTabs>
{:else if kind === 'steps'}
  <Steps>
    <ol>
      <li><strong>Crie uma sessão</strong></li>
      <li><strong>Conecte via QR Code</strong></li>
    </ol>
  </Steps>
{:else if kind === 'callout'}
  <Callout {...rest}>Conteúdo do aviso</Callout>
{:else}
  <CardGrid>
    <LinkCard title="Guia" description="Comece aqui" href="/guia" />
    <LinkCard title="API" href="/api" />
  </CardGrid>
{/if}
