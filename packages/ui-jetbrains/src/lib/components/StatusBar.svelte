<script lang="ts" module>
	/** Props for the JetBrains-style StatusBar component */
	export interface Props {
		/** Branch name displayed at the left of the status bar */
		branch?: string;
		/** Optional status message in the center */
		message?: string;
		/** Right-side content snippet */
		right?: import("svelte").Snippet;
	}
</script>

<script lang="ts">
	let { branch, message, right }: Props = $props();
</script>

<div class="jb-status-bar" role="status" aria-live="polite">
	<div class="jb-status-bar-left">
		{#if branch}
			<span class="jb-status-branch">⎇ {branch}</span>
		{/if}
	</div>
	<div class="jb-status-bar-center">
		{#if message}
			<span class="jb-status-message">{message}</span>
		{/if}
	</div>
	<div class="jb-status-bar-right">
		{#if right}
			{@render right()}
		{/if}
	</div>
</div>

<style>
	.jb-status-bar {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		height: 24px;
		padding: 0 8px;
		border-top: 1px solid var(--jb-border-color, #555);
		background: var(--jb-bg-secondary, #313335);
		color: var(--jb-fg-secondary, #808080);
		font-size: var(--jb-font-size-sm, 11px);
		font-family: var(--jb-font-family, monospace);
	}

	.jb-status-bar-left {
		display: flex;
		flex: 1;
		align-items: center;
		overflow: hidden;
		gap: 8px;
	}

	.jb-status-bar-center {
		display: flex;
		align-items: center;
	}

	.jb-status-bar-right {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: flex-end;
		overflow: hidden;
		gap: 8px;
	}

	.jb-status-branch {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;
	}

	.jb-status-branch:hover {
		color: var(--jb-fg-primary, #bbb);
	}

	.jb-status-message {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
