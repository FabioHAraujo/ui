<script lang="ts">
	import Stepper from "./Stepper.svelte";

	const steps = [
		{ label: "Conta", description: "Dados básicos" },
		{ label: "Endereço", description: "Onde entregar" },
		{ label: "Pagamento", description: "Forma de pagamento" },
		{ label: "Revisão" },
	];
</script>

<div data-testid="matrix" style="display:grid;gap:32px;padding:16px;width:960px">
	<Stepper {steps} current={0} />
	<Stepper {steps} current={2} />
	<Stepper {steps} current={3} />
	<Stepper steps={[{ label: "Um" }, { label: "Dois" }]} current={1} />
</div>
