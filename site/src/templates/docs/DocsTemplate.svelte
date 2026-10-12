<script lang="ts">
  import {
    Callout,
    CodeTabs,
    DocsShell,
    MethodBadge,
    Steps,
    type DocsHeading,
    type DocsNavGroup,
    type DocsSearchEntry,
    type DocsSection,
  } from '@codeatlasdev/ui';
  import { BookOpen, ExternalLink } from '@lucide/svelte';

  let { pathname }: { pathname: string } = $props();

  const sections: DocsSection[] = [
    { id: 'guia', label: 'Guide', href: '/templates/docs/' },
    { id: 'api', label: 'API', href: '/templates/docs/' },
    { id: 'compat', label: 'Migration', href: '/templates/docs/' },
  ];

  const groups: DocsNavGroup[] = [
    {
      label: 'Messages',
      items: [
        { href: '/templates/docs/', title: 'Send text', badge: 'POST' },
        { href: '/templates/docs/#a', title: 'List messages', badge: 'GET' },
        { href: '/templates/docs/#b', title: 'Edit message', badge: 'PUT' },
        { href: '/templates/docs/#c', title: 'Delete message', badge: 'DELETE' },
      ],
    },
  ];

  const headings: DocsHeading[] = [
    { id: 'endpoint', text: 'Endpoint', depth: 2 },
    { id: 'parameters', text: 'Parameters', depth: 2 },
    { id: 'examples', text: 'Examples', depth: 2 },
    { id: 'errors', text: 'Errors', depth: 2 },
  ];

  const index: DocsSearchEntry[] = [
    {
      href: '/templates/docs/',
      title: 'Send text',
      section: 'API',
      description: 'Sends a text message.',
      headings: [{ text: 'Parameters', id: 'parameters' }],
      text: 'POST /chat/send/text with x-api-key and x-instance.',
    },
  ];

  const node = 'await acme.sessions.get("my-session").sendText(to, "Hello");';

  const curl = `curl -X POST https://api.example.com/chat/send/text \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "x-instance: my-session" \\
  -d '{"to":"5511999990000@s.whatsapp.net","text":"Hello"}'`;

  const codeTabs = [
    { label: 'cURL', code: curl },
    { label: 'Node.js', code: node },
  ];
</script>

<DocsShell
  {sections}
  active="api"
  {groups}
  {pathname}
  {headings}
  searchIndex={index}
  onnavigate={(href) => location.assign(href)}
>
  {#snippet brand()}
    <BookOpen size={22} aria-hidden="true" /> Acme API Docs
  {/snippet}
  {#snippet actions()}
    <a class="gh" href="https://example.com" aria-label="Repository"><ExternalLink size={20} /></a>
  {/snippet}

  <article class="doc">
    <MethodBadge method="POST" />
    <h1>Send text</h1>
    <div class="ca-prose">
      <p>Sends a plain text message. Supports mentions and replies to earlier messages.</p>
      <h2 id="endpoint">Endpoint</h2>
      <p><code>POST /chat/send/text</code></p>
      <h2 id="parameters">Parameters</h2>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
      <div class="ca-table-wrap" tabindex="0" role="region" aria-label="Parameters">
        <table>
          <thead><tr><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>to</code></td><td>string</td><td>Yes</td><td>Recipient JID</td></tr>
            <tr><td><code>text</code></td><td>string</td><td>Yes</td><td>Message content</td></tr>
          </tbody>
        </table>
      </div>
      <h2 id="examples">Examples</h2>
      <CodeTabs tabs={codeTabs} />
      <Callout type="tip">Use one API key per environment.</Callout>
      <h2 id="errors">Errors</h2>
      <Steps>
        <ol>
          <li><p><strong>Check the status</strong></p><p>The session must be connected.</p></li>
          <li><p><strong>Try again</strong></p><p>Wait a few seconds.</p></li>
        </ol>
      </Steps>
    </div>
  </article>
</DocsShell>

<style>
  .doc {
    max-width: 46rem;
    margin: 0 auto;
    padding: 2.5rem max(1.25rem, env(safe-area-inset-left, 0px)) 4rem;
  }

  .doc h1 {
    margin: 0.75rem 0 1rem;
    font-size: clamp(1.75rem, 1.4rem + 1.5vw, 2.125rem);
    letter-spacing: -0.025em;
    color: var(--ca-text-primary);
  }

  .gh {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    color: var(--ca-text-secondary);
  }
</style>
