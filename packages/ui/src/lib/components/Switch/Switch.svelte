<script lang="ts">
  import { Switch } from 'bits-ui';
  import { uid } from '../../utils/index.js';

  interface Props {
    checked?: boolean;
    disabled?: boolean;
    label?: string;
    /** Accessible name when no visible `label` is rendered. */
    'aria-label'?: string;
    'aria-labelledby'?: string;
    class?: string;
    onchange?: (checked: boolean) => void;
  }

  let {
    checked = $bindable(false),
    disabled = false,
    label,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    class: className = '',
    onchange,
  }: Props = $props();

  const switchId = uid('sw');
</script>

<div class="ca-switch-wrapper {className}">
  <Switch.Root
    bind:checked
    {disabled}
    id={switchId}
    aria-label={label ? undefined : ariaLabel}
    aria-labelledby={label ? undefined : ariaLabelledby}
    class="ca-switch"
    onCheckedChange={onchange}
  >
    <Switch.Thumb class="ca-switch__thumb" />
  </Switch.Root>
  {#if label}
    <label for={switchId} class="ca-switch__label" class:ca-switch__label--disabled={disabled}>
      {label}
    </label>
  {/if}
</div>

<style>
  .ca-switch-wrapper {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  :global(.ca-switch) {
    display: inline-flex;
    align-items: center;
    width: 44px;
    height: 24px;
    border-radius: var(--ca-radius-pill);
    background: var(--ca-outline-default);
    border: none;
    cursor: pointer;
    padding: 2px;
    flex-shrink: 0;
    transition: background var(--ca-duration-fast) var(--ca-ease-standard);
    position: relative;
  }

  :global(.ca-switch[data-state='checked']) {
    background: var(--ca-brand-main);
  }

  :global(.ca-switch[disabled]) {
    cursor: not-allowed;
    opacity: 0.45;
  }

  :global(.ca-switch:focus-visible) {
    outline: 2px solid var(--ca-brand-main);
    outline-offset: 2px;
  }

  :global(.ca-switch__thumb) {
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: oklch(1 0 0);
    box-shadow: var(--ca-shadow-sm);
    transition: transform var(--ca-duration-fast) var(--ca-ease-spring);
    transform: translateX(0);
    flex-shrink: 0;
  }

  :global(.ca-switch[data-state='checked'] .ca-switch__thumb) {
    transform: translateX(20px);
  }

  .ca-switch__label {
    font-size: var(--ca-font-size-body2);
    color: var(--ca-text-primary);
    cursor: pointer;
    user-select: none;
  }

  .ca-switch__label--disabled {
    color: var(--ca-text-disabled);
    cursor: not-allowed;
  }
</style>
