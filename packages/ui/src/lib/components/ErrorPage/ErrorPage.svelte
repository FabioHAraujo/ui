<script lang="ts">
  import { t } from '../../i18n/state.svelte.js';
  import Button from '../Button/Button.svelte';
  import { Home, RefreshCw, AlertTriangle, Search, ServerCrash } from '@lucide/svelte';

  interface Props {
    status?: number;
    message?: string;
    /** Override the title shown above the message */
    title?: string;
    /** Hide the back/home action buttons */
    hideActions?: boolean;
    class?: string;
  }

  let {
    status = 500,
    message,
    title,
    hideActions = false,
    class: className = '',
  }: Props = $props();

  // Derived title + icon per status
  const icons: Record<number, typeof Home> = { 404: Search, 403: AlertTriangle, 500: ServerCrash, 503: ServerCrash };

  // An explicit `message` wins over the preset hint; unknown statuses fall back to a generic title.
  let preset = $derived.by(() => {
    const m = t().errorPage;
    const known = status === 404 || status === 403 || status === 500 || status === 503 ? m[status] : undefined;
    return {
      title: known?.title ?? m.fallbackTitle,
      hint: message ?? known?.hint ?? m.defaultMessage,
      Icon: icons[status] ?? AlertTriangle,
    };
  });
  let displayTitle = $derived(title ?? preset.title);
  let IconComponent = $derived(preset.Icon);

  function goBack() { history.back(); }
  function goHome() { location.href = '/'; }
</script>

<div class="ca-error-page {className}">
  <div class="ca-error-page__inner">
    <!-- Status glow bubble -->
    <div class="ca-error-page__bubble" aria-hidden="true">
      <IconComponent size={32} stroke-width={1.5} />
    </div>

    <p class="ca-error-page__status">{status}</p>
    <h1 class="ca-error-page__title">{displayTitle}</h1>
    <p class="ca-error-page__hint">{preset.hint}</p>

    {#if !hideActions}
      <div class="ca-error-page__actions">
        <Button variant="outlined" onclick={goBack}>
          {#snippet leading()}<RefreshCw size={16} />{/snippet}
          {t().errorPage.goBack}
        </Button>
        <Button onclick={goHome}>
          {#snippet leading()}<Home size={16} />{/snippet}
          {t().errorPage.home}
        </Button>
      </div>
    {/if}
  </div>
</div>

<style>
  .ca-error-page {
    min-height: var(--ca-vh);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .ca-error-page__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 16px;
    max-width: 480px;
  }

  .ca-error-page__bubble {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in oklab, var(--ca-brand-main) 12%, transparent);
    border: 1px solid color-mix(in oklab, var(--ca-brand-main) 25%, transparent);
    color: var(--ca-brand-text);
    -webkit-backdrop-filter: var(--ca-blur-regular);
    backdrop-filter: var(--ca-blur-regular);
    margin-bottom: 8px;
  }

  .ca-error-page__status {
    font-size: var(--ca-font-size-body2);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ca-brand-text);
    margin: 0;
  }

  .ca-error-page__title {
    font-size: clamp(1.5rem, 4vw, 2.25rem);
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 1.15;
    color: var(--ca-text-primary);
    margin: 0;
  }

  .ca-error-page__hint {
    font-size: var(--ca-font-size-body1);
    color: var(--ca-text-secondary);
    line-height: 1.6;
    margin: 0;
    max-width: 360px;
  }

  .ca-error-page__actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 8px;
  }
</style>
