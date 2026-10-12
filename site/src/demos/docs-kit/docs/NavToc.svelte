<script lang="ts">
  import { DocsNav, TableOfContents, type DocsHeading, type DocsNavGroup } from '@codeatlasdev/ui';

  const headings: DocsHeading[] = [
    { id: 'demo-prerequisites', text: 'Prerequisites', depth: 2 },
    { id: 'demo-auth', text: 'Authentication', depth: 2 },
    { id: 'demo-header', text: 'The x-api-key header', depth: 3 },
    { id: 'demo-send', text: 'Send a message', depth: 2 },
  ];

  const groups: DocsNavGroup[] = [
    {
      label: 'Get started',
      items: [
        { href: '/docs/docs-kit/docs/', title: 'Introduction' },
        { href: '/x/quick-start', title: 'Quick start' },
      ],
    },
    {
      label: 'Messages',
      items: [
        { href: '/x/send-text', title: 'Send text', badge: 'POST' },
        { href: '/x/list', title: 'List messages', badge: 'GET' },
        { href: '/x/edit', title: 'Edit message', badge: 'PUT' },
        { href: '/x/delete', title: 'Delete message', badge: 'DELETE' },
      ],
    },
  ];
</script>

<div class="pair">
  <DocsNav {groups} pathname="/docs/docs-kit/docs/" onNavigate={() => {}} />
  <TableOfContents {headings} variant="inline" />
</div>

<style>
  .pair {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
    align-items: start;
  }
</style>
