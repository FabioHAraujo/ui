import { loadDocs } from "~/lib/docs";
import { docHref, GROUPS } from "~/lib/nav";

const SITE = "https://ui.codeatlas.com.br";

export async function GET() {
	const { flat } = await loadDocs();
	const lines = [
		"# CodeAtlas UI",
		"",
		"> Open-source Svelte 5 component library (`@codeatlasdev/ui`): page templates, app shell, data tables, charts, forms and overlays, with a Liquid Glass material system, an OKLCH theme engine and native-feeling mobile behavior. Built on bits-ui. Install with `bun add @codeatlasdev/ui`.",
		"",
		`Full documentation in one file: ${SITE}/llms-full.txt`,
		"",
	];
	for (const group of GROUPS) {
		const docs = flat.filter((d) => d.group === group);
		if (!docs.length) continue;
		lines.push(`## ${group}`, "");
		for (const d of docs) lines.push(`- [${d.title}](${SITE}${docHref(d.slug)}): ${d.description}`);
		lines.push("");
	}
	lines.push(
		"## Optional",
		"",
		"- [Agent guide (AGENTES.md)](https://github.com/codeatlasdev/ui/blob/main/AGENTES.md): critical rules, tokens, page template patterns.",
		"- [Source](https://github.com/codeatlasdev/ui): repository, issues and changelog.",
		"- [npm](https://www.npmjs.com/package/@codeatlasdev/ui): published package.",
		""
	);
	return new Response(lines.join("\n"), {
		headers: { "content-type": "text/plain; charset=utf-8" },
	});
}
