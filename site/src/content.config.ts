import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { GROUPS } from "./lib/nav";

export const collections = {
	docs: defineCollection({
		loader: glob({ pattern: "**/*.mdx", base: "./src/content/docs" }),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			group: z.enum(GROUPS),
			/** Position inside the group; pages without it sort by title after ordered ones. */
			order: z.number().optional(),
		}),
	}),
};
