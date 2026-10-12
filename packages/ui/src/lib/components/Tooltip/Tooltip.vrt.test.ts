import { page } from "vitest/browser";
import { overlayVrt } from "../../../../tests/vrt";
import Matrix from "./TooltipMatrix.test.svelte";

overlayVrt(
	"Tooltip",
	Matrix,
	async () => {
		await page.getByRole("button").hover();
	},
	"tooltip"
);
