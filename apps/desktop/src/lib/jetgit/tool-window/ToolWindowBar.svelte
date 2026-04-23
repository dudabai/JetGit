<script lang="ts">
	import { useToolWindowManager } from "$lib/jetgit/tool-window/toolWindowManager.svelte";
	import type { ToolWindowAnchor } from "$lib/jetgit/tool-window/toolWindowManager.svelte";

	interface Props {
		/** Which side this bar is docked to */
		side: "left" | "right";
	}

	let { side }: Props = $props();

	const manager = useToolWindowManager();
	const allWindows = $derived(manager.getAll());

	function isActive(anchor: ToolWindowAnchor, visible: boolean) {
		return visible && anchor === side;
	}
</script>

<div class={["jb-tool-window-bar", `side-${side}`]}>
	{#each allWindows as win (win.id)}
		<button
			type="button"
			class={["jb-twb-button", isActive(win.anchor, win.visible) && "active"]}
			title={win.title}
			onclick={() => manager.toggle(win.id)}
		>
			{#if win.icon}
				<span class="jb-twb-icon">{win.icon}</span>
			{/if}
			<span class="jb-twb-label">{win.title}</span>
		</button>
	{/each}
</div>

<style>
	.jb-tool-window-bar {
		display: flex;
		flex-shrink: 0;
		flex-direction: column;
		align-items: center;
		width: var(--jb-tool-window-bar-width, 28px);
		padding: 4px 0;
		gap: 2px;
		border-right: 1px solid var(--jb-border-color, #555);
		background: var(--jb-bg-secondary, #313335);
	}

	.jb-tool-window-bar.side-right {
		border-right: none;
		border-left: 1px solid var(--jb-border-color, #555);
	}

	.jb-twb-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 24px;
		min-height: 60px;
		padding: 4px 0;
		transform: rotate(180deg);
		border: none;
		border-radius: var(--jb-radius-sm, 2px);
		background: transparent;
		color: var(--jb-fg-secondary, #808080);
		font-size: var(--jb-font-size-sm, 11px);
		font-family: var(--jb-font-family, monospace);
		text-orientation: mixed;
		cursor: pointer;
		transition: color var(--jb-transition, 150ms ease);
		writing-mode: vertical-lr;
	}

	.jb-twb-button:hover {
		background: var(--jb-bg-hover, rgba(255, 255, 255, 0.07));
		color: var(--jb-fg-primary, #bbb);
	}

	.jb-twb-button.active {
		color: var(--jb-accent, #4b6eaf);
	}

	.jb-twb-icon {
		margin-bottom: 4px;
		transform: none;
		font-size: 14px;
		writing-mode: horizontal-tb;
	}

	.jb-twb-label {
		font-size: var(--jb-font-size-sm, 11px);
	}
</style>
