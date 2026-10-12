<script lang="ts">
  import { t } from '../../i18n/state.svelte.js';
  import { AlertDialog } from 'bits-ui';
  import Button from '../Button/Button.svelte';
  import '../Dialog/dialog.css';

  /**
   * AlertDialog — confirmação que exige resposta explícita (role="alertdialog").
   *
   * Diferente do Dialog: sem botão "X", clique fora não fecha, foco inicial no
   * conteúdo. Escape e Cancelar fecham (e disparam `oncancel`) (exceto enquanto `pending`).
   *
   * `onconfirm` pode ser async: enquanto a promise está pendente o botão de
   * confirmar mostra spinner, Cancelar fica desabilitado e o diálogo não fecha.
   * Se resolver, fecha; se lançar, permanece aberto (o erro é relançado).
   * Passe `pending` para controlar o estado externamente.
   *
   * Uso:
   *   <AlertDialog
   *     bind:open
   *     title="Excluir item?"
   *     description="Esta ação não pode ser desfeita."
   *     confirmLabel="Excluir"
   *     destructive
   *     onconfirm={() => api.remove(id)}
   *   />
   */

  interface Props {
    open?:         boolean;
    title:         string;
    description?:  string;
    confirmLabel?: string;
    cancelLabel?:  string;
    /** Confirm button uses the destructive variant. */
    destructive?:  boolean;
    /** Controlled pending state. When omitted, pending is tracked while `onconfirm` is awaited. */
    pending?:      boolean;
    /** Runs on confirm. Dialog closes when it resolves (sync or async). */
    onconfirm:     () => void | Promise<void>;
    oncancel?:     () => void;
    class?:        string;
  }

  let {
    open         = $bindable(false),
    title,
    description,
    confirmLabel,
    cancelLabel,
    destructive  = false,
    pending      = false,
    onconfirm,
    oncancel,
    class: className = '',
  }: Props = $props();

  let internalPending = $state(false);
  const isPending = $derived(pending || internalPending);

  async function confirm() {
    if (isPending) return;
    internalPending = true;
    try {
      await onconfirm();
      open = false;
    } finally {
      internalPending = false;
    }
  }

  function cancel() {
    if (isPending) return;
    open = false;
    oncancel?.();
  }

  function handleOpenChange(next: boolean) {
    // Escape while a request is in flight must not dismiss the dialog.
    if (!next && isPending) {
      open = true;
      return;
    }
    // Escape is a cancel (Cancel button and confirm close `open` directly).
    if (!next) oncancel?.();
  }
</script>

<AlertDialog.Root bind:open onOpenChange={handleOpenChange}>
  <AlertDialog.Portal>
    <AlertDialog.Overlay class="ca-overlay" />
    <AlertDialog.Content
      class="ca-dialog ca-dialog--sm ca-alert-dialog {className}"
      style="--dialog-max-w:400px"
      aria-busy={isPending}
    >
      <div class="ca-dialog__header">
        <AlertDialog.Title class="ca-dialog__title">{title}</AlertDialog.Title>
      </div>

      {#if description}
        <AlertDialog.Description class="ca-dialog__description">{description}</AlertDialog.Description>
      {/if}

      <div class="ca-dialog__actions ca-alert-dialog__actions">
        <Button variant="ghost" disabled={isPending} onclick={cancel}>{cancelLabel ?? t().alertDialog.cancel}</Button>
        <Button
          variant={destructive ? 'destructive' : 'filled'}
          loading={isPending}
          onclick={confirm}
        >
          {confirmLabel ?? t().alertDialog.confirm}
        </Button>
      </div>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>
