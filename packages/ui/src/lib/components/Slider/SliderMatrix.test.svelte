<script lang="ts">
	import Slider from "./Slider.svelte";
</script>

<div
	data-testid="matrix"
	style="display:grid;gap:24px;padding:16px;width:480px;grid-template-columns:1fr"
>
	<Slider value={0} />
	<Slider value={50} />
	<Slider value={100} />
	<Slider values={[25, 75]} />
	<Slider value={40} step={10} />
	<Slider value={50} disabled />
	<Slider values={[20, 60]} disabled />
</div>
