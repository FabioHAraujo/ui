<script lang="ts">
  import { TextArea } from '@codeatlasdev/ui';

  let bio = $state('');
  let summary = $state('');
  let feedback = $state('');
  let fixed = $state('This textarea cannot resize.');
</script>

<div class="col">
  <TextArea label="Feedback" description="Max 500 characters." bind:value={feedback} />
  <TextArea
    label="Bio"
    bind:value={bio}
    error="Bio must be at least 20 characters."
    description="Tell us about yourself."
  />
  <TextArea label="Summary" required bind:value={summary} />
  <TextArea label="Read-only content" value="Cannot be edited." readonly />
  <TextArea label="Disabled content" value="Cannot be edited." disabled />
  <TextArea label="Fixed" bind:value={fixed} resize="none" rows={3} />
</div>

<style>
  .col {
    display: flex;
    flex-direction: column;
    gap: var(--ca-space-4);
    width: 100%;
    max-width: 480px;
  }
</style>
