<script lang="ts">
	// Quick start: real CodeTabs/CodeTab/Steps from the package. Code arrives pre-highlighted
	// (shiki, at build time) so the page ships no highlighter.
	import { CodeTab, CodeTabs, Steps } from "@codeatlasdev/ui";

	interface Block {
		label: string;
		html: string;
	}
	interface Props {
		install: Block[];
		setup: Block[];
	}
	let { install, setup }: Props = $props();
</script>

<Steps>
	<ol>
		<li>
			<strong>Install the package</strong>
			<CodeTabs sync="pm">
				{#each install as b (b.label)}
					<CodeTab label={b.label}>{@html b.html}</CodeTab>
				{/each}
			</CodeTabs>
		</li>
		<li>
			<strong>Wire the theme into your framework</strong>
			<CodeTabs sync="framework">
				{#each setup as b (b.label)}
					<CodeTab label={b.label}>{@html b.html}</CodeTab>
				{/each}
			</CodeTabs>
		</li>
		<li>
			<strong>Import the stylesheet and start the theme store</strong>
			<p class="qs__note">
				In your root layout: <code>import "@codeatlasdev/ui/styles/global.css"</code> and call
				<code>colorScheme.init()</code> once on mount. That is the whole setup.
			</p>
		</li>
	</ol>
</Steps>

<style>
	.qs__note {
		margin: var(--ca-space-2) 0 0;
		color: var(--ca-text-secondary);
		font-size: var(--ca-font-size-body2);
	}
	.qs__note code {
		font-family: var(--ca-font-mono);
		color: var(--ca-text-primary);
		overflow-wrap: anywhere;
	}
</style>
