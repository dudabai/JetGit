<script lang="ts" module>
	/** Props for the JetBrains-style Button component */
	export interface Props {
		/** Button label text (alternative to children snippet) */
		label?: string;
		/** Whether the button is disabled */
		disabled?: boolean;
		/** Visual style variant */
		variant?: "primary" | "secondary" | "ghost";
		/** HTML button type */
		type?: "button" | "submit" | "reset";
		/** Additional CSS class */
		class?: string;
		/** Click handler */
		onclick?: (e: MouseEvent) => void;
		/** Slot content */
		children?: import("svelte").Snippet;
	}
</script>

<script lang="ts">
	let {
		label,
		disabled = false,
		variant = "secondary",
		type = "button",
		class: className = "",
		onclick,
		children,
	}: Props = $props();
</script>

<button
	{type}
	{disabled}
	class={["jb-button", variant, className]}
	onclick={disabled ? undefined : onclick}
>
	{#if children}
		{@render children()}
	{:else if label}
		{label}
	{/if}
</button>

<style>
	.jb-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 24px;
		padding: 0 12px;
		gap: 4px;
		border: 1px solid var(--jb-border-color, #555);
		border-radius: var(--jb-radius-sm, 2px);
		background: var(--jb-bg-secondary, #313335);
		color: var(--jb-fg-primary, #bbb);
		font-size: var(--jb-font-size, 13px);
		font-family: var(--jb-font-family, monospace);
		white-space: nowrap;
		cursor: pointer;
		transition: background var(--jb-transition, 150ms ease);
		user-select: none;
	}

	.jb-button:hover:not(:disabled) {
		background: var(--jb-bg-hover, rgba(255, 255, 255, 0.07));
	}

	.jb-button:active:not(:disabled) {
		background: var(--jb-bg-active, rgba(75, 110, 175, 0.4));
	}

	.jb-button:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.jb-button.primary {
		border-color: var(--jb-accent, #4b6eaf);
		background: var(--jb-accent, #4b6eaf);
		color: var(--jb-fg-on-accent, #fff);
	}

	.jb-button.primary:hover:not(:disabled) {
		border-color: var(--jb-accent-hover, #5c7ebd);
		background: var(--jb-accent-hover, #5c7ebd);
	}

	.jb-button.ghost {
		border-color: transparent;
		background: transparent;
	}

	.jb-button.ghost:hover:not(:disabled) {
		border-color: transparent;
		background: var(--jb-bg-hover, rgba(255, 255, 255, 0.07));
	}
</style>
