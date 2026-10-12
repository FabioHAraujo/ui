export function GET() {
	const body = [
		"User-agent: *",
		"Allow: /",
		"",
		"Sitemap: https://ui.codeatlas.com.br/sitemap-index.xml",
		"",
	].join("\n");
	return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
