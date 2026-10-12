<script lang="ts">
  import { Badge, IconButton, Row } from '@codeatlasdev/ui';
  import { Bell } from '@lucide/svelte';
</script>

<Row gap={16} align="center" wrap>
  <Badge count={5} color="brand"><IconButton aria-label="Notifications"><Bell size={20} /></IconButton></Badge>
  <Badge count={5} color="success"><IconButton aria-label="Notifications"><Bell size={20} /></IconButton></Badge>
  <Badge count={5} color="warning"><IconButton aria-label="Notifications"><Bell size={20} /></IconButton></Badge>
  <Badge count={5} color="error"><IconButton aria-label="Notifications"><Bell size={20} /></IconButton></Badge>
</Row>
