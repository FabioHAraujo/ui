<script lang="ts">
  import { Stepper, Button, GlassCard, Stack, Row } from '@codeatlasdev/ui';

  let step = $state(0);
  const steps = [{ label: 'Account' }, { label: 'Profile' }, { label: 'Billing' }, { label: 'Review' }];
</script>

<GlassCard padding="24px" full>
  <Stack gap={24}>
    <Stepper {steps} bind:current={step} />
    <div class="body">
      <p>Step {step + 1}: {steps[step].label}</p>
    </div>
    <Row gap={8} justify="flex-end">
      <Button variant="ghost" disabled={step <= 0} onclick={() => step--}>Back</Button>
      <Button variant="filled" disabled={step >= steps.length - 1} onclick={() => step++}>
        {step < steps.length - 1 ? 'Next' : 'Finish'}
      </Button>
    </Row>
  </Stack>
</GlassCard>

<style>
  .body { min-height: 80px; display: flex; align-items: center; padding: 0 4px; }
  .body p { margin: 0; font-size: var(--ca-font-size-body1); color: var(--ca-text-secondary); }
</style>
