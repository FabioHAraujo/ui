// ─── Shiki highlighter singleton ─────────────────────────────────────────────
import type { Highlighter } from "shiki";

let _promise: Promise<Highlighter> | null = null;

export function getHighlighter(): Promise<Highlighter> {
	if (!_promise) {
		_promise = import("shiki").then(({ createHighlighter }) =>
			createHighlighter({
				themes: ["github-dark-high-contrast", "github-light-high-contrast"],
				langs: ["svelte", "typescript", "javascript", "css", "html", "bash", "json", "sh"],
			})
		);
	}
	return _promise;
}
