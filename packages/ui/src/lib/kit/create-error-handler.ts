// ─── SvelteKit handleError helper ────────────────────────────────────────────
// Provides a typed handleError hook factory that enriches errors with
// optional code + id, and optionally reports to a callback.
//
// Usage in src/hooks.server.ts:
//
//   import { createErrorHandler } from '@codeatlasdev/ui/kit';
//   export const handleError = createErrorHandler();
//
//   // With reporting:
//   export const handleError = createErrorHandler({
//     report: (error, event) => console.error(error, event.url.pathname),
//   });

import { t } from "../i18n/state.svelte.js";

export interface CaError {
	message: string;
	code?: string;
	id?: string;
}

export interface CreateErrorHandlerOptions {
	/**
	 * Called for every unexpected error. Use to send to Sentry, LogRocket, etc.
	 * The error has already been sanitized — stack traces are not included.
	 */
	report?: (error: CaError, event: { url: URL; route: { id: string | null } }) => void;

	/**
	 * Override the default "Internal Error" message shown to users.
	 * @default 'An unexpected error occurred.'
	 */
	defaultMessage?: string;
}

export function createErrorHandler(options: CreateErrorHandlerOptions = {}) {
	const { report, defaultMessage } = options;

	return function handleError({
		error,
		event,
		status,
	}: {
		error: unknown;
		event: { url: URL; route: { id: string | null } };
		status: number;
	}): CaError {
		const message =
			error instanceof Error
				? error.message
				: typeof error === "string"
					? error
					: (defaultMessage ?? t().kit.defaultError);

		// Don't expose internal messages for 5xx errors
		const safeMessage = status >= 500 ? (defaultMessage ?? t().kit.defaultError) : message;

		const enriched: CaError = {
			message: safeMessage,
			code: status >= 500 ? "INTERNAL_ERROR" : "CLIENT_ERROR",
			id: crypto.randomUUID(),
		};

		report?.(enriched, event);

		return enriched;
	};
}
