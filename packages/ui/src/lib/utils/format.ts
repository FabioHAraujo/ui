// ─── Display formatting helpers ───────────────────────────────────────────────

/**
 * Format a number with locale-aware thousands separator.
 * @example formatNumber(1234567) // '1,234,567'
 * @example formatNumber(1234567, 'pt-BR') // '1.234.567'
 */
export function formatNumber(
	value: number,
	locale = "en-US",
	options?: Intl.NumberFormatOptions
): string {
	return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Format a number as currency.
 * @example formatCurrency(1234.5, 'USD') // '$1,234.50'
 * @example formatCurrency(1234.5, 'BRL', 'pt-BR') // 'R$ 1.234,50'
 */
export function formatCurrency(
	value: number,
	currency = "USD",
	locale = "en-US",
	options?: Omit<Intl.NumberFormatOptions, "style" | "currency">
): string {
	return new Intl.NumberFormat(locale, { style: "currency", currency, ...options }).format(value);
}

/**
 * Format a Date or timestamp as a localized date string.
 * @example formatDate(new Date()) // 'Sep 16, 2026'
 */
export function formatDate(
	value: Date | number | string,
	locale = "en-US",
	options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
): string {
	return new Intl.DateTimeFormat(locale, options).format(new Date(value));
}

/**
 * Format a Date or timestamp as a relative time string.
 * @example formatRelativeTime(Date.now() - 3600_000) // '1 hour ago'
 * @example formatRelativeTime(Date.now() + 86400_000) // 'in 1 day'
 */
export function formatRelativeTime(value: Date | number | string, locale = "en-US"): string {
	const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
	const diff = new Date(value).getTime() - Date.now();
	const abs = Math.abs(diff);

	if (abs < 60_000) return rtf.format(Math.round(diff / 1000), "second");
	if (abs < 3_600_000) return rtf.format(Math.round(diff / 60_000), "minute");
	if (abs < 86_400_000) return rtf.format(Math.round(diff / 3_600_000), "hour");
	if (abs < 2_592_000_000) return rtf.format(Math.round(diff / 86_400_000), "day");
	if (abs < 31_536_000_000) return rtf.format(Math.round(diff / 2_592_000_000), "month");
	return rtf.format(Math.round(diff / 31_536_000_000), "year");
}
