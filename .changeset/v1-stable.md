---
"@codeatlasdev/ui": major
---

**1.0.0: stable API.** From here on, breaking changes to props, exports, `--ca-*` tokens or the public `ca-*` classes (see `docs/css-api.md`) only land in a major.

### Breaking

- **Default UI strings are English** and come from a typed catalog (`en`, `pt-BR`). Portuguese apps call `setLocale("pt-BR")` once in the root layout; the wording is the same as before. Text props (`label`, `placeholder`, `confirmLabel`, `emptyText`, …) no longer have hardcoded defaults: omit them to use the catalog, pass them to override.
- **`ThemeOptions` is now `Partial<ThemeDefinition>`** (`defineTheme`). `BrandPreset` is removed: use `PresetDefinition` (`{ id, color, label? }`). `brandPresetCSS` output changed (theme islands) and the head style id is `ca-theme` (was `ca-brand-presets`).
- **CSS is layered:** `global.css` declares `@layer ca.reset, ca.tokens, ca.themes, ca.base, ca.components, ca.materials, ca.utilities`. App CSS stays unlayered and wins without `!important`; override a token by declaring `--ca-*` on `:root`.
- **Page background:** `html` paints a solid `--ca-surface-base` and the decorative mesh moved to `body::before` (Safari 26 and the overscroll area sample the root color). `body` is transparent.
- **`MobileHeader` and `BottomNav` are opaque** (`--ca-chrome-surface`) so the browser status bar and toolbar match them.
- **`autofocus` on touch devices** only focuses when the keyboard was primed in the opening tap (`primeKeyboard()`); pass `{ touch: true }` to force. This removes the iOS "focus without keyboard" jump.
- **`responsive`** is `undefined`-width until `init()` runs (no hydration mismatch); derived values treat it as desktop.
- The `.ca-app`-scoped 16px input rule and the `.ca-input-ios-safe` class are gone: every text field is covered globally.

### Theme engine

- `defineTheme()` + `themeCSS()`: typed theme object compiled once to deterministic CSS: brand presets from one hex, fonts, radius multiplier, density, raw token overrides.
- Built-in presets are generated from `theme/builtins.ts` (`bun run --cwd packages/ui themes`; `validate` fails if `styles/themes/*.css` is stale).
- The init script validates stored preset/scheme/style against what the app knows (an old `ca-preset` no longer repaints the app in amber), applies `data-style` before first paint, sets `<meta name="theme-color">`, follows the OS under `system` before hydration and replays runtime tokens.
- Theme islands: `data-theme-scope="light" | "dark"` and `data-preset` on any element, nested in any order.
- `colorScheme.setTokens(vars)` writes one `<style id="ca-runtime-tokens">`, persisted and replayed before paint. `colorScheme.init()` is idempotent and returns a cleanup; storage errors (Safari private mode) no longer throw. `colorScheme.presets` lists valid ids.

### Mobile and WebKit

- Tokens `--ca-safe-top|right|bottom|left`, `--ca-vh` (dvh with vh fallback), `--ca-kb-inset`, `--ca-input-font-size(-sm)`, `--ca-chrome-surface`, `--ca-bottom-nav-h`.
- `viewport` store (on-screen keyboard inset from `visualViewport`, ignores URL-bar and pinch-zoom changes) and the `keyboardAware` action.
- `primeKeyboard()` / `focusTextField()` (from `@codeatlasdev/ui/actions`): open the iOS keyboard from the tap that opens a dialog, sheet or search. Used by `DocsSearch`, `CommandPalette` and `Combobox`.
- Browser chrome color sync: `theme-color` follows the opaque color under the top edge (header, theme island or page) on Chrome/Samsung Android, Safari ≤ 18 and PWAs.
- New components: `StickyActions`, `MobilePane`. `Sheet` swipe-to-dismiss (`swipeToDismiss`), `AuthLayout` `mobileBrand`.
- 44px touch targets for every `Button` size, press feedback on touch, no tap flash, 16px minimum on every text field (no iOS zoom), `-webkit-text-size-adjust`.
- Overlays contain overscroll; `backdrop-filter` falls back to opaque surfaces where unsupported.
- `nativeFeel()` (kit): keyboard-only focus rings, no browser context menu or selection on chrome, `.ca-selectable` opt-in, optional zoom lock for desktop shells; `html[data-ca-surface="transparent"]` for vibrancy windows.

### Integrations

- **Astro:** `caUI(theme)` from `@codeatlasdev/ui/astro` injects the theme before first paint and configures SSR.
- `CodeTabs` accepts `tabs` as data (for MDX/Astro where Svelte context cannot reach children); `CodeSnippet` and code tabs follow the scheme of their context through dual shiki themes.

### Fixes

- Glass lost its blur in production builds: Lightning CSS (Vite 8) drops `backdrop-filter` declared before `-webkit-backdrop-filter`. Order fixed everywhere and guarded by a test.
- `Dialog` body no longer collapses to zero height in WKWebView (Tauri, Safari).
- `Select` no longer puts `aria-required` on the trigger button; required state goes to the form control and the label.
- `isItemActive` handles trailing slashes (`trailingSlash: "always"` sites).
- `Tooltip` meets AA contrast in both schemes (`--ca-tooltip-bg`).
- New tokens `--ca-focus-ring`, `--ca-focus-ring-offset`, `--ca-selection-bg`, `--ca-scrollbar-thumb(-hover)`; reduced motion zeroes `--ca-duration-*`.
