<script lang="ts">
	interface Props {
		branch?: string;
		message?: string;
		right?: import("svelte").Snippet;
	}

	let { branch, message, right }: Props = $props();
</script>

<div class="jb-status-bar" role="status" aria-live="polite">
	<div class="jb-status-left">
		{#if branch}
			<span class="jb-status-branch">⎇ {branch}</span>
		{/if}
	</div>
	<div class="jb-status-center">
		{#if message}
			<span>{message}</span>
		{/if}
	</div>
	<div class="jb-status-right">
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

	.jb-status-left,
	.jb-status-right {
		display: flex;
		flex: 1;
		align-items: center;
		overflow: hidden;
		gap: 8px;
	}

	.jb-status-right {
		justify-content: flex-end;
	}

	.jb-status-center {
		display: flex;
		align-items: center;
	}

	.jb-status-branch {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
