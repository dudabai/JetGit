<script lang="ts" module>
	/** Props for the JetBrains-style Popup component */
	export interface Props {
		/** Whether the popup is visible */
		open?: boolean;
		/** Popup title */
		title?: string;
		/** Called when the user requests to close the popup */
		onClose?: () => void;
		/** Popup content */
		children?: import("svelte").Snippet;
		/** Optional footer content */
		footer?: import("svelte").Snippet;
	}
</script>

<script lang="ts">
	let { open = false, title, onClose, children, footer }: Props = $props();

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Escape") {
			onClose?.();
		}
	}
</script>

<svelte:window onkeydown={open ? handleKeydown : undefined} />

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div class="jb-popup-overlay" onclick={onClose}></div>
	<div class="jb-popup" role="dialog" aria-modal="true" aria-label={title}>
		{#if title}
			<div class="jb-popup-header">
				<span class="jb-popup-title">{title}</span>
				<button type="button" class="jb-popup-close" aria-label="Close" onclick={onClose}>✕</button>
			</div>
		{/if}
		<div class="jb-popup-body">
			{#if children}
				{@render children()}
			{/if}
		</div>
		{#if footer}
			<div class="jb-popup-footer">
				{@render footer()}
			</div>
		{/if}
	</div>
{/if}

<style>
	.jb-popup-overlay {
		z-index: 999;
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.4);
	}

	.jb-popup {
		display: flex;
		z-index: 1000;
		position: fixed;
		top: 50%;
		left: 50%;
		flex-direction: column;
		min-width: 300px;
		max-width: 90vw;
		max-height: 80vh;
		overflow: hidden;
		transform: translate(-50%, -50%);
		border: 1px solid var(--jb-border-color, #555);
		border-radius: var(--jb-radius, 4px);
		background: var(--jb-bg-tool-window, #3c3f41);
		box-shadow: var(--jb-shadow, 0 2px 8px rgba(0, 0, 0, 0.4));
		color: var(--jb-fg-primary, #bbb);
		font-size: var(--jb-font-size, 13px);
		font-family: var(--jb-font-family, monospace);
	}

	.jb-popup-header {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: space-between;
		height: var(--jb-tool-window-header-height, 28px);
		padding: 0 8px 0 12px;
		border-bottom: 1px solid var(--jb-border-color, #555);
		background: var(--jb-tool-window-header-bg, #3c3f41);
	}

	.jb-popup-title {
		font-weight: 600;
		font-size: var(--jb-font-size-sm, 11px);
		letter-spacing: 0.05em;
		text-transform: uppercase;
		opacity: 0.8;
	}

	.jb-popup-close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border: none;
		border-radius: var(--jb-radius-sm, 2px);
		background: transparent;
		color: var(--jb-fg-secondary, #808080);
		font-size: 10px;
		cursor: pointer;
		transition: color var(--jb-transition, 150ms ease);
	}

	.jb-popup-close:hover {
		background: var(--jb-bg-hover, rgba(255, 255, 255, 0.07));
		color: var(--jb-fg-primary, #bbb);
	}

	.jb-popup-body {
		flex: 1;
		padding: 12px;
		overflow: auto;
	}

	.jb-popup-footer {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: flex-end;
		padding: 8px 12px;
		gap: 8px;
		border-top: 1px solid var(--jb-border-color, #555);
	}
</style>
