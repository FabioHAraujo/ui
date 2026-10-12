// ─── Z-index scale ────────────────────────────────────────────────────────────

export const zIndex = {
	base: 0,
	raised: 10,
	nav: 100,
	dropdown: 1000,
	sticky: 1020,
	fixed: 1030,
	drawer: 1200,
	modal: 1300,
	snackbar: 1400,
	tooltip: 1500,
} as const;

export type ZIndexKey = keyof typeof zIndex;
