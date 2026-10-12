import type { DocsSearchEntry } from "@codeatlasdev/ui";
import { loadDocs } from "~/lib/docs";
import { docHref } from "~/lib/nav";

const strip = (md: string) =>
	md
		.replace(/^import .*$/gm, "")
		.replace(/<[^>]+>/g, " ")
		.replace(/```[\s\S]*?```/g, " ")
		.replace(/[#*_`>[\]()-]/g, " ")
		.replace(/\s+/g, " ")
		.trim();

export async function GET() {
	const { entries } = await loadDocs();
	const index: DocsSearchEntry[] = entries.map((e) => ({
		href: docHref(e.id),
		title: e.data.title,
		section: e.data.group,
		description: e.data.description,
		headings: [...(e.body ?? "").matchAll(/^#{2,3} (.+)$/gm)].map((m) => ({
			text: m[1],
			id: m[1]
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/^-|-$/g, ""),
		})),
		text: strip(e.body ?? ""),
	}));
	return new Response(JSON.stringify(index), { headers: { "content-type": "application/json" } });
}
