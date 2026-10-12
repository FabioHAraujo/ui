<script lang="ts">
  import { Popover, Button, TextField, Stack, Row } from '@codeatlasdev/ui';
</script>

<Popover side="bottom" align="start">
  {#snippet triggerChild(props)}<Button variant="filled" {...props}>Edit label</Button>{/snippet}
  <Stack gap={12}>
    <TextField label="Label name" placeholder="e.g. Priority" />
    <Row gap={8} justify="flex-end">
      <Button size="sm" variant="ghost">Cancel</Button>
      <Button size="sm" variant="filled">Save</Button>
    </Row>
  </Stack>
</Popover>
