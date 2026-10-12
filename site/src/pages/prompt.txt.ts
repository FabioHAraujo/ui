import { AGENT_PROMPT } from "~/data/agent-prompt";

export const GET = () =>
	new Response(`${AGENT_PROMPT}\n`, { headers: { "content-type": "text/plain; charset=utf-8" } });
