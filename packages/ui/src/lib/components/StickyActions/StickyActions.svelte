<script lang="ts">
  import type { Snippet } from 'svelte';
  import { keyboardAware } from '../../actions/keyboard-aware.js';

  /**
   * StickyActions — barra de ações primárias de um formulário.
   *
   * Fica colada ao fim do container que rola (`position: sticky; bottom: 0`), com
   * chrome de vidro, respeitando `--ca-safe-bottom` e o teclado virtual
   * (`keyboardAware`). Em telas largas vira uma linha inline, sem chrome.
   *
   * Uso:
   *   <StickyActions show={dirty}>
   *     <Button variant="ghost">Cancelar</Button>
   *     <Button variant="filled">Salvar</Button>
   *   </StickyActions>
   */
  interface Props {
    /** Botões da barra. */
    children: Snippet;
    /** `'end'` junta os botões à direita; `'stretch'` os estica (largura total) em telas de toque. */
    align?: 'end' | 'stretch';
    /** Renderiza a barra só enquanto há algo a confirmar (ex.: formulário alterado). */
    show?: boolean;
    class?: string;
  }

  let { children, align = 'end', show = true, class: className = '' }: Props = $props();
</script>

{#if show}
  <div class="ca-sticky-actions ca-sticky-actions--{align} {className}" use:keyboardAware>
    <div class="ca-sticky-actions__inner">{@render children()}</div>
  </div>
{/if}

<style>
  .ca-sticky-actions {
    position: sticky;
    bottom: 0;
    z-index: var(--ca-z-sticky);
    /* Sangra até as bordas do painel para o blur cobrir o conteúdo que rola por baixo. */
    margin: 0.5rem calc(var(--ca-page-px-sm) * -1) 0;
    padding: 0.75rem max(var(--ca-page-px-sm), var(--ca-safe-right)) calc(0.75rem + var(--ca-safe-bottom)) max(var(--ca-page-px-sm), var(--ca-safe-left));
    background: var(--ca-glass-bg);
    -webkit-backdrop-filter: blur(20px) saturate(1.4);
    backdrop-filter: blur(20px) saturate(1.4);
    box-shadow: inset 0 1px 0 var(--ca-outline-subtle);
  }

  .ca-sticky-actions__inner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
  }

  .ca-sticky-actions--end .ca-sticky-actions__inner {
    justify-content: flex-end;
  }

  .ca-sticky-actions__inner :global(.ca-btn) {
    min-height: var(--ca-touch-target);
  }

  /* Telas de toque: botões esticados; ghost fica compactos ao lado do primário. */
  @media (pointer: coarse) {
    .ca-sticky-actions--stretch .ca-sticky-actions__inner {
      flex-wrap: nowrap;
    }
    .ca-sticky-actions--stretch .ca-sticky-actions__inner > :global(.ca-btn) {
      flex: 1;
      width: 100%;
    }
    .ca-sticky-actions--stretch .ca-sticky-actions__inner > :global(.ca-btn--ghost) {
      flex: 0 0 auto;
      width: auto;
    }
  }

  /* Desktop: linha inline, sem chrome. */
  @media (min-width: 900px) {
    .ca-sticky-actions {
      position: static;
      margin: 0;
      padding: 0;
      background: none;
      -webkit-backdrop-filter: none;
      backdrop-filter: none;
      box-shadow: none;
    }
  }
</style>
