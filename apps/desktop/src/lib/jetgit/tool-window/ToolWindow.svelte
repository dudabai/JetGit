<script lang="ts">
	import { useToolWindowManager } from "$lib/jetgit/tool-window/toolWindowManager.svelte";
	import type { ToolWindowAnchor } from "$lib/jetgit/tool-window/toolWindowManager.svelte";

	interface Props {
		/** Unique identifier for this tool window */
		id: string;
		/** Display title shown in the header bar */
		title: string;
		/** Optional icon character / emoji shown in the header */
		icon?: string;
		/** Docking position */
		anchor?: ToolWindowAnchor;
		/** Main content */
		children?: import("svelte").Snippet;
	}

	const ANCHOR_LABELS: Record<ToolWindowAnchor, string> = {
		left: "Dock Left",
		right: "Dock Right",
		bottom: "Dock Bottom",
		float: "Float",
	};

	const NEXT_ANCHOR: Record<ToolWindowAnchor, ToolWindowAnchor> = {
		left: "bottom",
		bottom: "right",
		right: "float",
		float: "left",
	};

	let { id, title, icon, anchor = "left", children }: Props = $props();

	const manager = useToolWindowManager();
	const win = $derived(manager.windows[id]);

	// Register this window in the manager on first render (idempotent)
	$effect(() => {
		if (!manager.windows[id]) {
			manager.register({ id, title, icon, anchor, visible: true, order: 0 });
		}
	});

	// ── Drag-to-resize logic ────────────────────────────────────────────────
	let dragging = $state(false);
	let startX = $state(0);
	let startY = $state(0);
	let startWidth = $state(0);
	let startHeight = $state(0);

	function onResizeStart(e: MouseEvent) {
		e.preventDefault();
		dragging = true;
		startX = e.clientX;
		startY = e.clientY;
		startWidth = win?.width ?? 280;
		startHeight = win?.height ?? 220;
	}

	function onResizeMove(e: MouseEvent) {
		if (!dragging) return;
		const currentAnchor = win?.anchor ?? anchor;
		if (currentAnchor === "left") {
			manager.setSize(id, startWidth + (e.clientX - startX), startHeight);
		} else if (currentAnchor === "right") {
			manager.setSize(id, startWidth - (e.clientX - startX), startHeight);
		} else if (currentAnchor === "bottom") {
			manager.setSize(id, startWidth, startHeight - (e.clientY - startY));
		}
	}

	function onResizeEnd() {
		dragging = false;
	}

	function cycleAnchor() {
		const current = win?.anchor ?? anchor;
		manager.setAnchor(id, NEXT_ANCHOR[current]);
	}

	function minimize() {
		manager.setVisible(id, false);
	}
</script>

<svelte:window onmousemove={onResizeMove} onmouseup={onResizeEnd} />

{#if win?.visible}
	<div
		class="jb-tool-window"
		class:anchor-bottom={win.anchor === "bottom"}
		style:width={win.anchor === "bottom" ? "100%" : `${win.width}px`}
		style:height={win.anchor === "bottom" ? `${win.height}px` : "100%"}
	>
		<!-- Header -->
		<div class="jb-tool-window-header">
			{#if icon}
				<span class="jb-tool-window-icon">{icon}</span>
			{/if}
			<span class="jb-tool-window-title">{title}</span>
			<div class="jb-tool-window-actions">
				<button
					type="button"
					class="jb-tool-window-action"
					title={ANCHOR_LABELS[win.anchor]}
					onclick={cycleAnchor}
				>
					⊟
				</button>
				<button type="button" class="jb-tool-window-action" title="Minimize" onclick={minimize}>
					−
				</button>
			</div>
		</div>

		<!-- Content -->
		<div class="jb-tool-window-content">
			{#if children}
				{@render children()}
			{/if}
		</div>

		<!-- Resize handle -->
		{#if win.anchor !== "float"}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class={["jb-tool-window-resize", `resize-${win.anchor}`]}
				onmousedown={onResizeStart}
			></div>
		{/if}
	</div>
{/if}

<style>
	.jb-tool-window {
		display: flex;
		position: relative;
		flex-shrink: 0;
		flex-direction: column;
		overflow: hidden;
		border-right: 1px solid var(--jb-border-color, #555);
		background: var(--jb-bg-primary, #2b2b2b);
	}

	.jb-tool-window.anchor-bottom {
		border-top: 1px solid var(--jb-border-color, #555);
		border-right: none;
	}

	.jb-tool-window-header {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		height: var(--jb-tool-window-header-height, 28px);
		padding: 0 4px 0 8px;
		gap: 4px;
		border-bottom: 1px solid var(--jb-border-color, #555);
		background: var(--jb-tool-window-header-bg, #3c3f41);
		cursor: default;
		user-select: none;
	}

	.jb-tool-window-icon {
		flex-shrink: 0;
		font-size: 14px;
	}

	.jb-tool-window-title {
		flex: 1;
		overflow: hidden;
		color: var(--jb-tool-window-header-fg, #bbb);
		font-weight: 600;
		font-size: var(--jb-font-size-sm, 11px);
		font-family: var(--jb-font-family, monospace);
		letter-spacing: 0.05em;
		text-overflow: ellipsis;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.jb-tool-window-actions {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		gap: 2px;
	}

	.jb-tool-window-action {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border: none;
		border-radius: var(--jb-radius-sm, 2px);
		background: transparent;
		color: var(--jb-fg-secondary, #808080);
		font-size: 12px;
		cursor: pointer;
		transition: color var(--jb-transition, 150ms ease);
	}

	.jb-tool-window-action:hover {
		background: var(--jb-bg-hover, rgba(255, 255, 255, 0.07));
		color: var(--jb-fg-primary, #bbb);
	}

	.jb-tool-window-content {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: auto;
	}

	/* Resize handles */
	.jb-tool-window-resize {
		z-index: 10;
		position: absolute;
		background: transparent;
	}

	.resize-left {
		top: 0;
		right: 0;
		width: 4px;
		height: 100%;
		cursor: ew-resize;
	}

	.resize-right {
		top: 0;
		left: 0;
		width: 4px;
		height: 100%;
		cursor: ew-resize;
	}

	.resize-bottom {
		top: 0;
		right: 0;
		left: 0;
		height: 4px;
		cursor: ns-resize;
	}
</style>
