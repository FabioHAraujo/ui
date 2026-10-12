import type { Component } from "svelte";

/** Props the library passes to icon components. */
export type IconProps = {
	size?: number | string;
	class?: string;
	"stroke-width"?: number | string;
};

/**
 * Any Svelte 5 icon component accepting {@link IconProps}.
 * Structural, so `@lucide/svelte` icons (and compatible libraries) fit.
 */
export type IconComponent = Component<IconProps>;
