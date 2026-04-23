<script lang="ts">
	import ToolWindowBar from "$lib/jetgit/tool-window/ToolWindowBar.svelte";
	import { useToolWindowManager } from "$lib/jetgit/tool-window/toolWindowManager.svelte";

	interface Props {
		/** Main application content (center area) */
		children?: import("svelte").Snippet;
		/** Snippets rendered inside left tool windows */
		leftContent?: import("svelte").Snippet;
		/** Snippets rendered inside right tool windows */
		rightContent?: import("svelte").Snippet;
		/** Snippets rendered inside bottom tool windows */
		bottomContent?: import("svelte").Snippet;
	}

	let { children, leftContent, rightContent, bottomContent }: Props = $props();

	const manager = useToolWindowManager();
	const leftWindows = $derived(manager.getByAnchor("left"));
	const rightWindows = $derived(manager.getByAnchor("right"));
	const bottomWindows = $derived(manager.getByAnchor("bottom"));
</script>

<div class="jb-host">
	<!-- Left bar + left tool windows -->
	<div class="jb-host-left-area">
		<ToolWindowBar side="left" />
		{#if leftWindows.length > 0}
			<div class="jb-host-left-windows">
				{#if leftContent}
					{@render leftContent()}
				{/if}
			</div>
		{/if}
	</div>

	<!-- Center + bottom area -->
	<div class="jb-host-main">
		<!-- Top row: center content -->
		<div class="jb-host-center">
			{#if children}
				{@render children()}
			{/if}
		</div>

		<!-- Bottom row: bottom tool windows -->
		{#if bottomWindows.length > 0}
			<div class="jb-host-bottom">
				{#if bottomContent}
					{@render bottomContent()}
				{/if}
			</div>
		{/if}
	</div>

	<!-- Right tool windows + right bar -->
	<div class="jb-host-right-area">
		{#if rightWindows.length > 0}
			<div class="jb-host-right-windows">
				{#if rightContent}
					{@render rightContent()}
				{/if}
			</div>
		{/if}
		<ToolWindowBar side="right" />
	</div>
</div>

<style>
	.jb-host {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: var(--jb-bg-primary, #2b2b2b);
		color: var(--jb-fg-primary, #bbb);
		font-size: var(--jb-font-size, 13px);
		font-family: var(--jb-font-family, monospace);
	}

	.jb-host-left-area {
		display: flex;
		flex-shrink: 0;
		flex-direction: row;
	}

	.jb-host-left-windows {
		display: flex;
		flex-shrink: 0;
		flex-direction: row;
		overflow: hidden;
	}

	.jb-host-main {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-width: 0;
		overflow: hidden;
	}

	.jb-host-center {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
	}

	.jb-host-bottom {
		display: flex;
		flex-shrink: 0;
		flex-direction: column;
		overflow: hidden;
	}

	.jb-host-right-area {
		display: flex;
		flex-shrink: 0;
		flex-direction: row;
	}

	.jb-host-right-windows {
		display: flex;
		flex-shrink: 0;
		flex-direction: row;
		overflow: hidden;
	}
</style>
