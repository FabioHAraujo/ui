import type { DocsSearchEntry } from "./types.js";

export interface DocsSearchResult {
	href: string;
	title: string;
	context: string;
	kind: "page" | "heading";
}

/** Lowercase and strip diacritics so "configuracao" matches "configuração". */
export const fold = (s: string) =>
	s
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase();

/**
 * Every term must match. Title hits rank above heading hits above body hits.
 * Returns at most `limit` results (pages and their matching headings interleaved by score).
 */
export function searchDocs(
	index: DocsSearchEntry[],
	query: string,
	limit = 12
): DocsSearchResult[] {
	const terms = fold(query).split(/\s+/).filter(Boolean);
	if (!terms.length) return [];
	const scored: { r: DocsSearchResult; score: number }[] = [];
	for (const e of index) {
		const title = fold(e.title);
		const all = fold(
			`${e.title} ${e.description} ${e.headings.map((h) => h.text).join(" ")} ${e.text}`
		);
		if (!terms.every((t) => all.includes(t))) continue;
		const titleScore = terms.filter((t) => title.includes(t)).length;
		scored.push({
			r: { href: e.href, title: e.title, context: e.section, kind: "page" },
			score: 10 + titleScore * 10 + (title.startsWith(terms[0]) ? 5 : 0),
		});
		for (const h of e.headings) {
			const text = fold(h.text);
			if (!terms.every((t) => text.includes(t) || title.includes(t))) continue;
			scored.push({
				r: { href: `${e.href}#${h.id}`, title: h.text, context: e.title, kind: "heading" },
				score: 5 + terms.filter((t) => text.includes(t)).length * 3,
			});
		}
	}
	return scored
		.sort((a, b) => b.score - a.score)
		.slice(0, limit)
		.map((s) => s.r);
}
