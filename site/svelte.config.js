import { vitePreprocess } from "@astrojs/svelte";

export default {
	preprocess: vitePreprocess(),
	// Accessibility warnings are errors: a demo that ships an a11y bug fails the build.
	onwarn: (w, handler) => {
		if (w.code.startsWith("a11y_"))
			throw new Error(`${w.filename}:${w.start?.line} ${w.code}: ${w.message}`);
		handler(w);
	},
};
