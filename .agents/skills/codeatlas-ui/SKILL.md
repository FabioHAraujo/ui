---
name: codeatlas-ui
description: Use when building any UI with @codeatlasdev/ui — components, layouts, pages, navigation.
globs: ["**/*.svelte", "**/routes/**/*.svelte", "**/components/**/*.svelte"]
alwaysApply: false
---

# @codeatlasdev/ui

Svelte 5 UI framework. Components are self-contained and prop-driven. Compose them like Lego — don't fight them with CSS.

## When to use
- Building any Svelte page or component that imports from `@codeatlasdev/ui`
- Choosing the right page layout (AppList vs AppForm vs AppSettings vs PageShell)
- Setting up AppShell navigation
- Adding charts, tables, forms, overlays

## Non-negotiable rules

1. **Never write layout CSS.** Use `Grid`, `Row`, `Stack` with gap/cols props.
2. **Never use arbitrary colors.** Use `--ca-*` semantic tokens or component variants.
3. **Never add `padding:` or `margin:` inline.** Use component props or `--ca-space-N` tokens.
4. **Never put AppShellLayout in a shared layout.** Only in authenticated route layouts (e.g. `painel/+layout.svelte`).
5. **CSS imports go once, in the root layout only.**
6. **Import from `@codeatlasdev/ui`** — never from internal paths like `../../../components/Button`.
7. **Never combine `will-change: transform` with `backdrop-filter`.** Kills glass blur.

## Setup (root layout, once)

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import '@codeatlasdev/ui/styles/global.css';
  // global.css already includes materials.css, themes and utilities
  import { colorScheme } from '@codeatlasdev/ui';
  import { onMount } from 'svelte';
  let { children } = $props();
  onMount(() => colorScheme.init());
</script>
{@render children()}
```

```ts
// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { caThemePlugin } from '@codeatlasdev/ui/vite';
// caThemePlugin: anti-FOUC script + ssr.noExternal for @tanstack/svelte-table and shiki
export default defineConfig({ plugins: [sveltekit(), caThemePlugin()] });

// src/hooks.server.ts: injects the theme script into SSR/prerendered pages
import { sequence } from '@sveltejs/kit/hooks';
import { caThemeHandle } from '@codeatlasdev/ui/kit';
export const handle = sequence(caThemeHandle());
```

Product with its own brand color? Pass the same `ThemeOptions` to both: `caThemeHandle(theme)` and `caThemePlugin(theme)`, with `theme = { presets: [{ id: "acme", color: "#2563eb" }], defaultPreset: "acme", defaultScheme: "system" }`. The full light/dark token set is generated from the hex. Put the logo in `AppShellLayout` with `{#snippet brand()}`.

## Heavy components live in subpaths

Charts, DataTable and CodeSnippet are NOT in the root import. Each needs its own peer installed.

| import from | components | install |
|---|---|---|
| `@codeatlasdev/ui/charts` | `LineChart` `BarChart` `PieChart` `ScatterChart` `HeatmapChart` `GaugeChart` `RadarChart` `Sparkline` + chart types | `echarts` |
| `@codeatlasdev/ui/table` | `DataTable*`, `Table`, `createCaTable`, `createCaColumnHelper`, `caTableFeatures`, `PaginationState`, `SortingState` | `@tanstack/svelte-table` |
| `@codeatlasdev/ui/code` | `CodeSnippet` | `shiki` |

`SimpleTable` and `UserCell` stay in the root import and need nothing extra.

## Companion files

- [LAYOUT.md](./LAYOUT.md) — Grid, Row, Stack — all props and composition patterns
- [PAGE-TEMPLATES.md](./PAGE-TEMPLATES.md) — AppList, AppForm, AppSettings, PageShell
- [APPSHELL.md](./APPSHELL.md) — navigation shell setup
- [COMPONENTS.md](./COMPONENTS.md) — Button, inputs, display, overlays — props and variants
- [ANTIPATTERNS.md](./ANTIPATTERNS.md) — explicit don'ts with corrected alternatives
