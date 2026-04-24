<script lang="ts">
	interface Props {
		id: string;
		activeTab: string;
		children?: import("svelte").Snippet;
	}

	let { id, activeTab, children }: Props = $props();
	const isActive = $derived(activeTab === id);
</script>

{#if isActive}
	<div class="jb-tab-panel" role="tabpanel">
		{#if children}
			{@render children()}
		{/if}
	</div>
{/if}

<style>
	.jb-tab-panel {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		color: var(--jb-fg-primary, #bbb);
		font-size: var(--jb-font-size, 13px);
		font-family: var(--jb-font-family, monospace);
	}
</style>
