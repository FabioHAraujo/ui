<script lang="ts">
  import { t } from '../../i18n/state.svelte.js';
  import type { Snippet } from 'svelte';
  import { ArrowLeft } from '@lucide/svelte';
  import { tick } from 'svelte';
  import { keyboardAware } from '../../actions/keyboard-aware.js';
  import IconButton from '../Button/IconButton.svelte';
  import MobileHeader from '../AppShell/MobileHeader.svelte';

  /**
   * MobilePane — tela cheia acima do shell para drill-down no mobile
   * (thread de chat, histórico, detalhe). Substitui `position: fixed` feito à mão.
   *
   * Header com botão voltar, conteúdo com scroll próprio (`overscroll-behavior: contain`),
   * safe-area em todos os lados e respeito ao teclado virtual. Escape fecha; o foco
   * entra no painel ao abrir e volta ao elemento anterior ao fechar.
   *
   * Uso:
   *   <MobilePane bind:open title="Maria" onback={() => (chatId = null)}>
   *     <Messages />
   *   </MobilePane>
   */
  interface Props {
    /** Visibilidade (bindable). O botão voltar e Escape colocam em `false`. */
    open?: boolean;
    /** Título do header e nome acessível do painel. */
    title: string;
    /** Chamado depois que o botão voltar ou Escape fecham o painel. */
    onback?: () => void;
    /** Corpo rolável. */
    children: Snippet;
    /** Lado direito do header. */
    actions?: Snippet;
    /** Substitui o texto do título no header (ex.: avatar + nome), `title` segue como nome acessível. */
    headerTitle?: Snippet;
    /**
     * `true` (padrão): o corpo rola. `false`: o corpo é um flex column sem scroll, para
     * layouts com área rolável própria e compositor fixo (chat).
     */
    scroll?: boolean;
    class?: string;
  }

  let {
    open = $bindable(false),
    title,
    onback,
    children,
    actions,
    headerTitle,
    scroll = true,
    class: className = '',
  }: Props = $props();

  let pane = $state<HTMLElement>();
  let previous: HTMLElement | null = null;

  function close() {
    open = false;
    onback?.();
  }

  function onkeydown(e: KeyboardEvent) {
    if (e.key !== 'Escape' || e.defaultPrevented) return;
    e.preventDefault();
    close();
  }

  // Foco entra ao abrir e volta ao elemento anterior ao fechar/desmontar.
  $effect(() => {
    if (!open) return;
    previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    tick().then(() => pane?.focus({ preventScroll: true }));
    return () => {
      if (previous?.isConnected) previous.focus({ preventScroll: true });
      previous = null;
    };
  });
</script>

{#if open}
  <div
    bind:this={pane}
    class="ca-mobile-pane {className}"
    role="dialog"
    aria-label={title}
    tabindex="-1"
    {onkeydown}
    use:keyboardAware
  >
    <MobileHeader class="ca-mobile-pane__header" title={title} titleSlot={headerTitle}>
      {#snippet leading()}
        <IconButton variant="text" aria-label={t().mobilePane.back} onclick={close}>
          <ArrowLeft size={22} aria-hidden="true" />
        </IconButton>
      {/snippet}
      {#snippet trailing()}
        {#if actions}{@render actions()}{/if}
      {/snippet}
    </MobileHeader>

    <div class="ca-mobile-pane__body" class:ca-mobile-pane__body--fixed={!scroll}>
      {@render children()}
    </div>
  </div>
{/if}

<style>
  .ca-mobile-pane {
    position: fixed;
    inset: 0;
    z-index: var(--ca-z-fixed);
    height: var(--ca-vh);
    display: flex;
    flex-direction: column;
    background: var(--ca-surface-base);
    outline: none;
  }

  /* O header já soma --ca-safe-top/left/right. Dentro de um flex column ele não deve crescer. */
  .ca-mobile-pane :global(.ca-mobile-pane__header) {
    flex: 0 0 auto;
  }

  .ca-mobile-pane__body {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding-bottom: var(--ca-safe-bottom);
    padding-left: var(--ca-safe-left);
    padding-right: var(--ca-safe-right);
  }

  .ca-mobile-pane__body--fixed {
    overflow: hidden;
  }
</style>
