import { getCollection } from "astro:content";
import { buildNav, type DocMeta } from "./nav";

export async function loadDocs() {
	const entries = await getCollection("docs");
	const metas: DocMeta[] = entries.map((e) => ({ slug: e.id, ...e.data }));
	return { entries, ...buildNav(metas) };
}
