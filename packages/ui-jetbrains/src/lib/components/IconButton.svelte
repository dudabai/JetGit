<script lang="ts" module>
	/** Props for the JetBrains-style IconButton component */
	export interface Props {
		/** Accessible label for the button (used as title and aria-label) */
		label: string;
		/** Whether the button is active / toggled */
		active?: boolean;
		/** Whether the button is disabled */
		disabled?: boolean;
		/** Additional CSS class */
		class?: string;
		/** Click handler */
		onclick?: (e: MouseEvent) => void;
		/** Icon content (SVG or text) */
		children?: import("svelte").Snippet;
	}
</script>

<script lang="ts">
	let {
		label,
		active = false,
		disabled = false,
		class: className = "",
		onclick,
		children,
	}: Props = $props();
</script>

<button
	type="button"
	title={label}
	aria-label={label}
	aria-pressed={active}
	{disabled}
	class={["jb-icon-button", active && "active", className]}
	onclick={disabled ? undefined : onclick}
>
	{#if children}
		{@render children()}
	{/if}
</button>

<style>
	.jb-icon-button {
		display: inline-flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		padding: 0;
		border: none;
		border-radius: var(--jb-radius-sm, 2px);
		background: transparent;
		color: var(--jb-fg-secondary, #808080);
		cursor: pointer;
		transition: background var(--jb-transition, 150ms ease);
	}

	.jb-icon-button:hover:not(:disabled) {
		background: var(--jb-bg-hover, rgba(255, 255, 255, 0.07));
		color: var(--jb-fg-primary, #bbb);
	}

	.jb-icon-button.active {
		color: var(--jb-accent, #4b6eaf);
	}

	.jb-icon-button:disabled {
		cursor: not-allowed;
		opacity: 0.4;
	}
</style>
