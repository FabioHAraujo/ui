<script lang="ts">
  import { RadioGroup } from '@codeatlasdev/ui';

  let answer = $state('yes');

  const yesNo = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
    { value: 'maybe', label: 'Maybe', disabled: true },
  ];

  const fruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];
</script>

<RadioGroup items={yesNo} bind:value={answer} orientation="horizontal" />
<RadioGroup items={fruits} value="banana" disabled />
