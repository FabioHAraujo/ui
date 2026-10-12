<script lang="ts">
	import FileUpload from "./FileUpload.svelte";

	const files = [
		new File([new Uint8Array(2048)], "relatorio.pdf", { type: "application/pdf" }),
		new File([new Uint8Array(51200)], "foto.png", { type: "image/png" }),
	];
</script>

<div
	data-testid="matrix"
	style="display:grid;gap:16px;padding:16px;width:720px;grid-template-columns:repeat(2,1fr)"
>
	<FileUpload />
	<FileUpload hint="PNG ou JPG até 5 MB" />
	<FileUpload accept="image/*" />
	<FileUpload disabled />
	<FileUpload label="Anexos" multiple {files} />
	<FileUpload label="Imagens" accept="image/*" hint="Máx. 2 MB" files={[files[1]]} />
</div>
