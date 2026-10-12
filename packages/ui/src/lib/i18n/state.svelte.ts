// ─── i18n — built-in UI strings ──────────────────────────────────────────────
//
// One module-level `$state` shared by every island/app on the page, so components re-render when
// the locale changes. Default locale is English.
//
//   setLocale('pt-BR');                                       // root layout of a pt app
//   setLocale('en', { docs: { toc: 'In this article' } });    // deep-merged override
//
// Components read `t().<group>.<key>`; explicit props always win over the catalog.

import { en } from "./en.js";
import { ptBR } from "./pt-BR.js";

type Widen<T> = T extends string
	? string
	: T extends (...args: infer A) => string
		? (...args: A) => string
		: { -readonly [K in keyof T]: Widen<T[K]> };

/** Full message shape (string literals widened so other locales can translate). */
export type Messages = Widen<typeof en>;

type DeepPartial<T> = T extends (...args: never[]) => unknown
	? T
	: T extends object
		? { [K in keyof T]?: DeepPartial<T[K]> }
		: T;

/** Partial, deep override accepted by `setLocale`. */
export type MessagesOverride = DeepPartial<Messages>;

export type Locale = "en" | "pt-BR";

const catalogs: Record<Locale, Messages> = { en: en as Messages, "pt-BR": ptBR };

function isPlainObject(v: unknown): v is Record<string, unknown> {
	return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Deep merge; `over` wins. Functions and primitives replace, plain objects recurse. */
function merge<T>(base: T, over: unknown): T {
	if (!isPlainObject(base) || !isPlainObject(over)) return (over ?? base) as T;
	const out: Record<string, unknown> = { ...base };
	for (const [k, v] of Object.entries(over)) {
		if (v === undefined) continue;
		out[k] = k in base ? merge((base as Record<string, unknown>)[k], v) : v;
	}
	return out as T;
}

let current = $state<Locale>("en");
let overrides = $state.raw<MessagesOverride | undefined>(undefined);
const messages = $derived<Messages>(
	overrides ? merge(catalogs[current], overrides) : catalogs[current]
);

/**
 * Sets the UI language. `overrides` is deep-merged over the locale's catalog; calling `setLocale`
 * again replaces any previous overrides.
 */
export function setLocale(next: Locale, override?: MessagesOverride): void {
	if (!(next in catalogs)) {
		throw new Error(
			`[codeatlasdev/ui] unknown locale "${next}" (expected ${Object.keys(catalogs).join(" | ")})`
		);
	}
	current = next;
	overrides = override;
}

/** Reactive current locale. */
export const locale = {
	get value(): Locale {
		return current;
	},
};

/** Reactive message accessor: `t().docs.toc`. Read it inside `$derived`/markup so it re-renders. */
export function t(): Messages {
	return messages;
}
